import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ComparisonHistory } from './entities/comparison-history.entity';
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

    // If user already has a code, return it
    if (user.comparison_code) {
      return {
        code: user.comparison_code,
        mbtiType: user.mbti_type,
        userId: user.id,
      };
    }

    // Generate new code
    const newCode = CodeGenerator.generate(user.mbti_type);

    // Save to database
    await this.userRepository.update(userId, {
      comparison_code: newCode,
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
    let userCode = user.comparison_code;
    if (!userCode) {
      userCode = CodeGenerator.generate(user.mbti_type);
      await this.userRepository.update(userId, {
        comparison_code: userCode,
      });
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

    // Save to history
    await this.saveToHistory(userId, comparedCode, comparedMbti, compatibility.score);

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
      where: { user_id: userId },
      order: { created_at: 'DESC' },
      take: limit,
    });

    return history.map((item) => ({
      id: item.id,
      comparedCode: item.compared_code,
      comparedMbti: item.compared_mbti,
      compatibilityScore: item.compatibility_score,
      createdAt: item.created_at,
    }));
  }

  /**
   * Save comparison result to history
   * @param userId - User ID
   * @param comparedCode - Compared code
   * @param comparedMbti - Compared MBTI type
   * @param score - Compatibility score
   */
  private async saveToHistory(
    userId: string,
    comparedCode: string,
    comparedMbti: string,
    score: number,
  ): Promise<void> {
    const historyEntry = this.comparisonHistoryRepository.create({
      user_id: userId,
      compared_code: comparedCode,
      compared_mbti: comparedMbti,
      compatibility_score: score,
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
      where: { user_id: userId },
    });

    const allComparisons = await this.comparisonHistoryRepository.find({
      where: { user_id: userId },
      order: { compatibility_score: 'DESC' },
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
      allComparisons.reduce((sum, item) => sum + item.compatibility_score, 0) /
      allComparisons.length;

    const bestMatch = allComparisons[0];

    // Find most compared MBTI type
    const mbtiCounts: Record<string, number> = {};
    allComparisons.forEach((item) => {
      mbtiCounts[item.compared_mbti] =
        (mbtiCounts[item.compared_mbti] || 0) + 1;
    });

    const mostCompared = Object.entries(mbtiCounts).sort(
      ([, a], [, b]) => b - a,
    )[0];

    return {
      totalComparisons,
      averageScore: Math.round(averageScore),
      bestMatch: bestMatch
        ? {
            mbtiType: bestMatch.compared_mbti,
            code: bestMatch.compared_code,
            score: bestMatch.compatibility_score,
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
