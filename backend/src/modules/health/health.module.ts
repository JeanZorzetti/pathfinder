import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HealthController } from './health.controller';
import { PersonalityFramework } from '../personality-tests/entities/personality-framework.entity';
import { PersonalityType } from '../personality-tests/entities/personality-type.entity';
import { Question } from '../personality-tests/entities/question.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonalityFramework,
      PersonalityType,
      Question,
    ]),
  ],
  controllers: [HealthController],
})
export class HealthModule {}
