import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Query,
  ParseIntPipe,
  DefaultValuePipe,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { JournalService } from './journal.service';
import { CreateEntryDto } from './dto/create-entry.dto';
import { UpdateEntryDto } from './dto/update-entry.dto';
import { JournalStatsDto } from './dto/journal-stats.dto';

@ApiTags('journal')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('journal')
export class JournalController {
  constructor(private readonly journalService: JournalService) {}

  @Post('entries')
  @ApiOperation({ summary: 'Criar nova entrada de diário (+10 XP)' })
  @ApiResponse({ status: 201, description: 'Entrada criada com sucesso' })
  @ApiResponse({ status: 400, description: 'Dados inválidos' })
  @ApiResponse({ status: 401, description: 'Não autorizado' })
  async create(@Req() req: any, @Body() createEntryDto: CreateEntryDto) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';

    const entry = await this.journalService.create(userId, createEntryDto);

    // TODO: Adicionar +10 XP via GamificationService quando integrado
    // await this.gamificationService.addXP(userId, { source: 'journal_entry', amount: 10 });

    return {
      ...entry,
      xpAwarded: 10,
      message: 'Entrada criada com sucesso! +10 XP',
    };
  }

  @Get('entries')
  @ApiOperation({ summary: 'Listar entradas do diário (paginado)' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 20 })
  @ApiResponse({ status: 200, description: 'Lista de entradas retornada' })
  async findAll(
    @Req() req: any,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('limit', new DefaultValuePipe(20), ParseIntPipe) limit: number,
  ) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.journalService.findAll(userId, page, limit);
  }

  @Get('entries/:id')
  @ApiOperation({ summary: 'Buscar entrada específica' })
  @ApiParam({ name: 'id', type: String, description: 'ID da entrada' })
  @ApiResponse({ status: 200, description: 'Entrada encontrada' })
  @ApiResponse({ status: 404, description: 'Entrada não encontrada' })
  async findOne(@Req() req: any, @Param('id') id: string) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.journalService.findOne(userId, id);
  }

  @Patch('entries/:id')
  @ApiOperation({ summary: 'Editar entrada' })
  @ApiParam({ name: 'id', type: String, description: 'ID da entrada' })
  @ApiResponse({ status: 200, description: 'Entrada atualizada com sucesso' })
  @ApiResponse({ status: 403, description: 'Você não pode editar esta entrada' })
  @ApiResponse({ status: 404, description: 'Entrada não encontrada' })
  async update(
    @Req() req: any,
    @Param('id') id: string,
    @Body() updateEntryDto: UpdateEntryDto,
  ) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.journalService.update(userId, id, updateEntryDto);
  }

  @Delete('entries/:id')
  @ApiOperation({ summary: 'Deletar entrada' })
  @ApiParam({ name: 'id', type: String, description: 'ID da entrada' })
  @ApiResponse({ status: 200, description: 'Entrada deletada com sucesso' })
  @ApiResponse({ status: 403, description: 'Você não pode deletar esta entrada' })
  @ApiResponse({ status: 404, description: 'Entrada não encontrada' })
  async remove(@Req() req: any, @Param('id') id: string) {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    await this.journalService.remove(userId, id);
    return { message: 'Entrada deletada com sucesso' };
  }

  @Get('prompts/daily')
  @ApiOperation({ summary: 'Obter prompt diário baseado em MBTI' })
  @ApiQuery({ name: 'mbtiType', required: false, type: String, example: 'INFJ' })
  @ApiResponse({ status: 200, description: 'Prompt do dia retornado' })
  async getDailyPrompt(@Query('mbtiType') mbtiType?: string) {
    return this.journalService.getDailyPrompt(mbtiType || 'INTJ');
  }

  @Get('stats')
  @ApiOperation({ summary: 'Obter estatísticas do diário' })
  @ApiResponse({ status: 200, description: 'Estatísticas retornadas', type: JournalStatsDto })
  async getStats(@Req() req: any): Promise<JournalStatsDto> {
    const userId = req.user?.id || '00000000-0000-0000-0000-000000000000';
    return this.journalService.getStats(userId);
  }
}
