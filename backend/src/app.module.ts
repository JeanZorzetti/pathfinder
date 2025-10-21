import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PersonalityTestsModule } from './modules/personality-tests/personality-tests.module';
import { ContentModule } from './modules/content/content.module';
import { HealthModule } from './modules/health/health.module';
import { GamificationModule } from './modules/gamification/gamification.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ChallengesModule } from './modules/challenges/challenges.module';
import { JournalModule } from './modules/journal/journal.module';
import { ComparisonModule } from './modules/comparison/comparison.module';
import { ContentLibraryModule } from './modules/content-library/content-library.module';
import { NotificationsModule } from './modules/notifications/notifications.module';

// Entities
import { User } from './modules/users/entities/user.entity';
import { PersonalityFramework } from './modules/personality-tests/entities/personality-framework.entity';
import { PersonalityType } from './modules/personality-tests/entities/personality-type.entity';
import { Question } from './modules/personality-tests/entities/question.entity';
import { TestResult } from './modules/personality-tests/entities/test-result.entity';
import { Answer } from './modules/personality-tests/entities/answer.entity';
import { EnneagramType } from './modules/personality-tests/entities/enneagram-type.entity';
import { EnneagramQuestion } from './modules/personality-tests/entities/enneagram-question.entity';
import { EnneagramQuestionTypeMapping } from './modules/personality-tests/entities/enneagram-mapping.entity';
import { Article } from './modules/content/entities/article.entity';
import { ArticleCategory } from './modules/content/entities/article-category.entity';
import { XpTransaction } from './modules/gamification/entities/xp-transaction.entity';
import { UserAchievement } from './modules/gamification/entities/user-achievement.entity';
import { AchievementCatalog } from './modules/gamification/entities/achievement-catalog.entity';
import { UserChallenge } from './modules/challenges/entities/user-challenge.entity';
import { JournalEntry } from './modules/journal/entities/journal-entry.entity';
import { ComparisonHistory } from './modules/comparison/entities/comparison-history.entity';
import { ComparisonCode } from './modules/comparison/entities/comparison-code.entity';
import { ContentLibrary } from './modules/content-library/entities/content-library.entity';
import { ChallengeTemplate } from './modules/challenges/entities/challenge-template.entity';
import { JournalPrompt } from './modules/journal/entities/journal-prompt.entity';
import { PushSubscription } from './modules/notifications/entities/push-subscription.entity';
import { DailyInsight } from './modules/dashboard/entities/daily-insight.entity';

// Config
import typeormConfig from './config/typeorm.config';

@Module({
  imports: [
    // Configuration
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      load: [typeormConfig],
    }),

    // Database
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [
          User,
          PersonalityFramework,
          PersonalityType,
          Question,
          TestResult,
          Answer,
          EnneagramType,
          EnneagramQuestion,
          EnneagramQuestionTypeMapping,
          Article,
          ArticleCategory,
          XpTransaction,
          UserAchievement,
          AchievementCatalog,
          UserChallenge,
          ChallengeTemplate,
          JournalEntry,
          JournalPrompt,
          ComparisonHistory,
          ComparisonCode,
          ContentLibrary,
          PushSubscription,
          DailyInsight,
        ],
        migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        migrationsRun: configService.get('DB_RUN_MIGRATIONS') === 'true',
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        // SSL configuration - usar DATABASE_SSL env var ao invés de NODE_ENV
        ssl: configService.get('DATABASE_SSL') === 'true'
          ? { rejectUnauthorized: false }
          : false,
      }),
    }),

    // Rate Limiting - Proteção contra abuso
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          name: 'short',
          ttl: 1000, // 1 segundo
          limit: 3, // 3 requests por segundo
        },
        {
          name: 'medium',
          ttl: 10000, // 10 segundos
          limit: 20, // 20 requests por 10 segundos
        },
        {
          name: 'long',
          ttl: 60000, // 1 minuto
          limit: parseInt(configService.get('RATE_LIMIT_MAX') || '100'),
        },
      ],
    }),

    // In-memory cache (Redis is optional)
    CacheModule.register({
      isGlobal: true,
      ttl: 3600,
    }),

    // Scheduling for cron jobs
    ScheduleModule.forRoot(),

    // Feature Modules
    HealthModule,
    AuthModule,
    UsersModule,
    GamificationModule, // Must be before modules that depend on it
    PersonalityTestsModule,
    ContentModule,
    DashboardModule,
    ChallengesModule,
    JournalModule,
    NotificationsModule,
    ComparisonModule,
    ContentLibraryModule,
  ],
  providers: [
    // Aplicar rate limiting globalmente
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
