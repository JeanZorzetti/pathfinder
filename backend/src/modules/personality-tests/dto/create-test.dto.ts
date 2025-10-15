import { IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { FrameworkCode } from '../entities/personality-framework.entity';

export class CreateTestDto {
  @ApiProperty({ enum: FrameworkCode, example: FrameworkCode.MBTI })
  @IsEnum(FrameworkCode)
  @IsNotEmpty()
  frameworkCode: FrameworkCode;
}
