import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../auth/decorators/public.decorator';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalityFramework } from '../personality-tests/entities/personality-framework.entity';
import { PersonalityType } from '../personality-tests/entities/personality-type.entity';
import { Question } from '../personality-tests/entities/question.entity';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(
    @InjectRepository(PersonalityFramework)
    private frameworksRepository: Repository<PersonalityFramework>,
    @InjectRepository(PersonalityType)
    private typesRepository: Repository<PersonalityType>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}
  @Get()
  @Public()
  @ApiOperation({ summary: 'Health check endpoint' })
  check() {
    return {
      success: true,
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV,
    };
  }

  @Get('ready')
  @Public()
  @ApiOperation({ summary: 'Readiness check endpoint' })
  ready() {
    return {
      success: true,
      status: 'ready',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('live')
  @Public()
  @ApiOperation({ summary: 'Liveness check endpoint' })
  live() {
    return {
      success: true,
      status: 'alive',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('db-status')
  @Public()
  @ApiOperation({ summary: 'Check database seeding status' })
  async dbStatus() {
    const frameworksCount = await this.frameworksRepository.count();
    const typesCount = await this.typesRepository.count();
    const questionsCount = await this.questionsRepository.count();

    return {
      success: true,
      database: {
        frameworks: frameworksCount,
        types: typesCount,
        questions: questionsCount,
        expectedFrameworks: 3,
        expectedTypes: 31,
        expectedQuestions: 97,
        isSeeded: frameworksCount >= 3 && typesCount >= 31 && questionsCount >= 97,
      },
      message: frameworksCount === 0
        ? 'Database is empty. Run seed via /health/seed-database'
        : 'Database has data',
    };
  }

  @Post('seed-database')
  @Public()
  @ApiOperation({
    summary: 'Seed database (WARNING: Run only once in production)',
    description: 'Populates database with 3 frameworks, 31 personality types, and 97 questions'
  })
  async seedDatabase() {
    try {
      // Import seed service inline to avoid build issues
      const { SeedService } = await import('../../database/seeds/seed.service');
      const seedService = new SeedService(
        this.frameworksRepository,
        this.typesRepository,
        this.questionsRepository,
      );

      await seedService.seedAll();

      return {
        success: true,
        message: 'Database seeded successfully!',
        data: {
          frameworks: await this.frameworksRepository.count(),
          types: await this.typesRepository.count(),
          questions: await this.questionsRepository.count(),
        },
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to seed database',
        error: error.message,
      };
    }
  }
}
