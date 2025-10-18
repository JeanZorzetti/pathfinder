# ✅ CHECKLIST DE DEPLOY - PATHFINDER

Guia rápido para deploy em produção. Para instruções detalhadas, veja [DEPLOY_GUIDE.md](./DEPLOY_GUIDE.md).

---

## 📋 PRÉ-DEPLOY

### 1. Preparação do Código
- [ ] Código commitado no Git
- [ ] Repositório no GitHub criado
- [ ] Branch `main` atualizada
- [ ] Build local funcionando (`npm run build` em backend e frontend)
- [ ] Testes E2E passando (opcional mas recomendado)

### 2. Gerar Secrets
```bash
# Execute e salve os resultados:
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"  # JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"  # JWT_REFRESH_SECRET
```
- [ ] `JWT_SECRET` gerado (64 caracteres)
- [ ] `JWT_REFRESH_SECRET` gerado (64 caracteres, diferente do anterior)

### 3. Contas de Serviço
- [ ] Conta no Railway OU Render (backend + database)
- [ ] Conta no Vercel OU Netlify (frontend)
- [ ] Conta no GitHub (para conectar repositórios)

---

## 🚂 DEPLOY DO BACKEND (Railway)

### 1. Criar Projeto
- [ ] Login no [Railway](https://railway.app)
- [ ] Criar novo projeto
- [ ] Conectar repositório GitHub
- [ ] Railway detectou NestJS automaticamente

### 2. Adicionar PostgreSQL
- [ ] Clicar em "+ New"
- [ ] Selecionar "Database → PostgreSQL"
- [ ] Aguardar criação do banco (30s-1min)
- [ ] Copiar DATABASE_URL (gerada automaticamente)

### 3. Configurar Variáveis de Ambiente

Ir em "Variables" e adicionar:

```
NODE_ENV=production
PORT=3001
API_PREFIX=api/v1
FRONTEND_URL=https://seu-app.vercel.app (atualizar depois)
DATABASE_SSL=true
JWT_SECRET=(colar secret gerado)
JWT_REFRESH_SECRET=(colar outro secret gerado)
JWT_EXPIRATION=7d
JWT_REFRESH_EXPIRATION=30d
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
LOG_LEVEL=info
```

**Checklist de variáveis**:
- [ ] `NODE_ENV=production`
- [ ] `PORT=3001`
- [ ] `API_PREFIX=api/v1`
- [ ] `FRONTEND_URL` (temporário, atualizar depois)
- [ ] `DATABASE_SSL=true`
- [ ] `JWT_SECRET` (64 caracteres)
- [ ] `JWT_REFRESH_SECRET` (64 caracteres, diferente)
- [ ] `JWT_EXPIRATION=7d`
- [ ] `JWT_REFRESH_EXPIRATION=30d`
- [ ] `BCRYPT_SALT_ROUNDS=12`

### 4. Deploy e Testes
- [ ] Railway iniciou deploy automaticamente
- [ ] Deploy concluído (aguardar 2-5 min)
- [ ] Ir em "Settings → Generate Domain"
- [ ] Copiar URL gerada (ex: `pathfinder-backend.up.railway.app`)
- [ ] Testar health check:
  ```bash
  curl https://SUA-URL.railway.app/api/v1/health
  # Deve retornar: {"status":"ok","timestamp":"..."}
  ```
- [ ] Acessar Swagger docs: `https://SUA-URL.railway.app/api/v1/docs`

### 5. Executar Migrations e Seed
```bash
# No terminal local:
railway login
railway link
railway run npm run migration:run
railway run npm run seed
```
- [ ] Migrations executadas
- [ ] Seed executado (dados iniciais carregados)

---

## 🎨 DEPLOY DO FRONTEND (Vercel)

### 1. Criar Projeto
- [ ] Login no [Vercel](https://vercel.com)
- [ ] Clicar em "Add New... → Project"
- [ ] Selecionar repositório GitHub
- [ ] Vercel detectou Vite automaticamente

### 2. Configurar Build
- [ ] **Framework Preset**: Vite
- [ ] **Root Directory**: `frontend`
- [ ] **Build Command**: `npm run build`
- [ ] **Output Directory**: `dist`

### 3. Configurar Variáveis de Ambiente

Em "Environment Variables":

```
VITE_API_URL=https://pathfinder-backend.up.railway.app/api/v1
```

**Checklist**:
- [ ] `VITE_API_URL` configurada (URL completa do backend Railway)

### 4. Deploy e Testes
- [ ] Clicar em "Deploy"
- [ ] Deploy concluído (aguardar 1-3 min)
- [ ] Copiar URL gerada (ex: `pathfinder.vercel.app`)
- [ ] Acessar site no navegador
- [ ] Abrir DevTools Console (F12)
- [ ] Verificar se não há erros de CORS

---

## 🔄 ATUALIZAR CORS NO BACKEND

**⚠️ IMPORTANTE**: Após deploy do frontend, volte ao Railway!

### No Railway:
- [ ] Ir em "Variables"
- [ ] Atualizar `FRONTEND_URL=https://pathfinder.vercel.app` (URL real)
- [ ] Atualizar `VERCEL_FRONTEND_URL=https://pathfinder.vercel.app`
- [ ] Clicar em "Redeploy" para aplicar mudanças
- [ ] Aguardar redeploy (1-2 min)

---

## ✅ TESTES PÓS-DEPLOY

### 1. Backend
- [ ] Health check OK: `curl https://backend.railway.app/api/v1/health`
- [ ] Swagger docs acessível: `https://backend.railway.app/api/v1/docs`
- [ ] Endpoint de frameworks: `curl https://backend.railway.app/api/v1/personality-tests/frameworks`
- [ ] Sem erros nos logs do Railway

### 2. Frontend
- [ ] Site carregando: `https://pathfinder.vercel.app`
- [ ] Cadastro de usuário funcionando
- [ ] Login funcionando
- [ ] Dashboard carregando
- [ ] Sem erros CORS no console
- [ ] Chamadas à API funcionando

### 3. Integração Completa
- [ ] Criar novo usuário pelo frontend
- [ ] Fazer login
- [ ] Navegar pelo dashboard
- [ ] Testar criação de journal entry
- [ ] Testar iniciar challenge
- [ ] Verificar que dados persistem (refresh da página)

---

## 🔐 SEGURANÇA

### Checklist Final de Segurança
- [ ] JWT secrets com 64 caracteres
- [ ] Secrets diferentes entre JWT_SECRET e JWT_REFRESH_SECRET
- [ ] DATABASE_SSL=true em produção
- [ ] HTTPS ativo (Railway e Vercel fornecem automaticamente)
- [ ] CORS configurado para domínio específico (não `*`)
- [ ] Rate limiting ativo (RATE_LIMIT_MAX=100)
- [ ] Bcrypt salt rounds = 12
- [ ] Senhas de banco fortes
- [ ] Nenhum secret commitado no Git

---

## 📊 MONITORAMENTO (Opcional)

### UptimeRobot
- [ ] Criar conta em [uptimerobot.com](https://uptimerobot.com)
- [ ] Adicionar monitor HTTP(S)
- [ ] URL: `https://backend.railway.app/api/v1/health`
- [ ] Interval: 5 minutos
- [ ] Configurar alertas por email

### Sentry (Error Tracking)
- [ ] Criar conta em [sentry.io](https://sentry.io)
- [ ] Criar projeto Node.js
- [ ] Copiar DSN
- [ ] Adicionar `SENTRY_DSN` nas variáveis de ambiente do Railway
- [ ] Redeploy

---

## 🎯 OTIMIZAÇÕES PÓS-DEPLOY

### Performance
- [ ] Ativar Redis cache (opcional, Railway oferece Redis addon)
- [ ] Configurar CDN para assets do frontend (Vercel já faz isso)
- [ ] Ativar compressão gzip (backend já tem via Helmet)

### SEO
- [ ] Configurar meta tags no frontend
- [ ] Adicionar sitemap.xml
- [ ] Configurar robots.txt
- [ ] Adicionar Google Analytics

### Domínio Personalizado
- [ ] Comprar domínio (Namecheap, GoDaddy, etc.)
- [ ] Configurar DNS:
  - Frontend: CNAME para Vercel
  - Backend: CNAME para Railway
- [ ] Adicionar domínio nos painéis Vercel e Railway
- [ ] Aguardar propagação DNS (até 48h)
- [ ] Atualizar `FRONTEND_URL` e `VITE_API_URL`

---

## 🚨 TROUBLESHOOTING RÁPIDO

### "Cannot connect to database"
- Verifique se PostgreSQL está running no Railway
- Confirme DATABASE_SSL=true
- Aguarde 30s após criar banco

### "CORS error"
- Verifique `FRONTEND_URL` no backend
- Use `https://` (não `http://`)
- Não adicione `/` no final
- Redeploy do backend após alterar

### "Invalid JWT token"
- Verifique se secrets têm 64 caracteres
- Confirme que são diferentes
- Faça logout/login novamente

### "Build failed"
- Veja logs do deploy
- Teste `npm run build` localmente
- Confirme que dependências estão corretas

### "503 Service Unavailable"
- Aguarde 2-3 minutos (primeira inicialização)
- Verifique logs da aplicação
- Confirme PORT=3001

---

## ✨ DEPLOY CONCLUÍDO!

Se todos os itens acima estão marcados, seu deploy está completo! 🎉

**URLs Importantes**:
- Frontend: `https://pathfinder.vercel.app`
- Backend: `https://pathfinder-backend.up.railway.app`
- Swagger: `https://pathfinder-backend.up.railway.app/api/v1/docs`
- Health: `https://pathfinder-backend.up.railway.app/api/v1/health`

**Próximos Passos**:
1. Configurar domínio personalizado (opcional)
2. Adicionar monitoramento (UptimeRobot, Sentry)
3. Configurar backups do banco
4. Implementar CI/CD (já automático via Git!)

---

_Checklist criado no Sprint 5 - Fase 6: Deploy_
