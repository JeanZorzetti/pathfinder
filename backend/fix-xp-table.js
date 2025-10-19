const { Client } = require('pg');

const client = new Client({
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT || 5432,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

async function fixXpTable() {
  try {
    await client.connect();
    console.log('✅ Connected to database');

    // Check if table exists
    const tableExists = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'xp_transactions'
      );
    `);

    if (!tableExists.rows[0].exists) {
      console.log('❌ Table xp_transactions does not exist! Creating it...');

      // Create enum type first
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

      // Create table
      await client.query(`
        CREATE TABLE xp_transactions (
          id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
          user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
          source xp_source_enum NOT NULL,
          amount INTEGER NOT NULL CHECK (amount > 0),
          description TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        );
      `);

      await client.query(`
        CREATE INDEX idx_xp_transactions_user_id ON xp_transactions(user_id);
      `);

      await client.query(`
        CREATE INDEX idx_xp_transactions_created_at ON xp_transactions(created_at);
      `);

      console.log('✅ Created xp_transactions table with description column');
      process.exit(0);
    }

    console.log('✅ Table xp_transactions exists');

    // Check if description column exists
    const columnCheck = await client.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name = 'xp_transactions' AND column_name = 'description';
    `);

    if (columnCheck.rows.length === 0) {
      console.log('❌ Column description does NOT exist. Adding it...');

      await client.query(`
        ALTER TABLE xp_transactions
        ADD COLUMN IF NOT EXISTS description TEXT;
      `);

      console.log('✅ Added description column to xp_transactions');
    } else {
      console.log('✅ Column description already exists');
    }

    // Show current table structure
    console.log('\n📊 Current xp_transactions table structure:');
    const structure = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'xp_transactions'
      ORDER BY ordinal_position;
    `);

    structure.rows.forEach(row => {
      console.log(`   - ${row.column_name} (${row.data_type}, nullable: ${row.is_nullable})`);
    });

    console.log('\n🎉 Fix completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('Stack:', error.stack);
    process.exit(1);
  } finally {
    await client.end();
  }
}

fixXpTable();
