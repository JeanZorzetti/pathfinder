/**
 * Standalone script to seed daily insights
 * Run with: npm run seed:insights
 */

import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { DataSource } from 'typeorm';
import { DailyInsight } from '../../modules/dashboard/entities/daily-insight.entity';
import { DAILY_INSIGHTS_SEED } from './daily-insights.seed';

async function bootstrap() {
  console.log('🌱 Starting Daily Insights seeding...\n');

  const app = await NestFactory.createApplicationContext(SeedModule);
  const dataSource = app.get(DataSource);
  const dailyInsightsRepository = dataSource.getRepository(DailyInsight);

  try {
    console.log(`📦 Seeding ${DAILY_INSIGHTS_SEED.length} daily insights...`);

    let created = 0;
    let existing = 0;

    for (const insight of DAILY_INSIGHTS_SEED) {
      // Check if insight already exists
      const existingInsight = await dailyInsightsRepository.findOne({
        where: {
          mbtiType: insight.personalityType,
          insightText: insight.insightText,
        },
      });

      if (!existingInsight) {
        const newInsight = dailyInsightsRepository.create({
          mbtiType: insight.personalityType,
          insightText: insight.insightText,
          actionItem: insight.actionItem || undefined,
          category: insight.category,
          dayOfYear: Math.floor(Math.random() * 365) + 1, // Random day for now
        });
        await dailyInsightsRepository.save(newInsight);
        created++;
        console.log(`  ✓ Created insight for ${insight.personalityType} (${insight.category})`);
      } else {
        existing++;
      }
    }

    console.log(`\n✅ Daily Insights seeding completed!`);
    console.log(`   - Created: ${created}`);
    console.log(`   - Already existing: ${existing}`);
    console.log(`   - Total: ${DAILY_INSIGHTS_SEED.length}`);

  } catch (error) {
    console.error('❌ Error seeding daily insights:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
