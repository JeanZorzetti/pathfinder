# Roadmap: Dashboard Pathfinder - Experiência Personalizada

> **Objetivo:** Transformar o dashboard em um hub de autoconhecimento contínuo que mantém o usuário engajado, oferece valor diário e incentiva o uso recorrente da plataforma através de insights personalizados, gamificação e jornada de crescimento.

---

## 📊 Análise do Estado Atual

### O que já existe:
- ✅ Saudação personalizada com nome do usuário
- ✅ Insight do Dia com reflexão personalizada
- ✅ Card "Meus Resultados" mostrando testes concluídos (ESTJ)
- ✅ Card "Diário" para reflexões
- ✅ Link para ver detalhes do resultado MBTI

### Problemas identificados:
- ❌ **Conteúdo estático:** Insight do Dia parece fixo, não muda diariamente
- ❌ **Falta de profundidade:** Dashboard não mostra insights do tipo de personalidade
- ❌ **Sem progressão:** Não há senso de jornada ou evolução
- ❌ **Baixo engajamento:** Poucos motivos para voltar diariamente
- ❌ **Informação vazia:** "1 teste(s) concluído(s)" é muito vago
- ❌ **Sem personalização:** Não usa dados do resultado MBTI
- ❌ **Sem gamificação:** Nenhum elemento de progresso, conquistas ou metas
- ❌ **Diário desconectado:** Não há prompts baseados no tipo de personalidade

---

## 🎯 Visão Geral da Solução

### Princípios Norteadores:

1. **Personalização Profunda:** Todo conteúdo deve ser adaptado ao tipo MBTI do usuário
2. **Valor Diário:** Dar motivos para voltar todos os dias (insights, desafios, reflexões)
3. **Jornada de Crescimento:** Mostrar progressão e desenvolvimento contínuo
4. **Gamificação Sutil:** Conquistas, streaks, níveis sem ser infantil
5. **Integração com Resultados:** Dashboard como extensão do resultado MBTI
6. **Acionável:** Sempre oferecer próximos passos claros

---

## 📐 Estrutura do Novo Dashboard

### Layout Proposto:

```
┌─────────────────────────────────────────────────────────────────────┐
│ 🏠 Dashboard                                    👤 Jean Zorzetti  🔔 │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Bem-vindo de volta, Jean! 👋                                        │
│  ESTJ - O Executivo                                                  │
│  Membro desde Janeiro 2025 • 🔥 Streak: 7 dias                       │
│                                                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 💡 Insight do Dia (Personalizado para ESTJ)        [Liderança]│   │
│  │                                                                 │   │
│  │ "Hoje, pratique delegar uma tarefa que você normalmente faria │   │
│  │  sozinho. ESTJs tendem a assumir tudo - mas empoderar outros  │   │
│  │  é a marca de um verdadeiro líder."                            │   │
│  │                                                                 │   │
│  │ 📖 Leia mais sobre Delegação Efetiva                           │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌────────────────────────────┐  ┌─────────────────────────────┐  │
│  │ 📊 Seu Perfil ESTJ         │  │ 🎯 Jornada de Crescimento   │  │
│  │                             │  │                              │  │
│  │ [Avatar ESTJ]               │  │ Nível 3: Líder em Formação  │  │
│  │                             │  │ ████████░░░░ 65%            │  │
│  │ Forças Principais:          │  │                              │  │
│  │ • Organização (95%)         │  │ Próxima conquista:           │  │
│  │ • Liderança (92%)           │  │ 🏆 Complete 5 reflexões      │  │
│  │ • Decisão (90%)             │  │    sobre liderança (3/5)     │  │
│  │                             │  │                              │  │
│  │ Área de Foco Atual:         │  │ [Ver Todas Conquistas]       │  │
│  │ ⚠️ Flexibilidade            │  │                              │  │
│  │                             │  │                              │  │
│  │ [Ver Resultado Completo]    │  │                              │  │
│  └────────────────────────────┘  └─────────────────────────────┘  │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 📝 Desafio da Semana (ESTJ)                                   │   │
│  │                                                                 │   │
│  │ Esta semana: "Pratique escuta ativa em todas as reuniões"     │   │
│  │                                                                 │   │
│  │ Como: Antes de responder, pergunte "Entendi corretamente que  │   │
│  │       você quer dizer X?"                                      │   │
│  │                                                                 │   │
│  │ Por quê: ESTJs são orientados a ação, mas às vezes tomam      │   │
│  │          decisões sem absorver todas as perspectivas.          │   │
│  │                                                                 │   │
│  │ ✅ Seg  ✅ Ter  ✅ Qua  ⬜ Qui  ⬜ Sex                         │   │
│  │                                                                 │   │
│  │ [Marcar Hoje como Completo]                                    │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌────────────────────────────┐  ┌─────────────────────────────┐  │
│  │ 📔 Diário de Reflexão       │  │ 🧠 Continue Explorando      │  │
│  │                             │  │                              │  │
│  │ 12 entradas este mês        │  │ Testes Disponíveis:          │  │
│  │ Última: Há 1 dia            │  │                              │  │
│  │                             │  │ 🔷 Eneagrama                 │  │
│  │ Prompt de hoje:             │  │    Descubra suas motivações  │  │
│  │ "Como você lidou com        │  │    [Fazer Teste]             │  │
│  │  imprevistos hoje? ESTJs    │  │                              │  │
│  │  prosperam com planos -     │  │ 🔷 Big Five                  │  │
│  │  como você se adapta quando │  │    Entenda suas 5 dimensões  │  │
│  │  as coisas fogem do script?"│  │    [Fazer Teste]             │  │
│  │                             │  │                              │  │
│  │ [Escrever Reflexão]         │  │ 🔷 Valores Pessoais          │  │
│  │ [Ver Histórico]             │  │    O que realmente importa   │  │
│  │                             │  │    [Em Breve]                │  │
│  └────────────────────────────┘  └─────────────────────────────┘  │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 📚 Conteúdo Recomendado para ESTJs                            │   │
│  │                                                                 │   │
│  │ [Card] [Card] [Card] [Card]                                    │   │
│  │ Artigo Vídeo  Livro  Exercício                                │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │ 🤝 Compatibilidade com Outras Pessoas                         │   │
│  │                                                                 │   │
│  │ Compartilhe seu código de comparação:                          │   │
│  │ [ESTJ-X7K9M2] [Copiar]                                         │   │
│  │                                                                 │   │
│  │ Ou insira o código de alguém:                                  │   │
│  │ [___________] [Comparar]                                       │   │
│  │                                                                 │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Componentes Detalhados

### 1. Hero Section - Saudação Personalizada

**Dados exibidos:**
- Nome do usuário
- Tipo MBTI + Nickname (ex: "ESTJ - O Executivo")
- Data de cadastro
- Streak de dias consecutivos
- Avatar/Badge do tipo

**Funcionalidades:**
- Atualização de saudação baseada em hora do dia (Bom dia, Boa tarde, Boa noite)
- Contador de streak com ícone 🔥
- Badge de tipo clicável (vai para resultado completo)

**Exemplo de Saudações Personalizadas por Tipo:**
- **ESTJ:** "Bem-vindo de volta, [Nome]! Pronto para liderar hoje?"
- **INFP:** "Olá, [Nome]. Que sua criatividade floresça hoje."
- **INTJ:** "De volta, [Nome]. Vamos planejar algo brilhante?"

---

### 2. Insight do Dia Personalizado

**Como funciona:**
- Sistema de rotação de 365 insights únicos por tipo (16 tipos × 365 = 5.840 insights)
- Baseado em data + tipo MBTI
- Focado em desenvolvimento de fraquezas ou maximização de forças

**Categorias de Insights:**
- Liderança
- Relacionamentos
- Carreira
- Crescimento Pessoal
- Mindfulness
- Comunicação

**Estrutura do Insight:**
```typescript
interface DailyInsight {
  type: MBTICode;
  category: string;
  insight: string; // 1-2 frases
  actionItem: string; // Ação concreta
  deepDiveLink?: string; // Link para artigo/vídeo
  date: Date;
}
```

**Exemplo de Insights por Tipo:**

**ESTJ:**
```
Categoria: Flexibilidade
Insight: "Hoje, experimente dizer 'Vamos tentar do seu jeito' em vez de
         'Acho que devemos fazer assim'. ESTJs ganham muito ao permitir
         que outros liderem ocasionalmente."
Ação: Delegue uma decisão para alguém da equipe hoje.
```

**INFP:**
```
Categoria: Assertividade
Insight: "Hoje, pratique dizer 'não' a uma solicitação que não se alinha
         com seus valores. INFPs têm dificuldade em estabelecer limites."
Ação: Identifique uma tarefa que você pode recusar educadamente.
```

---

### 3. Card "Seu Perfil [TIPO]"

**Informações Exibidas:**
- Avatar/ícone do tipo com cor específica
- Top 3 forças (com porcentagem fictícia para engajamento)
- Área de foco atual (fraqueza principal)
- Função cognitiva dominante
- Quick stats: População (%), Famosos do tipo (mini avatares)

**Exemplo:**
```
┌─────────────────────────────┐
│ 📊 Seu Perfil ESTJ          │
│                              │
│ [Grande Avatar ESTJ]         │
│ Azul #1D4ED8                 │
│                              │
│ Forças Principais:           │
│ • 🎯 Organização (95%)       │
│ • 👔 Liderança (92%)         │
│ • ⚡ Decisão Rápida (90%)    │
│                              │
│ 📍 Foco de Desenvolvimento:  │
│ ⚠️ Flexibilidade e Adaptação│
│                              │
│ 🧠 Função Dominante:         │
│ Te - Pensamento Extrovertido │
│ "Você organiza o mundo       │
│  externo com lógica"         │
│                              │
│ 📊 2-4% da população         │
│ 👥 Margaret Thatcher, Dwight │
│    Schrute, Judge Judy       │
│                              │
│ [Ver Resultado Completo →]   │
└─────────────────────────────┘
```

---

### 4. Jornada de Crescimento (Gamificação)

**Sistema de Níveis:**
```
Nível 1: Descobridor (0-100 XP)
Nível 2: Explorador (100-300 XP)
Nível 3: Líder em Formação (300-600 XP)
Nível 4: Mestre do Autoconhecimento (600-1000 XP)
Nível 5: Guia Iluminado (1000+ XP)
```

**Como Ganhar XP:**
- Completar teste MBTI: +100 XP
- Completar Eneagrama: +100 XP
- Completar Big Five: +100 XP
- Escrever reflexão no diário: +10 XP
- Completar desafio semanal: +50 XP
- Ler artigo recomendado: +5 XP
- Compartilhar resultado: +20 XP
- Voltar 7 dias seguidos (streak): +50 XP

**Conquistas (Badges):**

**Conquistas Universais:**
- 🔥 Streak de 7 dias
- 🔥 Streak de 30 dias
- 📝 10 entradas no diário
- 📝 50 entradas no diário
- 🎯 Completou 3 testes
- 🌟 Completou todos os testes

**Conquistas por Tipo (ESTJ exemplo):**
- 👔 "Líder Nato" - Complete 10 desafios de liderança
- 🤝 "Delegador Mestre" - Complete desafio de delegação 5x
- 🧘 "Flexível" - Complete 10 reflexões sobre adaptação

**Visualização:**
```
┌─────────────────────────────┐
│ 🎯 Jornada de Crescimento    │
│                              │
│ Nível 3: Líder em Formação   │
│ ████████░░░░ 65% (390/600 XP)│
│                              │
│ Próximas Conquistas:         │
│                              │
│ 🏆 Reflexivo (3/5)           │
│    Complete 5 reflexões sobre│
│    liderança                 │
│    +50 XP                    │
│                              │
│ 🔥 Semana de Fogo (7/7)      │
│    Volte 7 dias consecutivos │
│    +50 XP                    │
│                              │
│ 📚 Leitor Ávido (2/10)       │
│    Leia 10 artigos           │
│    +30 XP                    │
│                              │
│ [Ver Todas as Conquistas →]  │
└─────────────────────────────┘
```

---

### 5. Desafio da Semana

**Conceito:**
- Toda segunda-feira, novo desafio personalizado por tipo
- Duração: 5 dias úteis (Seg-Sex)
- Focado em desenvolver função inferior ou fraqueza
- Rastreamento diário com checkboxes

**Estrutura:**
```typescript
interface WeeklyChallenge {
  type: MBTICode;
  title: string;
  description: string;
  howTo: string; // Instruções práticas
  why: string; // Por que isso importa para o tipo
  daysCompleted: boolean[];
  xpReward: number;
}
```

**Exemplos por Tipo:**

**ESTJ - O Executivo:**
```
Desafio: "Pratique Escuta Ativa"
Como: Antes de responder, pergunte "Entendi corretamente que você quer dizer X?"
Por quê: ESTJs são decisores rápidos, mas às vezes não absorvem todas as perspectivas.
Recompensa: +50 XP + Badge "Ouvinte Atento"
```

**INFP - O Mediador:**
```
Desafio: "Estabeleça um Limite Claro"
Como: Diga "não" educadamente a uma solicitação que não se alinha com seus valores.
Por quê: INFPs evitam conflitos e negligenciam necessidades próprias.
Recompensa: +50 XP + Badge "Guardião de Limites"
```

**INTJ - O Arquiteto:**
```
Desafio: "Verbalize Apreciação"
Como: Diga "obrigado" ou "bom trabalho" a 3 pessoas diferentes por dia.
Por quê: INTJs assumem que competência fala por si, mas relacionamentos precisam de afirmação.
Recompensa: +50 XP + Badge "Líder Empático"
```

---

### 6. Diário de Reflexão Inteligente

**Funcionalidades:**
- Prompts diários personalizados por tipo
- Histórico de entradas com busca
- Tags automáticas (emoções, temas)
- Estatísticas: frequência, temas recorrentes
- Export para PDF/Markdown

**Prompts Personalizados por Tipo:**

**ESTJ:**
- "Como você lidou com um imprevisto hoje?"
- "Você delegou alguma tarefa? Como se sentiu?"
- "Houve um momento em que você priorizou eficiência sobre relacionamento?"

**INFP:**
- "Você se manteve fiel aos seus valores hoje?"
- "Houve um momento em que você colocou as necessidades dos outros antes das suas?"
- "O que inspirou sua criatividade hoje?"

**INTJ:**
- "Você comunicou suas ideias de forma clara hoje?"
- "Houve um momento em que seu perfeccionismo te paralisou?"
- "Você conectou-se emocionalmente com alguém?"

**Estrutura do Card:**
```
┌─────────────────────────────┐
│ 📔 Diário de Reflexão        │
│                              │
│ 12 entradas este mês         │
│ Última reflexão: Há 1 dia    │
│ Streak: 🔥 7 dias            │
│                              │
│ 💭 Prompt de Hoje (ESTJ):    │
│                              │
│ "Como você reagiu quando seus│
│  planos foram interrompidos? │
│  ESTJs prosperam com         │
│  estrutura - como você se    │
│  adaptou?"                   │
│                              │
│ [Escrever Reflexão do Dia]   │
│ [Ver Histórico de Entradas]  │
│                              │
│ 📊 Temas Recorrentes:        │
│ #liderança (8x)              │
│ #trabalho (12x)              │
│ #relacionamentos (5x)        │
└─────────────────────────────┘
```

---

### 7. Continue Explorando - Outros Testes

**Testes Disponíveis:**

**1. Eneagrama (Em desenvolvimento)**
- 9 tipos de personalidade
- Foco em motivações e medos
- Complementa MBTI

**2. Big Five (Em desenvolvimento)**
- 5 dimensões: OCEAN
- Approach científico
- Percentuais precisos

**3. Valores Pessoais (Futuro)**
- 10 valores universais
- Ranking de prioridades
- Tomada de decisão

**Estrutura do Card:**
```
┌─────────────────────────────┐
│ 🧠 Continue Explorando       │
│                              │
│ Testes Disponíveis:          │
│                              │
│ ┌─────────────────────────┐ │
│ │ 🔷 Eneagrama            │ │
│ │ Descubra suas motivações│ │
│ │ e medos inconscientes   │ │
│ │                         │ │
│ │ ⏱️ 15 minutos           │ │
│ │ [Fazer Teste]           │ │
│ └─────────────────────────┘ │
│                              │
│ ┌─────────────────────────┐ │
│ │ 🔷 Big Five (OCEAN)     │ │
│ │ Mapeie suas 5 dimensões │ │
│ │ de personalidade        │ │
│ │                         │ │
│ │ ⏱️ 20 minutos           │ │
│ │ [Fazer Teste]           │ │
│ └─────────────────────────┘ │
│                              │
│ ┌─────────────────────────┐ │
│ │ 🔷 Valores Pessoais     │ │
│ │ O que realmente importa │ │
│ │ para você?              │ │
│ │                         │ │
│ │ 🔒 Em Breve             │ │
│ └─────────────────────────┘ │
└─────────────────────────────┘
```

---

### 8. Conteúdo Recomendado

**Sistema de Recomendações:**
- Artigos, vídeos, livros, exercícios
- Curados por tipo MBTI
- Algoritmo baseado em:
  - Tipo de personalidade
  - Áreas de desenvolvimento (fraquezas)
  - Histórico de leitura
  - Desafios ativos

**Categorias de Conteúdo:**
- 📰 Artigos (2-5 min de leitura)
- 🎥 Vídeos (5-15 min)
- 📚 Livros (resumos)
- 🧘 Exercícios práticos

**Exemplo de Recomendações para ESTJ:**

```
┌─────────────────────────────────────────┐
│ 📚 Recomendado para ESTJs                │
│                                          │
│ [Card]         [Card]        [Card]     │
│ 📰 Artigo      🎥 Vídeo      📚 Livro   │
│                                          │
│ "Como Delegar  "Liderança    "Extreme   │
│  sem Microge-  Empática"     Ownership" │
│  renciar"      12 min        Jocko      │
│  5 min leitura Simon Sinek   Willink    │
│                                          │
│ [Ler]          [Assistir]    [Ver]      │
└─────────────────────────────────────────┘
```

---

### 9. Comparação de Compatibilidade

**Conceito:**
- Cada usuário tem código único: `[TIPO]-[6 chars]`
- Permite comparar personalidades entre amigos/parceiros/colegas
- Gera relatório de compatibilidade

**Funcionalidades:**
- Gerar código pessoal compartilhável
- Inserir código de outra pessoa
- Ver relatório de compatibilidade:
  - Score de compatibilidade (%)
  - Pontos fortes da relação
  - Desafios potenciais
  - Dicas de comunicação

**Exemplo:**
```
┌─────────────────────────────────────────┐
│ 🤝 Compare com Outras Pessoas            │
│                                          │
│ Seu código de comparação:                │
│ ┌───────────────┐                       │
│ │ ESTJ-X7K9M2   │ [Copiar] [Compartilhar]│
│ └───────────────┘                       │
│                                          │
│ Insira o código de alguém:               │
│ ┌───────────────┐                       │
│ │ [___________] │ [Comparar]             │
│ └───────────────┘                       │
│                                          │
│ Comparações Recentes:                    │
│ • INFP-A3B7C9 - 68% compatível           │
│ • ENTJ-Z1X4Y8 - 85% compatível           │
└─────────────────────────────────────────┘
```

---

## 🗂️ Arquitetura Técnica

### Estrutura de Dados

**User Dashboard Data:**
```typescript
interface UserDashboard {
  userId: string;
  mbtiType: MBTICode;
  completedTests: {
    mbti: {
      completed: boolean;
      date: Date;
      result: MBTICode;
    };
    enneagram?: {
      completed: boolean;
      date: Date;
      result: EnneagramType;
    };
    bigFive?: {
      completed: boolean;
      date: Date;
      results: BigFiveScores;
    };
  };

  // Gamification
  level: number;
  xp: number;
  achievements: Achievement[];
  streak: {
    current: number;
    longest: number;
    lastVisit: Date;
  };

  // Weekly Challenge
  currentChallenge: WeeklyChallenge;

  // Journal
  journalEntries: JournalEntry[];
  journalStats: {
    totalEntries: number;
    thisMonth: number;
    commonThemes: string[];
  };

  // Preferences
  preferences: {
    dailyInsightCategory: string[];
    notificationsEnabled: boolean;
    reminderTime: string; // "09:00"
  };
}
```

**Daily Insight System:**
```typescript
interface DailyInsight {
  id: string;
  type: MBTICode;
  dayOfYear: number; // 1-365
  category: InsightCategory;
  content: {
    insight: string;
    actionItem: string;
    deepDiveLink?: string;
  };
  targetWeakness?: string;
}

type InsightCategory =
  | 'leadership'
  | 'relationships'
  | 'career'
  | 'personal-growth'
  | 'mindfulness'
  | 'communication';
```

**Gamification System:**
```typescript
interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  xpReward: number;
  unlockedAt?: Date;
  progress?: {
    current: number;
    total: number;
  };
}

interface Level {
  level: number;
  title: string;
  xpRequired: number;
  badge: string;
}
```

**Weekly Challenge:**
```typescript
interface WeeklyChallenge {
  id: string;
  type: MBTICode;
  weekStartDate: Date;
  title: string;
  description: string;
  howTo: string;
  why: string;
  daysCompleted: boolean[]; // [Mon, Tue, Wed, Thu, Fri]
  xpReward: number;
  badgeReward?: string;
  completed: boolean;
}
```

---

## 📅 Plano de Implementação

### Sprint 1: Dashboard Core + Personalização (Semana 1)

**Objetivos:**
- Melhorar hero section com streak e tipo MBTI
- Criar card "Seu Perfil [TIPO]" com dados do resultado
- Implementar Insight do Dia dinâmico

**Tarefas:**

1. **Atualizar Hero Section**
   - Buscar dados do usuário (nome, tipo MBTI, data de cadastro)
   - Implementar cálculo de streak
   - Saudação personalizada por hora + tipo
   - Badge do tipo clicável

2. **Criar Componente "ProfileCard"**
   - Avatar grande com cor do tipo
   - Top 3 forças do tipo
   - Área de foco (fraqueza principal)
   - Função cognitiva dominante explicada
   - Stats: população, famosos (mini avatares)
   - Link para resultado completo

3. **Sistema de Daily Insights**
   - Criar banco de 365 insights por tipo (começar com 30 para MVP)
   - Lógica de rotação baseada em `dayOfYear + mbtiType`
   - Categorização de insights
   - Link para "Leia mais" (artigo relacionado)

4. **Backend/Database:**
   - Adicionar campos à tabela `users`:
     - `mbti_type`
     - `member_since`
     - `last_visit`
     - `streak_current`
     - `streak_longest`
   - Criar API endpoint: `GET /api/dashboard/:userId`

**Entregáveis:**
- Dashboard com hero personalizado
- Card de perfil MBTI funcional
- Insight do Dia rotativo

---

### Sprint 2: Gamificação + Jornada (Semana 2)

**Objetivos:**
- Implementar sistema de níveis e XP
- Criar conquistas (achievements)
- Card "Jornada de Crescimento"

**Tarefas:**

1. **Sistema de XP e Níveis**
   - Definir tabela de níveis (5 níveis)
   - Implementar lógica de ganho de XP
   - Progress bar de nível
   - Animações de level up

2. **Sistema de Achievements**
   - Criar banco de 20 conquistas iniciais
     - 10 universais
     - 10 específicas por tipo (começar com 4 tipos)
   - Lógica de desbloqueio
   - Modal de "Achievement Unlocked!"
   - Página de todas as conquistas

3. **Card "Jornada de Crescimento"**
   - Nível atual + barra de progresso
   - Próximas 3 conquistas desbloqueáveis
   - Link para página de conquistas

4. **Backend/Database:**
   - Tabela `user_progress`:
     - `user_id`
     - `level`
     - `xp`
     - `achievements` (JSON array)
   - Tabela `achievements` (catálogo)
   - API endpoints:
     - `POST /api/progress/xp` (adicionar XP)
     - `GET /api/progress/achievements`

**Entregáveis:**
- Sistema de gamificação funcional
- Card de jornada no dashboard
- 20 conquistas implementadas

---

### Sprint 3: Desafio Semanal + Diário Inteligente (Semana 3)

**Objetivos:**
- Criar sistema de desafios semanais
- Melhorar diário com prompts personalizados

**Tarefas:**

1. **Weekly Challenge System**
   - Criar banco de 52 desafios por tipo (começar com 10)
   - Lógica de rotação semanal
   - Tracking de dias completos (checkboxes)
   - Notificação/lembrete diário
   - Recompensa ao completar (XP + badge)

2. **Card "Desafio da Semana"**
   - Exibir desafio atual
   - Checkboxes para Seg-Sex
   - Botão "Marcar Hoje como Completo"
   - Explicação "Como" e "Por quê"

3. **Diário Inteligente**
   - Banco de 100 prompts por tipo
   - Rotação diária de prompts
   - Melhorar UX do card de diário:
     - Stats: entradas este mês, streak
     - Prompt personalizado destacado
     - Botões: "Escrever" e "Ver Histórico"

4. **Backend/Database:**
   - Tabela `weekly_challenges`:
     - `user_id`
     - `challenge_id`
     - `week_start_date`
     - `days_completed` (array de booleans)
   - Tabela `journal_prompts` (catálogo)
   - API endpoints:
     - `GET /api/challenge/current`
     - `POST /api/challenge/mark-day`

**Entregáveis:**
- Desafio semanal funcional com tracking
- Diário com prompts personalizados
- 10 desafios × 16 tipos = 160 desafios

---

### Sprint 4: Conteúdo + Comparação (Semana 4)

**Objetivos:**
- Sistema de recomendação de conteúdo
- Comparação de compatibilidade entre usuários

**Tarefas:**

1. **Content Recommendation System**
   - Curar 30 peças de conteúdo inicial:
     - 15 artigos
     - 10 vídeos
     - 5 livros/resumos
   - Lógica de recomendação:
     - Por tipo MBTI
     - Por fraquezas (área de foco)
     - Por desafio ativo
   - Tracking de conteúdo consumido (+5 XP por item)

2. **Card "Recomendado para [TIPO]"**
   - Carrossel horizontal de conteúdo
   - Filtros: Todos, Artigos, Vídeos, Livros
   - Marcação de "lido/assistido"

3. **Comparison System**
   - Gerar código único por usuário: `[TIPO]-[6chars]`
   - Endpoint para comparação: `POST /api/compare`
   - Algoritmo de compatibilidade:
     - Score baseado em funções cognitivas
     - Análise de pontos fortes/desafios
     - Dicas de comunicação
   - Página de resultado de comparação

4. **Card "Compare com Outras Pessoas"**
   - Exibir código próprio (copiável)
   - Input para código de outra pessoa
   - Histórico de comparações recentes

5. **Backend/Database:**
   - Tabela `content_library`:
     - `id`, `title`, `type`, `url`, `mbti_types` (array)
   - Tabela `user_comparison_history`:
     - `user_id`, `compared_with_code`, `compatibility_score`, `date`
   - API endpoints:
     - `GET /api/content/recommended`
     - `POST /api/content/mark-consumed`
     - `POST /api/compare/:code`

**Entregáveis:**
- 30 peças de conteúdo curado
- Sistema de recomendação funcional
- Comparação de compatibilidade entre usuários

---

## 🔧 BACKEND SPRINTS - Implementação de API e Banco de Dados

> **Objetivo:** Implementar toda a infraestrutura backend necessária para suportar as features do dashboard, migrando dados do frontend para APIs REST com persistência em PostgreSQL.

---

### Sprint 5: Backend Core - Dashboard API & Daily Insights (Semana 5)

**Objetivos:**
- Implementar endpoint central do dashboard que retorna todos os dados
- Sistema de Daily Insights com banco de dados
- Cálculo automático de streak no backend

**Tarefas Backend:**

1. **Dashboard Service & Controller**
   - ✅ `GET /api/dashboard` - Retorna todos os dados do dashboard
   - ✅ Cálculo de streak baseado em `last_visit` e `visit_history` do metadata
   - ✅ Integração com GamificationService para XP e level
   - ✅ Tratamento de erros com fallbacks seguros
   - ✅ JwtAuthGuard para autenticação

2. **Daily Insights System**
   - ✅ Tabela `daily_insights`:
     - `id` (UUID)
     - `personality_type` (VARCHAR - MBTI type)
     - `insight_text` (TEXT)
     - `category` (VARCHAR - leadership, relationships, career, etc.)
     - `action_item` (TEXT - opcional)
     - `deep_dive_link` (VARCHAR - opcional)
     - `day_of_year` (INT - 1-365 para rotação)
     - `created_at`, `updated_at`
   - ✅ Seed inicial: 489 insights (~30 por tipo MBTI × 16 tipos)
   - ✅ Algoritmo de seleção: `dayOfYear % insights.length`
   - ✅ Endpoint: `GET /api/dashboard/insights/daily` (retorna text, category, actionItem)

3. **User Metadata Enhancement**
   - ✅ Usar campo JSONB `metadata` para armazenar:
     - `last_visit` (string ISO date)
     - `visit_history` (array de datas - últimas 30)
     - `streak_current` (number)
     - `streak_longest` (number)
     - `xp` (number - sincronizado com gamification)
     - `level` (number)
     - `achievements` (array de Achievement)
   - ✅ Auto-update de streak em cada chamada ao dashboard

4. **Dashboard Response DTO**
   - ✅ Criar interface completa de resposta:
```typescript
interface DashboardResponse {
  success: boolean;
  data: {
    profile: {
      id: string;
      email: string;
      fullName: string;
      mbtiType: string;
      createdAt: string;
      metadata: {
        xp: number;
        level: number;
        streak_current: number;
        streak_longest: number;
        achievements: Achievement[];
        consumed_content: string[];
      };
    };
    testResults: TestResult[];
    currentChallenge: WeeklyChallenge | null;
    dailyInsight: {
      text: string;
      category: string;
    };
    stats: {
      level: number;
      xp: number;
      streak: { current: number; longest: number };
      tests_completed: number;
    };
  };
}
```

**Status Atual:**
- ✅ Dashboard Controller e Service básicos criados
- ✅ Streak calculation implementado
- ✅ Daily Insights usando dados do banco de dados
- ✅ Migration e seed executados em produção
- ⚠️ Banco populado com 10 insights (sample) - ideal seria 480+

**Entregáveis:**
- ✅ Endpoint `/api/dashboard` funcional
- ⚠️ Banco de dados com 10 insights (sample) - expandir para 480+ no futuro
- ✅ Sistema de streak automático
- ✅ Migration `CreateDailyInsights` executada em produção
- ✅ Seed inicial de insights funcionando

---

### Sprint 6: Backend Gamification - XP, Levels & Achievements (Semana 6)

**Objetivos:**
- Sistema completo de gamificação no backend
- Tracking de XP com histórico
- Sistema de conquistas (achievements) persistente

**Tarefas Backend:**

1. **Gamification Tables**
   - ❌ Tabela `xp_transactions`:
     - `id` (UUID)
     - `user_id` (UUID FK)
     - `source` (ENUM: test_completed, journal_entry, challenge_day, etc.)
     - `amount` (INT)
     - `description` (TEXT)
     - `created_at`
   - ❌ Tabela `achievements_catalog`:
     - `id` (UUID)
     - `achievement_id` (VARCHAR unique - ex: 'streak_7')
     - `title` (VARCHAR)
     - `description` (TEXT)
     - `icon` (VARCHAR)
     - `xp_reward` (INT)
     - `rarity` (ENUM: common, rare, epic, legendary)
     - `mbti_types` (JSONB array - null = universal)
     - `requirement_type` (VARCHAR - streak, journal_count, etc.)
     - `requirement_value` (INT)
   - ❌ Tabela `user_achievements`:
     - `id` (UUID)
     - `user_id` (UUID FK)
     - `achievement_id` (VARCHAR FK)
     - `unlocked_at` (TIMESTAMP)
     - `progress_current` (INT)
     - `progress_total` (INT)

2. **Gamification Service**
   - ✅ `POST /api/progress/xp` - Adicionar XP
     - Validação de source
     - Cooldown por source (evitar spam)
     - Auto-check de achievements
   - ✅ `GET /api/progress/xp/history` - Histórico de XP
   - ✅ `GET /api/progress/stats` - Stats de gamificação
   - ❌ `GET /api/progress/achievements` - Todas as conquistas do usuário
   - ❌ Auto-unlock de achievements quando requirements são atingidos

3. **Achievement Auto-Check Logic**
   - ❌ Verificar conquistas após cada ação:
     - Streak atingido (7, 30 dias)
     - Journal entries (10, 50)
     - Testes completados (3, todos)
     - Desafios completados
     - Conteúdo consumido
   - ❌ Notificação ao desbloquear (via WebSocket ou polling)

4. **Levels Calculation**
   - ✅ Algoritmo de níveis:
```typescript
const LEVELS = [
  { level: 1, title: 'Descobridor', xpRequired: 0 },
  { level: 2, title: 'Explorador', xpRequired: 100 },
  { level: 3, title: 'Líder em Formação', xpRequired: 300 },
  { level: 4, title: 'Mestre do Autoconhecimento', xpRequired: 600 },
  { level: 5, title: 'Guia Iluminado', xpRequired: 1000 },
];
```
   - ✅ Cálculo automático baseado em XP total

**Status Atual:**
- ✅ GamificationService e Controller existem
- ✅ Endpoints /progress/xp e /progress/stats funcionais
- ❌ Achievements ainda no frontend (não persistentes)
- ❌ Falta criar tabelas e popular achievements_catalog

**Entregáveis:**
- ❌ Sistema de XP com histórico persistente
- ❌ 20+ achievements no banco de dados
- ❌ Auto-unlock de conquistas baseado em ações

---

### Sprint 7: Backend Challenges & Journal (Semana 7)

**Objetivos:**
- Sistema de desafios semanais com tracking no banco
- API de journal (diário) com prompts e estatísticas

**Tarefas Backend:**

1. **Weekly Challenges System**
   - ❌ Tabela `challenge_templates`:
     - `id` (UUID)
     - `challenge_id` (VARCHAR unique)
     - `mbti_type` (VARCHAR)
     - `title` (VARCHAR)
     - `description` (TEXT)
     - `how_to` (TEXT)
     - `why` (TEXT)
     - `xp_reward` (INT - default 50)
     - `badge_reward` (VARCHAR - nullable)
   - ❌ Tabela `user_challenges`:
     - `id` (UUID)
     - `user_id` (UUID FK)
     - `challenge_id` (VARCHAR FK)
     - `week_start_date` (DATE)
     - `days_completed` (JSONB array [false, false, false, false, false])
     - `completed` (BOOLEAN)
     - `completed_at` (TIMESTAMP nullable)
   - ❌ Seed: 10 desafios × 16 tipos = 160 templates

2. **Challenges Service & Endpoints**
   - ✅ `GET /api/challenges/current` - Desafio ativo do usuário
     - Auto-create novo desafio se:
       - Usuário não tem desafio ativo
       - Semana mudou (segunda-feira)
   - ✅ `POST /api/challenges/complete-day` - Marcar dia como completo
     - Body: `{ day: 0-4 }` (Mon=0, Fri=4)
     - Validação: apenas dias úteis
     - Auto-complete challenge se todos os dias marcados
     - Award XP ao completar
   - ✅ `GET /api/challenges/history` - Histórico de desafios
   - ✅ `GET /api/challenges/stats` - Estatísticas

3. **Journal System**
   - ❌ Tabela `journal_entries`:
     - `id` (UUID)
     - `user_id` (UUID FK)
     - `content` (TEXT)
     - `mood` (VARCHAR nullable - happy, sad, neutral, etc.)
     - `tags` (JSONB array)
     - `prompt_used` (VARCHAR nullable)
     - `created_at`, `updated_at`
   - ❌ Tabela `journal_prompts`:
     - `id` (UUID)
     - `mbti_type` (VARCHAR)
     - `prompt` (TEXT)
     - `category` (VARCHAR - reflection, growth, emotions, etc.)
     - `day_of_year` (INT - para rotação)

4. **Journal Service & Endpoints**
   - ✅ `POST /api/journal/entries` - Criar entrada
     - Award +10 XP
     - Check achievement: 10 entradas, 50 entradas
   - ✅ `GET /api/journal/entries` - Listar entradas (paginado)
   - ✅ `GET /api/journal/entries/:id` - Entry específica
   - ✅ `PATCH /api/journal/entries/:id` - Editar
   - ✅ `DELETE /api/journal/entries/:id` - Deletar
   - ✅ `GET /api/journal/prompts/daily` - Prompt do dia
   - ✅ `GET /api/journal/stats` - Estatísticas
     - Total entries
     - Entries este mês
     - Temas recorrentes (tags)
     - Streak de journaling

**Status Atual:**
- ✅ ChallengesService e Controller existem
- ✅ JournalService e Controller existem
- ❌ Challenges ainda usando dados mockados do frontend
- ❌ Journal não tem entradas persistentes
- ❌ Falta popular challenge_templates e journal_prompts

**Entregáveis:**
- ❌ 160 desafios semanais no banco
- ❌ Sistema de tracking de desafios persistente
- ❌ API de journal completa com prompts

---

### Sprint 8: Backend Content & Comparison (Semana 8)

**Objetivos:**
- Sistema de conteúdo recomendado com tracking
- API de comparação de compatibilidade

**Tarefas Backend:**

1. **Content Library System**
   - ❌ Tabela `content_library`:
     - `id` (UUID)
     - `content_id` (VARCHAR unique)
     - `title` (VARCHAR)
     - `type` (ENUM: article, video, book, exercise)
     - `url` (VARCHAR)
     - `description` (TEXT)
     - `duration_minutes` (INT nullable)
     - `xp_reward` (INT - default 5)
     - `mbti_types` (JSONB array - tipos recomendados)
     - `categories` (JSONB array - leadership, relationships, etc.)
     - `difficulty` (VARCHAR - beginner, intermediate, advanced)
     - `created_at`
   - ❌ Seed: 40+ peças de conteúdo curado

2. **Content Service & Endpoints**
   - ❌ `GET /api/content/recommended` - Conteúdo recomendado
     - Query params: `?mbtiType=ESTJ&limit=4`
     - Algoritmo:
       1. Filtrar por mbti_types contains user type
       2. Priorizar categorias relacionadas a fraquezas do tipo
       3. Excluir conteúdo já consumido
       4. Ordenar por relevância
   - ❌ `POST /api/content/mark-consumed` - Marcar como consumido
     - Body: `{ contentId: string }`
     - Award XP (+5)
     - Salvar em user.metadata.consumed_content
     - Check achievement: leitor ávido (10 conteúdos)
   - ❌ `GET /api/content/history` - Histórico de conteúdo consumido

3. **Comparison System**
   - ❌ Tabela `comparison_codes`:
     - `user_id` (UUID PK FK)
     - `code` (VARCHAR unique - formato: MBTI-XXXXXX)
     - `created_at`
   - ❌ Tabela `comparison_history`:
     - `id` (UUID)
     - `user_id` (UUID FK)
     - `compared_with_user_id` (UUID FK)
     - `compatibility_score` (INT - 0-100)
     - `created_at`

4. **Comparison Service & Endpoints**
   - ✅ `GET /api/comparison/code` - Obter ou criar código único
     - Formato: `{MBTI}-{6 random alphanumeric}`
     - Ex: `ESTJ-X7K9M2`, `INFP-A3B7C9`
   - ✅ `POST /api/comparison/compare` - Comparar com outro código
     - Body: `{ code: string }`
     - Retorna:
       - Tipos MBTI de ambos
       - Score de compatibilidade (%)
       - Análise de pontos fortes
       - Desafios potenciais
       - Dicas de comunicação
   - ✅ `GET /api/comparison/history` - Histórico de comparações
   - ✅ `GET /api/comparison/stats` - Estatísticas

5. **Compatibility Algorithm**
   - ❌ Baseado em dimensões MBTI:
```typescript
// Scoring por dimensão (0-25 pontos cada)
E/I: opposite = 25, same = 15
S/N: same = 25, opposite = 10
T/F: same/opposite = 20 (complementar)
J/P: same = 25, opposite = 15

// Bônus por funções cognitivas complementares
// Exemplo: ESTJ (Te-Si-Ne-Fi) + INFP (Fi-Ne-Si-Te)
// Compartilham Ne e Si = +10 pontos
```
   - ❌ Análise textual baseada em combinações:
     - Pontos fortes: "Ambos valorizam X"
     - Desafios: "Conflito potencial em Y"
     - Dicas: "Para melhor comunicação..."

**Status Atual:**
- ✅ ComparisonService e Controller existem
- ❌ Content ainda usando dados hardcoded do frontend
- ❌ Comparison não tem histórico persistente
- ❌ Falta popular content_library

**Entregáveis:**
- ❌ 40+ conteúdos no banco de dados
- ❌ Sistema de recomendação inteligente
- ❌ API de comparação com histórico

---

## 📊 Métricas de Sucesso

### KPIs Primários:

**1. Engagement:**
- **DAU (Daily Active Users):** Meta +150% em 30 dias
- **Tempo médio no dashboard:** Meta 5 minutos/visita
- **Bounce rate:** < 20%

**2. Retention:**
- **D1 Retention:** 60% (voltam no dia seguinte)
- **D7 Retention:** 40% (voltam na primeira semana)
- **D30 Retention:** 25% (voltam após 30 dias)
- **Streak médio:** 7 dias

**3. Feature Adoption:**
- **Daily Insight lido:** 80% dos usuários
- **Desafio semanal iniciado:** 60%
- **Desafio semanal completo:** 30%
- **Entrada no diário:** 40% dos usuários/dia
- **Conteúdo recomendado clicado:** 50%

**4. Gamificação:**
- **% usuários Nível 2+:** 60% em 30 dias
- **Conquistas desbloqueadas/usuário:** Média de 5
- **Usuários com streak 7+:** 30%

### KPIs Secundários:

**5. Conversão (Future):**
- **Testes adicionais completados:** 40% fazem Eneagrama
- **Comparações realizadas:** 25% dos usuários
- **Conteúdo premium (futuro):** Taxa de conversão

---

## 🎨 Design System - Guidelines

### Cores por Tipo MBTI:

Cada tipo mantém sua cor característica do resultado:

**Analysts (NT):**
- INTJ: `#6B46C1` (Roxo escuro)
- INTP: `#4C51BF` (Roxo/Índigo)
- ENTJ: `#DC2626` (Vermelho)
- ENTP: `#8B5CF6` (Roxo claro)

**Diplomats (NF):**
- INFJ: `#059669` (Verde jade)
- INFP: `#9F7AEA` (Lilás)
- ENFJ: `#F59E0B` (Âmbar/Dourado)
- ENFP: `#EC4899` (Rosa)

**Sentinels (SJ):**
- ISTJ: `#1E3A8A` (Azul escuro)
- ISFJ: `#059669` (Verde musgo)
- ESTJ: `#1D4ED8` (Azul)
- ESFJ: `#EA580C` (Laranja)

**Explorers (SP):**
- ISTP: `#374151` (Cinza)
- ISFP: `#10B981` (Verde claro)
- ESTP: `#DC2626` (Vermelho)
- ESFP: `#EC4899` (Rosa)

### Componentes:

**Cards:**
- Borda sutil: `border: 1px solid #E5E7EB`
- Sombra suave: `shadow-md`
- Hover: `shadow-lg + scale-105`
- Padding: `p-6` ou `p-8`
- Border radius: `rounded-xl`

**Progress Bars:**
- Altura: `h-3`
- Background: `bg-gray-200`
- Preenchimento: Cor do tipo MBTI
- Animação: `transition-all duration-500`

**Badges:**
- Small: `text-xs px-2 py-1 rounded-full`
- Cor de fundo: `bg-[tipo]-100`
- Texto: `text-[tipo]-800`

**Buttons:**
- Primário: Cor do tipo MBTI
- Secundário: `bg-gray-200 text-gray-800`
- Hover: `hover:opacity-90 hover:scale-105`
- Tamanhos: `px-4 py-2` (small), `px-6 py-3` (medium)

---

## 🔮 Funcionalidades Futuras (Post-MVP)

### 1. Notificações e Lembretes
- Notificação diária: "Seu insight do dia está pronto!"
- Lembrete de desafio semanal: "Você marcou seu desafio hoje?"
- Streak em risco: "Não perca seu streak de 15 dias!"

### 2. Dashboard Móvel Nativo
- App iOS/Android com notificações push
- Widget de insight do dia
- Quick journaling

### 3. Social Features
- Feed de conquistas de amigos
- Grupos por tipo MBTI
- Fóruns de discussão

### 4. IA Personalizada
- Chatbot que conhece seu tipo
- Análise de padrões no diário
- Recomendações dinâmicas baseadas em comportamento

### 5. Integração com Calendário
- Agendar desafios no Google Calendar
- Export de reflexões para Notion/Evernote

### 6. Premium Features
- Relatórios mensais personalizados (PDF)
- Sessões de coaching 1-on-1
- Conteúdo exclusivo avançado
- Testes adicionais (Valores, Motivadores Intrínsecos)

---

## ✅ Checklist de Implementação

### Sprint 1: Dashboard Core ✅ **100% COMPLETO**
- [x] Atualizar Hero Section com tipo MBTI e streak
- [x] Criar componente ProfileCard com dados completos por tipo
- [x] Criar sistema de cálculo de streak (streakCalculator.ts)
- [x] Criar MBTI colors data (16 tipos com paletas completas)
- [x] Melhorar DailyInsightCard com tipo MBTI
- [x] Atualizar types do database (Profile com streak fields)
- [x] Build bem-sucedido (2700 módulos, 1.19MB bundle)

**Arquivos criados:**
- `frontend/src/components/dashboard/ProfileCard.tsx` (200+ linhas)
- `frontend/src/utils/streakCalculator.ts` (150+ linhas)
- `frontend/src/data/mbti-colors.ts` (150+ linhas)

**Arquivos modificados:**
- `frontend/src/pages/Dashboard.tsx` (+80 linhas - Hero + ProfileCard + Streak)
- `frontend/src/components/DailyInsightCard.tsx` (+2 linhas - mbtiType prop)
- `frontend/src/types/database.ts` (+5 linhas - Profile streak fields)

### Sprint 2: Gamificação ✅ **100% COMPLETO**
- [x] Implementar sistema de XP e níveis (5 níveis: Descobridor → Guia Iluminado)
- [x] Criar 20 conquistas iniciais (10 universais + 10 específicas por tipo)
- [x] Card "Jornada de Crescimento" (JourneyCard.tsx)
- [x] Sistema de raridade (common, rare, epic, legendary)
- [x] Hook useXP para gerenciar XP e conquistas
- [x] AchievementBadge component
- [x] Progress tracking para conquistas
- [x] Toast notifications para XP e level up
- [x] Integração completa no Dashboard
- [x] Build bem-sucedido (2704 módulos, 1.2MB bundle)

**Arquivos criados:**
- `frontend/src/types/gamification.ts` (200+ linhas - Types, LEVELS, cálculos)
- `frontend/src/data/achievements.ts` (300+ linhas - 20 conquistas)
- `frontend/src/components/dashboard/JourneyCard.tsx` (150+ linhas)
- `frontend/src/components/dashboard/AchievementBadge.tsx` (100+ linhas)
- `frontend/src/hooks/useXP.ts` (180+ linhas - Gestão de XP e achievements)

**Arquivos modificados:**
- `frontend/src/pages/Dashboard.tsx` (+50 linhas - Gamification integration)
- `frontend/src/types/database.ts` (+4 linhas - Profile gamification fields)

### Sprint 3: Desafio + Diário ✅ **100% COMPLETO**
- [x] Sistema de desafios semanais (10+ desafios × 16 tipos = 160+ desafios)
- [x] Card "Desafio da Semana" com tracking Mon-Fri
- [x] Melhorar diário com prompts personalizados (30+ prompts × 16 tipos)
- [x] Types completos para challenges (WeeklyChallenge, ChallengeTemplate)
- [x] Integração completa no Dashboard
- [x] Handler para marcar dias como completos
- [x] XP reward ao completar desafio (50 XP + badge)
- [x] Prompts diários com rotação baseada em data
- [x] Journal card melhorado com prompt do dia e categoria
- [x] Build bem-sucedido (2708 módulos, 1.228MB bundle)

**Arquivos criados:**
- `frontend/src/types/challenges.ts` (170+ linhas - WeeklyChallenge types + helpers)
- `frontend/src/data/weeklyChallenges.ts` (400+ linhas - 10+ challenges por tipo)
- `frontend/src/components/dashboard/WeeklyChallengeCard.tsx` (180+ linhas)
- `frontend/src/data/journalPrompts.ts` (300+ linhas - 30+ prompts por tipo)

**Arquivos modificados:**
- `frontend/src/pages/Dashboard.tsx` (+100 linhas - Challenge + Journal integration)
- `frontend/src/types/database.ts` (+2 linhas - current_challenge, completed_challenges)

### Sprint 4: Conteúdo + Comparação ✅ **100% COMPLETO**
- [x] Curar 40+ peças de conteúdo (artigos, vídeos, livros, exercícios)
- [x] Card "Conteúdo Recomendado" com filtros por tipo
- [x] Sistema de comparação com código único (formato: MBTI-XXXXXX)
- [x] Card "Compare com Outras Pessoas" com análise de compatibilidade
- [x] Algoritmo de compatibilidade baseado em dimensões MBTI
- [x] Análise automática de forças, desafios e dicas de comunicação
- [x] Sistema de XP para conteúdo consumido (+5 XP por item)
- [x] Geração automática de código de comparação único
- [x] Build bem-sucedido (2713 módulos, 1.253MB bundle)

**Arquivos criados:**
- `frontend/src/types/content.ts` (140+ linhas - Content types, helpers, filters)
- `frontend/src/data/contentLibrary.ts` (600+ linhas - 40+ conteúdos curados)
- `frontend/src/components/dashboard/ContentRecommendationCard.tsx` (200+ linhas)
- `frontend/src/types/comparison.ts` (250+ linhas - Comparação + algoritmo compatibilidade)
- `frontend/src/components/dashboard/ComparisonCard.tsx` (300+ linhas)

**Arquivos modificados:**
- `frontend/src/pages/Dashboard.tsx` (+80 linhas - Content + Comparison integration)
- `frontend/src/types/database.ts` (+3 linhas - comparison_code, consumed_content, content_history)

---

## 🚀 Próximos Passos Imediatos

### Ação 1: Revisar e Aprovar Roadmap
- Revisar estrutura proposta
- Priorizar funcionalidades (MVP vs Nice-to-have)
- Aprovar design e fluxos

### Ação 2: Sprint 1 - Dashboard Core
- Começar pelo Hero Section melhorado
- Criar ProfileCard
- Implementar Daily Insights

### Ação 3: Curadoria de Conteúdo
- Começar a escrever/coletar 30 insights por tipo
- Preparar 10 desafios por tipo
- Curar conteúdo recomendado (artigos, vídeos)

---

## 📚 Recursos de Inspiração

**Dashboards de Referência:**
- Duolingo (gamificação e streaks)
- Headspace (daily mindfulness)
- Strava (achievements e social)
- Notion (personalização e organização)

**Conteúdo MBTI:**
- Personality Junkie
- 16Personalities Blog
- Type in Mind
- Psychology Today (artigos sobre tipos)

---

## 🎯 Conclusão

Este roadmap transforma o dashboard de um "ponto de acesso" em um **hub de crescimento pessoal contínuo**. Com:

1. **Personalização profunda** baseada em tipo MBTI
2. **Gamificação sutil** que incentiva engajamento
3. **Conteúdo acionável** diariamente (insights, desafios, prompts)
4. **Jornada de crescimento** visível e motivadora
5. **Comunidade** através de comparações e futuros recursos sociais

**Meta Final:** Aumentar D7 retention de 10% (baseline) para 40% em 60 dias através de valor diário comprovado e personalização profunda.

Pronto para transformar o dashboard em um destino, não apenas um ponto de passagem! 🚀
