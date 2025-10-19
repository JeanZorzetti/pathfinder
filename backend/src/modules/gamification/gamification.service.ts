import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { XpTransaction, XpSource } from './entities/xp-transaction.entity';
import { AchievementCatalog } from './entities/achievement-catalog.entity';
import { UserAchievement } from './entities/user-achievement.entity';
import { AddXpDto, XpResponseDto } from './dto/add-xp.dto';
import { calculateLevel, calculateLevelProgress } from './constants/levels';
import { XP_VALUES, XP_COOLDOWNS } from './constants/xp-sources';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(XpTransaction)
    private xpTransactionRepository: Repository<XpTransaction>,
    @InjectRepository(AchievementCatalog)
    private achievementCatalogRepository: Repository<AchievementCatalog>,
    @InjectRepository(UserAchievement)
    private userAchievementRepository: Repository<UserAchievement>,
  ) {}

  async addXP(userId: string, dto: AddXpDto): Promise<XpResponseDto> {
    // 1. Verificar cooldown (anti-spam)
    const cooldownMs = XP_COOLDOWNS[dto.source];
    if (cooldownMs) {
      const lastTransaction = await this.xpTransactionRepository.findOne({
        where: { userId: userId, source: dto.source },
        order: { createdAt: 'DESC' },
      });

      if (lastTransaction) {
        const timeSinceLast = Date.now() - lastTransaction.createdAt.getTime();
        if (timeSinceLast < cooldownMs) {
          throw new BadRequestException(
            `XP cooldown: wait ${Math.ceil((cooldownMs - timeSinceLast) / 1000 / 60)} minutes`,
          );
        }
      }
    }

    // 2. Validar amount vs source
    const expectedAmount = XP_VALUES[dto.source];
    if (dto.amount !== expectedAmount && expectedAmount !== 0) {
      throw new BadRequestException(
        `Invalid XP amount for source ${dto.source}. Expected ${expectedAmount}, got ${dto.amount}`,
      );
    }

    // 3. Buscar XP atual do usuário (via Supabase profiles table)
    // TODO: Integrar com UserService para buscar profile
    // Por enquanto, vamos simular
    const currentXP = await this.getUserCurrentXP(userId);
    const oldLevel = calculateLevel(currentXP);

    // 4. Adicionar XP
    const newXP = currentXP + dto.amount;
    const newLevel = calculateLevel(newXP);
    const leveledUp = newLevel.level > oldLevel.level;

    // 5. Registrar transação
    const transaction = this.xpTransactionRepository.create({
      userId: userId,
      source: dto.source,
      amount: dto.amount,
      description: dto.description,
    });
    await this.xpTransactionRepository.save(transaction);

    // 6. Atualizar profile do usuário
    await this.updateUserXP(userId, newXP, newLevel.level);

    // 7. Check achievements após ganhar XP
    await this.checkAndUnlockAchievements(userId);

    return {
      newXP,
      leveledUp,
      newLevel: leveledUp ? newLevel.level : undefined,
      oldLevel: oldLevel.level,
    };
  }

  async getUserXPHistory(userId: string, limit: number = 50): Promise<XpTransaction[]> {
    return this.xpTransactionRepository.find({
      where: { userId: userId },
      order: { createdAt: 'DESC' },
      take: limit,
    });
  }

  async getUserXPStats(userId: string): Promise<{
    totalXP: number;
    level: number;
    levelProgress: ReturnType<typeof calculateLevelProgress>;
    transactionCount: number;
  }> {
    const currentXP = await this.getUserCurrentXP(userId);
    const level = calculateLevel(currentXP).level;
    const levelProgress = calculateLevelProgress(currentXP);
    const transactionCount = await this.xpTransactionRepository.count({
      where: { userId: userId },
    });

    return {
      totalXP: currentXP,
      level,
      levelProgress,
      transactionCount,
    };
  }

  // ===== Public Helper Methods =====

  async getUserCurrentXP(userId: string): Promise<number> {
    // TODO: Implementar integração real com Supabase/profiles
    // Por enquanto, calcular somando transações
    const transactions = await this.xpTransactionRepository.find({
      where: { userId: userId },
    });

    return transactions.reduce((sum, t) => sum + t.amount, 0);
  }

  async calculateUserLevel(userId: string) {
    const currentXP = await this.getUserCurrentXP(userId);
    return calculateLevel(currentXP);
  }

  // ===== Achievements Methods =====

  async getUserAchievements(userId: string, mbtiType?: string) {
    const userAchievements = await this.userAchievementRepository.find({
      where: { userId },
      relations: ['achievement'],
      order: { unlockedAt: 'DESC' },
    });

    // Get all available achievements for the user
    const allAchievements = await this.achievementCatalogRepository.find({
      where: mbtiType
        ? [
            { mbtiTypes: IsNull() }, // Universal achievements
            { mbtiTypes: JSON.parse(`["${mbtiType}"]`) as any }, // Type-specific
          ]
        : { mbtiTypes: IsNull() }, // Only universal if no MBTI type
    });

    return {
      unlocked: userAchievements,
      available: allAchievements,
      unlockedCount: userAchievements.length,
      totalCount: allAchievements.length,
    };
  }

  async checkAndUnlockAchievements(userId: string, mbtiType?: string): Promise<UserAchievement[]> {
    const unlockedAchievements: UserAchievement[] = [];

    // Get user stats
    const totalXP = await this.getUserCurrentXP(userId);
    const journalCount = await this.getUserJournalCount(userId);
    const testsCompleted = await this.getUserTestsCompleted(userId);
    const challengesCompleted = await this.getUserChallengesCompleted(userId);
    const contentConsumed = await this.getUserContentConsumed(userId);
    const currentStreak = await this.getUserStreak(userId);

    // Get all achievements that user hasn't unlocked yet
    const existingAchievements = await this.userAchievementRepository.find({
      where: { userId },
    });
    const existingAchievementIds = existingAchievements.map((a) => a.achievementId);

    const availableAchievements = await this.achievementCatalogRepository.find();

    for (const achievement of availableAchievements) {
      // Skip if already unlocked
      if (existingAchievementIds.includes(achievement.achievementId)) {
        continue;
      }

      // Skip if MBTI-specific and doesn't match user
      if (achievement.mbtiTypes && mbtiType && !achievement.mbtiTypes.includes(mbtiType)) {
        continue;
      }

      // Check if requirement is met
      let requirementMet = false;

      switch (achievement.requirementType) {
        case 'total_xp':
          requirementMet = totalXP >= achievement.requirementValue;
          break;
        case 'journal_count':
          requirementMet = journalCount >= achievement.requirementValue;
          break;
        case 'tests_completed':
          requirementMet = testsCompleted >= achievement.requirementValue;
          break;
        case 'challenges_completed':
          requirementMet = challengesCompleted >= achievement.requirementValue;
          break;
        case 'content_consumed':
          requirementMet = contentConsumed >= achievement.requirementValue;
          break;
        case 'streak':
          requirementMet = currentStreak >= achievement.requirementValue;
          break;
        case 'profile_completed':
          requirementMet = true; // TODO: Implement profile completion check
          break;
        case 'account_age_days':
          requirementMet = true; // TODO: Implement account age check
          break;
      }

      if (requirementMet) {
        const userAchievement = this.userAchievementRepository.create({
          userId,
          achievementId: achievement.achievementId,
          progressCurrent: achievement.requirementValue,
          progressTotal: achievement.requirementValue,
        });

        await this.userAchievementRepository.save(userAchievement);
        unlockedAchievements.push(userAchievement);

        // Award XP for unlocking achievement
        if (achievement.xpReward > 0) {
          await this.addXP(userId, {
            source: XpSource.STREAK_MILESTONE,
            amount: achievement.xpReward,
            description: `Conquista desbloqueada: ${achievement.title}`,
          });
        }

        console.log(`[Achievements] User ${userId} unlocked: ${achievement.achievementId}`);
      }
    }

    return unlockedAchievements;
  }

  // ===== Private Helper Methods =====

  private async updateUserXP(userId: string, newXP: number, newLevel: number): Promise<void> {
    // TODO: Implementar update no Supabase profiles table
    // await this.supabase.from('profiles').update({ xp: newXP, level: newLevel }).eq('id', userId);
    console.log(`[Gamification] User ${userId} XP updated: ${newXP} (Level ${newLevel})`);
  }

  private async getUserJournalCount(userId: string): Promise<number> {
    // TODO: Implement journal count query
    return 0;
  }

  private async getUserTestsCompleted(userId: string): Promise<number> {
    // TODO: Implement tests completed query
    return 0;
  }

  private async getUserChallengesCompleted(userId: string): Promise<number> {
    // TODO: Implement challenges completed query
    return 0;
  }

  private async getUserContentConsumed(userId: string): Promise<number> {
    // TODO: Implement content consumed query
    return 0;
  }

  private async getUserStreak(userId: string): Promise<number> {
    // TODO: Implement streak query from user metadata
    return 0;
  }
}
