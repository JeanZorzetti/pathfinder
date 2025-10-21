import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max, IsInt } from 'class-validator';

export class CurrentChallengeDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  emoji: string;

  @ApiProperty({ type: [Boolean] })
  daysCompleted: boolean[];

  @ApiProperty()
  weekStartDate: string;

  @ApiProperty()
  xpReward: number;

  @ApiProperty()
  isCompleted: boolean;

  @ApiProperty()
  completedDaysCount: number;
}

export class CompleteDayDto {
  @ApiProperty({ minimum: 0, maximum: 4, description: 'Dia da semana (0=Segunda, 4=Sexta)' })
  @IsNumber()
  @IsInt({ message: 'O dia deve ser um número inteiro' })
  @Min(0, { message: 'O dia deve ser no mínimo 0 (Segunda-feira)' })
  @Max(4, { message: 'O dia deve ser no máximo 4 (Sexta-feira)' })
  day: number;
}

export class ChallengeStatsDto {
  @ApiProperty()
  totalCompleted: number;

  @ApiProperty()
  currentStreak: number;

  @ApiProperty()
  longestStreak: number;

  @ApiProperty()
  totalXPEarned: number;
}
