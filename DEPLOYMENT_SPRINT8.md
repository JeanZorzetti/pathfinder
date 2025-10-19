# 🚀 Deployment Guide - Sprint 8

## Sprint 8: Content Library + Comparison Persistence

### ✅ O que foi implementado

**Backend:**
1. **Content Library System**
   - Tabela `content_library` com 40+ peças de conteúdo curado
   - Endpoints para recomendações personalizadas por MBTI
   - Sistema de tracking com XP rewards
   - Algoritmo de recomendação usando JSONB operators

2. **Comparison Persistence**
   - Tabela `comparison_codes` para códigos únicos
   - Tabela `comparison_history` com user relations
   - Histórico completo de comparações
   - Estatísticas avançadas (melhor match, tipo mais comparado)

### 📋 Pré-requisitos

- Build backend concluído com sucesso ✅
- Acesso SSH ao Easypanel
- Variáveis de ambiente configuradas:
  - `DB_HOST`
  - `DB_PORT`
  - `DB_USERNAME`
  - `DB_PASSWORD`
  - `DB_NAME`
  - `DB_SSL=true`

### 🔧 Passo a Passo - Deployment

#### 1. Fazer upload do script de deployment

```bash
# No seu terminal local
scp deploy-sprint8.sh user@easypanel:/tmp/
```

#### 2. Conectar ao servidor

```bash
ssh user@easypanel
```

#### 3. Executar o deployment script

```bash
chmod +x /tmp/deploy-sprint8.sh
/tmp/deploy-sprint8.sh
```

O script irá:
1. ✅ Criar ENUMs: `content_type_enum` e `difficulty_enum`
2. ✅ Criar tabela `content_library` com indexes GIN para JSONB
3. ✅ Criar tabela `comparison_codes` com unique constraint
4. ✅ Atualizar/criar tabela `comparison_history` com user relations
5. ✅ Popular content_library com dados sample

#### 4. Popular dataset completo de conteúdo

Após o script de deployment, execute o seed completo:

```bash
cd /app/backend
npm run seed:content
```

Isso irá popular 40+ peças de conteúdo incluindo:
- 📚 Livros (Atomic Habits, Crucial Conversations, etc.)
- 📰 Artigos (liderança, comunicação, relacionamentos)
- 🎥 Vídeos (TED Talks, podcasts)
- 💪 Exercícios práticos
- 🎧 Podcasts

### 🧪 Testes em Produção

#### 1. Testar Content Library

```bash
# Obter token de autenticação
TOKEN="seu_token_jwt"

# Buscar conteúdo recomendado
curl -H "Authorization: Bearer $TOKEN" \
  https://pathfinder.roilabs.com.br/api/v1/content-library/recommended?limit=4

# Marcar conteúdo como consumido
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"contentId":"book_atomic_habits"}' \
  https://pathfinder.roilabs.com.br/api/v1/content-library/mark-consumed

# Ver histórico
curl -H "Authorization: Bearer $TOKEN" \
  https://pathfinder.roilabs.com.br/api/v1/content-library/history
```

**Resposta esperada (recommended):**
```json
[
  {
    "id": "uuid",
    "contentId": "book_atomic_habits",
    "title": "Hábitos Atômicos - James Clear",
    "type": "book",
    "url": "https://...",
    "description": "Construa hábitos pequenos...",
    "durationMinutes": 300,
    "xpReward": 25,
    "mbtiTypes": ["ESTJ", "ENTJ", ...],
    "categories": ["habits", "growth"],
    "difficulty": "beginner"
  }
]
```

#### 2. Testar Comparison System

```bash
# Obter código único do usuário
curl -H "Authorization: Bearer $TOKEN" \
  https://pathfinder.roilabs.com.br/api/v1/comparison/code

# Comparar com outro código
curl -X POST \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"code":"INTJ-A7K9M2"}' \
  https://pathfinder.roilabs.com.br/api/v1/comparison/compare

# Ver histórico de comparações
curl -H "Authorization: Bearer $TOKEN" \
  https://pathfinder.roilabs.com.br/api/v1/comparison/history

# Ver estatísticas
curl -H "Authorization: Bearer $TOKEN" \
  https://pathfinder.roilabs.com.br/api/v1/comparison/stats
```

**Resposta esperada (stats):**
```json
{
  "totalComparisons": 5,
  "averageScore": 72,
  "bestMatch": {
    "mbtiType": "ENFP",
    "code": "ENFP-X3Y7Z2",
    "score": 85
  },
  "mostCompared": {
    "mbtiType": "INTJ",
    "count": 3
  }
}
```

### 🗄️ Estrutura do Banco de Dados

#### Tabela: content_library

```sql
CREATE TABLE content_library (
  id UUID PRIMARY KEY,
  content_id VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(200) NOT NULL,
  type content_type_enum NOT NULL,
  url VARCHAR(500) NOT NULL,
  description TEXT,
  duration_minutes INT,
  xp_reward INT DEFAULT 5,
  mbti_types JSONB DEFAULT '[]',
  categories JSONB DEFAULT '[]',
  difficulty difficulty_enum DEFAULT 'beginner',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_content_library_mbti_types ON content_library USING GIN (mbti_types);
CREATE INDEX idx_content_library_categories ON content_library USING GIN (categories);
```

#### Tabela: comparison_codes

```sql
CREATE TABLE comparison_codes (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  code VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comparison_codes_code ON comparison_codes (code);
```

#### Tabela: comparison_history

```sql
CREATE TABLE comparison_history (
  id UUID PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  compared_with_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  compatibility_score INT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comparison_history_user_id ON comparison_history (user_id);
CREATE INDEX idx_comparison_history_compared_with ON comparison_history (compared_with_user_id);
```

### 📊 Verificação de Dados

```sql
-- Verificar conteúdos inseridos
SELECT type, COUNT(*) FROM content_library GROUP BY type;

-- Verificar códigos de comparação
SELECT COUNT(*) FROM comparison_codes;

-- Verificar histórico de comparações
SELECT
  COUNT(*) as total_comparisons,
  AVG(compatibility_score) as avg_score
FROM comparison_history;
```

### 🐛 Troubleshooting

#### Erro: "ENUM already exists"
- **Causa:** Migration rodou mais de uma vez
- **Solução:** Script possui `IF NOT EXISTS`, deve funcionar corretamente

#### Erro: "relation content_library already exists"
- **Causa:** Tabela já existe
- **Solução:** Script possui `CREATE TABLE IF NOT EXISTS`

#### Erro: "violates foreign key constraint"
- **Causa:** Tabela `users` não existe
- **Solução:** Verificar que Sprint anterior foi deployado

#### Seed retorna "0 items inserted"
- **Causa:** Dados já existem
- **Solução:** Normal, seed é idempotente

### ✅ Checklist Final

- [ ] Migration executada com sucesso
- [ ] Tabelas criadas: `content_library`, `comparison_codes`, `comparison_history`
- [ ] ENUMs criados: `content_type_enum`, `difficulty_enum`
- [ ] Seed de conteúdo executado (40+ items)
- [ ] Endpoint `/content-library/recommended` retorna dados
- [ ] Endpoint `/content-library/mark-consumed` concede XP
- [ ] Endpoint `/comparison/code` retorna código único
- [ ] Endpoint `/comparison/compare` salva em history
- [ ] Endpoint `/comparison/stats` retorna estatísticas
- [ ] Build backend sem erros TypeScript

### 📝 Próximos Passos

Após confirmar que tudo está funcionando:

1. **Frontend Integration (Sprint 9)**
   - Integrar endpoints de content library no dashboard
   - Criar UI para exibir conteúdo recomendado
   - Implementar tracking de consumo

2. **Analytics**
   - Monitorar quais conteúdos são mais consumidos
   - Analisar padrões de compatibilidade por tipo MBTI
   - Otimizar algoritmo de recomendação

3. **Content Expansion**
   - Adicionar mais conteúdos ao seed
   - Criar categorias específicas por tipo
   - Implementar content moderation

---

**Sprint 8 Status:** ✅ PRONTO PARA DEPLOY

**Desenvolvido em:** 2025-10-18
