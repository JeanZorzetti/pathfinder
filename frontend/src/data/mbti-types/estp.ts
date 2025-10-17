import { PersonalityType } from '../../types/personality';

export const ESTP: PersonalityType = {
  code: 'ESTP',
  nickname: 'O Empreendedor',
  tagline: 'Pessoas espertas e energéticas que vivem no limite',
  tags: ['Energético', 'Perceptivo', 'Direto', 'Sociável'],
  population: '4-10% da população',
  group: 'explorers',

  colorScheme: {
    primary: '#EA580C',
    secondary: '#C2410C',
    light: '#FFEDD5',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ESTPs são os mestres da ação imediata e os navegadores natos do mundo físico. Enquanto outros planejam e ponderam, ESTPs mergulham de cabeça, confiando em seus instintos afiados e capacidade excepcional de ler o ambiente ao seu redor. Eles veem a vida como um jogo emocionante a ser jogado, cheio de oportunidades para testar seus limites, resolver problemas práticos e experimentar a adrenalina de viver no momento.

Sua mente funciona como um processador de alta velocidade, captando detalhes sensoriais que outros perdem e transformando-os instantaneamente em ação estratégica. Para o ESTP, teoria sem prática não passa de conversa vazia - eles precisam tocar, experimentar, fazer acontecer. São os primeiros a responder em crises, os melhores em improvisar quando os planos falham, e os mais hábeis em virar situações aparentemente impossíveis a seu favor.

No entanto, essa orientação para o presente imediato vem com seus custos. ESTPs podem agir antes de pensar nas consequências de longo prazo, ferir sentimentos sem perceber em sua franqueza brutal, ou se entediar rapidamente com responsabilidades que exigem paciência e persistência prolongada. Eles vivem pela emoção do momento, o que pode levar a decisões impulsivas e uma relutância em se comprometer com qualquer coisa que pareça limitar sua liberdade.

O verdadeiro poder do ESTP está em sua capacidade de transformar caos em oportunidade, de ler pessoas e situações com precisão cirúrgica, e de fazer acontecer quando todos os outros estão paralisados pela indecisão. Eles são os fazedores pragmáticos, os negociadores astutos, e os solucionadores de problemas que prosperam sob pressão.`,

    quote: {
      text: 'A vida é uma jornada ousada ou não é nada.',
      author: 'Helen Keller',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Se',
      fullName: 'Sensação Extrovertida',
      icon: '⚡',
      description: 'A função dominante Se está totalmente sintonizada com o ambiente físico imediato. ESTPs processam uma quantidade extraordinária de informação sensorial em tempo real e agem instantaneamente com base nisso.',
      manifestation: 'Se manifesta como consciência aguçada do momento presente, excelente coordenação física, e capacidade de notar detalhes que outros perdem. ESTPs são mestres em "ler a sala" e adaptar suas ações instantaneamente.',
    },
    {
      position: 'auxiliary',
      name: 'Ti',
      fullName: 'Pensamento Introvertido',
      icon: '🔧',
      description: 'A função auxiliar Ti analisa logicamente o que Se observa. Ela permite aos ESTPs entender como as coisas funcionam, identificar padrões e criar estratégias práticas instantâneas.',
      manifestation: 'Aparece como habilidade de troubleshooting excepcional, lógica prática aplicada, e capacidade de desmontar sistemas (físicos ou sociais) para entender sua mecânica. ESTPs fazem perguntas diretas e cortam através de bobagens.',
    },
    {
      position: 'tertiary',
      name: 'Fe',
      fullName: 'Sentimento Extrovertido',
      icon: '🎭',
      description: 'A função terciária Fe fornece consciência social e capacidade de ler pessoas. Em ESTPs, ela complementa Se, permitindo que percebam não apenas o ambiente físico, mas também o clima emocional.',
      manifestation: 'Pode aparecer como charme natural, capacidade de entreter e envolver outros, e talento para saber exatamente o que dizer para conseguir o que querem. ESTPs podem ser surpreendentemente socialmente hábeis.',
    },
    {
      position: 'inferior',
      name: 'Ni',
      fullName: 'Intuição Introvertida',
      icon: '🔮',
      description: 'A função inferior Ni lida com visão de longo prazo e implicações futuras. Para ESTPs, esta é a função mais desafiadora e menos desenvolvida.',
      manifestation: 'ESTPs frequentemente lutam com planejamento de longo prazo, podem se sentir ansiosos sobre o futuro, e têm dificuldade em ver as consequências distantes de suas ações presentes.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Ação Decisiva Sob Pressão',
        description: 'Capacidade excepcional de manter a calma em crises e tomar decisões rápidas e efetivas quando segundos importam.',
        icon: '🎯',
      },
      {
        title: 'Percepção Aguçada',
        description: 'Observação extraordinária de detalhes ambientais e pistas sociais que outros completamente perdem.',
        icon: '👁️',
      },
      {
        title: 'Adaptabilidade Instantânea',
        description: 'Flexibilidade mental e física para mudar de estratégia no instante em que a situação muda.',
        icon: '🦎',
      },
      {
        title: 'Praticidade e Pragmatismo',
        description: 'Foco em soluções que realmente funcionam no mundo real, sem se perder em teoria ou idealismo.',
        icon: '🔨',
      },
      {
        title: 'Energia Contagiante',
        description: 'Entusiasmo e dinamismo naturais que energizam ambientes e motivam pessoas ao redor.',
        icon: '⚡',
      },
    ],
    gated: [
      {
        title: 'Mestria em Negociação',
        description: 'Habilidade natural de ler pessoas, encontrar pontos de alavancagem, e fechar acordos favoráveis.',
        icon: '🤝',
      },
      {
        title: 'Troubleshooting Excepcional',
        description: 'Capacidade de diagnosticar problemas rapidamente e implementar soluções práticas imediatamente.',
        icon: '🛠️',
      },
      {
        title: 'Carisma e Influência',
        description: 'Presença magnética e habilidade de persuadir e inspirar outros através de ação e exemplo.',
        icon: '✨',
      },
      {
        title: 'Coragem Calculada',
        description: 'Disposição para assumir riscos quando a análise prática indica que as chances são favoráveis.',
        icon: '🦁',
      },
      {
        title: 'Consciência Situacional',
        description: 'Capacidade de processar múltiplas variáveis ambientais simultaneamente e responder apropriadamente.',
        icon: '🎲',
      },
      {
        title: 'Eficiência em Execução',
        description: 'Habilidade de transformar ideias em resultados tangíveis rapidamente, sem procrastinação.',
        icon: '🚀',
      },
      {
        title: 'Resiliência e Recuperação',
        description: 'Capacidade de se recuperar rapidamente de fracassos e usar feedback imediato para melhorar.',
        icon: '💪',
      },
      {
        title: 'Pensamento Estratégico Tático',
        description: 'Excelência em estratégia de curto prazo e manobras táticas em situações competitivas.',
        icon: '♟️',
      },
      {
        title: 'Senso de Timing',
        description: 'Intuição aguçada para o momento exato de agir, falar, ou fazer um movimento decisivo.',
        icon: '⏰',
      },
      {
        title: 'Versatilidade de Habilidades',
        description: 'Facilidade em aprender novas habilidades práticas e aplicá-las imediatamente.',
        icon: '🎨',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Impulsividade',
        description: 'Tendência a agir antes de pensar completamente nas consequências, especialmente de longo prazo.',
        impact: 'Decisões precipitadas que causam problemas futuros, oportunidades desperdiçadas por falta de planejamento.',
      },
      {
        title: 'Impaciência com Processos',
        description: 'Frustração intensa com procedimentos, burocracias ou qualquer coisa que desacelere a ação.',
        impact: 'Conflitos com autoridade, atalhos que violam regras, reputação de ser "difícil de gerenciar".',
      },
      {
        title: 'Insensibilidade Não Intencional',
        description: 'Franqueza brutal e foco em lógica prática podem ferir sentimentos sem que percebam.',
        impact: 'Relacionamentos danificados, reputação de ser "grosso" ou "insensível", isolamento social.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Dificuldade com Compromisso de Longo Prazo',
          description: 'Resistência a qualquer coisa que pareça limitar liberdade ou exigir persistência prolongada sem variação.',
          impact: 'Projetos abandonados no meio, relacionamentos que não aprofundam, carreira sem direção clara.',
          mitigation: 'Escolher caminhos que oferecem variedade dentro da estrutura. Quebrar metas grandes em marcos de curto prazo. Encontrar parceiros/colegas que complementam com visão de longo prazo.',
        },
        {
          title: 'Busca Excessiva por Estimulação',
          description: 'Necessidade constante de emoção e novidade pode levar a comportamentos de risco e tédio destrutivo.',
          impact: 'Decisões financeiras ruins, acidentes físicos, relacionamentos caóticos, vícios em adrenalina.',
          mitigation: 'Canalizar necessidade de emoção para atividades produtivas (esportes, empreendedorismo, competições). Reconhecer sinais de tédio destrutivo e ter estratégias saudáveis preparadas.',
        },
        {
          title: 'Negligência de Consequências Futuras',
          description: 'Foco intenso no presente pode resultar em ignorar completamente como ações de hoje afetam o amanhã.',
          impact: 'Problemas financeiros, saúde deteriorada, relacionamentos queimados, oportunidades perdidas.',
          mitigation: 'Consultar pessoas orientadas ao futuro antes de decisões grandes. Estabelecer "regras de segurança" não-negociáveis. Usar tecnologia para automatizar poupança e planejamento.',
        },
        {
          title: 'Desafio à Autoridade',
          description: 'Resistência natural a regras que parecem arbitrárias ou limitantes, especialmente de autoridades incompetentes.',
          impact: 'Problemas com chefes, questões disciplinares, dificuldade em ambientes hierárquicos.',
          mitigation: 'Buscar ambientes com autonomia ou onde pode ganhar respeito através de competência. Aprender a escolher batalhas - nem toda regra precisa ser desafiada.',
        },
        {
          title: 'Superficialidade Emocional',
          description: 'Preferência por manter as coisas leves e evitar profundidade emocional ou vulnerabilidade.',
          impact: 'Relacionamentos que não aprofundam, dificuldade em processar emoções complexas, explosões inesperadas.',
          mitigation: 'Praticar conversas mais profundas com pessoas seguras. Reconhecer que vulnerabilidade não é fraqueza. Buscar terapia se evitação emocional causa problemas.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Empreendedor',
        description: 'Iniciar e escalar negócios, identificar oportunidades de mercado, fazer acordos e pivotar rapidamente.',
        icon: '💼',
        fit: 'Ideal para Se-Ti: ação imediata, resolução de problemas práticos, recompensas tangíveis.',
      },
      {
        title: 'Executivo de Vendas',
        description: 'Negociar contratos, fechar grandes negócios, ler clientes e adaptar pitch em tempo real.',
        icon: '📈',
        fit: 'Combina leitura de pessoas com pensamento estratégico; oferece variedade e recompensa por resultados.',
      },
      {
        title: 'Paramédico/Socorrista',
        description: 'Responder a emergências, tomar decisões rápidas sob pressão, salvar vidas através de ação imediata.',
        icon: '🚑',
        fit: 'Ambiente de alta pressão que requer presença de espírito e ação decisiva - ideal para ESTPs.',
      },
      {
        title: 'Detetive/Investigador',
        description: 'Resolver casos através de observação aguçada, leitura de pistas sutis, e perseguição ativa.',
        icon: '🔍',
        fit: 'Combina análise lógica (Ti) com trabalho de campo ativo (Se); cada caso é diferente.',
      },
      {
        title: 'Corretor (Ações/Imóveis)',
        description: 'Negociar transações, ler mercados, tomar decisões rápidas com informação imperfeita.',
        icon: '🏢',
        fit: 'Ambiente dinâmico com feedback imediato e recompensas tangíveis por performance.',
      },
    ],
    gated: [
      {
        title: 'Gerente de Marketing/Brand',
        description: 'Criar campanhas impactantes, reagir a tendências de mercado, gerenciar eventos e lançamentos.',
        icon: '📢',
        fit: 'Combina criatividade prática com ação orientada a resultados.',
        details: 'Permite usar charme e percepção para influenciar públicos; variedade constante de projetos.',
      },
      {
        title: 'Coach Atlético/Personal Trainer',
        description: 'Treinar atletas, desenvolver programas personalizados, motivar através de exemplo.',
        icon: '🏋️',
        fit: 'Combina conhecimento prático do corpo com habilidade de inspirar outros.',
        details: 'Ambiente físico e social; satisfação de ver progresso tangível e imediato.',
      },
      {
        title: 'Consultor de Negócios',
        description: 'Diagnosticar problemas organizacionais, implementar soluções práticas, gerar resultados rápidos.',
        icon: '💡',
        fit: 'Variedade de desafios, trabalho orientado a resultados, autonomia.',
        details: 'Permite usar habilidades de troubleshooting em diferentes contextos; impacto visível.',
      },
      {
        title: 'Piloto/Motorista Profissional',
        description: 'Operar veículos em condições desafiadoras, tomar decisões em milissegundos, navegar ambientes complexos.',
        icon: '✈️',
        fit: 'Uso intenso de Se para processamento sensorial e coordenação física.',
        details: 'Combina emoção, habilidade técnica e responsabilidade; feedback imediato.',
      },
      {
        title: 'Chef/Gerente de Restaurante',
        description: 'Criar pratos, gerenciar cozinha em alta pressão, adaptar a situações dinâmicas.',
        icon: '👨‍🍳',
        fit: 'Ambiente físico e sensorial que requer ação imediata e improviso.',
        details: 'Combina criatividade prática com liderança; cada serviço é diferente.',
      },
    ],
  },

  famousPeople: [
    { name: 'Donald Trump', role: 'Empresário e Político', avatar: 'https://ui-avatars.com/api/?name=Donald+Trump&background=EA580C&color=fff' },
    { name: 'Ernest Hemingway', role: 'Escritor', avatar: 'https://ui-avatars.com/api/?name=Ernest+Hemingway&background=EA580C&color=fff' },
    { name: 'Eddie Murphy', role: 'Comediante e Ator', avatar: 'https://ui-avatars.com/api/?name=Eddie+Murphy&background=EA580C&color=fff' },
    { name: 'Madonna', role: 'Cantora e Empresária', avatar: 'https://ui-avatars.com/api/?name=Madonna&background=EA580C&color=fff' },
    { name: 'Bruce Willis', role: 'Ator', avatar: 'https://ui-avatars.com/api/?name=Bruce+Willis&background=EA580C&color=fff' },
    { name: 'Jack Nicholson', role: 'Ator', avatar: 'https://ui-avatars.com/api/?name=Jack+Nicholson&background=EA580C&color=fff' },
    { name: 'Samuel L. Jackson', role: 'Ator', avatar: 'https://ui-avatars.com/api/?name=Samuel+Jackson&background=EA580C&color=fff' },
    { name: 'Winston Churchill', role: 'Estadista', avatar: 'https://ui-avatars.com/api/?name=Winston+Churchill&background=EA580C&color=fff' },
    { name: 'Theodore Roosevelt', role: 'Presidente dos EUA', avatar: 'https://ui-avatars.com/api/?name=Theodore+Roosevelt&background=EA580C&color=fff' },
    { name: 'Mae West', role: 'Atriz', avatar: 'https://ui-avatars.com/api/?name=Mae+West&background=EA580C&color=fff' },
  ],

  relationships: {
    isGated: true,
    preview: 'ESTPs trazem energia, emoção e espontaneidade aos relacionamentos, mas precisam de parceiros que apreciem liberdade e possam acompanhar seu ritmo acelerado...',
    content: {
      romantic: {
        overview: 'ESTPs em relacionamentos românticos são parceiros emocionantes, generosos e presentes - quando estão presentes. Eles amam com ação, não com palavras, demonstrando afeto através de experiências compartilhadas, surpresas espontâneas e apoio prático. No entanto, podem resistir a compromissos que pareçam limitar sua liberdade.',
        strengths: [
          'Espontaneidade e aventura constantes no relacionamento',
          'Generosidade prática - resolvem problemas e provêm ativamente',
          'Presença física e atenção total quando estão com o parceiro',
          'Comunicação direta - sem joguinhos ou manipulação emocional',
          'Capacidade de manter relacionamentos excitantes e dinâmicos',
        ],
        challenges: [
          'Resistência a conversas emocionais profundas',
          'Podem ser excessivamente francos e ferir sentimentos sem perceber',
          'Dificuldade com compromisso de longo prazo ou rotina',
          'Necessidade de espaço e liberdade pode parecer desinteresse',
          'Tendência a resolver problemas com ação quando parceiro quer discussão',
        ],
        tips: [
          'Comunique necessidade de variedade e aventura - planeje experiências juntos',
          'Pratique ouvir emocionalmente antes de pular para soluções',
          'Escolha parceiros que valorizem independência e tenham sua própria vida',
          'Estabeleça "tempo de qualidade" regular mesmo dentro da espontaneidade',
          'Reconheça que processar emoções verbalmente é importante para muitos parceiros',
        ],
      },
      friendship: {
        overview: 'ESTPs são amigos leais, divertidos e sempre prontos para ação. Eles preferem amizades baseadas em experiências compartilhadas e atividades do que em conversas profundas.',
        ideal: 'Outros SPs (especialmente ESFPs e ISTPs) que compartilham amor por ação e aventura, ou tipos que apreciem espontaneidade e possam se beneficiar da energia ESTP.',
        asAFriend: 'Leal em crises, sempre disponível para ajuda prática, traz diversão e emoção, generoso com tempo e recursos, excelente em tirar amigos de situações difíceis.',
      },
      compatibility: {
        highest: ['ISFJ', 'ISTJ', 'ESFP', 'ISTP'],
        challenging: ['INFJ', 'INFP', 'ENFJ', 'INTJ'],
        explanation: 'ESTPs se conectam melhor com tipos sensoriais (S) que compartilham apreciação pelo concreto e prático. ISFJs/ISTJs oferecem estabilidade complementar, enquanto outros SPs compartilham amor por aventura.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ESTPs envolve desenvolver sua função inferior Ni e aprender a equilibrar ação imediata com consideração de consequências futuras...',
    content: {
      developingInferiorNi: {
        title: 'Desenvolvendo Intuição Introvertida (Ni)',
        description: 'Ni inferior significa que ESTPs lutam com visão de longo prazo e planejamento futuro. Desenvolvê-la é crucial para sucesso sustentável.',
        practices: [
          'Praticar visualização de objetivos futuros regularmente',
          'Reservar tempo semanal para reflexão e planejamento estratégico',
          'Consultar pessoas orientadas ao futuro antes de decisões importantes',
          'Manter um diário de "consequências" - rastrear resultados de longo prazo de ações',
          'Meditar ou praticar mindfulness para desenvolver foco interno',
        ],
        signs: 'Ni saudável aparece como melhor capacidade de antecipar consequências, projetos com visão de longo prazo bem-sucedidos, e menor frequência de arrependimentos por impulsividade.',
      },
      balancingFunctions: {
        title: 'Equilibrando Se-Ti com Fe-Ni',
        description: 'ESTPs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        tiNeBalance: 'Use Se-Ti para ação rápida e resolução prática, mas pause periodicamente para considerar impacto emocional e implicações futuras.',
        siFeDevelopment: 'Cultive Fe através de check-ins emocionais com pessoas próximas. Desenvolva Ni reservando tempo para reflexão e planejamento estratégico.',
      },
      commonTraps: {
        tiNiLoop: {
          name: 'Loop Se-Fe',
          description: 'Buscar estimulação externa excessiva através de pessoas e experiências, levando a comportamento impulsivo e relações superficiais.',
          escape: 'Ativar Ti para análise lógica das consequências. Criar espaço para reflexão solitária e processamento interno.',
        },
        neGrip: {
          name: 'Grip de Ni',
          description: 'Sob stress extremo, Ni pode manifestar como paranoia sobre o futuro, visões catastróficas, ou obsessão com significados ocultos.',
          escape: 'Retornar ao presente através de atividade física. Usar Se para reconectar com realidade concreta. Buscar perspectiva lógica (Ti).',
        },
      },
      dailyPractices: [
        'Dedique 15 minutos matinais para revisar metas de longo prazo',
        'Pratique "pausa de 10 segundos" antes de decisões importantes',
        'Tenha conversas emocionais significativas regularmente (não apenas resolução de problemas)',
        'Mantenha um "diário de consequências" rastreando resultados de decisões',
        'Engaje em atividade física regular para processar stress construtivamente',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ESTPs prosperam em ambientes dinâmicos que recompensam ação rápida, permitem autonomia, e oferecem variedade constante...',
    content: {
      asLeader: {
        style: 'Liderança por Exemplo',
        strengths: [
          'Lideram pela frente - nunca pedem o que não fariam eles mesmos',
          'Excelentes em crises - mantêm calma e tomam decisões rápidas',
          'Inspiram através de energia e ação, não apenas palavras',
          'Criam ambientes dinâmicos onde resultados importam mais que processos',
        ],
        challenges: [
          'Impaciência com planejamento detalhado e burocracia',
          'Podem ser vistos como impulsivos ou arriscados',
          'Dificuldade em fornecer direção de longo prazo consistente',
          'Tendência a microgerenciar ação mas negligenciar desenvolvimento emocional',
        ],
        tips: 'Delegue planejamento estratégico para complementos. Foque em táticas e execução. Desenvolva paciência com processos necessários. Reconheça que nem todos processam tão rapidamente.',
      },
      asTeamMember: {
        strengths: [
          'Executores confiáveis que entregam resultados rápidos',
          'Excelentes em troubleshooting e resolver problemas práticos',
          'Trazem energia e dinamismo para a equipe',
          'Ótimos em situações de alta pressão',
        ],
        challenges: [
          'Frustração com reuniões longas e planejamento excessivo',
          'Podem ignorar processos estabelecidos se parecerem ineficientes',
          'Dificuldade em projetos de longo prazo sem marcos intermediários',
          'Comunicação excessivamente direta pode criar conflitos',
        ],
        tips: 'Seja claro sobre necessidade de ação e resultados. Sugira melhorias de processo construtivamente. Busque projetos com marcos de curto prazo. Suavize feedback crítico.',
      },
      idealEnvironment: {
        culture: 'Orientado a resultados onde ação e competência importam mais que hierarquia',
        structure: 'Autonomia máxima, burocracia mínima, variedade constante de desafios',
        challenges: 'Problemas práticos urgentes que requerem solução rápida e ação decisiva',
        avoid: 'Microgerenciamento, reuniões intermináveis, trabalho repetitivo, ambientes excessivamente políticos',
      },
      conflictResolution: {
        approach: 'ESTPs abordam conflitos diretamente, buscando resolução rápida e prática',
        tips: [
          'Lembre-se que nem todos querem resolver conflitos tão rapidamente',
          'Pratique ouvir totalmente antes de oferecer soluções',
          'Reconheça componentes emocionais, não apenas práticos',
          'Use energia para desescalar, não para intensificar',
        ],
      },
    },
  },
};
