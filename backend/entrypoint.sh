#!/bin/sh
set -e

echo "🚀 Starting Pathfinder Backend..."

# Wait for database to be ready
echo "⏳ Waiting for database..."
sleep 5

# Run migrations only if DB_RUN_MIGRATIONS is set
if [ "$DB_RUN_MIGRATIONS" = "true" ]; then
  echo "📊 Running database migrations..."

  # Run Sprint 8 migration if script exists
  if [ -f "run-sprint8-migration.js" ]; then
    echo "   - Running Sprint 8 migration..."
    node run-sprint8-migration.js || echo "   ⚠️  Sprint 8 migration failed or already applied"
  fi

  # Fix users without MBTI type (set default to INTJ for testing)
  echo "   - Fixing users without MBTI type..."
  node -e "
    const { Client } = require('pg');
    const client = new Client({
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
    });
    client.connect().then(async () => {
      const result = await client.query(\`UPDATE users SET mbti_type = 'INTJ' WHERE mbti_type IS NULL\`);
      console.log(\`      ✅ Fixed \${result.rowCount} users without MBTI\`);
      await client.end();
    }).catch(err => console.error('      ⚠️  Error fixing users:', err.message));
  " || echo "   ⚠️  User fix failed"

  echo "✅ Migrations complete"
fi

# Start the application
echo "🎯 Starting NestJS application..."
exec node dist/main
