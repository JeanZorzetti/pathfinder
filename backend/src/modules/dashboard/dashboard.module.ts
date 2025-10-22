import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';
import { GamificationModule } from '../gamification/gamification.module';
import { ChallengesModule } from '../challenges/challenges.module';
import { DailyInsight } from './entities/daily-insight.entity';
import { User } from '../users/entities/user.entity';
import { BigFiveResult } from '../personality-tests/entities/bigfive-result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([DailyInsight, User, BigFiveResult]),
    GamificationModule,
    ChallengesModule,
  ],
  controllers: [DashboardController],
  providers: [DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}
