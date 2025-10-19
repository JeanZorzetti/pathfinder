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

  echo "✅ Migrations complete"
fi

# Start the application
echo "🎯 Starting NestJS application..."
exec node dist/main
