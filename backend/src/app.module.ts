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

// Entities
import { User } from './modules/users/entities/user.entity';
import { PersonalityFramework } from './modules/personality-tests/entities/personality-framework.entity';
import { PersonalityType } from './modules/personality-tests/entities/personality-type.entity';
import { Question } from './modules/personality-tests/entities/question.entity';
import { TestResult } from './modules/personality-tests/entities/test-result.entity';
import { Answer } from './modules/personality-tests/entities/answer.entity';
import { Article } from './modules/content/entities/article.entity';
import { ArticleCategory } from './modules/content/entities/article-category.entity';
import { XpTransaction } from './modules/gamification/entities/xp-transaction.entity';

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
          Article,
          ArticleCategory,
          XpTransaction,
        ],
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
    PersonalityTestsModule,
    ContentModule,
    GamificationModule,
    DashboardModule,
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
