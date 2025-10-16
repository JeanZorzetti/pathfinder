/**
 * MBTI Test - 60 Questions (15 per dimension)
 * Balanced questions across 6 pages (10 questions per page)
 * Likert Scale: 7 points (-3 to +3)
 */

export type Dimension = 'EI' | 'SN' | 'TF' | 'JP';
export type Pole = 'left' | 'right';

export interface LikertQuestion {
  id: number;
  text: string;
  dimension: Dimension;
  pole: Pole; // 'left' = agree favors first letter, 'right' = agree favors second letter
  page: number; // 1-6
}

export const mbtiQuestions60: LikertQuestion[] = [
  // ========================================
  // PÁGINA 1 (Questões 1-10)
  // Mix: E/I (5) + S/N (5)
  // ========================================

  // E/I - Extroversion vs Introversion (1-5)
  {
    id: 1,
    text: "Eu me sinto energizado quando estou rodeado de muitas pessoas",
    dimension: 'EI',
    pole: 'left', // Concordar = E
    page: 1,
  },
  {
    id: 2,
    text: "Eu prefiro pensar em voz alta conversando com outros",
    dimension: 'EI',
    pole: 'left', // Concordar = E
    page: 1,
  },
  {
    id: 3,
    text: "Eu gosto de ser o centro das atenções em eventos sociais",
    dimension: 'EI',
    pole: 'left', // Concordar = E
    page: 1,
  },
  {
    id: 4,
    text: "Eu faço amizades facilmente com estranhos",
    dimension: 'EI',
    pole: 'left', // Concordar = E
    page: 1,
  },
  {
    id: 5,
    text: "Eu prefiro trabalhar em equipe do que sozinho",
    dimension: 'EI',
    pole: 'left', // Concordar = E
    page: 1,
  },

  // S/N - Sensing vs Intuition (6-10)
  {
    id: 6,
    text: "Eu confio mais em fatos concretos do que em possibilidades abstratas",
    dimension: 'SN',
    pole: 'left', // Concordar = S
    page: 1,
  },
  {
    id: 7,
    text: "Eu prefiro seguir métodos testados e comprovados",
    dimension: 'SN',
    pole: 'left', // Concordar = S
    page: 1,
  },
  {
    id: 8,
    text: "Eu presto mais atenção aos detalhes do que ao panorama geral",
    dimension: 'SN',
    pole: 'left', // Concordar = S
    page: 1,
  },
  {
    id: 9,
    text: "Eu prefiro lidar com informações práticas e aplicáveis",
    dimension: 'SN',
    pole: 'left', // Concordar = S
    page: 1,
  },
  {
    id: 10,
    text: "Eu confio mais na experiência do que na imaginação",
    dimension: 'SN',
    pole: 'left', // Concordar = S
    page: 1,
  },

  // ========================================
  // PÁGINA 2 (Questões 11-20)
  // Mix: T/F (5) + J/P (5)
  // ========================================

  // T/F - Thinking vs Feeling (11-15)
  {
    id: 11,
    text: "Eu tomo decisões baseadas em lógica mais do que em emoções",
    dimension: 'TF',
    pole: 'left', // Concordar = T
    page: 2,
  },
  {
    id: 12,
    text: "Eu valorizo a verdade mais do que a harmonia",
    dimension: 'TF',
    pole: 'left', // Concordar = T
    page: 2,
  },
  {
    id: 13,
    text: "Eu sou mais crítico do que compreensivo",
    dimension: 'TF',
    pole: 'left', // Concordar = T
    page: 2,
  },
  {
    id: 14,
    text: "Eu prefiro ser justo do que misericordioso",
    dimension: 'TF',
    pole: 'left', // Concordar = T
    page: 2,
  },
  {
    id: 15,
    text: "Eu analiso situações de forma objetiva e imparcial",
    dimension: 'TF',
    pole: 'left', // Concordar = T
    page: 2,
  },

  // J/P - Judging vs Perceiving (16-20)
  {
    id: 16,
    text: "Eu gosto de ter planos claros e seguir uma rotina",
    dimension: 'JP',
    pole: 'left', // Concordar = J
    page: 2,
  },
  {
    id: 17,
    text: "Eu prefiro tomar decisões rapidamente e seguir em frente",
    dimension: 'JP',
    pole: 'left', // Concordar = J
    page: 2,
  },
  {
    id: 18,
    text: "Eu me sinto confortável com estrutura e organização",
    dimension: 'JP',
    pole: 'left', // Concordar = J
    page: 2,
  },
  {
    id: 19,
    text: "Eu gosto de concluir tarefas antes dos prazos",
    dimension: 'JP',
    pole: 'left', // Concordar = J
    page: 2,
  },
  {
    id: 20,
    text: "Eu prefiro ter tudo planejado com antecedência",
    dimension: 'JP',
    pole: 'left', // Concordar = J
    page: 2,
  },

  // ========================================
  // PÁGINA 3 (Questões 21-30)
  // Mix: E/I (5) + S/N (5)
  // ========================================

  // E/I - Reversed questions (21-25)
  {
    id: 21,
    text: "Eu preciso de tempo sozinho para recarregar minhas energias após socializar",
    dimension: 'EI',
    pole: 'right', // Concordar = I
    page: 3,
  },
  {
    id: 22,
    text: "Eu prefiro conversas profundas com poucas pessoas a small talk com muitas",
    dimension: 'EI',
    pole: 'right', // Concordar = I
    page: 3,
  },
  {
    id: 23,
    text: "Eu penso melhor quando estou sozinho e em silêncio",
    dimension: 'EI',
    pole: 'right', // Concordar = I
    page: 3,
  },
  {
    id: 24,
    text: "Eu costumo ouvir mais do que falar em grupos grandes",
    dimension: 'EI',
    pole: 'right', // Concordar = I
    page: 3,
  },
  {
    id: 25,
    text: "Eu prefiro atividades solitárias a eventos sociais",
    dimension: 'EI',
    pole: 'right', // Concordar = I
    page: 3,
  },

  // S/N - Reversed questions (26-30)
  {
    id: 26,
    text: "Eu gosto de explorar novas ideias e teorias",
    dimension: 'SN',
    pole: 'right', // Concordar = N
    page: 3,
  },
  {
    id: 27,
    text: "Eu confio mais na minha intuição do que nos fatos",
    dimension: 'SN',
    pole: 'right', // Concordar = N
    page: 3,
  },
  {
    id: 28,
    text: "Eu vejo conexões e padrões que outros não percebem",
    dimension: 'SN',
    pole: 'right', // Concordar = N
    page: 3,
  },
  {
    id: 29,
    text: "Eu prefiro pensar sobre o futuro do que sobre o presente",
    dimension: 'SN',
    pole: 'right', // Concordar = N
    page: 3,
  },
  {
    id: 30,
    text: "Eu valorizo a criatividade mais do que a praticidade",
    dimension: 'SN',
    pole: 'right', // Concordar = N
    page: 3,
  },

  // ========================================
  // PÁGINA 4 (Questões 31-40)
  // Mix: T/F (5) + J/P (5)
  // ========================================

  // T/F - Reversed questions (31-35)
  {
    id: 31,
    text: "Eu considero os sentimentos das pessoas antes de tomar decisões",
    dimension: 'TF',
    pole: 'right', // Concordar = F
    page: 4,
  },
  {
    id: 32,
    text: "Eu valorizo a empatia mais do que a lógica",
    dimension: 'TF',
    pole: 'right', // Concordar = F
    page: 4,
  },
  {
    id: 33,
    text: "Eu prefiro manter a paz do que estar certo",
    dimension: 'TF',
    pole: 'right', // Concordar = F
    page: 4,
  },
  {
    id: 34,
    text: "Eu me preocupo profundamente com o bem-estar emocional dos outros",
    dimension: 'TF',
    pole: 'right', // Concordar = F
    page: 4,
  },
  {
    id: 35,
    text: "Eu tomo decisões baseadas em valores pessoais",
    dimension: 'TF',
    pole: 'right', // Concordar = F
    page: 4,
  },

  // J/P - Reversed questions (36-40)
  {
    id: 36,
    text: "Eu gosto de manter minhas opções em aberto",
    dimension: 'JP',
    pole: 'right', // Concordar = P
    page: 4,
  },
  {
    id: 37,
    text: "Eu trabalho melhor sob pressão de última hora",
    dimension: 'JP',
    pole: 'right', // Concordar = P
    page: 4,
  },
  {
    id: 38,
    text: "Eu prefiro ser espontâneo a seguir um plano rígido",
    dimension: 'JP',
    pole: 'right', // Concordar = P
    page: 4,
  },
  {
    id: 39,
    text: "Eu me adapto facilmente a mudanças inesperadas",
    dimension: 'JP',
    pole: 'right', // Concordar = P
    page: 4,
  },
  {
    id: 40,
    text: "Eu gosto de explorar diferentes possibilidades antes de decidir",
    dimension: 'JP',
    pole: 'right', // Concordar = P
    page: 4,
  },

  // ========================================
  // PÁGINA 5 (Questões 41-50)
  // Mix: E/I (5) + S/N (5)
  // ========================================

  // E/I - Additional questions (41-45)
  {
    id: 41,
    text: "Eu me sinto confortável iniciando conversas com desconhecidos",
    dimension: 'EI',
    pole: 'left', // Concordar = E
    page: 5,
  },
  {
    id: 42,
    text: "Eu gosto de estar constantemente cercado de pessoas",
    dimension: 'EI',
    pole: 'left', // Concordar = E
    page: 5,
  },
  {
    id: 43,
    text: "Eu compartilho facilmente meus pensamentos e sentimentos com outros",
    dimension: 'EI',
    pole: 'left', // Concordar = E
    page: 5,
  },
  {
    id: 44,
    text: "Eu me sinto entediado quando fico muito tempo sozinho",
    dimension: 'EI',
    pole: 'left', // Concordar = E
    page: 5,
  },
  {
    id: 45,
    text: "Eu prefiro ter muitos conhecidos a poucos amigos íntimos",
    dimension: 'EI',
    pole: 'left', // Concordar = E
    page: 5,
  },

  // S/N - Additional questions (46-50)
  {
    id: 46,
    text: "Eu prefiro instruções passo a passo claras",
    dimension: 'SN',
    pole: 'left', // Concordar = S
    page: 5,
  },
  {
    id: 47,
    text: "Eu me concentro no que é real e tangível",
    dimension: 'SN',
    pole: 'left', // Concordar = S
    page: 5,
  },
  {
    id: 48,
    text: "Eu valorizo o senso comum sobre ideias inovadoras",
    dimension: 'SN',
    pole: 'left', // Concordar = S
    page: 5,
  },
  {
    id: 49,
    text: "Eu gosto de trabalhar com informações precisas e específicas",
    dimension: 'SN',
    pole: 'left', // Concordar = S
    page: 5,
  },
  {
    id: 50,
    text: "Eu prefiro aprender fazendo do que teorizando",
    dimension: 'SN',
    pole: 'left', // Concordar = S
    page: 5,
  },

  // ========================================
  // PÁGINA 6 (Questões 51-60)
  // Mix: T/F (5) + J/P (5)
  // ========================================

  // T/F - Additional questions (51-55)
  {
    id: 51,
    text: "Eu sou direto ao dar feedback, mesmo que possa magoar",
    dimension: 'TF',
    pole: 'left', // Concordar = T
    page: 6,
  },
  {
    id: 52,
    text: "Eu me concentro na eficiência mais do que no impacto emocional",
    dimension: 'TF',
    pole: 'left', // Concordar = T
    page: 6,
  },
  {
    id: 53,
    text: "Eu valorizo a competência mais do que a gentileza",
    dimension: 'TF',
    pole: 'left', // Concordar = T
    page: 6,
  },
  {
    id: 54,
    text: "Eu prefiro debates lógicos a discussões sobre sentimentos",
    dimension: 'TF',
    pole: 'left', // Concordar = T
    page: 6,
  },
  {
    id: 55,
    text: "Eu acredito que as pessoas devem ser tratadas igualmente, não especialmente",
    dimension: 'TF',
    pole: 'left', // Concordar = T
    page: 6,
  },

  // J/P - Additional questions (56-60)
  {
    id: 56,
    text: "Eu mantenho meu espaço de trabalho organizado e estruturado",
    dimension: 'JP',
    pole: 'left', // Concordar = J
    page: 6,
  },
  {
    id: 57,
    text: "Eu crio listas e checklists para me manter no caminho certo",
    dimension: 'JP',
    pole: 'left', // Concordar = J
    page: 6,
  },
  {
    id: 58,
    text: "Eu me sinto desconfortável com ambiguidade e incerteza",
    dimension: 'JP',
    pole: 'left', // Concordar = J
    page: 6,
  },
  {
    id: 59,
    text: "Eu prefiro finalizar projetos a começar novos",
    dimension: 'JP',
    pole: 'left', // Concordar = J
    page: 6,
  },
  {
    id: 60,
    text: "Eu gosto de ter controle sobre meu ambiente e agenda",
    dimension: 'JP',
    pole: 'left', // Concordar = J
    page: 6,
  },
];

// Helper to get questions for a specific page
export const getQuestionsForPage = (page: number): LikertQuestion[] => {
  return mbtiQuestions60.filter(q => q.page === page);
};

// Helper to calculate MBTI type from Likert answers
export interface LikertAnswer {
  questionId: number;
  value: -3 | -2 | -1 | 0 | 1 | 2 | 3;
}

export const calculateMBTIFromLikert = (answers: LikertAnswer[]): {
  type: string;
  scores: {
    E: number;
    I: number;
    S: number;
    N: number;
    T: number;
    F: number;
    J: number;
    P: number;
  };
  percentages: {
    EI: number; // 0-100, where 0 = strong I, 100 = strong E
    SN: number;
    TF: number;
    JP: number;
  };
} => {
  const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };

  answers.forEach(answer => {
    const question = mbtiQuestions60.find(q => q.id === answer.questionId);
    if (!question) return;

    const dimension = question.dimension;
    const value = answer.value;

    // If pole is 'left', positive values favor first letter
    // If pole is 'right', positive values favor second letter
    if (dimension === 'EI') {
      if (question.pole === 'left') {
        scores.E += value;
        scores.I -= value;
      } else {
        scores.I += value;
        scores.E -= value;
      }
    } else if (dimension === 'SN') {
      if (question.pole === 'left') {
        scores.S += value;
        scores.N -= value;
      } else {
        scores.N += value;
        scores.S -= value;
      }
    } else if (dimension === 'TF') {
      if (question.pole === 'left') {
        scores.T += value;
        scores.F -= value;
      } else {
        scores.F += value;
        scores.T -= value;
      }
    } else if (dimension === 'JP') {
      if (question.pole === 'left') {
        scores.J += value;
        scores.P -= value;
      } else {
        scores.P += value;
        scores.J -= value;
      }
    }
  });

  // Calculate percentages (0-100 scale)
  const maxScore = 15 * 3; // 15 questions * 3 points max
  const percentages = {
    EI: Math.round(((scores.E + maxScore) / (maxScore * 2)) * 100),
    SN: Math.round(((scores.S + maxScore) / (maxScore * 2)) * 100),
    TF: Math.round(((scores.T + maxScore) / (maxScore * 2)) * 100),
    JP: Math.round(((scores.J + maxScore) / (maxScore * 2)) * 100),
  };

  // Determine type
  const type =
    (scores.E >= scores.I ? 'E' : 'I') +
    (scores.S >= scores.N ? 'S' : 'N') +
    (scores.T >= scores.F ? 'T' : 'F') +
    (scores.J >= scores.P ? 'J' : 'P');

  return { type, scores, percentages };
};

// Likert scale labels
export const likertLabels = [
  { value: 3, label: 'Concordo Totalmente', short: 'Concordo' },
  { value: 2, label: 'Concordo', short: 'Concordo' },
  { value: 1, label: 'Concordo Parcialmente', short: 'Concordo' },
  { value: 0, label: 'Neutro', short: 'Neutro' },
  { value: -1, label: 'Discordo Parcialmente', short: 'Discordo' },
  { value: -2, label: 'Discordo', short: 'Discordo' },
  { value: -3, label: 'Discordo Totalmente', short: 'Discordo' },
];
