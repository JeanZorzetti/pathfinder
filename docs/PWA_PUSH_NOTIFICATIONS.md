# PWA Push Notifications Setup Guide

## Overview
This document provides instructions for setting up push notifications on the backend to complete the PWA implementation.

## Prerequisites
- Web Push library installed on backend: `npm install web-push`
- VAPID keys generated
- Service Worker registered on frontend (already done)

## Backend Implementation Steps

### 1. Generate VAPID Keys

Run this command on your backend:

```bash
npx web-push generate-vapid-keys
```

This will generate:
- **Public Key**: Used on the frontend (update in `frontend/src/utils/pushNotifications.ts`)
- **Private Key**: Keep this secret on the backend (use environment variable)

### 2. Environment Variables

Add to your backend `.env` file:

```env
VAPID_PUBLIC_KEY=<your-public-key>
VAPID_PRIVATE_KEY=<your-private-key>
VAPID_SUBJECT=mailto:your-email@example.com
```

### 3. Create Notifications Module

Create the following structure in your backend:

```
backend/src/modules/notifications/
├── notifications.module.ts
├── notifications.controller.ts
├── notifications.service.ts
├── dto/
│   └── push-subscription.dto.ts
└── entities/
    └── push-subscription.entity.ts
```

### 4. Push Subscription Entity

```typescript
// backend/src/modules/notifications/entities/push-subscription.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('push_subscriptions')
export class PushSubscription {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column()
  userId: string;

  @Column('text')
  endpoint: string;

  @Column('text')
  p256dh: string;

  @Column('text')
  auth: string;

  @CreateDateColumn()
  createdAt: Date;
}
```

### 5. Push Subscription DTO

```typescript
// backend/src/modules/notifications/dto/push-subscription.dto.ts
import { IsString, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class KeysDto {
  @IsString()
  @IsNotEmpty()
  p256dh: string;

  @IsString()
  @IsNotEmpty()
  auth: string;
}

export class PushSubscriptionDto {
  @IsString()
  @IsNotEmpty()
  endpoint: string;

  @ValidateNested()
  @Type(() => KeysDto)
  keys: KeysDto;
}
```

### 6. Notifications Service

```typescript
// backend/src/modules/notifications/notifications.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as webpush from 'web-push';
import { PushSubscription } from './entities/push-subscription.entity';
import { PushSubscriptionDto } from './dto/push-subscription.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(PushSubscription)
    private pushSubscriptionRepository: Repository<PushSubscription>,
  ) {
    // Configure web-push with VAPID keys
    webpush.setVapidDetails(
      process.env.VAPID_SUBJECT,
      process.env.VAPID_PUBLIC_KEY,
      process.env.VAPID_PRIVATE_KEY,
    );
  }

  async subscribe(userId: string, subscription: PushSubscriptionDto) {
    // Check if subscription already exists
    const existing = await this.pushSubscriptionRepository.findOne({
      where: {
        userId,
        endpoint: subscription.endpoint,
      },
    });

    if (existing) {
      return existing;
    }

    // Create new subscription
    const newSubscription = this.pushSubscriptionRepository.create({
      userId,
      endpoint: subscription.endpoint,
      p256dh: subscription.keys.p256dh,
      auth: subscription.keys.auth,
    });

    return await this.pushSubscriptionRepository.save(newSubscription);
  }

  async unsubscribe(userId: string, subscription: PushSubscriptionDto) {
    await this.pushSubscriptionRepository.delete({
      userId,
      endpoint: subscription.endpoint,
    });
  }

  async sendNotification(userId: string, payload: any) {
    const subscriptions = await this.pushSubscriptionRepository.find({
      where: { userId },
    });

    const notifications = subscriptions.map(sub => {
      const pushSubscription = {
        endpoint: sub.endpoint,
        keys: {
          p256dh: sub.p256dh,
          auth: sub.auth,
        },
      };

      return webpush.sendNotification(
        pushSubscription,
        JSON.stringify(payload),
      ).catch(error => {
        console.error('Error sending notification:', error);

        // Remove invalid subscriptions
        if (error.statusCode === 410) {
          this.pushSubscriptionRepository.delete({ id: sub.id });
        }
      });
    });

    await Promise.all(notifications);
  }

  async sendToAll(userIds: string[], payload: any) {
    const promises = userIds.map(userId => this.sendNotification(userId, payload));
    await Promise.all(promises);
  }
}
```

### 7. Notifications Controller

```typescript
// backend/src/modules/notifications/notifications.controller.ts
import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { NotificationsService } from './notifications.service';
import { PushSubscriptionDto } from './dto/push-subscription.dto';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post('subscribe')
  async subscribe(@Req() req, @Body() subscription: PushSubscriptionDto) {
    const userId = req.user.id;
    return await this.notificationsService.subscribe(userId, subscription);
  }

  @Post('unsubscribe')
  async unsubscribe(@Req() req, @Body() subscription: PushSubscriptionDto) {
    const userId = req.user.id;
    await this.notificationsService.unsubscribe(userId, subscription);
    return { message: 'Unsubscribed successfully' };
  }
}
```

### 8. Notifications Module

```typescript
// backend/src/modules/notifications/notifications.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { PushSubscription } from './entities/push-subscription.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PushSubscription])],
  controllers: [NotificationsController],
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}
```

### 9. Create Migration

```bash
npm run typeorm:generate -- src/migrations/CreatePushSubscriptions
npm run migration:run
```

### 10. Usage Examples

#### Send Daily Insight Notification

```typescript
// In your DashboardService or scheduled job
await this.notificationsService.sendNotification(userId, {
  title: 'Seu Insight Diário',
  body: 'Um novo insight está disponível para você!',
  icon: '/icons/icon-192x192.png',
  badge: '/icons/icon-72x72.png',
  url: '/dashboard',
  tag: 'daily-insight',
  requireInteraction: false,
});
```

#### Send Achievement Notification

```typescript
await this.notificationsService.sendNotification(userId, {
  title: 'Conquista Desbloqueada!',
  body: `Você desbloqueou: ${achievementTitle}`,
  icon: '/icons/icon-192x192.png',
  badge: '/icons/icon-72x72.png',
  url: '/dashboard#achievements',
  tag: 'achievement-unlocked',
  requireInteraction: true,
});
```

#### Send Challenge Notification

```typescript
await this.notificationsService.sendNotification(userId, {
  title: 'Novo Desafio Semanal',
  body: challengeDescription,
  icon: '/icons/icon-192x192.png',
  badge: '/icons/icon-72x72.png',
  url: '/dashboard#challenges',
  tag: 'weekly-challenge',
});
```

## Frontend Integration

### Update VAPID Public Key

After generating VAPID keys, update the public key in:

```typescript
// frontend/src/utils/pushNotifications.ts
const VAPID_PUBLIC_KEY = 'YOUR_ACTUAL_VAPID_PUBLIC_KEY';
```

### Add Notification Settings to Dashboard

Import and use the NotificationSettings component:

```typescript
import { NotificationSettings } from '@/components/pwa/NotificationSettings';

// In your settings page or dashboard
<NotificationSettings />
```

## Testing

### 1. Test Subscription

1. Open the app in a browser
2. Allow notifications when prompted
3. Check browser console for subscription logs
4. Verify subscription is saved in database

### 2. Test Notification Sending

Use the backend service to send a test notification:

```typescript
await notificationsService.sendNotification(userId, {
  title: 'Test Notification',
  body: 'This is a test push notification',
  icon: '/icons/icon-192x192.png',
  url: '/',
});
```

### 3. Test on Different Devices

- Desktop Chrome
- Desktop Firefox
- Desktop Edge
- Android Chrome
- iOS Safari (limited support)

## Production Considerations

### 1. Security
- Keep VAPID private key secure (never commit to git)
- Use environment variables for sensitive data
- Validate all subscription data

### 2. Performance
- Batch notification sends when possible
- Handle failed notifications gracefully
- Clean up expired subscriptions regularly

### 3. User Experience
- Don't ask for notification permission immediately
- Explain why notifications are useful
- Respect user's notification preferences
- Provide easy opt-out mechanism

### 4. Monitoring
- Log notification send success/failure rates
- Monitor subscription/unsubscription rates
- Track notification click-through rates

## Scheduled Notifications

### Daily Insights (Example Cron Job)

```typescript
// backend/src/modules/notifications/notifications.scheduler.ts
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { NotificationsService } from './notifications.service';
import { DashboardService } from '../dashboard/dashboard.service';

@Injectable()
export class NotificationsScheduler {
  constructor(
    private notificationsService: NotificationsService,
    private dashboardService: DashboardService,
  ) {}

  @Cron(CronExpression.EVERY_DAY_AT_9AM)
  async sendDailyInsights() {
    // Get all users who want daily notifications
    const users = await this.getUsersWithNotificationsEnabled();

    for (const user of users) {
      const insight = await this.dashboardService.getDailyInsight(user.id);

      await this.notificationsService.sendNotification(user.id, {
        title: 'Seu Insight Diário',
        body: insight.text.substring(0, 100) + '...',
        icon: '/icons/icon-192x192.png',
        url: '/dashboard',
        tag: 'daily-insight',
      });
    }
  }
}
```

## Troubleshooting

### Notifications not showing
- Check browser notification permissions
- Verify VAPID keys are correct
- Check service worker is registered
- Look for errors in browser console

### Subscription fails
- Verify backend API endpoint is accessible
- Check CORS settings
- Ensure HTTPS is enabled (required for service workers)

### iOS Issues
- iOS Safari has limited push notification support
- Push notifications require the app to be added to home screen
- Consider showing iOS-specific instructions

## References

- [Web Push Protocol](https://tools.ietf.org/html/rfc8030)
- [Notification API](https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API)
- [Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [web-push library](https://github.com/web-push-libs/web-push)
