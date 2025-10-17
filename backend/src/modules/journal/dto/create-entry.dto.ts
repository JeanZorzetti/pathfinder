import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, MinLength, MaxLength, IsArray } from 'class-validator';

export class CreateEntryDto {
  @ApiProperty({
    description: 'O conteúdo da entrada do diário',
    example: 'Hoje foi um dia de muitas reflexões sobre minha carreira...',
    minLength: 10,
    maxLength: 5000,
  })
  @IsString()
  @MinLength(10, { message: 'A entrada deve ter pelo menos 10 caracteres' })
  @MaxLength(5000, { message: 'A entrada não pode exceder 5000 caracteres' })
  content: string;

  @ApiPropertyOptional({
    description: 'Humor/estado emocional durante a escrita',
    example: 'feliz',
    maxLength: 50,
  })
  @IsOptional()
  @IsString()
  @MaxLength(50)
  mood?: string;

  @ApiPropertyOptional({
    description: 'Tags para categorização',
    example: ['carreira', 'reflexão', 'crescimento'],
    isArray: true,
    type: String,
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
