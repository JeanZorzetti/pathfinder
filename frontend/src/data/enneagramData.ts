export interface EnneagramType {
  type: number;
  name: string;
  subtitle: string;
  description: string;
  coreMotivation: string;
  coreFear: string;
  strengths: string[];
  weaknesses: string[];
  growthPath: string[];
  workStyle: string[];
  relationships: string[];
}

export const enneagramTypes: Record<number, EnneagramType> = {
  1: {
    type: 1,
    name: "O Perfeccionista",
    subtitle: "Reformador, Íntegro, Controlado",
    description: "Os Tipo 1 são idealistas éticos com forte senso de certo e errado. Buscam melhorar a si mesmos e ao mundo, guiados por princípios internos rigorosos. São organizados, responsáveis e têm alto padrão de excelência.",
    coreMotivation: "Ser correto, íntegro e equilibrado",
    coreFear: "Ser corrupto, mau ou imperfeito",
    strengths: [
      "Senso ético desenvolvido e integridade pessoal",
      "Organização, disciplina e atenção aos detalhes",
      "Idealismo prático e desejo de melhorar o mundo",
      "Confiabilidade e responsabilidade excepcional"
    ],
    weaknesses: [
      "Autocrítica excessiva e perfeccionismo paralisante",
      "Rigidez de pensamento e dificuldade com imperfeições",
      "Ressentimento reprimido quando padrões não são atendidos",
      "Tendência a criticar outros e impor seus padrões"
    ],
    growthPath: [
      "Desenvolver autocompaixão e aceitar imperfeições",
      "Aprender a relaxar e aproveitar o processo, não só o resultado",
      "Praticar flexibilidade e abertura a diferentes perspectivas",
      "Expressar raiva e frustrações de forma saudável"
    ],
    workStyle: [
      "Excelente em papéis que exigem precisão e padrões elevados",
      "Auditor, editor, engenheiro de qualidade, consultor ético",
      "Prospera em ambientes estruturados com regras claras",
      "Lidera pelo exemplo e inspira excelência nos outros"
    ],
    relationships: [
      "Parceiro leal e comprometido com crescimento mútuo",
      "Valoriza honestidade, integridade e comunicação clara",
      "Pode ser crítico; precisa aprender a elogiar mais",
      "Cresce com parceiros que o ajudam a relaxar e ser espontâneo"
    ]
  },
  2: {
    type: 2,
    name: "O Prestativo",
    subtitle: "Atencioso, Generoso, Possessivo",
    description: "Os Tipo 2 são empáticos e genuinamente preocupados com o bem-estar dos outros. Expressam amor através do cuidado e são mestres em perceber as necessidades emocionais alheias. Buscam ser amados através de sua utilidade.",
    coreMotivation: "Ser amado, necessário e apreciado",
    coreFear: "Ser indesejado ou sem valor para os outros",
    strengths: [
      "Empatia profunda e capacidade de nutrir relacionamentos",
      "Generosidade genuína e prazer em ajudar",
      "Intuição emocional aguçada sobre necessidades alheias",
      "Habilidade de criar conexões e comunidade"
    ],
    weaknesses: [
      "Negligenciar próprias necessidades focando nos outros",
      "Orgulho de ser 'indispensável' e manipulação emocional sutil",
      "Dificuldade em pedir ajuda ou admitir vulnerabilidade",
      "Ressentimento quando ajuda não é reconhecida"
    ],
    growthPath: [
      "Reconhecer e expressar necessidades pessoais sem culpa",
      "Aprender a dizer 'não' e estabelecer limites saudáveis",
      "Desenvolver autocuidado sem sentir egoísmo",
      "Valorizar-se independentemente de ser útil aos outros"
    ],
    workStyle: [
      "Excelente em papéis de suporte, RH, aconselhamento",
      "Enfermeiro, assistente social, professor, terapeuta",
      "Cria ambiente de trabalho caloroso e colaborativo",
      "Motiva equipes através de cuidado e reconhecimento pessoal"
    ],
    relationships: [
      "Extremamente atento e dedicado ao bem-estar do parceiro",
      "Pode se tornar dependente de validação externa",
      "Precisa aprender a receber amor, não só dar",
      "Cresce com parceiros que valorizam reciprocidade"
    ]
  },
  3: {
    type: 3,
    name: "O Realizador",
    subtitle: "Adaptável, Ambicioso, Orientado ao Sucesso",
    description: "Os Tipo 3 são orientados a metas e altamente motivados a alcançar sucesso e reconhecimento. Adaptáveis e carismáticos, sabem como se apresentar de forma impressionante e inspiram outros com sua energia e determinação.",
    coreMotivation: "Ser valioso, admirado e bem-sucedido",
    coreFear: "Ser sem valor ou fracassar",
    strengths: [
      "Alta capacidade de execução e foco em resultados",
      "Adaptabilidade e habilidade de 'ler ambientes'",
      "Carisma e capacidade de motivar e inspirar",
      "Eficiência e otimização de processos"
    ],
    weaknesses: [
      "Confundir identidade com realizações e imagem",
      "Workaholism e dificuldade em relaxar",
      "Superficialidade emocional e competitividade excessiva",
      "Tendência a enganar ou exagerar para impressionar"
    ],
    growthPath: [
      "Desenvolver autenticidade independente de conquistas",
      "Conectar-se com emoções genuínas sob a imagem",
      "Valorizar 'ser' tanto quanto 'fazer'",
      "Praticar vulnerabilidade e aceitar 'falhas'"
    ],
    workStyle: [
      "Altamente eficaz em vendas, empreendedorismo, liderança",
      "CEO, gerente de projetos, consultor, personal trainer",
      "Prospera em ambientes competitivos orientados a metas",
      "Lidera com exemplo de dedicação e resultados"
    ],
    relationships: [
      "Parceiro motivador que encoraja crescimento mútuo",
      "Pode priorizar carreira sobre relacionamento",
      "Precisa aprender a ser vulnerável e 'improdutivo'",
      "Cresce com parceiros que valorizam quem ele é, não o que faz"
    ]
  },
  4: {
    type: 4,
    name: "O Individualista",
    subtitle: "Expressivo, Dramático, Introspectivo",
    description: "Os Tipo 4 são criativos e profundamente conectados com suas emoções. Buscam autenticidade e significado, vendo-se como únicos e diferentes. Possuem rica vida interior e capacidade artística para expressar nuances emocionais.",
    coreMotivation: "Ser autêntico, compreendido e especial",
    coreFear: "Não ter identidade ou significado pessoal",
    strengths: [
      "Profundidade emocional e capacidade de autoconhecimento",
      "Criatividade e originalidade artística",
      "Empatia com sofrimento alheio e suporte emocional",
      "Autenticidade e recusa a ser superficial"
    ],
    weaknesses: [
      "Melancolia e tendência à depressão",
      "Auto-absorção e inveja do que não possuem",
      "Dramatização excessiva de emoções",
      "Sentir-se incompreendido e criar distância"
    ],
    growthPath: [
      "Equilibrar intensidade emocional com estabilidade",
      "Reconhecer que conexão não exige 'ser especial'",
      "Praticar gratidão pelo que têm, não só focar no que falta",
      "Desenvolver disciplina para transformar inspiração em ação"
    ],
    workStyle: [
      "Excelente em carreiras criativas e expressivas",
      "Artista, escritor, designer, terapeuta, músico",
      "Precisa de liberdade criativa e trabalho significativo",
      "Contribui com perspectivas únicas e profundidade"
    ],
    relationships: [
      "Intenso, romântico e busca conexão profunda",
      "Pode criar dramas ou afastar-se quando se sente comum",
      "Precisa de parceiro que valide emoções sem drama",
      "Cresce com estabilidade e aceitação incondicional"
    ]
  },
  5: {
    type: 5,
    name: "O Investigador",
    subtitle: "Perceptivo, Inovador, Reservado",
    description: "Os Tipo 5 são observadores analíticos que buscam compreender o mundo através do conhecimento. Valorizam privacidade e autonomia, preferindo observar antes de agir. São pensadores profundos com grande capacidade de concentração.",
    coreMotivation: "Ser competente, entender e ter privacidade",
    coreFear: "Ser incompetente, ignorante ou sobrecarregado",
    strengths: [
      "Capacidade analítica e pensamento independente",
      "Foco intenso e domínio de assuntos complexos",
      "Objetividade e clareza mental",
      "Contentamento com minimalismo e autossuficiência"
    ],
    weaknesses: [
      "Isolamento social e desconexão emocional",
      "Acúmulo de conhecimento sem ação prática",
      "Avareza emocional e física (tempo, energia, recursos)",
      "Dificuldade em expressar sentimentos e necessidades"
    ],
    growthPath: [
      "Equilibrar observação com participação ativa na vida",
      "Desenvolver inteligência emocional e conexões",
      "Compartilhar conhecimento generosamente",
      "Reconhecer que recursos (energia, tempo) se renovam com uso"
    ],
    workStyle: [
      "Ideal em pesquisa, ciência, tecnologia, análise",
      "Cientista, programador, pesquisador, estrategista",
      "Precisa de autonomia e tempo para pensar profundamente",
      "Contribui com insights inovadores e soluções complexas"
    ],
    relationships: [
      "Leal mas emocionalmente reservado",
      "Precisa de espaço pessoal e tempo sozinho",
      "Pode parecer distante; expressa amor através de conhecimento",
      "Cresce com parceiros que respeitam privacidade mas encorajam abertura"
    ]
  },
  6: {
    type: 6,
    name: "O Leal",
    subtitle: "Comprometido, Responsável, Ansioso",
    description: "Os Tipo 6 são leais e orientados à segurança, sempre antecipando problemas potenciais. Valorizam confiança e comunidade, sendo altamente responsáveis e comprometidos. Podem oscilar entre cautela e coragem.",
    coreMotivation: "Ter segurança, apoio e orientação",
    coreFear: "Estar sozinho e sem suporte",
    strengths: [
      "Lealdade profunda e compromisso com pessoas e causas",
      "Pensamento estratégico e capacidade de prever problemas",
      "Responsabilidade e confiabilidade excepcional",
      "Coragem quando lutando por causas ou pessoas amadas"
    ],
    weaknesses: [
      "Ansiedade crônica e pensamento catastrófico",
      "Dificuldade em confiar e tendência ao ceticismo",
      "Procrastinação por medo de tomar decisão errada",
      "Oscilação entre submissão e rebeldia"
    ],
    growthPath: [
      "Desenvolver confiança em si mesmo e no mundo",
      "Praticar atenção plena para acalmar ansiedade",
      "Tomar decisões confiando na intuição, não só análise",
      "Reconhecer que segurança absoluta não existe"
    ],
    workStyle: [
      "Excelente em papéis de suporte, planejamento, gestão de risco",
      "Analista de segurança, advogado, gerente de projeto, bombeiro",
      "Prospera em estruturas claras com autoridade confiável",
      "Contribui com preparação meticulosa e antecipação"
    ],
    relationships: [
      "Parceiro extremamente leal e comprometido",
      "Precisa de reasseguramento e comunicação clara",
      "Pode ser desconfiado; testa lealdade do parceiro",
      "Cresce com estabilidade e paciência"
    ]
  },
  7: {
    type: 7,
    name: "O Entusiasta",
    subtitle: "Espontâneo, Versátil, Otimista",
    description: "Os Tipo 7 são aventureiros otimistas que buscam experiências estimulantes e prazerosas. Possuem energia contagiante e múltiplos interesses, sempre olhando para possibilidades futuras. Evitam dor através de distração e entusiasmo.",
    coreMotivation: "Estar feliz, satisfeito e evitar dor",
    coreFear: "Ser privado ou preso em dor/tédio",
    strengths: [
      "Otimismo contagiante e habilidade de reframing positivo",
      "Criatividade e capacidade de gerar múltiplas ideias",
      "Versatilidade e adaptabilidade rápida",
      "Entusiasmo que energiza e inspira outros"
    ],
    weaknesses: [
      "Dificuldade em comprometer-se e finalizar projetos",
      "Escapismo e evitação de emoções dolorosas",
      "Impulsividade e busca excessiva por estímulo",
      "Superficialidade por não aprofundar em nada"
    ],
    growthPath: [
      "Aprender a estar presente com desconforto sem fugir",
      "Desenvolver profundidade escolhendo foco sobre variedade",
      "Praticar gratidão pelo momento presente",
      "Completar projetos antes de iniciar novos"
    ],
    workStyle: [
      "Excelente em inovação, brainstorming, empreendedorismo",
      "Criativo, planejador de eventos, consultor, jornalista",
      "Prospera em ambientes dinâmicos com variedade",
      "Contribui com ideias inovadoras e energia positiva"
    ],
    relationships: [
      "Parceiro divertido, espontâneo e otimista",
      "Pode evitar conflitos profundos ou compromisso",
      "Precisa aprender a estar presente em momentos difíceis",
      "Cresce com parceiros que trazem profundidade e ancoragem"
    ]
  },
  8: {
    type: 8,
    name: "O Desafiador",
    subtitle: "Poderoso, Dominante, Protetor",
    description: "Os Tipo 8 são líderes naturais com presença forte e desejo de controlar seu ambiente. Valorizam força, justiça e proteção dos vulneráveis. Diretos e assertivos, confrontam desafios de frente sem hesitação.",
    coreMotivation: "Ser forte, autoconfiante e proteger-se",
    coreFear: "Ser controlado, vulnerável ou fraco",
    strengths: [
      "Liderança natural e capacidade de tomar decisões difíceis",
      "Coragem e disposição para confrontar injustiças",
      "Proteção leal de pessoas sob seu cuidado",
      "Energia poderosa e determinação inabalável"
    ],
    weaknesses: [
      "Intimidação involuntária e confronto excessivo",
      "Dificuldade em mostrar vulnerabilidade",
      "Tendência ao excesso (trabalho, intensidade, controle)",
      "Negação de fraqueza e emoções mais suaves"
    ],
    growthPath: [
      "Reconhecer que vulnerabilidade é força, não fraqueza",
      "Desenvolver empatia e consideração com sentimentos alheios",
      "Praticar rendição e confiar em outros",
      "Modular intensidade conforme contexto"
    ],
    workStyle: [
      "Natural em liderança executiva e empreendedorismo",
      "CEO, líder político, advogado litigante, militar",
      "Prospera em ambientes que permitem autonomia e impacto",
      "Lidera com decisão e protege sua equipe ferozmente"
    ],
    relationships: [
      "Protetor leal que defende parceiro com fervor",
      "Pode ser controlador ou dominante sem perceber",
      "Precisa de parceiro que não tema sua intensidade",
      "Cresce com vulnerabilidade e suavidade"
    ]
  },
  9: {
    type: 9,
    name: "O Pacificador",
    subtitle: "Receptivo, Tranquilo, Complacente",
    description: "Os Tipo 9 são pacíficos e receptivos, buscando harmonia e evitando conflitos. Têm habilidade natural de ver múltiplas perspectivas e mediar disputas. Valorizam paz interior e conexão tranquila com outros.",
    coreMotivation: "Ter paz interior e harmonia",
    coreFear: "Perda, separação e conflito",
    strengths: [
      "Capacidade de mediação e ver todos os lados",
      "Presença calma e estabilizadora para outros",
      "Aceitação genuína e ausência de julgamento",
      "Habilidade de criar ambientes harmoniosos"
    ],
    weaknesses: [
      "Evitação de conflitos necessários e assertividade",
      "Procrastinação e inércia ao tomar decisões",
      "Perder-se em prioridades alheias, negligenciando as próprias",
      "Resistência passiva-agressiva quando pressionado"
    ],
    growthPath: [
      "Reconhecer e expressar opiniões e necessidades próprias",
      "Desenvolver assertividade e aceitar conflito saudável",
      "Tomar ação direcionada aos próprios objetivos",
      "Valorizar-se e suas prioridades tanto quanto as dos outros"
    ],
    workStyle: [
      "Excelente em mediação, diplomacia, aconselhamento",
      "Mediador, terapeuta, conselheiro, facilitador",
      "Prospera em ambientes colaborativos e harmoniosos",
      "Contribui com perspectiva equilibrada e criação de consenso"
    ],
    relationships: [
      "Parceiro extremamente receptivo e de fácil convivência",
      "Pode evitar conflitos e perder-se no parceiro",
      "Precisa aprender a expressar desacordos e necessidades",
      "Cresce com parceiros que encorajam assertividade"
    ]
  }
};
