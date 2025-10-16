/**
 * MBTI Types Data - Central Export
 *
 * Exporta todos os 16 tipos de personalidade MBTI.
 * Atualmente implementados: INTJ, INFP
 * Pendentes (Sprint 2-3): 14 tipos restantes
 */

import { INTJ } from './intj';
import { INFP } from './infp';
import { PersonalityType, MBTICode } from '../../types/personality';

// Map de todos os tipos (atualmente 2/16)
export const PERSONALITY_TYPES: Record<MBTICode, PersonalityType | null> = {
  // Analysts (NT) - Sprint 1 & 2
  INTJ: INTJ,
  INTP: null, // TODO: Sprint 2
  ENTJ: null, // TODO: Sprint 2
  ENTP: null, // TODO: Sprint 2

  // Diplomats (NF) - Sprint 1 & 2
  INFJ: null, // TODO: Sprint 2
  INFP: INFP,
  ENFJ: null, // TODO: Sprint 2
  ENFP: null, // TODO: Sprint 2

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

// Export individual dos tipos implementados
export { INTJ, INFP };
