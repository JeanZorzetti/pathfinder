/**
 * MBTI Types Data - Central Export
 *
 * Exporta todos os 16 tipos de personalidade MBTI.
 * 🎉 TODOS OS 16 TIPOS COMPLETOS! 🎉
 * Sprint 1-3: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP
 */

import { INTJ } from './intj';
import { INFP } from './infp';
import { INTP } from './intp';
import { ENTJ } from './entj';
import { ENTP } from './entp';
import { INFJ } from './infj';
import { ENFJ } from './enfj';
import { ENFP } from './enfp';
import { ISTJ } from './istj';
import { ISFJ } from './isfj';
import { ESTJ } from './estj';
import { ESFJ } from './esfj';
import { ISTP } from './istp';
import { ISFP } from './isfp';
import { ESTP } from './estp';
import { ESFP } from './esfp';
import { PersonalityType, MBTICode } from '../../types/personality';

// Map de todos os tipos (16/16 - TODOS OS SPRINTS COMPLETOS! 🎉)
export const PERSONALITY_TYPES: Record<MBTICode, PersonalityType | null> = {
  // Analysts (NT) - Sprint 1 & 2 ✅
  INTJ: INTJ,
  INTP: INTP,
  ENTJ: ENTJ,
  ENTP: ENTP,

  // Diplomats (NF) - Sprint 1 & 2 ✅
  INFJ: INFJ,
  INFP: INFP,
  ENFJ: ENFJ,
  ENFP: ENFP,

  // Sentinels (SJ) - Sprint 3 ✅
  ISTJ: ISTJ,
  ISFJ: ISFJ,
  ESTJ: ESTJ,
  ESFJ: ESFJ,

  // Explorers (SP) - Sprint 3 ✅
  ISTP: ISTP,
  ISFP: ISFP,
  ESTP: ESTP,
  ESFP: ESFP,
};

/**
 * Busca tipo de personalidade por código
 */
export function getPersonalityType(code: MBTICode): PersonalityType | null {
  const result = PERSONALITY_TYPES[code];
  console.log(`🔍 getPersonalityType('${code}') =`, result ? 'FOUND' : 'NULL');

  if (!result) return null;

  // Validate essential fields for HeroSection
  if (!result.code || !result.nickname || !result.tagline || !Array.isArray(result.tags) || !result.population || !result.colorScheme) {
    console.error(`❌ ${code} is missing essential HeroSection fields:`, {
      code: !!result.code,
      nickname: !!result.nickname,
      tagline: !!result.tagline,
      tags: Array.isArray(result.tags),
      population: !!result.population,
      colorScheme: !!result.colorScheme,
    });
    return null;
  }

  console.log(`🔍 ${code} main fields:`, {
    overview: !!result.overview,
    cognitiveFunctions: Array.isArray(result.cognitiveFunctions) ? `${result.cognitiveFunctions.length} items` : 'undefined',
    strengths: !!result.strengths,
    weaknesses: !!result.weaknesses,
    careers: !!result.careers,
    tags: Array.isArray(result.tags) ? `${result.tags.length} items` : 'undefined',
  });
  console.log(`🔍 ${code} nested fields:`, {
    'strengths.free': Array.isArray(result.strengths?.free) ? `${result.strengths.free.length} items` : 'undefined',
    'weaknesses.free': Array.isArray(result.weaknesses?.free) ? `${result.weaknesses.free.length} items` : 'undefined',
    'careers.free': Array.isArray(result.careers?.free) ? `${result.careers.free.length} items` : 'undefined',
    'overview.description': typeof result.overview?.description,
    'overview.quote': !!result.overview?.quote,
  });

  return result;
}

/**
 * Retorna lista de tipos implementados
 */
export function getImplementedTypes(): MBTICode[] {
  return Object.keys(PERSONALITY_TYPES).filter(
    (code) => PERSONALITY_TYPES[code as MBTICode] !== null
  ) as MBTICode[];
}

/**
 * Verifica se tipo está implementado
 */
export function isTypeImplemented(code: MBTICode): boolean {
  return PERSONALITY_TYPES[code] !== null;
}

// Export individual dos tipos implementados (Sprint 1, 2 & 3 - TODOS!)
export { INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP };
