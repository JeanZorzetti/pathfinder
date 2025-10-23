import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BigFiveFacet } from './entities/bigfive-facet.entity';
import { BigFiveQuestion } from './entities/bigfive-question.entity';

@Injectable()
export class BigFiveFacetService {
  constructor(
    @InjectRepository(BigFiveFacet)
    private facetRepository: Repository<BigFiveFacet>,
    @InjectRepository(BigFiveQuestion)
    private questionRepository: Repository<BigFiveQuestion>,
  ) {}

  /**
   * Get all facets for all dimensions
   */
  async getAllFacets(): Promise<BigFiveFacet[]> {
    return this.facetRepository.find({
      order: {
        dimensionCode: 'ASC',
        orderIndex: 'ASC',
      },
    });
  }

  /**
   * Get facets for a specific dimension
   * @param dimensionCode - O, C, E, A, or N
   */
  async getFacetsByDimension(dimensionCode: string): Promise<BigFiveFacet[]> {
    return this.facetRepository.find({
      where: { dimensionCode },
      order: { orderIndex: 'ASC' },
    });
  }

  /**
   * Get a single facet by code
   * @param facetCode - O1, O2, C1, etc.
   */
  async getFacetByCode(facetCode: string): Promise<BigFiveFacet> {
    return this.facetRepository.findOne({
      where: { facetCode },
    });
  }

  /**
   * Calculate facet scores based on user answers
   * @param answers - Array of user answers { questionId, answer }
   * @returns Object with facet codes as keys and scores (0-100) as values
   */
  async calculateFacetScores(
    answers: { questionId: string; answer: number }[],
  ): Promise<{ [facetCode: string]: number }> {
    // Get all questions with their facet codes
    const questions = await this.questionRepository.find({
      where: answers.map((a) => ({ id: a.questionId })),
    });

    // Create a map of questionId -> question for easy lookup
    const questionMap = new Map(questions.map((q) => [q.id, q]));

    // Group answers by facet code
    const facetAnswers: { [facetCode: string]: number[] } = {};

    for (const answer of answers) {
      const question = questionMap.get(answer.questionId);
      if (!question || !question.facetCode) {
        continue; // Skip questions without facet assignment
      }

      const { facetCode, isReversed } = question;

      // Calculate actual score (1-5 scale)
      let score = answer.answer;
      if (isReversed) {
        // Reverse scoring: 5->1, 4->2, 3->3, 2->4, 1->5
        score = 6 - score;
      }

      // Initialize array if first answer for this facet
      if (!facetAnswers[facetCode]) {
        facetAnswers[facetCode] = [];
      }

      facetAnswers[facetCode].push(score);
    }

    // Calculate average score for each facet and convert to 0-100 scale
    const facetScores: { [facetCode: string]: number } = {};

    for (const [facetCode, scores] of Object.entries(facetAnswers)) {
      const averageScore = scores.reduce((sum, s) => sum + s, 0) / scores.length;

      // Convert from 1-5 scale to 0-100 scale
      // 1 -> 0, 3 -> 50, 5 -> 100
      const normalizedScore = ((averageScore - 1) / 4) * 100;

      // Round to nearest integer
      facetScores[facetCode] = Math.round(normalizedScore);
    }

    return facetScores;
  }

  /**
   * Get interpretation for a facet score
   * @param facetCode - O1, O2, etc.
   * @param score - 0-100
   * @param language - 'en' or 'pt'
   * @returns Interpretation object with description
   */
  async getFacetInterpretation(
    facetCode: string,
    score: number,
    language: 'en' | 'pt' = 'en',
  ): Promise<{
    facetCode: string;
    facetName: string;
    score: number;
    level: 'low' | 'medium' | 'high';
    description: string;
  }> {
    const facet = await this.getFacetByCode(facetCode);

    if (!facet) {
      throw new Error(`Facet ${facetCode} not found`);
    }

    // Determine level based on score
    let level: 'low' | 'medium' | 'high';
    let description: string;

    if (score < 40) {
      level = 'low';
      description = language === 'pt' ? facet.lowScoreDescriptionPt : facet.lowScoreDescription;
    } else if (score > 60) {
      level = 'high';
      description = language === 'pt' ? facet.highScoreDescriptionPt : facet.highScoreDescription;
    } else {
      level = 'medium';
      description =
        language === 'pt'
          ? 'Você apresenta características equilibradas nesta faceta, combinando aspectos de ambos os extremos.'
          : 'You show balanced characteristics in this facet, combining aspects of both extremes.';
    }

    return {
      facetCode,
      facetName: language === 'pt' ? facet.facetNamePt : facet.facetName,
      score,
      level,
      description,
    };
  }

  /**
   * Get all facets grouped by dimension with scores and interpretations
   * @param facetScores - Object with facet scores
   * @param language - 'en' or 'pt'
   */
  async getFacetsWithInterpretations(
    facetScores: { [facetCode: string]: number },
    language: 'en' | 'pt' = 'en',
  ): Promise<
    Array<{
      dimensionCode: string;
      dimensionName: string;
      facets: Array<{
        facetCode: string;
        facetName: string;
        facetDescription: string;
        score: number;
        level: 'low' | 'medium' | 'high';
        interpretation: string;
      }>;
    }>
  > {
    const allFacets = await this.getAllFacets();

    // Group by dimension
    const dimensionMap = new Map<
      string,
      {
        dimensionCode: string;
        dimensionName: string;
        facets: any[];
      }
    >();

    for (const facet of allFacets) {
      if (!dimensionMap.has(facet.dimensionCode)) {
        dimensionMap.set(facet.dimensionCode, {
          dimensionCode: facet.dimensionCode,
          dimensionName: facet.dimension?.namePt || facet.dimensionCode,
          facets: [],
        });
      }

      const score = facetScores[facet.facetCode] || null;
      let level: 'low' | 'medium' | 'high' = 'medium';
      let interpretation = '';

      if (score !== null) {
        if (score < 40) {
          level = 'low';
          interpretation = language === 'pt' ? facet.lowScoreDescriptionPt : facet.lowScoreDescription;
        } else if (score > 60) {
          level = 'high';
          interpretation = language === 'pt' ? facet.highScoreDescriptionPt : facet.highScoreDescription;
        } else {
          level = 'medium';
          interpretation =
            language === 'pt'
              ? 'Você apresenta características equilibradas nesta faceta.'
              : 'You show balanced characteristics in this facet.';
        }
      }

      dimensionMap.get(facet.dimensionCode).facets.push({
        facetCode: facet.facetCode,
        facetName: language === 'pt' ? facet.facetNamePt : facet.facetName,
        facetDescription: language === 'pt' ? facet.facetDescriptionPt : facet.facetDescription,
        score,
        level,
        interpretation,
      });
    }

    return Array.from(dimensionMap.values());
  }
}
