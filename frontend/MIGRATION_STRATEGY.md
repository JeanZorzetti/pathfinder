# 🔄 Estratégia de Migração: Supabase → Backend API

## 📋 Status da Migração

### ✅ Fase 1: Infraestrutura (COMPLETO)
- [x] API Client criado (`src/lib/api.ts`)
- [x] Hooks React criados (`src/hooks/useAPI.ts`)
- [x] Documentação (`API_INTEGRATION.md`)
- [x] Variáveis de ambiente configuradas

### 🚧 Fase 2: Migração de Componentes (EM ANDAMENTO)

#### ✅ Concluído:
1. **`src/hooks/useXP.ts`** - Hook deprecado com nota de migração
   - Removido import não utilizado do Dashboard.tsx
   - Hook marcado como `@deprecated` com instruções de migração
   - Substituído por `useProgress` do `useAPI.ts`

2. **`src/pages/Journal.tsx`** - Migrado completamente para API
   - ✅ Substituído `loadEntries` por `useJournal().getEntries()`
   - ✅ Substituído create/update por `useJournal().createEntry()` / `updateEntry()`
   - ✅ Substituído delete por `useJournal().deleteEntry()`
   - ✅ Auth permanece no Supabase (conforme estratégia)
   - ✅ Adicionado tratamento de erro da API
   - ✅ Toast de "+10 XP" ao criar entrada

3. **`src/pages/Dashboard.tsx`** - Migração parcial (operações API integradas)
   - ✅ Adicionados hooks `useDashboard()`, `useChallenges()`, `useComparison()`
   - ✅ `handleMarkChallengeComplete()` migrado para `completeDay()` API
   - ✅ Comparison code usando `useComparison().getCode()`
   - ⚠️ Profile/test_results ainda no Supabase (aguardando backend)
   - ⚠️ Daily insights ainda no Supabase (aguardando backend)
   - ⚠️ Achievements ainda no Supabase (aguardando backend)

#### Arquivos com Supabase Identificados:
1. `src/pages/Dashboard.tsx` - **PRINCIPAL** (674 linhas)
2. `src/pages/Journal.tsx`
3. `src/pages/Auth.tsx`
4. `src/hooks/useXP.ts`
5. `src/pages/EnneagramTest.tsx`
6. `src/pages/BigFiveTest.tsx`
7. `src/pages/Index.tsx`

---

## 🎯 Plano de Migração

### **Prioridade 1: Dashboard (Complexo)**

O Dashboard é o arquivo mais crítico com ~674 linhas e múltiplas integrações.

**Operações Supabase Atuais:**
1. **Auth** - `supabase.auth.onAuthStateChange()`, `supabase.auth.getSession()`
2. **Profile** - Load/Update profile data
3. **Streak** - Calcular e atualizar streaks
4. **XP** - Gerenciar XP e level
5. **Challenges** - Load/Update desafios semanais
6. **Achievements** - Carregar conquistas
7. **Comparison** - Gerar/carregar código de comparação
8. **Content** - Marcar conteúdo como consumido

**Estratégia de Refatoração:**

```typescript
// ❌ ANTES: Múltiplas chamadas Supabase espalhadas
const { data: profileData } = await supabase
  .from("profiles")
  .select("*")
  .eq("id", userId)
  .single();

// ✅ DEPOIS: Um único hook que gerencia tudo
import { useDashboard, useChallenges } from '@/hooks/useAPI';

function Dashboard() {
  const { dashboard, loading, error, refetch } = useDashboard();
  const { challenge, completeDay } = useChallenges();

  // Auto-carrega dados ao montar
  // Estados loading/error gerenciados automaticamente
}
```

**Mapeamento de Funcionalidades:**

| Operação Atual (Supabase) | Nova Implementação (API) |
|----------------------------|--------------------------|
| Load profile data | `useDashboard()` ou `useDashboardStats()` |
| Update XP | `useProgress().addXP(source, amount)` |
| Load current challenge | `useChallenges()` (auto-fetch) |
| Complete challenge day | `useChallenges().completeDay(dayIndex)` |
| Mark content consumed | `useProgress().addXP('content_consumed', 5)` |
| Get comparison code | `useComparison().getCode()` |

---

### **Prioridade 2: Journal (Médio)**

**Operações Atuais:**
- Criar entradas de diário
- Listar entradas
- Calcular streaks

**Nova Implementação:**
```typescript
import { useJournal } from '@/hooks/useAPI';

function Journal() {
  const {
    entries,
    loading,
    createEntry,
    getEntries,
    getDailyPrompt
  } = useJournal();

  // Obter prompt do dia
  useEffect(() => {
    const loadPrompt = async () => {
      const prompt = await getDailyPrompt(userMbtiType);
      setDailyPrompt(prompt);
    };
    loadPrompt();
  }, [userMbtiType]);

  // Criar entrada
  const handleSubmit = async (content: string) => {
    await createEntry(content, mood, tags);
    toast.success('Entrada criada! +10 XP');
  };

  // Listar entradas
  useEffect(() => {
    getEntries(1, 20);
  }, []);
}
```

---

### **Prioridade 3: Auth (Crítico)**

**Nota:** Autenticação permanece no Supabase Auth por enquanto.
Apenas as operações de perfil serão migradas para o backend.

**O que manter:**
- ✅ `supabase.auth.signIn()`
- ✅ `supabase.auth.signUp()`
- ✅ `supabase.auth.signOut()`
- ✅ `supabase.auth.onAuthStateChange()`

**O que migrar:**
- Profile creation/update → Backend API

---

### **Prioridade 4: useXP Hook (Simples)**

Substituir completamente por `useProgress()`.

**Antes:**
```typescript
// src/hooks/useXP.ts
const addXP = async (userId: string, source: string, amount: number) => {
  const { data: profile } = await supabase
    .from('profiles')
    .select('xp, level')
    .eq('id', userId)
    .single();

  const newXP = (profile.xp || 0) + amount;
  await supabase
    .from('profiles')
    .update({ xp: newXP })
    .eq('id', userId);
};
```

**Depois:**
```typescript
import { useProgress } from '@/hooks/useAPI';

const { addXP, loading, error } = useProgress();
await addXP('test_completed', 100);
```

---

## 🔧 Refatoração Passo a Passo

### Exemplo: Migrar Dashboard.tsx

#### **Passo 1: Adicionar Imports**
```typescript
// Adicionar no topo do arquivo
import { useDashboard, useChallenges, useComparison } from '@/hooks/useAPI';
```

#### **Passo 2: Substituir Estados Locais por Hooks**
```typescript
// ❌ REMOVER
const [profile, setProfile] = useState<Profile | null>(null);
const [loading, setLoading] = useState(true);
const [currentChallenge, setCurrentChallenge] = useState<WeeklyChallenge | null>(null);

// ✅ ADICIONAR
const { dashboard, loading: dashLoading, refetch: refetchDashboard } = useDashboard();
const { challenge, completeDay, loading: challengeLoading } = useChallenges();
const { getCode } = useComparison();
```

#### **Passo 3: Remover loadDashboardData()**
```typescript
// ❌ REMOVER toda a função loadDashboardData()
// Não é mais necessária - hooks carregam automaticamente
```

#### **Passo 4: Atualizar Handlers**
```typescript
// ✅ ANTES
const handleMarkChallengeComplete = async () => {
  // 50+ linhas de código Supabase
  const updatedDays = [...currentChallenge.daysCompleted];
  updatedDays[todayIndex] = true;
  await supabase.from("profiles").update(...);
};

// ✅ DEPOIS
const handleMarkChallengeComplete = async () => {
  const todayIndex = getCurrentWeekdayIndex();
  if (todayIndex === null) {
    toast.error("Desafios só podem ser marcados de segunda a sexta");
    return;
  }

  await completeDay(todayIndex);
  // Hook automaticamente atualiza o estado do challenge
  toast.success("Dia marcado como completo!");
};
```

#### **Passo 5: Atualizar JSX**
```typescript
// ✅ ANTES
{profile && (
  <JourneyCard
    xp={profile.xp || 0}
    achievements={achievements}
  />
)}

// ✅ DEPOIS
{dashboard?.stats && (
  <JourneyCard
    xp={dashboard.stats.xp}
    achievements={dashboard.achievements}
  />
)}
```

---

## 🧪 Testes Após Migração

### Checklist por Componente:

#### Dashboard
- [ ] Load inicial carrega dados corretamente
- [ ] Completar dia do desafio funciona
- [ ] XP é atualizado quando ações são completadas
- [ ] Streak é calculado corretamente
- [ ] Comparison code é gerado/recuperado
- [ ] Estados de loading/error aparecem corretamente

#### Journal
- [ ] Prompt diário carrega baseado no MBTI
- [ ] Criar entrada funciona (+10 XP)
- [ ] Listar entradas mostra resultados paginados
- [ ] Editar/deletar entrada funciona
- [ ] Stats (streak, total) são calculados corretamente

#### Challenges
- [ ] Desafio semanal carrega automaticamente
- [ ] Completar dia marca o checkbox
- [ ] Completar desafio (5 dias) dá +50 XP
- [ ] Novo desafio é criado na segunda-feira

---

## 🎯 Benefícios da Migração

### Performance
- ✅ Menos chamadas de rede (backend agrega dados)
- ✅ Validação centralizada
- ✅ Cálculos pesados no backend (ex: streaks)

### Manutenibilidade
- ✅ Lógica de negócio no backend
- ✅ Frontend mais simples (só apresentação)
- ✅ Menos duplicação de código

### Segurança
- ✅ Regras de negócio no backend (não podem ser bypassadas)
- ✅ Validação de dados centralizada
- ✅ Rate limiting no backend

---

## 📊 Progresso

| Componente | Status | Prioridade | Esforço |
|------------|--------|------------|---------|
| API Client | ✅ Completo | - | - |
| Hooks React | ✅ Completo | - | - |
| useXP | ✅ Completo | Média | Baixo |
| Journal | ✅ Completo | Alta | Médio |
| Dashboard | 🟡 Parcial | Alta | Alto |
| Auth | ⏳ Pendente | Média | Baixo |
| Tests | ⏳ Pendente | Alta | Médio |

**Legenda:** ✅ Completo | 🟡 Parcial | ⏳ Pendente

---

## 🚀 Próximos Passos Imediatos

1. **Criar branch de desenvolvimento**
   ```bash
   git checkout -b feat/api-integration
   ```

2. **Migrar useXP primeiro** (arquivo pequeno, impacto grande)
   - Substituir `useXP` por `useProgress` em todos os componentes

3. **Migrar Journal** (isolado, menos dependências)
   - Testar completamente antes de seguir

4. **Migrar Dashboard** (complexo, muitas dependências)
   - Fazer em etapas (stats → challenges → comparison)

5. **Testes E2E**
   - Criar testes para fluxos principais

6. **Deploy em staging**
   - Testar em ambiente próximo de produção

---

**Última atualização:** 2025-10-17
**Status:** Infraestrutura completa, iniciando migração de componentes
