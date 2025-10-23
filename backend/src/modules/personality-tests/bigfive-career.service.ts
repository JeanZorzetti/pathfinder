import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BigFiveCareerProfile } from './entities/bigfive-career-profile.entity';
import { BigFiveResult } from './entities/bigfive-result.entity';

interface CareerMatch {
  career: BigFiveCareerProfile;
  matchScore: number; // 0-100, higher is better
  matchPercentage: number; // 0-100, for display
  strengths: string[]; // Which traits align well
  considerations: string[]; // Which traits might be challenging
}

interface TraitComparison {
  traitName: string;
  userScore: number;
  idealScore: number;
  difference: number;
  alignment: 'strong' | 'good' | 'moderate' | 'weak';
}

@Injectable()
export class BigFiveCareerService {
  constructor(
    @InjectRepository(BigFiveCareerProfile)
    private careerProfileRepository: Repository<BigFiveCareerProfile>,
    @InjectRepository(BigFiveResult)
    private resultRepository: Repository<BigFiveResult>,
  ) {}

  /**
   * Get all career profiles
   */
  async getAllCareers(): Promise<BigFiveCareerProfile[]> {
    return this.careerProfileRepository.find({
      order: { category: 'ASC', careerNamePt: 'ASC' },
    });
  }

  /**
   * Get careers by category
   */
  async getCareersByCategory(category: string): Promise<BigFiveCareerProfile[]> {
    return this.careerProfileRepository.find({
      where: { category },
      order: { careerNamePt: 'ASC' },
    });
  }

  /**
   * Calculate career matches for a user based on their Big Five result
   * Uses weighted Euclidean distance algorithm
   */
  async calculateCareerMatches(resultId: string, lang: 'en' | 'pt' = 'pt'): Promise<CareerMatch[]> {
    // Get user's Big Five result
    const result = await this.resultRepository.findOne({ where: { id: resultId } });
    if (!result) {
      throw new Error('Result not found');
    }

    const userScores = {
      openness: result.opennessScore,
      conscientiousness: result.conscientiousnessScore,
      extraversion: result.extraversionScore,
      agreeableness: result.agreeablenessScore,
      neuroticism: result.neuroticismScore,
    };

    // Get all career profiles
    const careers = await this.getAllCareers();

    // Calculate match score for each career
    const matches = careers.map((career) => {
      const matchScore = this.calculateMatchScore(userScores, career);
      const traitComparisons = this.compareTraits(userScores, career);
      const { strengths, considerations } = this.analyzeAlignment(traitComparisons, lang);

      return {
        career,
        matchScore,
        matchPercentage: Math.round(matchScore),
        strengths,
        considerations,
      };
    });

    // Sort by match score (highest first)
    matches.sort((a, b) => b.matchScore - a.matchScore);

    return matches;
  }

  /**
   * Get top N career matches
   */
  async getTopMatches(resultId: string, limit: number = 6, lang: 'en' | 'pt' = 'pt'): Promise<CareerMatch[]> {
    const allMatches = await this.calculateCareerMatches(resultId, lang);
    return allMatches.slice(0, limit);
  }

  /**
   * Calculate match score using weighted Euclidean distance
   * Formula: 100 - (weighted_distance / max_possible_distance * 100)
   *
   * Weights based on research (can be adjusted):
   * - Conscientiousness: 1.2 (most predictive of job performance)
   * - Openness: 1.1 (important for creativity/learning)
   * - Extraversion: 1.0 (varies by role)
   * - Agreeableness: 0.9 (context-dependent)
   * - Neuroticism: 1.1 (impacts stress management)
   */
  private calculateMatchScore(
    userScores: {
      openness: number;
      conscientiousness: number;
      extraversion: number;
      agreeableness: number;
      neuroticism: number;
    },
    career: BigFiveCareerProfile,
  ): number {
    const weights = {
      openness: 1.1,
      conscientiousness: 1.2,
      extraversion: 1.0,
      agreeableness: 0.9,
      neuroticism: 1.1,
    };

    // Calculate weighted squared differences
    const squaredDiffs = {
      openness: Math.pow((userScores.openness - career.idealOpenness) * weights.openness, 2),
      conscientiousness: Math.pow((userScores.conscientiousness - career.idealConscientiousness) * weights.conscientiousness, 2),
      extraversion: Math.pow((userScores.extraversion - career.idealExtraversion) * weights.extraversion, 2),
      agreeableness: Math.pow((userScores.agreeableness - career.idealAgreeableness) * weights.agreeableness, 2),
      neuroticism: Math.pow((userScores.neuroticism - career.idealNeuroticism) * weights.neuroticism, 2),
    };

    // Calculate Euclidean distance
    const sumSquaredDiffs = Object.values(squaredDiffs).reduce((sum, val) => sum + val, 0);
    const distance = Math.sqrt(sumSquaredDiffs);

    // Maximum possible distance (weighted, from 0 to 100 on each dimension)
    const maxDistance = Math.sqrt(
      Math.pow(100 * weights.openness, 2) +
      Math.pow(100 * weights.conscientiousness, 2) +
      Math.pow(100 * weights.extraversion, 2) +
      Math.pow(100 * weights.agreeableness, 2) +
      Math.pow(100 * weights.neuroticism, 2)
    );

    // Convert distance to match score (0-100, higher is better)
    const matchScore = 100 - (distance / maxDistance * 100);

    return Math.max(0, Math.min(100, matchScore));
  }

  /**
   * Compare user traits with ideal career traits
   */
  private compareTraits(
    userScores: {
      openness: number;
      conscientiousness: number;
      extraversion: number;
      agreeableness: number;
      neuroticism: number;
    },
    career: BigFiveCareerProfile,
  ): TraitComparison[] {
    const traits = [
      { name: 'openness', userScore: userScores.openness, idealScore: career.idealOpenness },
      { name: 'conscientiousness', userScore: userScores.conscientiousness, idealScore: career.idealConscientiousness },
      { name: 'extraversion', userScore: userScores.extraversion, idealScore: career.idealExtraversion },
      { name: 'agreeableness', userScore: userScores.agreeableness, idealScore: career.idealAgreeableness },
      { name: 'neuroticism', userScore: userScores.neuroticism, idealScore: career.idealNeuroticism },
    ];

    return traits.map((trait) => {
      const difference = Math.abs(trait.userScore - trait.idealScore);
      let alignment: 'strong' | 'good' | 'moderate' | 'weak';

      if (difference <= 10) alignment = 'strong';
      else if (difference <= 20) alignment = 'good';
      else if (difference <= 30) alignment = 'moderate';
      else alignment = 'weak';

      return {
        traitName: trait.name,
        userScore: trait.userScore,
        idealScore: trait.idealScore,
        difference,
        alignment,
      };
    });
  }

  /**
   * Analyze alignment and generate strengths/considerations
   */
  private analyzeAlignment(
    comparisons: TraitComparison[],
    lang: 'en' | 'pt',
  ): { strengths: string[]; considerations: string[] } {
    const strengths: string[] = [];
    const considerations: string[] = [];

    const traitNames = {
      en: {
        openness: 'Openness',
        conscientiousness: 'Conscientiousness',
        extraversion: 'Extraversion',
        agreeableness: 'Agreeableness',
        neuroticism: 'Emotional Stability',
      },
      pt: {
        openness: 'Abertura',
        conscientiousness: 'Conscienciosidade',
        extraversion: 'Extroversão',
        agreeableness: 'Amabilidade',
        neuroticism: 'Estabilidade Emocional',
      },
    };

    const messages = {
      en: {
        strong: (trait: string) => `Strong alignment in ${trait}`,
        good: (trait: string) => `Good fit for ${trait}`,
        moderate: (trait: string) => `Moderate match in ${trait} - room for growth`,
        weak: (trait: string) => `${trait} may require adaptation`,
      },
      pt: {
        strong: (trait: string) => `Forte alinhamento em ${trait}`,
        good: (trait: string) => `Boa adequação para ${trait}`,
        moderate: (trait: string) => `Correspondência moderada em ${trait} - espaço para crescimento`,
        weak: (trait: string) => `${trait} pode exigir adaptação`,
      },
    };

    comparisons.forEach((comp) => {
      const traitName = traitNames[lang][comp.traitName as keyof typeof traitNames.en];

      if (comp.alignment === 'strong' || comp.alignment === 'good') {
        strengths.push(messages[lang][comp.alignment](traitName));
      } else if (comp.alignment === 'moderate' || comp.alignment === 'weak') {
        considerations.push(messages[lang][comp.alignment](traitName));
      }
    });

    return { strengths, considerations };
  }

  /**
   * Get career by ID
   */
  async getCareerById(id: string): Promise<BigFiveCareerProfile> {
    return this.careerProfileRepository.findOne({ where: { id } });
  }
}
