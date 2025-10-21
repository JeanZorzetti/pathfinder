import { Injectable, NotFoundException, BadRequestException, Inject, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalityFramework, FrameworkCode } from './entities/personality-framework.entity';
import { PersonalityType } from './entities/personality-type.entity';
import { Question } from './entities/question.entity';
import { Answer } from './entities/answer.entity';
import { TestResult, TestStatus } from './entities/test-result.entity';
import { User } from '../users/entities/user.entity';
import { GamificationService } from '../gamification/gamification.service';
import { XpSource } from '../gamification/entities/xp-transaction.entity';
import { ScoringService } from './services/scoring.service';
import { SubmitAnswersDto } from './dto/submit-answers.dto';
import { CreateTestDto } from './dto/create-test.dto';

@Injectable()
export class PersonalityTestsService {
  constructor(
    @InjectRepository(PersonalityFramework)
    private frameworksRepository: Repository<PersonalityFramework>,
    @InjectRepository(PersonalityType)
    private typesRepository: Repository<PersonalityType>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
    @InjectRepository(Answer)
    private answersRepository: Repository<Answer>,
    @InjectRepository(TestResult)
    private testResultsRepository: Repository<TestResult>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private scoringService: ScoringService,
    @Inject(forwardRef(() => GamificationService))
    private gamificationService: GamificationService,
  ) {}

  /**
   * Get all available frameworks
   */
  async getFrameworks() {
    return this.frameworksRepository.find({
      where: { isActive: true },
      order: { sortOrder: 'ASC' },
    });
  }

  /**
   * Get framework by code
   */
  async getFramework(code: FrameworkCode) {
    const framework = await this.frameworksRepository.findOne({
      where: { code, isActive: true },
    });

    if (!framework) {
      throw new NotFoundException(`Framework ${code} not found`);
    }

    return framework;
  }

  /**
   * Get all questions for a framework
   */
  async getQuestions(frameworkCode: FrameworkCode) {
    const framework = await this.getFramework(frameworkCode);

    return this.questionsRepository.find({
      where: {
        frameworkId: framework.id,
        isActive: true,
      },
      order: { orderIndex: 'ASC' },
      select: ['id', 'questionText', 'dimension', 'options', 'orderIndex'],
    });
  }

  /**
   * Create a new test session
   */
  async createTest(userId: string, dto: CreateTestDto) {
    const framework = await this.getFramework(dto.frameworkCode);

    const testResult = this.testResultsRepository.create({
      userId,
      frameworkId: framework.id,
      status: TestStatus.IN_PROGRESS,
    });

    return this.testResultsRepository.save(testResult);
  }

  /**
   * Submit answers and calculate result
   */
  async submitAnswers(userId: string, testResultId: string, dto: SubmitAnswersDto) {
    // Get test result
    const testResult = await this.testResultsRepository.findOne({
      where: { id: testResultId, userId },
      relations: ['framework'],
    });

    if (!testResult) {
      throw new NotFoundException('Test result not found');
    }

    if (testResult.status === TestStatus.COMPLETED) {
      throw new BadRequestException('Test already completed');
    }

    // Get all questions
    const questions = await this.questionsRepository.find({
      where: { frameworkId: testResult.frameworkId },
    });

    // Validate that all questions are answered
    const questionIds = questions.map((q) => q.id);
    const answeredQuestionIds = dto.answers.map((a) => a.questionId);

    const missingAnswers = questionIds.filter((id) => !answeredQuestionIds.includes(id));
    if (missingAnswers.length > 0) {
      throw new BadRequestException('Not all questions have been answered');
    }

    // Save answers
    const answers = dto.answers.map((answer) =>
      this.answersRepository.create({
        userId,
        questionId: answer.questionId,
        selectedValue: answer.selectedValue,
        testResultId: testResult.id,
      }),
    );

    await this.answersRepository.save(answers);

    // Calculate scores based on framework
    const scores = this.scoringService.calculateScores(
      testResult.framework.code,
      questions,
      answers,
    );

    // Determine personality type
    const personalityType = await this.scoringService.determineType(
      testResult.framework.code,
      scores,
    );

    // Get full personality type details
    const typeDetails = await this.typesRepository.findOne({
      where: { id: personalityType.id },
    });

    if (!typeDetails) {
      throw new NotFoundException('Personality type details not found');
    }

    // Update test result
    testResult.scores = scores;
    testResult.personalityTypeId = personalityType.id;
    testResult.status = TestStatus.COMPLETED;
    testResult.completedAt = new Date();
    testResult.resultData = {
      type: typeDetails.code,
      name: typeDetails.name,
      title: typeDetails.title,
      description: typeDetails.description,
      scores,
    };

    await this.testResultsRepository.save(testResult);

    // Update user's mbti_type if this is an MBTI test
    if (testResult.framework.code === FrameworkCode.MBTI) {
      await this.userRepository.update(
        { id: userId },
        { mbti_type: typeDetails.code }
      );
    }

    // Award +50 XP for completing test
    let xpResult: Awaited<ReturnType<typeof this.gamificationService.addXP>> | null = null;
    try {
      xpResult = await this.gamificationService.addXP(userId, {
        source: XpSource.TEST_COMPLETED,
        amount: 50,
        description: `Teste ${testResult.framework.code.toUpperCase()} completado`,
      });
    } catch (error) {
      console.error('Error awarding XP for test completion:', error);
    }

    return {
      testResultId: testResult.id,
      personalityType: typeDetails,
      scores,
      completedAt: testResult.completedAt,
      xpAwarded: 50,
      totalXp: xpResult?.newXP,
      level: xpResult?.newLevel,
      leveledUp: xpResult?.leveledUp || false,
    };
  }

  /**
   * Get user's test results
   */
  async getUserTestResults(userId: string, frameworkCode?: FrameworkCode) {
    const where: any = { userId, status: TestStatus.COMPLETED };

    if (frameworkCode) {
      const framework = await this.getFramework(frameworkCode);
      where.frameworkId = framework.id;
    }

    return this.testResultsRepository.find({
      where,
      relations: ['framework', 'personalityType'],
      order: { completedAt: 'DESC' },
    });
  }

  /**
   * Get specific test result
   */
  async getTestResult(userId: string, testResultId: string) {
    const testResult = await this.testResultsRepository.findOne({
      where: { id: testResultId, userId },
      relations: ['framework', 'personalityType', 'answers', 'answers.question'],
    });

    if (!testResult) {
      throw new NotFoundException('Test result not found');
    }

    return testResult;
  }

  /**
   * Save a pre-calculated test result (for guest users or after login)
   * This is used when the test was completed client-side and we just need to save the result
   */
  async saveCalculatedResult(userId: string, dto: { framework: FrameworkCode; typeCode: string; resultData: any }) {
    const framework = await this.getFramework(dto.framework);

    // Find the personality type
    const personalityType = await this.typesRepository.findOne({
      where: {
        frameworkId: framework.id,
        code: dto.typeCode,
      },
    });

    if (!personalityType) {
      throw new NotFoundException(`Personality type ${dto.typeCode} not found for framework ${dto.framework}`);
    }

    // Create a completed test result
    const testResult = this.testResultsRepository.create({
      userId,
      frameworkId: framework.id,
      personalityTypeId: personalityType.id,
      status: TestStatus.COMPLETED,
      resultData: dto.resultData,
      completedAt: new Date(),
    });

    const savedResult = await this.testResultsRepository.save(testResult);

    // Update user's mbti_type if this is an MBTI test
    if (framework.code === FrameworkCode.MBTI) {
      await this.userRepository.update(
        { id: userId },
        { mbti_type: dto.typeCode }
      );
    }

    // Award +50 XP for completing test
    try {
      await this.gamificationService.addXP(userId, {
        source: XpSource.TEST_COMPLETED,
        amount: 50,
        description: `Teste ${framework.code.toUpperCase()} completado`,
      });
    } catch (error) {
      console.error('Error awarding XP for test completion:', error);
    }

    return savedResult;
  }

  /**
   * Get all personality types for a framework (for SEO pages)
   */
  async getPersonalityTypes(frameworkCode: FrameworkCode) {
    const framework = await this.getFramework(frameworkCode);

    return this.typesRepository.find({
      where: {
        frameworkId: framework.id,
        isActive: true,
      },
    });
  }

  /**
   * Get personality type by slug (for SEO pages)
   */
  async getPersonalityTypeBySlug(slug: string) {
    const type = await this.typesRepository.findOne({
      where: { slug, isActive: true },
      relations: ['framework'],
    });

    if (!type) {
      throw new NotFoundException(`Personality type with slug ${slug} not found`);
    }

    return type;
  }
}
