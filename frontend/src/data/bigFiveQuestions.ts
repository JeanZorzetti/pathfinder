export interface BigFiveQuestion {
  id: number;
  text: string;
  trait: 'openness' | 'conscientiousness' | 'extraversion' | 'agreeableness' | 'neuroticism';
  reverse?: boolean; // Se true, a pontuação é invertida
}

export const bigFiveQuestions: BigFiveQuestion[] = [
  // Openness (Abertura)
  { id: 1, text: "Tenho uma imaginação vívida e ativa", trait: "openness" },
  { id: 2, text: "Gosto de experimentar novas ideias e formas de fazer as coisas", trait: "openness" },
  { id: 3, text: "Aprecio arte, música e literatura profundamente", trait: "openness" },
  { id: 4, text: "Prefiro rotinas conhecidas a novidades", trait: "openness", reverse: true },
  { id: 5, text: "Sou curioso(a) sobre diferentes culturas e filosofias", trait: "openness" },
  { id: 6, text: "Gosto de teoria e conceitos abstratos", trait: "openness" },
  { id: 7, text: "Sou conservador(a) em meus gostos e opiniões", trait: "openness", reverse: true },
  { id: 8, text: "Valorizo criatividade e originalidade", trait: "openness" },

  // Conscientiousness (Conscienciosidade)
  { id: 9, text: "Sou organizado(a) e gosto de manter as coisas arrumadas", trait: "conscientiousness" },
  { id: 10, text: "Sempre cumpro prazos e compromissos", trait: "conscientiousness" },
  { id: 11, text: "Prefiro espontaneidade a planejamento detalhado", trait: "conscientiousness", reverse: true },
  { id: 12, text: "Sou perfeccionista com meu trabalho", trait: "conscientiousness" },
  { id: 13, text: "Procrastino frequentemente", trait: "conscientiousness", reverse: true },
  { id: 14, text: "Presto atenção aos detalhes", trait: "conscientiousness" },
  { id: 15, text: "Deixo minhas coisas fora do lugar", trait: "conscientiousness", reverse: true },
  { id: 16, text: "Trabalho duro para alcançar meus objetivos", trait: "conscientiousness" },

  // Extraversion (Extroversão)
  { id: 17, text: "Gosto de estar cercado(a) de pessoas", trait: "extraversion" },
  { id: 18, text: "Sou animado(a) e cheio(a) de energia em situações sociais", trait: "extraversion" },
  { id: 19, text: "Prefiro atividades solitárias a sociais", trait: "extraversion", reverse: true },
  { id: 20, text: "Gosto de ser o centro das atenções", trait: "extraversion" },
  { id: 21, text: "Sou reservado(a) e quieto(a) em grupos", trait: "extraversion", reverse: true },
  { id: 22, text: "Faço amigos facilmente", trait: "extraversion" },
  { id: 23, text: "Preciso de muito tempo sozinho(a) para recarregar", trait: "extraversion", reverse: true },
  { id: 24, text: "Tomo a iniciativa em situações sociais", trait: "extraversion" },

  // Agreeableness (Amabilidade)
  { id: 25, text: "Sou empático(a) e compreensivo(a) com os outros", trait: "agreeableness" },
  { id: 26, text: "Confio nas pessoas facilmente", trait: "agreeableness" },
  { id: 27, text: "Posso ser cético(a) e desconfiado(a)", trait: "agreeableness", reverse: true },
  { id: 28, text: "Gosto de ajudar os outros", trait: "agreeableness" },
  { id: 29, text: "Sou competitivo(a) e gosto de vencer", trait: "agreeableness", reverse: true },
  { id: 30, text: "Evito conflitos e prefiro harmonia", trait: "agreeableness" },
  { id: 31, text: "Posso ser crítico(a) com os outros", trait: "agreeableness", reverse: true },
  { id: 32, text: "Sou generoso(a) com meu tempo e recursos", trait: "agreeableness" },

  // Neuroticism (Neuroticismo)
  { id: 33, text: "Fico ansioso(a) ou preocupado(a) facilmente", trait: "neuroticism" },
  { id: 34, text: "Meu humor muda com frequência", trait: "neuroticism" },
  { id: 35, text: "Sou calmo(a) e raramente estressado(a)", trait: "neuroticism", reverse: true },
  { id: 36, text: "Sinto-me triste ou deprimido(a) com frequência", trait: "neuroticism" },
  { id: 37, text: "Lido bem com pressão e estresse", trait: "neuroticism", reverse: true },
  { id: 38, text: "Preocupo-me com coisas pequenas", trait: "neuroticism" },
  { id: 39, text: "Sou emocionalmente estável", trait: "neuroticism", reverse: true },
  { id: 40, text: "Tenho tendência a dramatizar situações", trait: "neuroticism" },
];
