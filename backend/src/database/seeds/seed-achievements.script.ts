import { NestFactory } from '@nestjs/core';
import { SeedModule } from './seed.module';
import { DataSource } from 'typeorm';
import { AchievementCatalog } from '../../modules/gamification/entities/achievement-catalog.entity';
import { ACHIEVEMENTS_SEED } from './achievements.seed';

async function bootstrap() {
  console.log('🎯 Starting Achievements seeding...\n');

  const app = await NestFactory.createApplicationContext(SeedModule);
  const dataSource = app.get(DataSource);
  const achievementsRepository = dataSource.getRepository(AchievementCatalog);

  try {
    console.log(`📦 Seeding ${ACHIEVEMENTS_SEED.length} achievements...`);
    let created = 0;
    let updated = 0;

    for (const achievementData of ACHIEVEMENTS_SEED) {
      const existing = await achievementsRepository.findOne({
        where: { achievementId: achievementData.achievementId },
      });

      if (!existing) {
        const achievement = achievementsRepository.create({
          ...achievementData,
          mbtiTypes: achievementData.mbtiTypes || undefined,
        });
        await achievementsRepository.save(achievement);
        created++;
        console.log(`  ✓ Created: ${achievementData.achievementId} - ${achievementData.title}`);
      } else {
        // Update existing achievement
        await achievementsRepository.update(
          { achievementId: achievementData.achievementId },
          {
            ...achievementData,
            mbtiTypes: achievementData.mbtiTypes || undefined,
          },
        );
        updated++;
        console.log(`  ↻ Updated: ${achievementData.achievementId} - ${achievementData.title}`);
      }
    }

    console.log(`\n✅ Achievements seeding completed!`);
    console.log(`   - Created: ${created}`);
    console.log(`   - Updated: ${updated}`);
    console.log(`   - Total: ${ACHIEVEMENTS_SEED.length}`);

    // Show breakdown by rarity
    const byRarity = await achievementsRepository
      .createQueryBuilder('achievement')
      .select('achievement.rarity', 'rarity')
      .addSelect('COUNT(*)', 'count')
      .groupBy('achievement.rarity')
      .orderBy('achievement.rarity', 'ASC')
      .getRawMany();

    console.log('\n📊 Achievements by rarity:');
    byRarity.forEach((row) => {
      console.log(`   ${row.rarity}: ${row.count}`);
    });

    // Show MBTI-specific achievements
    const mbtiSpecific = await achievementsRepository
      .createQueryBuilder('achievement')
      .where('achievement.mbti_types IS NOT NULL')
      .getMany();

    console.log(`\n🎯 MBTI-specific achievements: ${mbtiSpecific.length}`);
    mbtiSpecific.forEach((achievement) => {
      console.log(`   ${achievement.achievementId} - ${achievement.title} (${achievement.mbtiTypes?.join(', ')})`);
    });
  } catch (error) {
    console.error('❌ Error seeding achievements:', error);
    throw error;
  } finally {
    await app.close();
  }
}

bootstrap();
