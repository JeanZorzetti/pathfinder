import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsInt, IsPositive, IsOptional, IsString } from 'class-validator';
import { XpSource } from '../entities/xp-transaction.entity';

// Re-export for convenience
export { XpSource };

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

  @ApiProperty({
    description: 'Optional description of XP transaction',
    example: 'Completed MBTI assessment',
    required: false,
  })
  @IsString()
  @IsOptional()
  description?: string;
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
