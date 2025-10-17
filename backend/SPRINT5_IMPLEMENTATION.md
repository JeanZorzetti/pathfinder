# Sprint 5: Backend Real & Infraestrutura - Guia de Implementação

> **Status:** Backend base já existe com NestJS! Precisamos expandir com novos módulos.

---

## ✅ O Que Já Existe

### Infraestrutura
- ✅ NestJS configurado
- ✅ TypeORM + PostgreSQL (Supabase)
- ✅ Swagger (OpenAPI docs)
- ✅ Helmet (security)
- ✅ Compression
- ✅ CORS configurado
- ✅ Validation Pipes
- ✅ Rate Limiting (@nestjs/throttler)

### Módulos Existentes
- ✅ `auth` - Autenticação JWT
- ✅ `users` - Gerenciamento de usuários
- ✅ `personality-tests` - Testes MBTI, etc
- ✅ `content` - Conteúdo SEO
- ✅ `health` - Health checks

---

## 🚀 O Que Precisa Ser Criado

### Novos Módulos Prioritários

#### 1. Dashboard Module (`/api/v1/dashboard`)
**Responsabilidade:** Agregar dados do dashboard do usuário

**Endpoints:**
```typescript
GET  /dashboard                    // Dashboard completo
GET  /dashboard/insights/daily     // Insight do dia
GET  /dashboard/stats              // Estatísticas (XP, level, streak)
```

**Arquivos:**
```
backend/src/modules/dashboard/
├── dashboard.module.ts
├── dashboard.controller.ts
├── dashboard.service.ts
├── dto/
│   └── dashboard-response.dto.ts
└── dashboard.controller.spec.ts
```

**DTO Example:**
```typescript
export class DashboardResponseDto {
  user: {
    id: string;
    full_name: string;
    mbti_type: string;
  };
  stats: {
    level: number;
    xp: number;
    streak: { current: number; longest: number };
    tests_completed: number;
  };
  daily_insight: {
    text: string;
    category: string;
  };
  current_challenge?: WeeklyChallengeDto;
  achievements: AchievementDto[];
  recommended_content: ContentDto[];
}
```

---

#### 2. Gamification Module (`/api/v1/progress`)
**Responsabilidade:** XP, níveis, conquistas

**Endpoints:**
```typescript
POST   /progress/xp                        // Adicionar XP
GET    /progress/achievements              // Listar conquistas
POST   /progress/achievements/:id/unlock   // Desbloquear conquista
PATCH  /progress/achievements/:id/progress // Atualizar progresso
GET    /progress/level                     // Calcular nível atual
GET    /progress/leaderboard               // Top usuários (Sprint 7)
```

**Arquivos:**
```
backend/src/modules/gamification/
├── gamification.module.ts
├── gamification.controller.ts
├── gamification.service.ts
├── entities/
│   ├── xp-transaction.entity.ts
│   └── achievement.entity.ts
├── dto/
│   ├── add-xp.dto.ts
│   ├── achievement.dto.ts
│   └── level-progress.dto.ts
└── constants/
    ├── xp-sources.ts
    └── levels.ts
```

**Entidades:**
```typescript
@Entity('xp_transactions')
export class XpTransaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  source: XpSource; // 'test_completed', 'challenge_completed', etc

  @Column()
  amount: number;

  @CreateDateColumn()
  created_at: Date;
}
```

---

#### 3. Challenges Module (`/api/v1/challenges`)
**Responsabilidade:** Desafios semanais

**Endpoints:**
```typescript
GET    /challenges/current           // Desafio atual do usuário
POST   /challenges/complete-day      // Marcar dia como completo
GET    /challenges/history           // Histórico de desafios
POST   /challenges/generate          // Gerar novo desafio (automático)
```

**Arquivos:**
```
backend/src/modules/challenges/
├── challenges.module.ts
├── challenges.controller.ts
├── challenges.service.ts
├── entities/
│   └── user-challenge.entity.ts
├── dto/
│   ├── current-challenge.dto.ts
│   ├── complete-day.dto.ts
│   └── challenge-template.dto.ts
└── data/
    └── weekly-challenges.data.ts  // 160+ desafios
```

**Lógica:**
```typescript
@Injectable()
export class ChallengesService {
  async getCurrentChallenge(userId: string): Promise<WeeklyChallenge> {
    // 1. Buscar desafio atual
    // 2. Se não existe ou semana passou, gerar novo
    // 3. Retornar com progresso (daysCompleted)
  }

  async completeDayChallenge(userId: string, day: number): Promise<void> {
    // 1. Validar dia da semana (0-4 = Seg-Sex)
    // 2. Atualizar daysCompleted[day] = true
    // 3. Se todos completos, dar +50 XP e badge
    // 4. Adicionar a completed_challenges
  }
}
```

---

#### 4. Journal Module (`/api/v1/journal`)
**Responsabilidade:** Diário de reflexões

**Endpoints:**
```typescript
GET    /journal/entries          // Listar entradas (paginado)
POST   /journal/entries          // Criar entrada (+10 XP)
GET    /journal/entries/:id      // Buscar entrada específica
PATCH  /journal/entries/:id      // Editar entrada
DELETE /journal/entries/:id      // Deletar entrada
GET    /journal/prompts/daily    // Prompt do dia baseado em MBTI
GET    /journal/stats            // Estatísticas (total, mês, temas)
```

**Arquivos:**
```
backend/src/modules/journal/
├── journal.module.ts
├── journal.controller.ts
├── journal.service.ts
├── entities/
│   └── journal-entry.entity.ts
├── dto/
│   ├── create-entry.dto.ts
│   ├── update-entry.dto.ts
│   └── journal-stats.dto.ts
└── data/
    └── journal-prompts.data.ts  // 480+ prompts
```

**Entidade:**
```typescript
@Entity('journal_entries')
export class JournalEntry {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column('text')
  content: string;

  @Column({ nullable: true })
  mood?: string;

  @Column({ nullable: true })
  tags?: string;  // JSON array

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

---

#### 5. Comparison Module (`/api/v1/comparison`)
**Responsabilidade:** Comparação de compatibilidade

**Endpoints:**
```typescript
GET    /comparison/code             // Obter código do usuário
POST   /comparison/compare           // Comparar com outro código
GET    /comparison/history           // Histórico de comparações
POST   /comparison/save-result       // Salvar resultado de comparação
```

**Arquivos:**
```
backend/src/modules/comparison/
├── comparison.module.ts
├── comparison.controller.ts
├── comparison.service.ts
├── entities/
│   └── comparison-history.entity.ts
├── dto/
│   ├── compare.dto.ts
│   └── compatibility-result.dto.ts
└── utils/
    ├── compatibility-algorithm.ts
    └── code-generator.ts
```

**Lógica do Algoritmo:**
```typescript
export class CompatibilityAlgorithm {
  static calculate(type1: string, type2: string): CompatibilityResult {
    // Algoritmo já existe no frontend, portar para backend
    const score = this.calculateScore(type1, type2);
    const strengths = this.getStrengths(type1, type2);
    const challenges = this.getChallenges(type1, type2);
    const tips = this.getCommunicationTips(type1, type2);

    return { score, strengths, challenges, tips };
  }
}
```

---

## 📊 Database Migrations

### Novas Tabelas Necessárias

```sql
-- XP Transactions (auditoria de XP)
CREATE TABLE xp_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  source VARCHAR(50) NOT NULL,
  amount INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_xp_transactions_user_id ON xp_transactions(user_id);
CREATE INDEX idx_xp_transactions_created_at ON xp_transactions(created_at);

-- User Challenges (desafios em andamento)
CREATE TABLE user_challenges (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  challenge_id VARCHAR(100) NOT NULL,
  week_start_date DATE NOT NULL,
  days_completed BOOLEAN[] DEFAULT ARRAY[false, false, false, false, false],
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_user_challenges_user_id ON user_challenges(user_id);
CREATE INDEX idx_user_challenges_week ON user_challenges(week_start_date);

-- Comparison History
CREATE TABLE comparison_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  compared_code VARCHAR(20) NOT NULL,
  compared_mbti VARCHAR(4) NOT NULL,
  compatibility_score INTEGER NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_comparison_history_user_id ON comparison_history(user_id);
CREATE INDEX idx_comparison_history_created_at ON comparison_history(created_at);

-- Content Consumed (tracking de conteúdo)
CREATE TABLE content_consumed (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content_id VARCHAR(100) NOT NULL,
  content_type VARCHAR(50) NOT NULL, -- 'article', 'video', 'book', 'exercise'
  consumed_at TIMESTAMP DEFAULT NOW(),
  time_spent INTEGER, -- segundos
  xp_awarded INTEGER DEFAULT 5
);

CREATE INDEX idx_content_consumed_user_id ON content_consumed(user_id);
CREATE INDEX idx_content_consumed_content_id ON content_consumed(content_id);

-- Atualizar profiles table (adicionar campos que faltam)
ALTER TABLE profiles
ADD COLUMN IF NOT EXISTS comparison_code VARCHAR(20) UNIQUE,
ADD COLUMN IF NOT EXISTS consumed_content TEXT[], -- array de IDs
ADD COLUMN IF NOT EXISTS completed_challenges TEXT[]; -- array de IDs
```

---

## 🔐 Auth & Guards

### JWT Strategy (já existe, revisar)
```typescript
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

### Rate Limiting (já existe com @nestjs/throttler)
```typescript
@UseGuards(ThrottleGuard)
@Throttle(10, 60) // 10 requests por 60 segundos
```

---

## 🧪 Testing Strategy

### Unit Tests
```typescript
// Exemplo: gamification.service.spec.ts
describe('GamificationService', () => {
  it('should add XP and update level', async () => {
    const result = await service.addXP(userId, 'test_completed', 100);
    expect(result.newLevel).toBe(2);
  });

  it('should unlock achievement when progress complete', async () => {
    const result = await service.updateAchievementProgress(userId, achievementId, 5, 5);
    expect(result.unlocked).toBe(true);
  });
});
```

### Integration Tests (E2E)
```typescript
// Exemplo: dashboard.e2e-spec.ts
describe('Dashboard (e2e)', () => {
  it('/dashboard (GET) - should return full dashboard', () => {
    return request(app.getHttpServer())
      .get('/api/v1/dashboard')
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .expect((res) => {
        expect(res.body).toHaveProperty('stats');
        expect(res.body).toHaveProperty('daily_insight');
      });
  });
});
```

---

## 📚 Swagger Documentation

### Decorators Example
```typescript
@ApiTags('gamification')
@ApiBearerAuth()
@Controller('progress')
export class GamificationController {
  @Post('xp')
  @ApiOperation({ summary: 'Add XP to user' })
  @ApiBody({ type: AddXpDto })
  @ApiResponse({ status: 200, description: 'XP added successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async addXP(@Body() dto: AddXpDto, @Req() req): Promise<XpResponse> {
    return this.gamificationService.addXP(req.user.id, dto);
  }
}
```

---

## 🚀 Próximos Passos

### Fase 1: Estrutura Base (1-2 dias)
- [x] Revisar estrutura existente
- [x] Criar GamificationModule completo (module, controller, service, DTOs, entities, constants)
- [x] Criar DashboardModule básico (module, controller, service, DTOs)
- [x] Integrar módulos no app.module.ts
- [x] Configurar Swagger tags
- [x] Build do backend compilando com sucesso

### Fase 2: Gamification (2-3 dias)
- [x] Implementar lógica de XP com cooldown anti-spam
- [x] Implementar lógica de níveis (5 níveis com cálculo automático)
- [x] Sistema de XP com múltiplas fontes (test_completed, journal_entry, etc.)
- [x] Endpoints: POST /progress/xp, GET /progress/xp/history, GET /progress/stats
- [ ] Implementar sistema de achievements
- [ ] Criar migration para xp_transactions table
- [ ] Testes unitários

### Fase 3: Dashboard & Challenges (2-3 dias)
- [x] Endpoint /dashboard funcionando (mockado)
- [x] Endpoint /dashboard/stats funcionando
- [x] Endpoint /dashboard/insights/daily funcionando
- [x] ChallengesModule completo implementado
- [x] Biblioteca de 40+ desafios personalizados por MBTI
- [x] Endpoints: GET /challenges/current, POST /challenges/complete-day, GET /challenges/history, GET /challenges/stats
- [x] Integração com gamification (+50 XP por desafio completo)
- [x] Sistema de streaks (semanas consecutivas)
- [ ] Criar migration para user_challenges table
- [ ] Testes E2E

### Fase 4: Journal & Comparison (2 dias)
- [ ] CRUD de journal entries
- [ ] Sistema de prompts diários
- [ ] Algoritmo de comparação
- [ ] Histórico de comparações

### Fase 5: Integration & Testing (2-3 dias)
- [ ] Integrar frontend com novo backend
- [ ] Testes E2E completos
- [ ] Performance testing
- [ ] Documentation review

### Fase 6: Deploy (1 dia)
- [ ] Deploy em Railway/Fly.io
- [ ] Configurar env vars
- [ ] Health checks
- [ ] Monitoring

---

## 📦 Comandos Úteis

```bash
# Desenvolvimento
npm run start:dev       # Modo watch
npm run build          # Build production
npm run test           # Run tests
npm run test:cov       # Coverage report

# Migrations
npm run migration:generate -- src/database/migrations/AddGamification
npm run migration:run
npm run migration:revert

# Database
npm run seed           # Seed data

# Linting
npm run lint           # ESLint
npm run format         # Prettier
```

---

## 🎯 Critérios de Sucesso

- ✅ 30+ endpoints documentados no Swagger
- ✅ Autenticação JWT funcionando
- ✅ Rate limiting configurado
- ✅ Validação com class-validator
- ✅ Error handling centralizado
- ✅ Logging estruturado
- ✅ Testes com >70% coverage
- ✅ Frontend consumindo backend (substituir Supabase client-side)
- ✅ Deploy em produção funcionando

---

## 🤝 Integração com Frontend

### Migrar de Supabase Client → API

**Antes (Frontend direto no Supabase):**
```typescript
const { data } = await supabase
  .from('profiles')
  .update({ xp: newXP })
  .eq('id', userId);
```

**Depois (Frontend → Backend API):**
```typescript
const response = await fetch(`${API_URL}/progress/xp`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({ source: 'test_completed', amount: 100 })
});
const data = await response.json();
```

### Criar API Client no Frontend
```typescript
// frontend/src/lib/api-client.ts
class PathfinderAPI {
  private baseUrl = import.meta.env.VITE_API_URL;

  async addXP(source: XPSource, amount: number) {
    return this.post('/progress/xp', { source, amount });
  }

  async getDashboard() {
    return this.get('/dashboard');
  }

  // ... outros métodos
}
```

---

**Este é um guia vivo. Atualizar conforme o desenvolvimento avança!** 🚀
