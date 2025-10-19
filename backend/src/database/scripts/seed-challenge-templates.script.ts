import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';
import { ChallengeTemplate } from '../../modules/challenges/entities/challenge-template.entity';
import { CHALLENGE_TEMPLATES_SEED } from '../seeds/challenge-templates.seed';

config({ path: resolve(__dirname, '../../../.env') });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'pathfinder',
  entities: [ChallengeTemplate],
  synchronize: false,
});

async function seedChallengeTemplates() {
  try {
    console.log('🔄 Connecting to database...');
    await AppDataSource.initialize();
    console.log('✅ Connected to database');

    const challengeTemplateRepository = AppDataSource.getRepository(ChallengeTemplate);

    console.log(`\n📊 Processing ${CHALLENGE_TEMPLATES_SEED.length} challenge templates...`);

    let created = 0;
    let updated = 0;

    for (const templateData of CHALLENGE_TEMPLATES_SEED) {
      const existing = await challengeTemplateRepository.findOne({
        where: { challengeId: templateData.challengeId },
      });

      if (existing) {
        // Update existing
        Object.assign(existing, {
          mbtiType: templateData.mbtiType,
          title: templateData.title,
          description: templateData.description,
          howTo: templateData.howTo,
          why: templateData.why,
          xpReward: templateData.xpReward,
        });
        await challengeTemplateRepository.save(existing);
        updated++;
      } else {
        // Create new
        const newTemplate = challengeTemplateRepository.create(templateData);
        await challengeTemplateRepository.save(newTemplate);
        created++;
      }
    }

    console.log('\n✅ Challenge templates seeding completed!');
    console.log(`   - Created: ${created}`);
    console.log(`   - Updated: ${updated}`);
    console.log(`   - Total: ${created + updated}`);

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error seeding challenge templates:', error);
    process.exit(1);
  }
}

seedChallengeTemplates();
