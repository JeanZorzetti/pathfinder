import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SeedService } from './seed.service';
import { PersonalityFramework } from '../../modules/personality-tests/entities/personality-framework.entity';
import { PersonalityType } from '../../modules/personality-tests/entities/personality-type.entity';
import { Question } from '../../modules/personality-tests/entities/question.entity';
import { DailyInsight } from '../../modules/dashboard/entities/daily-insight.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forFeature([PersonalityFramework, PersonalityType, Question, DailyInsight]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class SeedModule {}
