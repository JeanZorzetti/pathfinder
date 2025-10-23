import { Controller, Get, Post, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BigFiveService, BigFiveCalculateDto } from './bigfive.service';
import { BigFiveFacetService } from './bigfive-facet.service';
import { BigFiveCareerService } from './bigfive-career.service';
import { BigFiveCompatibilityService } from './bigfive-compatibility.service';

@ApiTags('Big Five Personality Test')
@Controller('personality-tests/bigfive')
export class BigFiveController {
  constructor(
    private readonly bigFiveService: BigFiveService,
    private readonly facetService: BigFiveFacetService,
    private readonly careerService: BigFiveCareerService,
    private readonly compatibilityService: BigFiveCompatibilityService,
  ) {}

  @Get('dimensions')
  @ApiOperation({ summary: 'Get all 5 Big Five dimensions (OCEAN)' })
  @ApiResponse({ status: 200, description: 'Returns all 5 dimensions with descriptions' })
  async getAllDimensions() {
    return this.bigFiveService.getAllDimensions();
  }

  @Get('dimensions/:code')
  @ApiOperation({ summary: 'Get specific dimension by code (O, C, E, A, or N)' })
  @ApiResponse({ status: 200, description: 'Returns dimension details' })
  @ApiResponse({ status: 404, description: 'Dimension not found' })
  async getDimensionByCode(@Param('code') code: string) {
    return this.bigFiveService.getDimensionByCode(code);
  }

  @Get('questions')
  @ApiOperation({ summary: 'Get all 60 Big Five questions' })
  @ApiResponse({ status: 200, description: 'Returns all questions ordered by index' })
  async getAllQuestions() {
    return this.bigFiveService.getAllQuestions();
  }

  @Get('questions/dimension/:code')
  @ApiOperation({ summary: 'Get questions for specific dimension (12 questions each)' })
  @ApiResponse({ status: 200, description: 'Returns questions for the dimension' })
  async getQuestionsByDimension(@Param('code') code: string) {
    return this.bigFiveService.getQuestionsByDimension(code);
  }

  @Post('calculate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calculate Big Five scores from 60 answers' })
  @ApiResponse({ status: 201, description: 'Returns calculated scores and saves result' })
  @ApiResponse({ status: 400, description: 'Invalid answers (must be 60 answers, 1-5 scale)' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async calculateScores(@Req() req: any, @Body() body: Omit<BigFiveCalculateDto, 'userId'>) {
    const userId = req.user?.id || req.user?.sub;

    const result = await this.bigFiveService.calculateScores({
      userId,
      answers: body.answers,
      completionTimeSeconds: body.completionTimeSeconds,
    });

    // Also return interpretations, percentiles, and facet scores
    return {
      id: result.id,
      userId: result.userId,
      scores: {
        openness: result.opennessScore,
        conscientiousness: result.conscientiousnessScore,
        extraversion: result.extraversionScore,
        agreeableness: result.agreeablenessScore,
        neuroticism: result.neuroticismScore,
      },
      facetScores: result.facetScores, // NEW: Facet scores (Phase 2.3)
      interpretations: {
        openness: this.bigFiveService.getScoreInterpretation(result.opennessScore),
        conscientiousness: this.bigFiveService.getScoreInterpretation(result.conscientiousnessScore),
        extraversion: this.bigFiveService.getScoreInterpretation(result.extraversionScore),
        agreeableness: this.bigFiveService.getScoreInterpretation(result.agreeablenessScore),
        neuroticism: this.bigFiveService.getScoreInterpretation(result.neuroticismScore),
      },
      percentiles: {
        openness: this.bigFiveService.getPercentile(result.opennessScore),
        conscientiousness: this.bigFiveService.getPercentile(result.conscientiousnessScore),
        extraversion: this.bigFiveService.getPercentile(result.extraversionScore),
        agreeableness: this.bigFiveService.getPercentile(result.agreeablenessScore),
        neuroticism: this.bigFiveService.getPercentile(result.neuroticismScore),
      },
      completionTimeSeconds: result.completionTimeSeconds,
      createdAt: result.createdAt,
    };
  }

  @Get('results/latest')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user\'s most recent Big Five result' })
  @ApiResponse({ status: 200, description: 'Returns latest result or null' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserLatestResult(@Req() req: any) {
    const userId = req.user?.id || req.user?.sub;
    return this.bigFiveService.getUserLatestResult(userId);
  }

  @Get('results/history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user\'s Big Five test history' })
  @ApiResponse({ status: 200, description: 'Returns all user results ordered by date' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserResults(@Req() req: any) {
    const userId = req.user?.id || req.user?.sub;
    return this.bigFiveService.getUserResults(userId);
  }

  @Get('results/:id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get specific result by ID' })
  @ApiResponse({ status: 200, description: 'Returns result details' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getResultById(@Param('id') id: string) {
    return this.bigFiveService.getResultById(id);
  }

  @Get('statistics')
  @ApiOperation({ summary: 'Get global Big Five statistics' })
  @ApiResponse({ status: 200, description: 'Returns total tests and average scores' })
  async getGlobalStatistics() {
    return this.bigFiveService.getGlobalStatistics();
  }

  // ==========================================
  // NEW: Facet Endpoints (Phase 2.3)
  // ==========================================

  @Get('facets')
  @ApiOperation({ summary: 'Get all 30 Big Five facets' })
  @ApiResponse({ status: 200, description: 'Returns all 30 facets organized by dimension' })
  async getAllFacets(@Query('lang') lang?: 'en' | 'pt') {
    return this.facetService.getAllFacets();
  }

  @Get('facets/dimension/:code')
  @ApiOperation({ summary: 'Get facets for specific dimension (6 facets per dimension)' })
  @ApiResponse({ status: 200, description: 'Returns facets for the dimension' })
  async getFacetsByDimension(@Param('code') code: string) {
    return this.facetService.getFacetsByDimension(code);
  }

  @Get('facets/:facetCode')
  @ApiOperation({ summary: 'Get specific facet by code (e.g., O1, C2, E3)' })
  @ApiResponse({ status: 200, description: 'Returns facet details' })
  @ApiResponse({ status: 404, description: 'Facet not found' })
  async getFacetByCode(@Param('facetCode') facetCode: string) {
    return this.facetService.getFacetByCode(facetCode);
  }

  @Get('results/:resultId/facets')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get facet scores and interpretations for a result' })
  @ApiResponse({ status: 200, description: 'Returns facet breakdown with interpretations' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getResultFacets(
    @Param('resultId') resultId: string,
    @Query('lang') lang: 'en' | 'pt' = 'pt',
  ) {
    const result = await this.bigFiveService.getResultById(resultId);

    if (!result.facetScores) {
      return {
        message: 'This result does not have facet scores. Please retake the test.',
        facets: [],
      };
    }

    return this.facetService.getFacetsWithInterpretations(result.facetScores, lang);
  }

  // ==========================================
  // NEW: Career Recommendation Endpoints (Phase 3)
  // ==========================================

  @Get('careers')
  @ApiOperation({ summary: 'Get all career profiles' })
  @ApiResponse({ status: 200, description: 'Returns all career profiles' })
  async getAllCareers() {
    return this.careerService.getAllCareers();
  }

  @Get('careers/category/:category')
  @ApiOperation({ summary: 'Get careers by category' })
  @ApiResponse({ status: 200, description: 'Returns careers in specified category' })
  async getCareersByCategory(@Param('category') category: string) {
    return this.careerService.getCareersByCategory(category);
  }

  @Get('careers/:id')
  @ApiOperation({ summary: 'Get specific career profile by ID' })
  @ApiResponse({ status: 200, description: 'Returns career details' })
  @ApiResponse({ status: 404, description: 'Career not found' })
  async getCareerById(@Param('id') id: string) {
    return this.careerService.getCareerById(id);
  }

  @Get('results/:resultId/career-matches')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get career recommendations based on personality result' })
  @ApiResponse({ status: 200, description: 'Returns ranked career matches with scores' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getCareerMatches(
    @Param('resultId') resultId: string,
    @Query('lang') lang: 'en' | 'pt' = 'pt',
  ) {
    return this.careerService.calculateCareerMatches(resultId, lang);
  }

  @Get('results/:resultId/career-matches/top')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get top 6 career recommendations (preview)' })
  @ApiResponse({ status: 200, description: 'Returns top 6 career matches' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getTopCareerMatches(
    @Param('resultId') resultId: string,
    @Query('limit') limit: number = 6,
    @Query('lang') lang: 'en' | 'pt' = 'pt',
  ) {
    return this.careerService.getTopMatches(resultId, limit, lang);
  }

  // ==========================================
  // NEW: Relationship Compatibility Endpoints (Phase 4)
  // ==========================================

  @Get('compatibility/insights')
  @ApiOperation({ summary: 'Get all compatibility insights' })
  @ApiResponse({ status: 200, description: 'Returns all compatibility insights' })
  async getAllCompatibilityInsights() {
    return this.compatibilityService.getAllInsights();
  }

  @Get('results/:resultId/relationship-insights')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get relationship insights based on personality result' })
  @ApiResponse({ status: 200, description: 'Returns personalized relationship insights' })
  @ApiResponse({ status: 404, description: 'Result not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getRelationshipInsights(
    @Param('resultId') resultId: string,
    @Query('lang') lang: 'en' | 'pt' = 'pt',
  ) {
    return this.compatibilityService.getRelationshipInsights(resultId, lang);
  }

  @Get('compatibility/compare/:resultId1/:resultId2')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Compare two Big Five results for compatibility' })
  @ApiResponse({ status: 200, description: 'Returns compatibility analysis' })
  @ApiResponse({ status: 404, description: 'One or both results not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async compareResults(
    @Param('resultId1') resultId1: string,
    @Param('resultId2') resultId2: string,
    @Query('lang') lang: 'en' | 'pt' = 'pt',
  ) {
    return this.compatibilityService.compareResults(resultId1, resultId2, lang);
  }
}
