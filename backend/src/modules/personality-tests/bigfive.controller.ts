import { Controller, Get, Post, Body, Param, UseGuards, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BigFiveService, BigFiveCalculateDto } from './bigfive.service';
import { BigFiveFacetService } from './bigfive-facet.service';

@ApiTags('Big Five Personality Test')
@Controller('personality-tests/bigfive')
export class BigFiveController {
  constructor(
    private readonly bigFiveService: BigFiveService,
    private readonly facetService: BigFiveFacetService,
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
}
