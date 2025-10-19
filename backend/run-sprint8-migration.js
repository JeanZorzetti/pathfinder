const { Client } = require('pg');

async function runMigration() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'pathfinder',
    ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });

  await client.connect();
  console.log('✅ Connected to database');

  try {
    await client.query('BEGIN');

    // Create ENUMs if they don't exist
    console.log('📊 Creating ENUMs...');

    await client.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'content_type_enum') THEN
          CREATE TYPE content_type_enum AS ENUM ('article', 'video', 'book', 'exercise', 'podcast');
        END IF;
      END $$;
    `);

    await client.query(`
      DO $$ BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'difficulty_enum') THEN
          CREATE TYPE difficulty_enum AS ENUM ('beginner', 'intermediate', 'advanced');
        END IF;
      END $$;
    `);

    // Create content_library table
    console.log('📚 Creating content_library table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS content_library (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        content_id VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(200) NOT NULL,
        type content_type_enum NOT NULL,
        url VARCHAR(500) NOT NULL,
        description TEXT,
        duration_minutes INT,
        xp_reward INT NOT NULL DEFAULT 5,
        mbti_types JSONB DEFAULT '[]'::jsonb,
        categories JSONB DEFAULT '[]'::jsonb,
        difficulty difficulty_enum NOT NULL DEFAULT 'beginner',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_content_library_mbti_types
      ON content_library USING GIN (mbti_types);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_content_library_categories
      ON content_library USING GIN (categories);
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_content_library_type
      ON content_library (type);
    `);

    // Create comparison_codes table
    console.log('🔐 Creating comparison_codes table...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS comparison_codes (
        user_id UUID PRIMARY KEY,
        code VARCHAR(20) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      );
    `);

    await client.query(`
      CREATE INDEX IF NOT EXISTS idx_comparison_codes_code
      ON comparison_codes (code);
    `);

    // Update comparison_history table if needed
    console.log('📊 Updating comparison_history table...');

    // Check if table exists
    const tableCheck = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'comparison_history'
      );
    `);

    if (tableCheck.rows[0].exists) {
      // Check and add columns if they don't exist
      const userIdCheck = await client.query(`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = 'comparison_history' AND column_name = 'user_id';
      `);

      if (userIdCheck.rows.length === 0) {
        // Need to recreate table with new structure
        await client.query(`DROP TABLE IF EXISTS comparison_history CASCADE;`);

        await client.query(`
          CREATE TABLE comparison_history (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            user_id UUID NOT NULL,
            compared_with_user_id UUID,
            compatibility_score INT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
            FOREIGN KEY (compared_with_user_id) REFERENCES users(id) ON DELETE SET NULL
          );
        `);

        await client.query(`CREATE INDEX IF NOT EXISTS idx_comparison_history_user_id ON comparison_history (user_id);`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_comparison_history_compared_with ON comparison_history (compared_with_user_id);`);
        await client.query(`CREATE INDEX IF NOT EXISTS idx_comparison_history_created_at ON comparison_history (created_at);`);

        console.log('  ✅ comparison_history table recreated');
      } else {
        console.log('  ℹ️  comparison_history table already has correct structure');
      }
    } else {
      // Create new table
      await client.query(`
        CREATE TABLE comparison_history (
          id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
          user_id UUID NOT NULL,
          compared_with_user_id UUID,
          compatibility_score INT NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (compared_with_user_id) REFERENCES users(id) ON DELETE SET NULL
        );
      `);

      await client.query(`CREATE INDEX idx_comparison_history_user_id ON comparison_history (user_id);`);
      await client.query(`CREATE INDEX idx_comparison_history_compared_with ON comparison_history (compared_with_user_id);`);
      await client.query(`CREATE INDEX idx_comparison_history_created_at ON comparison_history (created_at);`);

      console.log('  ✅ comparison_history table created');
    }

    await client.query('COMMIT');
    console.log('\n✅ Migration completed successfully!');

  } catch (error) {
    await client.query('ROLLBACK');
    console.error('❌ Migration failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

runMigration()
  .then(() => {
    console.log('✅ Sprint 8 migration done');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
