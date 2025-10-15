import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FrameworkCode } from '../entities/personality-framework.entity';
import { PersonalityType } from '../entities/personality-type.entity';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';

@Injectable()
export class ScoringService {
  constructor(
    @InjectRepository(PersonalityType)
    private typesRepository: Repository<PersonalityType>,
  ) {}

  /**
   * Calculate scores based on framework type
   */
  calculateScores(
    frameworkCode: FrameworkCode,
    questions: Question[],
    answers: Answer[],
  ): Record<string, any> {
    switch (frameworkCode) {
      case FrameworkCode.MBTI:
        return this.calculateMBTIScores(questions, answers);
      case FrameworkCode.BIG_FIVE:
        return this.calculateBigFiveScores(questions, answers);
      case FrameworkCode.ENNEAGRAM:
        return this.calculateEnneagramScores(questions, answers);
      default:
        throw new Error(`Unknown framework: ${frameworkCode}`);
    }
  }

  /**
   * Calculate MBTI scores
   */
  private calculateMBTIScores(questions: Question[], answers: Answer[]): Record<string, number> {
    const dimensions = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

    answers.forEach((answer) => {
      const value = answer.selectedValue;
      if (dimensions.hasOwnProperty(value)) {
        dimensions[value]++;
      }
    });

    return dimensions;
  }

  /**
   * Calculate Big Five scores
   */
  private calculateBigFiveScores(
    questions: Question[],
    answers: Answer[],
  ): Record<string, any> {
    const scores = {
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0,
    };

    answers.forEach((answer) => {
      const question = questions.find((q) => q.id === answer.questionId);
      if (!question) return;

      const dimension = question.dimension.toLowerCase();
      const scoreValue = parseInt(answer.selectedValue) || 0;

      if (scores.hasOwnProperty(dimension)) {
        scores[dimension] += scoreValue;
      }
    });

    // Calculate percentages
    const questionsPerDimension = questions.length / 5;
    const maxScore = questionsPerDimension * 5;

    Object.keys(scores).forEach((key) => {
      const percentage = (scores[key] / maxScore) * 100;
      scores[key] = {
        score: scores[key],
        percentage: Math.round(percentage),
        level: this.getLevel(percentage),
      };
    });

    return scores;
  }

  /**
   * Calculate Enneagram scores
   */
  private calculateEnneagramScores(
    questions: Question[],
    answers: Answer[],
  ): Record<string, number> {
    const typeScores = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 0,
    };

    answers.forEach((answer) => {
      const scoreValue = parseInt(answer.selectedValue) || 0;
      const question = questions.find((q) => q.id === answer.questionId);

      if (question && question.dimension) {
        const type = parseInt(question.dimension);
        if (typeScores.hasOwnProperty(type)) {
          typeScores[type] += scoreValue;
        }
      }
    });

    return typeScores;
  }

  /**
   * Determine personality type based on scores
   */
  async determineType(
    frameworkCode: FrameworkCode,
    scores: Record<string, any>,
  ): Promise<PersonalityType> {
    switch (frameworkCode) {
      case FrameworkCode.MBTI:
        return this.determineMBTIType(scores);
      case FrameworkCode.BIG_FIVE:
        return this.determineBigFiveType(scores);
      case FrameworkCode.ENNEAGRAM:
        return this.determineEnneagramType(scores);
      default:
        throw new Error(`Unknown framework: ${frameworkCode}`);
    }
  }

  /**
   * Determine MBTI type
   */
  private async determineMBTIType(scores: Record<string, number>): Promise<PersonalityType> {
    const type =
      (scores.E >= scores.I ? 'E' : 'I') +
      (scores.S >= scores.N ? 'S' : 'N') +
      (scores.T >= scores.F ? 'T' : 'F') +
      (scores.J >= scores.P ? 'J' : 'P');

    const personalityType = await this.typesRepository.findOne({
      where: { code: type },
    });

    if (!personalityType) {
      throw new Error(`Personality type ${type} not found`);
    }

    return personalityType;
  }

  /**
   * Determine Big Five dominant type
   */
  private async determineBigFiveType(scores: Record<string, any>): Promise<PersonalityType> {
    // Find highest scoring dimension
    let highestDimension = '';
    let highestScore = 0;

    Object.entries(scores).forEach(([dimension, data]: [string, any]) => {
      if (data.percentage > highestScore) {
        highestScore = data.percentage;
        highestDimension = dimension;
      }
    });

    // Find type based on dominant trait
    const code = `bigfive_high_${highestDimension}`;
    const personalityType = await this.typesRepository.findOne({
      where: { code },
    });

    if (!personalityType) {
      // Fallback to a generic Big Five type
      const fallbackType = await this.typesRepository.findOne({
        where: { code: 'bigfive_balanced' },
      });

      if (!fallbackType) {
        throw new Error('No Big Five personality type found');
      }

      return fallbackType;
    }

    return personalityType;
  }

  /**
   * Determine Enneagram type
   */
  private async determineEnneagramType(scores: Record<string, number>): Promise<PersonalityType> {
    // Find highest scoring type
    let highestType = 1;
    let highestScore = 0;

    Object.entries(scores).forEach(([type, score]) => {
      if (score > highestScore) {
        highestScore = score;
        highestType = parseInt(type);
      }
    });

    const code = `type${highestType}`;
    const personalityType = await this.typesRepository.findOne({
      where: { code },
    });

    if (!personalityType) {
      throw new Error(`Enneagram type ${highestType} not found`);
    }

    return personalityType;
  }

  /**
   * Get level (High/Medium/Low) from percentage
   */
  private getLevel(percentage: number): string {
    if (percentage >= 70) return 'High';
    if (percentage >= 40) return 'Medium';
    return 'Low';
  }
}
