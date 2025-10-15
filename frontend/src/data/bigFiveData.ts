export interface BigFiveTrait {
  trait: string;
  score: number;
  level: 'Low' | 'Medium' | 'High';
  description: string;
  highCharacteristics: string[];
  lowCharacteristics: string[];
  careers: string[];
}

export const bigFiveTraits = {
  openness: {
    trait: 'Openness (Abertura)',
    highDescription: 'Alto em Abertura: você é imaginativo, criativo e curioso intelectualmente. Gosta de novas experiências, ideias abstratas e aprecia arte e beleza.',
    lowDescription: 'Baixo em Abertura: você é prático, convencional e focado no concreto. Prefere rotinas, tradições e informações factuais a especulações.',
    highCharacteristics: [
      'Criatividade e imaginação ativa',
      'Curiosidade intelectual profunda',
      'Apreciação por arte, beleza e ideias abstratas',
      'Abertura para novas experiências e perspectivas',
      'Pensamento não-convencional e inovador'
    ],
    lowCharacteristics: [
      'Praticidade e foco no concreto',
      'Preferência por tradição e familiaridade',
      'Abordagem conservadora e convencional',
      'Foco em fatos sobre teoria',
      'Conforto com rotinas estabelecidas'
    ],
    highCareers: [
      'Artista, designer, escritor, arquiteto',
      'Pesquisador, cientista, filósofo',
      'Empreendedor inovador, consultor de inovação',
      'Professor, acadêmico, curador de museu'
    ],
    lowCareers: [
      'Contador, auditor, analista financeiro',
      'Engenheiro de manutenção, técnico',
      'Gerente de operações, administrador',
      'Policial, militar, inspetor de qualidade'
    ]
  },
  conscientiousness: {
    trait: 'Conscientiousness (Conscienciosidade)',
    highDescription: 'Alto em Conscienciosidade: você é organizado, responsável e orientado a metas. Planeja cuidadosamente, cumpre prazos e mantém alto padrão de desempenho.',
    lowDescription: 'Baixo em Conscienciosidade: você é espontâneo, flexível e menos focado em planejamento. Prefere improvisação e pode ser desorganizado.',
    highCharacteristics: [
      'Organização e planejamento meticuloso',
      'Alta autodisciplina e persistência',
      'Responsabilidade e confiabilidade',
      'Orientação a metas e eficiência',
      'Atenção aos detalhes e precisão'
    ],
    lowCharacteristics: [
      'Espontaneidade e flexibilidade',
      'Criatividade através do caos',
      'Adaptação rápida a mudanças',
      'Menos focado em prazos rígidos',
      'Abordagem relaxada à vida'
    ],
    highCareers: [
      'Gerente de projetos, executivo',
      'Cirurgião, dentista, farmacêutico',
      'Engenheiro, arquiteto, contador',
      'Advogado, juiz, auditor'
    ],
    lowCareers: [
      'Artista, músico, designer',
      'Empreendedor de startup (fase inicial)',
      'Jornalista, escritor freelance',
      'Ator, comediante, performer'
    ]
  },
  extraversion: {
    trait: 'Extraversion (Extroversão)',
    highDescription: 'Alto em Extroversão: você é sociável, energético e busca estimulação externa. Gosta de estar com pessoas, ser o centro das atenções e ambientes animados.',
    lowDescription: 'Baixo em Extroversão (Introversão): você é reservado, prefere solidão ou pequenos grupos. Recarrega energia sozinho e valoriza interações profundas sobre superficiais.',
    highCharacteristics: [
      'Sociabilidade e facilidade com pessoas',
      'Energia em ambientes sociais',
      'Assertividade e confiança externa',
      'Busca por estimulação e excitação',
      'Liderança carismática'
    ],
    lowCharacteristics: [
      'Reserva e preferência por solidão',
      'Reflexão interna profunda',
      'Escuta atenta e observação',
      'Energia conservada para interações significativas',
      'Conforto com silêncio e quietude'
    ],
    highCareers: [
      'Vendedor, gerente de vendas, representante',
      'Relações públicas, marketing, eventos',
      'Professor, treinador, palestrante',
      'Político, líder comunitário, ator'
    ],
    lowCareers: [
      'Escritor, pesquisador, cientista',
      'Programador, analista de dados',
      'Arquivista, bibliotecário, editor',
      'Artista visual, compositor, contador'
    ]
  },
  agreeableness: {
    trait: 'Agreeableness (Amabilidade)',
    highDescription: 'Alto em Amabilidade: você é compassivo, cooperativo e confia nos outros. Valoriza harmonia, é empático e tende a evitar conflitos.',
    lowDescription: 'Baixo em Amabilidade: você é competitivo, cético e direto. Prioriza objetividade sobre harmonia e não hesita em desafiar ou confrontar.',
    highCharacteristics: [
      'Empatia e compaixão genuínas',
      'Cooperação e harmonia interpessoal',
      'Confiança nos outros',
      'Altruísmo e generosidade',
      'Sensibilidade às necessidades alheias'
    ],
    lowCharacteristics: [
      'Ceticismo e pensamento crítico',
      'Competitividade e assertividade',
      'Honestidade direta (às vezes bruta)',
      'Objetividade sobre sentimentos',
      'Autoproteção e negociação firme'
    ],
    highCareers: [
      'Terapeuta, conselheiro, assistente social',
      'Enfermeiro, cuidador, médico de família',
      'Professor de crianças, educador',
      'Mediador, recursos humanos, diplomata'
    ],
    lowCareers: [
      'Advogado litigante, promotor, juiz',
      'Executivo, CEO, empreendedor competitivo',
      'Cientista, pesquisador (objetividade)',
      'Crítico, jornalista investigativo, auditor'
    ]
  },
  neuroticism: {
    trait: 'Neuroticism (Neuroticismo)',
    highDescription: 'Alto em Neuroticismo: você experiencia emoções negativas com frequência e intensidade. Pode ser ansioso, sensível ao estresse e emocionalmente reativo.',
    lowDescription: 'Baixo em Neuroticismo (Estabilidade Emocional): você é calmo, emocionalmente estável e resiliente. Lida bem com estresse e raramente se sente ansioso ou deprimido.',
    highCharacteristics: [
      'Sensibilidade emocional aumentada',
      'Ansiedade e preocupação frequente',
      'Vulnerabilidade ao estresse',
      'Autoconsciência e autocrítica',
      'Profundidade emocional e empatia'
    ],
    lowCharacteristics: [
      'Estabilidade emocional e calma',
      'Resiliência ao estresse',
      'Otimismo e pensamento positivo',
      'Confiança e autocontrole',
      'Equilíbrio emocional consistente'
    ],
    highCareers: [
      'Artista, escritor (canalizar emoções)',
      'Terapeuta (compreensão de sofrimento)',
      'Pesquisador (perfeccionismo impulsionado por ansiedade)',
      'Trabalhadores que precisam de atenção a riscos'
    ],
    lowCareers: [
      'Profissões de alto estresse: médico de emergência',
      'Piloto, bombeiro, policial',
      'Executivo, empreendedor',
      'Militar, paramédico, negociador de reféns'
    ]
  }
};

export const calculateBigFiveLevel = (score: number): 'Low' | 'Medium' | 'High' => {
  if (score <= 40) return 'Low';
  if (score <= 60) return 'Medium';
  return 'High';
};
