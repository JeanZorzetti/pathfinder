import { PersonalityType } from '../../types/personality';

export const ENTP: PersonalityType = {
  code: 'ENTP',
  nickname: 'O Inovador',
  tagline: 'Pensadores audaciosos e criativos que nunca recusam um desafio intelectual',
  tags: ['Inovador', 'Debatedor', 'Criativo', 'Carismático'],
  population: '3-4% da população',
  group: 'analysts',

  colorScheme: {
    primary: '#8B5CF6',
    secondary: '#7C3AED',
    light: '#DDD6FE',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ENTPs são os visionários irreverentes do mundo - mentes brilhantes que vivem para desafiar o status quo e reimaginar o que é possível. Com um arsenal interminável de ideias inovadoras e um dom natural para debate, eles transformam cada conversa em uma expedição intelectual e cada problema em uma oportunidade para inovação radical. Enquanto outros veem limitações, ENTPs veem trampolins para possibilidades ainda não exploradas.

Sua mente funciona como um gerador perpétuo de conexões criativas, saltando entre conceitos aparentemente não relacionados e tecendo-os em visões completamente originais. Para o ENTP, não existe ideia sagrada demais para ser questionada ou sistema estabelecido demais para ser desafiado; tudo é matéria-prima para inovação e transformação. Eles são os advogados do diabo por excelência - não por malícia, mas por um desejo genuíno de testar ideias até seus limites.

No entanto, essa explosão perpétua de criatividade e debate vem com seus desafios. ENTPs podem se perder tanto na empolgação de novas possibilidades que negligenciam a execução e os detalhes práticos. Eles frequentemente iniciam dez projetos revolucionários e lutam para terminar um único, e sua tendência a desafiar tudo pode ser interpretada como confronto ou insensibilidade, quando na verdade é apenas seu modo de buscar a verdade.

O verdadeiro poder do ENTP está em sua capacidade de ver oportunidades onde outros veem obstáculos, de inspirar pessoas com visões audaciosas, e de inovar soluções que ninguém imaginou possíveis. Eles são os empreendedores natos, os catalisadores de mudança que transformam o impossível em inevitável através da pura força de imaginação e argumentação.`,

    quote: {
      text: 'A mente que se abre a uma nova ideia jamais voltará ao seu tamanho original.',
      author: 'Albert Einstein',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Ne',
      fullName: 'Intuição Extrovertida',
      icon: '✨',
      description: 'A função dominante Ne busca possibilidades, padrões e conexões no mundo externo. ENTPs são movidos por um fluxo constante de ideias novas, sempre explorando o que poderia ser ao invés do que é.',
      manifestation: 'Se manifesta como brainstorming perpétuo, entusiasmo contagiante por novas possibilidades, e habilidade de ver potencial em tudo. ENTPs não param de fazer conexões criativas entre conceitos diversos.',
    },
    {
      position: 'auxiliary',
      name: 'Ti',
      fullName: 'Pensamento Introvertido',
      icon: '🧠',
      description: 'A função auxiliar Ti analisa e desconstrói sistemas internamente. Ela pega as possibilidades geradas por Ne e as submete a análise lógica rigorosa, identificando inconsistências e refinando conceitos.',
      manifestation: 'Aparece como necessidade de entender "como" as coisas funcionam internamente, capacidade de encontrar falhas em argumentos, e busca por frameworks lógicos elegantes. ENTPs questionam pressupostos com precisão cirúrgica.',
    },
    {
      position: 'tertiary',
      name: 'Fe',
      fullName: 'Sentimento Extrovertido',
      icon: '❤️',
      description: 'A função terciária Fe sintoniza-se com a atmosfera social e as emoções dos outros. Em ENTPs, ela fornece charme natural e habilidade de ler pessoas, embora seja menos desenvolvida.',
      manifestation: 'Pode aparecer como carisma social, capacidade de adaptar argumentos ao público, e desejo ocasional de harmonia social. ENTPs podem ser surpreendentemente persuasivos e encantadores quando querem.',
    },
    {
      position: 'inferior',
      name: 'Si',
      fullName: 'Sensação Introvertida',
      icon: '📚',
      description: 'A função inferior Si lida com memórias internas, rotinas e experiências passadas. Para ENTPs, esta é a função mais desafiadora e menos desenvolvida.',
      manifestation: 'ENTPs frequentemente negligenciam rotinas, esquecem detalhes importantes, e resistem a métodos "comprovados" em favor de experimentação. Podem ter relação difícil com consistência e disciplina.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Inovação e Criatividade Excepcional',
        description: 'Capacidade extraordinária de gerar ideias originais e fazer conexões criativas que ninguém mais vê.',
        icon: '💡',
      },
      {
        title: 'Pensamento Rápido e Adaptabilidade',
        description: 'Habilidade de processar informações rapidamente e ajustar estratégias em tempo real conforme situações mudam.',
        icon: '⚡',
      },
      {
        title: 'Excelência em Debate e Argumentação',
        description: 'Capacidade natural de construir argumentos persuasivos, identificar falhas lógicas, e defender posições de múltiplos ângulos.',
        icon: '⚔️',
      },
      {
        title: 'Carisma e Habilidade de Influência',
        description: 'Presença magnética que atrai outros, combinada com capacidade de inspirar e entusiasmar pessoas com suas visões.',
        icon: '✨',
      },
      {
        title: 'Visão de Possibilidades',
        description: 'Talento único para ver potencial onde outros veem limitações, e imaginar futuros alternativos e inovadores.',
        icon: '🔮',
      },
    ],
    gated: [
      {
        title: 'Resiliência Intelectual',
        description: 'Não se intimidam com críticas ou desafios; na verdade, usam oposição como combustível para refinar suas ideias.',
        icon: '🛡️',
      },
      {
        title: 'Empreendedorismo Natural',
        description: 'Combinação perfeita de visão, risco calculado e persuasão necessária para transformar ideias em realidade.',
        icon: '🚀',
      },
      {
        title: 'Versatilidade e Amplitude',
        description: 'Conseguem navegar múltiplos domínios de conhecimento e aplicar insights de uma área em outra completamente diferente.',
        icon: '🌐',
      },
      {
        title: 'Habilidade de Networking',
        description: 'Naturalmente constroem redes diversas de contatos através de curiosidade genuína sobre pessoas e ideias.',
        icon: '🤝',
      },
      {
        title: 'Solução Criativa de Problemas',
        description: 'Abordam desafios de ângulos completamente não convencionais, frequentemente encontrando soluções que quebram paradigmas.',
        icon: '🧩',
      },
      {
        title: 'Energia Contagiante',
        description: 'Seu entusiasmo e paixão por ideias inspira e motiva outros a pensar maior e ousar mais.',
        icon: '🔥',
      },
      {
        title: 'Questionamento Estratégico',
        description: 'Sabem fazer as perguntas certas que desafiam pressupostos e revelam problemas ocultos em planos ou sistemas.',
        icon: '❓',
      },
      {
        title: 'Improvisação Brilhante',
        description: 'Prosperam em situações imprevisíveis, criando soluções na hora com recursos disponíveis.',
        icon: '🎭',
      },
      {
        title: 'Coragem Intelectual',
        description: 'Dispostos a defender ideias controversas ou impopulares se acreditam que são logicamente sólidas.',
        icon: '🦁',
      },
      {
        title: 'Síntese Interdisciplinar',
        description: 'Capacidade excepcional de integrar conhecimentos de campos diversos em insights e inovações únicas.',
        icon: '🧬',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Dificuldade Extrema em Finalizar Projetos',
        description: 'Tendência crônica de iniciar múltiplos projetos empolgantes mas abandoná-los quando surgem ideias mais novas e brilhantes.',
        impact: 'Potencial desperdiçado, reputação de não entregar, frustração de ver ideias brilhantes nunca realizadas.',
      },
      {
        title: 'Argumentatividade Excessiva',
        description: 'Compulsão de debater tudo, mesmo quando seria mais sábio deixar passar ou concordar por harmonia social.',
        impact: 'Relacionamentos desgastados, reputação de ser confrontador, conflitos desnecessários em situações sociais e profissionais.',
      },
      {
        title: 'Negligência de Detalhes e Rotinas',
        description: 'Foco em grandes ideias às custas de detalhes práticos e tarefas administrativas essenciais.',
        impact: 'Erros evitáveis, compromissos esquecidos, caos organizacional, dependência de outros para questões práticas.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Síndrome do Advogado do Diabo',
          description: 'Necessidade compulsiva de argumentar o lado oposto de qualquer questão, mesmo quando machuca sentimentos ou danifica relacionamentos.',
          impact: 'Pessoas se sentem atacadas ou não valorizadas, dificuldade em demonstrar apoio genuíno, isolamento social.',
          mitigation: 'Pergunte-se: "Esse debate vai adicionar valor ou só satisfazer meu ego?" Pratique validar ideias antes de criticá-las. Desenvolva consciência de quando outros precisam de apoio, não de desafio.',
        },
        {
          title: 'Procrastinação por Exploração',
          description: 'Postergar execução indefinidamente porque sempre há mais possibilidades para explorar, mais pesquisa para fazer, mais ângulos para considerar.',
          impact: 'Deadlines perdidos, oportunidades desperdiçadas, projetos nunca lançados apesar de anos de "preparação".',
          mitigation: 'Estabeleça limites claros para fase de exploração. Use regra "70% de certeza = hora de agir". Arranje parceiros ou sistemas que forcem execução.',
        },
        {
          title: 'Tédio Crônico e Necessidade de Novidade',
          description: 'Incapacidade de tolerar rotina ou repetição; necessidade constante de estimulação nova leva a comportamento errático.',
          impact: 'Carreira instável, relacionamentos interrompidos prematuramente, incapacidade de desenvolver expertise profunda.',
          mitigation: 'Encontre carreira com variedade embutida (consultoria, empreendedorismo). Gamifique tarefas repetitivas. Alterne entre múltiplos projetos em ciclos estruturados.',
        },
        {
          title: 'Insensibilidade Não Intencional',
          description: 'Foco em lógica e precisão conceitual pode fazer com que ignorem ou invalidem sentimentos legítimos dos outros.',
          impact: 'Danos em relacionamentos íntimos, reputação de ser frio ou cruel, perda de confiança de pessoas próximas.',
          mitigation: 'Antes de corrigir alguém, pergunte: "Isso é importante ou é meu ego?" Pratique empatia ativa. Reconheça que verdades emocionais são tão válidas quanto lógicas.',
        },
        {
          title: 'Dispersão de Foco e Energia',
          description: 'Tentam abraçar muitas oportunidades simultaneamente, espalhando recursos finos demais para causar impacto real.',
          impact: 'Exaustão, burnout, sensação de estar sempre ocupado mas nunca progredindo realmente.',
          mitigation: 'Pratique "Hell Yes or No" - comprometa-se apenas com projetos que sejam absolutamente empolgantes. Use sistemas para dizer não (quota de projetos simultâneos).',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Empreendedor/Fundador de Startup',
        description: 'Criar empresas inovadoras, disruptar indústrias, transformar ideias audaciosas em negócios reais.',
        icon: '🚀',
        fit: 'Ideal para Ne-Ti: liberdade criativa, múltiplos desafios, impacto direto de ideias inovadoras.',
      },
      {
        title: 'Inventor/Inovador de Produto',
        description: 'Desenvolver produtos revolucionários, tecnologias novas, soluções que não existiam antes.',
        icon: '💡',
        fit: 'Combina criatividade ilimitada com aplicação prática; satisfação de ver ideias tornarem-se realidade.',
      },
      {
        title: 'Consultor Estratégico',
        description: 'Resolver problemas complexos de negócios, desenvolver estratégias inovadoras, trazer perspectivas externas.',
        icon: '💼',
        fit: 'Variedade constante, desafios intelectuais novos, impacto através de ideias, networking natural.',
      },
      {
        title: 'Advogado/Litigante',
        description: 'Construir argumentos persuasivos, debater em tribunal, encontrar ângulos legais inovadores.',
        icon: '⚖️',
        fit: 'Usa habilidades de debate e pensamento estratégico; cada caso é um novo quebra-cabeça intelectual.',
      },
      {
        title: 'Jornalista Investigativo/Apresentador',
        description: 'Investigar histórias complexas, fazer perguntas difíceis, comunicar ideias para audiências amplas.',
        icon: '📰',
        fit: 'Combina curiosidade, habilidades de comunicação, e variedade perpétua de tópicos.',
      },
    ],
    gated: [
      {
        title: 'Product Manager/Estrategista de Inovação',
        description: 'Liderar desenvolvimento de produtos inovadores, conectar visão estratégica com execução de equipes.',
        icon: '📱',
        fit: 'Posição que requer visão de possibilidades, análise estratégica, e habilidade de inspirar equipes.',
        details: 'Permite trabalhar em múltiplas iniciativas, traduzir ideias em roadmaps, e ver impacto direto de inovações.',
      },
      {
        title: 'Marketing Estratégico/Growth Hacker',
        description: 'Desenvolver campanhas criativas, experimentar com novos canais, crescer negócios através de abordagens não convencionais.',
        icon: '📈',
        fit: 'Ambiente de experimentação rápida, métricas claras de sucesso, espaço para criatividade audaciosa.',
        details: 'Ideal para ENTPs que gostam de testar ideias rapidamente e pivotear baseado em resultados.',
      },
      {
        title: 'Arquiteto de Sistemas/Tech Lead',
        description: 'Projetar arquiteturas de software complexas, resolver problemas técnicos desafiadores, liderar direção técnica.',
        icon: '🏗️',
        fit: 'Combina pensamento sistêmico, inovação técnica, e influência sem microgerenciamento.',
        details: 'Satisfação de criar sistemas elegantes e influenciar direção técnica através de ideias, não autoridade.',
      },
      {
        title: 'Professor/Palestrante',
        description: 'Ensinar tópicos complexos de maneiras envolventes, inspirar estudantes, debater ideias.',
        icon: '🎓',
        fit: 'Combina performance, debate intelectual, e impacto em mentes jovens.',
        details: 'Ideal se tiver liberdade para experimentar com métodos de ensino e autonomia no currículo.',
      },
      {
        title: 'Roteirista/Criador de Conteúdo',
        description: 'Criar narrativas originais, desenvolver mundos ficcionais, explorar ideias através de storytelling.',
        icon: '🎬',
        fit: 'Outlet criativo ilimitado, exploração de possibilidades narrativas, impacto cultural.',
        details: 'Desafio: requer disciplina para finalizar projetos; considere parceiros que ajudem com estrutura.',
      },
    ],
  },

  famousPeople: [
    { name: 'Thomas Edison', role: 'Inventor', avatar: 'https://ui-avatars.com/api/?name=Thomas+Edison&background=8B5CF6&color=fff' },
    { name: 'Leonardo da Vinci', role: 'Polímata e Inventor', avatar: 'https://ui-avatars.com/api/?name=Leonardo+da+Vinci&background=8B5CF6&color=fff' },
    { name: 'Benjamin Franklin', role: 'Polímata e Estadista', avatar: 'https://ui-avatars.com/api/?name=Benjamin+Franklin&background=8B5CF6&color=fff' },
    { name: 'Sarah Silverman', role: 'Comediante', avatar: 'https://ui-avatars.com/api/?name=Sarah+Silverman&background=8B5CF6&color=fff' },
    { name: 'Adam Savage', role: 'Apresentador e Inventor', avatar: 'https://ui-avatars.com/api/?name=Adam+Savage&background=8B5CF6&color=fff' },
    { name: 'Mark Twain', role: 'Escritor e Humorista', avatar: 'https://ui-avatars.com/api/?name=Mark+Twain&background=8B5CF6&color=fff' },
    { name: 'Sacha Baron Cohen', role: 'Comediante e Ator', avatar: 'https://ui-avatars.com/api/?name=Sacha+Baron+Cohen&background=8B5CF6&color=fff' },
    { name: 'Celine Dion', role: 'Cantora', avatar: 'https://ui-avatars.com/api/?name=Celine+Dion&background=8B5CF6&color=fff' },
    { name: 'Neil Patrick Harris', role: 'Ator e Apresentador', avatar: 'https://ui-avatars.com/api/?name=Neil+Patrick+Harris&background=8B5CF6&color=fff' },
    { name: 'Catherine the Great', role: 'Imperatriz da Rússia', avatar: 'https://ui-avatars.com/api/?name=Catherine+the+Great&background=8B5CF6&color=fff' },
  ],

  relationships: {
    isGated: true,
    preview: 'ENTPs trazem energia, entusiasmo e perspectivas fascinantes aos relacionamentos, mas precisam de parceiros que apreciem debate e tolerem sua necessidade de novidade...',
    content: {
      romantic: {
        overview: 'ENTPs em relacionamentos românticos são parceiros carismáticos, estimulantes e surpreendentemente leais - desde que não se sintam aprisionados ou entediados. Eles trazem aventura intelectual, espontaneidade e uma capacidade única de fazer a vida parecer uma jornada empolgante de descobertas compartilhadas.',
        strengths: [
          'Nunca são entediantes - sempre trazem ideias novas e perspectivas fascinantes',
          'Entusiasmo contagiante que torna vida cotidiana em aventura',
          'Excelentes comunicadores que adoram conversas profundas',
          'Flexíveis e dispostos a experimentar coisas novas',
          'Defendem seus parceiros ferozmente em debates ou conflitos',
        ],
        challenges: [
          'Podem debater demais, transformando conversas casuais em argumentos',
          'Tendência a negligenciar necessidades emocionais práticas do parceiro',
          'Dificuldade com rotina e compromissos de longo prazo que pareçam restritivos',
          'Podem ser insensíveis ao criticar ou "melhorar" o parceiro constantemente',
          'Necessidade de novidade pode ser mal interpretada como deslealdade',
        ],
        tips: [
          'Reconheça quando parceiro precisa de apoio emocional, não de solução ou debate',
          'Pratique seguir através em promessas e planos, não só fazer grandes gestos',
          'Balance exploração de novidades com construção de tradições compartilhadas',
          'Aprenda a "ler a sala" - nem todo momento é apropriado para debate',
          'Procure parceiros que apreciem intensidade intelectual mas tenham fundação emocional forte',
        ],
      },
      friendship: {
        overview: 'ENTPs são amigos energéticos, divertidos e leais que transformam cada interação em uma aventura intelectual ou experiência memorável. Eles atraem círculos sociais diversos através de curiosidade genuína e carisma natural.',
        ideal: 'Outros NTs (especialmente INTPs e ENTJs) que compartilham amor por debate, ou NFs (especialmente ENFPs e INFJs) que trazem profundidade emocional e aceitam sua natureza desafiadora.',
        asAFriend: 'Sempre empolgante, cheios de ideias para aventuras, excelentes em animar ânimos, desafiam amigos a crescer, defendem lealmente mas também criticam honestamente.',
      },
      compatibility: {
        highest: ['INTJ', 'INFJ', 'ENFP', 'INTP'],
        challenging: ['ISFJ', 'ISTJ', 'ESFJ', 'ESTJ'],
        explanation: 'ENTPs se conectam melhor com intuitivos (N) que apreciam exploração de ideias. Parceiros NTs oferecem estimulação intelectual, enquanto NFs trazem equilíbrio emocional e aceitação.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ENTPs envolve desenvolver sua função inferior Si e aprender a equilibrar geração de ideias com execução disciplinada...',
    content: {
      developingInferiorSi: {
        title: 'Desenvolvendo Sensação Introvertida (Si)',
        description: 'Si inferior significa que ENTPs lutam com rotina, detalhes, e aprendizado com experiências passadas. Desenvolvê-la é crucial para transformar potencial em realização.',
        practices: [
          'Estabelecer e manter pelo menos uma rotina diária não-negociável (exercício, meditação)',
          'Praticar atenção a detalhes através de hobbies que requerem precisão (culinária, artesanato)',
          'Manter um "diário de lições aprendidas" para conscientemente integrar experiências passadas',
          'Terminar completamente um projeto antes de iniciar outro - praticar conclusão',
          'Criar sistemas simples para rastrear compromissos e responsabilidades práticas',
        ],
        signs: 'Si saudável aparece como maior capacidade de seguir através, melhor gestão de detalhes práticos, e habilidade de aprender com erros passados ao invés de repeti-los.',
      },
      balancingFunctions: {
        title: 'Equilibrando Ne-Ti com Fe-Si',
        description: 'ENTPs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        neTiBalance: 'Use Ne-Ti para inovação e análise, mas estabeleça limites claros para evitar dispersão infinita de energia.',
        feSiDevelopment: 'Cultive Fe através de escuta ativa e validação emocional dos outros. Desenvolva Si através de práticas de mindfulness e apreciação do momento presente.',
      },
      commonTraps: {
        neTiLoop: {
          name: 'Loop Ne-Fe',
          description: 'Ficar preso explorando possibilidades sociais superficiais sem análise profunda, levando a caos e decisões impulsivas.',
          escape: 'Retornar ao Ti para análise crítica. Questione: "Isso realmente faz sentido ou só parece empolgante?" Use lógica para avaliar possibilidades.',
        },
        siGrip: {
          name: 'Grip de Si',
          description: 'Sob stress extremo, Si pode ficar hiperativo: fixação em detalhes irrelevantes, hipocondria, obsessão com rotinas rígidas.',
          escape: 'Reconectar com Ne explorando novas possibilidades. Expandir perspectiva através de brainstorming ou conversas estimulantes.',
        },
      },
      dailyPractices: [
        'Dedique primeiro bloco do dia para EXECUTAR (não planejar) o projeto mais importante',
        'Pratique "completar antes de criar" - finalize uma tarefa antes de iniciar nova ideia',
        'Tenha uma conversa diária onde você APENAS escuta, sem debater ou corrigir',
        'Mantenha "lista de vitórias" rastreando projetos CONCLUÍDOS (não apenas iniciados)',
        'Reserve tempo semanal para reflexão sobre lições aprendidas e padrões recorrentes',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ENTPs prosperam em ambientes dinâmicos que recompensam inovação, permitem autonomia criativa, e valorizam debate aberto sobre hierarquia rígida...',
    content: {
      asLeader: {
        style: 'Liderança Visionária e Inspiradora',
        strengths: [
          'Inspiram equipes com visões audaciosas e contagiam com seu entusiasmo',
          'Criam culturas de inovação onde ideias não convencionais são celebradas',
          'Excelentes em períodos de mudança ou crise que requerem pensamento rápido',
          'Empoderam membros de equipe a desafiar status quo e experimentar',
        ],
        challenges: [
          'Podem mudar direção com muita frequência, causando whiplash na equipe',
          'Tendência a negligenciar aspectos operacionais e de execução',
          'Impaciência com processos estabelecidos ou burocracia necessária',
          'Podem debater decisões já tomadas, criando incerteza desnecessária',
        ],
        tips: 'Arranje um COO forte para execução. Comunique visão clara mas permita que equipe refine detalhes. Pratique decisão definitiva e compromisso com curso de ação.',
      },
      asTeamMember: {
        strengths: [
          'Geradores perpétuos de ideias inovadoras',
          'Energizam equipes com entusiasmo e otimismo',
          'Excelentes em brainstorming e resolução criativa de problemas',
          'Não têm medo de desafiar pressupostos ou questionar liderança',
        ],
        challenges: [
          'Podem dominar discussões e não deixar outros falarem',
          'Dificuldade em seguir processos que parecem arbitrários',
          'Tendem a prometer demais e entregar de menos',
          'Podem ser vistos como desrespeitosos por questionar constantemente',
        ],
        tips: 'Pratique escuta ativa e dê espaço para outros contribuírem. Seja seletivo sobre quais batalhas lutar. Comprometa-se apenas com o que pode realmente entregar.',
      },
      idealEnvironment: {
        culture: 'Startup ou inovação onde debate aberto é norma, falhas são lições, e ideias audaciosas são encorajadas',
        structure: 'Autonomia máxima, estrutura mínima, foco em resultados não processos',
        challenges: 'Problemas complexos e não estruturados, oportunidades de disrupção, projetos que exigem pensamento original',
        avoid: 'Burocracia pesada, microgerenciamento, trabalho repetitivo sem variação, culturas que punem questionamento',
      },
      conflictResolution: {
        approach: 'ENTPs veem conflitos como oportunidades para debate produtivo e refinamento de ideias',
        tips: [
          'Reconheça que nem todo conflito é intelectual - alguns são emocionais e requerem empatia',
          'Evite "ganhar" argumentos às custas de relacionamentos de longo prazo',
          'Pratique validar perspectiva do outro ANTES de apresentar contra-argumentos',
          'Pergunte-se: "Qual o objetivo - estar certo ou resolver o problema?"',
        ],
      },
    },
  },
};
