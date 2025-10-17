import { Controller, Get, Post, Body, Req, Param, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { ChallengesService } from './challenges.service';
import { CurrentChallengeDto, CompleteDayDto, ChallengeStatsDto } from './dto/current-challenge.dto';

@ApiTags('challenges')
@ApiBearerAuth()
@Controller('challenges')
export class ChallengesController {
  constructor(private readonly challengesService: ChallengesService) {}

  @Get('current')
  @ApiOperation({ summary: 'Get current week challenge for user' })
  @ApiResponse({ status: 200, description: 'Current challenge retrieved successfully', type: CurrentChallengeDto })
  @ApiQuery({ name: 'mbtiType', required: false, description: 'MBTI type for challenge selection' })
  async getCurrentChallenge(@Req() req: any, @Query('mbtiType') mbtiType?: string): Promise<CurrentChallengeDto> {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.challengesService.getCurrentChallenge(userId, mbtiType || 'INTJ');
  }

  @Post('complete-day')
  @ApiOperation({ summary: 'Mark a day of the challenge as complete' })
  @ApiBody({ type: CompleteDayDto })
  @ApiResponse({ status: 200, description: 'Day marked as complete successfully', type: CurrentChallengeDto })
  @ApiResponse({ status: 400, description: 'Bad request (invalid day, already completed, etc.)' })
  @ApiResponse({ status: 404, description: 'No active challenge found' })
  async completeChallengeDay(@Req() req: any, @Body() dto: CompleteDayDto): Promise<CurrentChallengeDto> {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.challengesService.completeChallengeDay(userId, dto.day);
  }

  @Get('history')
  @ApiOperation({ summary: 'Get history of completed challenges' })
  @ApiQuery({ name: 'limit', required: false, type: Number, description: 'Number of challenges to return (default: 10)' })
  @ApiResponse({ status: 200, description: 'Challenge history retrieved successfully', type: [CurrentChallengeDto] })
  async getChallengeHistory(@Req() req: any, @Query('limit') limit?: string): Promise<CurrentChallengeDto[]> {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    const limitNum = limit ? parseInt(limit, 10) : 10;
    return this.challengesService.getChallengeHistory(userId, limitNum);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get challenge statistics for user' })
  @ApiResponse({ status: 200, description: 'Challenge stats retrieved successfully', type: ChallengeStatsDto })
  async getChallengeStats(@Req() req: any): Promise<ChallengeStatsDto> {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.challengesService.getChallengeStats(userId);
  }
}
