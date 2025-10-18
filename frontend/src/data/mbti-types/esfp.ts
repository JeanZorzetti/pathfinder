import { PersonalityType } from '../../types/personality';

export const ESFP: PersonalityType = {
  code: 'ESFP',
  nickname: 'O Animador',
  tagline: 'Artistas espontâneos e energéticos que nunca deixam a vida ficar chata',
  tags: ['Espontâneo', 'Entusiasta', 'Sociável', 'Divertido'],
  population: '4-9% da população',
  group: 'Explorers',

  colorScheme: {
    primary: '#F59E0B',
    secondary: '#D97706',
    light: '#FEF3C7',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ESFPs são os performers natos da vida, trazendo energia vibrante, entusiasmo contagiante e um senso de aventura para tudo o que fazem. Eles vivem plenamente no momento presente, absorvendo cada experiência sensorial com uma intensidade que outros tipos raramente conseguem igualar. Enquanto alguns planejam o futuro, ESFPs estão ocupados fazendo a vida acontecer agora - dançando, rindo, conectando e criando memórias inesquecíveis.

Sua abordagem à vida é profundamente experiencial. ESFPs não querem apenas ouvir sobre algo; eles querem vivê-lo, senti-lo, experimentá-lo com todos os sentidos. São observadores incrivelmente aguçados do mundo físico ao seu redor, notando detalhes que outros perdem - uma mudança sutil no humor de alguém, a energia de uma sala, a textura perfeita de um tecido, o momento exato para fazer uma piada que quebrará a tensão.

No entanto, essa intensidade no presente vem com desafios. ESFPs podem lutar com planejamento de longo prazo, ficam facilmente entediados com rotina e detalhes administrativos, e podem tomar decisões impulsivas sem considerar completamente as consequências futuras. Sua sensibilidade emocional, embora seja uma força em conexões interpessoais, também pode torná-los vulneráveis a críticas e conflitos.

O verdadeiro dom do ESFP está em sua capacidade de fazer os outros se sentirem vivos, celebrados e no momento. Eles são os catalisadores da alegria, os criadores de atmosfera, os que transformam situações ordinárias em memórias extraordinárias através da pura força de seu espírito vivaz e autenticidade calorosa.`,

    quote: {
      text: 'Você só vive uma vez, mas se você fizer certo, uma vez é o suficiente.',
      author: 'Mae West',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Se',
      fullName: 'Sensação Extrovertida',
      icon: '🎨',
      description: 'A função dominante Se busca experiências sensoriais diretas e vive totalmente no momento presente. ESFPs são mestres em perceber e responder ao ambiente físico imediato com precisão e graça.',
      details: 'Se manifesta como consciência aguçada do presente, habilidades físicas naturais, senso estético refinado, e capacidade de responder instantaneamente a mudanças no ambiente. ESFPs notam tudo - cores, texturas, energias, oportunidades de ação.',
    },
    {
      position: 'auxiliary',
      name: 'Fi',
      fullName: 'Sentimento Introvertido',
      icon: '❤️',
      description: 'A função auxiliar Fi cria um sistema interno profundo de valores pessoais e autenticidade. Ela guia o Se com um senso forte do que é verdadeiro para si mesmo e como tratar os outros.',
      details: 'Aparece como forte senso de identidade pessoal, decisões baseadas em valores profundos, empatia genuína, e resistência a falsidade ou hipocrisia. ESFPs sabem quem são e o que sentem, e não fingem ser outra pessoa.',
    },
    {
      position: 'tertiary',
      name: 'Te',
      fullName: 'Pensamento Extrovertido',
      icon: '⚡',
      description: 'A função terciária Te fornece capacidade de organização prática e eficiência quando motivados. Em ESFPs está menos desenvolvida, mas pode ser ativada quando necessário.',
      details: 'Pode aparecer como surtos de produtividade organizada, habilidade de fazer coisas acontecerem rapidamente quando motivados, ou soluções práticas diretas para problemas. ESFPs podem ser surpreendentemente eficientes em áreas que lhes importam.',
    },
    {
      position: 'inferior',
      name: 'Ni',
      fullName: 'Intuição Introvertida',
      icon: '🔮',
      description: 'A função inferior Ni lida com visão de longo prazo, padrões abstratos e implicações futuras. Para ESFPs, esta é a função mais desafiadora e menos desenvolvida.',
      details: 'ESFPs frequentemente lutam com planejamento de longo prazo, podem ter ansiedade sobre o futuro desconhecido, e preferem lidar com o que é concreto e imediato ao invés de possibilidades abstratas distantes.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Entusiasmo Contagiante',
        description: 'Capacidade natural de energizar ambientes e pessoas com sua presença vibrante e atitude positiva em relação à vida.',
        icon: '✨',
      },
      {
        title: 'Habilidades Interpessoais Excepcionais',
        description: 'Talento inato para ler pessoas, criar conexões genuínas, e fazer os outros se sentirem confortáveis e valorizados.',
        icon: '🤝',
      },
      {
        title: 'Consciência Sensorial Aguçada',
        description: 'Observação excepcional de detalhes físicos, estéticos e emocionais no ambiente imediato.',
        icon: '👁️',
      },
      {
        title: 'Adaptabilidade Impressionante',
        description: 'Capacidade de ajustar-se instantaneamente a novas situações, mudanças de planos, e circunstâncias inesperadas sem stress.',
        icon: '🌊',
      },
      {
        title: 'Praticidade Orientada à Ação',
        description: 'Excelência em resolver problemas concretos imediatos através de ação direta e soluções práticas.',
        icon: '🎯',
      },
    ],
    gated: [
      {
        title: 'Presença Magnética',
        description: 'Carisma natural que atrai pessoas e atenção; capacidade de dominar uma sala sem esforço aparente.',
        icon: '🌟',
      },
      {
        title: 'Talento Performático',
        description: 'Habilidades naturais de performance - seja no palco, em apresentações, ou simplesmente contando uma história envolvente.',
        icon: '🎭',
      },
      {
        title: 'Otimismo Resiliente',
        description: 'Capacidade de manter atitude positiva e recuperar-se rapidamente de contratempos através de foco no momento presente.',
        icon: '🌈',
      },
      {
        title: 'Senso Estético Refinado',
        description: 'Gosto natural para design, moda, decoração e criação de experiências sensorialmente agradáveis.',
        icon: '🎨',
      },
      {
        title: 'Empatia Genuína',
        description: 'Capacidade profunda de sentir com os outros e responder às suas necessidades emocionais de forma calorosa e autêntica.',
        icon: '💕',
      },
      {
        title: 'Coragem Social',
        description: 'Disposição para arriscar-se socialmente, iniciar interações, e quebrar o gelo em situações desconfortáveis.',
        icon: '🦁',
      },
      {
        title: 'Coordenação Física',
        description: 'Habilidades motoras naturais, graça física, e talento para atividades que requerem consciência corporal.',
        icon: '🤸',
      },
      {
        title: 'Pensamento de Crise',
        description: 'Excelência em situações de emergência onde ação imediata e presença de espírito são necessárias.',
        icon: '🚨',
      },
      {
        title: 'Generosidade Espontânea',
        description: 'Disposição natural para compartilhar, ajudar e trazer alegria aos outros sem calcular retorno.',
        icon: '🎁',
      },
      {
        title: 'Vitalidade Contagiante',
        description: 'Energia física e emocional abundante que inspira outros a se engajarem mais plenamente com a vida.',
        icon: '⚡',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Dificuldade com Planejamento de Longo Prazo',
        description: 'Tendência a focar no presente imediato sem considerar adequadamente consequências futuras ou preparação necessária.',
      },
      {
        title: 'Facilmente Entediado',
        description: 'Necessidade constante de novidade e estimulação torna difícil manter-se em tarefas rotineiras ou projetos de longo prazo.',
      },
      {
        title: 'Sensibilidade Excessiva a Críticas',
        description: 'Levam críticas muito para o lado pessoal, especialmente sobre sua performance ou forma de ser.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Impulsividade Financeira',
          description: 'Tendência a gastar em experiências e itens que proporcionam gratificação imediata sem pensar nas consequências financeiras.',
          mitigation: 'Automatizar economias e pagamentos de contas, estabelecer "dinheiro de diversão" separado, trabalhar com parceiro ou consultor financeiro para planejamento.',
        },
        {
          title: 'Evitação de Conflito',
          description: 'Desconforto intenso com confrontações e tendência a evitar problemas ao invés de abordá-los diretamente.',
          mitigation: 'Praticar conversas difíceis em ambientes seguros, aprender que conflito saudável fortalece relacionamentos, desenvolver vocabulário para expressar necessidades.',
        },
        {
          title: 'Dificuldade com Abstração e Teoria',
          description: 'Preferência por concreto e prático pode tornar difícil engajar com conceitos abstratos ou planejamento estratégico.',
          mitigation: 'Conectar conceitos abstratos a exemplos concretos, usar visualizações e metáforas, trabalhar com tipos N complementares.',
        },
        {
          title: 'Falta de Foco Sustentado',
          description: 'Atenção se dispersa facilmente para estímulos novos e mais interessantes no ambiente.',
          mitigation: 'Usar técnica Pomodoro, criar ambiente sem distrações, gamificar tarefas chatas, trabalhar em sprints curtos.',
        },
        {
          title: 'Preocupação Excessiva com Imagem',
          description: 'Consciência intensa de como são percebidos pelos outros pode levar a ansiedade social e decisões baseadas em aprovação externa.',
          mitigation: 'Desenvolver senso de self independente de validação externa, cultivar amizades onde podem ser autênticos, terapia para ansiedade social.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Performer/Artista',
        description: 'Atuação, música, dança, comédia stand-up - qualquer forma de performance ao vivo que permite expressar criatividade e conectar com audiências.',
        icon: '🎤',
        fit: 'Perfeito para Se-Fi: expressão criativa, interação com público, experiência imediata e sensorial.',
      },
      {
        title: 'Planejador de Eventos',
        description: 'Criar e executar eventos memoráveis, coordenar detalhes logísticos, criar experiências envolventes para participantes.',
        icon: '🎉',
        fit: 'Usa observação aguçada, habilidades sociais, e capacidade de responder dinamicamente a situações em mudança.',
      },
      {
        title: 'Representante de Vendas',
        description: 'Vendas que envolvem interação pessoal, construção de relacionamentos, e capacidade de ler e responder aos clientes.',
        icon: '💼',
        fit: 'Combina carisma natural, habilidades interpessoais, e praticidade orientada a resultados.',
      },
      {
        title: 'Personal Trainer/Instrutor de Fitness',
        description: 'Trabalhar individualmente com clientes, motivar através de energia positiva, usar consciência corporal para ensinar.',
        icon: '💪',
        fit: 'Aproveita consciência física, entusiasmo contagiante, e capacidade de adaptar abordagem a cada pessoa.',
      },
      {
        title: 'Comissário de Bordo',
        description: 'Interagir com pessoas diversas, lidar com situações dinâmicas, criar experiências positivas enquanto viaja.',
        icon: '✈️',
        fit: 'Variedade constante, interação social, resolução prática de problemas, ambiente em movimento.',
      },
    ],
    gated: [
      {
        title: 'Guia Turístico/de Aventura',
        description: 'Liderar tours, compartilhar conhecimento local de forma envolvente, criar experiências memoráveis para viajantes.',
        icon: '🗺️',
        fit: 'Combina amor por experiências novas, habilidades sociais e capacidade de tornar informação interessante.',
        details: 'Permite trabalho dinâmico, interação constante com pessoas novas, e compartilhar paixão por lugares e experiências.',
      },
      {
        title: 'Cabeleireiro/Profissional de Beleza',
        description: 'Transformar aparência das pessoas, construir relacionamentos com clientes, usar criatividade estética.',
        icon: '💇',
        fit: 'Senso estético aguçado, habilidades interpessoais, trabalho prático e criativo.',
        details: 'Satisfação de ver resultados imediatos, conexões pessoais com clientes, expressão criativa através de trabalho sensorial.',
      },
      {
        title: 'Palestrante Motivacional/Coach',
        description: 'Inspirar e energizar audiências, compartilhar experiências pessoais, ajudar outros a superarem obstáculos.',
        icon: '🎯',
        fit: 'Usa energia contagiante, empatia genuína, e habilidade de conectar emocionalmente.',
        details: 'Impacto direto visível em pessoas, variedade de audiências e situações, expressão de valores pessoais.',
      },
      {
        title: 'Fotógrafo/Cinegrafista',
        description: 'Capturar momentos e beleza, trabalhar com pessoas em sessões, criar arte visual que emociona.',
        icon: '📸',
        fit: 'Consciência estética excepcional, habilidade de capturar essência do momento, trabalho sensorial.',
        details: 'Combina sensibilidade artística com habilidades técnicas práticas, variedade de projetos e locações.',
      },
      {
        title: 'Designer de Interiores',
        description: 'Criar espaços bonitos e funcionais, trabalhar com clientes para realizar visões, coordenar elementos estéticos.',
        icon: '🏠',
        fit: 'Senso estético refinado, praticidade, habilidade de visualizar como espaços afetam experiência.',
        details: 'Satisfação de criar ambientes que melhoram vida das pessoas, expressão criativa tangível.',
      },
      {
        title: 'Chef/Profissional Culinário',
        description: 'Criar experiências sensoriais através de comida, trabalhar em ambiente dinâmico de cozinha, arte prática.',
        icon: '👨‍🍳',
        fit: 'Trabalho sensorial intenso, criatividade prática, resultados imediatos e tangíveis.',
        details: 'Combina arte com praticidade, feedback imediato de clientes, trabalho em equipe energético.',
      },
      {
        title: 'Terapeuta Ocupacional/Recreacional',
        description: 'Ajudar pessoas através de atividades práticas e envolventes, criar experiências terapêuticas.',
        icon: '🎨',
        fit: 'Empatia genuína, criatividade prática, impacto direto visível em pessoas.',
        details: 'Trabalho significativo que combina cuidado com pessoas e atividades práticas e criativas.',
      },
      {
        title: 'Especialista em Relações Públicas',
        description: 'Gerenciar imagem pública, criar eventos e campanhas, conectar organizações com públicos.',
        icon: '📢',
        fit: 'Habilidades sociais excepcionais, pensamento rápido, capacidade de ler situações.',
        details: 'Ambiente dinâmico, variedade de projetos, uso de criatividade e carisma.',
      },
    ],
  },

  famousPeople: [
    { name: 'Marilyn Monroe', description: 'Atriz e Ícone Cultural', photo: 'https://ui-avatars.com/api/?name=Marilyn+Monroe&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Elvis Presley', description: 'Cantor e Performer', photo: 'https://ui-avatars.com/api/?name=Elvis+Presley&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Jamie Foxx', description: 'Ator e Comediante', photo: 'https://ui-avatars.com/api/?name=Jamie+Foxx&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Adele', description: 'Cantora', photo: 'https://ui-avatars.com/api/?name=Adele&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Will Smith', description: 'Ator e Produtor', photo: 'https://ui-avatars.com/api/?name=Will+Smith&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Katy Perry', description: 'Cantora e Compositora', photo: 'https://ui-avatars.com/api/?name=Katy+Perry&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Dolly Parton', description: 'Cantora e Filantropa', photo: 'https://ui-avatars.com/api/?name=Dolly+Parton&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Magic Johnson', description: 'Jogador de Basquete', photo: 'https://ui-avatars.com/api/?name=Magic+Johnson&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Miley Cyrus', description: 'Cantora e Atriz', photo: 'https://ui-avatars.com/api/?name=Miley+Cyrus&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Hugh Hefner', description: 'Empresário e Editor', photo: 'https://ui-avatars.com/api/?name=Hugh+Hefner&background=F59E0B&color=fff', category: 'contemporary' },
  ],

  relationships: {
    isGated: true,
    preview: 'ESFPs trazem calor, diversão e autenticidade contagiantes aos relacionamentos, criando conexões vibrantes baseadas em experiências compartilhadas e expressão emocional genuína...',
    content: {
      romantic: {
        overview: 'ESFPs em relacionamentos românticos são parceiros calorosos, generosos e profundamente engajados que fazem a vida juntos sentir-se como uma aventura contínua. Eles expressam afeto aberta e frequentemente, criam memórias especiais através de experiências compartilhadas, e trazem energia positiva mesmo aos momentos ordinários.',
        strengths: [
          'Afeto expressivo e demonstrações frequentes de amor',
          'Capacidade de manter relacionamentos divertidos e excitantes',
          'Atenção genuína às necessidades emocionais do parceiro',
          'Generosidade espontânea com tempo, presentes e experiências',
          'Habilidade de fazer parceiro se sentir especial e celebrado',
        ],
        challenges: [
          'Podem evitar conversas difíceis sobre problemas de relacionamento',
          'Dificuldade com planejamento de futuro compartilhado de longo prazo',
          'Impulsividade pode levar a decisões não discutidas',
          'Sensibilidade a críticas pode criar defensividade',
          'Necessidade de muita atenção e validação pode sobrecarregar parceiro',
        ],
        tips: [
          'Desenvolva coragem para ter conversas difíceis antes que problemas cresçam',
          'Equilibre espontaneidade com algum planejamento para objetivos compartilhados',
          'Pratique ouvir críticas como informação útil, não ataque pessoal',
          'Reserve tempo para reflexão individual além de tempo juntos',
          'Procure parceiros que valorizem tanto diversão quanto profundidade emocional',
        ],
      },
      friendship: {
        overview: 'ESFPs são os amigos que fazem a vida parecer mais divertida. Eles criam atmosfera, iniciam aventuras espontâneas, e sempre sabem como animar o humor de alguém.',
        ideal: 'Outros SPs (especialmente ISFPs e ESTPs) que compartilham amor por experiências, ou NFs que apreciam autenticidade emocional e trazem profundidade complementar.',
        asAFriend: 'Leal, divertido, sempre disponível para aventuras, excelente ouvinte empático, celebra sucessos genuinamente, traz energia positiva a qualquer grupo.',
      },
      compatibility: {
        highest: ['ISTJ', 'ISFJ', 'ESTP', 'ISFP'],
        challenging: ['INTJ', 'INTP', 'ENTJ', 'INFJ'],
        explanation: 'ESFPs se conectam melhor com sensores (S) que compartilham foco no concreto e presente. Pares SJ oferecem estabilidade complementar, enquanto pares SP compartilham amor por experiências.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ESFPs envolve desenvolver sua função inferior Ni e aprender a equilibrar viver o momento com preparação para o futuro...',
    content: {
      developingInferiorNi: {
        title: 'Desenvolvendo Intuição Introvertida (Ni)',
        description: 'Ni inferior significa que ESFPs lutam com visão de longo prazo e podem ter ansiedade sobre futuro desconhecido. Desenvolvê-la é crucial para estabilidade de longo prazo.',
        practices: [
          'Dedicar 15 minutos semanais para reflexão sobre direção de vida e objetivos',
          'Praticar visualização de futuros desejados para torná-los menos abstratos',
          'Desenvolver hábito de perguntar "onde isto me levará em 5 anos?"',
          'Journaling para identificar padrões em suas escolhas e consequências',
          'Trabalhar com mentor ou coach que pode ajudar com perspectiva de longo prazo',
        ],
        signs: 'Ni saudável aparece como maior conforto com planejamento futuro, menos ansiedade sobre desconhecido, e capacidade de fazer sacrifícios presentes para ganhos futuros.',
      },
      balancingFunctions: {
        title: 'Equilibrando Se-Fi com Te-Ni',
        description: 'ESFPs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        seFiBalance: 'Use Se-Fi para viver plenamente e autenticamente no presente, mas estabeleça estruturas que protejam futuro.',
        teNiDevelopment: 'Cultive Te através de estabelecimento de sistemas e metas práticas. Desenvolva Ni através de reflexão regular e consideração de padrões e direções.',
      },
      commonTraps: {
        seFiLoop: {
          name: 'Loop Se-Te',
          description: 'Ficar preso em busca de gratificação sensorial imediata sem consideração por valores ou consequências.',
          escape: 'Reconectar com Fi: perguntar "isto está alinhado com quem eu realmente sou?" Engajar com pessoas que conhecem seus valores profundos.',
        },
        niGrip: {
          name: 'Grip de Ni',
          description: 'Sob stress extremo, Ni inferior pode se manifestar como visões catastróficas do futuro, paranoia sobre consequências terríveis.',
          escape: 'Retornar ao presente através de atividades sensoriais (exercício, natureza, música). Compartilhar medos com amigo de confiança para perspectiva realista.',
        },
      },
      dailyPractices: [
        'Dedique 10 minutos para revisar objetivos de longo prazo e progresso',
        'Pratique gratidão por experiências presentes enquanto também prepara para futuro',
        'Antes de decisões importantes, pause e considere consequências futuras',
        'Mantenha um "diário de padrões" notando quando impulsividade ajudou vs. prejudicou',
        'Cultive uma prática contemplativa (meditação, caminhadas reflexivas) para desenvolver mundo interior',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ESFPs prosperam em ambientes dinâmicos que valorizam habilidades interpessoais, permitem movimento e variedade, e oferecem feedback imediato e tangível...',
    content: {
      asLeader: {
        style: 'Liderança Carismática e Energizante',
        strengths: [
          'Líderes que inspiram através de exemplo entusiástico e energia positiva',
          'Excelentes em construir moral da equipe e criar cultura de trabalho divertida',
          'Habilidade natural de ler dinâmica de equipe e responder a necessidades',
          'Abordagem prática e direta para resolver problemas',
        ],
        challenges: [
          'Podem evitar tomar decisões difíceis que afetam pessoas negativamente',
          'Dificuldade com planejamento estratégico de longo prazo',
          'Podem priorizar harmonia sobre accountability necessária',
          'Tendência a focar em crises imediatas ao invés de prevenção',
        ],
        tips: 'Delegue planejamento estratégico a membros analíticos da equipe. Force-se a ter conversas difíceis necessárias. Use seu carisma para comunicar mudanças desafiadoras com empatia.',
      },
      asTeamMember: {
        strengths: [
          'Trazem energia positiva que eleva todo o grupo',
          'Excelentes em funções que requerem interação com clientes',
          'Flexíveis e dispostos a ajudar onde for necessário',
          'Habilidade de manter moral alto durante períodos difíceis',
        ],
        challenges: [
          'Podem se distrair com conversas sociais ao invés de tarefas',
          'Dificuldade com trabalho repetitivo ou altamente estruturado',
          'Resistência a planejamento detalhado ou documentação',
          'Podem levar feedback crítico muito pessoalmente',
        ],
        tips: 'Busque projetos variados para evitar tédio. Use suas habilidades sociais estrategicamente, não apenas socialmente. Pratique ver feedback como ferramenta de crescimento.',
      },
      idealEnvironment: {
        culture: 'Dinâmica, orientada a pessoas, com celebração de sucessos e atmosfera positiva',
        structure: 'Flexibilidade, variedade de tarefas, oportunidades para movimento e interação',
        challenges: 'Problemas que requerem pensamento rápido, interação humana, e soluções práticas',
        avoid: 'Isolamento, rotina rígida, trabalho puramente teórico ou abstrato, microgerenciamento',
      },
      conflictResolution: {
        approach: 'ESFPs preferem evitar conflito, mas quando necessário, abordam de forma direta e emocional',
        tips: [
          'Desenvolva coragem para abordar conflitos antes que escalem',
          'Pratique separar crítica ao comportamento de crítica à pessoa',
          'Use suas habilidades empáticas para entender perspectiva do outro',
          'Evite fazer tudo pessoal - nem todo desacordo é rejeição',
        ],
      },
    },
  },
};
