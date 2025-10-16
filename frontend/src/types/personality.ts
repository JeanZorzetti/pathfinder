/**
 * MBTI Personality Types System
 *
 * Este arquivo define todos os tipos TypeScript para o sistema de
 * resultados de personalidade MBTI com conteúdo 100% gratuito após cadastro.
 */

// ============================================================================
// MBTI Base Types
// ============================================================================

export type MBTICode =
  | 'INTJ' | 'INTP' | 'ENTJ' | 'ENTP'  // Analysts (NT)
  | 'INFJ' | 'INFP' | 'ENFJ' | 'ENFP'  // Diplomats (NF)
  | 'ISTJ' | 'ISFJ' | 'ESTJ' | 'ESFJ'  // Sentinels (SJ)
  | 'ISTP' | 'ISFP' | 'ESTP' | 'ESFP'; // Explorers (SP)

export type FunctionPosition = 'dominant' | 'auxiliary' | 'tertiary' | 'inferior';

export type FunctionCode = 'Ni' | 'Ne' | 'Si' | 'Se' | 'Ti' | 'Te' | 'Fi' | 'Fe';

export type MBTIGroup = 'Analysts' | 'Diplomats' | 'Sentinels' | 'Explorers';

// ============================================================================
// Cognitive Functions
// ============================================================================

export interface CognitiveFunction {
  position: FunctionPosition;
  name: FunctionCode;
  fullName: string;
  icon: string;
  description: string;
  details: string;
}

// ============================================================================
// Strengths & Weaknesses
// ============================================================================

export interface Strength {
  title: string;
  description: string;
  example?: string;
  icon: string;
}

export interface Weakness {
  title: string;
  description: string;
  mitigation?: string;  // Só presente em conteúdo gated
  icon: string;
}

// ============================================================================
// Career Information
// ============================================================================

export interface Career {
  title: string;
  fit: number;  // 0-100 percentage
  description: string;
  whyItFits: string[];
  icon: string;
  // Campos adicionais para carreiras gated (detalhadas)
  environment?: string;
  salary?: string;
  progression?: string;
  challenges?: string[];
  dayToDay?: string;
}

// ============================================================================
// Famous People
// ============================================================================

export interface FamousPerson {
  name: string;
  description: string;
  photo: string;
  category?: 'historical' | 'contemporary' | 'fictional';
}

// ============================================================================
// Gated Content (Disponível com cadastro gratuito)
// ============================================================================

export interface GatedContent<T> {
  isGated: boolean;
  preview: string;  // Preview de ~100 palavras para não-cadastrados
  content: T;
}

// Relationships Content Structure
export interface RelationshipsContent {
  lovingStyle: string;
  friendshipStyle: string;
  compatibility: {
    best: MBTICode[];
    good: MBTICode[];
    challenging: MBTICode[];
  };
  compatibilityDetails: {
    [key in MBTICode]?: {
      score: number;
      why: string;
      challenges: string;
      tips: string;
    };
  };
  tips: string[];
}

// Growth & Development Content Structure
export interface GrowthContent {
  inferiorFunction: {
    name: string;
    challenges: string;
    development: string[];
  };
  loops: {
    [key: string]: {
      name: string;
      description: string;
      escape: string;
    };
  };
  balancingFunctions: string[];
  dailyPractices: string[];
  commonPitfalls: string[];
}

// Workplace Content Structure
export interface WorkplaceContent {
  leadershipStyle: {
    description: string;
    strengths: string[];
    weaknesses: string[];
    tips: string[];
  };
  teamwork: {
    description: string;
    strengths: string[];
    challenges: string[];
    tips: string[];
  };
  idealEnvironment: {
    physical: string;
    culture: string;
    avoid: string;
  };
  conflictHandling: {
    approach: string;
    strengths: string[];
    development: string[];
  };
}

// ============================================================================
// Color Scheme
// ============================================================================

export interface ColorScheme {
  primary: string;    // Cor principal do tipo
  secondary: string;  // Tom mais escuro
  light: string;      // Tom mais claro
  contrast: string;   // Cor de contraste (geralmente branco)
}

// ============================================================================
// Main PersonalityType Interface
// ============================================================================

export interface PersonalityType {
  // Identificação
  code: MBTICode;
  nickname: string;
  tagline: string;
  tags: string[];
  population: string;
  group: MBTIGroup;
  colorScheme: ColorScheme;

  // Conteúdo Gratuito (sem cadastro)
  overview: {
    description: string;
    quote: {
      text: string;
      author: string;
    };
  };

  cognitiveFunctions: CognitiveFunction[];

  strengths: {
    free: Strength[];        // Top 5 forças (gratuito)
    gated: Strength[];       // +10 forças secundárias (com cadastro)
  };

  weaknesses: {
    free: Weakness[];        // Top 3 fraquezas (gratuito)
    gated: {
      full: Weakness[];      // Análise completa (com cadastro)
    };
  };

  careers: {
    free: Career[];          // Top 5 carreiras (gratuito)
    gated: Career[];         // +20 carreiras detalhadas (com cadastro)
  };

  famousPeople: FamousPerson[];  // 8-12 pessoas (sempre gratuito)

  // Conteúdo Gated (disponível com cadastro gratuito)
  relationships: GatedContent<RelationshipsContent>;
  growth: GatedContent<GrowthContent>;
  workplace: GatedContent<WorkplaceContent>;
}

// ============================================================================
// Helper Types
// ============================================================================

export interface PersonalityTypeMetadata {
  code: MBTICode;
  nickname: string;
  group: MBTIGroup;
  colorScheme: ColorScheme;
}

// Para usar em listas/grids
export interface PersonalityTypeSummary {
  code: MBTICode;
  nickname: string;
  tagline: string;
  colorScheme: ColorScheme;
}

// ============================================================================
// Type Guards
// ============================================================================

export function isMBTICode(value: string): value is MBTICode {
  const validCodes: MBTICode[] = [
    'INTJ', 'INTP', 'ENTJ', 'ENTP',
    'INFJ', 'INFP', 'ENFJ', 'ENFP',
    'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ',
    'ISTP', 'ISFP', 'ESTP', 'ESFP',
  ];
  return validCodes.includes(value as MBTICode);
}

export function getMBTIGroup(code: MBTICode): MBTIGroup {
  if (['INTJ', 'INTP', 'ENTJ', 'ENTP'].includes(code)) return 'Analysts';
  if (['INFJ', 'INFP', 'ENFJ', 'ENFP'].includes(code)) return 'Diplomats';
  if (['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'].includes(code)) return 'Sentinels';
  return 'Explorers';
}
