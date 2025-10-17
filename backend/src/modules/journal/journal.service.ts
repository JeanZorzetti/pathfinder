import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, MoreThanOrEqual } from 'typeorm';
import { JournalEntry } from './entities/journal-entry.entity';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { JournalStatsDto } from './dto/journal-stats.dto';
import { selectDailyPrompt, JournalPrompt } from './data/journal-prompts.data';

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(JournalEntry)
    private readonly journalEntryRepository: Repository<JournalEntry>,
  ) {}

  /**
   * Criar nova entrada de diário (+10 XP será dado pelo controller)
   */
  async create(userId: string, createEntryDto: CreateEntryDto): Promise<JournalEntry> {
    const entry = this.journalEntryRepository.create({
      user_id: userId,
      ...createEntryDto,
    });

    return await this.journalEntryRepository.save(entry);
  }

  /**
   * Listar entradas do usuário (paginado)
   */
  async findAll(
    userId: string,
    page: number = 1,
    limit: number = 20,
  ): Promise<{ entries: JournalEntry[]; total: number; page: number; totalPages: number }> {
    const skip = (page - 1) * limit;

    const [entries, total] = await this.journalEntryRepository.findAndCount({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
      skip,
      take: limit,
    });

    return {
      entries,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Buscar entrada específica
   */
  async findOne(userId: string, id: string): Promise<JournalEntry> {
    const entry = await this.journalEntryRepository.findOne({
      where: { id, user_id: userId },
    });

    if (!entry) {
      throw new NotFoundException('Entrada não encontrada');
    }

    return entry;
  }

  /**
   * Atualizar entrada
   */
  async update(userId: string, id: string, updateEntryDto: UpdateEntryDto): Promise<JournalEntry> {
    const entry = await this.findOne(userId, id);

    // Apenas o dono pode editar
    if (entry.user_id !== userId) {
      throw new ForbiddenException('Você não pode editar esta entrada');
    }

    Object.assign(entry, updateEntryDto);
    return await this.journalEntryRepository.save(entry);
  }

  /**
   * Deletar entrada
   */
  async remove(userId: string, id: string): Promise<void> {
    const entry = await this.findOne(userId, id);

    // Apenas o dono pode deletar
    if (entry.user_id !== userId) {
      throw new ForbiddenException('Você não pode deletar esta entrada');
    }

    await this.journalEntryRepository.remove(entry);
  }

  /**
   * Obter prompt diário baseado em MBTI
   */
  getDailyPrompt(mbtiType: string = 'INTJ'): JournalPrompt {
    return selectDailyPrompt(mbtiType);
  }

  /**
   * Obter estatísticas do diário
   */
  async getStats(userId: string): Promise<JournalStatsDto> {
    // Total de entradas
    const totalEntries = await this.journalEntryRepository.count({
      where: { user_id: userId },
    });

    // Entradas este mês
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    const entriesThisMonth = await this.journalEntryRepository.count({
      where: {
        user_id: userId,
        created_at: Between(firstDayOfMonth, lastDayOfMonth),
      },
    });

    // Calcular streaks (dias consecutivos escrevendo)
    const allEntries = await this.journalEntryRepository.find({
      where: { user_id: userId },
      order: { created_at: 'DESC' },
    });

    const { currentStreak, longestStreak } = this.calculateStreaks(allEntries);

    // Top tags
    const topTags = await this.getTopTags(userId);

    return {
      totalEntries,
      entriesThisMonth,
      currentStreak,
      longestStreak,
      topTags,
    };
  }

  /**
   * Calcular sequências de dias escrevendo
   */
  private calculateStreaks(entries: JournalEntry[]): {
    currentStreak: number;
    longestStreak: number;
  } {
    if (entries.length === 0) {
      return { currentStreak: 0, longestStreak: 0 };
    }

    // Agrupar entradas por dia (YYYY-MM-DD)
    const daysSet = new Set<string>();
    entries.forEach((entry) => {
      const dateStr = entry.created_at.toISOString().split('T')[0];
      daysSet.add(dateStr);
    });

    const sortedDays = Array.from(daysSet).sort().reverse(); // Mais recente primeiro

    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const today = new Date().toISOString().split('T')[0];
    let isCurrentStreakActive = sortedDays[0] === today;

    for (let i = 0; i < sortedDays.length; i++) {
      if (i === 0) {
        tempStreak = 1;
        if (isCurrentStreakActive) {
          currentStreak = 1;
        }
      } else {
        const prevDate = new Date(sortedDays[i - 1]);
        const currDate = new Date(sortedDays[i]);
        const dayDiff = Math.floor(
          (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (dayDiff === 1) {
          tempStreak++;
          if (isCurrentStreakActive) {
            currentStreak = tempStreak;
          }
        } else {
          tempStreak = 1;
          isCurrentStreakActive = false;
        }
      }

      longestStreak = Math.max(longestStreak, tempStreak);
    }

    return { currentStreak, longestStreak };
  }

  /**
   * Obter tags mais usadas
   */
  private async getTopTags(userId: string, limit: number = 10): Promise<Array<{ tag: string; count: number }>> {
    const entries = await this.journalEntryRepository.find({
      where: { user_id: userId },
      select: ['tags'],
    });

    const tagCounts: Record<string, number> = {};

    entries.forEach((entry) => {
      if (entry.tags && entry.tags.length > 0) {
        entry.tags.forEach((tag) => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      }
    });

    const sortedTags = Object.entries(tagCounts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);

    return sortedTags;
  }
}
