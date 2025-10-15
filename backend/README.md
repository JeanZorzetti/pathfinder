# 🧭 Pathfinder Backend API

Backend API para o Pathfinder - Plataforma de autoconhecimento focada em SEO e testes de personalidade.

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Stack Tecnológico](#stack-tecnológico)
- [Arquitetura](#arquitetura)
- [Setup Local](#setup-local)
- [Deploy na VPS (Easypanel)](#deploy-na-vps)
- [API Endpoints](#api-endpoints)
- [Seeds e Migrations](#seeds-e-migrations)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## 🎯 Visão Geral

O Pathfinder Backend é uma API RESTful construída com NestJS que serve duas funcionalidades críticas do MVP:

1. **Sistema de Testes de Personalidade**: MBTI, Big Five e Eneagrama
2. **Motor de Conteúdo SEO**: APIs públicas para geração de páginas programáticas

### Características Principais

- ✅ Autenticação JWT nativa (sem Supabase)
- ✅ PostgreSQL para persistência
- ✅ Cache em memória (Redis opcional)
- ✅ Documentação Swagger automática
- ✅ Validação de dados com class-validator
- ✅ TypeORM para gerenciamento de banco
- ✅ Seeds para popular dados iniciais
- ✅ Docker-ready para deploy

---

## 🛠️ Stack Tecnológico

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| **NestJS** | 10.4.1 | Framework backend |
| **TypeScript** | 5.6.3 | Linguagem |
| **PostgreSQL** | 16+ | Banco de dados |
| **TypeORM** | 0.3.20 | ORM |
| **Passport JWT** | 4.0.1 | Autenticação |
| **bcrypt** | 5.1.1 | Hash de senhas |
| **Swagger** | 7.4.2 | Documentação API |
| **Class Validator** | 0.14.1 | Validação |
| **Helmet** | 8.0.0 | Segurança |

---

## 🏗️ Arquitetura

```
backend/
├── src/
│   ├── modules/                    # Módulos de funcionalidades
│   │   ├── auth/                   # Autenticação JWT
│   │   ├── users/                  # Gerenciamento de usuários
│   │   ├── personality-tests/      # Testes de personalidade
│   │   ├── content/                # Sistema de conteúdo/SEO
│   │   └── health/                 # Health checks
│   │
│   ├── database/
│   │   └── seeds/                  # Seeds do banco de dados
│   │       ├── data/               # Dados dos seeds
│   │       ├── seed.service.ts     # Serviço de seeding
│   │       └── seed.script.ts      # Script executável
│   │
│   ├── config/                     # Configurações
│   │   └── typeorm.config.ts       # Config do TypeORM
│   │
│   ├── app.module.ts               # Módulo raiz
│   └── main.ts                     # Bootstrap da aplicação
│
├── Dockerfile                      # Dockerfile multi-stage
├── docker-compose.yml              # Compose para dev local
└── .env.example                    # Exemplo de variáveis
```

### Módulos Principais

#### 1. Auth Module
- JWT nativo (sem dependência externa)
- Register, Login, Refresh Token
- Guards para rotas protegidas
- Decorators: `@Public()`, `@CurrentUser()`

#### 2. Personality Tests Module
- 3 frameworks: MBTI, Big Five, Eneagrama
- Engine de scoring customizado
- Cálculo de resultados em tempo real
- Histórico de testes do usuário

#### 3. Content Module
- APIs públicas para SEO
- Cache de artigos e categorias
- Geração de sitemap.xml dinâmico
- Suporte a Pillar/Cluster content

---

## 🚀 Setup Local

### Pré-requisitos

- Node.js 20+
- PostgreSQL 16+
- npm ou yarn

### 1. Instalar Dependências

```bash
cd backend
npm install
```

### 2. Configurar Variáveis de Ambiente

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
# Database (PostgreSQL na sua VPS)
DATABASE_HOST=seu-postgres.easypanel.io
DATABASE_PORT=5432
DATABASE_USER=pathfinder
DATABASE_PASSWORD=sua_senha_segura
DATABASE_NAME=pathfinder_db

# JWT
JWT_SECRET=gere_um_secret_seguro_aqui_32_chars_minimo
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=outro_secret_diferente_para_refresh
JWT_REFRESH_EXPIRATION=30d

# CORS
FRONTEND_URL=http://localhost:5173
VERCEL_FRONTEND_URL=https://seu-app.vercel.app
```

### 3. Popular o Banco de Dados

```bash
# O TypeORM vai criar as tabelas automaticamente no primeiro start
npm run start:dev

# Depois, popule com dados iniciais (frameworks, tipos, questões)
npm run seed
```

Você verá a saída:
```
🌱 Starting database seeding...
📦 Seeding frameworks...
  ✓ Created framework: Myers-Briggs Type Indicator
  ✓ Created framework: Big Five (OCEAN)
  ✓ Created framework: Eneagrama
📦 Seeding MBTI types...
  ✓ Created MBTI type: INTJ - The Architect
  ✓ Created MBTI type: INTP - The Logician
  ...
✅ Database seeding completed!
```

### 4. Iniciar o Servidor

```bash
npm run start:dev
```

Acesse:
- **API**: http://localhost:3001
- **Swagger Docs**: http://localhost:3001/api/docs
- **Health**: http://localhost:3001/api/v1/health

---

## 🐳 Deploy na VPS (Easypanel)

### Opção 1: Docker via Easypanel

1. **No Easypanel, crie um novo serviço**:
   - Nome: `pathfinder-api`
   - Tipo: Docker
   - Source: GitHub Repository

2. **Configure as variáveis de ambiente** no painel do Easypanel

3. **Build Settings**:
   - Dockerfile path: `/backend/Dockerfile`
   - Context: `/backend`

4. **Port**: 3001

5. **Deploy!**

### Opção 2: Docker Compose Local

```bash
# Subir PostgreSQL + Redis + API
docker-compose up -d

# Ver logs
docker-compose logs -f api

# Parar tudo
docker-compose down
```

---

## 📡 API Endpoints

### Documentação Completa
Acesse `/api/docs` para a documentação interativa Swagger.

### Principais Endpoints

#### Autenticação

```bash
# Registrar usuário
POST /api/v1/auth/register
{
  "email": "user@example.com",
  "password": "senha123",
  "fullName": "João Silva"
}

# Login
POST /api/v1/auth/login
{
  "email": "user@example.com",
  "password": "senha123"
}

# Obter usuário atual
GET /api/v1/auth/me
Header: Authorization: Bearer <token>
```

#### Testes de Personalidade

```bash
# Listar frameworks disponíveis
GET /api/v1/personality-tests/frameworks

# Obter questões do MBTI
GET /api/v1/personality-tests/frameworks/mbti/questions

# Iniciar teste (autenticado)
POST /api/v1/personality-tests/start
{
  "frameworkCode": "mbti"
}

# Submeter respostas (autenticado)
POST /api/v1/personality-tests/:testResultId/submit
{
  "answers": [
    { "questionId": "uuid", "selectedValue": "E" },
    ...
  ]
}

# Meus resultados (autenticado)
GET /api/v1/personality-tests/my-results

# Tipo por slug (público - para SEO)
GET /api/v1/personality-tests/types/intj-arquiteto
```

#### Conteúdo (SEO)

```bash
# Listar artigos
GET /api/v1/content/articles?limit=10&offset=0

# Artigo por slug
GET /api/v1/content/articles/como-descobrir-personalidade

# Categorias
GET /api/v1/content/categories

# Pillar articles
GET /api/v1/content/pillars

# Sitemap XML
GET /api/v1/content/sitemap.xml
```

---

## 🌱 Seeds e Migrations

### Rodar Seeds

```bash
npm run seed
```

O seed popula:
- ✅ **3 Frameworks** (MBTI, Big Five, Eneagrama)
- ✅ **16 Tipos MBTI** com dados completos de SEO (INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP)
- ✅ **20 Questões MBTI** balanceadas (5 por dimensão: E/I, S/N, T/F, J/P)
- ✅ **6 Perfis Big Five** (Alta Abertura, Alta Conscienciosidade, Alta Extroversão, Alta Amabilidade, Alto Neuroticismo, Perfil Equilibrado)
- ✅ **50 Questões Big Five** (10 por dimensão: O, C, E, A, N)
- ✅ **9 Tipos Eneagrama** (Tipo 1: Reformador, Tipo 2: Ajudante, Tipo 3: Realizador, Tipo 4: Individualista, Tipo 5: Investigador, Tipo 6: Leal, Tipo 7: Entusiasta, Tipo 8: Desafiador, Tipo 9: Pacificador)
- ✅ **27 Questões Eneagrama** (3 por tipo, focadas em motivações e medos básicos)
- ✅ **Total: 31 tipos de personalidade + 97 questões** prontos para uso em produção

### Estrutura dos Seeds

```typescript
// backend/src/database/seeds/data/mbti-types.data.ts
export const mbtiTypesData = {
  intj: {
    name: 'The Architect',
    title: 'O Arquiteto',
    description: '...',
    strengths: [...],
    weaknesses: [...],
    careers: [...],
    // Campos SEO
    slug: 'intj-arquiteto',
    metaTitle: '...',
    metaDescription: '...',
    keywords: [...]
  },
  // ... outros 15 tipos
}
```

### Migrations TypeORM

```bash
# Gerar migration
npm run migration:generate -- src/database/migrations/AddNewField

# Rodar migrations
npm run migration:run

# Reverter última migration
npm run migration:revert
```

---

## 🔐 Variáveis de Ambiente

### Obrigatórias

| Variável | Descrição | Exemplo |
|----------|-----------|---------|
| `DATABASE_HOST` | Host do PostgreSQL | `localhost` ou `seu-db.easypanel.io` |
| `DATABASE_PORT` | Porta do PostgreSQL | `5432` |
| `DATABASE_USER` | Usuário do banco | `pathfinder` |
| `DATABASE_PASSWORD` | Senha do banco | `senha_segura` |
| `DATABASE_NAME` | Nome do banco | `pathfinder_db` |
| `JWT_SECRET` | Secret para JWT | Mínimo 32 caracteres |
| `JWT_REFRESH_SECRET` | Secret para refresh token | Diferente do JWT_SECRET |

### Opcionais

| Variável | Descrição | Default |
|----------|-----------|---------|
| `PORT` | Porta da API | `3001` |
| `NODE_ENV` | Ambiente | `development` |
| `FRONTEND_URL` | URL do frontend local | `http://localhost:5173` |
| `VERCEL_FRONTEND_URL` | URL do frontend em produção | - |
| `REDIS_HOST` | Host do Redis (opcional) | `localhost` |
| `BCRYPT_SALT_ROUNDS` | Rounds do bcrypt | `10` |

---

## 📊 Estrutura do Banco de Dados

### Principais Tabelas

```sql
users
  ├─ id (uuid)
  ├─ email (unique)
  ├─ password (hashed)
  ├─ subscription_status (enum)
  └─ test_results (relação)

personality_frameworks
  ├─ id (uuid)
  ├─ code (mbti, bigfive, enneagram)
  ├─ name
  └─ types (relação)

personality_types
  ├─ id (uuid)
  ├─ code (INTJ, ENFP, etc)
  ├─ name, title, description
  ├─ slug (para SEO)
  ├─ strengths, weaknesses, careers (jsonb)
  └─ test_results (relação)

questions
  ├─ id (uuid)
  ├─ framework_id
  ├─ question_text
  ├─ dimension (EI, SN, TF, JP)
  └─ options (jsonb)

test_results
  ├─ id (uuid)
  ├─ user_id
  ├─ framework_id
  ├─ personality_type_id
  ├─ scores (jsonb)
  └─ status (in_progress, completed)

articles
  ├─ id (uuid)
  ├─ slug (unique)
  ├─ title, content
  ├─ article_type (pillar, cluster, programmatic)
  ├─ meta_title, meta_description
  └─ view_count
```

---

## 🧪 Testes

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:cov
```

---

## 📝 Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run start:dev` | Inicia em modo desenvolvimento com hot reload |
| `npm run start:prod` | Inicia em modo produção |
| `npm run build` | Compila o projeto |
| `npm run seed` | Popula o banco com dados iniciais |
| `npm run lint` | Roda o linter |
| `npm run format` | Formata o código com Prettier |

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Add: Nova feature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

---

## 📄 Licença

MIT

---

## 🆘 Troubleshooting

### Erro: "Unable to connect to the database"

**Solução**: Verifique se o PostgreSQL está rodando e as credenciais no `.env` estão corretas.

```bash
# Testar conexão local
psql -h localhost -U pathfinder -d pathfinder_db
```

### Erro: "ECONNREFUSED Redis"

**Solução**: Redis é opcional. O app já está configurado para usar cache em memória por padrão.

### Erro no seed: "relation does not exist"

**Solução**: O TypeORM precisa criar as tabelas primeiro:
```bash
# Inicie a aplicação uma vez para criar as tabelas
npm run start:dev
# Depois rode o seed
npm run seed
```

---

## 📞 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.

**Feito com ❤️ para o Pathfinder MVP**
