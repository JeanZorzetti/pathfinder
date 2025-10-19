import { Controller, Get, Post, Body, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ContentLibraryService } from './content-library.service';

@ApiTags('content-library')
@Controller('content-library')
export class ContentLibraryController {
  constructor(private readonly contentLibraryService: ContentLibraryService) {}

  @Get('recommended')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get recommended content for user' })
  async getRecommended(
    @Request() req,
    @Query('limit') limit?: number,
  ) {
    const userId = req.user.sub;
    return await this.contentLibraryService.getRecommendedContent(
      userId,
      limit ? parseInt(limit.toString()) : 4,
    );
  }

  @Post('mark-consumed')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Mark content as consumed and award XP' })
  async markConsumed(
    @Request() req,
    @Body('contentId') contentId: string,
  ) {
    const userId = req.user.sub;
    await this.contentLibraryService.markAsConsumed(userId, contentId);
    return { success: true, message: 'Conteúdo marcado como consumido e XP concedido' };
  }

  @Get('history')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get user content consumption history' })
  async getHistory(@Request() req) {
    const userId = req.user.sub;
    return await this.contentLibraryService.getHistory(userId);
  }
}
