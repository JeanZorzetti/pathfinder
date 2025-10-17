import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsPositive } from 'class-validator';

export enum XpSource {
  TEST_COMPLETED = 'test_completed',
  JOURNAL_ENTRY = 'journal_entry',
  STREAK_MILESTONE = 'streak_milestone',
  CONTENT_READ = 'content_read',
  CHALLENGE_COMPLETED = 'challenge_completed',
  SHARE_RESULT = 'share_result',
  ACHIEVEMENT_UNLOCKED = 'achievement_unlocked',
}

export class AddXpDto {
  @ApiProperty({
    enum: XpSource,
    description: 'Source of XP gain',
    example: XpSource.TEST_COMPLETED,
  })
  @IsEnum(XpSource)
  source: XpSource;

  @ApiProperty({
    description: 'Amount of XP to add',
    example: 100,
    minimum: 1,
  })
  @IsInt()
  @IsPositive()
  amount: number;
}

export class XpResponseDto {
  @ApiProperty({ description: 'New total XP' })
  newXP: number;

  @ApiProperty({ description: 'Whether user leveled up' })
  leveledUp: boolean;

  @ApiProperty({ description: 'New level if leveled up' })
  newLevel?: number;

  @ApiProperty({ description: 'Old level before XP gain' })
  oldLevel: number;
}
