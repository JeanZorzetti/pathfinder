# 🔌 API Integration Guide - Pathfinder Frontend

Este documento explica como usar a nova API do backend no frontend.

## 📚 Arquivos Criados

- **`src/lib/api.ts`** - Cliente da API com todos os métodos
- **`src/hooks/useAPI.ts`** - Hooks React para facilitar o uso
- **`.env`** - Configuração da URL da API

## 🚀 Como Usar

### 1. Importar o Cliente da API

```typescript
import { api } from '@/lib/api';
```

### 2. Usar os Métodos Diretamente

```typescript
// Exemplo: Adicionar XP
try {
  const result = await api.addXP('test_completed', 100);
  console.log(result);
} catch (error) {
  console.error('Erro ao adicionar XP:', error);
}
```

### 3. Usar os Hooks React (Recomendado)

```typescript
import { useProgress, useChallenges, useJournal, useComparison } from '@/hooks/useAPI';

function MyComponent() {
  const { addXP, getStats, loading, error } = useProgress();

  const handleAddXP = async () => {
    try {
      const result = await addXP('test_completed', 100);
      console.log('XP adicionado:', result);
    } catch (err) {
      console.error('Erro:', err);
    }
  };

  return (
    <div>
      {loading && <p>Carregando...</p>}
      {error && <p>Erro: {error}</p>}
      <button onClick={handleAddXP}>Adicionar XP</button>
    </div>
  );
}
```

## 📦 Hooks Disponíveis

### `useProgress()`
Gerencia XP, níveis e estatísticas de progresso.

**Métodos:**
- `addXP(source, amount)` - Adiciona XP ao usuário
- `getStats()` - Obtém estatísticas de progresso (level, XP total, etc.)
- `getHistory(limit?)` - Obtém histórico de transações de XP

**Estados:**
- `loading` - Boolean indicando se está carregando
- `error` - String com mensagem de erro (ou null)

**Exemplo:**
```typescript
const { addXP, getStats, loading, error } = useProgress();

// Adicionar XP quando completar teste
await addXP('test_completed', 100);

// Obter estatísticas
const stats = await getStats();
console.log(`Level: ${stats.level}, XP: ${stats.totalXP}`);
```

---

### `useDashboard()`
Carrega dados completos do dashboard (auto-fetch ao montar).

**Retorno:**
- `dashboard` - Objeto com dados do dashboard
- `loading` - Boolean indicando carregamento
- `error` - String com erro (ou null)
- `refetch()` - Função para recarregar dados

**Exemplo:**
```typescript
const { dashboard, loading, error, refetch } = useDashboard();

if (loading) return <Spinner />;
if (error) return <Error message={error} />;

return (
  <div>
    <h1>Level: {dashboard.stats.level}</h1>
    <p>XP: {dashboard.stats.xp}</p>
    <button onClick={refetch}>Atualizar</button>
  </div>
);
```

---

### `useDashboardStats()`
Carrega apenas estatísticas do dashboard (mais leve).

**Retorno:**
- `stats` - Objeto com estatísticas
- `loading` - Boolean
- `error` - String (ou null)
- `refetch()` - Recarregar

---

### `useChallenges()`
Gerencia desafios semanais (auto-fetch ao montar).

**Métodos:**
- `completeDay(day)` - Marca dia como completo (0-4 = Seg-Sex)
- `getHistory(limit?)` - Histórico de desafios completados
- `getStats()` - Estatísticas de desafios

**Retorno:**
- `challenge` - Desafio atual
- `loading` - Boolean
- `error` - String (ou null)
- `refetch()` - Recarregar desafio

**Exemplo:**
```typescript
const { challenge, completeDay, loading } = useChallenges();

const handleCompleteToday = async () => {
  const today = new Date().getDay(); // 0 = Domingo, 1 = Segunda
  const dayIndex = today === 0 ? null : today - 1; // Converter para 0-4

  if (dayIndex !== null) {
    await completeDay(dayIndex);
  }
};

return (
  <div>
    <h2>{challenge?.title}</h2>
    <p>{challenge?.description}</p>
    <button onClick={handleCompleteToday}>Completar Hoje</button>
  </div>
);
```

---

### `useJournal()`
Gerencia entradas de diário.

**Métodos:**
- `createEntry(content, mood?, tags?)` - Cria nova entrada (+10 XP)
- `getEntries(page?, limit?)` - Lista entradas (paginado)
- `updateEntry(id, content, mood?, tags?)` - Atualiza entrada
- `deleteEntry(id)` - Deleta entrada
- `getDailyPrompt(mbtiType?)` - Obtém prompt do dia
- `getStats()` - Estatísticas (total, streak, tags)

**Retorno:**
- `entries` - Array de entradas
- `loading` - Boolean
- `error` - String (ou null)

**Exemplo:**
```typescript
const { createEntry, getDailyPrompt, getEntries } = useJournal();

// Obter prompt do dia
const prompt = await getDailyPrompt('INTJ');
console.log(prompt.text);

// Criar entrada
await createEntry(
  'Hoje refleti sobre...',
  'feliz',
  ['reflexão', 'crescimento']
);

// Listar entradas
await getEntries(1, 20); // página 1, 20 por página
```

---

### `useComparison()`
Gerencia comparação de compatibilidade MBTI.

**Métodos:**
- `getCode()` - Obtém/gera código do usuário
- `compareWith(code)` - Compara com outro código
- `getHistory(limit?)` - Histórico de comparações
- `getStats()` - Estatísticas de compatibilidade

**Retorno:**
- `loading` - Boolean
- `error` - String (ou null)

**Exemplo:**
```typescript
const { getCode, compareWith } = useComparison();

// Obter meu código
const myCode = await getCode();
console.log(`Meu código: ${myCode.code}`); // Ex: "INTJ-A7K9M2"

// Comparar com outro usuário
const result = await compareWith('ENFP-X3M8P5');
console.log(`Compatibilidade: ${result.score}%`);
console.log(`Pontos fortes:`, result.strengths);
console.log(`Desafios:`, result.challenges);
console.log(`Dicas:`, result.communicationTips);
```

---

## 🔄 Migrando de Supabase para API

### Antes (Supabase direto):
```typescript
const { data, error } = await supabase
  .from('profiles')
  .update({ xp: newXP })
  .eq('id', userId);
```

### Depois (API):
```typescript
import { useProgress } from '@/hooks/useAPI';

const { addXP } = useProgress();
const result = await addXP('test_completed', 100);
```

---

## 🎯 Fontes de XP Disponíveis

```typescript
type XPSource =
  | 'test_completed'          // +100 XP - Completar teste de personalidade
  | 'journal_entry'           // +10 XP - Criar entrada no diário
  | 'challenge_day_completed' // +10 XP - Completar dia do desafio
  | 'challenge_completed'     // +50 XP - Completar desafio semanal
  | 'content_consumed'        // +5 XP - Consumir conteúdo
  | 'daily_login';            // +5 XP - Login diário
```

---

## 🌍 Configuração de Ambiente

### Desenvolvimento:
```env
VITE_API_URL=http://localhost:3001/api/v1
```

### Produção:
```env
VITE_API_URL=https://api.pathfinder.com.br/api/v1
```

---

## 🐛 Tratamento de Erros

Todos os hooks retornam um estado `error` com a mensagem de erro:

```typescript
const { addXP, error } = useProgress();

try {
  await addXP('test_completed', 100);
} catch (err) {
  // Erro já está em `error` state
  console.error('Falha ao adicionar XP:', error);
}
```

---

## 📊 Exemplo Completo: Dashboard

```typescript
import { useDashboard, useChallenges } from '@/hooks/useAPI';

function Dashboard() {
  const { dashboard, loading: dashLoading } = useDashboard();
  const { challenge, completeDay, loading: challengeLoading } = useChallenges();

  if (dashLoading || challengeLoading) {
    return <LoadingSpinner />;
  }

  const handleCompleteDay = async (day: number) => {
    await completeDay(day);
    // Challenge será automaticamente atualizado
  };

  return (
    <div>
      {/* Stats */}
      <section>
        <h2>Level {dashboard.stats.level}</h2>
        <p>XP: {dashboard.stats.xp} / {dashboard.stats.nextLevelXP}</p>
        <p>Streak: {dashboard.stats.streak.current} dias</p>
      </section>

      {/* Desafio Semanal */}
      <section>
        <h3>{challenge?.title}</h3>
        <p>{challenge?.description}</p>
        <div>
          {[0, 1, 2, 3, 4].map((day) => (
            <button
              key={day}
              onClick={() => handleCompleteDay(day)}
              disabled={challenge?.daysCompleted[day]}
            >
              {['Seg', 'Ter', 'Qua', 'Qui', 'Sex'][day]}
              {challenge?.daysCompleted[day] && ' ✓'}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
```

---

## ✅ Checklist de Integração

- [x] Cliente da API criado (`src/lib/api.ts`)
- [x] Hooks React criados (`src/hooks/useAPI.ts`)
- [x] Variável de ambiente configurada (`.env`)
- [ ] Substituir chamadas Supabase por API nos componentes
- [ ] Testar todos os fluxos
- [ ] Atualizar variável de ambiente para produção

---

## 🆘 Problemas Comuns

### Erro de CORS
**Problema:** `Access to fetch blocked by CORS policy`
**Solução:** Verificar se o backend está rodando e CORS está configurado

### Erro 404 Not Found
**Problema:** Endpoint não encontrado
**Solução:** Verificar se a URL da API está correta no `.env`

### Erro 401 Unauthorized
**Problema:** Usuário não autenticado (se endpoint requer auth)
**Solução:** Implementar autenticação JWT (próxima fase)

---

**Última atualização:** 2025-10-17
