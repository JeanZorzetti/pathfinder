import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as webpush from 'web-push';
import { PushSubscription } from './entities/push-subscription.entity';
import { PushSubscriptionDto, SendNotificationDto } from './dto/push-subscription.dto';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  constructor(
    @InjectRepository(PushSubscription)
    private pushSubscriptionRepository: Repository<PushSubscription>,
  ) {
    // Configure web-push with VAPID keys
    const vapidPublicKey = process.env.VAPID_PUBLIC_KEY;
    const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY;
    const vapidSubject = process.env.VAPID_SUBJECT || 'mailto:contato@pathfinder.roilabs.com.br';

    if (vapidPublicKey && vapidPrivateKey) {
      webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);
      this.logger.log('Web Push configured with VAPID keys');
    } else {
      this.logger.warn('VAPID keys not found in environment variables');
    }
  }

  /**
   * Subscribe user to push notifications
   */
  async subscribe(userId: string, subscription: PushSubscriptionDto) {
    try {
      // Check if subscription already exists
      const existing = await this.pushSubscriptionRepository.findOne({
        where: {
          userId,
          endpoint: subscription.endpoint,
        },
      });

      if (existing) {
        this.logger.log(`Subscription already exists for user ${userId}`);
        return existing;
      }

      // Create new subscription
      const newSubscription = this.pushSubscriptionRepository.create({
        userId,
        endpoint: subscription.endpoint,
        p256dh: subscription.keys.p256dh,
        auth: subscription.keys.auth,
      });

      const saved = await this.pushSubscriptionRepository.save(newSubscription);
      this.logger.log(`New subscription created for user ${userId}`);

      return saved;
    } catch (error) {
      this.logger.error(`Error subscribing user ${userId}:`, error.message);
      throw error;
    }
  }

  /**
   * Unsubscribe user from push notifications
   */
  async unsubscribe(userId: string, subscription: PushSubscriptionDto) {
    try {
      const result = await this.pushSubscriptionRepository.delete({
        userId,
        endpoint: subscription.endpoint,
      });

      this.logger.log(`Subscription removed for user ${userId}`);
      return result;
    } catch (error) {
      this.logger.error(`Error unsubscribing user ${userId}:`, error.message);
      throw error;
    }
  }

  /**
   * Send notification to a specific user
   */
  async sendNotification(userId: string, payload: SendNotificationDto) {
    try {
      const subscriptions = await this.pushSubscriptionRepository.find({
        where: { userId },
      });

      if (subscriptions.length === 0) {
        this.logger.warn(`No subscriptions found for user ${userId}`);
        return { sent: 0, failed: 0 };
      }

      const notificationPayload = JSON.stringify({
        title: payload.title,
        body: payload.body,
        icon: payload.icon || '/icons/icon-192x192.png',
        badge: '/icons/icon-72x72.png',
        url: payload.url || '/',
        tag: payload.tag || 'default-notification',
        data: {
          url: payload.url || '/',
          dateOfArrival: Date.now(),
        },
      });

      let sent = 0;
      let failed = 0;

      const notifications = subscriptions.map(async (sub) => {
        try {
          const pushSubscription = {
            endpoint: sub.endpoint,
            keys: {
              p256dh: sub.p256dh,
              auth: sub.auth,
            },
          };

          await webpush.sendNotification(pushSubscription, notificationPayload);
          sent++;
          this.logger.log(`Notification sent to user ${userId}`);
        } catch (error) {
          failed++;
          this.logger.error(`Error sending notification to user ${userId}:`, error.message);

          // Remove invalid subscriptions (410 Gone)
          if (error.statusCode === 410) {
            await this.pushSubscriptionRepository.delete({ id: sub.id });
            this.logger.log(`Removed invalid subscription for user ${userId}`);
          }
        }
      });

      await Promise.all(notifications);

      return { sent, failed };
    } catch (error) {
      this.logger.error(`Error in sendNotification for user ${userId}:`, error.message);
      throw error;
    }
  }

  /**
   * Send notification to multiple users
   */
  async sendToMultipleUsers(userIds: string[], payload: SendNotificationDto) {
    const results = {
      total: userIds.length,
      sent: 0,
      failed: 0,
    };

    const promises = userIds.map(async (userId) => {
      try {
        const result = await this.sendNotification(userId, payload);
        results.sent += result.sent;
        results.failed += result.failed;
      } catch (error) {
        results.failed++;
        this.logger.error(`Failed to send to user ${userId}:`, error.message);
      }
    });

    await Promise.all(promises);

    this.logger.log(`Bulk notification sent: ${results.sent} sent, ${results.failed} failed`);
    return results;
  }

  /**
   * Get all subscriptions for a user
   */
  async getUserSubscriptions(userId: string) {
    return await this.pushSubscriptionRepository.find({
      where: { userId },
    });
  }

  /**
   * Get total subscription count
   */
  async getSubscriptionCount(): Promise<number> {
    return await this.pushSubscriptionRepository.count();
  }

  /**
   * Send daily insight notification
   */
  async sendDailyInsight(userId: string, insightText: string) {
    return await this.sendNotification(userId, {
      title: 'Seu Insight Diário',
      body: insightText.substring(0, 100) + (insightText.length > 100 ? '...' : ''),
      icon: '/icons/icon-192x192.png',
      url: '/dashboard',
      tag: 'daily-insight',
    });
  }

  /**
   * Send achievement unlocked notification
   */
  async sendAchievementUnlocked(userId: string, achievementTitle: string) {
    return await this.sendNotification(userId, {
      title: 'Conquista Desbloqueada!',
      body: `Você desbloqueou: ${achievementTitle}`,
      icon: '/icons/icon-192x192.png',
      url: '/dashboard#achievements',
      tag: 'achievement-unlocked',
    });
  }

  /**
   * Send challenge reminder notification
   */
  async sendChallengeReminder(userId: string, challengeTitle: string) {
    return await this.sendNotification(userId, {
      title: 'Desafio Semanal',
      body: challengeTitle,
      icon: '/icons/icon-192x192.png',
      url: '/dashboard#challenges',
      tag: 'weekly-challenge',
    });
  }

  /**
   * Send streak reminder notification
   */
  async sendStreakReminder(userId: string, streakDays: number) {
    return await this.sendNotification(userId, {
      title: 'Mantenha sua Sequência!',
      body: `Você está em uma sequência de ${streakDays} dias! Complete seu diário hoje.`,
      icon: '/icons/icon-192x192.png',
      url: '/journal',
      tag: 'streak-reminder',
    });
  }
}
