#!/bin/sh
set -e

echo "🚀 Starting Pathfinder Backend..."

# Wait for database to be ready
echo "⏳ Waiting for database..."
sleep 5

# ALWAYS run migrations (using IF NOT EXISTS so it's safe)
echo "📊 Running database fixes and migrations..."

# First, fix the xp_transactions table if needed
if [ -f "fix-xp-table.js" ]; then
  echo "   - Fixing xp_transactions table..."
  node fix-xp-table.js || echo "   ⚠️  XP table fix failed"
fi

# Then run comprehensive migration script
if [ -f "run-all-migrations.js" ]; then
  echo "   - Running Sprints 5, 6, 7, and 8 migrations..."
  node run-all-migrations.js || echo "   ⚠️  Some migrations failed or were already applied"
fi

# Fix users without MBTI type (set default to INTJ for testing)
echo "   - Fixing users without MBTI type..."
node -e "
  const { Client } = require('pg');
  const client = new Client({
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    ssl: process.env.DATABASE_SSL === 'true' ? { rejectUnauthorized: false } : false,
  });
  client.connect().then(async () => {
    const result = await client.query(\`UPDATE users SET mbti_type = 'INTJ' WHERE mbti_type IS NULL\`);
    console.log(\`      ✅ Fixed \${result.rowCount} users without MBTI\`);
    await client.end();
  }).catch(err => console.error('      ⚠️  Error fixing users:', err.message));
" || echo "   ⚠️  User fix failed"

echo "✅ Migrations complete"

# Start the application
echo "🎯 Starting NestJS application..."
exec node dist/main
