const { Client } = require('pg');

const client = new Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function runMigrations() {
  try {
    await client.connect();
    console.log('✅ Connected to database');

    // =============================================
    // SPRINT 5: Daily Insights (1760819804000)
    // =============================================
    console.log('\n📊 Running Sprint 5 Migration: Daily Insights...');

    // Create daily_insights table
    await client.query(`
      CREATE TABLE IF NOT EXISTS daily_insights (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        mbti_type VARCHAR(4) NOT NULL,
        day_of_year INTEGER NOT NULL CHECK (day_of_year >= 1 AND day_of_year <= 366),
        title VARCHAR(200) NOT NULL,
        content TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        icon VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(mbti_type, day_of_year)
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_daily_insights_mbti_day ON daily_insights(mbti_type, day_of_year);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_daily_insights_category ON daily_insights(category);
    `);

    console.log('✅ Sprint 5: Daily Insights tables created');

    // =============================================
    // SPRINT 6: Gamification (1760820000000)
    // =============================================
    console.log('\n🎮 Running Sprint 6 Migration: Gamification...');

    // Create ENUM types
    await client.query(`
      DO $$ BEGIN
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
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    await client.query(`
      DO $$ BEGIN
        CREATE TYPE achievement_rarity_enum AS ENUM (
          'common',
          'rare',
          'epic',
          'legendary'
        );
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // Create xp_transactions table
    await client.query(`
      CREATE TABLE IF NOT EXISTS xp_transactions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        source xp_source_enum NOT NULL,
        amount INTEGER NOT NULL CHECK (amount > 0),
        description TEXT,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_xp_transactions_user_id ON xp_transactions(user_id);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_xp_transactions_created_at ON xp_transactions(created_at);
    `);

    // Create achievements_catalog table
    await client.query(`
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

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_achievements_catalog_achievement_id ON achievements_catalog(achievement_id);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_achievements_catalog_rarity ON achievements_catalog(rarity);
    `);

    // Create user_achievements table
    await client.query(`
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

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_user_achievements_user_id ON user_achievements(user_id);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON user_achievements(achievement_id);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_user_achievements_unlocked_at ON user_achievements(unlocked_at);
    `);

    console.log('✅ Sprint 6: Gamification tables created');

    // =============================================
    // SPRINT 7: Challenges & Journal (1760821000000)
    // =============================================
    console.log('\n📝 Running Sprint 7 Migration: Challenges & Journal...');

    // Create challenge_templates table
    await client.query(`
      CREATE TABLE IF NOT EXISTS challenge_templates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        challenge_id VARCHAR(100) UNIQUE NOT NULL,
        mbti_type VARCHAR(4) NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        icon VARCHAR(50) NOT NULL,
        difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
        xp_reward INTEGER NOT NULL DEFAULT 0,
        day_number INTEGER NOT NULL CHECK (day_number >= 1 AND day_number <= 7),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_challenge_templates_mbti_type ON challenge_templates(mbti_type);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_challenge_templates_challenge_id ON challenge_templates(challenge_id);
    `);

    // Create user_challenges table
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_challenges (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        week_start_date DATE NOT NULL,
        challenges JSONB NOT NULL DEFAULT '[]',
        completed BOOLEAN DEFAULT FALSE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, week_start_date)
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_user_challenges_user_id ON user_challenges(user_id);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_user_challenges_week_start_date ON user_challenges(week_start_date);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_user_challenges_completed ON user_challenges(completed);
    `);

    // Create journal_prompts table
    await client.query(`
      CREATE TABLE IF NOT EXISTS journal_prompts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        mbti_type VARCHAR(4) NOT NULL,
        day_of_year INTEGER NOT NULL CHECK (day_of_year >= 1 AND day_of_year <= 366),
        question TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(mbti_type, day_of_year)
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_journal_prompts_mbti_type ON journal_prompts(mbti_type);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_journal_prompts_day_of_year ON journal_prompts(day_of_year);
    `);

    // Create journal_entries table
    await client.query(`
      CREATE TABLE IF NOT EXISTS journal_entries (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        entry_date DATE NOT NULL,
        prompt_text TEXT NOT NULL,
        user_response TEXT NOT NULL,
        mood VARCHAR(20),
        tags TEXT[],
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW(),
        UNIQUE(user_id, entry_date)
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_journal_entries_user_id ON journal_entries(user_id);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_journal_entries_created_at ON journal_entries(created_at);
    `);

    console.log('✅ Sprint 7: Challenges & Journal tables created');

    // =============================================
    // SPRINT 8: Content Library & Comparison (1760825000000)
    // =============================================
    console.log('\n📚 Running Sprint 8 Migration: Content Library & Comparison...');

    // Create content_library table
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_library (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        content_type VARCHAR(50) NOT NULL,
        category VARCHAR(50) NOT NULL,
        difficulty VARCHAR(20) NOT NULL CHECK (difficulty IN ('beginner', 'intermediate', 'advanced')),
        tags TEXT[],
        recommended_for_mbti JSONB NOT NULL,
        url VARCHAR(500),
        estimated_time_minutes INTEGER,
        xp_reward INTEGER NOT NULL DEFAULT 0,
        is_active BOOLEAN DEFAULT TRUE,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_content_library_content_type ON content_library(content_type);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_content_library_category ON content_library(category);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_content_library_difficulty ON content_library(difficulty);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_content_library_is_active ON content_library(is_active);
    `);

    // Create comparison_codes table
    await client.query(`
      CREATE TABLE IF NOT EXISTS comparison_codes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        code VARCHAR(8) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW(),
        expires_at TIMESTAMP
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_comparison_codes_user_id ON comparison_codes(user_id);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_comparison_codes_code ON comparison_codes(code);
    `);

    // Create comparison_history table
    await client.query(`
      CREATE TABLE IF NOT EXISTS comparison_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        user_mbti VARCHAR(4) NOT NULL,
        compared_mbti VARCHAR(4) NOT NULL,
        compatibility_score REAL NOT NULL CHECK (compatibility_score >= 0 AND compatibility_score <= 100),
        insights JSONB NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_comparison_history_user_id ON comparison_history(user_id);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_comparison_history_created_at ON comparison_history(created_at);
    `);

    console.log('✅ Sprint 8: Content Library & Comparison tables created');

    console.log('\n🎉 All migrations completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigrations();
