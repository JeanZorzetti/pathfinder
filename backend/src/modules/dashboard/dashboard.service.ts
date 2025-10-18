import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamificationService } from '../gamification/gamification.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import { DailyInsight } from './entities/daily-insight.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(DailyInsight)
    private dailyInsightRepository: Repository<DailyInsight>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly gamificationService: GamificationService,
  ) {}

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
    // Buscar usuário para pegar MBTI type
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user || !user.mbti_type) {
      // Fallback: insights genéricos
      const fallbackInsights = [
        { text: 'Hoje é um ótimo dia para refletir sobre seus objetivos.', category: 'motivação' },
        { text: 'Lembre-se: pequenas conquistas levam a grandes resultados.', category: 'crescimento' },
        { text: 'Que tal desafiar-se a fazer algo diferente hoje?', category: 'desafio' },
      ];
      const randomInsight = fallbackInsights[Math.floor(Math.random() * fallbackInsights.length)];
      return randomInsight;
    }

    // Buscar insights do banco para o tipo MBTI do usuário
    const insights = await this.dailyInsightRepository.find({
      where: { personalityType: user.mbti_type },
    });

    if (!insights || insights.length === 0) {
      // Fallback se não houver insights para este tipo
      return {
        text: 'Continue sua jornada de autoconhecimento. Cada passo conta!',
        category: 'motivação',
      };
    }

    // Usar data como seed para ter o mesmo insight durante o dia
    const today = new Date().toDateString();
    const seed = today.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const dailyIndex = seed % insights.length;
    const selectedInsight = insights[dailyIndex];

    return {
      text: selectedInsight.insightText,
      category: selectedInsight.category,
    };
  }
}
