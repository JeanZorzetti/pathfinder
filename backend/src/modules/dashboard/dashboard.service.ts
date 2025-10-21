import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GamificationService } from '../gamification/gamification.service';
import { ChallengesService } from '../challenges/challenges.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import { DailyInsight } from './entities/daily-insight.entity';
import { User } from '../users/entities/user.entity';
import { XpSource } from '../gamification/entities/xp-transaction.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(DailyInsight)
    private dailyInsightRepository: Repository<DailyInsight>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly gamificationService: GamificationService,
    private readonly challengesService: ChallengesService,
  ) {}

  async getDashboard(userId: string): Promise<any> {
    try {
      // Get user data
      const user = await this.userRepository.findOne({ where: { id: userId } });

      if (!user) {
        throw new Error('User not found');
      }

      // Get stats (with error handling)
      let stats;
      try {
        stats = await this.getStats(userId);
      } catch (error) {
        console.error('Error getting stats:', error);
        stats = { level: 1, xp: 0, streak: { current: 0, longest: 0 }, tests_completed: 0 };
      }

      // Get daily insight (with error handling)
      let dailyInsight;
      try {
        dailyInsight = await this.getDailyInsight(userId);
      } catch (error) {
        console.error('Error getting daily insight:', error);
        dailyInsight = {
          text: 'Continue sua jornada de autoconhecimento. Cada passo conta!',
          category: 'motivação',
          actionItem: 'Reserve um momento hoje para refletir sobre seus valores.',
        };
      }

      // Get current challenge (with error handling)
      let currentChallenge: any = null;
      try {
        if (user.mbti_type) {
          currentChallenge = await this.challengesService.getCurrentChallenge(userId, user.mbti_type);
        }
      } catch (error) {
        console.error('Error getting current challenge:', error);
        currentChallenge = null;
      }

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

    // Get user achievements from gamification service
    let achievements: any[] = [];
    try {
      const achievementsData = await this.gamificationService.getUserAchievements(userId);
      // getUserAchievements returns an object with unlocked/available, extract unlocked
      achievements = achievementsData?.unlocked || [];
    } catch (error) {
      console.error('Error getting achievements:', error);
      achievements = [];
    }

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

    // Award +5 XP for daily login (only if it's a new day)
    let dailyLoginXpResult = null;
    if (lastVisit) {
      const lastVisitDate = new Date(lastVisit);
      const today = new Date();

      // Check if it's a different day (ignoring time)
      const lastVisitDay = new Date(lastVisitDate.getFullYear(), lastVisitDate.getMonth(), lastVisitDate.getDate());
      const todayDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());

      if (lastVisitDay.getTime() !== todayDay.getTime()) {
        // It's a new day - award daily login XP
        try {
          dailyLoginXpResult = await this.gamificationService.addXP(userId, {
            source: XpSource.DAILY_LOGIN,
            amount: 5,
            description: 'Login diário',
          });
        } catch (error) {
          console.error('Error awarding daily login XP:', error);
        }
      }
    } else {
      // First visit ever - award daily login XP
      try {
        dailyLoginXpResult = await this.gamificationService.addXP(userId, {
          source: XpSource.DAILY_LOGIN,
          amount: 5,
          description: 'Primeiro login',
        });
      } catch (error) {
        console.error('Error awarding first login XP:', error);
      }
    }

    // Prepare updated metadata
    const updatedVisitHistory = [...visitHistory, now].slice(-30);
    const updatedMetadata: any = {
      ...metadata,
      last_visit: now,
      streak_current: newStreakCurrent,
      streak_longest: newStreakLongest,
      visit_history: updatedVisitHistory,
    };

    // Award streak milestone bonuses
    const previousStreakReached7 = metadata.streak_milestone_7 || false;
    const previousStreakReached30 = metadata.streak_milestone_30 || false;

    // Check if user just reached 7-day streak (and hasn't received bonus yet)
    if (newStreakCurrent === 7 && !previousStreakReached7) {
      try {
        await this.gamificationService.addXP(userId, {
          source: XpSource.STREAK_MILESTONE,
          amount: 50,
          description: 'Streak de 7 dias consecutivos!',
        });
        updatedMetadata.streak_milestone_7 = true;
      } catch (error) {
        console.error('Error awarding 7-day streak bonus:', error);
      }
    }

    // Check if user just reached 30-day streak (and hasn't received bonus yet)
    if (newStreakCurrent === 30 && !previousStreakReached30) {
      try {
        await this.gamificationService.addXP(userId, {
          source: XpSource.STREAK_MILESTONE,
          amount: 200,
          description: 'Streak de 30 dias consecutivos!',
        });
        updatedMetadata.streak_milestone_30 = true;
      } catch (error) {
        console.error('Error awarding 30-day streak bonus:', error);
      }
    }

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
              achievements: achievements,
              streak_current: newStreakCurrent,
              streak_longest: newStreakLongest,
            },
          },
          testResults,
          currentChallenge,
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
    } catch (error) {
      console.error('Error in getDashboard:', error);
      throw error;
    }
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
      where: { mbtiType: user.mbti_type },
    });

    if (!insights || insights.length === 0) {
      // Fallback se não houver insights para este tipo
      return {
        text: 'Continue sua jornada de autoconhecimento. Cada passo conta!',
        category: 'motivação',
        actionItem: 'Reserve um momento hoje para refletir sobre seus valores.',
      };
    }

    // Usar dia do ano para rotação consistente (1-365)
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const dailyIndex = dayOfYear % insights.length;
    const selectedInsight = insights[dailyIndex];

    return {
      text: selectedInsight.insightText,
      category: selectedInsight.category,
      actionItem: selectedInsight.actionItem,
    };
  }
}
