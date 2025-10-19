import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';
import { JournalPrompt } from '../../modules/journal/entities/journal-prompt.entity';
import { JOURNAL_PROMPTS_SEED } from '../seeds/journal-prompts.seed';

config({ path: resolve(__dirname, '../../../.env') });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'pathfinder',
  entities: [JournalPrompt],
  synchronize: false,
});

async function seedJournalPrompts() {
  try {
    console.log('🔄 Connecting to database...');
    await AppDataSource.initialize();
    console.log('✅ Connected to database');

    const journalPromptRepository = AppDataSource.getRepository(JournalPrompt);

    console.log(`\n📊 Processing ${JOURNAL_PROMPTS_SEED.length} journal prompts...`);

    // Clear existing prompts to avoid duplicates
    console.log('🗑️  Clearing existing prompts...');
    await journalPromptRepository.delete({});

    // Insert all prompts
    let created = 0;
    for (const promptData of JOURNAL_PROMPTS_SEED) {
      const newPrompt = journalPromptRepository.create({
        mbtiType: promptData.mbtiType || undefined,
        prompt: promptData.prompt,
        category: promptData.category,
      });
      await journalPromptRepository.save(newPrompt);
      created++;
    }

    console.log('\n✅ Journal prompts seeding completed!');
    console.log(`   - Created: ${created}`);
    console.log(`   - Total: ${created}`);

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Error seeding journal prompts:', error);
    process.exit(1);
  }
}

seedJournalPrompts();
