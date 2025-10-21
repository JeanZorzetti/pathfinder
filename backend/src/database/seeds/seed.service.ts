import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PersonalityFramework, FrameworkCode } from '../../modules/personality-tests/entities/personality-framework.entity';
import { PersonalityType } from '../../modules/personality-tests/entities/personality-type.entity';
import { Question } from '../../modules/personality-tests/entities/question.entity';
import { mbtiTypesData } from './data/mbti-types.data';
import { mbtiQuestionsData } from './data/mbti-questions.data';
import { bigFiveTypesData } from './data/bigfive-types.data';
import { bigFiveQuestionsData } from './data/bigfive-questions.data';
import { enneagramTypesData } from './data/enneagram-types.data';
import { enneagramQuestionsData } from './data/enneagram-questions.data';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(PersonalityFramework)
    private frameworksRepository: Repository<PersonalityFramework>,
    @InjectRepository(PersonalityType)
    private typesRepository: Repository<PersonalityType>,
    @InjectRepository(Question)
    private questionsRepository: Repository<Question>,
  ) {}

  async seedAll() {
    console.log('🌱 Starting database seeding...');

    await this.seedFrameworks();
    await this.seedMBTITypes();
    await this.seedMBTIQuestions();
    await this.seedBigFiveTypes();
    await this.seedBigFiveQuestions();
    await this.seedEnneagramTypes();
    await this.seedEnneagramQuestions();

    console.log('✅ Database seeding completed!');
  }

  private async seedFrameworks() {
    console.log('📦 Seeding frameworks...');

    const frameworks = [
      {
        code: FrameworkCode.MBTI,
        name: 'Myers-Briggs Type Indicator',
        description:
          'O MBTI categoriza a personalidade em 16 tipos baseados em 4 dimensões: Extroversão/Introversão, Sensação/Intuição, Pensamento/Sentimento, Julgamento/Percepção.',
        shortDescription: 'Sistema de 16 tipos de personalidade baseado em preferências cognitivas',
        sortOrder: 1,
        isActive: true,
      },
      {
        code: FrameworkCode.BIG_FIVE,
        name: 'Big Five (OCEAN)',
        description:
          'O modelo Big Five avalia a personalidade em 5 dimensões amplas: Abertura, Conscienciosidade, Extroversão, Amabilidade e Neuroticismo.',
        shortDescription: 'Avaliação científica em 5 dimensões da personalidade',
        sortOrder: 2,
        isActive: true,
      },
      {
        code: FrameworkCode.ENNEAGRAM,
        name: 'Eneagrama',
        description:
          'O Eneagrama descreve 9 tipos de personalidade interconectados, cada um com motivações, medos e padrões de comportamento únicos.',
        shortDescription: 'Sistema de 9 tipos baseado em motivações profundas',
        sortOrder: 3,
        isActive: true,
      },
    ];

    for (const framework of frameworks) {
      const existing = await this.frameworksRepository.findOne({
        where: { code: framework.code },
      });

      if (!existing) {
        await this.frameworksRepository.save(framework);
        console.log(`  ✓ Created framework: ${framework.name}`);
      } else {
        console.log(`  ⊙ Framework already exists: ${framework.name}`);
      }
    }
  }

  private async seedMBTITypes() {
    console.log('📦 Seeding MBTI types...');

    const mbtiFramework = await this.frameworksRepository.findOne({
      where: { code: FrameworkCode.MBTI },
    });

    if (!mbtiFramework) {
      console.log('  ✗ MBTI framework not found. Skipping types.');
      return;
    }

    for (const [code, data] of Object.entries(mbtiTypesData)) {
      const existing = await this.typesRepository.findOne({
        where: { code: code.toUpperCase() },
      });

      if (!existing) {
        await this.typesRepository.save({
          code: code.toUpperCase(),
          name: data.name,
          title: data.title,
          description: data.description,
          shortDescription: data.shortDescription,
          slug: data.slug,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          keywords: data.keywords,
          strengths: data.strengths,
          weaknesses: data.weaknesses,
          careers: data.careers,
          relationships: data.relationships,
          growth: data.growth,
          traits: data.traits || {},
          compatibility: {},
          frameworkId: mbtiFramework.id,
          isActive: true,
        });
        console.log(`  ✓ Created MBTI type: ${code.toUpperCase()} - ${data.name}`);
      } else {
        console.log(`  ⊙ MBTI type already exists: ${code.toUpperCase()}`);
      }
    }
  }

  private async seedMBTIQuestions() {
    console.log('📦 Seeding MBTI questions...');

    const mbtiFramework = await this.frameworksRepository.findOne({
      where: { code: FrameworkCode.MBTI },
    });

    if (!mbtiFramework) {
      console.log('  ✗ MBTI framework not found. Skipping questions.');
      return;
    }

    for (let i = 0; i < mbtiQuestionsData.length; i++) {
      const q = mbtiQuestionsData[i];
      const existing = await this.questionsRepository.findOne({
        where: {
          frameworkId: mbtiFramework.id,
          orderIndex: i,
        },
      });

      if (!existing) {
        await this.questionsRepository.save({
          questionText: q.question,
          dimension: q.dimension,
          options: q.options,
          orderIndex: i,
          frameworkId: mbtiFramework.id,
          isActive: true,
        });
        console.log(`  ✓ Created question ${i + 1}/${mbtiQuestionsData.length}`);
      }
    }

    console.log(`  ✓ All MBTI questions processed`);
  }

  private async seedBigFiveTypes() {
    console.log('📦 Seeding Big Five types...');
    console.log('  ⊙ Big Five now uses separate tables (bigfive_dimensions)');
    console.log('  ⊙ Dimensions are populated via SQL migration');
    console.log('  ⊙ Skipping old test_frameworks seed for Big Five types');
    // Note: Big Five dimensions are now in bigfive_dimensions table
    // They are populated via SQL migration, not via this seed
  }

  private async seedBigFiveQuestions() {
    console.log('📦 Seeding Big Five questions...');
    console.log('  ⊙ Big Five now uses separate tables (bigfive_questions)');
    console.log('  ⊙ Questions are populated via SQL migration');
    console.log('  ⊙ Skipping old test_frameworks seed for Big Five');
    // Note: Big Five questions are now in bigfive_questions table
    // They are populated via SQL migration, not via this seed
  }

  private async seedEnneagramTypes() {
    console.log('📦 Seeding Enneagram types...');

    const enneagramFramework = await this.frameworksRepository.findOne({
      where: { code: FrameworkCode.ENNEAGRAM },
    });

    if (!enneagramFramework) {
      console.log('  ✗ Enneagram framework not found. Skipping types.');
      return;
    }

    for (const [key, data] of Object.entries(enneagramTypesData)) {
      const existing = await this.typesRepository.findOne({
        where: { slug: data.slug },
      });

      if (!existing) {
        await this.typesRepository.save({
          code: key.toUpperCase().replace(/_/g, '-'),
          name: data.name,
          title: data.title,
          description: data.description,
          shortDescription: data.shortDescription,
          slug: data.slug,
          metaTitle: data.metaTitle,
          metaDescription: data.metaDescription,
          keywords: data.keywords,
          strengths: data.strengths,
          weaknesses: data.weaknesses,
          careers: data.careers,
          relationships: data.relationships || '',
          growth: data.growth || '',
          traits: data.traits || {},
          compatibility: {},
          frameworkId: enneagramFramework.id,
          isActive: true,
        });
        console.log(`  ✓ Created Enneagram type: ${data.title}`);
      } else {
        console.log(`  ⊙ Enneagram type already exists: ${data.title}`);
      }
    }
  }

  private async seedEnneagramQuestions() {
    console.log('📦 Seeding Enneagram questions...');

    const enneagramFramework = await this.frameworksRepository.findOne({
      where: { code: FrameworkCode.ENNEAGRAM },
    });

    if (!enneagramFramework) {
      console.log('  ✗ Enneagram framework not found. Skipping questions.');
      return;
    }

    for (let i = 0; i < enneagramQuestionsData.length; i++) {
      const q = enneagramQuestionsData[i];
      const existing = await this.questionsRepository.findOne({
        where: {
          frameworkId: enneagramFramework.id,
          orderIndex: q.orderIndex,
        },
      });

      if (!existing) {
        await this.questionsRepository.save({
          questionText: q.questionText,
          dimension: q.dimension,
          options: q.options,
          orderIndex: q.orderIndex,
          frameworkId: enneagramFramework.id,
          isActive: true,
        });
        console.log(`  ✓ Created question ${i + 1}/${enneagramQuestionsData.length}`);
      }
    }

    console.log(`  ✓ All Enneagram questions processed`);
  }
}
