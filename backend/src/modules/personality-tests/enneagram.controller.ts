import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EnneagramService, EnneagramAnswer, EnneagramResult } from './enneagram.service';
import { EnneagramType } from './entities/enneagram-type.entity';
import { EnneagramQuestion } from './entities/enneagram-question.entity';

class CalculateEnneagramDto {
  answers: EnneagramAnswer[];
}

class CompatibilityQueryDto {
  type1: string;
  type2: string;
}

@ApiTags('Enneagram')
@Controller('personality-tests/enneagram')
export class EnneagramController {
  constructor(private readonly enneagramService: EnneagramService) {}

  @Get('types')
  @ApiOperation({ summary: 'Get all 9 Enneagram types' })
  @ApiResponse({
    status: 200,
    description: 'Returns all 9 Enneagram personality types with descriptions',
    type: [EnneagramType]
  })
  async getAllTypes(): Promise<EnneagramType[]> {
    return this.enneagramService.getAllTypes();
  }

  @Get('types/:id')
  @ApiOperation({ summary: 'Get specific Enneagram type by ID' })
  @ApiResponse({
    status: 200,
    description: 'Returns detailed information about a specific Enneagram type',
    type: EnneagramType
  })
  @ApiResponse({
    status: 404,
    description: 'Type not found'
  })
  async getTypeById(@Param('id') id: string): Promise<EnneagramType> {
    return this.enneagramService.getTypeById(id);
  }

  @Get('questions')
  @ApiOperation({ summary: 'Get all 50 Enneagram test questions' })
  @ApiResponse({
    status: 200,
    description: 'Returns all 50 questions for the Enneagram personality test',
    type: [EnneagramQuestion]
  })
  async getQuestions(): Promise<EnneagramQuestion[]> {
    return this.enneagramService.getQuestions();
  }

  @Post('calculate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calculate Enneagram result from answers' })
  @ApiResponse({
    status: 200,
    description: 'Returns calculated Enneagram type with wing, scores, and percentages',
    schema: {
      example: {
        primaryType: {
          id: 'type1',
          number: 1,
          name: 'O Perfeccionista',
          nameEn: 'The Reformer',
          coreFear: 'Ser corrupto, mau, defeituoso ou imperfeito',
          coreDesire: 'Ser bom, íntegro, equilibrado e ter integridade',
          strengths: ['Forte senso ético', 'Organizado'],
          weaknesses: ['Autocrítico', 'Perfeccionismo']
        },
        wing: '1w9',
        scores: [
          { typeId: 'type1', typeName: 'O Perfeccionista', score: 87, rawScore: 45 },
          { typeId: 'type9', typeName: 'O Pacificador', score: 72, rawScore: 32 }
        ],
        percentages: [
          { typeId: 'type1', percentage: 18 },
          { typeId: 'type9', percentage: 15 }
        ]
      }
    }
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized - JWT token required'
  })
  async calculateResult(@Body() dto: CalculateEnneagramDto): Promise<EnneagramResult> {
    return this.enneagramService.calculateResult(dto.answers);
  }

  @Get('compatibility/:type1/:type2')
  @ApiOperation({ summary: 'Get compatibility score between two Enneagram types' })
  @ApiResponse({
    status: 200,
    description: 'Returns compatibility score and description',
    schema: {
      example: {
        compatibilityScore: 85,
        description: 'O Ajudante e O Desafiador têm alta compatibilidade. Suas energias se complementam bem e compartilham valores importantes.'
      }
    }
  })
  async getCompatibility(
    @Param('type1') type1: string,
    @Param('type2') type2: string
  ): Promise<{ compatibilityScore: number; description: string }> {
    return this.enneagramService.getCompatibility(type1, type2);
  }
}
