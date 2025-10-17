import { ApiProperty } from '@nestjs/swagger';

export class JournalStatsDto {
  @ApiProperty({ description: 'Total de entradas criadas', example: 42 })
  totalEntries: number;

  @ApiProperty({ description: 'Entradas criadas este mês', example: 8 })
  entriesThisMonth: number;

  @ApiProperty({ description: 'Sequência atual de dias escrevendo', example: 5 })
  currentStreak: number;

  @ApiProperty({ description: 'Maior sequência de dias escrevendo', example: 12 })
  longestStreak: number;

  @ApiProperty({
    description: 'Temas/tags mais usados',
    example: [
      { tag: 'carreira', count: 15 },
      { tag: 'relacionamentos', count: 10 },
      { tag: 'crescimento', count: 8 },
    ],
  })
  topTags: Array<{ tag: string; count: number }>;
}
