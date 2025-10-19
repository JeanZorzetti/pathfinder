#!/bin/bash

echo "🚀 Commitando Sprint 8..."

# Add all Sprint 8 files
git add backend/run-sprint8-migration.js
git add backend/src/modules/content-library/
git add backend/src/modules/comparison/
git add backend/src/database/migrations/1760825000000-CreateContentAndComparison.ts
git add backend/src/database/seeds/content-library.seed.ts
git add backend/src/database/scripts/seed-content-library.script.ts
git add backend/src/app.module.ts
git add backend/package.json
git add roadmap_dash.md
git add DEPLOYMENT_SPRINT8.md
git add DEPLOY_EASYPANEL_SPRINT8.md
git add deploy-sprint8.sh

echo "✅ Arquivos adicionados ao staging"

# Commit
git commit -m "feat(backend): Sprint 8 - Content Library + Comparison Persistence

✨ Features:
- Content Library system with 40+ curated content items
- Recommendation algorithm using JSONB operators
- Content tracking with XP rewards
- Comparison persistence with user relations
- ComparisonCode table for unique codes
- ComparisonHistory with user relations

📊 Database:
- Migration: 1760825000000-CreateContentAndComparison
- Tables: content_library, comparison_codes, comparison_history
- ENUMs: content_type_enum, difficulty_enum
- GIN indexes for JSONB columns

🎯 Endpoints:
- GET /content-library/recommended
- POST /content-library/mark-consumed
- GET /content-library/history
- Comparison endpoints updated

🚀 Generated with [Claude Code](https://claude.com/claude-code)

Co-Authored-By: Claude <noreply@anthropic.com>"

echo "✅ Commit criado"

# Push
git push origin main

echo "✅ Push concluído!"
echo ""
echo "📝 Próximo passo:"
echo "   No terminal do Easypanel, execute:"
echo "   cd /app && git pull origin main"
echo "   cd /app/backend && NODE_PATH=/app/node_modules node run-sprint8-migration.js"
