/**
 * Journal Prompts Seed Data
 * Universal prompts + MBTI-specific prompts
 */

export const JOURNAL_PROMPTS_SEED = [
  // ============ UNIVERSAL PROMPTS (reflection) ============
  {
    mbtiType: null,
    prompt: 'O que você aprendeu sobre si mesmo hoje?',
    category: 'reflection',
  },
  {
    mbtiType: null,
    prompt: 'Descreva um momento em que você se sentiu verdadeiramente você mesmo.',
    category: 'reflection',
  },
  {
    mbtiType: null,
    prompt: 'Qual foi o maior desafio que você enfrentou hoje? Como lidou com ele?',
    category: 'reflection',
  },
  {
    mbtiType: null,
    prompt: 'Liste 3 coisas pelas quais você é grato hoje.',
    category: 'gratitude',
  },
  {
    mbtiType: null,
    prompt: 'O que te fez sorrir hoje?',
    category: 'positive',
  },
  {
    mbtiType: null,
    prompt: 'Se você pudesse dar um conselho para si mesmo há um ano, qual seria?',
    category: 'growth',
  },
  {
    mbtiType: null,
    prompt: 'Que padrão de comportamento você nota em si mesmo ultimamente?',
    category: 'self-awareness',
  },
  {
    mbtiType: null,
    prompt: 'O que você gostaria de mudar na forma como se relaciona com outros?',
    category: 'relationships',
  },
  {
    mbtiType: null,
    prompt: 'Qual emoção você tem evitado sentir? Por quê?',
    category: 'emotions',
  },
  {
    mbtiType: null,
    prompt: 'Descreva um momento recente em que você saiu da sua zona de conforto.',
    category: 'growth',
  },

  // ============ ESTJ PROMPTS ============
  {
    mbtiType: 'ESTJ',
    prompt: 'Hoje você permitiu que algo saísse do plano? Como se sentiu com isso?',
    category: 'flexibility',
  },
  {
    mbtiType: 'ESTJ',
    prompt: 'Você delegou alguma responsabilidade hoje? O que te impediu ou facilitou?',
    category: 'leadership',
  },
  {
    mbtiType: 'ESTJ',
    prompt: 'Quando foi a última vez que você pausou apenas para refletir, sem agir?',
    category: 'mindfulness',
  },

  // ============ INFP PROMPTS ============
  {
    mbtiType: 'INFP',
    prompt: 'Você expressou seus limites para alguém hoje? Se não, o que te impediu?',
    category: 'boundaries',
  },
  {
    mbtiType: 'INFP',
    prompt: 'Que ideia você teve mas não compartilhou? Por que guardou para si?',
    category: 'expression',
  },
  {
    mbtiType: 'INFP',
    prompt: 'Escreva sobre um valor que você não está disposto a comprometer.',
    category: 'values',
  },

  // ============ INTJ PROMPTS ============
  {
    mbtiType: 'INTJ',
    prompt: 'Você reconheceu o trabalho de alguém hoje? Como foi?',
    category: 'appreciation',
  },
  {
    mbtiType: 'INTJ',
    prompt: 'Quando foi a última vez que você teve uma conversa sem objetivo específico?',
    category: 'social',
  },
  {
    mbtiType: 'INTJ',
    prompt: 'Que emoção você sentiu hoje mas não expressou?',
    category: 'emotions',
  },

  // ============ ENTP PROMPTS ============
  {
    mbtiType: 'ENTP',
    prompt: 'Que projeto você finalizou hoje? Se nenhum, qual você deveria finalizar?',
    category: 'completion',
  },
  {
    mbtiType: 'ENTP',
    prompt: 'Você realmente escutou alguém hoje sem contra-argumentar?',
    category: 'listening',
  },

  // ============ ENFJ PROMPTS ============
  {
    mbtiType: 'ENFJ',
    prompt: 'Você priorizou suas necessidades hoje ou apenas as dos outros?',
    category: 'self-care',
  },
  {
    mbtiType: 'ENFJ',
    prompt: 'Quando foi a última vez que você disse "não" para proteger sua energia?',
    category: 'boundaries',
  },

  // ============ ENFP PROMPTS ============
  {
    mbtiType: 'ENFP',
    prompt: 'Você conseguiu focar profundamente em uma coisa hoje? O que te distraiu?',
    category: 'focus',
  },
  {
    mbtiType: 'ENFP',
    prompt: 'Que rotina ou estrutura você poderia adicionar à sua vida?',
    category: 'structure',
  },

  // ============ ENTJ PROMPTS ============
  {
    mbtiType: 'ENTJ',
    prompt: 'Você demonstrou empatia hoje? Como alguém reagiu?',
    category: 'empathy',
  },
  {
    mbtiType: 'ENTJ',
    prompt: 'Você foi paciente com alguém que trabalha mais devagar que você?',
    category: 'patience',
  },

  // ============ ISTJ PROMPTS ============
  {
    mbtiType: 'ISTJ',
    prompt: 'Que tradição ou rotina você questionou hoje?',
    category: 'innovation',
  },
  {
    mbtiType: 'ISTJ',
    prompt: 'Você expressou uma emoção positiva verbalmente hoje?',
    category: 'expression',
  },

  // ============ ISFJ PROMPTS ============
  {
    mbtiType: 'ISFJ',
    prompt: 'Você escolheu suas necessidades sobre as de outra pessoa hoje?',
    category: 'self-priority',
  },
  {
    mbtiType: 'ISFJ',
    prompt: 'Que mudança você fez na sua rotina hoje?',
    category: 'change',
  },

  // ============ ISTP PROMPTS ============
  {
    mbtiType: 'ISTP',
    prompt: 'Você explicou seu processo de pensamento para alguém hoje?',
    category: 'communication',
  },
  {
    mbtiType: 'ISTP',
    prompt: 'Você comunicou suas intenções antes de agir em algo importante?',
    category: 'planning',
  },

  // ============ ISFP PROMPTS ============
  {
    mbtiType: 'ISFP',
    prompt: 'Você disse diretamente algo que sente, sem usar arte como intermediário?',
    category: 'direct-expression',
  },
  {
    mbtiType: 'ISFP',
    prompt: 'Que conflito você está evitando? Por quê?',
    category: 'conflict',
  },

  // ============ ESTP PROMPTS ============
  {
    mbtiType: 'ESTP',
    prompt: 'Você parou para refletir antes de agir hoje?',
    category: 'reflection',
  },
  {
    mbtiType: 'ESTP',
    prompt: 'Que ação de longo prazo você tomou hoje, mesmo sem resultado imediato?',
    category: 'long-term',
  },

  // ============ ESFP PROMPTS ============
  {
    mbtiType: 'ESFP',
    prompt: 'Você planejou algo com antecedência hoje ao invés de improvisar?',
    category: 'planning',
  },
  {
    mbtiType: 'ESFP',
    prompt: 'Você passou tempo sozinho para introspecção hoje?',
    category: 'alone-time',
  },

  // ============ ESFJ PROMPTS ============
  {
    mbtiType: 'ESFJ',
    prompt: 'Você estabeleceu um limite claro com alguém hoje?',
    category: 'boundaries',
  },
  {
    mbtiType: 'ESFJ',
    prompt: 'Você fez algo autêntico hoje, mesmo sabendo que alguém poderia não gostar?',
    category: 'authenticity',
  },

  // ============ INTP PROMPTS ============
  {
    mbtiType: 'INTP',
    prompt: 'Você executou uma ideia hoje ao invés de só analisá-la?',
    category: 'action',
  },
  {
    mbtiType: 'INTP',
    prompt: 'Você teve uma interação social sem motivo utilitário hoje?',
    category: 'social',
  },

  // ============ INFJ PROMPTS ============
  {
    mbtiType: 'INFJ',
    prompt: 'Você protegeu tempo para recarregar sozinho hoje?',
    category: 'self-care',
  },
  {
    mbtiType: 'INFJ',
    prompt: 'Você compartilhou sua visão com alguém hoje sem medo de não ser compreendido?',
    category: 'expression',
  },

  // ============ MORE UNIVERSAL PROMPTS ============
  {
    mbtiType: null,
    prompt: 'Que medo você enfrentou recentemente?',
    category: 'courage',
  },
  {
    mbtiType: null,
    prompt: 'Descreva como você se sente neste exato momento, sem julgamento.',
    category: 'mindfulness',
  },
  {
    mbtiType: null,
    prompt: 'O que você precisa liberar ou deixar ir?',
    category: 'letting-go',
  },
  {
    mbtiType: null,
    prompt: 'Que hábito você gostaria de desenvolver? Por quê?',
    category: 'habits',
  },
  {
    mbtiType: null,
    prompt: 'Como você define sucesso para si mesmo (não para os outros)?',
    category: 'values',
  },
  {
    mbtiType: null,
    prompt: 'Que conversa difícil você tem adiado?',
    category: 'relationships',
  },
  {
    mbtiType: null,
    prompt: 'O que te faz sentir mais vivo?',
    category: 'passion',
  },
  {
    mbtiType: null,
    prompt: 'Quando você se sente mais autêntico?',
    category: 'authenticity',
  },
  {
    mbtiType: null,
    prompt: 'Que crença limitante você percebeu em si mesmo recentemente?',
    category: 'self-awareness',
  },
  {
    mbtiType: null,
    prompt: 'O que você gostaria que as pessoas soubessem sobre você?',
    category: 'identity',
  },
];
