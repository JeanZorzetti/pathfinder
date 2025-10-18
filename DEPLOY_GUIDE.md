# 🚀 GUIA COMPLETO DE DEPLOY - PATHFINDER

Este guia detalha o processo completo de deploy do Pathfinder para produção.

## 📋 Índice

- [Pré-requisitos](#pré-requisitos)
- [Opção 1: Deploy com Railway + Vercel (Recomendado)](#opção-1-deploy-com-railway--vercel-recomendado)
- [Opção 2: Deploy com Render](#opção-2-deploy-com-render)
- [Opção 3: Deploy com Docker](#opção-3-deploy-com-docker)
- [Configuração do Banco de Dados](#configuração-do-banco-de-dados)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Testes Pós-Deploy](#testes-pós-deploy)
- [Monitoramento](#monitoramento)
- [Troubleshooting](#troubleshooting)

---

## 🔧 Pré-requisitos

Antes de começar o deploy, certifique-se de ter:

### Contas Necessárias
- ✅ Conta no [GitHub](https://github.com) (para CI/CD)
- ✅ Conta no [Railway](https://railway.app) OU [Render](https://render.com) (backend)
- ✅ Conta no [Vercel](https://vercel.com) OU [Netlify](https://netlify.com) (frontend)

### Repositório Git
```bash
# Se ainda não inicializou o Git:
cd pathfinder-main
git init
git add .
git commit -m "feat: Projeto Pathfinder completo - Sprint 5"

# Crie um repositório no GitHub e conecte:
git remote add origin https://github.com/seu-usuario/pathfinder.git
git branch -M main
git push -u origin main
```

### Gerar Secrets JWT
```bash
# Execute este comando para gerar JWT_SECRET:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Execute novamente para gerar JWT_REFRESH_SECRET (deve ser diferente):
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Salve esses valores - você vai precisar deles!
```

---

## 🚂 Opção 1: Deploy com Railway + Vercel (Recomendado)

### Vantagens
- ✅ Setup mais rápido
- ✅ PostgreSQL incluído (plano gratuito: 512MB)
- ✅ Deploy automático via Git
- ✅ SSL gratuito
- ✅ $5 de crédito grátis/mês

### Passo 1: Deploy do Backend no Railway

#### 1.1. Criar Projeto
1. Acesse [railway.app](https://railway.app)
2. Clique em **"New Project"**
3. Selecione **"Deploy from GitHub repo"**
4. Selecione seu repositório `pathfinder`
5. Railway detectará automaticamente o NestJS

#### 1.2. Adicionar PostgreSQL
1. No projeto Railway, clique em **"+ New"**
2. Selecione **"Database" → "PostgreSQL"**
3. Railway criará o banco e fornecerá `DATABASE_URL` automaticamente

#### 1.3. Configurar Variáveis de Ambiente

No painel do Railway, vá em **"Variables"** e adicione:

```bash
# Application
NODE_ENV=production
PORT=3001
API_PREFIX=api/v1

# CORS (Atualize depois do deploy do frontend)
FRONTEND_URL=https://seu-app.vercel.app
VERCEL_FRONTEND_URL=https://seu-app.vercel.app

# Database (Railway fornece automaticamente via DATABASE_URL)
# Se precisar configurar manualmente:
DATABASE_HOST=${{Postgres.PGHOST}}
DATABASE_PORT=${{Postgres.PGPORT}}
DATABASE_USER=${{Postgres.PGUSER}}
DATABASE_PASSWORD=${{Postgres.PGPASSWORD}}
DATABASE_NAME=${{Postgres.PGDATABASE}}
DATABASE_SSL=true

# JWT (Use os secrets gerados anteriormente!)
JWT_SECRET=cole_aqui_o_secret_de_64_caracteres_que_voce_gerou
JWT_EXPIRATION=7d
JWT_REFRESH_SECRET=cole_aqui_o_outro_secret_diferente_de_64_caracteres
JWT_REFRESH_EXPIRATION=30d

# Security
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
```

#### 1.4. Configurar Build
Railway já detecta automaticamente, mas se precisar ajustar:

1. Em **"Settings"**, confirme:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start:prod`
   - **Root Directory**: `backend`

#### 1.5. Deploy
1. Railway iniciará o deploy automaticamente
2. Aguarde a conclusão (2-5 minutos)
3. Após o deploy, clique em **"Settings" → "Generate Domain"**
4. Copie a URL gerada (ex: `pathfinder-backend.up.railway.app`)

#### 1.6. Testar Backend
```bash
# Substitua pela URL real do seu backend
curl https://pathfinder-backend.up.railway.app/api/v1/health

# Resposta esperada:
# {"status":"ok","timestamp":"..."}
```

---

### Passo 2: Deploy do Frontend no Vercel

#### 2.1. Criar Projeto
1. Acesse [vercel.com](https://vercel.com)
2. Clique em **"Add New... → Project"**
3. Selecione **"Import Git Repository"**
4. Selecione seu repositório `pathfinder`

#### 2.2. Configurar Projeto
1. **Framework Preset**: Vite (detectado automaticamente)
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build`
4. **Output Directory**: `dist`

#### 2.3. Configurar Variáveis de Ambiente

Em **"Environment Variables"**, adicione:

```bash
# API Backend (use a URL do Railway)
VITE_API_URL=https://pathfinder-backend.up.railway.app/api/v1
```

#### 2.4. Deploy
1. Clique em **"Deploy"**
2. Aguarde a conclusão (1-3 minutos)
3. Vercel fornecerá uma URL (ex: `pathfinder.vercel.app`)

#### 2.5. Atualizar CORS no Backend

⚠️ **IMPORTANTE**: Volte ao Railway e atualize as variáveis de ambiente:

```bash
FRONTEND_URL=https://pathfinder.vercel.app
VERCEL_FRONTEND_URL=https://pathfinder.vercel.app
```

Clique em **"Redeploy"** no Railway para aplicar as mudanças.

#### 2.6. Testar Frontend
1. Acesse a URL do Vercel
2. Tente fazer login/cadastro
3. Verifique se as chamadas à API estão funcionando

---

## 🎨 Opção 2: Deploy com Render

### Passo 1: Deploy do Backend no Render

#### 1.1. Criar Web Service
1. Acesse [render.com](https://render.com)
2. Clique em **"New +" → "Web Service"**
3. Conecte seu repositório GitHub
4. Selecione `pathfinder`

#### 1.2. Configurar Service
```
Name: pathfinder-backend
Region: Oregon (US West)
Branch: main
Root Directory: backend
Runtime: Node
Build Command: npm install && npm run build
Start Command: npm run start:prod
Plan: Free
```

#### 1.3. Adicionar PostgreSQL
1. No dashboard do Render, clique em **"New +" → "PostgreSQL"**
2. Nome: `pathfinder-db`
3. Plan: Free (256MB)
4. Copie a **Internal Database URL**

#### 1.4. Configurar Variáveis de Ambiente

No painel do Web Service, em **"Environment"**:

```bash
NODE_ENV=production
PORT=3001
API_PREFIX=api/v1
DATABASE_URL=cole_aqui_a_internal_database_url
DATABASE_SSL=true
FRONTEND_URL=https://seu-app.vercel.app
JWT_SECRET=seu_secret_de_64_caracteres
JWT_REFRESH_SECRET=seu_outro_secret_de_64_caracteres
JWT_EXPIRATION=7d
JWT_REFRESH_EXPIRATION=30d
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
```

#### 1.5. Deploy
1. Clique em **"Create Web Service"**
2. Aguarde o deploy (5-10 minutos no primeiro deploy)
3. Copie a URL gerada (ex: `pathfinder-backend.onrender.com`)

### Passo 2: Deploy do Frontend

Siga os mesmos passos da [Opção 1 - Passo 2](#passo-2-deploy-do-frontend-no-vercel), mas use a URL do Render como `VITE_API_URL`.

---

## 🐳 Opção 3: Deploy com Docker

### Pré-requisitos
- Docker e Docker Compose instalados
- Servidor VPS (DigitalOcean, Linode, AWS EC2, etc.)

### Passo 1: Preparar docker-compose.yml

Crie o arquivo na raiz do projeto:

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: pathfinder-db
    environment:
      POSTGRES_USER: pathfinder
      POSTGRES_PASSWORD: ${DB_PASSWORD}
      POSTGRES_DB: pathfinder_production
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U pathfinder"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: pathfinder-backend
    environment:
      NODE_ENV: production
      PORT: 3001
      DATABASE_HOST: postgres
      DATABASE_PORT: 5432
      DATABASE_USER: pathfinder
      DATABASE_PASSWORD: ${DB_PASSWORD}
      DATABASE_NAME: pathfinder_production
      DATABASE_SSL: false
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      FRONTEND_URL: ${FRONTEND_URL}
    ports:
      - "3001:3001"
    depends_on:
      postgres:
        condition: service_healthy
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "node", "-e", "require('http').get('http://localhost:3001/api/v1/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  postgres_data:
```

### Passo 2: Configurar .env

Crie `.env` na raiz:

```bash
DB_PASSWORD=sua_senha_segura_aqui
JWT_SECRET=seu_secret_de_64_caracteres
JWT_REFRESH_SECRET=seu_outro_secret_de_64_caracteres
FRONTEND_URL=https://seu-dominio.com
```

### Passo 3: Deploy

```bash
# No servidor VPS:
docker-compose up -d

# Verificar logs:
docker-compose logs -f backend

# Verificar health:
curl http://localhost:3001/api/v1/health
```

### Passo 4: Nginx Reverse Proxy

Configure Nginx para SSL e proxy:

```nginx
server {
    listen 80;
    server_name api.seu-dominio.com;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 🗄️ Configuração do Banco de Dados

### Executar Migrations (Após Primeiro Deploy)

```bash
# Railway:
railway run npm run migration:run

# Render:
# Conecte via SSH ao container e execute:
npm run migration:run

# Docker:
docker-compose exec backend npm run migration:run
```

### Seed de Dados Iniciais

```bash
# Execute o script de seed:
railway run npm run seed
# OU
docker-compose exec backend npm run seed
```

---

## 🔐 Variáveis de Ambiente

### Resumo Completo

| Variável | Backend | Frontend | Descrição |
|----------|---------|----------|-----------|
| `NODE_ENV` | ✅ | - | `production` |
| `PORT` | ✅ | - | `3001` |
| `API_PREFIX` | ✅ | - | `api/v1` |
| `DATABASE_URL` | ✅ | - | URL completa do PostgreSQL |
| `DATABASE_HOST` | ✅ | - | Host do banco |
| `DATABASE_PORT` | ✅ | - | `5432` |
| `DATABASE_USER` | ✅ | - | Usuário do banco |
| `DATABASE_PASSWORD` | ✅ | - | Senha do banco |
| `DATABASE_NAME` | ✅ | - | Nome do banco |
| `DATABASE_SSL` | ✅ | - | `true` em produção |
| `JWT_SECRET` | ✅ | - | Secret de 64 caracteres |
| `JWT_REFRESH_SECRET` | ✅ | - | Outro secret de 64 caracteres |
| `JWT_EXPIRATION` | ✅ | - | `7d` |
| `JWT_REFRESH_EXPIRATION` | ✅ | - | `30d` |
| `FRONTEND_URL` | ✅ | - | URL do frontend |
| `BCRYPT_SALT_ROUNDS` | ✅ | - | `12` |
| `RATE_LIMIT_TTL` | ✅ | - | `60` |
| `RATE_LIMIT_MAX` | ✅ | - | `100` |
| `VITE_API_URL` | - | ✅ | URL completa do backend |

---

## ✅ Testes Pós-Deploy

### 1. Health Check do Backend

```bash
curl https://seu-backend.railway.app/api/v1/health
# Esperado: {"status":"ok","timestamp":"..."}
```

### 2. Swagger Documentation

Acesse: `https://seu-backend.railway.app/api/v1/docs`

### 3. Testar Endpoints Principais

```bash
# Listar frameworks de testes
curl https://seu-backend.railway.app/api/v1/personality-tests/frameworks

# Criar usuário (deve retornar erro se não enviar dados)
curl -X POST https://seu-backend.railway.app/api/v1/auth/register
```

### 4. Testar Frontend

1. Acesse `https://seu-app.vercel.app`
2. Teste cadastro de usuário
3. Teste login
4. Navegue pelas páginas
5. Verifique console do navegador (não deve ter erros de CORS)

### 5. Script de Teste Automatizado

Use os scripts E2E criados no Sprint 5:

```bash
# Atualize BASE_URL nos scripts para apontar para produção:
# test-journal-e2e.cjs
# test-challenges-e2e.cjs
# test-comparison-e2e.cjs
# test-performance.cjs

# Execute:
node test-performance.cjs
```

---

## 📊 Monitoramento

### Railway
- Dashboard mostra CPU, RAM, Network
- Logs em tempo real
- Métricas de deploy

### Render
- Dashboard com métricas
- Logs integrados
- Alertas de downtime

### Recomendações Adicionais

#### Sentry (Error Tracking)
```bash
# 1. Crie conta em sentry.io
# 2. Adicione ao backend:
npm install @sentry/node

# 3. Configure em src/main.ts:
import * as Sentry from '@sentry/node';
Sentry.init({ dsn: process.env.SENTRY_DSN });

# 4. Adicione variável de ambiente:
SENTRY_DSN=https://...@sentry.io/...
```

#### UptimeRobot (Uptime Monitoring)
1. Crie conta em [uptimerobot.com](https://uptimerobot.com)
2. Adicione monitor para `https://seu-backend.railway.app/api/v1/health`
3. Configure alertas por email/SMS

---

## 🔧 Troubleshooting

### Erro: "Cannot connect to database"

**Sintomas**: Backend não inicia, erro de conexão ao PostgreSQL

**Soluções**:
1. Verifique se `DATABASE_URL` está correto
2. Se usar Railway/Render, use a **Internal URL** do banco
3. Verifique se `DATABASE_SSL=true` em produção
4. Aguarde 30s após criar o banco (pode demorar para inicializar)

### Erro: "CORS policy"

**Sintomas**: Frontend não consegue chamar API, erro no console do navegador

**Soluções**:
1. Verifique se `FRONTEND_URL` no backend está correta
2. Não use `http://` em produção (use `https://`)
3. Não adicione `/` no final da URL
4. Após alterar, faça redeploy do backend

### Erro: "Invalid JWT token"

**Sintomas**: Usuário não consegue fazer login

**Soluções**:
1. Verifique se `JWT_SECRET` e `JWT_REFRESH_SECRET` têm 64 caracteres
2. Certifique-se de que são diferentes entre si
3. Após alterar, usuários precisarão fazer login novamente

### Erro: "Build failed"

**Sintomas**: Deploy falha na etapa de build

**Soluções**:
1. Verifique logs do deploy
2. Confirme que `package.json` tem script `build`
3. Teste build localmente: `npm run build`
4. Verifique se todas as dependências estão em `dependencies` (não `devDependencies`)

### Erro: "Application Error" ou "503 Service Unavailable"

**Sintomas**: Backend deploiado mas retorna erro ao acessar

**Soluções**:
1. Verifique logs da aplicação
2. Confirme que a porta está correta (`PORT=3001`)
3. Verifique health check: `/api/v1/health`
4. Aguarde 2-3 minutos (primeira inicialização é mais lenta)

---

## 📝 Checklist Final

Antes de considerar o deploy completo, verifique:

### Backend
- [ ] Deploy realizado com sucesso
- [ ] Health check retorna `{"status":"ok"}`
- [ ] Swagger docs acessível em `/api/v1/docs`
- [ ] Banco de dados conectado
- [ ] Migrations executadas
- [ ] Seed executado (dados iniciais)
- [ ] Variáveis de ambiente configuradas
- [ ] CORS configurado corretamente
- [ ] Logs sem erros críticos

### Frontend
- [ ] Deploy realizado com sucesso
- [ ] Site acessível via HTTPS
- [ ] Login/cadastro funcionando
- [ ] Chamadas à API funcionando
- [ ] Sem erros no console do navegador
- [ ] Páginas carregando corretamente
- [ ] Variável `VITE_API_URL` configurada

### Segurança
- [ ] JWT secrets gerados e configurados
- [ ] Senhas de banco seguras
- [ ] SSL/HTTPS ativo
- [ ] Rate limiting configurado
- [ ] Bcrypt com salt rounds adequado

### Monitoramento
- [ ] Uptime monitoring configurado
- [ ] Error tracking (Sentry) opcional
- [ ] Logs acessíveis

---

## 🎉 Próximos Passos

Após deploy bem-sucedido:

1. **Domínio Personalizado** (opcional)
   - Configure DNS para apontar para Railway/Vercel
   - Adicione domínio customizado no painel

2. **CI/CD Automático**
   - Já configurado via Git! Cada push na branch `main` faz deploy automático

3. **Backups**
   - Configure backups automáticos do PostgreSQL
   - Railway/Render oferecem isso nos planos pagos

4. **Scaling**
   - Monitore uso de recursos
   - Upgrade de plano se necessário

5. **Analytics**
   - Adicione Google Analytics ao frontend
   - Configure tracking de eventos importantes

---

## 📞 Suporte

- **Railway**: [docs.railway.app](https://docs.railway.app)
- **Render**: [render.com/docs](https://render.com/docs)
- **Vercel**: [vercel.com/docs](https://vercel.com/docs)

---

**Deploy realizado com sucesso! 🚀**

_Documentação criada no Sprint 5 - Fase 6: Deploy_
