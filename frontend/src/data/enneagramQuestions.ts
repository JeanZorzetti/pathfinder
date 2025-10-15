export interface EnneagramQuestion {
  id: number;
  text: string;
  type: number; // 1-9
}

export const enneagramQuestions: EnneagramQuestion[] = [
  // Tipo 1 - O Perfeccionista
  { id: 1, text: "Tenho padrões muito altos para mim mesmo e para os outros", type: 1 },
  { id: 2, text: "Frequentemente noto o que está errado ou poderia ser melhorado", type: 1 },
  { id: 3, text: "Sinto-me frustrado quando as coisas não são feitas corretamente", type: 1 },
  { id: 4, text: "Tenho forte senso de certo e errado", type: 1 },
  
  // Tipo 2 - O Prestativo
  { id: 5, text: "Sinto-me realizado quando ajudo os outros", type: 2 },
  { id: 6, text: "Tenho facilidade em perceber as necessidades emocionais das pessoas", type: 2 },
  { id: 7, text: "Às vezes negligencio minhas próprias necessidades para cuidar dos outros", type: 2 },
  { id: 8, text: "Quero ser amado e apreciado pelas pessoas", type: 2 },
  
  // Tipo 3 - O Realizador
  { id: 9, text: "Sou muito orientado a metas e conquistas", type: 3 },
  { id: 10, text: "Me importo com a impressão que causo nos outros", type: 3 },
  { id: 11, text: "Tenho dificuldade em relaxar sem estar produzindo algo", type: 3 },
  { id: 12, text: "O sucesso e reconhecimento são muito importantes para mim", type: 3 },
  
  // Tipo 4 - O Individualista
  { id: 13, text: "Sinto-me diferente ou único em relação aos outros", type: 4 },
  { id: 14, text: "Tenho uma vida emocional rica e intensa", type: 4 },
  { id: 15, text: "Às vezes me sinto incompreendido pelos outros", type: 4 },
  { id: 16, text: "Valorizo autenticidade e expressão criativa acima de tudo", type: 4 },
  
  // Tipo 5 - O Investigador
  { id: 17, text: "Prefiro observar antes de me envolver", type: 5 },
  { id: 18, text: "Preciso de muito tempo sozinho para recarregar", type: 5 },
  { id: 19, text: "Gosto de entender profundamente como as coisas funcionam", type: 5 },
  { id: 20, text: "Tento ser o mais autossuficiente possível", type: 5 },
  
  // Tipo 6 - O Leal
  { id: 21, text: "Tendo a antecipar problemas e riscos potenciais", type: 6 },
  { id: 22, text: "Lealdade e confiabilidade são valores fundamentais para mim", type: 6 },
  { id: 23, text: "Questiono autoridades e busco orientação ao mesmo tempo", type: 6 },
  { id: 24, text: "Preocupo-me bastante e gosto de estar preparado", type: 6 },
  
  // Tipo 7 - O Entusiasta
  { id: 25, text: "Adoro novas experiências e possibilidades", type: 7 },
  { id: 26, text: "Tenho dificuldade em me comprometer com uma única opção", type: 7 },
  { id: 27, text: "Evito situações dolorosas ou desconfortáveis", type: 7 },
  { id: 28, text: "Sou otimista e vejo o lado positivo das coisas", type: 7 },
  
  // Tipo 8 - O Desafiador
  { id: 29, text: "Gosto de estar no controle das situações", type: 8 },
  { id: 30, text: "Não tenho medo de confronto ou conflito", type: 8 },
  { id: 31, text: "Protejo intensamente as pessoas que amo", type: 8 },
  { id: 32, text: "Valorizo força e não gosto de mostrar vulnerabilidade", type: 8 },
  
  // Tipo 9 - O Pacificador
  { id: 33, text: "Evito conflitos e valorizo paz e harmonia", type: 9 },
  { id: 34, text: "Tenho facilidade em ver todos os lados de uma situação", type: 9 },
  { id: 35, text: "Às vezes me perco nas prioridades dos outros", type: 9 },
  { id: 36, text: "Procrastino quando preciso tomar decisões importantes", type: 9 },
];
