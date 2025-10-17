/**
 * MBTI Color Schemes - Cores específicas por tipo
 *
 * Sprint 1: Dashboard Core
 *
 * Cada tipo MBTI tem uma paleta de cores única para UI personalizada
 */

export interface ColorScheme {
  primary: string;
  secondary: string;
  light: string;
  contrast: string;
}

export const MBTI_COLORS: Record<string, ColorScheme> = {
  // Analysts (NT)
  INTJ: {
    primary: '#6B46C1', // Roxo escuro
    secondary: '#553C9A',
    light: '#9F7AEA',
    contrast: '#FFFFFF',
  },
  INTP: {
    primary: '#4C51BF', // Roxo/Índigo
    secondary: '#434190',
    light: '#7C3AED',
    contrast: '#FFFFFF',
  },
  ENTJ: {
    primary: '#DC2626', // Vermelho
    secondary: '#B91C1C',
    light: '#EF4444',
    contrast: '#FFFFFF',
  },
  ENTP: {
    primary: '#8B5CF6', // Roxo claro
    secondary: '#7C3AED',
    light: '#A78BFA',
    contrast: '#FFFFFF',
  },

  // Diplomats (NF)
  INFJ: {
    primary: '#059669', // Verde jade
    secondary: '#047857',
    light: '#10B981',
    contrast: '#FFFFFF',
  },
  INFP: {
    primary: '#9F7AEA', // Lilás
    secondary: '#805AD5',
    light: '#B794F6',
    contrast: '#FFFFFF',
  },
  ENFJ: {
    primary: '#F59E0B', // Âmbar/Dourado
    secondary: '#D97706',
    light: '#FBBF24',
    contrast: '#1F2937',
  },
  ENFP: {
    primary: '#EC4899', // Rosa
    secondary: '#DB2777',
    light: '#F472B6',
    contrast: '#FFFFFF',
  },

  // Sentinels (SJ)
  ISTJ: {
    primary: '#1E3A8A', // Azul escuro
    secondary: '#1E40AF',
    light: '#3B82F6',
    contrast: '#FFFFFF',
  },
  ISFJ: {
    primary: '#059669', // Verde musgo
    secondary: '#047857',
    light: '#10B981',
    contrast: '#FFFFFF',
  },
  ESTJ: {
    primary: '#1D4ED8', // Azul
    secondary: '#1E40AF',
    light: '#3B82F6',
    contrast: '#FFFFFF',
  },
  ESFJ: {
    primary: '#EA580C', // Laranja
    secondary: '#C2410C',
    light: '#F97316',
    contrast: '#FFFFFF',
  },

  // Explorers (SP)
  ISTP: {
    primary: '#374151', // Cinza
    secondary: '#4B5563',
    light: '#6B7280',
    contrast: '#FFFFFF',
  },
  ISFP: {
    primary: '#10B981', // Verde claro
    secondary: '#059669',
    light: '#34D399',
    contrast: '#FFFFFF',
  },
  ESTP: {
    primary: '#DC2626', // Vermelho
    secondary: '#B91C1C',
    light: '#EF4444',
    contrast: '#FFFFFF',
  },
  ESFP: {
    primary: '#EC4899', // Rosa
    secondary: '#DB2777',
    light: '#F472B6',
    contrast: '#FFFFFF',
  },
};

/**
 * Retorna o esquema de cores para um tipo MBTI
 * @param type Código do tipo MBTI (ex: "INTJ")
 * @returns ColorScheme do tipo ou padrão se não encontrado
 */
export function getColorScheme(type: string): ColorScheme {
  const upperType = type.toUpperCase();
  return MBTI_COLORS[upperType] || {
    primary: '#6366F1',
    secondary: '#4F46E5',
    light: '#818CF8',
    contrast: '#FFFFFF',
  };
}

/**
 * Retorna o nickname (apelido) de um tipo MBTI
 * @param type Código do tipo MBTI
 * @returns Nickname do tipo
 */
export function getMBTINickname(type: string): string {
  const nicknames: Record<string, string> = {
    INTJ: 'O Arquiteto',
    INTP: 'O Lógico',
    ENTJ: 'O Comandante',
    ENTP: 'O Inovador',
    INFJ: 'O Advogado',
    INFP: 'O Mediador',
    ENFJ: 'O Protagonista',
    ENFP: 'O Ativista',
    ISTJ: 'O Logístico',
    ISFJ: 'O Defensor',
    ESTJ: 'O Executivo',
    ESFJ: 'O Cônsul',
    ISTP: 'O Virtuoso',
    ISFP: 'O Aventureiro',
    ESTP: 'O Empreendedor',
    ESFP: 'O Animador',
  };

  return nicknames[type.toUpperCase()] || 'Explorador';
}
