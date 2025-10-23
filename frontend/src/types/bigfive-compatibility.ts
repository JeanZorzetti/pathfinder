// Big Five Relationship Compatibility Types (Phase 4)

export interface RelationshipInsight {
  dimensionCode: string;
  dimensionName: string;
  userScore: number;
  scoreRange: 'high' | 'medium' | 'low';
  communicationStyle: string;
  strengths: string[];
  challenges: string[];
  idealPartnerTraits: string;
  conflictResolution: string;
  tips: string[];
}

export interface CompatibilityComparison {
  overallCompatibility: number; // 0-100
  dimensionCompatibility: {
    [dimension: string]: {
      score1: number;
      score2: number;
      difference: number;
      compatibility: number;
      interpretation: string;
    };
  };
  strengths: string[];
  challenges: string[];
  recommendations: string[];
}

export const getScoreRangeLabel = (range: 'high' | 'medium' | 'low'): string => {
  switch (range) {
    case 'high':
      return 'Alto';
    case 'medium':
      return 'Médio';
    case 'low':
      return 'Baixo';
  }
};

export const getScoreRangeColor = (range: 'high' | 'medium' | 'low'): string => {
  switch (range) {
    case 'high':
      return 'text-purple-600 bg-purple-50 border-purple-200';
    case 'medium':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'low':
      return 'text-gray-600 bg-gray-50 border-gray-200';
  }
};

export const getCompatibilityColor = (compatibility: number): string => {
  if (compatibility >= 85) return 'text-green-600 bg-green-50 border-green-200';
  if (compatibility >= 70) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (compatibility >= 55) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-orange-600 bg-orange-50 border-orange-200';
};

export const getCompatibilityLabel = (compatibility: number): string => {
  if (compatibility >= 85) return 'Excelente';
  if (compatibility >= 70) return 'Boa';
  if (compatibility >= 55) return 'Moderada';
  return 'Desafiadora';
};

export const getCompatibilityIcon = (compatibility: number): string => {
  if (compatibility >= 85) return '💖';
  if (compatibility >= 70) return '💕';
  if (compatibility >= 55) return '💛';
  return '💙';
};

export const getDimensionIcon = (dimensionCode: string): string => {
  switch (dimensionCode) {
    case 'O':
      return '🎨';
    case 'C':
      return '🎯';
    case 'E':
      return '🌟';
    case 'A':
      return '🤝';
    case 'N':
      return '🧘';
    default:
      return '❓';
  }
};
