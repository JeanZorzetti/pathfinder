import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateChallengesAndJournal1760821000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create challenge_templates table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS challenge_templates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        challenge_id VARCHAR(100) UNIQUE NOT NULL,
        mbti_type VARCHAR(4) NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        how_to TEXT NOT NULL,
        why TEXT NOT NULL,
        xp_reward INTEGER DEFAULT 50,
        badge_reward VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_challenge_templates_mbti_type ON challenge_templates(mbti_type);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_challenge_templates_challenge_id ON challenge_templates(challenge_id);
    `);

    // 2. Create user_challenges table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS user_challenges (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        challenge_id VARCHAR(100) NOT NULL REFERENCES challenge_templates(challenge_id) ON DELETE CASCADE,
        week_start_date DATE NOT NULL,
        days_completed JSONB DEFAULT '[]'::jsonb,
        completed BOOLEAN DEFAULT false,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON user_challenges(user_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_user_challenges_week_start_date ON user_challenges(week_start_date);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_user_challenges_completed ON user_challenges(completed);
    `);

    // 3. Create journal_prompts table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS journal_prompts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        mbti_type VARCHAR(4),
        prompt TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        day_of_year INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_journal_prompts_mbti_type ON journal_prompts(mbti_type);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_journal_prompts_category ON journal_prompts(category);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_journal_prompts_day_of_year ON journal_prompts(day_of_year);
    `);

    // 4. Create journal_entries table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        content TEXT NOT NULL,
        mood VARCHAR(50),
        tags JSONB DEFAULT '[]'::jsonb,
        prompt_used VARCHAR(500),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at ON journal_entries(created_at);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_journal_entries_mood ON journal_entries(mood);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop indexes and tables in reverse order
    await queryRunner.query(`DROP INDEX IF EXISTS idx_journal_entries_mood;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_journal_entries_created_at;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_journal_entries_user_id;`);
    await queryRunner.query(`DROP TABLE IF EXISTS journal_entries;`);

    await queryRunner.query(`DROP INDEX IF EXISTS idx_journal_prompts_day_of_year;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_journal_prompts_category;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_journal_prompts_mbti_type;`);
    await queryRunner.query(`DROP TABLE IF EXISTS journal_prompts;`);

    await queryRunner.query(`DROP INDEX IF EXISTS idx_user_challenges_completed;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_user_challenges_week_start_date;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_user_challenges_user_id;`);
    await queryRunner.query(`DROP TABLE IF EXISTS user_challenges;`);

    await queryRunner.query(`DROP INDEX IF EXISTS idx_challenge_templates_challenge_id;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_challenge_templates_mbti_type;`);
    await queryRunner.query(`DROP TABLE IF EXISTS challenge_templates;`);
  }
}
