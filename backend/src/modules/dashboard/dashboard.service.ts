import { Injectable } from '@nestjs/common';
import { GamificationService } from '../gamification/gamification.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';

@Injectable()
export class DashboardService {
  constructor(private readonly gamificationService: GamificationService) {}

  async getDashboard(userId: string): Promise<DashboardResponseDto> {
    // TODO: Implementar lógica completa integrando com outros módulos
    // Por enquanto, retornar estrutura básica com dados mockados

    const stats = await this.getStats(userId);
    const dailyInsight = await this.getDailyInsight(userId);

    return {
      user: {
        id: userId,
        full_name: 'Usuário Teste',
        mbti_type: 'INTJ',
      },
      stats,
      daily_insight: dailyInsight,
      current_challenge: null,
      achievements: [],
      recommended_content: [],
    };
  }

  async getStats(userId: string) {
    const currentXP = await this.gamificationService.getUserCurrentXP(userId);
    const level = await this.gamificationService.calculateUserLevel(userId);

    return {
      level: level.level,
      xp: currentXP,
      streak: {
        current: 0, // TODO: Implementar lógica de streak
        longest: 0,
      },
      tests_completed: 0, // TODO: Buscar do banco
    };
  }

  async getDailyInsight(userId: string) {
    // TODO: Implementar lógica baseada em MBTI type
    const insights = [
      { text: 'Hoje é um ótimo dia para refletir sobre seus objetivos.', category: 'motivação' },
      { text: 'Lembre-se: pequenas conquistas levam a grandes resultados.', category: 'crescimento' },
      { text: 'Que tal desafiar-se a fazer algo diferente hoje?', category: 'desafio' },
    ];

    const randomInsight = insights[Math.floor(Math.random() * insights.length)];
    return randomInsight;
  }
}
