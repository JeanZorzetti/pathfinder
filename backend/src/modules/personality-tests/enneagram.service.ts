import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EnneagramType } from './entities/enneagram-type.entity';
import { EnneagramQuestion } from './entities/enneagram-question.entity';
import { EnneagramQuestionTypeMapping } from './entities/enneagram-mapping.entity';

export interface EnneagramAnswer {
  questionId: string;
  answer: number; // 1-5 (Discordo Totalmente a Concordo Totalmente)
}

export interface EnneagramResult {
  primaryType: EnneagramType;
  wing: string | null;
  scores: {
    typeId: string;
    typeName: string;
    score: number; // 0-100
    rawScore: number;
  }[];
  percentages: {
    typeId: string;
    percentage: number;
  }[];
}

@Injectable()
export class EnneagramService {
  constructor(
    @InjectRepository(EnneagramType)
    private readonly typeRepository: Repository<EnneagramType>,
    @InjectRepository(EnneagramQuestion)
    private readonly questionRepository: Repository<EnneagramQuestion>,
    @InjectRepository(EnneagramQuestionTypeMapping)
    private readonly mappingRepository: Repository<EnneagramQuestionTypeMapping>,
  ) {}

  async getAllTypes(): Promise<EnneagramType[]> {
    return this.typeRepository.find({
      order: { number: 'ASC' }
    });
  }

  async getTypeById(id: string): Promise<EnneagramType> {
    const type = await this.typeRepository.findOne({ where: { id } });
    if (!type) {
      throw new NotFoundException(`Tipo Eneagrama com id ${id} não encontrado`);
    }
    return type;
  }

  async getTypeByNumber(number: number): Promise<EnneagramType> {
    const type = await this.typeRepository.findOne({ where: { number } });
    if (!type) {
      throw new NotFoundException(`Tipo Eneagrama número ${number} não encontrado`);
    }
    return type;
  }

  async getQuestions(): Promise<EnneagramQuestion[]> {
    return this.questionRepository.find({
      order: { questionNumber: 'ASC' }
    });
  }

  async calculateResult(answers: EnneagramAnswer[]): Promise<EnneagramResult> {
    // 1. Get all questions with their mappings
    const questions = await this.questionRepository.find({
      relations: ['mappings', 'mappings.enneagramType']
    });

    // 2. Initialize scores for all 9 types
    const typeScores = new Map<string, number>();
    for (let i = 1; i <= 9; i++) {
      typeScores.set(`type${i}`, 0);
    }

    // 3. Calculate raw scores
    for (const answer of answers) {
      const question = questions.find(q => q.id === answer.questionId);
      if (!question) continue;

      // Get mappings for this question
      const mappings = await this.mappingRepository.find({
        where: { questionId: answer.questionId }
      });

      for (const mapping of mappings) {
        // Normalize answer from 1-5 scale to -2 to +2
        const normalizedAnswer = answer.answer - 3; // 1->-2, 2->-1, 3->0, 4->1, 5->2

        // Apply scoring type (direct or reverse)
        let scoringMultiplier = 1;
        if (question.scoringType === 'reverse') {
          scoringMultiplier = -1;
        }

        // Calculate contribution: normalized_answer * weight * scoring_multiplier
        const contribution = normalizedAnswer * mapping.scoreWeight * scoringMultiplier;

        // Add to type score
        const currentScore = typeScores.get(mapping.enneagramTypeId) || 0;
        typeScores.set(mapping.enneagramTypeId, currentScore + contribution);
      }
    }

    // 4. Normalize scores to 0-100 scale
    const rawScores = Array.from(typeScores.entries());
    const minScore = Math.min(...rawScores.map(([_, score]) => score));
    const maxScore = Math.max(...rawScores.map(([_, score]) => score));
    const scoreRange = maxScore - minScore;

    const normalizedScores = rawScores.map(([typeId, rawScore]) => {
      const normalizedScore = scoreRange > 0
        ? ((rawScore - minScore) / scoreRange) * 100
        : 50; // If all scores are equal, set to 50

      return {
        typeId,
        score: Math.round(normalizedScore),
        rawScore
      };
    });

    // 5. Sort by score descending
    normalizedScores.sort((a, b) => b.score - a.score);

    // 6. Identify primary type (highest score)
    const primaryTypeId = normalizedScores[0].typeId;
    const primaryType = await this.typeRepository.findOne({
      where: { id: primaryTypeId }
    });

    if (!primaryType) {
      throw new NotFoundException(`Tipo primário ${primaryTypeId} não encontrado`);
    }

    // 7. Calculate wing (adjacent type with higher score)
    const wing = this.calculateWing(primaryType.number, normalizedScores);

    // 8. Get type names and calculate percentages
    const totalScore = normalizedScores.reduce((sum, item) => sum + item.score, 0);
    const scores = await Promise.all(
      normalizedScores.map(async (item) => {
        const type = await this.typeRepository.findOne({ where: { id: item.typeId } });
        if (!type) {
          throw new NotFoundException(`Tipo ${item.typeId} não encontrado`);
        }
        return {
          typeId: item.typeId,
          typeName: type.name,
          score: item.score,
          rawScore: item.rawScore
        };
      })
    );

    const percentages = normalizedScores.map(item => ({
      typeId: item.typeId,
      percentage: totalScore > 0 ? Math.round((item.score / totalScore) * 100) : 0
    }));

    return {
      primaryType,
      wing,
      scores,
      percentages
    };
  }

  private calculateWing(primaryNumber: number, scores: { typeId: string; score: number }[]): string | null {
    // Get adjacent numbers (wrap around for 1 and 9)
    const adjacentNumbers = [
      primaryNumber === 1 ? 9 : primaryNumber - 1,
      primaryNumber === 9 ? 1 : primaryNumber + 1
    ];

    // Get scores for adjacent types
    const adjacentScores = adjacentNumbers.map(num => {
      const typeId = `type${num}`;
      const scoreObj = scores.find(s => s.typeId === typeId);
      return {
        number: num,
        score: scoreObj?.score || 0
      };
    });

    // Wing is the adjacent type with higher score
    adjacentScores.sort((a, b) => b.score - a.score);
    const wingNumber = adjacentScores[0].number;

    // Return wing notation (e.g., "1w9", "1w2")
    return `${primaryNumber}w${wingNumber}`;
  }

  async getCompatibility(type1Id: string, type2Id: string): Promise<{
    compatibilityScore: number;
    description: string;
  }> {
    const type1 = await this.typeRepository.findOne({ where: { id: type1Id } });
    const type2 = await this.typeRepository.findOne({ where: { id: type2Id } });

    if (!type1 || !type2) {
      return {
        compatibilityScore: 0,
        description: 'Tipos não encontrados'
      };
    }

    // Compatibility matrix (simplified version)
    // This is a basic implementation - can be expanded with more nuanced compatibility data
    const compatibilityMatrix: Record<string, Record<string, number>> = {
      'type1': { 'type1': 70, 'type2': 75, 'type3': 65, 'type4': 60, 'type5': 70, 'type6': 75, 'type7': 60, 'type8': 65, 'type9': 80 },
      'type2': { 'type1': 75, 'type2': 65, 'type3': 70, 'type4': 80, 'type5': 55, 'type6': 75, 'type7': 70, 'type8': 85, 'type9': 75 },
      'type3': { 'type1': 65, 'type2': 70, 'type3': 60, 'type4': 65, 'type5': 60, 'type6': 70, 'type7': 75, 'type8': 80, 'type9': 70 },
      'type4': { 'type1': 60, 'type2': 80, 'type3': 65, 'type4': 70, 'type5': 75, 'type6': 65, 'type7': 60, 'type8': 70, 'type9': 75 },
      'type5': { 'type1': 70, 'type2': 55, 'type3': 60, 'type4': 75, 'type5': 65, 'type6': 70, 'type7': 80, 'type8': 65, 'type9': 75 },
      'type6': { 'type1': 75, 'type2': 75, 'type3': 70, 'type4': 65, 'type5': 70, 'type6': 70, 'type7': 65, 'type8': 75, 'type9': 80 },
      'type7': { 'type1': 60, 'type2': 70, 'type3': 75, 'type4': 60, 'type5': 80, 'type6': 65, 'type7': 65, 'type8': 70, 'type9': 75 },
      'type8': { 'type1': 65, 'type2': 85, 'type3': 80, 'type4': 70, 'type5': 65, 'type6': 75, 'type7': 70, 'type8': 60, 'type9': 85 },
      'type9': { 'type1': 80, 'type2': 75, 'type3': 70, 'type4': 75, 'type5': 75, 'type6': 80, 'type7': 75, 'type8': 85, 'type9': 70 }
    };

    const score = compatibilityMatrix[type1Id]?.[type2Id] || 50;

    let description = '';
    if (score >= 80) {
      description = `${type1.name} e ${type2.name} têm alta compatibilidade. Suas energias se complementam bem e compartilham valores importantes.`;
    } else if (score >= 70) {
      description = `${type1.name} e ${type2.name} têm boa compatibilidade. Com comunicação aberta, podem formar uma parceria sólida.`;
    } else if (score >= 60) {
      description = `${type1.name} e ${type2.name} têm compatibilidade moderada. Precisam trabalhar nas diferenças, mas podem crescer juntos.`;
    } else {
      description = `${type1.name} e ${type2.name} podem enfrentar desafios. Suas diferenças requerem esforço consciente para compatibilidade.`;
    }

    return {
      compatibilityScore: score,
      description
    };
  }
}
