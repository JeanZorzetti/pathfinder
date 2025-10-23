import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BigFiveCompatibilityInsight } from './entities/bigfive-compatibility-insight.entity';
import { BigFiveResult } from './entities/bigfive-result.entity';

interface DimensionScore {
  dimension: string;
  dimensionName: string;
  score: number;
  range: 'high' | 'medium' | 'low';
}

interface RelationshipInsight {
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

interface CompatibilityComparison {
  overallCompatibility: number; // 0-100
  dimensionCompatibility: {
    [dimension: string]: {
      score1: number;
      score2: number;
      difference: number;
      compatibility: number; // 0-100
      interpretation: string;
    };
  };
  strengths: string[]; // Areas of strong alignment
  challenges: string[]; // Areas requiring compromise
  recommendations: string[]; // How to make it work
}

@Injectable()
export class BigFiveCompatibilityService {
  constructor(
    @InjectRepository(BigFiveCompatibilityInsight)
    private insightRepository: Repository<BigFiveCompatibilityInsight>,
    @InjectRepository(BigFiveResult)
    private resultRepository: Repository<BigFiveResult>,
  ) {}

  /**
   * Get all compatibility insights
   */
  async getAllInsights(): Promise<BigFiveCompatibilityInsight[]> {
    return this.insightRepository.find({
      order: { dimensionCode: 'ASC', scoreRange: 'DESC' },
    });
  }

  /**
   * Get insights for specific dimension and score range
   */
  async getInsightForDimensionScore(
    dimensionCode: string,
    score: number,
  ): Promise<BigFiveCompatibilityInsight> {
    const range = this.getScoreRange(score);
    return this.insightRepository.findOne({
      where: { dimensionCode, scoreRange: range },
    });
  }

  /**
   * Get relationship insights for a user's Big Five result
   */
  async getRelationshipInsights(
    resultId: string,
    lang: 'en' | 'pt' = 'pt',
  ): Promise<RelationshipInsight[]> {
    const result = await this.resultRepository.findOne({ where: { id: resultId } });
    if (!result) {
      throw new Error('Result not found');
    }

    const dimensionScores = this.extractDimensionScores(result);
    const insights: RelationshipInsight[] = [];

    for (const dimScore of dimensionScores) {
      const insight = await this.getInsightForDimensionScore(
        dimScore.dimension,
        dimScore.score,
      );

      if (insight) {
        insights.push({
          dimensionCode: dimScore.dimension,
          dimensionName: dimScore.dimensionName,
          userScore: dimScore.score,
          scoreRange: dimScore.range,
          communicationStyle:
            lang === 'pt' ? insight.communicationStylePt : insight.communicationStyle,
          strengths:
            lang === 'pt'
              ? insight.relationshipStrengthsPt
              : insight.relationshipStrengths,
          challenges:
            lang === 'pt'
              ? insight.relationshipChallengesPt
              : insight.relationshipChallenges,
          idealPartnerTraits:
            lang === 'pt' ? insight.idealPartnerTraitsPt : insight.idealPartnerTraits,
          conflictResolution:
            lang === 'pt' ? insight.conflictResolutionPt : insight.conflictResolution,
          tips: lang === 'pt' ? insight.relationshipTipsPt : insight.relationshipTips,
        });
      }
    }

    return insights;
  }

  /**
   * Compare two Big Five results for relationship compatibility
   */
  async compareResults(
    resultId1: string,
    resultId2: string,
    lang: 'en' | 'pt' = 'pt',
  ): Promise<CompatibilityComparison> {
    const [result1, result2] = await Promise.all([
      this.resultRepository.findOne({ where: { id: resultId1 } }),
      this.resultRepository.findOne({ where: { id: resultId2 } }),
    ]);

    if (!result1 || !result2) {
      throw new Error('One or both results not found');
    }

    const scores1 = this.extractDimensionScores(result1);
    const scores2 = this.extractDimensionScores(result2);

    // Calculate compatibility for each dimension
    const dimensionCompatibility: CompatibilityComparison['dimensionCompatibility'] = {};
    let totalCompatibility = 0;

    for (const dim1 of scores1) {
      const dim2 = scores2.find((d) => d.dimension === dim1.dimension);
      if (dim2) {
        const difference = Math.abs(dim1.score - dim2.score);
        const compatibility = this.calculateDimensionCompatibility(
          dim1.dimension,
          dim1.score,
          dim2.score,
        );

        dimensionCompatibility[dim1.dimension] = {
          score1: dim1.score,
          score2: dim2.score,
          difference,
          compatibility,
          interpretation: this.getDimensionCompatibilityInterpretation(
            dim1.dimension,
            dim1.dimensionName,
            difference,
            lang,
          ),
        };

        totalCompatibility += compatibility;
      }
    }

    const overallCompatibility = Math.round(totalCompatibility / scores1.length);

    // Generate insights
    const { strengths, challenges, recommendations } =
      this.generateCompatibilityInsights(dimensionCompatibility, lang);

    return {
      overallCompatibility,
      dimensionCompatibility,
      strengths,
      challenges,
      recommendations,
    };
  }

  /**
   * Calculate compatibility score for a specific dimension
   * Algorithm considers that some dimensions benefit from similarity, others from complementarity
   */
  private calculateDimensionCompatibility(
    dimension: string,
    score1: number,
    score2: number,
  ): number {
    const difference = Math.abs(score1 - score2);

    switch (dimension) {
      case 'O': // Openness: Moderate similarity is ideal
        // Sweet spot is 10-20 point difference
        if (difference <= 10) return 100;
        if (difference <= 20) return 95;
        if (difference <= 30) return 80;
        if (difference <= 40) return 60;
        return 40;

      case 'C': // Conscientiousness: High similarity is ideal
        // Very similar conscientiousness works best
        if (difference <= 15) return 100;
        if (difference <= 25) return 85;
        if (difference <= 35) return 65;
        return 45;

      case 'E': // Extraversion: Complementarity can work
        // Can handle larger differences
        if (difference <= 20) return 100;
        if (difference <= 35) return 90;
        if (difference <= 50) return 75;
        return 55;

      case 'A': // Agreeableness: High similarity is very important
        // Both should be reasonably agreeable
        const avgAgreeableness = (score1 + score2) / 2;
        if (avgAgreeableness >= 60 && difference <= 20) return 100;
        if (avgAgreeableness >= 50 && difference <= 25) return 85;
        if (avgAgreeableness >= 40) return 70;
        return 50;

      case 'N': // Neuroticism: Low similarity preferred (at least one stable)
        // At least one person should be emotionally stable
        const minNeuroticism = Math.min(score1, score2);
        if (minNeuroticism <= 40) return 100; // At least one very stable
        if (minNeuroticism <= 50) return 85; // One reasonably stable
        if (minNeuroticism <= 60) return 65; // Both moderate
        return 40; // Both high neuroticism - challenging

      default:
        return 50;
    }
  }

  /**
   * Generate interpretation for dimension compatibility
   */
  private getDimensionCompatibilityInterpretation(
    dimension: string,
    dimensionName: string,
    difference: number,
    lang: 'en' | 'pt',
  ): string {
    const messages = {
      en: {
        excellent: 'Excellent alignment',
        good: 'Good compatibility',
        moderate: 'Moderate difference - requires understanding',
        challenging: 'Significant difference - needs work',
      },
      pt: {
        excellent: 'Alinhamento excelente',
        good: 'Boa compatibilidade',
        moderate: 'Diferença moderada - requer compreensão',
        challenging: 'Diferença significativa - precisa de trabalho',
      },
    };

    const msg = messages[lang];

    if (difference <= 15) return msg.excellent;
    if (difference <= 30) return msg.good;
    if (difference <= 45) return msg.moderate;
    return msg.challenging;
  }

  /**
   * Generate compatibility insights, strengths, challenges, and recommendations
   */
  private generateCompatibilityInsights(
    dimensionCompatibility: CompatibilityComparison['dimensionCompatibility'],
    lang: 'en' | 'pt',
  ): { strengths: string[]; challenges: string[]; recommendations: string[] } {
    const strengths: string[] = [];
    const challenges: string[] = [];
    const recommendations: string[] = [];

    const dimensionNames = {
      en: {
        O: 'Openness',
        C: 'Conscientiousness',
        E: 'Extraversion',
        A: 'Agreeableness',
        N: 'Emotional Stability',
      },
      pt: {
        O: 'Abertura',
        C: 'Conscienciosidade',
        E: 'Extroversão',
        A: 'Amabilidade',
        N: 'Estabilidade Emocional',
      },
    };

    const messages = {
      en: {
        strengthSimilar: (dim: string) =>
          `Strong alignment in ${dim} - you share similar perspectives`,
        strengthComplement: (dim: string) =>
          `Complementary ${dim} - you balance each other well`,
        challengeDiff: (dim: string) =>
          `Different ${dim} levels may require compromise`,
        recommunication: 'Communicate openly about differences in preferences',
        recrespect: 'Respect each other\'s natural tendencies',
        reccompromise: 'Find middle ground where you differ',
      },
      pt: {
        strengthSimilar: (dim: string) =>
          `Forte alinhamento em ${dim} - vocês compartilham perspectivas similares`,
        strengthComplement: (dim: string) =>
          `${dim} complementar - vocês se equilibram bem`,
        challengeDiff: (dim: string) =>
          `Níveis diferentes de ${dim} podem requerer compromisso`,
        recommunication: 'Comuniquem abertamente sobre diferenças em preferências',
        recrespect: 'Respeitem as tendências naturais um do outro',
        reccompromise: 'Encontrem meio-termo onde vocês diferem',
      },
    };

    const msg = messages[lang];
    const dimNames = dimensionNames[lang];

    // Analyze each dimension
    Object.entries(dimensionCompatibility).forEach(([dim, data]) => {
      const dimName = dimNames[dim as keyof typeof dimNames] || dim;

      if (data.compatibility >= 85) {
        if (data.difference <= 15) {
          strengths.push(msg.strengthSimilar(dimName));
        } else {
          strengths.push(msg.strengthComplement(dimName));
        }
      } else if (data.compatibility < 65) {
        challenges.push(msg.challengeDiff(dimName));
      }
    });

    // General recommendations
    if (challenges.length > 0) {
      recommendations.push(msg.recommunication);
      recommendations.push(msg.recrespect);
      recommendations.push(msg.reccompromise);
    }

    return { strengths, challenges, recommendations };
  }

  /**
   * Extract dimension scores from result
   */
  private extractDimensionScores(result: BigFiveResult): DimensionScore[] {
    const dimensionNames = {
      O: 'Abertura',
      C: 'Conscienciosidade',
      E: 'Extroversão',
      A: 'Amabilidade',
      N: 'Neuroticismo',
    };

    return [
      {
        dimension: 'O',
        dimensionName: dimensionNames.O,
        score: result.opennessScore,
        range: this.getScoreRange(result.opennessScore),
      },
      {
        dimension: 'C',
        dimensionName: dimensionNames.C,
        score: result.conscientiousnessScore,
        range: this.getScoreRange(result.conscientiousnessScore),
      },
      {
        dimension: 'E',
        dimensionName: dimensionNames.E,
        score: result.extraversionScore,
        range: this.getScoreRange(result.extraversionScore),
      },
      {
        dimension: 'A',
        dimensionName: dimensionNames.A,
        score: result.agreeablenessScore,
        range: this.getScoreRange(result.agreeablenessScore),
      },
      {
        dimension: 'N',
        dimensionName: dimensionNames.N,
        score: result.neuroticismScore,
        range: this.getScoreRange(result.neuroticismScore),
      },
    ];
  }

  /**
   * Determine score range category
   */
  private getScoreRange(score: number): 'high' | 'medium' | 'low' {
    if (score >= 60) return 'high';
    if (score >= 40) return 'medium';
    return 'low';
  }
}
