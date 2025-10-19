const { Client } = require('pg');

// Configuração do banco de produção
const client = new Client({
  host: 'postgres.railway.internal',
  port: 5432,
  user: 'postgres',
  password: 'oZRhTiAOKlrVKLjhsCfgHbJwdbNyaRrC',
  database: 'railway',
  ssl: false,
});

async function verifyMigration() {
  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    // Check if xp_transactions table exists and has description column
    console.log('📊 Checking xp_transactions table structure...');
    const tableCheck = await client.query(`
      SELECT column_name, data_type, is_nullable
      FROM information_schema.columns
      WHERE table_name = 'xp_transactions'
      ORDER BY ordinal_position;
    `);

    if (tableCheck.rows.length === 0) {
      console.log('❌ Table xp_transactions does NOT exist!');
      console.log('   Migration needs to run.');
    } else {
      console.log('✅ Table xp_transactions exists with columns:');
      tableCheck.rows.forEach(row => {
        console.log(`   - ${row.column_name} (${row.data_type}, nullable: ${row.is_nullable})`);
      });

      const hasDescription = tableCheck.rows.some(row => row.column_name === 'description');
      if (!hasDescription) {
        console.log('\n❌ Column "description" is MISSING!');
        console.log('   The migration did NOT run properly.');
      } else {
        console.log('\n✅ Column "description" exists!');
      }
    }

    // Check all Sprint 5-8 tables
    console.log('\n📊 Checking all Sprint tables...');
    const tables = [
      'daily_insights',         // Sprint 5
      'xp_transactions',        // Sprint 6
      'achievements_catalog',   // Sprint 6
      'user_achievements',      // Sprint 6
      'challenge_templates',    // Sprint 7
      'user_challenges',        // Sprint 7
      'journal_prompts',        // Sprint 7
      'journal_entries',        // Sprint 7
      'content_library',        // Sprint 8
      'comparison_codes',       // Sprint 8
      'comparison_history',     // Sprint 8
    ];

    for (const table of tables) {
      const result = await client.query(`
        SELECT EXISTS (
          SELECT FROM information_schema.tables
          WHERE table_name = $1
        );
      `, [table]);

      const exists = result.rows[0].exists;
      console.log(`   ${exists ? '✅' : '❌'} ${table}`);
    }

    // Check enum types
    console.log('\n📊 Checking ENUM types...');
    const enumCheck = await client.query(`
      SELECT typname
      FROM pg_type
      WHERE typname IN ('xp_source_enum', 'achievement_rarity_enum');
    `);

    console.log(`   Found ${enumCheck.rows.length} enum types:`);
    enumCheck.rows.forEach(row => {
      console.log(`   ✅ ${row.typname}`);
    });

    if (enumCheck.rows.length < 2) {
      console.log('   ❌ Missing enum types! Migration did not run.');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await client.end();
  }
}

verifyMigration();
