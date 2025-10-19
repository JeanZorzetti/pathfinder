import { Controller, Get, Post, Body, Req, Query, UseGuards } from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { ComparisonService } from './comparison.service';
import { CompareDto } from './dto/compare.dto';
import {
  CompatibilityResultDto,
  ComparisonCodeDto,
  ComparisonHistoryItemDto,
} from './dto/compatibility-result.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('comparison')
@ApiBearerAuth()
@Controller('comparison')
@UseGuards(JwtAuthGuard)
export class ComparisonController {
  constructor(private readonly comparisonService: ComparisonService) {}

  @Get('code')
  @ApiOperation({
    summary: 'Obter código de comparação do usuário',
    description:
      'Retorna o código único de comparação do usuário. Se não existir, gera um novo.',
  })
  @ApiResponse({
    status: 200,
    description: 'Código retornado com sucesso',
    type: ComparisonCodeDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Usuário precisa completar teste MBTI primeiro',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async getCode(@Req() req: any): Promise<ComparisonCodeDto> {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.comparisonService.getOrCreateCode(userId);
  }

  @Post('compare')
  @ApiOperation({
    summary: 'Comparar compatibilidade com outro código',
    description:
      'Calcula a compatibilidade entre o usuário atual e outro código MBTI. Salva no histórico.',
  })
  @ApiResponse({
    status: 200,
    description: 'Compatibilidade calculada com sucesso',
    type: CompatibilityResultDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Código inválido ou usuário sem MBTI',
  })
  @ApiResponse({
    status: 404,
    description: 'Usuário não encontrado',
  })
  async compare(
    @Req() req: any,
    @Body() compareDto: CompareDto,
  ): Promise<CompatibilityResultDto> {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.comparisonService.compare(userId, compareDto.code);
  }

  @Get('history')
  @ApiOperation({
    summary: 'Histórico de comparações',
    description: 'Retorna o histórico de comparações do usuário, ordenado por data (mais recente primeiro).',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    type: Number,
    description: 'Número máximo de resultados',
    example: 20,
  })
  @ApiResponse({
    status: 200,
    description: 'Histórico retornado com sucesso',
    type: [ComparisonHistoryItemDto],
  })
  async getHistory(
    @Req() req: any,
    @Query('limit') limit?: number,
  ): Promise<ComparisonHistoryItemDto[]> {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.comparisonService.getHistory(userId, limit || 20);
  }

  @Get('stats')
  @ApiOperation({
    summary: 'Estatísticas de comparações',
    description:
      'Retorna estatísticas sobre as comparações do usuário (total, média, melhor match, tipo mais comparado)',
  })
  @ApiResponse({
    status: 200,
    description: 'Estatísticas retornadas com sucesso',
  })
  async getStats(@Req() req: any) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.comparisonService.getStats(userId);
  }
}
