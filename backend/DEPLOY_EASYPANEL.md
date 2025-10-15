# 🚀 Guia de Deploy - Easypanel

Este guia mostra como fazer o deploy do Pathfinder Backend no Easypanel (VPS Hostinger).

## 📋 Pré-requisitos

- ✅ Conta no Easypanel configurada na VPS
- ✅ PostgreSQL database criado no Easypanel
- ✅ Repositório no GitHub (ou GitLab)
- ✅ Secrets JWT gerados

---

## 🔐 1. Preparar Variáveis de Ambiente

Antes de fazer o deploy, gere os secrets JWT:

```bash
# Gerar JWT_SECRET (32+ caracteres)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Gerar JWT_REFRESH_SECRET (diferente do anterior)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 🗄️ 2. Criar Database no Easypanel

1. No Easypanel, vá em **Services** → **Create Service**
2. Escolha **PostgreSQL**
3. Configure:
   - **Name**: `pathfinder-db` (ou `dados_pathpost` se já existe)
   - **Version**: `16` (recomendado)
   - **Username**: `PathPost` (ou seu preferido)
   - **Password**: Gere uma senha segura
   - **Database**: `PathPost` (ou `pathfinder`)

4. Após criar, anote as credenciais:
   - **Internal Host**: `dados_pathpost` (nome do serviço)
   - **External Host**: `IP_DA_VPS` (ex: 31.97.23.166)
   - **Port**: `5432`

---

## 🐳 3. Deploy da API

### Opção A: Via GitHub (Recomendado)

1. **No Easypanel, crie um novo App**:
   - Vá em **Apps** → **Create App**
   - Nome: `pathfinder-api`

2. **Configurar Source**:
   - **Type**: GitHub/GitLab
   - **Repository**: `seu-usuario/pathfinder`
   - **Branch**: `main` ou `master`
   - **Build Method**: Dockerfile
   - **Dockerfile Path**: `/backend/Dockerfile`
   - **Build Context**: `/backend`

3. **Configurar Variáveis de Ambiente**:

   Clique em **Environment** e adicione:

   ```env
   # Application
   NODE_ENV=production
   PORT=3001
   API_PREFIX=api/v1

   # Database (usar INTERNAL HOST para melhor performance)
   DATABASE_HOST=dados_pathpost
   DATABASE_PORT=5432
   DATABASE_USER=PathPost
   DATABASE_PASSWORD=sua_senha_do_banco
   DATABASE_NAME=PathPost

   # JWT Secrets (cole os que você gerou)
   JWT_SECRET=seu_jwt_secret_gerado
   JWT_EXPIRATION=7d
   JWT_REFRESH_SECRET=seu_refresh_secret_gerado
   JWT_REFRESH_EXPIRATION=30d

   # Bcrypt
   BCRYPT_SALT_ROUNDS=10

   # CORS (seu frontend Vercel)
   FRONTEND_URL=https://seu-app.vercel.app
   VERCEL_FRONTEND_URL=https://seu-app.vercel.app

   # Rate Limiting
   RATE_LIMIT_TTL=60
   RATE_LIMIT_MAX=100
   ```

4. **Configurar Domínio** (opcional):
   - Em **Domains**, adicione seu domínio customizado
   - Ou use o domínio gerado pelo Easypanel: `pathfinder-api.easypanel.host`

5. **Deploy**:
   - Clique em **Deploy**
   - Aguarde o build (leva ~2-5 minutos)
   - Verifique os logs em **Logs**

### Opção B: Via Docker Image

Se você preferir fazer o build localmente:

```bash
cd backend

# Build da imagem
docker build -t pathfinder-api:latest .

# Tag para seu registry
docker tag pathfinder-api:latest seu-registry/pathfinder-api:latest

# Push para registry
docker push seu-registry/pathfinder-api:latest
```

No Easypanel, use **Docker Image** e aponte para `seu-registry/pathfinder-api:latest`.

---

## ✅ 4. Verificar Deploy

### 4.1. Health Check

```bash
curl https://seu-dominio.easypanel.host/api/v1/health
```

Deve retornar:
```json
{
  "success": true,
  "status": "healthy",
  "timestamp": "2025-01-15T...",
  "uptime": 123.45,
  "environment": "production"
}
```

### 4.2. Ver Swagger Docs

Acesse: `https://seu-dominio.easypanel.host/api/docs`

### 4.3. Testar Frameworks

```bash
curl https://seu-dominio.easypanel.host/api/v1/personality-tests/frameworks
```

---

## 🌱 5. Popular o Banco (Seed)

**Importante**: Você precisa rodar o seed UMA VEZ após o primeiro deploy.

### Método 1: Via Console do Easypanel

1. No Easypanel, vá no app `pathfinder-api`
2. Clique em **Console** (terminal)
3. Execute:

```bash
npm run seed
```

### Método 2: Via Script Remoto

Se você tem acesso SSH à VPS:

```bash
# SSH na VPS
ssh user@31.97.23.166

# Encontre o container
docker ps | grep pathfinder-api

# Execute o seed
docker exec -it <container-id> npm run seed
```

Você verá:
```
🌱 Starting database seeding...
📦 Seeding frameworks...
  ✓ Created framework: Myers-Briggs Type Indicator
  ✓ Created framework: Big Five (OCEAN)
  ✓ Created framework: Eneagrama
📦 Seeding MBTI types...
  ✓ Created MBTI type: INTJ - The Architect
  ...
📦 Seeding Big Five types...
  ✓ Created Big Five type: The Creative Explorer
  ...
✅ Database seeding completed!
```

---

## 🔄 6. Configurar Auto-Deploy (CI/CD)

### GitHub Actions

Crie `.github/workflows/deploy.yml` no seu repositório:

```yaml
name: Deploy to Easypanel

on:
  push:
    branches: [ main ]
    paths:
      - 'backend/**'

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Easypanel Deploy
        run: |
          curl -X POST "https://api.easypanel.io/webhooks/${{ secrets.EASYPANEL_WEBHOOK }}"
```

Configure o webhook no Easypanel:
1. Vá em **Settings** → **Webhooks**
2. Copie a URL do webhook
3. Adicione como secret `EASYPANEL_WEBHOOK` no GitHub

---

## 📊 7. Monitoramento

### Logs em Tempo Real

No Easypanel:
1. Vá no app `pathfinder-api`
2. Clique em **Logs**
3. Veja logs em tempo real

### Métricas

No Easypanel você terá acesso a:
- **CPU Usage**
- **Memory Usage**
- **Network Traffic**
- **Request Count**

### Alertas

Configure alertas no Easypanel para:
- ❗ App Down
- ⚠️ High Memory (> 80%)
- ⚠️ High CPU (> 80%)
- ⚠️ Error Rate (> 5%)

---

## 🔧 8. Troubleshooting

### Problema: Build Failing

**Solução**: Verifique os logs de build no Easypanel. Comum:
- ❌ Faltando `package-lock.json` → Commite o arquivo
- ❌ Erro de TypeScript → Rode `npm run build` localmente primeiro

### Problema: App Crashing

**Solução**: Verifique variáveis de ambiente:
```bash
# No console do Easypanel
env | grep DATABASE
```

Se estiver vazio, configure as env vars no painel.

### Problema: Database Connection Failed

**Solução**: Use o **internal host** (`dados_pathpost`) em vez do IP externo:
- ✅ `DATABASE_HOST=dados_pathpost` (melhor)
- ❌ `DATABASE_HOST=31.97.23.166` (mais lento)

### Problema: CORS Error

**Solução**: Adicione seu domínio do Vercel em `FRONTEND_URL`:
```env
FRONTEND_URL=https://pathfinder.vercel.app
```

---

## 🎯 9. Checklist Final

Antes de considerar o deploy completo, verifique:

- [ ] ✅ Health check respondendo (200 OK)
- [ ] ✅ Swagger docs acessível em `/api/docs`
- [ ] ✅ Database conectado (ver logs)
- [ ] ✅ Seed executado (frameworks, tipos, questões)
- [ ] ✅ CORS configurado com URL do frontend
- [ ] ✅ HTTPS habilitado (certificado SSL)
- [ ] ✅ Logs sem erros graves
- [ ] ✅ Testes de autenticação funcionando
- [ ] ✅ Testes de personalidade funcionando

---

## 📞 Suporte

Se você encontrar problemas:

1. **Logs**: Sempre comece pelos logs do Easypanel
2. **Database**: Verifique se o PostgreSQL está rodando
3. **Env Vars**: Confirme que todas as variáveis estão setadas
4. **Network**: Teste a conectividade entre app e banco

**Comandos úteis no console do Easypanel**:

```bash
# Ver variáveis de ambiente
env

# Testar conexão com banco
nc -zv dados_pathpost 5432

# Ver processo Node rodando
ps aux | grep node

# Reiniciar app manualmente
npm run start:prod
```

---

## ✨ Deploy Completo!

Parabéns! Seu Pathfinder Backend está no ar! 🎉

Próximos passos:
1. Conectar o frontend (React/Vercel) à API
2. Configurar analytics e monitoramento
3. Implementar backups automáticos do banco
4. Configurar alertas de uptime

**Feito com ❤️ para o Pathfinder MVP**
