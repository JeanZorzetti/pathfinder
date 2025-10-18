# Guia de Migração do Dashboard - Supabase → API Backend

**Data:** 17/10/2025
**Status:** Em Progresso
**Objetivo:** Migrar todas as chamadas Supabase do Dashboard.tsx para usar API backend

---

## 📊 Endpoints Disponíveis na API

### 1. Perfil do Usuário

#### GET /api/v1/users/profile
Busca dados completos do perfil do usuário.

**Request:**
```typescript
GET /api/v1/users/profile
Headers: {
  'Authorization': 'Bearer {token}',
  'user-id': '{userId}'  // Fallback quando JWT não disponível
}
```

**Response:**
```typescript
{
  "success": true,
  "data": {
    "id": "uuid",
    "full_name": "string",
    "email": "string",
    "mbti_type": "string | null",
    "xp": "number",
    "level": "number",
    "streak_current": "number",
    "streak_longest": "number",
    "last_visit": "timestamp",
    "visit_history": "timestamp[]",
    "achievements": "Achievement[]",
    "comparison_code": "string | null",
    "consumed_content": "string[]",
    "completed_challenges": "string[]",
    "current_challenge": "WeeklyChallenge | null",
    "subscriptionStatus": "SubscriptionStatus",
    "created_at": "timestamp"
  }
}
```

---

#### PATCH /api/v1/users/profile
Atualiza dados do perfil do usuário.

**Request:**
```typescript
PATCH /api/v1/users/profile
Headers: {
  'Authorization': 'Bearer {token}',
  'Content-Type': 'application/json'
}
Body: {
  "full_name"?: "string",
  "mbti_type"?: "string",
  "streak_current"?: "number",
  "streak_longest"?: "number",
  "last_visit"?: "timestamp",
  "visit_history"?: "timestamp[]",
  "achievements"?: "Achievement[]",
  "comparison_code"?: "string",
  "consumed_content"?: "string[]",
  "current_challenge"?: "WeeklyChallenge"
}
```

**Response:**
```typescript
{
  "success": true,
  "data": User  // Same as GET response
}
```

---

### 2. Resultados de Testes

#### GET /api/v1/personality-tests/my-results
Busca todos os resultados de testes do usuário.

**Request:**
```typescript
GET /api/v1/personality-tests/my-results?framework=mbti  // framework é opcional
Headers: {
  'Authorization': 'Bearer {token}'
}
```

**Response:**
```typescript
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "test_type": "mbti" | "enneagram" | "bigfive",
      "status": "completed",
      "result_data": {
        "type": "INTJ",
        "dimensions": {...},
        // ... outros dados específicos do teste
      },
      "completed_at": "timestamp",
      "created_at": "timestamp"
    }
  ]
}
```

---

### 3. Daily Insights

#### GET /api/v1/dashboard/insights/daily
Busca o insight diário baseado no MBTI do usuário.

**Request:**
```typescript
GET /api/v1/dashboard/insights/daily
Headers: {
  'Authorization': 'Bearer {token}',
  'user-id': '{userId}'  // Fallback
}
```

**Response:**
```typescript
{
  "text": "string",
  "category": "string"
}
```

**Lógica:**
- Busca o MBTI type do usuário
- Busca insights da tabela `daily_insights` filtrados por `personality_type`
- Usa a data atual como seed para garantir o mesmo insight durante o dia
- Fallback para insights genéricos se não houver dados

**✅ Implementado:** Lógica completa com busca no banco `daily_insights`

---

### 4. Estatísticas do Usuário

#### GET /api/v1/dashboard/stats
Busca estatísticas gerais do usuário (XP, level, streak, etc).

**Request:**
```typescript
GET /api/v1/dashboard/stats
Headers: {
  'Authorization': 'Bearer {token}',
  'user-id': '{userId}'
}
```

**Response:**
```typescript
{
  "level": number,
  "xp": number,
  "streak": {
    "current": number,
    "longest": number
  },
  "tests_completed": number
}
```

**⚠️ Nota:** `tests_completed` ainda está mockado (retorna 0). Implementar integração com PersonalityTestsModule.

---

### 5. Dashboard Completo

#### GET /api/v1/dashboard
Busca dados agregados do dashboard (combina vários endpoints).

**Request:**
```typescript
GET /api/v1/dashboard
Headers: {
  'Authorization': 'Bearer {token}',
  'user-id': '{userId}'
}
```

**Response:**
```typescript
{
  "user": {
    "id": "string",
    "full_name": "string",
    "mbti_type": "string"
  },
  "stats": {
    "level": number,
    "xp": number,
    "streak": { "current": number, "longest": number },
    "tests_completed": number
  },
  "daily_insight": {
    "text": "string",
    "category": "string"
  },
  "current_challenge": WeeklyChallenge | null,
  "achievements": Achievement[],
  "recommended_content": Content[]
}
```

**⚠️ Nota:** Atualmente retorna dados mockados. Requer integração completa com todos os módulos.

---

## 🔄 Mapeamento de Migração

### Chamadas Supabase → Endpoints API

| # | Código Atual (Supabase) | Novo Endpoint API | Status |
|---|------------------------|-------------------|--------|
| 1 | `supabase.from("profiles").select().eq("id", userId)` | `GET /users/profile` | ✅ Pronto |
| 2 | `supabase.from("profiles").update({ streak_current, last_visit, ... })` | `PATCH /users/profile` | ✅ Pronto |
| 3 | `supabase.from("test_results").select().eq("user_id", userId)` | `GET /personality-tests/my-results` | ✅ Pronto |
| 4 | `supabase.from("daily_insights").select().eq("personality_type", mbti)` | `GET /dashboard/insights/daily` | ✅ Implementado |
| 5 | `supabase.from("profiles").update({ achievements })` | `PATCH /users/profile` | ✅ Pronto |
| 6 | `supabase.from("profiles").update({ current_challenge })` | `PATCH /users/profile` | ✅ Pronto |
| 7 | `supabase.from("profiles").update({ comparison_code })` | `PATCH /users/profile` | ✅ Pronto |
| 8 | `supabase.from("profiles").update({ consumed_content, xp })` | `PATCH /users/profile` + `POST /progress/xp` | 🟡 Revisar |
| 9 | `supabase.auth.signOut()` | **Mantém Supabase Auth** | ✅ Não migrar |

---

## 📝 Checklist de Migração

### Backend
- [x] ✅ Endpoint `GET /users/profile` implementado
- [x] ✅ Endpoint `PATCH /users/profile` implementado
- [x] ✅ Endpoint `GET /personality-tests/my-results` implementado
- [x] ✅ Endpoint `GET /dashboard/insights/daily` implementado com busca real
- [x] ✅ Entidade `DailyInsight` criada
- [x] ✅ DashboardModule atualizado com TypeORM repositories
- [ ] ⏳ Atualizar `UpdateUserDto` para incluir novos campos (streak, visit_history, etc)
- [ ] ⏳ Implementar `tests_completed` no DashboardService.getStats()

### Frontend
- [ ] ⏳ Adicionar métodos ao API client (`frontend/src/lib/api.ts`):
  - `getUserProfile()`
  - `updateUserProfile(data)`
  - `getMyTestResults(framework?)`
  - `getDailyInsight()`
- [ ] ⏳ Atualizar `Dashboard.tsx`:
  - Substituir `loadDashboardData()` por chamadas API
  - Remover queries Supabase diretas
  - Usar hooks `useAPI` para profile, test results, insights
- [ ] ⏳ Testar fluxo completo com dados reais

---

## 🚀 Próximos Passos

1. **Atualizar UpdateUserDto** para aceitar novos campos
2. **Adicionar métodos ao API client** no frontend
3. **Refatorar Dashboard.tsx** linha por linha:
   - Função `loadDashboardData()` → chamadas API
   - Função `handleMarkContentConsumed()` → usar `POST /progress/xp`
4. **Testar integração completa** com usuário real
5. **Validar que streak calculation funciona** corretamente
6. **Remover imports do supabase-client** do Dashboard.tsx

---

## 💡 Observações Importantes

### Auth Strategy
- **Supabase Auth permanece** para autenticação (login/signup/logout)
- Backend recebe `user-id` header ou valida JWT token
- Frontend continua usando `supabase.auth` para session management

### XP Management
- Usar `POST /progress/xp` para adicionar XP (ao invés de update direto no profile)
- XP é calculado automaticamente com cooldown anti-spam
- Level é calculado automaticamente baseado no XP total

### Streak Calculation
- Frontend envia `last_visit` e `visit_history` no PATCH /users/profile
- Backend pode (futuro) implementar lógica de streak automática
- Por enquanto, frontend calcula com `calculateStreak()` e envia resultado

### Comparison Code
- Geração automática no backend quando usuário chama `GET /comparison/code`
- Salvo automaticamente na tabela `users.comparison_code`
- Frontend pode ler de `GET /users/profile` ou `GET /comparison/code`

---

**Próxima Etapa:** Implementar métodos no API client e migrar Dashboard.tsx 🚀
