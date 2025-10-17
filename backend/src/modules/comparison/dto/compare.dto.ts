import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class CompareDto {
  @ApiProperty({
    description: 'Código de comparação do outro usuário',
    example: 'ENFP-A7K9M2',
    minLength: 11,
    maxLength: 11,
    pattern: '^[A-Z]{4}-[A-Z0-9]{6}$',
  })
  @IsString()
  @MinLength(11, { message: 'Código deve ter exatamente 11 caracteres' })
  @MaxLength(11, { message: 'Código deve ter exatamente 11 caracteres' })
  @Matches(/^[A-Z]{4}-[A-Z0-9]{6}$/, {
    message: 'Formato inválido. Use: MBTI-XXXXXX (ex: ENFP-A7K9M2)',
  })
  code: string;
}
