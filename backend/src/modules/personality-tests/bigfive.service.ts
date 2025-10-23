import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BigFiveDimension } from './entities/bigfive-dimension.entity';
import { BigFiveQuestion } from './entities/bigfive-question.entity';
import { BigFiveResult } from './entities/bigfive-result.entity';
import { BigFiveFacetService } from './bigfive-facet.service';

export interface BigFiveAnswer {
  questionId: string;
  answer: number; // 1-5 (Likert scale)
}

export interface BigFiveScores {
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface BigFiveCalculateDto {
  userId: string;
  answers: BigFiveAnswer[];
  completionTimeSeconds?: number;
}

@Injectable()
export class BigFiveService {
  constructor(
    @InjectRepository(BigFiveDimension)
    private dimensionsRepository: Repository<BigFiveDimension>,
    @InjectRepository(BigFiveQuestion)
    private questionsRepository: Repository<BigFiveQuestion>,
    @InjectRepository(BigFiveResult)
    private resultsRepository: Repository<BigFiveResult>,
    private facetService: BigFiveFacetService,
  ) {}

  /**
   * Get all 5 dimensions
   */
  async getAllDimensions(): Promise<BigFiveDimension[]> {
    return this.dimensionsRepository.find({
      order: { code: 'ASC' },
    });
  }

  /**
   * Get specific dimension by code
   */
  async getDimensionByCode(code: string): Promise<BigFiveDimension> {
    const dimension = await this.dimensionsRepository.findOne({
      where: { code: code.toUpperCase() },
    });

    if (!dimension) {
      throw new NotFoundException(`Dimension with code ${code} not found`);
    }

    return dimension;
  }

  /**
   * Get all 60 questions
   */
  async getAllQuestions(): Promise<BigFiveQuestion[]> {
    return this.questionsRepository.find({
      order: { orderIndex: 'ASC' },
    });
  }

  /**
   * Get questions for specific dimension
   */
  async getQuestionsByDimension(dimensionCode: string): Promise<BigFiveQuestion[]> {
    return this.questionsRepository.find({
      where: { dimensionCode: dimensionCode.toUpperCase() },
      order: { orderIndex: 'ASC' },
    });
  }

  /**
   * Calculate Big Five scores from answers
   */
  async calculateScores(calculateDto: BigFiveCalculateDto): Promise<BigFiveResult> {
    const { userId, answers, completionTimeSeconds } = calculateDto;

    // Validate we have 60 answers
    if (answers.length !== 60) {
      throw new Error(`Expected 60 answers, got ${answers.length}`);
    }

    // Get all questions to know which are reversed
    const questions = await this.getAllQuestions();
    const questionMap = new Map(questions.map(q => [q.id, q]));

    // Initialize dimension scores
    const dimensionScores: Record<string, number[]> = {
      'O': [],
      'C': [],
      'E': [],
      'A': [],
      'N': [],
    };

    // Process each answer
    for (const answer of answers) {
      const question = questionMap.get(answer.questionId);

      if (!question) {
        throw new NotFoundException(`Question ${answer.questionId} not found`);
      }

      // Validate answer range (1-5)
      if (answer.answer < 1 || answer.answer > 5) {
        throw new Error(`Answer must be between 1 and 5, got ${answer.answer}`);
      }

      // Calculate score for this question
      let score = answer.answer;

      // Reverse scoring if needed (5->1, 4->2, 3->3, 2->4, 1->5)
      if (question.isReversed) {
        score = 6 - answer.answer;
      }

      // Add to dimension's scores
      dimensionScores[question.dimensionCode].push(score);
    }

    // Calculate average for each dimension and convert to 0-100 scale
    const scores: BigFiveScores = {
      openness: this.calculateDimensionScore(dimensionScores['O']),
      conscientiousness: this.calculateDimensionScore(dimensionScores['C']),
      extraversion: this.calculateDimensionScore(dimensionScores['E']),
      agreeableness: this.calculateDimensionScore(dimensionScores['A']),
      neuroticism: this.calculateDimensionScore(dimensionScores['N']),
    };

    // Calculate facet scores (NEW: Phase 2.3)
    const facetScores = await this.facetService.calculateFacetScores(answers);

    // Save result to database
    const result = this.resultsRepository.create({
      userId,
      opennessScore: scores.openness,
      conscientiousnessScore: scores.conscientiousness,
      extraversionScore: scores.extraversion,
      agreeablenessScore: scores.agreeableness,
      neuroticismScore: scores.neuroticism,
      facetScores, // Store facet scores in JSONB column
      answers,
      completionTimeSeconds,
    });

    return this.resultsRepository.save(result);
  }

  /**
   * Calculate dimension score from array of individual scores
   * Converts from 1-5 scale to 0-100 scale
   */
  private calculateDimensionScore(scores: number[]): number {
    if (scores.length === 0) return 0;

    // Calculate average (will be between 1 and 5)
    const average = scores.reduce((sum, score) => sum + score, 0) / scores.length;

    // Convert to 0-100 scale
    // 1 -> 0, 3 -> 50, 5 -> 100
    const normalized = ((average - 1) / 4) * 100;

    // Round to integer
    return Math.round(normalized);
  }

  /**
   * Get user's most recent Big Five result
   */
  async getUserLatestResult(userId: string): Promise<BigFiveResult | null> {
    return this.resultsRepository.findOne({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get all user's Big Five results (history)
   */
  async getUserResults(userId: string): Promise<BigFiveResult[]> {
    return this.resultsRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get result by ID
   */
  async getResultById(resultId: string): Promise<BigFiveResult> {
    const result = await this.resultsRepository.findOne({
      where: { id: resultId },
    });

    if (!result) {
      throw new NotFoundException(`Result with ID ${resultId} not found`);
    }

    return result;
  }

  /**
   * Get interpretation for a dimension score
   */
  getScoreInterpretation(score: number): 'low' | 'medium' | 'high' {
    if (score < 40) return 'low';
    if (score > 60) return 'high';
    return 'medium';
  }

  /**
   * Get population percentile (approximation)
   * Big Five scores typically follow a normal distribution
   */
  getPercentile(score: number): number {
    // Assuming mean of 50 and standard deviation of 15
    // This is a simplified approximation
    const mean = 50;
    const stdDev = 15;
    const zScore = (score - mean) / stdDev;

    // Convert z-score to percentile (simplified)
    // This uses an approximation - in production you'd use a proper statistical library
    if (zScore <= -2) return 2;
    if (zScore <= -1.5) return 7;
    if (zScore <= -1) return 16;
    if (zScore <= -0.5) return 31;
    if (zScore <= 0) return 50;
    if (zScore <= 0.5) return 69;
    if (zScore <= 1) return 84;
    if (zScore <= 1.5) return 93;
    if (zScore <= 2) return 98;
    return 99;
  }

  /**
   * Get statistics across all users
   */
  async getGlobalStatistics(): Promise<{
    totalTests: number;
    averageScores: BigFiveScores;
  }> {
    const results = await this.resultsRepository.find();

    if (results.length === 0) {
      return {
        totalTests: 0,
        averageScores: {
          openness: 50,
          conscientiousness: 50,
          extraversion: 50,
          agreeableness: 50,
          neuroticism: 50,
        },
      };
    }

    const averageScores: BigFiveScores = {
      openness: Math.round(
        results.reduce((sum, r) => sum + r.opennessScore, 0) / results.length
      ),
      conscientiousness: Math.round(
        results.reduce((sum, r) => sum + r.conscientiousnessScore, 0) / results.length
      ),
      extraversion: Math.round(
        results.reduce((sum, r) => sum + r.extraversionScore, 0) / results.length
      ),
      agreeableness: Math.round(
        results.reduce((sum, r) => sum + r.agreeablenessScore, 0) / results.length
      ),
      neuroticism: Math.round(
        results.reduce((sum, r) => sum + r.neuroticismScore, 0) / results.length
      ),
    };

    return {
      totalTests: results.length,
      averageScores,
    };
  }
}
