import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalityTestsController } from './personality-tests.controller';
import { PersonalityTestsService } from './personality-tests.service';
import { ScoringService } from './services/scoring.service';
import { PersonalityFramework } from './entities/personality-framework.entity';
import { PersonalityType } from './entities/personality-type.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { TestResult } from './entities/test-result.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonalityFramework,
      PersonalityType,
      Question,
      Answer,
      TestResult,
    ]),
  ],
  controllers: [PersonalityTestsController],
  providers: [PersonalityTestsService, ScoringService],
  exports: [PersonalityTestsService],
})
export class PersonalityTestsModule {}
