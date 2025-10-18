import { IsString, IsNotEmpty, IsObject, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FrameworkCode } from '../entities/personality-framework.entity';

export class SaveCalculatedResultDto {
  @ApiProperty({ enum: FrameworkCode, example: 'mbti' })
  @IsEnum(FrameworkCode)
  @IsNotEmpty()
  framework: FrameworkCode;

  @ApiProperty({ example: 'INTJ', description: 'The calculated personality type code' })
  @IsString()
  @IsNotEmpty()
  typeCode: string;

  @ApiProperty({
    description: 'Complete result data with scores, percentages, etc',
    example: {
      type: 'INTJ',
      scores: { I: 65, N: 78, T: 82, J: 71 },
      dimensions: [...],
    },
  })
  @IsObject()
  @IsNotEmpty()
  resultData: Record<string, any>;
}
