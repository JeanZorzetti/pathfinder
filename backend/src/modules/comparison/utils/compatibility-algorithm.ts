/**
 * MBTI Compatibility Algorithm
 * Based on cognitive function compatibility and MBTI dimensions
 * Ported from frontend implementation
 */

export interface CompatibilityResult {
  score: number; // 0-100
  level: string; // 'Excelente' | 'Boa' | 'Moderada' | 'Desafiadora'
  color: string; // Color code for UI
  strengths: string[];
  challenges: string[];
  communicationTips: string[];
}

export class CompatibilityAlgorithm {
  /**
   * Calculate full compatibility result between two MBTI types
   * @param type1 - First MBTI type (e.g., "INTJ")
   * @param type2 - Second MBTI type (e.g., "ENFP")
   * @returns Complete compatibility analysis
   */
  static calculate(type1: string, type2: string): CompatibilityResult {
    const score = this.calculateScore(type1, type2);
    const level = this.getCompatibilityLevel(score);
    const color = this.getCompatibilityColor(score);
    const strengths = this.getStrengths(type1, type2);
    const challenges = this.getChallenges(type1, type2);
    const communicationTips = this.getCommunicationTips(type1, type2);

    return {
      score,
      level,
      color,
      strengths,
      challenges,
      communicationTips,
    };
  }

  /**
   * Calculate compatibility score between two MBTI types
   * Based on cognitive function compatibility
   * @param type1 - First MBTI type
   * @param type2 - Second MBTI type
   * @returns Compatibility score (0-100)
   */
  static calculateScore(type1: string, type2: string): number {
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
   * Get compatibility level based on score
   * @param score - Compatibility score
   * @returns Compatibility level string
   */
  private static getCompatibilityLevel(score: number): string {
    if (score >= 80) return 'Excelente';
    if (score >= 70) return 'Boa';
    if (score >= 60) return 'Moderada';
    return 'Desafiadora';
  }

  /**
   * Get color code for compatibility level
   * @param score - Compatibility score
   * @returns Color string for UI
   */
  private static getCompatibilityColor(score: number): string {
    if (score >= 80) return '#10b981'; // green-500
    if (score >= 70) return '#3b82f6'; // blue-500
    if (score >= 60) return '#059669'; // emerald-600
    return '#f97316'; // orange-500
  }

  /**
   * Get compatibility strengths between two types
   * @param type1 - First MBTI type
   * @param type2 - Second MBTI type
   * @returns Array of strength descriptions
   */
  static getStrengths(type1: string, type2: string): string[] {
    const strengths: string[] = [];

    const t1 = type1.split('');
    const t2 = type2.split('');

    // Same perception (S/N)
    if (t1[1] === t2[1]) {
      strengths.push(
        'Vocês veem o mundo de forma similar e entendem a perspectiva um do outro naturalmente',
      );
    }

    // Opposite energy (E/I)
    if (t1[0] !== t2[0]) {
      strengths.push(
        'Introvertido + Extrovertido se complementam: um energiza, o outro acalma',
      );
    }

    // Opposite decision-making (T/F)
    if (t1[2] !== t2[2]) {
      strengths.push(
        'Pensador + Sentimental criam equilíbrio entre lógica e empatia',
      );
    }

    // Same lifestyle (J/P)
    if (t1[3] === t2[3]) {
      strengths.push(
        'Vocês têm ritmo de vida similar, facilitando planejamento e rotina',
      );
    }

    // Add general strength if no specific ones
    if (strengths.length === 0) {
      strengths.push(
        'Diferenças podem trazer perspectivas valiosas e crescimento mútuo',
      );
    }

    return strengths;
  }

  /**
   * Get compatibility challenges between two types
   * @param type1 - First MBTI type
   * @param type2 - Second MBTI type
   * @returns Array of challenge descriptions
   */
  static getChallenges(type1: string, type2: string): string[] {
    const challenges: string[] = [];

    const t1 = type1.split('');
    const t2 = type2.split('');

    // Different perception (S/N) - biggest challenge
    if (t1[1] !== t2[1]) {
      challenges.push(
        'Sensor + Intuitivo: um foca no concreto, outro no abstrato. Requer paciência.',
      );
    }

    // Opposite lifestyle (J/P)
    if (t1[3] !== t2[3]) {
      challenges.push(
        'Julgador + Perceptivo: um planeja, outro improvisa. Compromisso é essencial.',
      );
    }

    // Same energy but different social needs
    if (t1[0] === t2[0] && t1[0] === 'E') {
      challenges.push(
        'Dois Extrovertidos: cuidado para não se sobrecarregar socialmente',
      );
    }
    if (t1[0] === t2[0] && t1[0] === 'I') {
      challenges.push(
        'Dois Introvertidos: lembrem-se de sair da zona de conforto juntos',
      );
    }

    // Both Thinking types
    if (t1[2] === 'T' && t2[2] === 'T') {
      challenges.push(
        'Dois Pensadores: não esqueçam da validação emocional na relação',
      );
    }

    // Both Feeling types
    if (t1[2] === 'F' && t2[2] === 'F') {
      challenges.push(
        'Dois Sentimentais: cuidado com decisões muito emocionais, busquem objetividade',
      );
    }

    return challenges;
  }

  /**
   * Get communication tips for two types
   * @param type1 - First MBTI type
   * @param type2 - Second MBTI type
   * @returns Array of communication tip strings
   */
  static getCommunicationTips(type1: string, type2: string): string[] {
    const tips: string[] = [];

    const t1 = type1.split('');
    const t2 = type2.split('');

    // S/N communication
    if (t1[1] !== t2[1]) {
      if (t1[1] === 'S') {
        tips.push(
          `${type1}: Seja específico e use exemplos concretos ao falar com ${type2}`,
        );
        tips.push(
          `${type2}: Vá direto ao ponto e evite abstrações excessivas com ${type1}`,
        );
      } else {
        tips.push(
          `${type1}: Vá direto ao ponto e evite abstrações excessivas com ${type2}`,
        );
        tips.push(
          `${type2}: Seja específico e use exemplos concretos ao falar com ${type1}`,
        );
      }
    }

    // T/F communication
    if (t1[2] !== t2[2]) {
      if (t1[2] === 'T') {
        tips.push(
          `${type1}: Valide emoções antes de oferecer soluções para ${type2}`,
        );
        tips.push(
          `${type2}: ${type1} não é insensível, apenas processa logicamente primeiro`,
        );
      } else {
        tips.push(
          `${type1}: ${type2} não é insensível, apenas processa logicamente primeiro`,
        );
        tips.push(
          `${type2}: Valide emoções antes de oferecer soluções para ${type1}`,
        );
      }
    }

    // J/P communication
    if (t1[3] !== t2[3]) {
      if (t1[3] === 'J') {
        tips.push(
          `${type1}: Dê espaço para ${type2} explorar opções antes de decidir`,
        );
        tips.push(
          `${type2}: Respeite a necessidade de ${type1} por planos e decisões`,
        );
      } else {
        tips.push(
          `${type1}: Respeite a necessidade de ${type2} por planos e decisões`,
        );
        tips.push(
          `${type2}: Dê espaço para ${type1} explorar opções antes de decidir`,
        );
      }
    }

    // General tip
    tips.push('Ambos: Celebrem as diferenças como oportunidades de crescimento');

    return tips;
  }
}
