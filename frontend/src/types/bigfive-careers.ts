// Big Five Career Recommendations Types (Phase 3)

export interface BigFiveCareerProfile {
  id: string;
  careerName: string;
  careerNamePt: string;
  category: string;
  idealOpenness: number;
  idealConscientiousness: number;
  idealExtraversion: number;
  idealAgreeableness: number;
  idealNeuroticism: number;
  description: string;
  descriptionPt: string;
  workEnvironment: string;
  salaryRangeBrl: string;
  educationRequired: string;
  whyGoodFit: string;
  whyGoodFitPt: string;
  remoteFriendly: boolean;
  requiresCertification: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CareerMatch {
  career: BigFiveCareerProfile;
  matchScore: number; // 0-100
  matchPercentage: number; // 0-100 for display
  strengths: string[]; // Which traits align well
  considerations: string[]; // Which traits might be challenging
}

export interface TraitComparison {
  traitName: string;
  userScore: number;
  idealScore: number;
  difference: number;
  alignment: 'strong' | 'good' | 'moderate' | 'weak';
}

export const getMatchColor = (matchPercentage: number): string => {
  if (matchPercentage >= 80) return 'text-green-600 bg-green-50 border-green-200';
  if (matchPercentage >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
  if (matchPercentage >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  return 'text-orange-600 bg-orange-50 border-orange-200';
};

export const getMatchLabel = (matchPercentage: number): string => {
  if (matchPercentage >= 80) return 'Excelente Match';
  if (matchPercentage >= 60) return 'Bom Match';
  if (matchPercentage >= 40) return 'Match Moderado';
  return 'Match Fraco';
};

export const getMatchIcon = (matchPercentage: number): string => {
  if (matchPercentage >= 80) return '🎯';
  if (matchPercentage >= 60) return '👍';
  if (matchPercentage >= 40) return '🤔';
  return '💭';
};
