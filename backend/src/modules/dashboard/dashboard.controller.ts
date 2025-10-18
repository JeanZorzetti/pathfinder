import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DashboardService } from './dashboard.service';
import { DashboardResponseDto } from './dto/dashboard-response.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('dashboard')
@ApiBearerAuth()
@Controller('dashboard')
@UseGuards(JwtAuthGuard)
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Get()
  @ApiOperation({ summary: 'Get complete dashboard data for current user' })
  @ApiResponse({ status: 200, description: 'Dashboard data retrieved successfully', type: DashboardResponseDto })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getDashboard(@Req() req: any): Promise<any> {
    const userId = req.user?.id;

    if (!userId) {
      throw new Error('User ID not found in request');
    }

    return this.dashboardService.getDashboard(userId);
  }

  @Get('stats')
  @ApiOperation({ summary: 'Get user statistics (XP, level, streak)' })
  @ApiResponse({ status: 200, description: 'Stats retrieved successfully' })
  async getStats(@Req() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.dashboardService.getStats(userId);
  }

  @Get('insights/daily')
  @ApiOperation({ summary: 'Get daily insight based on MBTI type' })
  @ApiResponse({ status: 200, description: 'Daily insight retrieved successfully' })
  async getDailyInsight(@Req() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.dashboardService.getDailyInsight(userId);
  }
}
