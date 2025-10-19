import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class KeysDto {
  @ApiProperty({
    description: 'P256DH key for encryption',
    example: 'BHxSHtYS0v...',
  })
  @IsString()
  @IsNotEmpty()
  p256dh: string;

  @ApiProperty({
    description: 'Auth secret for encryption',
    example: 'aBcDeFgHiJ...',
  })
  @IsString()
  @IsNotEmpty()
  auth: string;
}

export class PushSubscriptionDto {
  @ApiProperty({
    description: 'Push notification endpoint URL',
    example: 'https://fcm.googleapis.com/fcm/send/...',
  })
  @IsString()
  @IsNotEmpty()
  endpoint: string;

  @ApiProperty({
    description: 'Encryption keys for push notifications',
    type: KeysDto,
  })
  @ValidateNested()
  @Type(() => KeysDto)
  keys: KeysDto;
}

export class SendNotificationDto {
  @ApiProperty({
    description: 'Notification title',
    example: 'Seu Insight Diário',
  })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'Notification body text',
    example: 'Um novo insight está disponível para você!',
  })
  @IsString()
  @IsNotEmpty()
  body: string;

  @ApiProperty({
    description: 'Icon URL',
    example: '/icons/icon-192x192.png',
    required: false,
  })
  @IsString()
  icon?: string;

  @ApiProperty({
    description: 'URL to open when notification is clicked',
    example: '/dashboard',
    required: false,
  })
  @IsString()
  url?: string;

  @ApiProperty({
    description: 'Notification tag for grouping',
    example: 'daily-insight',
    required: false,
  })
  @IsString()
  tag?: string;
}
