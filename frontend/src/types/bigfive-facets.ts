// Big Five Facets Types (Phase 2.4)

export interface BigFiveFacet {
  id: string;
  dimensionCode: string; // O, C, E, A, N
  facetCode: string; // O1, O2, C1, etc.
  facetName: string;
  facetNamePt: string;
  facetDescription: string;
  facetDescriptionPt: string;
  highScoreDescription: string;
  highScoreDescriptionPt: string;
  lowScoreDescription: string;
  lowScoreDescriptionPt: string;
  orderIndex: number;
}

export interface FacetScore {
  facetCode: string;
  facetName: string;
  facetDescription: string;
  score: number | null;
  level: 'low' | 'medium' | 'high';
  interpretation: string;
}

export interface DimensionWithFacets {
  dimensionCode: string;
  dimensionName: string;
  facets: FacetScore[];
}

export interface FacetScores {
  [facetCode: string]: number; // e.g., { "O1": 75, "O2": 82, "C1": 90, ... }
}

export type FacetLevel = 'low' | 'medium' | 'high';

export const getFacetInterpretation = (score: number | null): FacetLevel => {
  if (score === null) return 'medium';
  if (score < 40) return 'low';
  if (score > 60) return 'high';
  return 'medium';
};

export const getFacetLevelColor = (level: FacetLevel): string => {
  switch (level) {
    case 'low':
      return 'text-blue-600 bg-blue-50 border-blue-200';
    case 'high':
      return 'text-green-600 bg-green-50 border-green-200';
    case 'medium':
      return 'text-yellow-600 bg-yellow-50 border-yellow-200';
  }
};

export const getFacetLevelLabel = (level: FacetLevel): string => {
  switch (level) {
    case 'low':
      return 'Baixo';
    case 'high':
      return 'Alto';
    case 'medium':
      return 'Médio';
  }
};
