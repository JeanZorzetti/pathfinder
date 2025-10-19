import { Controller, Post, Body, UseGuards, Req, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import { PushSubscriptionDto, SendNotificationDto } from './dto/push-subscription.dto';

@ApiTags('notifications')
@Controller('notifications')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('subscribe')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Subscribe to push notifications' })
  @ApiResponse({ status: 200, description: 'Successfully subscribed' })
  @ApiResponse({ status: 400, description: 'Invalid subscription data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async subscribe(@Req() req, @Body() subscription: PushSubscriptionDto) {
    const userId = req.user.sub;
    return await this.notificationsService.subscribe(userId, subscription);
  }

  @Post('unsubscribe')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Unsubscribe from push notifications' })
  @ApiResponse({ status: 200, description: 'Successfully unsubscribed' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async unsubscribe(@Req() req, @Body() subscription: PushSubscriptionDto) {
    const userId = req.user.sub;
    await this.notificationsService.unsubscribe(userId, subscription);
    return { message: 'Unsubscribed successfully' };
  }

  @Get('subscriptions')
  @ApiOperation({ summary: 'Get user subscriptions' })
  @ApiResponse({ status: 200, description: 'Returns user subscriptions' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getUserSubscriptions(@Req() req) {
    const userId = req.user.sub;
    return await this.notificationsService.getUserSubscriptions(userId);
  }

  @Post('test')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send test notification to current user' })
  @ApiResponse({ status: 200, description: 'Test notification sent' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async sendTestNotification(@Req() req) {
    const userId = req.user.sub;
    const result = await this.notificationsService.sendNotification(userId, {
      title: 'Notificação de Teste',
      body: 'Esta é uma notificação de teste do Pathfinder!',
      icon: '/icons/icon-192x192.png',
      url: '/dashboard',
      tag: 'test-notification',
    });
    return {
      message: 'Test notification sent',
      result,
    };
  }

  @Post('send')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send custom notification (admin/dev only)' })
  @ApiResponse({ status: 200, description: 'Notification sent' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async sendCustomNotification(@Req() req, @Body() payload: SendNotificationDto) {
    const userId = req.user.sub;
    const result = await this.notificationsService.sendNotification(userId, payload);
    return {
      message: 'Notification sent',
      result,
    };
  }
}
