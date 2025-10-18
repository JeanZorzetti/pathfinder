import { Controller, Post, Get, Body, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { GamificationService } from './gamification.service';
import { AddXpDto, XpResponseDto } from './dto/add-xp.dto';

@ApiTags('gamification')
@ApiBearerAuth()
@Controller('progress')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Post('xp')
  @ApiOperation({
    summary: 'Add XP to user',
    description: 'Adds experience points to the authenticated user based on a specific action/source',
  })
  @ApiBody({ type: AddXpDto })
  @ApiResponse({
    status: 200,
    description: 'XP added successfully',
    type: XpResponseDto,
  })
  @ApiResponse({ status: 400, description: 'Invalid request or cooldown active' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  // @UseGuards(JwtAuthGuard) // Descomentar quando auth estiver integrado
  async addXP(@Body() dto: AddXpDto, @Req() req: any): Promise<XpResponseDto> {
    // TODO: Pegar userId do token JWT: req.user.id
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000'; // Mock
    return this.gamificationService.addXP(userId, dto);
  }

  @Get('xp/history')
  @ApiOperation({
    summary: 'Get XP transaction history',
    description: 'Returns the last 50 XP transactions for the authenticated user',
  })
  @ApiResponse({ status: 200, description: 'XP history retrieved' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getXPHistory(@Req() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.gamificationService.getUserXPHistory(userId);
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Get gamification stats',
    description: 'Returns total XP, level, progress, and transaction count',
  })
  @ApiResponse({ status: 200, description: 'Stats retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getStats(@Req() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.gamificationService.getUserXPStats(userId);
  }

  @Get('achievements')
  @ApiOperation({
    summary: 'Get user achievements',
    description: 'Returns all unlocked and available achievements for the authenticated user',
  })
  @ApiResponse({ status: 200, description: 'Achievements retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getAchievements(@Req() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    const mbtiType = req.user?.mbtiType; // Optional MBTI filtering
    return this.gamificationService.getUserAchievements(userId, mbtiType);
  }

  @Post('achievements/check')
  @ApiOperation({
    summary: 'Check and unlock achievements',
    description: 'Manually trigger achievement check for the authenticated user',
  })
  @ApiResponse({ status: 200, description: 'Achievements checked and unlocked if criteria met' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async checkAchievements(@Req() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    const mbtiType = req.user?.mbtiType;
    const unlockedAchievements = await this.gamificationService.checkAndUnlockAchievements(userId, mbtiType);
    return {
      success: true,
      unlockedCount: unlockedAchievements.length,
      newAchievements: unlockedAchievements,
    };
  }
}
