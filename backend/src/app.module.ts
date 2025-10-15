import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';
import { ScheduleModule } from '@nestjs/schedule';

// Modules
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { PersonalityTestsModule } from './modules/personality-tests/personality-tests.module';
import { ContentModule } from './modules/content/content.module';
import { HealthModule } from './modules/health/health.module';

// Entities
import { User } from './modules/users/entities/user.entity';
import { PersonalityFramework } from './modules/personality-tests/entities/personality-framework.entity';
import { PersonalityType } from './modules/personality-tests/entities/personality-type.entity';
import { Question } from './modules/personality-tests/entities/question.entity';
import { TestResult } from './modules/personality-tests/entities/test-result.entity';
import { Answer } from './modules/personality-tests/entities/answer.entity';
import { Article } from './modules/content/entities/article.entity';
import { ArticleCategory } from './modules/content/entities/article-category.entity';

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
        ],
        synchronize: configService.get('NODE_ENV') === 'development',
        logging: configService.get('NODE_ENV') === 'development',
        // SSL configuration - usar DATABASE_SSL env var ao invés de NODE_ENV
        ssl: configService.get('DATABASE_SSL') === 'true'
          ? { rejectUnauthorized: false }
          : false,
      }),
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
  ],
})
export class AppModule {}
