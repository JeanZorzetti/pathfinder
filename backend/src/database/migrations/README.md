# Database Migrations - Sprint 5

Este diretório contém as migrations SQL para o Sprint 5: Backend Real & Infraestrutura.

## Como Executar

### Via Supabase Dashboard (Recomendado)

1. Acesse o Supabase Dashboard do projeto
2. Vá em **SQL Editor**
3. Cole o conteúdo de cada migration na ordem:
   - `001-create-xp-transactions.sql`
   - `002-update-profiles-for-gamification.sql`
   - `003-create-user-challenges.sql`
   - `004-create-comparison-history.sql`
   - `005-create-content-consumed.sql`
4. Execute cada script clicando em "Run"

### Via CLI (Alternativo)

```bash
# Instalar Supabase CLI
npm install -g supabase

# Login
supabase login

# Executar migrations
supabase db push
```

## Migrations

### 001 - XP Transactions
Cria a tabela `xp_transactions` para auditoria de XP:
- Todas as transações de XP são registradas
- Índices otimizados para queries de cooldown
- Suporta cálculo de XP total por usuário

### 002 - Update Profiles
Adiciona campos de gamificação na tabela `profiles`:
- `xp` - Total de pontos de experiência
- `level` - Nível atual (1-5)
- `comparison_code` - Código único para comparação
- `consumed_content` - Array de conteúdo consumido
- `completed_challenges` - Array de desafios completados

### 003 - User Challenges (TODO)
Tabela para desafios semanais em andamento.

### 004 - Comparison History (TODO)
Histórico de comparações de compatibilidade.

### 005 - Content Consumed (TODO)
Tracking detalhado de conteúdo consumido.

## Rollback

Para reverter uma migration, execute os scripts de rollback correspondentes (quando criados):
- `001-create-xp-transactions.rollback.sql`
- etc.

## Verificação

Após executar as migrations, verifique:

```sql
-- Verificar tabelas criadas
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
  AND table_name IN ('xp_transactions', 'user_challenges', 'comparison_history');

-- Verificar colunas adicionadas em profiles
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'profiles'
  AND column_name IN ('xp', 'level', 'comparison_code', 'consumed_content', 'completed_challenges');

-- Verificar índices
SELECT indexname, indexdef
FROM pg_indexes
WHERE tablename IN ('xp_transactions', 'profiles');
```

## Status

- [x] 001 - XP Transactions
- [x] 002 - Update Profiles
- [ ] 003 - User Challenges
- [ ] 004 - Comparison History
- [ ] 005 - Content Consumed
