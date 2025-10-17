# Roadmap Pathfinder: Evolução e Escalabilidade
## Próxima Fase - MVP para Produto Completo

> **Missão:** Transformar o Pathfinder de uma plataforma funcional em um produto robusto, escalável e monetizável, com foco em growth, retenção e experiência do usuário de classe mundial.

---

## 📊 Estado Atual (Conquistas)

### ✅ Dashboard Core - COMPLETO
- Hero personalizada com streak e MBTI
- ProfileCard com dados completos
- Sistema de cálculo de streak
- Daily Insights dinâmicos

### ✅ Gamificação - COMPLETO
- 5 níveis de progressão
- 20 conquistas (universais + por tipo)
- Sistema de XP
- Journey Card com visualização

### ✅ Desafios + Diário - COMPLETO
- 160+ desafios semanais personalizados
- 480+ prompts de diário
- Tracking Segunda-Sexta
- Sistema de recompensas

### ✅ Conteúdo + Comparação - COMPLETO
- 40+ peças de conteúdo curado
- Sistema de recomendação
- Análise de compatibilidade MBTI
- Algoritmo de match

---

## 🎯 Visão da Próxima Fase

### Pilares Estratégicos:

1. **Backend Real & APIs** - Migrar de Supabase client-side para backend próprio
2. **Monetização** - Implementar sistema de assinaturas e premium features
3. **Social & Community** - Criar features sociais para aumentar viral loop
4. **Analytics & Growth** - Tracking completo e otimização baseada em dados
5. **Mobile-First** - PWA otimizado e potencial app nativo
6. **Content Expansion** - Eneagrama e Big Five completos
7. **AI Integration** - Personalização inteligente com IA

---

## 🚀 Roadmap: 6 Sprints

---

## Sprint 5: Backend Real & Infraestrutura (2-3 semanas)

### 🎯 Objetivo
Criar backend robusto com Node.js/Express, migrando lógica do frontend para APIs seguras e escaláveis.

### Funcionalidades

#### 1. **API REST Completa**
- [ ] Setup Express + TypeScript
- [ ] Middleware de autenticação (JWT)
- [ ] Rate limiting e segurança
- [ ] Validação com Zod
- [ ] Error handling centralizado
- [ ] Logging (Winston/Pino)

**Endpoints Prioritários:**
```typescript
// Auth
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/refresh
POST   /api/v1/auth/logout

// User & Profile
GET    /api/v1/users/me
PATCH  /api/v1/users/me
GET    /api/v1/users/me/profile
PATCH  /api/v1/users/me/profile

// Dashboard
GET    /api/v1/dashboard
GET    /api/v1/dashboard/insights/daily
GET    /api/v1/dashboard/challenges/current
POST   /api/v1/dashboard/challenges/complete

// Gamification
POST   /api/v1/progress/xp
GET    /api/v1/progress/achievements
POST   /api/v1/progress/achievements/:id/unlock

// Content
GET    /api/v1/content/recommended
POST   /api/v1/content/:id/consume
GET    /api/v1/content/history

// Comparison
GET    /api/v1/comparison/code
POST   /api/v1/comparison/compare
GET    /api/v1/comparison/history

// Journal
GET    /api/v1/journal/entries
POST   /api/v1/journal/entries
GET    /api/v1/journal/prompts/daily
```

#### 2. **Database Optimization**
- [ ] Supabase com Row Level Security (RLS)
- [ ] Índices otimizados
- [ ] Migrations versionadas (SQL)
- [ ] Seeds para desenvolvimento
- [ ] Backup automático

**Tabelas Novas:**
```sql
-- XP Transactions (auditoria)
CREATE TABLE xp_transactions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  source VARCHAR(50), -- 'test_completed', 'challenge_completed', etc
  amount INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Content Consumption
CREATE TABLE content_consumed (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  content_id VARCHAR(100),
  consumed_at TIMESTAMP DEFAULT NOW(),
  time_spent INTEGER -- seconds
);

-- Comparison History
CREATE TABLE comparisons (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES profiles(id),
  compared_code VARCHAR(20),
  compatibility_score INTEGER,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### 3. **Caching Layer**
- [ ] Redis para sessões
- [ ] Cache de insights diários
- [ ] Cache de conteúdo recomendado
- [ ] Invalidação inteligente

#### 4. **Testing**
- [ ] Jest configurado
- [ ] Testes de integração (APIs)
- [ ] Testes E2E (Playwright)
- [ ] Coverage > 70%

### Entregáveis
- ✅ Backend rodando em produção (Vercel/Railway/Fly.io)
- ✅ Frontend consumindo APIs
- ✅ Autenticação JWT funcionando
- ✅ 20+ endpoints documentados (Swagger/OpenAPI)

---

## Sprint 6: Monetização & Premium (2 semanas)

### 🎯 Objetivo
Implementar sistema de assinaturas com Stripe, features premium e página de pricing.

### Funcionalidades

#### 1. **Stripe Integration**
- [ ] Stripe checkout sessions
- [ ] Webhook handling (subscription events)
- [ ] Portal do cliente (manage subscription)
- [ ] Invoices e billing history

**Planos:**
```typescript
const PLANS = {
  free: {
    name: 'Gratuito',
    price: 0,
    features: [
      'Teste MBTI completo',
      'Dashboard personalizado',
      'Insights diários limitados',
      '1 desafio por mês',
      'Diário com prompts básicos'
    ]
  },
  pro: {
    name: 'Pro',
    price: 19.90, // mensal
    features: [
      'Todos os testes (MBTI, Eneagrama, Big Five)',
      'Insights diários ilimitados',
      'Desafios semanais personalizados',
      'Diário com análise de padrões (IA)',
      'Conteúdo premium exclusivo',
      'Relatórios mensais em PDF',
      'Comparações ilimitadas',
      'Sem anúncios'
    ]
  },
  premium: {
    name: 'Premium',
    price: 49.90, // mensal
    features: [
      'Tudo do Pro',
      'Coaching 1-on-1 (1 sessão/mês)',
      'Análise de compatibilidade avançada',
      'Acesso antecipado a novos testes',
      'Comunidade exclusiva',
      'Workshop mensal ao vivo',
      'API access para integrações'
    ]
  }
};
```

#### 2. **Pricing Page**
- [ ] Design atrativo com comparação
- [ ] FAQs sobre assinaturas
- [ ] Calculadora de ROI emocional
- [ ] Depoimentos de usuários
- [ ] Trial de 7 dias (Pro)

#### 3. **Paywall System**
- [ ] Middleware para verificar subscription
- [ ] Lock de features premium
- [ ] Upgrade prompts estratégicos
- [ ] Analytics de conversão

**Features Premium:**
- ✅ Eneagrama completo
- ✅ Big Five completo
- ✅ Conteúdo exclusivo (artigos, vídeos)
- ✅ Relatórios mensais PDF
- ✅ Análise de padrões no diário (IA)
- ✅ Comparações ilimitadas
- ✅ Desafios semanais múltiplos

#### 4. **Admin Dashboard**
- [ ] Métricas de MRR (Monthly Recurring Revenue)
- [ ] Churn rate
- [ ] LTV (Lifetime Value)
- [ ] Trial to paid conversion
- [ ] Painel de cupons de desconto

### Entregáveis
- ✅ Stripe funcionando em produção
- ✅ Página de pricing publicada
- ✅ 3 planos ativos (Free, Pro, Premium)
- ✅ Paywall implementado em 5+ features

---

## Sprint 7: Social & Community (2 semanas)

### 🎯 Objetivo
Criar features sociais para aumentar engajamento, retenção e viral loop.

### Funcionalidades

#### 1. **Perfil Público**
- [ ] URL personalizada: pathfinder.com/@username
- [ ] Exibir tipo MBTI e conquistas
- [ ] Bio personalizada
- [ ] Link de compartilhamento
- [ ] Privacy settings (público/privado)

#### 2. **Sistema de Seguidores**
- [ ] Follow/Unfollow usuários
- [ ] Feed de atividades
- [ ] Notificações de conquistas
- [ ] Recomendação de pessoas similares

#### 3. **Grupos por Tipo**
- [ ] 16 grupos (um por tipo MBTI)
- [ ] Discussões e perguntas
- [ ] Posts com curtidas e comentários
- [ ] Moderação automática (IA)
- [ ] Regras da comunidade

**Exemplo:**
```
Grupo: ESTJs - Os Executivos
- 2.4k membros
- Tópicos: Liderança, Delegação, Gestão de Equipes
- Moderadores: 3
- Postagens por dia: ~20
```

#### 4. **Leaderboards**
- [ ] Top 10 por XP global
- [ ] Top 10 por tipo
- [ ] Top 10 streaks
- [ ] Badges especiais (Top 1%, etc)

#### 5. **Referral Program**
- [ ] Link de indicação único
- [ ] Recompensas: +50 XP + 1 mês Pro grátis
- [ ] Dashboard de referrals
- [ ] Tracking de conversões

#### 6. **Shared Results**
- [ ] Gerar card visual do resultado
- [ ] Compartilhar no Instagram/Twitter
- [ ] Link direto com preview (OG tags)
- [ ] Analytics de shares

### Entregáveis
- ✅ Perfis públicos funcionando
- ✅ Sistema de follow implementado
- ✅ 16 grupos criados e ativos
- ✅ Leaderboard global funcionando
- ✅ Referral program ativo

---

## Sprint 8: Analytics & Growth (1-2 semanas)

### 🎯 Objetivo
Implementar tracking completo, A/B testing e otimização baseada em dados.

### Funcionalidades

#### 1. **Analytics Completo**
- [ ] Google Analytics 4
- [ ] Mixpanel (event tracking)
- [ ] Hotjar (heatmaps, recordings)
- [ ] PostHog (self-hosted alternativa)

**Eventos Principais:**
```typescript
const EVENTS = {
  // Auth
  'user_signup': { provider: 'email' | 'google' },
  'user_login': { provider: 'email' | 'google' },

  // Tests
  'test_started': { type: 'mbti' | 'enneagram' | 'bigfive' },
  'test_completed': { type, time_taken, result },

  // Dashboard
  'dashboard_viewed': {},
  'insight_read': { category },
  'challenge_marked': { day, completed },
  'content_consumed': { type, content_id },

  // Gamification
  'xp_gained': { source, amount },
  'level_up': { old_level, new_level },
  'achievement_unlocked': { achievement_id },

  // Social
  'user_followed': { target_user_id },
  'post_created': { group },
  'result_shared': { platform },

  // Monetization
  'pricing_viewed': {},
  'checkout_started': { plan },
  'subscription_created': { plan },
  'subscription_cancelled': { plan, reason },
};
```

#### 2. **A/B Testing Framework**
- [ ] Feature flags (LaunchDarkly/Flagsmith)
- [ ] Variant testing
- [ ] Statistical significance calculator
- [ ] Winner determination automática

**Testes Prioritários:**
```typescript
const AB_TESTS = [
  {
    name: 'pricing_tiers',
    variants: ['2_tiers', '3_tiers'],
    metric: 'conversion_rate'
  },
  {
    name: 'onboarding_flow',
    variants: ['short', 'long_with_quiz'],
    metric: 'completion_rate'
  },
  {
    name: 'challenge_card_design',
    variants: ['minimal', 'detailed'],
    metric: 'engagement_rate'
  }
];
```

#### 3. **Funnels de Conversão**
- [ ] Sign up funnel
- [ ] Test completion funnel
- [ ] Free to paid funnel
- [ ] Referral funnel

#### 4. **Cohort Analysis**
- [ ] Retention por cohort semanal
- [ ] Engagement por origem (organic, paid, referral)
- [ ] LTV por cohort

#### 5. **Alertas e Monitoring**
- [ ] Sentry (error tracking)
- [ ] Uptime monitoring (UptimeRobot)
- [ ] Performance monitoring (Web Vitals)
- [ ] Alertas de métricas críticas (Slack/Email)

### Entregáveis
- ✅ GA4 e Mixpanel configurados
- ✅ 30+ eventos sendo trackeados
- ✅ 3 A/B tests rodando
- ✅ Dashboards de métricas (Metabase/Redash)
- ✅ Alertas configurados

---

## Sprint 9: Mobile PWA & Performance (2 semanas)

### 🎯 Objetivo
Otimizar experiência mobile e transformar em PWA installable de alta performance.

### Funcionalidades

#### 1. **PWA Setup**
- [ ] Manifest.json configurado
- [ ] Service Worker (offline support)
- [ ] Install prompt customizado
- [ ] Push notifications (OneSignal/Firebase)
- [ ] Icons para todas as plataformas

#### 2. **Performance Optimization**
- [ ] Code splitting agressivo
- [ ] Lazy loading de componentes
- [ ] Image optimization (next/image alternativas)
- [ ] Font loading otimizado
- [ ] Bundle size < 300kb gzip

**Métricas Alvo:**
```
Lighthouse Score:
- Performance: > 90
- Accessibility: > 95
- Best Practices: > 95
- SEO: > 95

Core Web Vitals:
- LCP: < 2.5s
- FID: < 100ms
- CLS: < 0.1
```

#### 3. **Mobile-Specific Features**
- [ ] Bottom navigation nativa
- [ ] Swipe gestures
- [ ] Pull to refresh
- [ ] Haptic feedback
- [ ] Camera access (upload de foto de perfil)

#### 4. **Offline Mode**
- [ ] Cache de insights diários
- [ ] Cache de desafios
- [ ] Sync quando online
- [ ] Status indicator

#### 5. **Push Notifications**
- [ ] Daily reminder (9am)
- [ ] Challenge reminder (6pm)
- [ ] Streak about to break (11pm)
- [ ] New achievement unlocked
- [ ] Friend activity

### Entregáveis
- ✅ PWA installable funcionando
- ✅ Lighthouse score > 90 em todas as métricas
- ✅ Push notifications configuradas
- ✅ Offline mode básico funcionando

---

## Sprint 10: Content Expansion (2-3 semanas)

### 🎯 Objetivo
Completar Eneagrama e Big Five, expandir biblioteca de conteúdo.

### Funcionalidades

#### 1. **Eneagrama Completo**
- [ ] 9 tipos com descrições completas
- [ ] 50 questões validadas
- [ ] Lógica de cálculo precisa
- [ ] Resultado page rica
- [ ] Integração com dashboard

**Estrutura:**
```typescript
const ENNEAGRAM_TYPES = [
  {
    number: 1,
    name: 'O Perfeccionista',
    core_fear: 'Ser corrupto/mal',
    core_desire: 'Ser bom/íntegro',
    key_motivation: 'Melhorar o mundo',
    levels: [1, 2, 3, 4, 5, 6, 7, 8, 9], // saúde
    wings: ['9w1', '1w2'],
    triads: 'Body/Gut',
    strengths: [...],
    weaknesses: [...],
    growth_path: {...},
    stress_path: {...}
  },
  // ... outros 8 tipos
];
```

#### 2. **Big Five Completo**
- [ ] 5 dimensões (OCEAN)
- [ ] 60 questões (12 por dimensão)
- [ ] Scoring de 0-100 por dimensão
- [ ] Gráfico de radar visual
- [ ] Comparação com média populacional

**Dimensões:**
- **O**penness: Abertura à experiência
- **C**onscientiousness: Conscienciosidade
- **E**xtraversion: Extroversão
- **A**greeableness: Amabilidade
- **N**euroticism: Neuroticismo

#### 3. **Biblioteca de Conteúdo Expandida**
- [ ] 100+ artigos curados
- [ ] 50+ vídeos do YouTube
- [ ] 30+ livros recomendados
- [ ] 20+ exercícios práticos
- [ ] Tags e categorização avançada

#### 4. **Blog/Resources Center**
- [ ] CMS (Contentful/Strapi)
- [ ] 20+ artigos próprios
- [ ] SEO otimizado
- [ ] Newsletter signup
- [ ] RSS feed

#### 5. **Workshops & Webinars**
- [ ] Calendário de eventos
- [ ] Registro e lembretes
- [ ] Zoom integration
- [ ] Replays para assinantes

### Entregáveis
- ✅ Eneagrama 100% funcional
- ✅ Big Five 100% funcional
- ✅ 100+ conteúdos na biblioteca
- ✅ Blog ativo com 20+ artigos
- ✅ 1 workshop/mês agendado

---

## 📊 KPIs e Métricas de Sucesso

### Crescimento (Growth)
- **MoM Growth:** +20% usuários/mês
- **Viral Coefficient:** > 0.3 (cada usuário traz 0.3 novos)
- **Organic Traffic:** 60% do total

### Engajamento
- **DAU/MAU Ratio:** > 25%
- **Session Duration:** > 8 minutos
- **Pages per Session:** > 4
- **Bounce Rate:** < 35%

### Retenção
- **D1 Retention:** > 60%
- **D7 Retention:** > 40%
- **D30 Retention:** > 30%
- **Churn Rate:** < 5%/mês

### Monetização
- **Free to Paid:** > 5%
- **MRR (Monthly Recurring Revenue):** R$ 10k em 6 meses
- **ARPU (Average Revenue Per User):** R$ 25
- **LTV/CAC Ratio:** > 3:1

### Qualidade
- **NPS (Net Promoter Score):** > 50
- **App Store Rating:** > 4.5 ⭐
- **CSAT (Customer Satisfaction):** > 85%

---

## 🛠️ Stack Tecnológico Recomendado

### Frontend (Já existente, manter)
- React + TypeScript
- Vite
- TailwindCSS + shadcn/ui
- React Router
- Supabase Client

### Backend (Novo)
```typescript
const BACKEND_STACK = {
  runtime: 'Node.js 20+',
  framework: 'Express.js + TypeScript',
  orm: 'Prisma / Drizzle',
  validation: 'Zod',
  auth: 'JWT + Refresh tokens',
  caching: 'Redis',
  queue: 'Bull / BullMQ',
  testing: 'Jest + Supertest',
  docs: 'Swagger / OpenAPI'
};
```

### Database
- Supabase (PostgreSQL)
- Redis (caching + sessions)
- S3 (storage de arquivos)

### DevOps & Infra
```yaml
hosting:
  frontend: Vercel / Netlify
  backend: Railway / Fly.io / Render
  database: Supabase

ci_cd:
  - GitHub Actions
  - Automated tests on PR
  - Auto-deploy on merge to main

monitoring:
  errors: Sentry
  performance: New Relic / DataDog
  uptime: UptimeRobot
  analytics: Mixpanel + GA4
```

### Payments & Monetization
- Stripe (subscriptions)
- Paddle (alternativa global)

### Communications
- Email: Resend / SendGrid
- Push: OneSignal / Firebase
- SMS: Twilio (opcional)

---

## 💰 Budget & Recursos Estimados

### Custos Mensais Projetados

| Serviço | Free Tier | Paid (1k users) | Paid (10k users) |
|---------|-----------|-----------------|------------------|
| **Supabase** | $0 | $25 | $100 |
| **Vercel** | $0 | $20 | $60 |
| **Railway** | $5 | $20 | $80 |
| **Redis (Upstash)** | $0 | $10 | $40 |
| **Stripe** | $0 | ~$30 (fees) | ~$300 (fees) |
| **Mixpanel** | $0 | $25 | $100 |
| **Sentry** | $0 | $26 | $80 |
| **OneSignal** | $0 | $0 | $99 |
| **SendGrid** | $0 | $15 | $60 |
| **S3/Storage** | $0 | $5 | $30 |
| **Total** | **$5** | **~$176** | **~$949** |

### Time Investment

| Sprint | Duração | Horas | Desenvolvedor(es) |
|--------|---------|-------|-------------------|
| Sprint 5 | 3 semanas | 120h | 1 Full-stack |
| Sprint 6 | 2 semanas | 80h | 1 Full-stack |
| Sprint 7 | 2 semanas | 80h | 1 Full-stack + 1 Frontend |
| Sprint 8 | 1 semana | 40h | 1 Full-stack |
| Sprint 9 | 2 semanas | 80h | 1 Frontend |
| Sprint 10 | 3 semanas | 120h | 1 Full-stack + 1 Content |
| **Total** | **13 semanas** | **520h** | **~3 meses** |

---

## 🎯 Milestones & Timeline

### Mês 1-2: Fundação Técnica
- ✅ Sprint 5: Backend & APIs
- ✅ Sprint 6: Monetização
- **Milestone:** Backend em produção + Stripe ativo

### Mês 2-3: Social & Growth
- ✅ Sprint 7: Social features
- ✅ Sprint 8: Analytics
- **Milestone:** 1.000 usuários ativos + MRR R$ 500

### Mês 3-4: Expansion
- ✅ Sprint 9: Mobile PWA
- ✅ Sprint 10: Content expansion
- **Milestone:** 5.000 usuários + MRR R$ 2.000

### Mês 4-6: Scaling
- Growth marketing
- Community building
- Partnerships (psicólogos, coaches)
- **Milestone:** 20.000 usuários + MRR R$ 10.000

---

## 🚦 Riscos & Mitigações

| Risco | Probabilidade | Impacto | Mitigação |
|-------|---------------|---------|-----------|
| **Baixa conversão Free→Paid** | Média | Alto | A/B test de pricing, trial de 14 dias, onboarding melhor |
| **Alto churn** | Média | Alto | Engagement features, notificações, social loop |
| **Problemas técnicos em prod** | Baixa | Alto | Testes extensivos, monitoring, staging environment |
| **Custos inesperados** | Média | Médio | Budget buffer 30%, otimização de queries |
| **Competição** | Alta | Médio | Diferenciação (gamificação + social), marketing de conteúdo |

---

## 📚 Recursos & Referências

### Inspiração (Produtos Similares)
- **16Personalities** - Referência em MBTI
- **Truity** - Testes de personalidade premium
- **Co-Star** - Social + Astrologia (modelo de negócio)
- **Duolingo** - Gamificação excepcional
- **Headspace** - Onboarding e retenção

### Livros Recomendados
- "Hooked" - Nir Eyal (product engagement)
- "Traction" - Gabriel Weinberg (growth channels)
- "The Mom Test" - Rob Fitzpatrick (customer development)
- "Subscribed" - Tien Tzuo (subscription business model)

### Ferramentas de Apoio
- **Figma** - Design colaborativo
- **Linear** - Project management
- **Notion** - Documentação
- **Loom** - Async communication

---

## 🎊 Conclusão

Este roadmap transforma o **Pathfinder** de uma aplicação funcional para um **produto completo e escalável**, pronto para:

1. ✅ **Monetizar** de forma sustentável
2. ✅ **Crescer** com marketing e viral loops
3. ✅ **Reter** usuários com features sociais e gamificação
4. ✅ **Escalar** tecnicamente sem gargalos
5. ✅ **Competir** com players estabelecidos

**Meta Ambiciosa:** 50.000 usuários e R$ 25.000 MRR em 12 meses! 🚀

---

**Pronto para transformar o Pathfinder em um negócio real?** 💎
