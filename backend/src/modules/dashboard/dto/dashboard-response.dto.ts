import { ApiProperty } from '@nestjs/swagger';

class UserSummaryDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  full_name: string;

  @ApiProperty()
  mbti_type: string;
}

class StreakDto {
  @ApiProperty()
  current: number;

  @ApiProperty()
  longest: number;
}

class StatsDto {
  @ApiProperty()
  level: number;

  @ApiProperty()
  xp: number;

  @ApiProperty()
  streak: StreakDto;

  @ApiProperty()
  tests_completed: number;
}

class DailyInsightDto {
  @ApiProperty()
  text: string;

  @ApiProperty()
  category: string;
}

export class DashboardResponseDto {
  @ApiProperty()
  user: UserSummaryDto;

  @ApiProperty()
  stats: StatsDto;

  @ApiProperty()
  daily_insight: DailyInsightDto;

  @ApiProperty({ required: false })
  current_challenge?: any;

  @ApiProperty({ type: [Object] })
  achievements: any[];

  @ApiProperty({ type: [Object] })
  recommended_content: any[];
}
