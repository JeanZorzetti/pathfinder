import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComparisonHistory } from './entities/comparison-history.entity';
import { ComparisonCode } from './entities/comparison-code.entity';
import { User } from '../users/entities/user.entity';
import { CodeGenerator } from './utils/code-generator';
import { CompatibilityAlgorithm } from './utils/compatibility-algorithm';
import {
  CompatibilityResultDto,
  ComparisonCodeDto,
  ComparisonHistoryItemDto,
} from './dto/compatibility-result.dto';

@Injectable()
export class ComparisonService {
  constructor(
    @InjectRepository(ComparisonHistory)
    private comparisonHistoryRepository: Repository<ComparisonHistory>,
    @InjectRepository(ComparisonCode)
    private comparisonCodeRepository: Repository<ComparisonCode>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Get or generate comparison code for a user
   * @param userId - User ID
   * @returns Comparison code DTO
   */
  async getOrCreateCode(userId: string): Promise<ComparisonCodeDto> {
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!user.mbti_type) {
      throw new BadRequestException(
        'Usuário precisa completar um teste MBTI primeiro',
      );
    }

    // Check if user already has a code in comparison_codes table
    const existingCode = await this.comparisonCodeRepository.findOne({
      where: { userId },
    });

    if (existingCode) {
      return {
        code: existingCode.code,
        mbtiType: user.mbti_type,
        userId: user.id,
      };
    }

    // Generate new code
    const newCode = CodeGenerator.generate(user.mbti_type);

    // Save to comparison_codes table
    await this.comparisonCodeRepository.save({
      userId,
      code: newCode,
    });

    return {
      code: newCode,
      mbtiType: user.mbti_type,
      userId: user.id,
    };
  }

  /**
   * Compare user with another code
   * @param userId - User ID
   * @param comparedCode - Code to compare with
   * @returns Compatibility result
   */
  async compare(
    userId: string,
    comparedCode: string,
  ): Promise<CompatibilityResultDto> {
    // Validate code format
    if (!CodeGenerator.isValid(comparedCode)) {
      throw new BadRequestException(
        'Código inválido. Use o formato: MBTI-XXXXXX (ex: ENFP-A7K9M2)',
      );
    }

    // Get user's MBTI and code
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado');
    }

    if (!user.mbti_type) {
      throw new BadRequestException(
        'Você precisa completar um teste MBTI primeiro',
      );
    }

    // Ensure user has a comparison code
    let userCodeEntity = await this.comparisonCodeRepository.findOne({
      where: { userId },
    });

    let userCode: string;
    if (!userCodeEntity) {
      userCode = CodeGenerator.generate(user.mbti_type);
      await this.comparisonCodeRepository.save({ userId, code: userCode });
    } else {
      userCode = userCodeEntity.code;
    }

    // Extract MBTI from compared code
    const comparedMbti = CodeGenerator.extractMbtiType(comparedCode);

    if (!comparedMbti) {
      throw new BadRequestException('Código MBTI inválido');
    }

    // Calculate compatibility
    const compatibility = CompatibilityAlgorithm.calculate(
      user.mbti_type,
      comparedMbti,
    );

    // Find the compared user if they exist (by code)
    const comparedUserCode = await this.comparisonCodeRepository.findOne({
      where: { code: comparedCode },
    });

    // Save to history
    await this.saveToHistory(
      userId,
      comparedUserCode?.userId || null,
      compatibility.score,
    );

    // Return full result
    return {
      user1: {
        mbtiType: user.mbti_type,
        code: userCode,
      },
      user2: {
        mbtiType: comparedMbti,
        code: comparedCode,
      },
      score: compatibility.score,
      level: compatibility.level,
      color: compatibility.color,
      strengths: compatibility.strengths,
      challenges: compatibility.challenges,
      communicationTips: compatibility.communicationTips,
    };
  }

  /**
   * Get comparison history for a user
   * @param userId - User ID
   * @param limit - Max results to return
   * @returns Array of comparison history items
   */
  async getHistory(
    userId: string,
    limit: number = 20,
  ): Promise<ComparisonHistoryItemDto[]> {
    const history = await this.comparisonHistoryRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: limit,
      relations: ['comparedWithUser'],
    });

    // Load comparison codes for users
    const results = await Promise.all(
      history.map(async (item) => {
        let comparedCode = '';
        let comparedMbti = '';

        if (item.comparedWithUserId) {
          const codeEntity = await this.comparisonCodeRepository.findOne({
            where: { userId: item.comparedWithUserId },
          });
          if (codeEntity) {
            comparedCode = codeEntity.code;
          }
          if (item.comparedWithUser && item.comparedWithUser.mbti_type) {
            comparedMbti = item.comparedWithUser.mbti_type;
          }
        }

        return {
          id: item.id,
          comparedCode,
          comparedMbti,
          compatibilityScore: item.compatibilityScore,
          createdAt: item.createdAt,
        };
      }),
    );

    return results;
  }

  /**
   * Save comparison result to history
   * @param userId - User ID
   * @param comparedWithUserId - Compared user ID (null if not registered)
   * @param score - Compatibility score
   */
  private async saveToHistory(
    userId: string,
    comparedWithUserId: string | null,
    score: number,
  ): Promise<void> {
    const historyEntry = this.comparisonHistoryRepository.create({
      userId,
      comparedWithUserId: comparedWithUserId || undefined,
      compatibilityScore: score,
    });

    await this.comparisonHistoryRepository.save(historyEntry);
  }

  /**
   * Get comparison statistics for a user
   * @param userId - User ID
   * @returns Comparison statistics
   */
  async getStats(userId: string) {
    const totalComparisons = await this.comparisonHistoryRepository.count({
      where: { userId },
    });

    const allComparisons = await this.comparisonHistoryRepository.find({
      where: { userId },
      order: { compatibilityScore: 'DESC' },
      relations: ['comparedWithUser'],
    });

    if (allComparisons.length === 0) {
      return {
        totalComparisons: 0,
        averageScore: 0,
        bestMatch: null,
        mostCompared: null,
      };
    }

    const averageScore =
      allComparisons.reduce((sum, item) => sum + item.compatibilityScore, 0) /
      allComparisons.length;

    const bestMatch = allComparisons[0];

    // Find most compared MBTI type
    const mbtiCounts: Record<string, number> = {};
    for (const item of allComparisons) {
      if (item.comparedWithUser && item.comparedWithUser.mbti_type) {
        const mbtiType = item.comparedWithUser.mbti_type;
        mbtiCounts[mbtiType] = (mbtiCounts[mbtiType] || 0) + 1;
      }
    }

    const mostCompared = Object.entries(mbtiCounts).sort(
      ([, a], [, b]) => b - a,
    )[0];

    // Get best match code
    let bestMatchCode: string | null = null;
    if (bestMatch && bestMatch.comparedWithUserId) {
      const codeEntity = await this.comparisonCodeRepository.findOne({
        where: { userId: bestMatch.comparedWithUserId },
      });
      if (codeEntity) {
        bestMatchCode = codeEntity.code;
      }
    }

    return {
      totalComparisons,
      averageScore: Math.round(averageScore),
      bestMatch: bestMatch && bestMatch.comparedWithUser
        ? {
            mbtiType: bestMatch.comparedWithUser.mbti_type,
            code: bestMatchCode,
            score: bestMatch.compatibilityScore,
          }
        : null,
      mostCompared: mostCompared
        ? {
            mbtiType: mostCompared[0],
            count: mostCompared[1],
          }
        : null,
    };
  }
}
