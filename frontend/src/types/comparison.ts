/**
 * Types for User Comparison System
 * Sprint 4: Content + Comparison
 */

export interface ComparisonCode {
  code: string; // Format: MBTI-XXXXXX (e.g., "ESTJ-A7K9M2")
  userId: string;
  mbtiType: string;
  createdAt: Date | string;
}

export interface CompatibilityResult {
  user1: {
    mbtiType: string;
    code: string;
  };
  user2: {
    mbtiType: string;
    code: string;
  };
  compatibilityScore: number; // 0-100
  strengths: string[];
  challenges: string[];
  communicationTips: string[];
  relationshipType: 'romantic' | 'friendship' | 'work' | 'general';
}

/**
 * Generate a unique comparison code for a user
 */
export function generateComparisonCode(userId: string, mbtiType: string): string {
  // Generate 6 random alphanumeric characters
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // Excluding I, O, 0, 1 for clarity
  let randomPart = '';

  for (let i = 0; i < 6; i++) {
    randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return `${mbtiType}-${randomPart}`;
}

/**
 * Parse a comparison code
 */
export function parseComparisonCode(code: string): { mbtiType: string; id: string } | null {
  const parts = code.split('-');
  if (parts.length !== 2) return null;

  const [mbtiType, id] = parts;

  // Validate MBTI type (4 letters)
  if (mbtiType.length !== 4) return null;

  return { mbtiType, id };
}

/**
 * Validate comparison code format
 */
export function isValidComparisonCode(code: string): boolean {
  return parseComparisonCode(code) !== null;
}

/**
 * Calculate compatibility score between two MBTI types
 * Based on cognitive function compatibility
 */
export function calculateCompatibilityScore(type1: string, type2: string): number {
  // Exact match
  if (type1 === type2) return 85;

  // Get dimensions
  const t1 = type1.split('');
  const t2 = type2.split('');

  let score = 50; // Base score

  // E/I compatibility
  if (t1[0] === t2[0]) {
    score += 10; // Same energy orientation
  } else {
    score += 15; // Opposite energy can be complementary
  }

  // S/N compatibility (most important)
  if (t1[1] === t2[1]) {
    score += 20; // Same perception style is crucial
  } else {
    score -= 10; // Different perception can cause friction
  }

  // T/F compatibility
  if (t1[2] === t2[2]) {
    score += 10; // Same decision-making style
  } else {
    score += 15; // Opposite can be complementary
  }

  // J/P compatibility
  if (t1[3] === t2[3]) {
    score += 10; // Same lifestyle preference
  } else {
    score += 5; // Can be complementary but requires work
  }

  // Cap at 100
  return Math.min(100, score);
}

/**
 * Get compatibility strengths between two types
 */
export function getCompatibilityStrengths(type1: string, type2: string): string[] {
  const strengths: string[] = [];

  const t1 = type1.split('');
  const t2 = type2.split('');

  // Same perception (S/N)
  if (t1[1] === t2[1]) {
    strengths.push('Vocês veem o mundo de forma similar e entendem a perspectiva um do outro naturalmente');
  }

  // Opposite energy (E/I)
  if (t1[0] !== t2[0]) {
    strengths.push('Introvertido + Extrovertido se complementam: um energiza, o outro acalma');
  }

  // Opposite decision-making (T/F)
  if (t1[2] !== t2[2]) {
    strengths.push('Pensador + Sentimental criam equilíbrio entre lógica e empatia');
  }

  // Same lifestyle (J/P)
  if (t1[3] === t2[3]) {
    strengths.push('Vocês têm ritmo de vida similar, facilitando planejamento e rotina');
  }

  // Add general strength if no specific ones
  if (strengths.length === 0) {
    strengths.push('Diferenças podem trazer perspectivas valiosas e crescimento mútuo');
  }

  return strengths;
}

/**
 * Get compatibility challenges between two types
 */
export function getCompatibilityChallenges(type1: string, type2: string): string[] {
  const challenges: string[] = [];

  const t1 = type1.split('');
  const t2 = type2.split('');

  // Different perception (S/N) - biggest challenge
  if (t1[1] !== t2[1]) {
    challenges.push('Sensor + Intuitivo: um foca no concreto, outro no abstrato. Requer paciência.');
  }

  // Opposite lifestyle (J/P)
  if (t1[3] !== t2[3]) {
    challenges.push('Julgador + Perceptivo: um planeja, outro improvisa. Compromisso é essencial.');
  }

  // Same energy but different social needs
  if (t1[0] === t2[0] && t1[0] === 'E') {
    challenges.push('Dois Extrovertidos: cuidado para não se sobrecarregar socialmente');
  }
  if (t1[0] === t2[0] && t1[0] === 'I') {
    challenges.push('Dois Introvertidos: lembrem-se de sair da zona de conforto juntos');
  }

  // Both Thinking types
  if (t1[2] === 'T' && t2[2] === 'T') {
    challenges.push('Dois Pensadores: não esqueçam da validação emocional na relação');
  }

  // Both Feeling types
  if (t1[2] === 'F' && t2[2] === 'F') {
    challenges.push('Dois Sentimentais: cuidado com decisões muito emocionais, busquem objetividade');
  }

  return challenges;
}

/**
 * Get communication tips for two types
 */
export function getCommunicationTips(type1: string, type2: string): string[] {
  const tips: string[] = [];

  const t1 = type1.split('');
  const t2 = type2.split('');

  // S/N communication
  if (t1[1] !== t2[1]) {
    if (t1[1] === 'S') {
      tips.push(`${type1}: Seja específico e use exemplos concretos ao falar com ${type2}`);
      tips.push(`${type2}: Vá direto ao ponto e evite abstrações excessivas com ${type1}`);
    } else {
      tips.push(`${type1}: Vá direto ao ponto e evite abstrações excessivas com ${type2}`);
      tips.push(`${type2}: Seja específico e use exemplos concretos ao falar com ${type1}`);
    }
  }

  // T/F communication
  if (t1[2] !== t2[2]) {
    if (t1[2] === 'T') {
      tips.push(`${type1}: Valide emoções antes de oferecer soluções para ${type2}`);
      tips.push(`${type2}: ${type1} não é insensível, apenas processa logicamente primeiro`);
    } else {
      tips.push(`${type1}: ${type2} não é insensível, apenas processa logicamente primeiro`);
      tips.push(`${type2}: Valide emoções antes de oferecer soluções para ${type1}`);
    }
  }

  // J/P communication
  if (t1[3] !== t2[3]) {
    if (t1[3] === 'J') {
      tips.push(`${type1}: Dê espaço para ${type2} explorar opções antes de decidir`);
      tips.push(`${type2}: Respeite a necessidade de ${type1} por planos e decisões`);
    } else {
      tips.push(`${type1}: Respeite a necessidade de ${type2} por planos e decisões`);
      tips.push(`${type2}: Dê espaço para ${type1} explorar opções antes de decidir`);
    }
  }

  // General tip
  tips.push('Ambos: Celebrem as diferenças como oportunidades de crescimento');

  return tips;
}
