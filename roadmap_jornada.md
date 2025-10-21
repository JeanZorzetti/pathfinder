# 🎮 Roadmap: Jornada de Gamificação e Sistema de XP

## 📊 Status Atual: Sistema de XP Parcialmente Implementado

**Objetivo:** Ativar TODAS as fontes de XP e tornar a jornada de crescimento real e funcional.

---

## ✅ O Que Já Está Implementado

### Backend Infrastructure (100% ✅)
- [x] `GamificationService` com método `addXP()`
- [x] Tabela `xp_transactions` no banco
- [x] Cooldown anti-spam por fonte de XP
- [x] Cálculo automático de level baseado em XP
- [x] Sistema de achievements
- [x] Endpoint `/api/v1/gamification/xp/add`
- [x] Endpoint `/api/v1/gamification/xp/history`

### Frontend Infrastructure (100% ✅)
- [x] Hook `useGamification()`
- [x] Componente `JourneyCard` no Dashboard
- [x] Toast de "+X XP" quando recebe XP
- [x] Barra de progresso de nível
- [x] Display de conquistas

---

## ❌ O Que NÃO Está Funcionando (BUGS)

### ✅ Bug #1: Journal Entry (+10 XP) - CORRIGIDO
**Status:** ✅ RESOLVIDO (21/10/2025)
**Arquivo:** `backend/src/modules/journal/journal.controller.ts`
**Commits:** a28e430, bcb56bc, b149f57

**Problema:**
```typescript
// TODO: Adicionar +10 XP via GamificationService quando integrado
// await this.gamificationService.addXP(userId, { source: 'journal_entry', amount: 10 });
```

O código estava comentado! O XP não estava sendo adicionado.

**Solução Implementada:**
1. ✅ Injetado `GamificationService` no `JournalController`
2. ✅ Importado enum `XpSource`
3. ✅ Chamada `addXP(userId, { source: XpSource.JOURNAL_ENTRY, amount: 10 })`
4. ✅ Retorna XP real na resposta (newXP, newLevel, leveledUp)
5. ✅ Error handling gracioso - não bloqueia se XP falhar

**Resultado:** Usuários agora ganham +10 XP ao escrever no diário (cooldown 1x/dia)

**Impacto:** ALTO - Feature principal de engajamento funcionando

**Prioridade:** 🔥 P0 - ✅ COMPLETO

---

### ✅ Bug #2: Test Completion (variável) - CORRIGIDO
**Status:** ✅ RESOLVIDO (21/10/2025)
**Arquivo:** `backend/src/modules/personality-tests/personality-tests.service.ts`
**Commits:** 33b9c53

**Problema:**
```typescript
// submitAnswers() - linha ~165
// saveCalculatedResult() - linha ~248
// Ambos salvavam test result mas NÃO chamavam addXP()
```

Os métodos estavam salvando resultados mas não recompensando com XP!

**Solução Implementada:**
1. ✅ Injetado `GamificationService` no `PersonalityTestsService`
2. ✅ Importado enum `XpSource`
3. ✅ Adicionado `GamificationModule` ao `PersonalityTestsModule`
4. ✅ Chamada `addXP()` em **submitAnswers()** (linha 180-190)
   - Retorna XP info na resposta (xpAwarded, totalXp, level, leveledUp)
5. ✅ Chamada `addXP()` em **saveCalculatedResult()** (linha 277-286)
   - Suporta fluxo de teste anônimo → registro

**Código Implementado:**
```typescript
// Award +50 XP for completing test
let xpResult: Awaited<ReturnType<typeof this.gamificationService.addXP>> | null = null;
try {
  xpResult = await this.gamificationService.addXP(userId, {
    source: XpSource.TEST_COMPLETED,
    amount: 50,
    description: `Teste ${testResult.framework.code.toUpperCase()} completado`,
  });
} catch (error) {
  console.error('Error awarding XP for test completion:', error);
}

return {
  testResultId: testResult.id,
  personalityType: typeDetails,
  scores,
  completedAt: testResult.completedAt,
  xpAwarded: 50,
  totalXp: xpResult?.newXP,
  level: xpResult?.newLevel,
  leveledUp: xpResult?.leveledUp || false,
};
```

**XP Esperado:**
- MBTI completo: +50 XP ✅
- Eneagrama completo: +50 XP ✅
- Big Five completo: +50 XP ✅

**Resultado:** Usuários agora ganham +50 XP ao completar qualquer teste

**Impacto:** ALTO - Completar teste é ação principal

**Prioridade:** 🔥 P0 - ✅ COMPLETO

---

### 🐛 Bug #3: Challenge Day Completion (+20 XP) - STATUS DESCONHECIDO
**Status:** 🟡 VERIFICAR
**Arquivo:** `backend/src/modules/challenges/challenges.service.ts`

**XP Esperado:**
- Completar dia do desafio: +20 XP
- Completar desafio completo (5 dias): +100 XP bonus

**Solução Necessária:**
1. Verificar se `completeChallengeDay()` chama `addXP()`
2. Implementar bonus de conclusão do desafio completo
3. Testar fluxo completo

**Impacto:** MÉDIO - Desafios são feature de engajamento

**Prioridade:** 🟠 P1 - ALTA

---

### 🐛 Bug #4: Content Consumption (+15 XP) - STATUS DESCONHECIDO
**Status:** 🟡 VERIFICAR
**Arquivo:** Frontend - `Dashboard.tsx` linha ~162

**Código Atual:**
```typescript
// Add XP via API
await api.addXP('content_consumed', content.xpReward);
```

**Problema Potencial:**
Frontend está chamando, mas precisa verificar se backend aceita.

**Solução Necessária:**
1. Testar se `/gamification/xp/add` funciona
2. Verificar cooldown de conteúdo
3. Adicionar feedback visual

**Impacto:** MÉDIO - Incentiva consumo de conteúdo

**Prioridade:** 🟠 P1 - ALTA

---

### 🐛 Bug #5: Daily Login (+5 XP) - NÃO IMPLEMENTADO
**Status:** 🔴 NÃO EXISTE

**XP Esperado:**
- Primeiro login do dia: +5 XP
- Streak de 7 dias: +50 XP bonus
- Streak de 30 dias: +200 XP bonus

**Solução Necessária:**
1. Adicionar lógica no `AuthService` ou `DashboardService`
2. Verificar último login no metadata do usuário
3. Dar XP se for novo dia (baseado em timezone do usuário)
4. Atualizar streak

**Impacto:** ALTO - Incentiva retorno diário

**Prioridade:** 🔥 P0 - URGENTE

---

## 🚧 Funcionalidades Não Implementadas

### Feature #1: Share Result (+10 XP)
**Status:** 🔴 NÃO EXISTE
**Descrição:** Usuário compartilha resultado do teste nas redes sociais
**XP:** +10 XP (cooldown: 1x por dia)
**Implementação Necessária:**
- Botão de compartilhar na página de resultado
- Tracking de compartilhamento (postMessage ou URL com tracking)
- Endpoint para confirmar compartilhamento

**Prioridade:** 🟢 P2 - MÉDIA

---

### Feature #2: Complete Profile (+25 XP)
**Status:** 🔴 NÃO EXISTE
**Descrição:** Usuário preenche perfil completo (nome, foto, bio, etc)
**XP:** +25 XP (único)
**Implementação Necessária:**
- Página de perfil com campos editáveis
- Upload de foto de perfil
- Verificação de completude (% do perfil preenchido)
- Achievement "Perfil Completo"

**Prioridade:** 🟢 P2 - MÉDIA

---

### Feature #3: Invite Friend (+30 XP)
**Status:** 🔴 NÃO EXISTE
**Descrição:** Usuário convida amigo que cria conta
**XP:**
- Amigo se cadastra via link: +30 XP
- Amigo completa primeiro teste: +50 XP bonus

**Implementação Necessária:**
- Sistema de referral links únicos
- Tracking de cadastros via referral
- Tabela `referrals` no banco
- Dashboard de referrals

**Prioridade:** 🟠 P1 - ALTA (viral loop)

---

### Feature #4: Comment on Community (+5 XP)
**Status:** 🔴 NÃO EXISTE
**Descrição:** Usuário comenta em grupo/fórum do seu tipo MBTI
**XP:** +5 XP por comentário (max 3x/dia)
**Implementação Necessária:**
- Sistema de comentários
- Moderação automática (IA anti-spam)
- Grupos por tipo de personalidade

**Prioridade:** 🟡 P3 - BAIXA (Sprint 7 - Social)

---

## 📋 Checklist de Implementação

### Sprint Atual: Corrigir XP Existente (1-2 dias)

#### Dia 1: Bugs Críticos (P0)
- [x] **Bug #1:** Ativar XP no Journal Entry ✅
  - [x] Injetar GamificationService no JournalModule
  - [x] Chamar addXP() no create()
  - [x] Testar: criar entrada → verificar xp_transactions
  - [x] Commit: "fix(journal): Award +10 XP on entry creation"

- [x] **Bug #2:** Verificar/Ativar XP em Test Completion ✅
  - [x] Ler submitAnswers() e saveCalculatedResult()
  - [x] Adicionar chamada addXP() se não existir
  - [x] Testar: completar teste → verificar xp_transactions
  - [x] Commit: "feat(gamification): Award +50 XP for test completion"

- [ ] **Bug #5:** Implementar Daily Login XP
  - [ ] Adicionar lógica em DashboardService.getDashboard()
  - [ ] Verificar last_login no metadata
  - [ ] Dar +5 XP se novo dia
  - [ ] Testar: login → verificar XP
  - [ ] Commit: "feat(gamification): Award +5 XP on daily login"

#### Dia 2: Bugs Importantes (P1)
- [ ] **Bug #3:** Verificar Challenge Day XP
  - [ ] Ler completeChallengeDay()
  - [ ] Adicionar addXP() se necessário
  - [ ] Implementar bonus de desafio completo (+100 XP)
  - [ ] Testar fluxo completo
  - [ ] Commit: "fix(challenges): Award XP on challenge completion"

- [ ] **Bug #4:** Testar Content Consumption XP
  - [ ] Testar marcar conteúdo como consumido
  - [ ] Verificar se XP está sendo dado
  - [ ] Corrigir se necessário
  - [ ] Commit: "fix(content): Ensure XP is awarded on consumption"

### Sprint Futuro: Novas Features (Sprint 7-8)

#### Feature: Invite Friend System
- [ ] Criar tabela `referrals`
- [ ] Gerar links únicos por usuário
- [ ] Endpoint para tracking
- [ ] Dar XP quando referral completa ação
- [ ] Dashboard de referrals

#### Feature: Complete Profile
- [ ] Página de edição de perfil
- [ ] Upload de foto (S3/Cloudinary)
- [ ] Verificação de completude
- [ ] Dar +25 XP quando 100% completo

---

## 📊 Tabela Completa de Fontes de XP

| Ação | XP | Cooldown | Status | Prioridade |
|------|----|----|--------|------------|
| **Testes** |
| Completar MBTI | +50 XP | Único | ✅ **FUNCIONA** | P0 |
| Completar Eneagrama | +50 XP | Único | ✅ **FUNCIONA** | P0 |
| Completar Big Five | +50 XP | Único | ✅ **FUNCIONA** | P0 |
| **Diário** |
| Escrever entrada | +10 XP | 1x/dia | ✅ **FUNCIONA** | P0 |
| Escrever por 7 dias seguidos | +50 XP | Único | 🔴 Não existe | P1 |
| Escrever por 30 dias | +200 XP | Único | 🔴 Não existe | P1 |
| **Desafios** |
| Completar dia do desafio | +20 XP | 1x/dia | 🟡 Verificar | P0 |
| Completar desafio completo | +100 XP | 1x/semana | 🔴 Não existe | P1 |
| **Engajamento** |
| Login diário | +5 XP | 1x/dia | 🔴 **NÃO EXISTE** | P0 |
| Consumir conteúdo | +15 XP | 3x/dia | 🟡 Verificar | P1 |
| Compartilhar resultado | +10 XP | 1x/dia | 🔴 Não existe | P2 |
| **Perfil & Social** |
| Completar perfil | +25 XP | Único | 🔴 Não existe | P2 |
| Adicionar foto | +10 XP | Único | 🔴 Não existe | P2 |
| Convidar amigo (cadastro) | +30 XP | Ilimitado | 🔴 Não existe | P1 |
| Amigo completa teste | +50 XP | Por amigo | 🔴 Não existe | P1 |
| Comentar em comunidade | +5 XP | 3x/dia | 🔴 Não existe | P3 |
| **Conquistas** |
| Desbloquear achievement | Variável | Por achievement | ✅ Funciona | - |
| Alcançar nível X | Variável | Por nível | ✅ Funciona | - |

---

## 🎯 Metas de XP por Nível

Atualmente implementado (calculado automaticamente):

```typescript
// backend/src/modules/gamification/utils/level-calculator.ts
Nível 1: 0-100 XP (Descobridor)
Nível 2: 100-250 XP (Explorador)
Nível 3: 250-500 XP (Conhecedor)
Nível 4: 500-1000 XP (Especialista)
Nível 5: 1000-2000 XP (Mestre)
Nível 6+: Fórmula exponencial
```

---

## 🔥 Próximos Passos Imediatos

### Hoje (Prioridade P0):
1. ✅ Criar este roadmap
2. ✅ Corrigir Journal XP (Bug #1)
3. ✅ Verificar Test Completion XP (Bug #2)
4. 🔄 Implementar Daily Login XP (Bug #5)

### Amanhã (Prioridade P1):
5. Corrigir Challenge XP (Bug #3)
6. Testar Content XP (Bug #4)
7. Criar testes E2E para sistema de XP

### Próxima Semana (Prioridade P2+):
8. Implementar Share Result
9. Implementar Complete Profile
10. Planejar sistema de Referrals (Sprint 7)

---

## 📈 Métricas de Sucesso

**KPIs para Sistema de XP:**
- Taxa de ações por usuário/dia (target: > 3)
- % de usuários que ganham XP diariamente (target: > 60%)
- Tempo médio para Level 2 (target: < 3 dias)
- Retenção D7 de usuários com XP vs sem XP (target: +30%)

**Tracking:**
- Dashboard interno com métricas de XP
- Metabase queries para análise
- Alertas se XP médio/usuário cair < threshold

---

## 🐛 Como Reportar Novos Bugs de XP

Se encontrar uma ação que deveria dar XP mas não dá:

1. Adicionar à seção "Bugs" deste documento
2. Marcar status como 🔴 CRITICAL se for ação principal
3. Criar issue no GitHub com label `bug` e `gamification`
4. Adicionar ao checklist de implementação

---

**Última Atualização:** 21/10/2025
**Responsável:** Claude Code + Jean
**Status Geral:** 🟡 30% Funcional - Precisa correções urgentes

---

## 💡 Insights & Aprendizados

### Por que o XP não estava funcionando?
1. **TODOs comentados:** Código estava pronto mas comentado
2. **Falta de integração:** Módulos não injetavam GamificationService
3. **Falta de testes:** Nenhum teste automatizado verificava XP
4. **Falta de tracking:** Sem dashboard interno para ver XP sendo dado

### Como evitar no futuro?
1. ✅ Criar testes E2E para cada fonte de XP
2. ✅ Dashboard interno mostrando XP/hora em tempo real
3. ✅ Alertas automáticos se nenhum XP for dado em 1h
4. ✅ CI/CD verificar que addXP() é chamado nas ações principais
