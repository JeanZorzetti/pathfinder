import { PersonalityType } from '../../types/personality';

export const ENFP: PersonalityType = {
  code: 'ENFP',
  nickname: 'O Ativista',
  tagline: 'Espíritos livres entusiásticos e criativos que sempre encontram razões para sorrir',
  tags: ['Entusiástico', 'Criativo', 'Espontâneo', 'Empático'],
  population: '7-8% da população',
  group: 'diplomats',

  colorScheme: {
    primary: '#EC4899',
    secondary: '#DB2777',
    light: '#FCE7F3',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ENFPs são os catalisadores de possibilidades e os campeões da autenticidade humana. Movidos por uma energia contagiante e uma curiosidade insaciável sobre pessoas e potenciais, eles veem o mundo como um playground infinito de conexões significativas e oportunidades inexploradas. Enquanto outros veem limitações, ENFPs veem possibilidades - e têm o entusiasmo magnético para inspirar outros a vê-las também.

Sua mente funciona como um caleidoscópio de ideias e conexões, constantemente girando para revelar novos padrões e possibilidades. Para o ENFP, cada pessoa tem potencial escondido esperando para ser descoberto, cada situação oferece uma chance de criar algo significativo, e cada dia traz novas aventuras emocionantes. Eles não apenas sonham com um mundo melhor - eles ativamente trabalham para inspirar outros a construí-lo.

No entanto, essa paixão ardente por possibilidades vem com seus desafios. ENFPs podem se dispersar entre tantos interesses e projetos que lutam para terminar o que começam. Sua necessidade de autenticidade e significado pode tornar tarefas rotineiras quase insuportáveis, e sua sensibilidade emocional pode deixá-los vulneráveis a críticas e rejeição.

O verdadeiro poder do ENFP está em sua capacidade de ver o melhor nas pessoas, de conectar ideias e indivíduos de maneiras inesperadas, e de inspirar outros através de seu entusiasmo genuíno e visão otimista. Eles são os catalisadores de mudança, os construtores de pontes entre pessoas e ideias, e os lembretes vibrantes de que a vida deve ser vivida com paixão e propósito.`,

    quote: {
      text: 'Não pergunte o que o mundo precisa. Pergunte o que faz você se sentir vivo e vá fazer isso. Porque o que o mundo precisa é de pessoas que se tornaram vivas.',
      author: 'Howard Thurman',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Ne',
      fullName: 'Intuição Extrovertida',
      icon: '✨',
      description: 'A função dominante Ne busca possibilidades, padrões e conexões no mundo externo. ENFPs veem potencial em tudo e todos, constantemente explorando novos caminhos e ideias empolgantes.',
      manifestation: 'Se manifesta como entusiasmo contagiante por novas ideias, habilidade de ver conexões entre conceitos aparentemente não relacionados, e uma mente que constantemente pergunta "e se?" e "o que mais é possível?". ENFPs são brainstormers naturais que energizam grupos com sua criatividade.',
    },
    {
      position: 'auxiliary',
      name: 'Fi',
      fullName: 'Sentimento Introvertido',
      icon: '❤️',
      description: 'A função auxiliar Fi cria um sistema de valores internos profundos e autênticos. Ela filtra as possibilidades do Ne através das lentes do que é significativo e alinhado com valores pessoais.',
      manifestation: 'Aparece como forte senso de autenticidade, necessidade de agir de acordo com valores pessoais, empatia profunda, e habilidade de entender as emoções e motivações dos outros em nível intuitivo. ENFPs sabem instantaneamente se algo "parece certo" para eles.',
    },
    {
      position: 'tertiary',
      name: 'Te',
      fullName: 'Pensamento Extrovertido',
      icon: '⚡',
      description: 'A função terciária Te fornece capacidade de organizar, planejar e executar quando necessário. Em ENFPs está menos desenvolvida, mas pode ser acessada em momentos de necessidade.',
      manifestation: 'Pode aparecer em explosões de produtividade organizada, especialmente quando um projeto alinha com valores (Fi). ENFPs podem ser surpreendentemente eficientes quando motivados, mas lutam para manter essa organização consistentemente.',
    },
    {
      position: 'inferior',
      name: 'Si',
      fullName: 'Sensação Introvertida',
      icon: '📋',
      description: 'A função inferior Si lida com detalhes, rotinas, memórias sensoriais e experiências passadas. Para ENFPs, esta é a função mais desafiadora e menos desenvolvida.',
      manifestation: 'ENFPs frequentemente lutam com rotinas, esquecem detalhes práticos importantes, podem negligenciar necessidades físicas quando focados em possibilidades, e têm dificuldade em aprender com erros passados da mesma forma repetida.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Entusiasmo Contagiante',
        description: 'Energia natural e genuína que inspira e motiva outros. ENFPs iluminam ambientes com sua presença positiva e paixão pela vida.',
        icon: '🌟',
      },
      {
        title: 'Criatividade Excepcional',
        description: 'Habilidade de gerar ideias inovadoras, fazer conexões únicas e encontrar soluções criativas para problemas complexos.',
        icon: '🎨',
      },
      {
        title: 'Empatia Profunda',
        description: 'Capacidade extraordinária de entender e sentir as emoções dos outros, criando conexões humanas genuínas e significativas.',
        icon: '💝',
      },
      {
        title: 'Excelentes Habilidades de Comunicação',
        description: 'Talento natural para expressar ideias de forma envolvente, adaptar comunicação para diferentes públicos, e inspirar através de palavras.',
        icon: '💬',
      },
      {
        title: 'Visão de Possibilidades',
        description: 'Capacidade única de ver potencial onde outros veem limitações, identificando oportunidades e caminhos alternativos constantemente.',
        icon: '🔮',
      },
    ],
    gated: [
      {
        title: 'Catalisadores de Mudança',
        description: 'ENFPs naturalmente inspiram transformação e crescimento em indivíduos e organizações através de seu otimismo e visão.',
        icon: '🚀',
      },
      {
        title: 'Construtores de Pontes Sociais',
        description: 'Habilidade excepcional de conectar pessoas diferentes, facilitando colaboração e criando comunidades inclusivas.',
        icon: '🌉',
      },
      {
        title: 'Adaptabilidade Extraordinária',
        description: 'Prosperam em mudanças e imprevistos, rapidamente ajustando planos e encontrando novas oportunidades em desafios.',
        icon: '🦋',
      },
      {
        title: 'Autenticidade Inspiradora',
        description: 'Vivem alinhados com seus valores pessoais, encorajando outros a serem genuínos e a viverem com integridade.',
        icon: '💎',
      },
      {
        title: 'Habilidade de Leitura de Pessoas',
        description: 'Intuitivamente entendem motivações, emoções e potenciais ocultos nas pessoas, vendo além das máscaras sociais.',
        icon: '👁️',
      },
      {
        title: 'Capacidade de Brainstorming',
        description: 'Geram fluxos aparentemente infinitos de ideias criativas, especialmente em sessões colaborativas.',
        icon: '💡',
      },
      {
        title: 'Resiliência Emocional',
        description: 'Apesar da sensibilidade, têm capacidade notável de se recuperar de decepções e encontrar esperança novamente.',
        icon: '🌱',
      },
      {
        title: 'Curiosidade Multidimensional',
        description: 'Interesse genuíno por pessoas, ideias, culturas e experiências diversas, levando a conhecimento amplo.',
        icon: '🌍',
      },
      {
        title: 'Habilidade de Improviso',
        description: 'Excelentes em pensar rapidamente, adaptar-se a situações inesperadas e criar soluções na hora.',
        icon: '🎭',
      },
      {
        title: 'Energia para Iniciar Projetos',
        description: 'Entusiasmo abundante para começar novos projetos, especialmente aqueles alinhados com valores e paixões.',
        icon: '🎯',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Dificuldade com Follow-Through',
        description: 'Excelentes em iniciar projetos com entusiasmo, mas lutam para mantê-los até a conclusão quando o interesse inicial diminui.',
        impact: 'Acúmulo de projetos inacabados, reputação de não ser confiável, potencial desperdiçado em ideias que nunca se concretizam.',
      },
      {
        title: 'Foco Disperso',
        description: 'Tantos interesses e possibilidades que é difícil se comprometer com uma direção, levando a energia espalhada.',
        impact: 'Progresso lento em qualquer área específica, frustração por não se tornar expert em nada, sensação de estar sempre começando do zero.',
      },
      {
        title: 'Hipersensibilidade a Críticas',
        description: 'Levam feedback negativo muito pessoalmente devido ao Fi forte, podendo ser devastados por rejeição ou crítica.',
        impact: 'Evitação de situações onde podem ser julgados, dificuldade em aceitar feedback construtivo, relacionamentos tensos.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Procrastinação de Tarefas Rotineiras',
          description: 'Tarefas práticas, repetitivas ou detalhadas são quase insuportáveis, levando a procrastinação crônica em responsabilidades básicas.',
          impact: 'Contas não pagas, documentos atrasados, ambiente desorganizado, stress de última hora para cumprir prazos.',
          mitigation: 'Gamificar tarefas chatas, fazer "body doubling" (trabalhar junto com alguém), usar timers e recompensas, automatizar o máximo possível, pedir ajuda sem vergonha.',
        },
        {
          title: 'People-Pleasing Excessivo',
          description: 'Desejo tão forte de harmonia e aceitação que podem sacrificar suas próprias necessidades para fazer outros felizes.',
          impact: 'Burnout emocional, ressentimento acumulado, perda de senso de identidade, dificuldade em estabelecer limites saudáveis.',
          mitigation: 'Praticar dizer "não", reconhecer que decepcionar alguns é inevitável, trabalhar em terapia sobre validação interna, priorizar autocuidado.',
        },
        {
          title: 'Tomada de Decisão Paralisante',
          description: 'Ver tantas possibilidades e considerar tantas perspectivas que tomar decisões definitivas se torna extremamente difícil.',
          impact: 'Oportunidades perdidas, dependência excessiva de outros para decidir, stress por indecisão crônica.',
          mitigation: 'Estabelecer prazos para decisões, usar método de eliminação, aceitar que nenhuma escolha é perfeita, lembrar que não decidir é uma decisão.',
        },
        {
          title: 'Negligência de Necessidades Práticas',
          description: 'Tão focados em ideias e possibilidades que esquecem necessidades básicas como finanças, saúde e manutenção.',
          impact: 'Problemas financeiros, saúde deteriorada, situações de vida caóticas que criam stress desnecessário.',
          mitigation: 'Automatizar finanças, estabelecer rotinas mínimas não-negociáveis, usar apps de rastreamento, aceitar ajuda prática de outros.',
        },
        {
          title: 'Idealização Irrealista',
          description: 'Tendência a ver pessoas, projetos e situações através de lentes cor-de-rosa, ignorando sinais de alerta e limitações práticas.',
          impact: 'Decepções repetidas, relacionamentos tóxicos prolongados, investimento em projetos condenados, cinismo eventual.',
          mitigation: 'Cultivar amigos realistas que ofereçam perspectiva, fazer "pre-mortem" (imaginar o que poderia dar errado), verificar fatos antes de entusiasmo.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Conselheiro/Psicólogo',
        description: 'Ajudar pessoas a descobrir seu potencial, trabalhar através de desafios emocionais e crescer como indivíduos.',
        icon: '🧠',
        fit: 'Ideal para Ne-Fi: entender pessoas profundamente, ver possibilidades de crescimento, trabalho significativo e alinhado com valores.',
      },
      {
        title: 'Escritor/Jornalista Criativo',
        description: 'Explorar ideias através de palavras, contar histórias humanas, investigar tópicos diversos e comunicar de forma envolvente.',
        icon: '✍️',
        fit: 'Permite expressão criativa, variedade de tópicos, flexibilidade, e uso de habilidades naturais de comunicação.',
      },
      {
        title: 'Marketing Criativo/Publicitário',
        description: 'Criar campanhas inovadoras, entender psicologia do consumidor, contar histórias de marca, brainstorming criativo.',
        icon: '📢',
        fit: 'Combina criatividade com compreensão de pessoas, oferece variedade e permite influenciar culturalmente.',
      },
      {
        title: 'Professor/Educador',
        description: 'Inspirar amor pelo aprendizado, adaptar ensino para diferentes estilos, criar experiências educacionais envolventes.',
        icon: '📚',
        fit: 'Trabalho com pessoas, oportunidade de inspirar, variedade diária, e fazer diferença tangível.',
      },
      {
        title: 'Empreendedor/Fundador de Startup',
        description: 'Criar negócios inovadores, especialmente em áreas que resolvem problemas humanos ou sociais significativos.',
        icon: '🚀',
        fit: 'Autonomia completa, permite seguir paixões, variedade constante, e potencial de grande impacto.',
      },
    ],
    gated: [
      {
        title: 'Ator/Performer',
        description: 'Explorar diferentes personagens e emoções, conectar com audiências, expressar criatividade através de performance.',
        icon: '🎭',
        fit: 'Uso de empatia natural, variedade de papéis, expressão emocional autêntica.',
        details: 'Permite canalizar intensidade emocional de forma produtiva, explorar diferentes aspectos da experiência humana, e impactar audiências emocionalmente.',
      },
      {
        title: 'Coach de Vida/Desenvolvimento Pessoal',
        description: 'Ajudar clientes a descobrir propósito, superar obstáculos, e alcançar versões mais autênticas de si mesmos.',
        icon: '🌟',
        fit: 'Alinhamento perfeito com Ne (ver possibilidades) e Fi (valores e autenticidade).',
        details: 'Autonomia para criar métodos próprios, trabalho profundamente significativo, e testemunhar transformações humanas reais.',
      },
      {
        title: 'Designer de Experiências/UX',
        description: 'Criar experiências centradas no usuário, entender necessidades humanas, projetar soluções criativas e empáticas.',
        icon: '🎨',
        fit: 'Combina criatividade, empatia e resolução de problemas focada em pessoas.',
        details: 'Pesquisa de usuário usa habilidades de leitura de pessoas, design permite criatividade, e impacto direto na vida das pessoas.',
      },
      {
        title: 'Gestor de Recursos Humanos/Cultura',
        description: 'Desenvolver cultura organizacional, recrutar talentos, facilitar desenvolvimento de equipes, resolver conflitos.',
        icon: '👥',
        fit: 'Trabalho focado em pessoas, oportunidade de criar ambientes positivos.',
        details: 'Permite usar empatia para construir pontes, criar programas inovadores de desenvolvimento, e fazer organizações mais humanas.',
      },
      {
        title: 'Fotógrafo/Videógrafo',
        description: 'Capturar momentos significativos, contar histórias visuais, explorar criatividade através de mídia visual.',
        icon: '📸',
        fit: 'Expressão criativa, variedade de projetos, captura de emoções e possibilidades.',
        details: 'Freelancing oferece autonomia, cada projeto é diferente, e permite documentar a beleza e complexidade humana.',
      },
    ],
  },

  famousPeople: [
    { name: 'Robin Williams', description: 'Ator e Comediante', photo: 'https://ui-avatars.com/api/?name=Robin+Williams&background=EC4899&color=fff', category: 'contemporary' },
    { name: 'Ellen DeGeneres', description: 'Apresentadora e Comediante', photo: 'https://ui-avatars.com/api/?name=Ellen+DeGeneres&background=EC4899&color=fff', category: 'contemporary' },
    { name: 'Will Smith', description: 'Ator e Músico', photo: 'https://ui-avatars.com/api/?name=Will+Smith&background=EC4899&color=fff', category: 'contemporary' },
    { name: 'Robert Downey Jr.', description: 'Ator', photo: 'https://ui-avatars.com/api/?name=Robert+Downey+Jr&background=EC4899&color=fff', category: 'contemporary' },
    { name: 'Quentin Tarantino', description: 'Diretor e Roteirista', photo: 'https://ui-avatars.com/api/?name=Quentin+Tarantino&background=EC4899&color=fff', category: 'contemporary' },
    { name: 'Russell Brand', description: 'Comediante e Ativista', photo: 'https://ui-avatars.com/api/?name=Russell+Brand&background=EC4899&color=fff', category: 'contemporary' },
    { name: 'Drew Barrymore', description: 'Atriz e Produtora', photo: 'https://ui-avatars.com/api/?name=Drew+Barrymore&background=EC4899&color=fff', category: 'contemporary' },
    { name: 'Sandra Bullock', description: 'Atriz', photo: 'https://ui-avatars.com/api/?name=Sandra+Bullock&background=EC4899&color=fff', category: 'contemporary' },
    { name: 'Walt Disney', description: 'Empreendedor Criativo', photo: 'https://ui-avatars.com/api/?name=Walt+Disney&background=EC4899&color=fff', category: 'contemporary' },
    { name: 'Mark Twain', description: 'Escritor e Humorista', photo: 'https://ui-avatars.com/api/?name=Mark+Twain&background=EC4899&color=fff', category: 'contemporary' },
  ],

  relationships: {
    isGated: true,
    preview: 'ENFPs trazem entusiasmo, profundidade emocional e aventura aos relacionamentos, mas precisam de parceiros que valorizem autenticidade e possam acompanhar sua energia...',
    content: {
      romantic: {
        overview: 'ENFPs em relacionamentos românticos são parceiros apaixonados, atentos e profundamente dedicados a crescimento mútuo. Eles veem relacionamentos como jornadas de descoberta contínua, onde ambos os parceiros podem se tornar suas melhores versões. ENFPs amam com intensidade, buscam conexão emocional profunda, e constantemente buscam maneiras de manter o relacionamento vivo e significativo.',
        strengths: [
          'Entusiasmo contagiante que mantém o relacionamento empolgante e vivo',
          'Profunda empatia e capacidade de entender emocionalmente o parceiro',
          'Criatividade em demonstrar amor e criar experiências memoráveis juntos',
          'Comunicação aberta e honesta, valorizam autenticidade acima de tudo',
          'Comprometimento com crescimento pessoal e desenvolvimento mútuo',
          'Habilidade de ver o melhor no parceiro e encorajá-lo a alcançar potencial',
        ],
        challenges: [
          'Podem idealizar o parceiro inicialmente, levando a decepção quando realidade emerge',
          'Necessidade constante de novidade pode fazer relacionamentos estáveis parecerem "chatos"',
          'Sensibilidade extrema pode transformar pequenos conflitos em dramas emocionais',
          'Tendência a evitar confrontos difíceis para manter harmonia',
          'Podem se perder no relacionamento, negligenciando identidade individual',
          'Dificuldade com aspectos práticos da vida compartilhada (finanças, rotinas)',
        ],
        tips: [
          'Escolha parceiros que valorizem profundidade emocional e crescimento pessoal',
          'Mantenha hobbies e amizades individuais para preservar senso de identidade',
          'Pratique confrontar problemas diretamente ao invés de evitá-los',
          'Estabeleça expectativas realistas - nenhum parceiro será perfeito',
          'Crie sistemas para tarefas práticas para que não sobrecarreguem o parceiro',
          'Lembre-se que intimidade profunda também vem de momentos calmos e rotinas',
        ],
      },
      friendship: {
        overview: 'ENFPs são amigos leais, entusiásticos e profundamente solidários. Eles trazem energia positiva, encorajamento genuíno e aventura para suas amizades. ENFPs frequentemente mantêm círculos sociais amplos, mas também cultivam algumas amizades profundamente íntimas.',
        ideal: 'Outros NFs (especialmente INFJs e ENFJs) que compartilham valores e profundidade emocional, ou NTs que trazem perspectiva lógica complementar e estimulação intelectual.',
        asAFriend: 'Extremamente leal, sempre disponível emocionalmente, excelente ouvinte empático, incentivador incansável, criador de experiências memoráveis, conecta amigos entre si.',
      },
      compatibility: {
        highest: ['INFJ', 'INTJ', 'ENFJ', 'ENTP'],
        challenging: ['ISTJ', 'ESTJ', 'ISTP', 'ESTP'],
        explanation: 'ENFPs se conectam melhor com intuitivos (N) que compartilham interesse em possibilidades e significado. INFJs oferecem profundidade emocional e compreensão, enquanto INTJs e ENTPs trazem desafio intelectual e perspectivas diferentes.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ENFPs envolve desenvolver sua função inferior Si e aprender a equilibrar exploração de possibilidades com compromisso e follow-through...',
    content: {
      developingInferiorSi: {
        title: 'Desenvolvendo Sensação Introvertida (Si)',
        description: 'Si inferior significa que ENFPs lutam com rotinas, detalhes práticos e aprendizado de experiências passadas. Desenvolvê-la é crucial para estabilidade e conclusão de objetivos.',
        practices: [
          'Criar rotinas mínimas não-negociáveis (sono, refeições, exercício) e mantê-las',
          'Praticar atenção plena ao presente ao invés de sempre focar em possibilidades futuras',
          'Manter um diário para rastrear padrões e aprender com experiências passadas',
          'Desenvolver sistemas simples para tarefas práticas (checklists, automações)',
          'Cultivar apreço por tradições e memórias, não apenas novidades',
        ],
        signs: 'Si saudável aparece como maior capacidade de completar projetos, melhor gerenciamento de responsabilidades práticas, e habilidade de criar estabilidade sem sentir-se aprisionado.',
      },
      balancingFunctions: {
        title: 'Equilibrando Ne-Fi com Te-Si',
        description: 'ENFPs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        tiNeBalance: 'Use Ne-Fi para exploração criativa e alinhamento com valores, mas estabeleça limites para evitar dispersão excessiva de energia.',
        siFeDevelopment: 'Cultive Te através de planejamento estratégico e execução organizada. Desenvolva Si através de rotinas consistentes e atenção a detalhes quando necessário.',
      },
      commonTraps: {
        neFiLoop: {
          name: 'Loop Ne-Fi',
          description: 'Ficar preso explorando possibilidades emocionalmente carregadas sem executar nada, levando a ansiedade e paralisia.',
          escape: 'Engajar Te: fazer planos concretos, estabelecer deadlines, tomar ações pequenas mesmo que imperfeitas. Buscar accountability externa.',
        },
        siGrip: {
          name: 'Grip de Si',
          description: 'Sob stress extremo, Si pode se manifestar negativamente: obsessão com detalhes triviais, hipocondria, fixação em experiências negativas passadas.',
          escape: 'Retornar ao Ne: explorar novas possibilidades, sair da rotina estressante, conectar com pessoas novas, lembrar-se da visão maior.',
        },
      },
      dailyPractices: [
        'Reserve 1-2 "projetos âncora" que você compromete-se a completar antes de iniciar novos',
        'Pratique 10 minutos de mindfulness diários para desenvolver presença',
        'Mantenha lista de vitórias e sucessos passados para combater autodúvida',
        'Estabeleça "horário de responsabilidades" diário para tarefas práticas',
        'Cultive pelo menos uma amizade onde você pode ser totalmente vulnerável',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ENFPs prosperam em ambientes que valorizam criatividade, autonomia, diversidade e impacto humano significativo...',
    content: {
      asLeader: {
        style: 'Liderança Inspiradora e Inclusiva',
        strengths: [
          'Líderes carismáticos que inspiram lealdade através de entusiasmo genuíno',
          'Excelentes em ver potencial único em cada membro da equipe',
          'Criam ambientes inclusivos onde todos se sentem valorizados',
          'Comunicadores excepcionais que articulam visão de forma envolvente',
          'Flexíveis e adaptáveis a mudanças e necessidades emergentes',
        ],
        challenges: [
          'Podem evitar conversas difíceis ou decisões impopulares',
          'Dificuldade em manter consistência em processos e expectativas',
          'Tendência a iniciar muitas iniciativas sem recursos para completá-las',
          'Podem tomar decisões baseadas em emoção ao invés de dados',
        ],
        tips: 'Cultive um "segundo em comando" orientado a detalhes.Force-se a ter conversas difíceis cedo. Limite novas iniciativas até completar as existentes. Busque dados antes de decisões importantes.',
      },
      asTeamMember: {
        strengths: [
          'Brainstormers excepcionais que geram ideias criativas abundantes',
          'Construtores de moral que mantêm espírito de equipe positivo',
          'Mediadores naturais que resolvem conflitos interpessoais',
          'Adaptáveis a mudanças e rápidos para encontrar soluções criativas',
        ],
        challenges: [
          'Podem se entediar com trabalho rotineiro ou detalhista',
          'Dificuldade em cumprir prazos de tarefas não inspiradoras',
          'Podem dominar reuniões com entusiasmo, não deixando outros falarem',
          'Sensibilidade a críticas pode dificultar receber feedback',
        ],
        tips: 'Comunique necessidade de variedade e significado no trabalho. Peça tarefas criativas ou orientadas a pessoas. Pratique escuta ativa. Desenvolva resiliência a feedback construtivo.',
      },
      idealEnvironment: {
        culture: 'Colaborativa, inclusiva, valoriza criatividade e impacto humano significativo',
        structure: 'Autonomia com suporte, flexibilidade, oportunidades de variedade e aprendizado contínuo',
        challenges: 'Projetos que permitem criatividade, trabalho com pessoas, e fazem diferença tangível',
        avoid: 'Microgerenciamento, trabalho altamente repetitivo, ambientes excessivamente políticos ou rígidos',
      },
      conflictResolution: {
        approach: 'ENFPs abordam conflitos buscando entender todas as perspectivas e encontrar soluções que honrem valores de todos.',
        tips: [
          'Não evite conflitos por desejo de harmonia - resolva-os cedo',
          'Pratique separar crítica de trabalho de crítica pessoal',
          'Use empatia como força, mas também estabeleça limites claros',
          'Lembre-se que discordar não significa rejeição pessoal',
        ],
      },
    },
  },
};
