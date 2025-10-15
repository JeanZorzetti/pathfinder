/**
 * ========================================
 * ENNEAGRAM QUESTIONS DATA
 * ========================================
 * 27 questões do Eneagrama (3 por tipo)
 * Focadas em identificar motivações, medos e padrões comportamentais
 */

export const enneagramQuestionsData = [
  // ============================================
  // TIPO 1 - O REFORMADOR (3 questões)
  // ============================================
  {
    questionText:
      'Quando vejo algo sendo feito de forma errada ou ineficiente, sinto uma forte necessidade de corrigi-lo ou melhorá-lo.',
    dimension: '1',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 0,
  },
  {
    questionText:
      'Tenho padrões muito elevados para mim mesmo e fico frustrado quando não consigo alcançá-los.',
    dimension: '1',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 1,
  },
  {
    questionText:
      'Acredito que há um jeito certo de fazer as coisas e me incomoda quando as pessoas não seguem princípios éticos.',
    dimension: '1',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 2,
  },

  // ============================================
  // TIPO 2 - O AJUDANTE (3 questões)
  // ============================================
  {
    questionText:
      'Sinto-me mais feliz e realizado quando estou ajudando alguém que precisa de mim.',
    dimension: '2',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 3,
  },
  {
    questionText:
      'Percebo rapidamente as necessidades emocionais dos outros e sinto vontade de atendê-las antes mesmo que me peçam.',
    dimension: '2',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 4,
  },
  {
    questionText:
      'Às vezes negligencio minhas próprias necessidades porque estou muito ocupado cuidando dos outros.',
    dimension: '2',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 5,
  },

  // ============================================
  // TIPO 3 - O REALIZADOR (3 questões)
  // ============================================
  {
    questionText:
      'Sou altamente motivado por objetivos e metas, e me sinto realizado quando alcanço sucesso em meus projetos.',
    dimension: '3',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 6,
  },
  {
    questionText:
      'Adapto minha imagem e comportamento dependendo de com quem estou para causar a melhor impressão possível.',
    dimension: '3',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 7,
  },
  {
    questionText:
      'Preocupo-me bastante com o que os outros pensam sobre minhas conquistas e gosto de ser reconhecido pelo meu trabalho.',
    dimension: '3',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 8,
  },

  // ============================================
  // TIPO 4 - O INDIVIDUALISTA (3 questões)
  // ============================================
  {
    questionText:
      'Sinto-me frequentemente diferente dos outros, como se ninguém realmente me compreendesse por completo.',
    dimension: '4',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 9,
  },
  {
    questionText:
      'Tenho uma rica vida interior e valorizo profundamente a autenticidade e a expressão criativa das emoções.',
    dimension: '4',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 10,
  },
  {
    questionText:
      'Às vezes mergulho em melancolia ou sentimentos intensos, e aprecio a beleza até mesmo na tristeza.',
    dimension: '4',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 11,
  },

  // ============================================
  // TIPO 5 - O INVESTIGADOR (3 questões)
  // ============================================
  {
    questionText:
      'Prefiro observar e analisar as situações antes de me envolver, e valorizo conhecimento e competência intelectual.',
    dimension: '5',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 12,
  },
  {
    questionText:
      'Preciso de bastante tempo sozinho para recarregar minhas energias e processar informações.',
    dimension: '5',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 13,
  },
  {
    questionText:
      'Sinto-me desconfortável quando as pessoas têm expectativas emocionais sobre mim ou demandam muito da minha energia.',
    dimension: '5',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 14,
  },

  // ============================================
  // TIPO 6 - O LEAL (3 questões)
  // ============================================
  {
    questionText:
      'Tendo a antecipar problemas potenciais e me preparar para diferentes cenários antes de tomar decisões.',
    dimension: '6',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 15,
  },
  {
    questionText:
      'Sou extremamente leal às pessoas e causas em que acredito, e levo meus compromissos muito a sério.',
    dimension: '6',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 16,
  },
  {
    questionText:
      'Frequentemente questiono as intenções dos outros e preciso de tempo para confiar plenamente em alguém.',
    dimension: '6',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 17,
  },

  // ============================================
  // TIPO 7 - O ENTUSIASTA (3 questões)
  // ============================================
  {
    questionText:
      'Adoro explorar novas possibilidades e experiências, e me sinto energizado por variedade e aventura.',
    dimension: '7',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 18,
  },
  {
    questionText:
      'Tendo a evitar emoções negativas ou situações dolorosas, preferindo focar no lado positivo das coisas.',
    dimension: '7',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 19,
  },
  {
    questionText:
      'Tenho muitos interesses e projetos simultâneos, e às vezes tenho dificuldade em me comprometer com apenas um.',
    dimension: '7',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 20,
  },

  // ============================================
  // TIPO 8 - O DESAFIADOR (3 questões)
  // ============================================
  {
    questionText:
      'Prefiro estar no controle das situações e me sinto desconfortável quando outros tentam me controlar.',
    dimension: '8',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 21,
  },
  {
    questionText:
      'Não tenho medo de confrontos e defendo com firmeza aquilo em que acredito, mesmo que isso gere conflitos.',
    dimension: '8',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 22,
  },
  {
    questionText:
      'Sinto-me naturalmente inclinado a proteger os mais fracos e a lutar contra injustiças.',
    dimension: '8',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 23,
  },

  // ============================================
  // TIPO 9 - O PACIFICADOR (3 questões)
  // ============================================
  {
    questionText:
      'Valorizo profundamente a paz e a harmonia, e faço o possível para evitar conflitos e tensões.',
    dimension: '9',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 24,
  },
  {
    questionText:
      'Tenho facilidade em ver os diferentes lados de uma questão e entender múltiplas perspectivas.',
    dimension: '9',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 25,
  },
  {
    questionText:
      'Às vezes tenho dificuldade em priorizar minhas próprias necessidades e opiniões quando isso pode causar desconforto aos outros.',
    dimension: '9',
    options: [
      { label: 'Discordo totalmente', value: '1', score: 0 },
      { label: 'Discordo parcialmente', value: '2', score: 1 },
      { label: 'Neutro', value: '3', score: 2 },
      { label: 'Concordo parcialmente', value: '4', score: 3 },
      { label: 'Concordo totalmente', value: '5', score: 4 },
    ],
    orderIndex: 26,
  },
];
