-- Migration: Update Profiles Table for Gamification
-- Description: Adiciona campos necessários para gamificação na tabela profiles
-- Created: Sprint 5 - Backend Real & Infraestrutura

-- ===== Adicionar campos de gamificação =====

-- Campo XP (já existe provavelmente, mas vamos garantir)
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS xp INTEGER DEFAULT 0;

-- Campo Level
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS level INTEGER DEFAULT 1;

-- Campo comparison_code (para sistema de comparação)
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS comparison_code VARCHAR(20) UNIQUE;

-- Arrays para tracking de conteúdo e desafios
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS consumed_content TEXT[] DEFAULT '{}';

ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS completed_challenges TEXT[] DEFAULT '{}';

-- ===== Constraints =====
ALTER TABLE profiles
ADD CONSTRAINT profiles_xp_non_negative CHECK (xp >= 0);

ALTER TABLE profiles
ADD CONSTRAINT profiles_level_valid CHECK (level >= 1 AND level <= 5);

-- ===== Indexes =====
CREATE INDEX IF NOT EXISTS idx_profiles_xp
  ON profiles(xp DESC);

CREATE INDEX IF NOT EXISTS idx_profiles_level
  ON profiles(level);

CREATE INDEX IF NOT EXISTS idx_profiles_comparison_code
  ON profiles(comparison_code) WHERE comparison_code IS NOT NULL;

-- ===== Comentários =====
COMMENT ON COLUMN profiles.xp IS 'Pontos de experiência total do usuário';
COMMENT ON COLUMN profiles.level IS 'Nível atual (1-5): Descobridor, Explorador, Líder em Formação, Mestre, Guia Iluminado';
COMMENT ON COLUMN profiles.comparison_code IS 'Código único de 8 dígitos para compartilhar e comparar compatibilidade';
COMMENT ON COLUMN profiles.consumed_content IS 'Array de IDs de conteúdo consumido (articles, videos, books)';
COMMENT ON COLUMN profiles.completed_challenges IS 'Array de IDs de desafios semanais completados';

-- ===== Atualizar usuários existentes =====
-- Garantir que todos os usuários existentes tenham valores default
UPDATE profiles
SET
  xp = COALESCE(xp, 0),
  level = COALESCE(level, 1),
  consumed_content = COALESCE(consumed_content, '{}'),
  completed_challenges = COALESCE(completed_challenges, '{}')
WHERE xp IS NULL OR level IS NULL;

-- ===== Verificação =====
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'profiles' AND column_name IN ('xp', 'level', 'comparison_code')
  ) THEN
    RAISE NOTICE 'Tabela profiles atualizada com sucesso para gamificação!';
  ELSE
    RAISE EXCEPTION 'Erro ao atualizar tabela profiles';
  END IF;
END $$;
