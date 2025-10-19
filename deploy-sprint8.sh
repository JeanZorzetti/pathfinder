#!/bin/bash

# Sprint 8 Deployment Script
# Executes migration and seeds for Content Library + Comparison persistence

set -e  # Exit on error

echo "🚀 Starting Sprint 8 deployment..."
echo ""

# Step 1: Create migration script
echo "📝 Creating migration script..."
cat > /tmp/run-sprint8-migration.js << 'MIGRATION_EOF'
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
MIGRATION_EOF

# Step 2: Create content seed script
echo "📝 Creating content seed script..."
cat > /tmp/seed-content-library.js << 'SEED_EOF'
const { Client } = require('pg');

const CONTENT_LIBRARY_SEED = [
  // Sample data - in production this will be loaded from the actual seed file
  {
    contentId: 'book_atomic_habits',
    title: 'Hábitos Atômicos - James Clear',
    type: 'book',
    url: 'https://www.amazon.com/Atomic-Habits-James-Clear',
    description: 'Construa hábitos pequenos que geram resultados extraordinários.',
    durationMinutes: 300,
    xpReward: 25,
    mbtiTypes: ['ESTJ', 'ENTJ', 'ISTJ', 'INTJ', 'ESFJ', 'ENFJ', 'ISFJ', 'INFJ'],
    categories: ['habits', 'growth', 'productivity'],
    difficulty: 'beginner',
  },
];

async function seed() {
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
    // Check if content already exists
    const checkResult = await client.query('SELECT COUNT(*) FROM content_library');
    const existingCount = parseInt(checkResult.rows[0].count);

    if (existingCount > 0) {
      console.log(`⚠️  ${existingCount} content items already exist. Skipping seed...`);
      await client.end();
      return;
    }

    console.log('📚 Seeding content library...');
    console.log('⚠️  Note: Running with sample data. Use npm run seed:content for full dataset.');

    for (const item of CONTENT_LIBRARY_SEED) {
      await client.query(
        `INSERT INTO content_library (
          content_id, title, type, url, description, duration_minutes,
          xp_reward, mbti_types, categories, difficulty
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          item.contentId,
          item.title,
          item.type,
          item.url,
          item.description,
          item.durationMinutes,
          item.xpReward,
          JSON.stringify(item.mbtiTypes),
          JSON.stringify(item.categories),
          item.difficulty,
        ]
      );
    }

    console.log(`✅ ${CONTENT_LIBRARY_SEED.length} sample content items inserted!`);
    console.log('💡 Run "npm run seed:content" from backend directory for full dataset');

  } catch (error) {
    console.error('❌ Seed failed:', error);
    throw error;
  } finally {
    await client.end();
  }
}

seed()
  .then(() => {
    console.log('✅ Content seed done');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Error:', error);
    process.exit(1);
  });
SEED_EOF

# Step 3: Run migration
echo ""
echo "1️⃣  Running migration..."
NODE_PATH=/app/node_modules node /tmp/run-sprint8-migration.js

# Step 4: Run content seed
echo ""
echo "2️⃣  Seeding content library (sample)..."
NODE_PATH=/app/node_modules node /tmp/seed-content-library.js

echo ""
echo "✅ Sprint 8 deployment completed!"
echo "📝 Next steps:"
echo "   - Run 'npm run seed:content' for full content library dataset"
echo "   - Test Content Library endpoints: GET /content-library/recommended"
echo "   - Test Comparison endpoints with new persistence"
