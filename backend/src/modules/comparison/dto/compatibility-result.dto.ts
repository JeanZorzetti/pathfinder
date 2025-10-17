import { ApiProperty } from '@nestjs/swagger';

export class CompatibilityResultDto {
  @ApiProperty({
    description: 'Informações do primeiro usuário',
    example: { mbtiType: 'INTJ', code: 'INTJ-X3M8P5' },
  })
  user1: {
    mbtiType: string;
    code: string;
  };

  @ApiProperty({
    description: 'Informações do segundo usuário',
    example: { mbtiType: 'ENFP', code: 'ENFP-A7K9M2' },
  })
  user2: {
    mbtiType: string;
    code: string;
  };

  @ApiProperty({
    description: 'Pontuação de compatibilidade (0-100)',
    example: 75,
    minimum: 0,
    maximum: 100,
  })
  score: number;

  @ApiProperty({
    description: 'Nível de compatibilidade',
    example: 'Boa',
    enum: ['Excelente', 'Boa', 'Moderada', 'Desafiadora'],
  })
  level: string;

  @ApiProperty({
    description: 'Cor para representação visual (hex)',
    example: '#3b82f6',
  })
  color: string;

  @ApiProperty({
    description: 'Pontos fortes da combinação',
    example: [
      'Introvertido + Extrovertido se complementam',
      'Pensador + Sentimental criam equilíbrio',
    ],
    isArray: true,
    type: String,
  })
  strengths: string[];

  @ApiProperty({
    description: 'Desafios da combinação',
    example: [
      'Sensor + Intuitivo: um foca no concreto, outro no abstrato',
      'Julgador + Perceptivo: um planeja, outro improvisa',
    ],
    isArray: true,
    type: String,
  })
  challenges: string[];

  @ApiProperty({
    description: 'Dicas de comunicação personalizadas',
    example: [
      'INTJ: Valide emoções antes de oferecer soluções para ENFP',
      'ENFP: INTJ não é insensível, apenas processa logicamente primeiro',
    ],
    isArray: true,
    type: String,
  })
  communicationTips: string[];
}

export class ComparisonCodeDto {
  @ApiProperty({
    description: 'Código de comparação do usuário',
    example: 'INTJ-X3M8P5',
  })
  code: string;

  @ApiProperty({
    description: 'Tipo MBTI do usuário',
    example: 'INTJ',
  })
  mbtiType: string;

  @ApiProperty({
    description: 'ID do usuário',
    example: '4134f520-f46b-42aa-af80-411e53371206',
  })
  userId: string;
}

export class ComparisonHistoryItemDto {
  @ApiProperty({
    description: 'ID do histórico',
    example: '9a8b7c6d-5e4f-3a2b-1c0d-9e8f7a6b5c4d',
  })
  id: string;

  @ApiProperty({
    description: 'Código comparado',
    example: 'ENFP-A7K9M2',
  })
  comparedCode: string;

  @ApiProperty({
    description: 'Tipo MBTI comparado',
    example: 'ENFP',
  })
  comparedMbti: string;

  @ApiProperty({
    description: 'Pontuação de compatibilidade',
    example: 75,
  })
  compatibilityScore: number;

  @ApiProperty({
    description: 'Data da comparação',
    example: '2025-10-17T22:30:00.000Z',
  })
  createdAt: Date;
}
