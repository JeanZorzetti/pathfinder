import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThan, MoreThanOrEqual } from 'typeorm';
import { UserChallenge } from './entities/user-challenge.entity';
import { CurrentChallengeDto, ChallengeStatsDto } from './dto/current-challenge.dto';
import { selectChallengeForUser, CHALLENGE_TEMPLATES } from './data/challenge-templates.data';
import { GamificationService } from '../gamification/gamification.service';
import { XpSource } from '../gamification/dto/add-xp.dto';

@Injectable()
export class ChallengesService {
  constructor(
    @InjectRepository(UserChallenge)
    private userChallengeRepository: Repository<UserChallenge>,
    private gamificationService: GamificationService,
  ) {}

  /**
   * Obtém o desafio atual do usuário
   * Se não existe ou a semana passou, gera um novo
   */
  async getCurrentChallenge(userId: string, mbtiType: string = 'INTJ'): Promise<CurrentChallengeDto> {
    const weekStartDate = this.getWeekStartDate();

    // Buscar desafio da semana atual
    let userChallenge = await this.userChallengeRepository.findOne({
      where: {
        userId: userId,
        weekStartDate: weekStartDate,
      },
    });

    // Se não existe, gerar novo desafio
    if (!userChallenge) {
      userChallenge = await this.generateNewChallenge(userId, mbtiType);
    }

    return this.mapToDto(userChallenge);
  }

  /**
   * Marca um dia do desafio como completo
   */
  async completeChallengeDay(userId: string, day: number): Promise<CurrentChallengeDto> {
    // Validar dia da semana (0-4 = Segunda-Sexta)
    if (day < 0 || day > 4) {
      throw new BadRequestException('Dia inválido. Deve ser entre 0 (Segunda) e 4 (Sexta)');
    }

    const weekStartDate = this.getWeekStartDate();

    // Buscar desafio atual
    const userChallenge = await this.userChallengeRepository.findOne({
      where: {
        userId: userId,
        weekStartDate: weekStartDate,
      },
    });

    if (!userChallenge) {
      throw new NotFoundException('Nenhum desafio ativo encontrado para esta semana');
    }

    if (userChallenge.completed) {
      throw new BadRequestException('Este desafio já foi completado');
    }

    // Atualizar dias completos
    const daysCompleted = this.parseDaysCompleted(userChallenge.daysCompleted);

    if (daysCompleted[day]) {
      throw new BadRequestException('Este dia já foi marcado como completo');
    }

    daysCompleted[day] = true;
    userChallenge.daysCompleted = daysCompleted as any;

    // Award +20 XP for completing a challenge day
    try {
      await this.gamificationService.addXP(userId, {
        source: XpSource.CHALLENGE_DAY,
        amount: 20,
        description: `Dia ${day + 1} do desafio completado`,
      });
    } catch (error) {
      console.error('Error awarding XP for challenge day:', error);
    }

    // Verificar se todos os dias foram completados
    const allDaysComplete = daysCompleted.every((completed) => completed === true);

    if (allDaysComplete) {
      userChallenge.completed = true;
      userChallenge.completedAt = new Date();

      // Buscar template do desafio para obter XP reward
      const template = CHALLENGE_TEMPLATES.find((t) => t.id === userChallenge.challengeId);
      const xpReward = template?.xpReward || 50;

      // Award XP for completing the entire challenge
      try {
        await this.gamificationService.addXP(userId, {
          source: XpSource.CHALLENGE_COMPLETED,
          amount: xpReward,
          description: `Desafio "${template?.title || 'completo'}" finalizado!`,
        });
      } catch (error) {
        console.error('Error awarding XP for challenge completion:', error);
      }
    }

    await this.userChallengeRepository.save(userChallenge);

    return this.mapToDto(userChallenge);
  }

  /**
   * Obtém histórico de desafios completados
   */
  async getChallengeHistory(userId: string, limit: number = 10): Promise<CurrentChallengeDto[]> {
    const completedChallenges = await this.userChallengeRepository.find({
      where: {
        userId: userId,
        completed: true,
      },
      order: { completedAt: 'DESC' },
      take: limit,
    });

    return completedChallenges.map((challenge) => this.mapToDto(challenge));
  }

  /**
   * Obtém estatísticas de desafios do usuário
   */
  async getChallengeStats(userId: string): Promise<ChallengeStatsDto> {
    const allChallenges = await this.userChallengeRepository.find({
      where: { userId: userId },
      order: { weekStartDate: 'ASC' },
    });

    const completedChallenges = allChallenges.filter((c) => c.completed);

    // Calcular streak atual (semanas consecutivas)
    let currentStreak = 0;
    let longestStreak = 0;
    let tempStreak = 0;

    const sortedByDate = [...completedChallenges].sort(
      (a, b) => new Date(a.weekStartDate).getTime() - new Date(b.weekStartDate).getTime(),
    );

    for (let i = 0; i < sortedByDate.length; i++) {
      if (i === 0) {
        tempStreak = 1;
      } else {
        const prevDate = new Date(sortedByDate[i - 1].weekStartDate);
        const currDate = new Date(sortedByDate[i].weekStartDate);
        const daysDiff = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

        if (daysDiff === 7) {
          tempStreak++;
        } else {
          tempStreak = 1;
        }
      }

      longestStreak = Math.max(longestStreak, tempStreak);
    }

    // Verificar se último desafio é da semana atual
    const weekStartDate = this.getWeekStartDate();
    const lastChallenge = sortedByDate[sortedByDate.length - 1];
    if (lastChallenge && new Date(lastChallenge.weekStartDate).getTime() === weekStartDate.getTime()) {
      currentStreak = tempStreak;
    } else {
      currentStreak = 0;
    }

    // Calcular XP total ganho
    const totalXPEarned = completedChallenges.reduce((sum, challenge) => {
      const template = CHALLENGE_TEMPLATES.find((t) => t.id === challenge.challengeId);
      return sum + (template?.xpReward || 50);
    }, 0);

    return {
      totalCompleted: completedChallenges.length,
      currentStreak,
      longestStreak,
      totalXPEarned,
    };
  }

  // ===== Private Helper Methods =====

  /**
   * Gera um novo desafio para o usuário
   */
  private async generateNewChallenge(userId: string, mbtiType: string): Promise<UserChallenge> {
    // Buscar IDs de desafios já completados
    const completedChallenges = await this.userChallengeRepository.find({
      where: { userId: userId, completed: true },
      select: ['challengeId'],
    });

    const completedIds = completedChallenges.map((c) => c.challengeId);

    // Selecionar novo desafio
    const template = selectChallengeForUser(mbtiType, completedIds);

    if (!template) {
      // Fallback: pegar qualquer desafio aleatório
      const randomIndex = Math.floor(Math.random() * CHALLENGE_TEMPLATES.length);
      const fallbackTemplate = CHALLENGE_TEMPLATES[randomIndex];

      const newChallenge = this.userChallengeRepository.create({
        userId: userId,
        challengeId: fallbackTemplate.id,
        weekStartDate: this.getWeekStartDate(),
        daysCompleted: [false, false, false, false, false] as any,
        completed: false,
      });

      return this.userChallengeRepository.save(newChallenge);
    }

    const newChallenge = this.userChallengeRepository.create({
      userId: userId,
      challengeId: template.id,
      weekStartDate: this.getWeekStartDate(),
      daysCompleted: [false, false, false, false, false] as any,
      completed: false,
    });

    return this.userChallengeRepository.save(newChallenge);
  }

  /**
   * Calcula a data de início da semana atual (segunda-feira)
   */
  private getWeekStartDate(): Date {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 = Domingo, 1 = Segunda, ..., 6 = Sábado
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Ajustar para segunda-feira
    const monday = new Date(today);
    monday.setDate(today.getDate() + diff);
    monday.setHours(0, 0, 0, 0); // Resetar horas
    return monday;
  }

  /**
   * Parse do array de dias completados
   */
  private parseDaysCompleted(daysCompleted: any): boolean[] {
    if (Array.isArray(daysCompleted)) {
      return daysCompleted;
    }

    if (typeof daysCompleted === 'string') {
      return daysCompleted.split(',').map((v) => v === 'true');
    }

    return [false, false, false, false, false];
  }

  /**
   * Mapeia entidade para DTO
   */
  private mapToDto(userChallenge: UserChallenge): CurrentChallengeDto {
    const template = CHALLENGE_TEMPLATES.find((t) => t.id === userChallenge.challengeId);

    if (!template) {
      throw new NotFoundException(`Template de desafio ${userChallenge.challengeId} não encontrado`);
    }

    const daysCompleted = this.parseDaysCompleted(userChallenge.daysCompleted);
    const completedDaysCount = daysCompleted.filter((day) => day === true).length;

    // Handle date serialization: TypeORM may return dates as strings or Date objects
    const weekStartDate = typeof userChallenge.weekStartDate === 'string'
      ? userChallenge.weekStartDate
      : userChallenge.weekStartDate.toISOString();

    return {
      id: userChallenge.id,
      title: template.title,
      description: template.description,
      emoji: template.emoji,
      daysCompleted,
      weekStartDate,
      xpReward: template.xpReward,
      isCompleted: userChallenge.completed,
      completedDaysCount,
    };
  }
}
