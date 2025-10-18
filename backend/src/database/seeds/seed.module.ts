import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedService } from './seed.service';
import { PersonalityFramework } from '../../modules/personality-tests/entities/personality-framework.entity';
import { PersonalityType } from '../../modules/personality-tests/entities/personality-type.entity';
import { Question } from '../../modules/personality-tests/entities/question.entity';
import { DailyInsight } from '../../modules/dashboard/entities/daily-insight.entity';
import { AchievementCatalog } from '../../modules/gamification/entities/achievement-catalog.entity';
import { UserAchievement } from '../../modules/gamification/entities/user-achievement.entity';
import { XpTransaction } from '../../modules/gamification/entities/xp-transaction.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([
      PersonalityFramework,
      PersonalityType,
      Question,
      DailyInsight,
      AchievementCatalog,
      UserAchievement,
      XpTransaction,
    ]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
