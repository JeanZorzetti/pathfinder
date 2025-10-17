import { ApiProperty } from '@nestjs/swagger';

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
