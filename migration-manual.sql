-- ============================================================================
-- MIGRATION: CreatePushSubscriptions1737312000000
-- Execute este script manualmente no pgweb
-- ============================================================================

-- 0. Criar tabela migrations se não existir (TypeORM tracking)
CREATE TABLE IF NOT EXISTS migrations (
  id SERIAL PRIMARY KEY,
  timestamp BIGINT NOT NULL,
  name VARCHAR(255) NOT NULL
);

-- 1. Criar a tabela push_subscriptions
CREATE TABLE push_subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL,
  endpoint TEXT NOT NULL,
  p256dh TEXT NOT NULL,
  auth TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Adicionar foreign key para users (com CASCADE delete)
ALTER TABLE push_subscriptions
  ADD CONSTRAINT fk_push_subscriptions_user
  FOREIGN KEY (user_id)
  REFERENCES users(id)
  ON DELETE CASCADE;

-- 3. Criar índice em user_id (para lookups rápidos)
CREATE INDEX "IDX_push_subscriptions_user_id" ON push_subscriptions (user_id);

-- 4. Criar índice ÚNICO em endpoint (prevenir duplicatas)
CREATE UNIQUE INDEX "IDX_push_subscriptions_endpoint" ON push_subscriptions (endpoint);

-- 5. Registrar a migration como executada (importante!)
INSERT INTO migrations (timestamp, name)
VALUES (1737312000000, 'CreatePushSubscriptions1737312000000');

-- ============================================================================
-- VERIFICAÇÃO (execute depois para confirmar)
-- ============================================================================

-- Verificar se a tabela foi criada
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'push_subscriptions'
ORDER BY ordinal_position;

-- Verificar foreign keys
SELECT
    tc.constraint_name,
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
WHERE tc.table_name = 'push_subscriptions' AND tc.constraint_type = 'FOREIGN KEY';

-- Verificar índices
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename = 'push_subscriptions';

-- Verificar se migration foi registrada
SELECT * FROM migrations WHERE name = 'CreatePushSubscriptions1737312000000';

-- ============================================================================
-- ROLLBACK (execute APENAS se precisar reverter)
-- ============================================================================

/*
-- Remover índices
DROP INDEX IF EXISTS "IDX_push_subscriptions_endpoint";
DROP INDEX IF EXISTS "IDX_push_subscriptions_user_id";

-- Remover foreign key
ALTER TABLE push_subscriptions DROP CONSTRAINT IF EXISTS fk_push_subscriptions_user;

-- Remover tabela
DROP TABLE IF EXISTS push_subscriptions;

-- Remover registro da migration
DELETE FROM migrations WHERE name = 'CreatePushSubscriptions1737312000000';
*/
