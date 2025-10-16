/**
 * MBTI Types Data - Central Export
 *
 * Exporta todos os 16 tipos de personalidade MBTI.
 * Sprint 1 & 2 Completos: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP (8/16)
 * Pendentes (Sprint 3): 8 tipos Sentinels & Explorers
 */

import { INTJ } from './intj';
import { INFP } from './infp';
import { INTP } from './intp';
import { ENTJ } from './entj';
import { ENTP } from './entp';
import { INFJ } from './infj';
import { ENFJ } from './enfj';
import { ENFP } from './enfp';
import { PersonalityType, MBTICode } from '../../types/personality';

// Map de todos os tipos (atualmente 8/16 - Sprint 1 & 2 completos!)
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

  // Sentinels (SJ) - Sprint 3
  ISTJ: null, // TODO: Sprint 3
  ISFJ: null, // TODO: Sprint 3
  ESTJ: null, // TODO: Sprint 3
  ESFJ: null, // TODO: Sprint 3

  // Explorers (SP) - Sprint 3
  ISTP: null, // TODO: Sprint 3
  ISFP: null, // TODO: Sprint 3
  ESTP: null, // TODO: Sprint 3
  ESFP: null, // TODO: Sprint 3
};

/**
 * Busca tipo de personalidade por código
 */
export function getPersonalityType(code: MBTICode): PersonalityType | null {
  return PERSONALITY_TYPES[code];
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

// Export individual dos tipos implementados (Sprint 1 & 2)
export { INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP };
