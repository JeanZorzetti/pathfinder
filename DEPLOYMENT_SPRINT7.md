# 🚀 Deployment do Sprint 7: Challenges & Journal

## 📋 Checklist de Deployment

### ✅ Preparação
- [x] Migration criada
- [x] Seeds criados
- [x] Build testado e funcionando
- [ ] Backup do banco de dados (IMPORTANTE!)
- [ ] Migration executada
- [ ] Seeds executados

---

## 🎯 Passo a Passo

### **1. Fazer Backup do Banco de Dados** ⚠️

**SEMPRE faça backup antes de rodar migrations em produção!**

```bash
# No servidor de produção ou local com acesso ao DB
pg_dump -h SEU_HOST -U SEU_USUARIO -d pathfinder > backup_antes_sprint7_$(date +%Y%m%d_%H%M%S).sql
```

---

### **2. Executar a Migration**

**Você tem 3 opções:**

#### **Opção A - Script Standalone (RECOMENDADO)**
```bash
cd backend
npm run migration:sprint7
```

**Saída esperada:**
```
🔄 Conectando ao banco de dados...
✅ Conectado ao banco de dados

📊 Executando migration do Sprint 7: Challenges & Journal

1️⃣ Criando tabela challenge_templates...
   ✅ Tabela challenge_templates criada
   ✅ Índices criados

2️⃣ Criando tabela user_challenges...
   ✅ Tabela user_challenges criada
   ✅ Índices criados

3️⃣ Criando tabela journal_prompts...
   ✅ Tabela journal_prompts criada
   ✅ Índices criados

4️⃣ Atualizando tabela journal_entries...
   ✅ Coluna prompt_used adicionada
   ✅ Coluna tags convertida para JSONB
   ✅ Tabela journal_entries atualizada

✅ Migration do Sprint 7 concluída com sucesso!
```

#### **Opção B - TypeORM CLI**
```bash
cd backend
npm run migration:run
```

#### **Opção C - SQL Manual**
Se preferir executar o SQL diretamente no banco:
```sql
-- Ver arquivo: backend/src/database/migrations/1760821000000-CreateChallengesAndJournal.ts
-- Copie os comandos SQL e execute no seu cliente PostgreSQL
```

---

### **3. Popular os Dados (Seeds)**

#### **3.1 - Seed dos Challenge Templates (48 desafios)**
```bash
cd backend
npm run seed:challenges
```

**Saída esperada:**
```
🔄 Connecting to database...
✅ Connected to database

📊 Processing 48 challenge templates...

✅ Challenge templates seeding completed!
   - Created: 48
   - Updated: 0
   - Total: 48
```

#### **3.2 - Seed dos Journal Prompts (67 prompts)**
```bash
npm run seed:prompts
```

**Saída esperada:**
```
🔄 Connecting to database...
✅ Connected to database

📊 Processing 67 journal prompts...
🗑️  Clearing existing prompts...

✅ Journal prompts seeding completed!
   - Created: 67
   - Total: 67
```

---

## 🔍 Verificação

### **Verificar se as tabelas foram criadas:**
```sql
-- Contar challenge templates
SELECT COUNT(*) FROM challenge_templates;
-- Esperado: 48

-- Contar journal prompts
SELECT COUNT(*) FROM journal_prompts;
-- Esperado: 67

-- Verificar distribuição por tipo MBTI (challenges)
SELECT mbti_type, COUNT(*)
FROM challenge_templates
GROUP BY mbti_type
ORDER BY mbti_type;
-- Esperado: 3 desafios por tipo (48 ÷ 16 = 3)

-- Verificar prompts universais vs específicos
SELECT
  CASE WHEN mbti_type IS NULL THEN 'Universal' ELSE 'Específico' END as tipo,
  COUNT(*) as quantidade
FROM journal_prompts
GROUP BY CASE WHEN mbti_type IS NULL THEN 'Universal' ELSE 'Específico' END;
```

---

## 📊 Estrutura das Tabelas Criadas

### **1. challenge_templates**
Armazena os templates de desafios (10 por tipo MBTI = 160 total quando completo)
- `id` (UUID)
- `challenge_id` (VARCHAR) - ID único do desafio
- `mbti_type` (VARCHAR) - Tipo MBTI
- `title`, `description`, `how_to`, `why` (TEXT)
- `xp_reward` (INTEGER) - XP ao completar
- `badge_reward` (VARCHAR) - Badge opcional

### **2. user_challenges**
Rastreia progresso dos usuários nos desafios
- `id` (UUID)
- `user_id` (UUID) → FK para `users`
- `challenge_id` (VARCHAR) → FK para `challenge_templates`
- `week_start_date` (DATE) - Início da semana
- `days_completed` (JSONB) - Array de 5 booleanos [seg, ter, qua, qui, sex]
- `completed` (BOOLEAN)
- `completed_at` (TIMESTAMP)

### **3. journal_prompts**
Prompts de diário (universais + específicos por MBTI)
- `id` (UUID)
- `mbti_type` (VARCHAR) - NULL = universal
- `prompt` (TEXT)
- `category` (VARCHAR) - Categoria do prompt
- `day_of_year` (INTEGER) - Dia específico (opcional)

### **4. journal_entries** (atualizada)
Novas colunas adicionadas:
- `prompt_used` (VARCHAR) - Prompt que foi usado
- `tags` (JSONB) - Convertido de simple-array para JSONB

---

## 🎮 Testar os Endpoints

### **Challenges:**
```bash
# Obter desafio atual
curl http://localhost:3001/api/v1/challenges/current \
  -H "Authorization: Bearer SEU_TOKEN"

# Marcar dia como completo
curl -X POST http://localhost:3001/api/v1/challenges/complete/0 \
  -H "Authorization: Bearer SEU_TOKEN"

# Ver histórico
curl http://localhost:3001/api/v1/challenges/history \
  -H "Authorization: Bearer SEU_TOKEN"

# Ver estatísticas
curl http://localhost:3001/api/v1/challenges/stats \
  -H "Authorization: Bearer SEU_TOKEN"
```

### **Journal:**
```bash
# Criar entrada
curl -X POST http://localhost:3001/api/v1/journal \
  -H "Authorization: Bearer SEU_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "Hoje aprendi muito sobre mim mesmo...",
    "mood": "reflexivo",
    "tags": ["crescimento", "aprendizado"]
  }'

# Listar entradas
curl http://localhost:3001/api/v1/journal \
  -H "Authorization: Bearer SEU_TOKEN"

# Obter prompt do dia
curl http://localhost:3001/api/v1/journal/prompt \
  -H "Authorization: Bearer SEU_TOKEN"

# Ver estatísticas
curl http://localhost:3001/api/v1/journal/stats \
  -H "Authorization: Bearer SEU_TOKEN"
```

---

## ⚠️ Troubleshooting

### **Erro: "relation already exists"**
- A tabela já foi criada. Você pode pular a migration ou usar `IF NOT EXISTS` (já incluído no script).

### **Erro: "permission denied"**
- Verifique se o usuário do banco tem permissões de CREATE TABLE.

### **Seeds não estão criando dados**
```bash
# Verificar conexão com banco
psql -h SEU_HOST -U SEU_USUARIO -d pathfinder -c "\dt"

# Verificar variáveis de ambiente
cat .env | grep DB_
```

### **Rollback se algo der errado**
```bash
# Restaurar backup
psql -h SEU_HOST -U SEU_USUARIO -d pathfinder < backup_antes_sprint7_TIMESTAMP.sql

# Ou reverter migration específica
npm run migration:revert
```

---

## ✅ Checklist Final

Após deployment, verifique:

- [ ] 4 novas tabelas criadas (challenge_templates, user_challenges, journal_prompts, journal_entries atualizada)
- [ ] 48 challenge templates inseridos
- [ ] 67 journal prompts inseridos
- [ ] Build funcionando sem erros TypeScript
- [ ] Endpoints de challenges respondendo
- [ ] Endpoints de journal respondendo
- [ ] XP sendo dado ao completar desafios
- [ ] Frontend integrado e funcional

---

## 📝 Notas Importantes

1. **Performance**: Os índices foram criados para otimizar queries frequentes (user_id, mbti_type, dates)
2. **JSONB**: Usamos JSONB para `days_completed` e `tags` para flexibilidade e performance
3. **Gamificação**: Challenges dão XP ao serem completados (integração com sistema de XP existente)
4. **Extensibilidade**: Fácil adicionar mais desafios e prompts através dos seeds

---

## 🎯 Próximos Passos

Após o deployment bem-sucedido:

1. **Expandir desafios**: Atualmente temos 48, meta é 160 (10 por tipo × 16 tipos)
2. **Monitorar uso**: Ver quais desafios e prompts são mais populares
3. **A/B Testing**: Testar diferentes tipos de desafios
4. **Analytics**: Rastrear completion rates e engagement

---

**Criado em**: 2025-01-15
**Sprint**: 7 - Challenges & Journal
**Status**: ✅ Pronto para deployment
