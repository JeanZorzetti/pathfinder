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

  async getDashboard(userId: string): Promise<any> {
    // Get user data
    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    // Get stats
    const stats = await this.getStats(userId);

    // Get daily insight
    const dailyInsight = await this.getDailyInsight(userId);

    // Get test results (simplified - just return the mbtiType from user)
    const testResults: any[] = [];
    if (user.mbti_type) {
      testResults.push({
        id: userId, // Using userId as placeholder
        framework: 'mbti',
        typeCode: user.mbti_type,
        completedAt: user.createdAt?.toISOString() || new Date().toISOString(),
        resultData: { type: user.mbti_type },
      });
    }

    // Calculate streak from metadata
    const metadata = user.metadata || {};
    const streak = {
      current: metadata.streak_current || 0,
      longest: metadata.streak_longest || 0,
    };

    // Update streak and last visit
    const now = new Date().toISOString();
    const lastVisit = metadata.last_visit;
    const visitHistory = metadata.visit_history || [];

    // Calculate new streak
    let newStreakCurrent = streak.current;
    let newStreakLongest = streak.longest;

    if (lastVisit) {
      const lastVisitDate = new Date(lastVisit);
      const today = new Date();
      const daysDiff = Math.floor(
        (today.getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 0) {
        // Same day - don't update streak
      } else if (daysDiff === 1) {
        // Consecutive day - increment streak
        newStreakCurrent = streak.current + 1;
        newStreakLongest = Math.max(newStreakLongest, newStreakCurrent);
      } else {
        // Streak broken - reset to 1
        newStreakCurrent = 1;
      }
    } else {
      // First visit
      newStreakCurrent = 1;
      newStreakLongest = 1;
    }

    // Update user metadata with new streak
    const updatedVisitHistory = [...visitHistory, now].slice(-30);
    const updatedMetadata = {
      ...metadata,
      last_visit: now,
      streak_current: newStreakCurrent,
      streak_longest: newStreakLongest,
      visit_history: updatedVisitHistory,
    };

    await this.userRepository.update(userId, {
      metadata: updatedMetadata as any,
    });

    return {
      success: true,
      data: {
        profile: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          mbtiType: user.mbti_type,
          createdAt: user.createdAt?.toISOString() || new Date().toISOString(),
          metadata: {
            ...metadata,
            xp: stats.xp,
            level: stats.level,
            streak_current: newStreakCurrent,
            streak_longest: newStreakLongest,
          },
        },
        testResults,
        currentChallenge: null, // Will be implemented by challenges module
        dailyInsight,
        stats: {
          ...stats,
          streak: {
            current: newStreakCurrent,
            longest: newStreakLongest,
          },
        },
      },
    };
  }

  async getStats(userId: string) {
    const currentXP = await this.gamificationService.getUserCurrentXP(userId);
    const level = await this.gamificationService.calculateUserLevel(userId);

    return {
      level: level.level,
      xp: currentXP,
      streak: {
        current: 0, // Will be calculated in getDashboard
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
