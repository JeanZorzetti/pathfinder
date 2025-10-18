import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateGamificationTables1760820000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create ENUM types
    await queryRunner.query(`
      CREATE TYPE xp_source_enum AS ENUM (
        'test_completed',
        'journal_entry',
        'challenge_day',
        'challenge_completed',
        'content_consumed',
        'streak_milestone',
        'daily_login',
        'profile_completed'
      );
    `);

    await queryRunner.query(`
      CREATE TYPE achievement_rarity_enum AS ENUM (
        'common',
        'rare',
        'epic',
        'legendary'
      );
    `);

    // 2. Create xp_transactions table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS xp_transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        source xp_source_enum NOT NULL,
        amount INTEGER NOT NULL CHECK (amount > 0),
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_xp_transactions_user_id ON xp_transactions(user_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_xp_transactions_created_at ON xp_transactions(created_at);
    `);

    // 3. Create achievements_catalog table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS achievements_catalog (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        achievement_id VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(100) NOT NULL,
        xp_reward INTEGER NOT NULL DEFAULT 0,
        rarity achievement_rarity_enum NOT NULL DEFAULT 'common',
        mbti_types JSONB,
        requirement_type VARCHAR(50) NOT NULL,
        requirement_value INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_achievements_catalog_achievement_id ON achievements_catalog(achievement_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_achievements_catalog_rarity ON achievements_catalog(rarity);
    `);

    // 4. Create user_achievements table
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS user_achievements (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        achievement_id VARCHAR(100) NOT NULL REFERENCES achievements_catalog(achievement_id) ON DELETE CASCADE,
        unlocked_at TIMESTAMP DEFAULT NOW(),
        progress_current INTEGER DEFAULT 0,
        progress_total INTEGER DEFAULT 0,
        UNIQUE(user_id, achievement_id)
      );
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);
    `);

    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_user_achievements_unlocked_at ON user_achievements(unlocked_at);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop tables in reverse order
    await queryRunner.query(`DROP INDEX IF EXISTS idx_user_achievements_unlocked_at;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_user_achievements_achievement_id;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_user_achievements_user_id;`);
    await queryRunner.query(`DROP TABLE IF EXISTS user_achievements;`);

    await queryRunner.query(`DROP INDEX IF EXISTS idx_achievements_catalog_rarity;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_achievements_catalog_achievement_id;`);
    await queryRunner.query(`DROP TABLE IF EXISTS achievements_catalog;`);

    await queryRunner.query(`DROP INDEX IF EXISTS idx_xp_transactions_created_at;`);
    await queryRunner.query(`DROP INDEX IF EXISTS idx_xp_transactions_user_id;`);
    await queryRunner.query(`DROP TABLE IF EXISTS xp_transactions;`);

    // Drop ENUM types
    await queryRunner.query(`DROP TYPE IF EXISTS achievement_rarity_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS xp_source_enum;`);
  }
}
