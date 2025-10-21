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
import { User } from '../users/entities/user.entity';
import { EnneagramType } from './entities/enneagram-type.entity';
import { EnneagramQuestion } from './entities/enneagram-question.entity';
import { EnneagramQuestionTypeMapping } from './entities/enneagram-mapping.entity';
import { EnneagramService } from './enneagram.service';
import { EnneagramController } from './enneagram.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PersonalityFramework,
      PersonalityType,
      Question,
      Answer,
      TestResult,
      User,
      EnneagramType,
      EnneagramQuestion,
      EnneagramQuestionTypeMapping,
    ]),
  ],
  controllers: [PersonalityTestsController, EnneagramController],
  providers: [PersonalityTestsService, ScoringService, EnneagramService],
  exports: [PersonalityTestsService, EnneagramService],
})
export class PersonalityTestsModule {}
