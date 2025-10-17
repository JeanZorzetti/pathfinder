import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { XpTransaction } from './entities/xp-transaction.entity';
import { AddXpDto, XpResponseDto, XpSource } from './dto/add-xp.dto';
import { calculateLevel, calculateLevelProgress } from './constants/levels';
import { XP_VALUES, XP_COOLDOWNS } from './constants/xp-sources';

@Injectable()
export class GamificationService {
  constructor(
    @InjectRepository(XpTransaction)
    private xpTransactionRepository: Repository<XpTransaction>,
  ) {}

  async addXP(userId: string, dto: AddXpDto): Promise<XpResponseDto> {
    // 1. Verificar cooldown (anti-spam)
    const cooldownMs = XP_COOLDOWNS[dto.source];
    if (cooldownMs) {
      const lastTransaction = await this.xpTransactionRepository.findOne({
        where: { user_id: userId, source: dto.source },
        order: { created_at: 'DESC' },
      });

      if (lastTransaction) {
        const timeSinceLast = Date.now() - lastTransaction.created_at.getTime();
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
      user_id: userId,
      source: dto.source,
      amount: dto.amount,
    });
    await this.xpTransactionRepository.save(transaction);

    // 6. Atualizar profile do usuário
    await this.updateUserXP(userId, newXP, newLevel.level);

    return {
      newXP,
      leveledUp,
      newLevel: leveledUp ? newLevel.level : undefined,
      oldLevel: oldLevel.level,
    };
  }

  async getUserXPHistory(userId: string, limit: number = 50): Promise<XpTransaction[]> {
    return this.xpTransactionRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
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
      where: { user_id: userId },
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
      where: { user_id: userId },
    });

    return transactions.reduce((sum, t) => sum + t.amount, 0);
  }

  async calculateUserLevel(userId: string) {
    const currentXP = await this.getUserCurrentXP(userId);
    return calculateLevel(currentXP);
  }

  // ===== Private Helper Methods =====

  private async updateUserXP(userId: string, newXP: number, newLevel: number): Promise<void> {
    // TODO: Implementar update no Supabase profiles table
    // await this.supabase.from('profiles').update({ xp: newXP, level: newLevel }).eq('id', userId);
    console.log(`[Gamification] User ${userId} XP updated: ${newXP} (Level ${newLevel})`);
  }
}
