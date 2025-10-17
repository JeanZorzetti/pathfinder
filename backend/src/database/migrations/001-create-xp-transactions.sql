-- Migration: Create XP Transactions Table
-- Description: Tabela para auditoria de todas as transações de XP dos usuários
-- Created: Sprint 5 - Backend Real & Infraestrutura

-- ===== XP Transactions Table =====
CREATE TABLE IF NOT EXISTS xp_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  source VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  -- Constraints
  CONSTRAINT xp_transactions_amount_positive CHECK (amount > 0)
);

-- ===== Indexes para Performance =====
CREATE INDEX IF NOT EXISTS idx_xp_transactions_user_id
  ON xp_transactions(user_id);

CREATE INDEX IF NOT EXISTS idx_xp_transactions_created_at
  ON xp_transactions(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_xp_transactions_source
  ON xp_transactions(source);

-- Index composto para buscar últimas transações de um usuário + source (cooldown check)
CREATE INDEX IF NOT EXISTS idx_xp_transactions_user_source_created
  ON xp_transactions(user_id, source, created_at DESC);

-- ===== Comentários =====
COMMENT ON TABLE xp_transactions IS 'Auditoria de todas as transações de XP dos usuários';
COMMENT ON COLUMN xp_transactions.source IS 'Fonte do XP: test_completed, journal_entry, challenge_completed, etc.';
COMMENT ON COLUMN xp_transactions.amount IS 'Quantidade de XP adicionada (sempre positivo)';

-- ===== Verificar se tabela foi criada com sucesso =====
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name = 'xp_transactions') THEN
    RAISE NOTICE 'Tabela xp_transactions criada com sucesso!';
  ELSE
    RAISE EXCEPTION 'Erro ao criar tabela xp_transactions';
  END IF;
END $$;
