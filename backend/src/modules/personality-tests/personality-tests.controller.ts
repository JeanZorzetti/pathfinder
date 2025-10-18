import { Controller, Get, Post, Body, Param, UseGuards, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiResponse, ApiParam } from '@nestjs/swagger';
import { PersonalityTestsService } from './personality-tests.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { Public } from '../auth/decorators/public.decorator';
import { CurrentUser, CurrentUserData } from '../auth/decorators/current-user.decorator';
import { CreateTestDto } from './dto/create-test.dto';
import { SubmitAnswersDto } from './dto/submit-answers.dto';
import { SaveCalculatedResultDto } from './dto/save-calculated-result.dto';
import { FrameworkCode } from './entities/personality-framework.entity';

@ApiTags('personality-tests')
@Controller('personality-tests')
export class PersonalityTestsController {
  constructor(private readonly testsService: PersonalityTestsService) {}

  @Get('frameworks')
  @Public()
  @ApiOperation({ summary: 'Get all available personality frameworks' })
  @ApiResponse({ status: 200, description: 'Frameworks retrieved successfully' })
  async getFrameworks() {
    const frameworks = await this.testsService.getFrameworks();
    return {
      success: true,
      data: frameworks,
    };
  }

  @Get('frameworks/:code')
  @Public()
  @ApiOperation({ summary: 'Get framework details by code' })
  @ApiParam({ name: 'code', enum: FrameworkCode })
  @ApiResponse({ status: 200, description: 'Framework retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Framework not found' })
  async getFramework(@Param('code') code: FrameworkCode) {
    const framework = await this.testsService.getFramework(code);
    return {
      success: true,
      data: framework,
    };
  }

  @Get('frameworks/:code/questions')
  @Public()
  @ApiOperation({ summary: 'Get all questions for a framework' })
  @ApiParam({ name: 'code', enum: FrameworkCode })
  @ApiResponse({ status: 200, description: 'Questions retrieved successfully' })
  async getQuestions(@Param('code') code: FrameworkCode) {
    const questions = await this.testsService.getQuestions(code);
    return {
      success: true,
      data: questions,
    };
  }

  @Get('types/:slug')
  @Public()
  @ApiOperation({ summary: 'Get personality type by slug (for SEO pages)' })
  @ApiResponse({ status: 200, description: 'Type retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Type not found' })
  async getTypeBySlug(@Param('slug') slug: string) {
    const type = await this.testsService.getPersonalityTypeBySlug(slug);
    return {
      success: true,
      data: type,
    };
  }

  @Get('types')
  @Public()
  @ApiOperation({ summary: 'Get all personality types for a framework' })
  @ApiResponse({ status: 200, description: 'Types retrieved successfully' })
  async getTypes(@Query('framework') framework: FrameworkCode) {
    const types = await this.testsService.getPersonalityTypes(framework);
    return {
      success: true,
      data: types,
    };
  }

  @Post('start')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Start a new test session' })
  @ApiResponse({ status: 201, description: 'Test session created successfully' })
  async startTest(@CurrentUser() user: CurrentUserData, @Body() createTestDto: CreateTestDto) {
    const testResult = await this.testsService.createTest(user.id, createTestDto);
    return {
      success: true,
      message: 'Test session created',
      data: testResult,
    };
  }

  @Post(':testResultId/submit')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Submit test answers and get results' })
  @ApiResponse({ status: 200, description: 'Test completed successfully' })
  @ApiResponse({ status: 400, description: 'Invalid answers or test already completed' })
  @ApiResponse({ status: 404, description: 'Test not found' })
  async submitAnswers(
    @CurrentUser() user: CurrentUserData,
    @Param('testResultId') testResultId: string,
    @Body() submitAnswersDto: SubmitAnswersDto,
  ) {
    const result = await this.testsService.submitAnswers(user.id, testResultId, submitAnswersDto);
    return {
      success: true,
      message: 'Test completed successfully',
      data: result,
    };
  }

  @Get('my-results')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get current user test results' })
  @ApiResponse({ status: 200, description: 'Results retrieved successfully' })
  async getMyResults(
    @CurrentUser() user: CurrentUserData,
    @Query('framework') framework?: FrameworkCode,
  ) {
    const results = await this.testsService.getUserTestResults(user.id, framework);
    return {
      success: true,
      data: results,
    };
  }

  @Get('results/:testResultId')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get specific test result details' })
  @ApiResponse({ status: 200, description: 'Result retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  async getTestResult(
    @CurrentUser() user: CurrentUserData,
    @Param('testResultId') testResultId: string,
  ) {
    const result = await this.testsService.getTestResult(user.id, testResultId);
    return {
      success: true,
      data: result,
    };
  }

  @Post('save-result')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Save a pre-calculated test result',
    description: 'Used when user completes test client-side and later logs in/registers',
  })
  @ApiResponse({ status: 201, description: 'Result saved successfully' })
  @ApiResponse({ status: 404, description: 'Personality type not found' })
  async saveCalculatedResult(
    @CurrentUser() user: CurrentUserData,
    @Body() dto: SaveCalculatedResultDto,
  ) {
    const result = await this.testsService.saveCalculatedResult(user.id, dto);
    return {
      success: true,
      message: 'Test result saved successfully',
      data: result,
    };
  }
}
