import { DataSource } from 'typeorm';
import { EnneagramQuestion } from '../../modules/personality-tests/entities/enneagram-question.entity';
import { EnneagramQuestionTypeMapping } from '../../modules/personality-tests/entities/enneagram-mapping.entity';

export async function seedEnneagramQuestions(dataSource: DataSource): Promise<void> {
  const questionRepo = dataSource.getRepository(EnneagramQuestion);
  const mappingRepo = dataSource.getRepository(EnneagramQuestionTypeMapping);

  // Define questions with their mappings
  const questionsData = [
    {
      questionNumber: 1,
      questionText: 'Eu me esforço para fazer as coisas da maneira correta e evitar erros.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type1', weight: 3 },
        { typeId: 'type6', weight: 1 }
      ]
    },
    {
      questionNumber: 2,
      questionText: 'Eu gosto de ajudar os outros e me sinto satisfeito quando faço isso.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type2', weight: 3 },
        { typeId: 'type9', weight: 1 }
      ]
    },
    {
      questionNumber: 3,
      questionText: 'Eu me preocupo muito com minha imagem e como os outros me veem.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type3', weight: 3 },
        { typeId: 'type2', weight: 1 }
      ]
    },
    {
      questionNumber: 4,
      questionText: 'Eu frequentemente me sinto diferente ou incompreendido pelos outros.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type4', weight: 3 },
        { typeId: 'type5', weight: 1 }
      ]
    },
    {
      questionNumber: 5,
      questionText: 'Eu valorizo minha privacidade e preciso de tempo sozinho para recarregar.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type5', weight: 3 },
        { typeId: 'type4', weight: 1 }
      ]
    },
    {
      questionNumber: 6,
      questionText: 'Eu tendo a me preocupar e antecipar possíveis problemas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type6', weight: 3 },
        { typeId: 'type1', weight: 1 }
      ]
    },
    {
      questionNumber: 7,
      questionText: 'Eu adoro novas experiências e mantenho muitas opções abertas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type7', weight: 3 },
        { typeId: 'type3', weight: 1 }
      ]
    },
    {
      questionNumber: 8,
      questionText: 'Eu sou direto, assertivo e não tenho medo de confrontações.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type8', weight: 3 },
        { typeId: 'type1', weight: 1 }
      ]
    },
    {
      questionNumber: 9,
      questionText: 'Eu valorizo a paz e a harmonia e evito conflitos sempre que possível.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type9', weight: 3 },
        { typeId: 'type2', weight: 1 }
      ]
    },
    {
      questionNumber: 10,
      questionText: 'Eu tendo a ser crítico comigo mesmo e com os outros.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type1', weight: 2 },
        { typeId: 'type4', weight: 1 },
        { typeId: 'type6', weight: 1 }
      ]
    },
    {
      questionNumber: 11,
      questionText: 'Eu frequentemente coloco as necessidades dos outros antes das minhas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type2', weight: 3 },
        { typeId: 'type9', weight: 1 }
      ]
    },
    {
      questionNumber: 12,
      questionText: 'Eu sou muito orientado para objetivos e gosto de ser produtivo.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type3', weight: 3 },
        { typeId: 'type1', weight: 1 }
      ]
    },
    {
      questionNumber: 13,
      questionText: 'Eu valorizo autenticidade e expressar minha individualidade única.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type4', weight: 3 },
        { typeId: 'type7', weight: 1 }
      ]
    },
    {
      questionNumber: 14,
      questionText: 'Eu prefiro observar e analisar antes de agir.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type5', weight: 3 },
        { typeId: 'type9', weight: 1 }
      ]
    },
    {
      questionNumber: 15,
      questionText: 'Eu sou leal às pessoas e causas em que acredito.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type6', weight: 3 },
        { typeId: 'type2', weight: 1 }
      ]
    },
    {
      questionNumber: 16,
      questionText: 'Eu tendo a evitar sentimentos dolorosos focando em coisas positivas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type7', weight: 3 },
        { typeId: 'type9', weight: 1 }
      ]
    },
    {
      questionNumber: 17,
      questionText: 'Eu gosto de estar no controle e tomar decisões.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type8', weight: 3 },
        { typeId: 'type3', weight: 1 }
      ]
    },
    {
      questionNumber: 18,
      questionText: 'Eu prefiro manter as coisas tranquilas e estáveis.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type9', weight: 3 },
        { typeId: 'type5', weight: 1 }
      ]
    },
    {
      questionNumber: 19,
      questionText: 'Eu tenho altos padrões e espero que outros também os tenham.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type1', weight: 3 },
        { typeId: 'type3', weight: 1 }
      ]
    },
    {
      questionNumber: 20,
      questionText: 'Eu me sinto mais feliz quando estou sendo útil aos outros.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type2', weight: 3 },
        { typeId: 'type6', weight: 1 }
      ]
    },
    {
      questionNumber: 21,
      questionText: 'Eu me adapto facilmente a diferentes situações e pessoas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type3', weight: 2 },
        { typeId: 'type7', weight: 2 },
        { typeId: 'type9', weight: 1 }
      ]
    },
    {
      questionNumber: 22,
      questionText: 'Eu frequentemente tenho sentimentos intensos e profundos.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type4', weight: 3 },
        { typeId: 'type8', weight: 1 }
      ]
    },
    {
      questionNumber: 23,
      questionText: 'Eu preciso entender as coisas completamente antes de me comprometer.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type5', weight: 3 },
        { typeId: 'type6', weight: 1 }
      ]
    },
    {
      questionNumber: 24,
      questionText: 'Eu questiono autoridade e gosto de testar limites.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type6', weight: 2 },
        { typeId: 'type8', weight: 2 }
      ]
    },
    {
      questionNumber: 25,
      questionText: 'Eu fico entediado facilmente e busco constantemente novas experiências.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type7', weight: 3 },
        { typeId: 'type3', weight: 1 }
      ]
    },
    {
      questionNumber: 26,
      questionText: 'Eu sou protetor daqueles que amo e não tolero injustiças.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type8', weight: 3 },
        { typeId: 'type6', weight: 1 }
      ]
    },
    {
      questionNumber: 27,
      questionText: 'Eu tendo a procrastinar e ter dificuldade em me motivar.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type9', weight: 3 },
        { typeId: 'type4', weight: 1 }
      ]
    },
    {
      questionNumber: 28,
      questionText: 'Eu me ressinto quando as pessoas não reconhecem meus esforços.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type1', weight: 2 },
        { typeId: 'type2', weight: 2 }
      ]
    },
    {
      questionNumber: 29,
      questionText: 'Eu preciso me sentir necessário e apreciado pelas pessoas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type2', weight: 3 },
        { typeId: 'type3', weight: 1 }
      ]
    },
    {
      questionNumber: 30,
      questionText: 'Eu me preocupo muito com fracasso e decepcionar os outros.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type3', weight: 2 },
        { typeId: 'type6', weight: 2 }
      ]
    },
    {
      questionNumber: 31,
      questionText: 'Eu sinto que algo está sempre faltando em minha vida.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type4', weight: 3 },
        { typeId: 'type7', weight: 1 }
      ]
    },
    {
      questionNumber: 32,
      questionText: 'Eu me sinto desconfortável com expressões emocionais intensas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type5', weight: 3 },
        { typeId: 'type9', weight: 1 }
      ]
    },
    {
      questionNumber: 33,
      questionText: 'Eu tendo a imaginar cenários de pior caso.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type6', weight: 3 },
        { typeId: 'type4', weight: 1 }
      ]
    },
    {
      questionNumber: 34,
      questionText: 'Eu gosto de manter minhas opções abertas e não me comprometer.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type7', weight: 3 },
        { typeId: 'type9', weight: 1 }
      ]
    },
    {
      questionNumber: 35,
      questionText: 'Eu sou direto e honesto, mesmo que isso incomode outros.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type8', weight: 3 },
        { typeId: 'type1', weight: 1 }
      ]
    },
    {
      questionNumber: 36,
      questionText: 'Eu vejo todos os lados de uma questão e tenho dificuldade em tomar decisões.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type9', weight: 3 },
        { typeId: 'type6', weight: 1 }
      ]
    },
    {
      questionNumber: 37,
      questionText: 'Eu reprimo minha raiva mas ela às vezes sai de formas indiretas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type1', weight: 2 },
        { typeId: 'type9', weight: 2 }
      ]
    },
    {
      questionNumber: 38,
      questionText: 'Eu fico magoado quando as pessoas não precisam de mim.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type2', weight: 3 }
      ]
    },
    {
      questionNumber: 39,
      questionText: 'Eu confundo meu valor com minhas conquistas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type3', weight: 3 }
      ]
    },
    {
      questionNumber: 40,
      questionText: 'Eu tenho inveja do que os outros têm ou são.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type4', weight: 3 }
      ]
    },
    {
      questionNumber: 41,
      questionText: 'Eu me sinto drenado depois de muito tempo com outras pessoas.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type5', weight: 3 },
        { typeId: 'type4', weight: 1 }
      ]
    },
    {
      questionNumber: 42,
      questionText: 'Eu busco orientação e reasseguramento de autoridades ou grupos.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type6', weight: 3 },
        { typeId: 'type2', weight: 1 }
      ]
    },
    {
      questionNumber: 43,
      questionText: 'Eu tendo a ser impulsivo e agir antes de pensar.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type7', weight: 2 },
        { typeId: 'type8', weight: 2 }
      ]
    },
    {
      questionNumber: 44,
      questionText: 'Eu raramente mostro vulnerabilidade ou fraqueza.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type8', weight: 3 },
        { typeId: 'type5', weight: 1 }
      ]
    },
    {
      questionNumber: 45,
      questionText: 'Eu evito conflitos mesmo quando eles são necessários.',
      scoringType: 'direct',
      mappings: [
        { typeId: 'type9', weight: 3 },
        { typeId: 'type2', weight: 1 }
      ]
    },
    {
      questionNumber: 46,
      questionText: 'Eu me sinto relaxado quando estou ocupado e fazendo coisas.',
      scoringType: 'reverse',
      mappings: [
        { typeId: 'type9', weight: -2 },
        { typeId: 'type3', weight: 2 },
        { typeId: 'type7', weight: 2 }
      ]
    },
    {
      questionNumber: 47,
      questionText: 'Eu raramente me preocupo com regras ou padrões.',
      scoringType: 'reverse',
      mappings: [
        { typeId: 'type1', weight: -3 },
        { typeId: 'type7', weight: 2 }
      ]
    },
    {
      questionNumber: 48,
      questionText: 'Eu acho difícil entender por que as pessoas são tão emocionais.',
      scoringType: 'reverse',
      mappings: [
        { typeId: 'type4', weight: -3 },
        { typeId: 'type5', weight: 2 }
      ]
    },
    {
      questionNumber: 49,
      questionText: 'Eu me sinto confortável confiando plenamente nos outros.',
      scoringType: 'reverse',
      mappings: [
        { typeId: 'type6', weight: -3 },
        { typeId: 'type2', weight: 2 }
      ]
    },
    {
      questionNumber: 50,
      questionText: 'Eu raramente penso no futuro ou faço planos.',
      scoringType: 'reverse',
      mappings: [
        { typeId: 'type7', weight: -2 },
        { typeId: 'type9', weight: 2 }
      ]
    }
  ];

  // Insert questions and mappings
  for (const qData of questionsData) {
    const question = await questionRepo.save({
      questionNumber: qData.questionNumber,
      questionText: qData.questionText,
      scoringType: qData.scoringType
    });

    for (const mapping of qData.mappings) {
      await mappingRepo.save({
        questionId: question.id,
        enneagramTypeId: mapping.typeId,
        scoreWeight: mapping.weight
      });
    }
  }

  console.log('✅ Seeded 50 Enneagram questions with mappings successfully');
}
