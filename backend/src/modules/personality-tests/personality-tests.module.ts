import { Module, forwardRef } from '@nestjs/common';
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
import { BigFiveDimension } from './entities/bigfive-dimension.entity';
import { BigFiveQuestion } from './entities/bigfive-question.entity';
import { BigFiveResult } from './entities/bigfive-result.entity';
import { BigFiveFacet } from './entities/bigfive-facet.entity';
import { BigFiveCareerProfile } from './entities/bigfive-career-profile.entity';
import { BigFiveCompatibilityInsight } from './entities/bigfive-compatibility-insight.entity';
import { BigFiveService } from './bigfive.service';
import { BigFiveFacetService } from './bigfive-facet.service';
import { BigFiveCareerService } from './bigfive-career.service';
import { BigFiveCompatibilityService } from './bigfive-compatibility.service';
import { BigFiveController } from './bigfive.controller';
import { GamificationModule } from '../gamification/gamification.module';

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
      BigFiveDimension,
      BigFiveQuestion,
      BigFiveResult,
      BigFiveFacet,
      BigFiveCareerProfile,
      BigFiveCompatibilityInsight,
    ]),
    forwardRef(() => GamificationModule),
  ],
  controllers: [PersonalityTestsController, EnneagramController, BigFiveController],
  providers: [PersonalityTestsService, ScoringService, EnneagramService, BigFiveService, BigFiveFacetService, BigFiveCareerService, BigFiveCompatibilityService],
  exports: [PersonalityTestsService, EnneagramService, BigFiveService, BigFiveFacetService, BigFiveCareerService, BigFiveCompatibilityService],
})
export class PersonalityTestsModule {}
