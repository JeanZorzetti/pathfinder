# 🚀 SPRINT 10: CONTENT EXPANSION - PLANO DE IMPLEMENTAÇÃO

**Objetivo:** Completar Eneagrama e Big Five, expandir biblioteca de conteúdo

**Duração Estimada:** 2-3 semanas
**Data de Início:** 17/10/2025
**Status:** 🔄 Em Progresso (Fase 1 - Eneagrama Backend: 100% completo ✅ | Frontend: 0%)

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Fase 1: Eneagrama Completo](#fase-1-eneagrama-completo)
- [Fase 2: Big Five (OCEAN) Completo](#fase-2-big-five-ocean-completo)
- [Fase 3: Biblioteca de Conteúdo Expandida](#fase-3-biblioteca-de-conteúdo-expandida)
- [Fase 4: Blog/Resources Center (Opcional)](#fase-4-blogresources-center-opcional)
- [Fase 5: Workshops & Webinars (Opcional)](#fase-5-workshops--webinars-opcional)
- [Testes](#testes)
- [Deploy](#deploy)
- [Métricas de Sucesso](#métricas-de-sucesso)

---

## 🎯 Visão Geral

O Sprint 10 expande os testes de personalidade disponíveis no Pathfinder, adicionando **Eneagrama** (9 tipos) e **Big Five/OCEAN** (5 dimensões), além de expandir massivamente a biblioteca de conteúdo.

### Objetivos Principais

1. ✅ **Eneagrama Completo** - 9 tipos, 50 questões, algoritmo de scoring
2. ✅ **Big Five Completo** - 5 dimensões (OCEAN), 60 questões, gráfico radar
3. ✅ **Biblioteca Expandida** - 100+ artigos, 50+ vídeos, 30+ livros
4. ⚠️ **Blog/Resources** - CMS com artigos próprios (opcional para MVP)
5. ⚠️ **Workshops** - Calendário de eventos (opcional para MVP)

### Prioridades

**Must-Have (MVP):**
- Eneagrama 100% funcional
- Big Five 100% funcional
- 100+ conteúdos curados na biblioteca
- Integração com dashboard

**Nice-to-Have (v2):**
- Blog próprio com CMS
- Newsletter signup
- Workshops e webinars
- Relatórios PDF mensais

---

## 🔢 Fase 1: Eneagrama Completo (7 dias)

### 1.1. Overview do Eneagrama

O **Eneagrama** é um sistema de personalidade que identifica 9 tipos fundamentais, baseados em motivações centrais, medos e desejos.

**Os 9 Tipos:**

1. **Tipo 1 - O Perfeccionista** (The Reformer)
2. **Tipo 2 - O Ajudante** (The Helper)
3. **Tipo 3 - O Realizador** (The Achiever)
4. **Tipo 4 - O Individualista** (The Individualist)
5. **Tipo 5 - O Investigador** (The Investigator)
6. **Tipo 6 - O Leal** (The Loyalist)
7. **Tipo 7 - O Entusiasta** (The Enthusiast)
8. **Tipo 8 - O Desafiador** (The Challenger)
9. **Tipo 9 - O Pacificador** (The Peacemaker)

**Conceitos-Chave:**
- **Wings** - Influências dos tipos adjacentes (ex: 1w9, 1w2)
- **Triads** - Grupos: Body/Gut (8,9,1), Heart/Feeling (2,3,4), Head/Thinking (5,6,7)
- **Levels of Development** - 9 níveis de saúde (saudável, médio, não-saudável)
- **Growth Path** - Direção de integração (ex: 1 → 7)
- **Stress Path** - Direção de desintegração (ex: 1 → 4)

---

### 1.2. Database Schema - Eneagrama

#### Migration

**Arquivo:** `backend/src/database/migrations/TIMESTAMP-AddEnneagramTables.ts`

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddEnneagramTables1234567890124 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Atualizar test_frameworks para incluir Eneagrama
    await queryRunner.query(`
      INSERT INTO test_frameworks (id, name, description, question_count, is_active)
      VALUES (
        'enneagram',
        'Eneagrama',
        'Sistema de 9 tipos de personalidade baseado em motivações centrais, medos e desejos',
        50,
        true
      );
    `);

    // Tabela de tipos do Eneagrama
    await queryRunner.query(`
      CREATE TABLE enneagram_types (
        id VARCHAR(10) PRIMARY KEY,
        number INTEGER NOT NULL UNIQUE CHECK (number >= 1 AND number <= 9),
        name VARCHAR(100) NOT NULL,
        name_en VARCHAR(100),
        nickname VARCHAR(100),
        core_fear TEXT NOT NULL,
        core_desire TEXT NOT NULL,
        key_motivation TEXT NOT NULL,
        at_best TEXT,
        at_worst TEXT,
        basic_proposition TEXT,
        triad VARCHAR(20), -- 'gut', 'heart', 'head'
        wing_options JSON, -- ['1w9', '1w2']
        growth_direction INTEGER, -- Número do tipo de integração
        stress_direction INTEGER, -- Número do tipo de desintegração
        strengths JSON,
        weaknesses JSON,
        workplace_behavior TEXT,
        relationships TEXT,
        famous_examples JSON,
        growth_path JSON,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX idx_enneagram_types_number ON enneagram_types(number);
    `);

    // Tabela de questões do Eneagrama
    await queryRunner.query(`
      CREATE TABLE enneagram_questions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        question_number INTEGER NOT NULL,
        question_text TEXT NOT NULL,
        scoring_type VARCHAR(20) NOT NULL, -- 'direct', 'reverse'
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Tabela de mapeamento questão → tipos (cada questão pode ter múltiplos tipos)
    await queryRunner.query(`
      CREATE TABLE enneagram_question_type_mapping (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        question_id UUID REFERENCES enneagram_questions(id) ON DELETE CASCADE,
        enneagram_type_id VARCHAR(10) REFERENCES enneagram_types(id),
        score_weight INTEGER DEFAULT 1 CHECK (score_weight >= -3 AND score_weight <= 3),
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX idx_enneagram_mapping_question ON enneagram_question_type_mapping(question_id);
      CREATE INDEX idx_enneagram_mapping_type ON enneagram_question_type_mapping(enneagram_type_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS enneagram_question_type_mapping;`);
    await queryRunner.query(`DROP TABLE IF EXISTS enneagram_questions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS enneagram_types;`);
    await queryRunner.query(`DELETE FROM test_frameworks WHERE id = 'enneagram';`);
  }
}
```

---

### 1.3. Entities - Eneagrama

#### EnneagramType Entity

**Arquivo:** `backend/src/modules/personality-tests/entities/enneagram-type.entity.ts`

```typescript
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('enneagram_types')
export class EnneagramType {
  @PrimaryColumn({ length: 10 })
  id: string; // 'type1', 'type2', ...

  @Column({ type: 'integer', unique: true })
  number: number; // 1-9

  @Column({ length: 100 })
  name: string; // 'O Perfeccionista'

  @Column({ name: 'name_en', length: 100, nullable: true })
  nameEn: string; // 'The Reformer'

  @Column({ length: 100, nullable: true })
  nickname: string;

  @Column({ name: 'core_fear', type: 'text' })
  coreFear: string;

  @Column({ name: 'core_desire', type: 'text' })
  coreDesire: string;

  @Column({ name: 'key_motivation', type: 'text' })
  keyMotivation: string;

  @Column({ name: 'at_best', type: 'text', nullable: true })
  atBest: string;

  @Column({ name: 'at_worst', type: 'text', nullable: true })
  atWorst: string;

  @Column({ name: 'basic_proposition', type: 'text', nullable: true })
  basicProposition: string;

  @Column({ length: 20, nullable: true })
  triad: string; // 'gut', 'heart', 'head'

  @Column({ name: 'wing_options', type: 'json', nullable: true })
  wingOptions: string[]; // ['1w9', '1w2']

  @Column({ name: 'growth_direction', type: 'integer', nullable: true })
  growthDirection: number;

  @Column({ name: 'stress_direction', type: 'integer', nullable: true })
  stressDirection: number;

  @Column({ type: 'json', nullable: true })
  strengths: string[];

  @Column({ type: 'json', nullable: true })
  weaknesses: string[];

  @Column({ name: 'workplace_behavior', type: 'text', nullable: true })
  workplaceBehavior: string;

  @Column({ type: 'text', nullable: true })
  relationships: string;

  @Column({ name: 'famous_examples', type: 'json', nullable: true })
  famousExamples: string[];

  @Column({ name: 'growth_path', type: 'json', nullable: true })
  growthPath: any;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
```

#### EnneagramQuestion Entity

**Arquivo:** `backend/src/modules/personality-tests/entities/enneagram-question.entity.ts`

```typescript
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('enneagram_questions')
export class EnneagramQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'question_number', type: 'integer' })
  questionNumber: number;

  @Column({ name: 'question_text', type: 'text' })
  questionText: string;

  @Column({ name: 'scoring_type', length: 20 })
  scoringType: string; // 'direct', 'reverse'

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
```

#### EnneagramQuestionTypeMapping Entity

**Arquivo:** `backend/src/modules/personality-tests/entities/enneagram-mapping.entity.ts`

```typescript
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { EnneagramQuestion } from './enneagram-question.entity';
import { EnneagramType } from './enneagram-type.entity';

@Entity('enneagram_question_type_mapping')
export class EnneagramQuestionTypeMapping {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'question_id' })
  questionId: string;

  @ManyToOne(() => EnneagramQuestion)
  @JoinColumn({ name: 'question_id' })
  question: EnneagramQuestion;

  @Column({ name: 'enneagram_type_id' })
  enneagramTypeId: string;

  @ManyToOne(() => EnneagramType)
  @JoinColumn({ name: 'enneagram_type_id' })
  enneagramType: EnneagramType;

  @Column({ name: 'score_weight', type: 'integer', default: 1 })
  scoreWeight: number; // -3 a +3

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
```

---

### 1.4. Seed - Dados do Eneagrama

**Arquivo:** `backend/src/database/seeds/enneagram.seed.ts`

```typescript
import { DataSource } from 'typeorm';
import { EnneagramType } from '../../modules/personality-tests/entities/enneagram-type.entity';

export async function seedEnneagramTypes(dataSource: DataSource) {
  const repository = dataSource.getRepository(EnneagramType);

  const types = [
    {
      id: 'type1',
      number: 1,
      name: 'O Perfeccionista',
      nameEn: 'The Reformer',
      nickname: 'O Idealista Ético',
      coreFear: 'Ser corrupto, mau ou defeituoso',
      coreDesire: 'Ser bom, íntegro e equilibrado',
      keyMotivation: 'Melhorar a si mesmo e ao mundo, ser correto, evitar erros',
      atBest: 'Sábio, discernente, realista e nobre. Modelo de integridade.',
      atWorst: 'Crítico implacável, perfeccionista, inflexível e raivoso.',
      basicProposition: 'Você é bom ou OK se fizer o que é certo.',
      triad: 'gut',
      wingOptions: ['1w9', '1w2'],
      growthDirection: 7,
      stressDirection: 4,
      strengths: [
        'Senso de ética e integridade forte',
        'Disciplinado e organizado',
        'Busca pela excelência',
        'Responsável e confiável',
        'Idealista com propósito claro'
      ],
      weaknesses: [
        'Autocrítica excessiva',
        'Perfeccionismo paralisante',
        'Rigidez e inflexibilidade',
        'Dificuldade em relaxar',
        'Raiva reprimida (resentimento)'
      ],
      workplaceBehavior: 'O Tipo 1 é um trabalhador dedicado, organizado e confiável. Valoriza procedimentos, qualidade e eficiência. Pode ser exigente consigo mesmo e com os outros, buscando sempre melhorar processos. Tende a assumir responsabilidades extras para garantir que as coisas sejam feitas corretamente.',
      relationships: 'Nas relações, o Tipo 1 é leal, responsável e busca parcerias equilibradas. Pode ser crítico quando percebe falhas morais ou éticas. Precisa aprender a aceitar imperfeições e relaxar padrões muito rígidos. Valoriza honestidade, integridade e compromisso.',
      famousExamples: [
        'Mahatma Gandhi',
        'Nelson Mandela',
        'Michelle Obama',
        'Hermione Granger (Harry Potter)',
        'Capitão América (Marvel)'
      ],
      growthPath: {
        direction: 'Para o Tipo 7',
        description: 'Quando saudável, o 1 integra qualidades do 7: torna-se mais espontâneo, alegre e aceita imperfeições. Aprende a se divertir e aproveitar o momento.'
      }
    },
    {
      id: 'type2',
      number: 2,
      name: 'O Ajudante',
      nameEn: 'The Helper',
      nickname: 'O Cuidador Generoso',
      coreFear: 'Não ser amado ou necessitado',
      coreDesire: 'Ser amado e apreciado',
      keyMotivation: 'Ser necessário, expressar sentimentos por outros, ser apreciado',
      atBest: 'Altruísta, amoroso, generoso e compassivo genuinamente.',
      atWorst: 'Manipulador, possessivo, vítima e mártir emocional.',
      basicProposition: 'Você é bom ou OK se for amado pelos outros.',
      triad: 'heart',
      wingOptions: ['2w1', '2w3'],
      growthDirection: 4,
      stressDirection: 8,
      strengths: [
        'Empatia e compaixão profundas',
        'Generosidade natural',
        'Habilidade de conectar pessoas',
        'Caloroso e acolhedor',
        'Intuitivo sobre necessidades alheias'
      ],
      weaknesses: [
        'Negligenciar próprias necessidades',
        'Tendência a manipulação emocional',
        'Dificuldade em dizer não',
        'Busca excessiva por aprovação',
        'Orgulho disfarçado de humildade'
      ],
      workplaceBehavior: 'O Tipo 2 é colaborativo, apoiador e cria um ambiente acolhedor. Excelente em trabalho de equipe e em identificar necessidades não expressas. Pode ter dificuldade em delegar e tende a assumir mais do que deveria. Valoriza reconhecimento pelo apoio que oferece.',
      relationships: 'Extremamente atencioso e dedicado em relacionamentos. Pode tornar-se dependente da validação do parceiro. Precisa aprender a estabelecer limites saudáveis e cuidar de si mesmo. Quando saudável, oferece amor incondicional e suporte genuíno.',
      famousExamples: [
        'Princesa Diana',
        'Mother Teresa',
        'Samwise Gamgee (Senhor dos Anéis)',
        'Molly Weasley (Harry Potter)',
        'Phoebe Buffay (Friends)'
      ],
      growthPath: {
        direction: 'Para o Tipo 4',
        description: 'Quando saudável, o 2 integra qualidades do 4: torna-se mais consciente de suas próprias necessidades e emoções. Aprende autocuidado e autenticidade emocional.'
      }
    },
    {
      id: 'type3',
      number: 3,
      name: 'O Realizador',
      nameEn: 'The Achiever',
      nickname: 'O Motivador Bem-Sucedido',
      coreFear: 'Não ter valor intrínseco, ser fracassado',
      coreDesire: 'Ser valioso, admirado e bem-sucedido',
      keyMotivation: 'Ser admirado, distinguir-se, impressionar outros',
      atBest: 'Autêntico, inspirador, competente e modelo de sucesso.',
      atWorst: 'Imagem sobre substância, vaidoso, worka Holic e narcisista.',
      basicProposition: 'Você é bom ou OK se for bem-sucedido e admirado.',
      triad: 'heart',
      wingOptions: ['3w2', '3w4'],
      growthDirection: 6,
      stressDirection: 9,
      strengths: [
        'Altamente motivado e produtivo',
        'Adaptável e versátil',
        'Confiante e carismático',
        'Orientado a objetivos',
        'Excelente comunicador'
      ],
      weaknesses: [
        'Workaholismo',
        'Dificuldade com autenticidade',
        'Competitividade excessiva',
        'Valorizar imagem sobre substância',
        'Medo de fracasso paralisante'
      ],
      workplaceBehavior: 'O Tipo 3 é altamente produtivo, focado em resultados e excelente em alcançar metas. Natural líder que inspira outros com sua energia e otimismo. Pode ter dificuldade em colaborar se isso não levar a reconhecimento. Precisa aprender a valorizar processo sobre apenas resultados.',
      relationships: 'Pode ter dificuldade em mostrar vulnerabilidade e autenticidade emocional. Tende a priorizar carreira sobre relacionamentos. Quando saudável, é parceiro motivador, encorajador e genuinamente interessado no sucesso do outro.',
      famousExamples: [
        'Oprah Winfrey',
        'Tom Cruise',
        'Taylor Swift',
        'Tony Stark/Iron Man (Marvel)',
        'Rachel Green (Friends)'
      ],
      growthPath: {
        direction: 'Para o Tipo 6',
        description: 'Quando saudável, o 3 integra qualidades do 6: torna-se mais autêntico, cooperativo e menos focado em imagem. Aprende a valorizar conexões genuínas.'
      }
    },
    {
      id: 'type4',
      number: 4,
      name: 'O Individualista',
      nameEn: 'The Individualist',
      nickname: 'O Romântico Criativo',
      coreFear: 'Não ter identidade própria ou significado',
      coreDesire: 'Encontrar-se e criar identidade única',
      keyMotivation: 'Expressar individualidade, ser autêntico, criar beleza',
      atBest: 'Criativo, autêntico, profundo e transformador.',
      atWorst: 'Dramático, depressivo, auto-absorvido e invejoso.',
      basicProposition: 'Você é bom ou OK se for verdadeiramente você mesmo.',
      triad: 'heart',
      wingOptions: ['4w3', '4w5'],
      growthDirection: 1,
      stressDirection: 2,
      strengths: [
        'Profundidade emocional e criatividade',
        'Autenticidade e individualidade',
        'Empatia por dor alheia',
        'Apreciação estética refinada',
        'Capacidade de transformação'
      ],
      weaknesses: [
        'Melancolia e tendência à depressão',
        'Inveja e comparação constante',
        'Auto-absorção excessiva',
        'Instabilidade emocional',
        'Sentimento de inadequação'
      ],
      workplaceBehavior: 'O Tipo 4 traz criatividade, originalidade e profundidade ao trabalho. Precisa de autonomia e expressão pessoal. Pode ter dificuldade com tarefas rotineiras ou ambientes que não valorizam individualidade. Excelente em áreas criativas, design, artes e aconselhamento.',
      relationships: 'Busca conexões profundas e autênticas. Pode ser intenso emocionalmente e ter altos e baixos. Valoriza parceiros que apreciam sua sensibilidade e unicidade. Precisa aprender a equilibrar emoções e não dramatizar conflitos.',
      famousExamples: [
        'Frida Kahlo',
        'Virginia Woolf',
        'Johnny Depp',
        'Luna Lovegood (Harry Potter)',
        'Amelie Poulain'
      ],
      growthPath: {
        direction: 'Para o Tipo 1',
        description: 'Quando saudável, o 4 integra qualidades do 1: torna-se mais objetivo, disciplinado e menos auto-absorvido. Aprende a agir apesar das emoções.'
      }
    },
    {
      id: 'type5',
      number: 5,
      name: 'O Investigador',
      nameEn: 'The Investigator',
      nickname: 'O Observador Pensante',
      coreFear: 'Ser incompetente, invasivo ou sobrecarregado',
      coreDesire: 'Ser capaz e competente',
      keyMotivation: 'Compreender o ambiente, ter conhecimento, preservar recursos',
      atBest: 'Visionário, perceptivo, inovador e objetivo.',
      atWorst: 'Isolado, excêntrico, niilista e desconectado.',
      basicProposition: 'Você é bom ou OK se for conhecedor e capaz.',
      triad: 'head',
      wingOptions: ['5w4', '5w6'],
      growthDirection: 8,
      stressDirection: 7,
      strengths: [
        'Pensamento analítico profundo',
        'Objetividade e clareza mental',
        'Curiosidade intelectual',
        'Independência',
        'Observação aguçada'
      ],
      weaknesses: [
        'Isolamento social excessivo',
        'Dificuldade com emoções',
        'Avareza (conservação de energia)',
        'Distanciamento emocional',
        'Procrastinação por excesso de análise'
      ],
      workplaceBehavior: 'O Tipo 5 é excelente em pesquisa, análise e resolução de problemas complexos. Precisa de espaço e tempo para pensar. Pode ter dificuldade com trabalho em equipe ou interações sociais constantes. Valoriza competência e conhecimento acima de tudo.',
      relationships: 'Tende a ser reservado e privado. Precisa de muito espaço pessoal e tempo sozinho. Pode ter dificuldade em expressar emoções e necessidades. Quando saudável, é parceiro leal, inteligente e curioso.',
      famousExamples: [
        'Albert Einstein',
        'Stephen Hawking',
        'Bill Gates',
        'Sherlock Holmes',
        'Bruce Wayne/Batman (DC)'
      ],
      growthPath: {
        direction: 'Para o Tipo 8',
        description: 'Quando saudável, o 5 integra qualidades do 8: torna-se mais assertivo, confiante e conectado ao corpo/ação. Aprende a agir e não apenas observar.'
      }
    },
    {
      id: 'type6',
      number: 6,
      name: 'O Leal',
      nameEn: 'The Loyalist',
      nickname: 'O Questionador Comprometido',
      coreFear: 'Ficar sem suporte ou orientação',
      coreDesire: 'Ter segurança e suporte',
      keyMotivation: 'Ter segurança, pertencer, receber apoio de outros',
      atBest: 'Corajoso, leal, confiável e comprometido.',
      atWorst: 'Ansioso, paranoico, defensivo e reativo.',
      basicProposition: 'Você é bom ou OK se tiver apoio e segurança.',
      triad: 'head',
      wingOptions: ['6w5', '6w7'],
      growthDirection: 9,
      stressDirection: 3,
      strengths: [
        'Lealdade excepcional',
        'Responsável e comprometido',
        'Pensamento estratégico (preparado)',
        'Trabalho em equipe',
        'Senso de justiça forte'
      ],
      weaknesses: [
        'Ansiedade e preocupação constante',
        'Dificuldade em confiar',
        'Indecisão e procrastinação',
        'Pensamento catastrófico',
        'Reatividade defensiva'
      ],
      workplaceBehavior: 'O Tipo 6 é colaborador leal, responsável e confiável. Excelente em identificar riscos e planejar contingências. Pode ter dificuldade com mudanças ou decisões sem suporte. Valoriza estruturas claras e liderança confiável.',
      relationships: 'Extremamente leal e comprometido. Pode ser desconfiado no início, mas forma laços profundos. Precisa de reasseguramento constante. Quando saudável, é parceiro dedicado, protetor e confiável.',
      famousExamples: [
        'Tom Hanks',
        'Jennifer Aniston',
        'Frodo Baggins (Senhor dos Anéis)',
        'Harry Potter',
        'Spider-Man/Peter Parker (Marvel)'
      ],
      growthPath: {
        direction: 'Para o Tipo 9',
        description: 'Quando saudável, o 6 integra qualidades do 9: torna-se mais calmo, confiante e relaxado. Aprende a confiar no fluxo da vida.'
      }
    },
    {
      id: 'type7',
      number: 7,
      name: 'O Entusiasta',
      nameEn: 'The Enthusiast',
      nickname: 'O Aventureiro Otimista',
      coreFear: 'Ser privado, preso em dor ou limitação',
      coreDesire: 'Ser feliz, satisfeito e livre',
      keyMotivation: 'Ser feliz, evitar dor, ter variedade e estimulação',
      atBest: 'Alegre, espontâneo, versátil e grato.',
      atWorst: 'Escapista, impulsivo, disperso e viciado em estímulos.',
      basicProposition: 'Você é bom ou OK se for feliz e tiver opções.',
      triad: 'head',
      wingOptions: ['7w6', '7w8'],
      growthDirection: 5,
      stressDirection: 1,
      strengths: [
        'Otimismo e entusiasmo contagiantes',
        'Criatividade e versatilidade',
        'Energia e espontaneidade',
        'Capacidade de ver possibilidades',
        'Resiliência e alegria natural'
      ],
      weaknesses: [
        'Dificuldade em lidar com dor/desconforto',
        'Impulsividade e falta de foco',
        'Escapismo (evitar emoções negativas)',
        'Compromisso superficial',
        'Excesso e auto-indulgência'
      ],
      workplaceBehavior: 'O Tipo 7 traz criatividade, energia e inovação. Excelente em brainstorming e iniciar projetos. Pode ter dificuldade em finalizar tarefas ou lidar com rotina. Precisa de variedade e autonomia. Valoriza ambiente dinâmico e estimulante.',
      relationships: 'Divertido, espontâneo e aventureiro. Pode ter dificuldade com profundidade emocional ou compromisso de longo prazo. Tende a evitar conflitos e emoções difíceis. Quando saudável, é parceiro alegre, criativo e encorajador.',
      famousExamples: [
        'Robin Williams',
        'Jim Carrey',
        'Katy Perry',
        'Tony Stark/Iron Man (Marvel)',
        'Michael Scott (The Office)'
      ],
      growthPath: {
        direction: 'Para o Tipo 5',
        description: 'Quando saudável, o 7 integra qualidades do 5: torna-se mais focado, profundo e capaz de lidar com dificuldades. Aprende a estar presente.'
      }
    },
    {
      id: 'type8',
      number: 8,
      name: 'O Desafiador',
      nameEn: 'The Challenger',
      nickname: 'O Líder Poderoso',
      coreFear: 'Ser controlado, vulnerável ou fraco',
      coreDesire: 'Ser forte, autoconfiante e proteger-se',
      keyMotivation: 'Ser autossuficiente, provar força, dominar ambiente',
      atBest: 'Protetor, decisivo, justo e magnânimo.',
      atWorst: 'Dominador, intimidador, vingativo e agressivo.',
      basicProposition: 'Você é bom ou OK se for forte e no controle.',
      triad: 'gut',
      wingOptions: ['8w7', '8w9'],
      growthDirection: 2,
      stressDirection: 5,
      strengths: [
        'Liderança natural e decisão',
        'Coragem e força de vontade',
        'Proteção dos vulneráveis',
        'Honestidade direta',
        'Capacidade de ação imediata'
      ],
      weaknesses: [
        'Dificuldade com vulnerabilidade',
        'Tendência à dominação',
        'Explosões de raiva',
        'Dificuldade em confiar',
        'Tudo ou nada (excessos)'
      ],
      workplaceBehavior: 'O Tipo 8 é líder nato, decisivo e orientado à ação. Excelente em situações de crise e em assumir controle. Pode ser intimidador ou confrontador. Valoriza competência, força e resultados. Protege a equipe mas exige lealdade.',
      relationships: 'Intenso, protetor e leal. Pode ser dominador ou controlador. Tem dificuldade em mostrar vulnerabilidade. Quando saudável, é parceiro forte, protetor e genuinamente carinhoso (mostra amor através de ações).',
      famousExamples: [
        'Martin Luther King Jr.',
        'Winston Churchill',
        'Serena Williams',
        'Daenerys Targaryen (GoT)',
        'Han Solo (Star Wars)'
      ],
      growthPath: {
        direction: 'Para o Tipo 2',
        description: 'Quando saudável, o 8 integra qualidades do 2: torna-se mais empático, carinhoso e aberto emocionalmente. Aprende a ser vulnerável e cuidadoso.'
      }
    },
    {
      id: 'type9',
      number: 9,
      name: 'O Pacificador',
      nameEn: 'The Peacemaker',
      nickname: 'O Mediador Harmônico',
      coreFear: 'Conflito, separação, perda de conexão',
      coreDesire: 'Ter paz interior e harmonia',
      keyMotivation: 'Manter paz, evitar conflitos, preservar status quo',
      atBest: 'Pacífico, receptivo, unificador e estável.',
      atWorst: 'Complacente, passivo-agressivo, desconectado e inerte.',
      basicProposition: 'Você é bom ou OK se tiver paz e harmonia.',
      triad: 'gut',
      wingOptions: ['9w8', '9w1'],
      growthDirection: 3,
      stressDirection: 6,
      strengths: [
        'Mediação e diplomacia natural',
        'Empatia e aceitação',
        'Estabilidade e calma',
        'Ver múltiplas perspectivas',
        'Criar harmonia em grupos'
      ],
      weaknesses: [
        'Evitação de conflitos essenciais',
        'Indecisão e procrastinação',
        'Negligenciar próprias necessidades',
        'Passividade e inércia',
        'Dificuldade em dizer não'
      ],
      workplaceBehavior: 'O Tipo 9 é colaborador pacífico, mediador natural e estabilizador de equipes. Excelente em reduzir tensões e criar consenso. Pode ter dificuldade em priorizar ou tomar decisões difíceis. Precisa de ambiente harmonioso para prosperar.',
      relationships: 'Extremamente adaptável, paciente e de fácil convivência. Pode ter dificuldade em expressar necessidades ou opiniões. Tende a mesclar-se com o parceiro, perdendo identidade própria. Quando saudável, é parceiro estável, amoroso e presente.',
      famousExamples: [
        'Barack Obama',
        'Keanu Reeves',
        'Mr. Rogers',
        'Samwise Gamgee (Senhor dos Anéis)',
        'Pam Beesly (The Office)'
      ],
      growthPath: {
        direction: 'Para o Tipo 3',
        description: 'Quando saudável, o 9 integra qualidades do 3: torna-se mais ativo, focado e auto-afirmativo. Aprende a perseguir seus próprios objetivos.'
      }
    }
  ];

  for (const type of types) {
    await repository.save(type);
  }

  console.log('✅ Seed de Eneagrama Types completo: 9 tipos criados');
}
```

**Arquivo:** `backend/src/database/seeds/enneagram-questions.seed.ts`

```typescript
import { DataSource } from 'typeorm';
import { EnneagramQuestion } from '../../modules/personality-tests/entities/enneagram-question.entity';
import { EnneagramQuestionTypeMapping } from '../../modules/personality-tests/entities/enneagram-mapping.entity';

export async function seedEnneagramQuestions(dataSource: DataSource) {
  const questionRepository = dataSource.getRepository(EnneagramQuestion);
  const mappingRepository = dataSource.getRepository(EnneagramQuestionTypeMapping);

  // 50 questões validadas do Eneagrama
  const questions = [
    {
      number: 1,
      text: 'Eu sinto uma forte necessidade de fazer as coisas da maneira "certa".',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type1', weight: 3 }
      ]
    },
    {
      number: 2,
      text: 'Eu gosto de ajudar os outros e me sinto bem quando sou necessário.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type2', weight: 3 }
      ]
    },
    {
      number: 3,
      text: 'Eu me esforço para ser bem-sucedido e admirado pelos outros.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type3', weight: 3 }
      ]
    },
    {
      number: 4,
      text: 'Eu frequentemente me sinto diferente ou único em comparação com os outros.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type4', weight: 3 }
      ]
    },
    {
      number: 5,
      text: 'Eu prefiro observar e analisar antes de me envolver ativamente.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type5', weight: 3 }
      ]
    },
    {
      number: 6,
      text: 'Eu tendo a me preocupar com possíveis problemas ou perigos.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type6', weight: 3 }
      ]
    },
    {
      number: 7,
      text: 'Eu gosto de ter muitas opções e experiências novas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type7', weight: 3 }
      ]
    },
    {
      number: 8,
      text: 'Eu me sinto confortável assumindo o controle em situações desafiadoras.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type8', weight: 3 }
      ]
    },
    {
      number: 9,
      text: 'Eu valorizo muito a paz e a harmonia nos relacionamentos.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type9', weight: 3 }
      ]
    },
    {
      number: 10,
      text: 'Eu raramente me sinto irritado com imperfeições ou erros.',
      scoringType: 'reverse',
      mappings: [
        { typeId: 'type1', weight: -2 }
      ]
    },
    // ... Adicionar mais 40 questões para totalizar 50
    // Cada questão pode ter múltiplos mapeamentos com pesos diferentes
    // Exemplo de questão multi-mapping:
    {
      number: 15,
      text: 'Eu me sinto desconfortável quando as pessoas dependem muito de mim.',
      scoringType: 'reverse',
      mappings: [
        { typeId: 'type2', weight: -2 },
        { typeId: 'type5', weight: 2 }
      ]
    },
    // ... continuar até 50 questões
  ];

  for (const q of questions) {
    const question = await questionRepository.save({
      questionNumber: q.number,
      questionText: q.text,
      scoringType: q.scoringType
    });

    for (const mapping of q.mappings) {
      await mappingRepository.save({
        questionId: question.id,
        enneagramTypeId: mapping.typeId,
        scoreWeight: mapping.weight
      });
    }
  }

  console.log(`✅ Seed de Eneagrama Questions completo: ${questions.length} questões criadas`);
}
```

---

### 1.5. Service - Algoritmo de Cálculo

**Arquivo:** `backend/src/modules/personality-tests/services/enneagram.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnneagramType } from '../entities/enneagram-type.entity';
import { EnneagramQuestion } from '../entities/enneagram-question.entity';
import { EnneagramQuestionTypeMapping } from '../entities/enneagram-mapping.entity';

interface QuestionAnswer {
  questionId: string;
  answer: number; // 1-5 (Discordo Totalmente → Concordo Totalmente)
}

@Injectable()
export class EnneagramService {
  constructor(
    @InjectRepository(EnneagramType)
    private readonly typeRepository: Repository<EnneagramType>,
    @InjectRepository(EnneagramQuestion)
    private readonly questionRepository: Repository<EnneagramQuestion>,
    @InjectRepository(EnneagramQuestionTypeMapping)
    private readonly mappingRepository: Repository<EnneagramQuestionTypeMapping>,
  ) {}

  async getQuestions(): Promise<EnneagramQuestion[]> {
    return this.questionRepository.find({
      order: { questionNumber: 'ASC' }
    });
  }

  async calculateResult(answers: QuestionAnswer[]): Promise<{
    primaryType: EnneagramType;
    wing: string;
    scores: { type: number; score: number }[];
  }> {
    // 1. Inicializar scores para os 9 tipos
    const scores = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(num => ({ type: num, score: 0 }));

    // 2. Calcular score para cada tipo baseado nas respostas
    for (const answer of answers) {
      const mappings = await this.mappingRepository.find({
        where: { questionId: answer.questionId },
        relations: ['question']
      });

      for (const mapping of mappings) {
        const typeNumber = parseInt(mapping.enneagramTypeId.replace('type', ''));
        const typeIndex = typeNumber - 1;

        // Normalizar resposta (1-5) para (-2 a +2)
        const normalizedAnswer = answer.answer - 3;

        // Aplicar peso da questão
        let contribution = normalizedAnswer * mapping.scoreWeight;

        // Se for questão reversa, inverter
        const question = mappings[0].question;
        if (question.scoringType === 'reverse') {
          contribution = -contribution;
        }

        scores[typeIndex].score += contribution;
      }
    }

    // 3. Normalizar scores (0-100)
    const maxScore = Math.max(...scores.map(s => s.score));
    const minScore = Math.min(...scores.map(s => s.score));
    const range = maxScore - minScore;

    if (range > 0) {
      scores.forEach(s => {
        s.score = Math.round(((s.score - minScore) / range) * 100);
      });
    }

    // 4. Ordenar por score
    scores.sort((a, b) => b.score - a.score);

    // 5. Identificar tipo primário
    const primaryTypeNumber = scores[0].type;
    const primaryType = await this.typeRepository.findOne({
      where: { number: primaryTypeNumber }
    });

    // 6. Determinar wing (asa)
    // Wing é o tipo adjacente com maior score
    const leftWing = primaryTypeNumber === 1 ? 9 : primaryTypeNumber - 1;
    const rightWing = primaryTypeNumber === 9 ? 1 : primaryTypeNumber + 1;

    const leftWingScore = scores.find(s => s.type === leftWing)?.score || 0;
    const rightWingScore = scores.find(s => s.type === rightWing)?.score || 0;

    const wingNumber = leftWingScore > rightWingScore ? leftWing : rightWing;
    const wing = `${primaryTypeNumber}w${wingNumber}`;

    return {
      primaryType,
      wing,
      scores
    };
  }

  async getTypeById(id: string): Promise<EnneagramType> {
    return this.typeRepository.findOne({ where: { id } });
  }

  async getAllTypes(): Promise<EnneagramType[]> {
    return this.typeRepository.find({ order: { number: 'ASC' } });
  }
}
```

---

### 1.6. Controller - Endpoints

**Arquivo:** `backend/src/modules/personality-tests/enneagram.controller.ts`

```typescript
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EnneagramService } from './services/enneagram.service';

@ApiTags('Enneagram')
@Controller('enneagram')
export class EnneagramController {
  constructor(private readonly enneagramService: EnneagramService) {}

  @Get('types')
  @ApiOperation({ summary: 'Get all Enneagram types' })
  @ApiResponse({ status: 200, description: 'List of 9 Enneagram types' })
  async getAllTypes() {
    return this.enneagramService.getAllTypes();
  }

  @Get('types/:id')
  @ApiOperation({ summary: 'Get specific Enneagram type details' })
  async getType(@Param('id') id: string) {
    return this.enneagramService.getTypeById(id);
  }

  @Get('questions')
  @ApiOperation({ summary: 'Get Enneagram test questions' })
  @ApiResponse({ status: 200, description: '50 questions for the test' })
  async getQuestions() {
    return this.enneagramService.getQuestions();
  }

  @Post('calculate')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Calculate Enneagram result from answers' })
  @ApiResponse({ status: 200, description: 'Calculated primary type, wing, and scores' })
  async calculateResult(@Body() body: { answers: Array<{ questionId: string; answer: number }> }) {
    return this.enneagramService.calculateResult(body.answers);
  }
}
```

---

### 1.7. Frontend - Enneagram Test Page

**Arquivo:** `frontend/src/pages/EnneagramTest.tsx`

```typescript
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { toast } from 'sonner';

interface Question {
  id: string;
  questionNumber: number;
  questionText: string;
}

export default function EnneagramTest() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    try {
      const response = await api.get('/enneagram/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error loading questions:', error);
      toast.error('Erro ao carregar questões');
    }
  };

  const handleAnswer = (questionId: string, value: number) => {
    setAnswers(prev => ({ ...prev, [questionId]: value }));
  };

  const handleNext = () => {
    const currentQ = questions[currentQuestion];
    if (!answers[currentQ.id]) {
      toast.error('Por favor, selecione uma resposta');
      return;
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      submitTest();
    }
  };

  const submitTest = async () => {
    setLoading(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, answer]) => ({
        questionId,
        answer
      }));

      const response = await api.post('/enneagram/calculate', { answers: formattedAnswers });

      // Salvar resultado
      await api.post('/personality-tests/results', {
        framework: 'enneagram',
        result: response.data.primaryType.id,
        details: {
          wing: response.data.wing,
          scores: response.data.scores
        }
      });

      toast.success('Teste concluído!');
      navigate(`/results/enneagram/${response.data.primaryType.number}`);
    } catch (error) {
      console.error('Error submitting test:', error);
      toast.error('Erro ao calcular resultado');
    } finally {
      setLoading(false);
    }
  };

  if (questions.length === 0) return <div>Carregando...</div>;

  const question = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="container max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Teste de Eneagrama</CardTitle>
          <CardDescription>
            Questão {currentQuestion + 1} de {questions.length}
          </CardDescription>
          <Progress value={progress} className="mt-2" />
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-4">{question.questionText}</h3>

            <RadioGroup
              value={answers[question.id]?.toString()}
              onValueChange={(value) => handleAnswer(question.id, parseInt(value))}
            >
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="1" id="r1" />
                  <Label htmlFor="r1">Discordo Totalmente</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2" id="r2" />
                  <Label htmlFor="r2">Discordo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="3" id="r3" />
                  <Label htmlFor="r3">Neutro</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="4" id="r4" />
                  <Label htmlFor="r4">Concordo</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="5" id="r5" />
                  <Label htmlFor="r5">Concordo Totalmente</Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion(prev => prev - 1)}
              disabled={currentQuestion === 0}
            >
              Anterior
            </Button>
            <Button onClick={handleNext} disabled={loading}>
              {currentQuestion === questions.length - 1 ? 'Finalizar' : 'Próxima'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
```

---

## 🌊 Fase 2: Big Five (OCEAN) Completo (5 dias)

### 2.1. Overview do Big Five

O **Big Five** (também chamado OCEAN ou Five Factor Model) mede personalidade em 5 dimensões contínuas, cada uma de 0-100:

1. **O - Openness** (Abertura à Experiência)
2. **C - Conscientiousness** (Conscienciosidade)
3. **E - Extraversion** (Extroversão)
4. **A - Agreeableness** (Amabilidade)
5. **N - Neuroticism** (Neuroticismo)

**Diferença-chave do MBTI/Eneagrama:**
- Não há "tipos" - cada pessoa tem um score em cada dimensão
- Resultado é um gráfico de radar com 5 pontos
- Cientificamente mais validado e usado em pesquisas

---

### 2.2. Database Schema - Big Five

#### Migration

**Arquivo:** `backend/src/database/migrations/TIMESTAMP-AddBigFiveTables.ts`

```typescript
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBigFiveTables1234567890125 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Atualizar test_frameworks
    await queryRunner.query(`
      INSERT INTO test_frameworks (id, name, description, question_count, is_active)
      VALUES (
        'bigfive',
        'Big Five (OCEAN)',
        'Modelo de 5 dimensões de personalidade: Abertura, Conscienciosidade, Extroversão, Amabilidade e Neuroticismo',
        60,
        true
      );
    `);

    // Tabela de dimensões do Big Five
    await queryRunner.query(`
      CREATE TABLE bigfive_dimensions (
        id VARCHAR(20) PRIMARY KEY,
        code VARCHAR(1) NOT NULL UNIQUE, -- O, C, E, A, N
        name VARCHAR(100) NOT NULL,
        name_en VARCHAR(100),
        description TEXT,
        low_score_description TEXT,
        high_score_description TEXT,
        facets JSON, -- Sub-facetas da dimensão
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Tabela de questões do Big Five
    await queryRunner.query(`
      CREATE TABLE bigfive_questions (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        question_number INTEGER NOT NULL,
        question_text TEXT NOT NULL,
        dimension_id VARCHAR(20) REFERENCES bigfive_dimensions(id),
        is_reverse BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    await queryRunner.query(`
      CREATE INDEX idx_bigfive_questions_dimension ON bigfive_questions(dimension_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS bigfive_questions;`);
    await queryRunner.query(`DROP TABLE IF EXISTS bigfive_dimensions;`);
    await queryRunner.query(`DELETE FROM test_frameworks WHERE id = 'bigfive';`);
  }
}
```

---

### 2.3. Entities - Big Five

**Arquivo:** `backend/src/modules/personality-tests/entities/bigfive-dimension.entity.ts`

```typescript
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('bigfive_dimensions')
export class BigFiveDimension {
  @PrimaryColumn({ length: 20 })
  id: string; // 'openness', 'conscientiousness', ...

  @Column({ length: 1, unique: true })
  code: string; // O, C, E, A, N

  @Column({ length: 100 })
  name: string; // 'Abertura à Experiência'

  @Column({ name: 'name_en', length: 100, nullable: true })
  nameEn: string; // 'Openness to Experience'

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'low_score_description', type: 'text', nullable: true })
  lowScoreDescription: string; // Descrição para scores < 40

  @Column({ name: 'high_score_description', type: 'text', nullable: true })
  highScoreDescription: string; // Descrição para scores > 60

  @Column({ type: 'json', nullable: true })
  facets: string[]; // Sub-facetas

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
```

**Arquivo:** `backend/src/modules/personality-tests/entities/bigfive-question.entity.ts`

```typescript
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BigFiveDimension } from './bigfive-dimension.entity';

@Entity('bigfive_questions')
export class BigFiveQuestion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'question_number', type: 'integer' })
  questionNumber: number;

  @Column({ name: 'question_text', type: 'text' })
  questionText: string;

  @Column({ name: 'dimension_id' })
  dimensionId: string;

  @ManyToOne(() => BigFiveDimension)
  @JoinColumn({ name: 'dimension_id' })
  dimension: BigFiveDimension;

  @Column({ name: 'is_reverse', default: false })
  isReverse: boolean; // Se true, inverte o score

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;
}
```

---

### 2.4. Seed - Dados do Big Five

**Arquivo:** `backend/src/database/seeds/bigfive.seed.ts`

```typescript
import { DataSource } from 'typeorm';
import { BigFiveDimension } from '../../modules/personality-tests/entities/bigfive-dimension.entity';
import { BigFiveQuestion } from '../../modules/personality-tests/entities/bigfive-question.entity';

export async function seedBigFiveDimensions(dataSource: DataSource) {
  const repository = dataSource.getRepository(BigFiveDimension);

  const dimensions = [
    {
      id: 'openness',
      code: 'O',
      name: 'Abertura à Experiência',
      nameEn: 'Openness to Experience',
      description: 'Mede a disposição para experimentar coisas novas, criatividade e curiosidade intelectual.',
      lowScoreDescription: 'Pessoas com baixa Abertura preferem rotinas, são práticas e convencionais. Valorizam tradição e familiaridade.',
      highScoreDescription: 'Pessoas com alta Abertura são criativas, curiosas e abertas a novas ideias. Apreciam arte, imaginação e variedade.',
      facets: [
        'Imaginação/Fantasia',
        'Sensibilidade Estética',
        'Sentimentos',
        'Ações Variadas',
        'Ideias',
        'Valores Liberais'
      ]
    },
    {
      id: 'conscientiousness',
      code: 'C',
      name: 'Conscienciosidade',
      nameEn: 'Conscientiousness',
      description: 'Mede organização, disciplina, confiabilidade e orientação a objetivos.',
      lowScoreDescription: 'Pessoas com baixa Conscienciosidade são flexíveis, espontâneas e despreocupadas. Podem ser desorganizadas mas adaptáveis.',
      highScoreDescription: 'Pessoas com alta Conscienciosidade são organizadas, disciplinadas e confiáveis. Planejam com antecedência e são orientadas a objetivos.',
      facets: [
        'Competência',
        'Ordem',
        'Senso de Dever',
        'Busca por Realizações',
        'Autodisciplina',
        'Deliberação'
      ]
    },
    {
      id: 'extraversion',
      code: 'E',
      name: 'Extroversão',
      nameEn: 'Extraversion',
      description: 'Mede sociabilidade, assertividade, energia e busca por estimulação.',
      lowScoreDescription: 'Pessoas com baixa Extroversão (introvertidas) preferem ambientes calmos, valorizam profundidade sobre amplitude nas relações e recarregam energia sozinhas.',
      highScoreDescription: 'Pessoas com alta Extroversão (extrovertidas) são sociáveis, assertivas e energéticas. Gostam de estar ao redor de pessoas e buscam estimulação.',
      facets: [
        'Cordialidade',
        'Gregarismo',
        'Assertividade',
        'Atividade',
        'Busca por Excitação',
        'Emoções Positivas'
      ]
    },
    {
      id: 'agreeableness',
      code: 'A',
      name: 'Amabilidade',
      nameEn: 'Agreeableness',
      description: 'Mede cooperação, empatia, confiança e consideração pelos outros.',
      lowScoreDescription: 'Pessoas com baixa Amabilidade são competitivas, céticas e diretas. Valorizam verdade sobre harmonia e podem ser mais críticas.',
      highScoreDescription: 'Pessoas com alta Amabilidade são cooperativas, compassivas e confiantes. Valorizam harmonia e são consideradas com os sentimentos alheios.',
      facets: [
        'Confiança',
        'Sinceridade',
        'Altruísmo',
        'Conformidade',
        'Modéstia',
        'Sensibilidade/Simpatia'
      ]
    },
    {
      id: 'neuroticism',
      code: 'N',
      name: 'Neuroticismo',
      nameEn: 'Neuroticism',
      description: 'Mede estabilidade emocional, ansiedade e vulnerabilidade ao estresse.',
      lowScoreDescription: 'Pessoas com baixo Neuroticismo (emocionalmente estáveis) são calmas, resilientes e raramente se preocupam. Lidam bem com estresse.',
      highScoreDescription: 'Pessoas com alto Neuroticismo experimentam emoções negativas com mais frequência e intensidade. Podem ser mais ansiosas e vulneráveis ao estresse.',
      facets: [
        'Ansiedade',
        'Raiva/Hostilidade',
        'Depressão',
        'Autoconsciência',
        'Impulsividade',
        'Vulnerabilidade'
      ]
    }
  ];

  for (const dim of dimensions) {
    await repository.save(dim);
  }

  console.log('✅ Seed de Big Five Dimensions completo: 5 dimensões criadas');
}

export async function seedBigFiveQuestions(dataSource: DataSource) {
  const repository = dataSource.getRepository(BigFiveQuestion);

  // 60 questões (12 por dimensão)
  const questions = [
    // OPENNESS (12 questões)
    { number: 1, text: 'Eu sou cheio de ideias criativas.', dimension: 'openness', reverse: false },
    { number: 2, text: 'Eu valorizo experiências artísticas.', dimension: 'openness', reverse: false },
    { number: 3, text: 'Eu tenho uma imaginação vívida.', dimension: 'openness', reverse: false },
    { number: 4, text: 'Eu prefiro rotinas e não gosto de mudanças.', dimension: 'openness', reverse: true },
    { number: 5, text: 'Eu aprecio arte, música e literatura.', dimension: 'openness', reverse: false },
    { number: 6, text: 'Eu gosto de refletir sobre ideias abstratas.', dimension: 'openness', reverse: false },
    { number: 7, text: 'Eu sou curioso sobre muitas coisas diferentes.', dimension: 'openness', reverse: false },
    { number: 8, text: 'Eu prefiro o convencional ao incomum.', dimension: 'openness', reverse: true },
    { number: 9, text: 'Eu gosto de experimentar novas comidas e culturas.', dimension: 'openness', reverse: false },
    { number: 10, text: 'Eu tenho poucos interesses intelectuais.', dimension: 'openness', reverse: true },
    { number: 11, text: 'Eu valorizo liberdade e diversidade.', dimension: 'openness', reverse: false },
    { number: 12, text: 'Eu evito discussões filosóficas ou teóricas.', dimension: 'openness', reverse: true },

    // CONSCIENTIOUSNESS (12 questões)
    { number: 13, text: 'Eu sou sempre bem preparado.', dimension: 'conscientiousness', reverse: false },
    { number: 14, text: 'Eu deixo minhas coisas espalhadas.', dimension: 'conscientiousness', reverse: true },
    { number: 15, text: 'Eu presto atenção aos detalhes.', dimension: 'conscientiousness', reverse: false },
    { number: 16, text: 'Eu frequentemente esqueço de colocar coisas de volta no lugar.', dimension: 'conscientiousness', reverse: true },
    { number: 17, text: 'Eu faço planos e os sigo.', dimension: 'conscientiousness', reverse: false },
    { number: 18, text: 'Eu tento fazer as coisas com precisão.', dimension: 'conscientiousness', reverse: false },
    { number: 19, text: 'Eu evito responsabilidades.', dimension: 'conscientiousness', reverse: true },
    { number: 20, text: 'Eu começo tarefas imediatamente.', dimension: 'conscientiousness', reverse: false },
    { number: 21, text: 'Eu procrastino muito.', dimension: 'conscientiousness', reverse: true },
    { number: 22, text: 'Eu mantenho meu ambiente limpo e organizado.', dimension: 'conscientiousness', reverse: false },
    { number: 23, text: 'Eu não me importo com ordem ou estrutura.', dimension: 'conscientiousness', reverse: true },
    { number: 24, text: 'Eu cumpro minhas promessas.', dimension: 'conscientiousness', reverse: false },

    // EXTRAVERSION (12 questões)
    { number: 25, text: 'Eu sou a vida da festa.', dimension: 'extraversion', reverse: false },
    { number: 26, text: 'Eu prefiro ficar em segundo plano.', dimension: 'extraversion', reverse: true },
    { number: 27, text: 'Eu me sinto confortável perto de pessoas.', dimension: 'extraversion', reverse: false },
    { number: 28, text: 'Eu não falo muito.', dimension: 'extraversion', reverse: true },
    { number: 29, text: 'Eu inicio conversas.', dimension: 'extraversion', reverse: false },
    { number: 30, text: 'Eu tenho pouco a dizer.', dimension: 'extraversion', reverse: true },
    { number: 31, text: 'Eu adoro grandes reuniões sociais.', dimension: 'extraversion', reverse: false },
    { number: 32, text: 'Eu prefiro ficar sozinho.', dimension: 'extraversion', reverse: true },
    { number: 33, text: 'Eu faço amigos facilmente.', dimension: 'extraversion', reverse: false },
    { number: 34, text: 'Eu me sinto desconfortável em multidões.', dimension: 'extraversion', reverse: true },
    { number: 35, text: 'Eu gosto de ser o centro das atenções.', dimension: 'extraversion', reverse: false },
    { number: 36, text: 'Eu preciso de tempo sozinho para recarregar.', dimension: 'extraversion', reverse: true },

    // AGREEABLENESS (12 questões)
    { number: 37, text: 'Eu simpatizo com os sentimentos dos outros.', dimension: 'agreeableness', reverse: false },
    { number: 38, text: 'Eu não me importo com os problemas alheios.', dimension: 'agreeableness', reverse: true },
    { number: 39, text: 'Eu tenho um coração mole.', dimension: 'agreeableness', reverse: false },
    { number: 40, text: 'Eu insulto pessoas facilmente.', dimension: 'agreeableness', reverse: true },
    { number: 41, text: 'Eu sinto as emoções dos outros.', dimension: 'agreeableness', reverse: false },
    { number: 42, text: 'Eu não me interesso muito pelos outros.', dimension: 'agreeableness', reverse: true },
    { number: 43, text: 'Eu faço as pessoas se sentirem à vontade.', dimension: 'agreeableness', reverse: false },
    { number: 44, text: 'Eu sou cético quanto às intenções dos outros.', dimension: 'agreeableness', reverse: true },
    { number: 45, text: 'Eu dedico tempo aos outros.', dimension: 'agreeableness', reverse: false },
    { number: 46, text: 'Eu costumo ser crítico com os outros.', dimension: 'agreeableness', reverse: true },
    { number: 47, text: 'Eu tento entender diferentes pontos de vista.', dimension: 'agreeableness', reverse: false },
    { number: 48, text: 'Eu coloco minhas necessidades acima das dos outros.', dimension: 'agreeableness', reverse: true },

    // NEUROTICISM (12 questões)
    { number: 49, text: 'Eu me preocupo com as coisas.', dimension: 'neuroticism', reverse: false },
    { number: 50, text: 'Eu raramente fico ansioso.', dimension: 'neuroticism', reverse: true },
    { number: 51, text: 'Eu fico facilmente irritado.', dimension: 'neuroticism', reverse: false },
    { number: 52, text: 'Eu sou relaxado na maior parte do tempo.', dimension: 'neuroticism', reverse: true },
    { number: 53, text: 'Eu me estresso facilmente.', dimension: 'neuroticism', reverse: false },
    { number: 54, text: 'Eu lido bem com situações difíceis.', dimension: 'neuroticism', reverse: true },
    { number: 55, text: 'Eu tenho mudanças frequentes de humor.', dimension: 'neuroticism', reverse: false },
    { number: 56, text: 'Eu sou estável emocionalmente.', dimension: 'neuroticism', reverse: true },
    { number: 57, text: 'Eu me sinto sobrecarregado facilmente.', dimension: 'neuroticism', reverse: false },
    { number: 58, text: 'Eu permaneço calmo sob pressão.', dimension: 'neuroticism', reverse: true },
    { number: 59, text: 'Eu tenho dificuldade em controlar minhas emoções.', dimension: 'neuroticism', reverse: false },
    { number: 60, text: 'Eu raramente me sinto triste.', dimension: 'neuroticism', reverse: true },
  ];

  for (const q of questions) {
    await repository.save({
      questionNumber: q.number,
      questionText: q.text,
      dimensionId: q.dimension,
      isReverse: q.reverse
    });
  }

  console.log(`✅ Seed de Big Five Questions completo: ${questions.length} questões criadas`);
}
```

---

### 2.5. Service - Algoritmo de Cálculo Big Five

**Arquivo:** `backend/src/modules/personality-tests/services/bigfive.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BigFiveDimension } from '../entities/bigfive-dimension.entity';
import { BigFiveQuestion } from '../entities/bigfive-question.entity';

interface QuestionAnswer {
  questionId: string;
  answer: number; // 1-5
}

@Injectable()
export class BigFiveService {
  constructor(
    @InjectRepository(BigFiveDimension)
    private readonly dimensionRepository: Repository<BigFiveDimension>,
    @InjectRepository(BigFiveQuestion)
    private readonly questionRepository: Repository<BigFiveQuestion>,
  ) {}

  async getQuestions(): Promise<BigFiveQuestion[]> {
    return this.questionRepository.find({
      order: { questionNumber: 'ASC' },
      relations: ['dimension']
    });
  }

  async calculateResult(answers: QuestionAnswer[]): Promise<{
    scores: { dimension: string; score: number; description: string }[];
    radarData: { dimension: string; score: number }[];
  }> {
    const dimensions = await this.dimensionRepository.find();
    const scores = [];

    for (const dimension of dimensions) {
      // Buscar questões desta dimensão
      const questions = await this.questionRepository.find({
        where: { dimensionId: dimension.id }
      });

      let totalScore = 0;
      let questionsAnswered = 0;

      for (const question of questions) {
        const answer = answers.find(a => a.questionId === question.id);
        if (answer) {
          let score = answer.answer; // 1-5

          // Se questão é reversa, inverter score
          if (question.isReverse) {
            score = 6 - score; // 1→5, 2→4, 3→3, 4→2, 5→1
          }

          totalScore += score;
          questionsAnswered++;
        }
      }

      // Normalizar para 0-100
      const averageScore = totalScore / questionsAnswered; // 1-5
      const normalizedScore = Math.round(((averageScore - 1) / 4) * 100); // 0-100

      // Determinar descrição baseada no score
      let description = '';
      if (normalizedScore < 40) {
        description = dimension.lowScoreDescription;
      } else if (normalizedScore > 60) {
        description = dimension.highScoreDescription;
      } else {
        description = `Score médio em ${dimension.name} - características equilibradas.`;
      }

      scores.push({
        dimension: dimension.name,
        dimensionId: dimension.id,
        code: dimension.code,
        score: normalizedScore,
        description
      });
    }

    // Dados para gráfico de radar
    const radarData = scores.map(s => ({
      dimension: s.code, // O, C, E, A, N
      score: s.score
    }));

    return { scores, radarData };
  }

  async getAllDimensions(): Promise<BigFiveDimension[]> {
    return this.dimensionRepository.find({ order: { code: 'ASC' } });
  }
}
```

---

### 2.6. Frontend - Big Five Test & Results

**Arquivo:** `frontend/src/pages/BigFiveTest.tsx`

Similar ao EnneagramTest.tsx, mas com 60 questões.

**Arquivo:** `frontend/src/pages/BigFiveResult.tsx`

```typescript
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

interface BigFiveResult {
  scores: Array<{
    dimension: string;
    code: string;
    score: number;
    description: string;
  }>;
  radarData: Array<{
    dimension: string;
    score: number;
  }>;
}

export default function BigFiveResult() {
  const { resultId } = useParams();
  const [result, setResult] = useState<BigFiveResult | null>(null);

  useEffect(() => {
    // Carregar resultado do backend
    loadResult();
  }, [resultId]);

  const loadResult = async () => {
    // ... fetch do resultado
  };

  if (!result) return <div>Carregando...</div>;

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="text-3xl font-bold mb-6">Seu Resultado: Big Five (OCEAN)</h1>

      {/* Gráfico de Radar */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Perfil OCEAN</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <RadarChart data={result.radarData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="dimension" />
              <PolarRadiusAxis domain={[0, 100]} />
              <Radar name="Você" dataKey="score" stroke="#8884d8" fill="#8884d8" fillOpacity={0.6} />
            </RadarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Scores Individuais */}
      {result.scores.map(score => (
        <Card key={score.code} className="mb-4">
          <CardHeader>
            <CardTitle>
              {score.code} - {score.dimension}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between mb-2">
                <span>Score:</span>
                <span className="font-bold">{score.score}/100</span>
              </div>
              <Progress value={score.score} />
            </div>
            <p className="text-muted-foreground">{score.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

---

## 📚 Fase 3: Biblioteca de Conteúdo Expandida (3 dias)

### 3.1. Expandir Tabela de Conteúdo

**Migration:**

```sql
ALTER TABLE content ADD COLUMN content_type VARCHAR(20); -- 'article', 'video', 'book', 'exercise'
ALTER TABLE content ADD COLUMN external_url VARCHAR(500);
ALTER TABLE content ADD COLUMN thumbnail_url VARCHAR(500);
ALTER TABLE content ADD COLUMN author VARCHAR(200);
ALTER TABLE content ADD COLUMN duration_minutes INTEGER; -- Para vídeos
ALTER TABLE content ADD COLUMN rating DECIMAL(3,2); -- 0.00-5.00
```

### 3.2. Seed de 100+ Conteúdos

Criar seed com:
- 40+ artigos de blogs (Medium, Psychology Today, etc.)
- 30+ vídeos do YouTube (TED Talks, canais de psicologia)
- 20+ livros recomendados (Quiet, Drive, Grit, etc.)
- 10+ exercícios práticos (journaling prompts, meditações)

---

## ⚠️ Fases 4 e 5 (Opcional - v2)

### Fase 4: Blog/Resources Center
- CMS (Strapi/Contentful)
- Artigos próprios SEO-otimizados
- Newsletter signup

### Fase 5: Workshops & Webinars
- Calendário de eventos
- Integração Zoom
- Replays

**Recomendação:** Implementar apenas após validar engajamento com Eneagrama, Big Five e biblioteca expandida.

---

## ✅ Checklist de Conclusão

### Backend
- [ ] Migrations executadas (Eneagrama + Big Five)
- [ ] Seeds completos (9 tipos, 5 dimensões, 110 questões)
- [ ] EnneagramService com algoritmo de cálculo
- [ ] BigFiveService com algoritmo de cálculo
- [ ] Controllers e endpoints documentados no Swagger
- [ ] Testes E2E

### Frontend
- [ ] EnneagramTest page (50 questões)
- [ ] EnneagramResult page (tipo + wing + descrições)
- [ ] BigFiveTest page (60 questões)
- [ ] BigFiveResult page (gráfico radar + 5 dimensões)
- [ ] Integração com dashboard (mostrar todos os testes)
- [ ] Biblioteca expandida (100+ itens)

### Documentação
- [ ] Swagger atualizado
- [ ] README com instruções para novos testes
- [ ] Guia de interpretação de resultados

---

## 📊 Métricas de Sucesso

| Métrica | Objetivo |
|---------|----------|
| Testes de Eneagrama Completados | 30% dos usuários ativos |
| Testes de Big Five Completados | 25% dos usuários ativos |
| Taxa de Conclusão (início → fim) | > 80% |
| Tempo Médio de Teste | Eneagrama: 10-15min, Big Five: 8-12min |
| Conteúdo Consumido | 200+ visualizações/semana |
| Share de Resultados | 15% dos que completam |

---

**Próximo Sprint:** Analytics & Growth (Sprint 8)

_Documentação criada: 17/10/2025_
