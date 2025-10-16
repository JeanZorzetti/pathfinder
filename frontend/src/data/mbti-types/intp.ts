import { PersonalityType } from '../../types/personality';

export const INTP: PersonalityType = {
  code: 'INTP',
  nickname: 'O Lógico',
  tagline: 'Pensadores inovadores com sede insaciável de conhecimento',
  tags: ['Analítico', 'Teórico', 'Criativo', 'Independente'],
  population: '3-5% da população',
  group: 'analysts',

  colorScheme: {
    primary: '#4C51BF',
    secondary: '#5A67D8',
    light: '#C3DAFE',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `INTPs são os arquitetos de sistemas teóricos e os exploradores incansáveis do conhecimento abstrato. Movidos por uma curiosidade intelectual que nunca se satisfaz, eles dissecam ideias complexas com a precisão de um cientista e a imaginação de um filósofo. Enquanto outros veem o mundo como ele é, INTPs veem o mundo como ele poderia ser - um playground infinito de possibilidades lógicas esperando para serem descobertas e compreendidas.

Sua mente funciona como um motor de análise perpétuo, constantemente questionando pressupostos, identificando inconsistências e construindo frameworks mentais cada vez mais elegantes. Para o INTP, não existe questão trivial demais ou conceito abstrato demais; tudo é digno de investigação se puder revelar uma verdade mais profunda sobre como o universo funciona.

No entanto, essa busca implacável pela verdade objetiva vem com seus desafios. INTPs podem se perder tanto em seus mundos internos de teoria e análise que negligenciam as necessidades práticas do dia a dia. Eles frequentemente lutam para traduzir suas brilhantes ideias em ação concreta, e podem parecer distantes ou insensíveis quando, na verdade, estão apenas processando informações em um nível mais profundo.

O verdadeiro poder do INTP está em sua capacidade de ver padrões onde outros veem caos, de questionar o que todos aceitam como verdade, e de criar soluções completamente novas para problemas antigos. Eles são os inovadores silenciosos, os pensadores que moldam o futuro através da pura força do intelecto.`,

    quote: {
      text: 'Eu não tenho talentos especiais. Sou apenas apaixonadamente curioso.',
      author: 'Albert Einstein',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Ti',
      fullName: 'Pensamento Introvertido',
      icon: '🧠',
      description: 'A função dominante Ti busca compreensão profunda através da análise lógica interna. INTPs constroem frameworks mentais complexos, questionam pressupostos e buscam a verdade objetiva acima de tudo.',
      manifestation: 'Se manifesta como uma necessidade constante de entender "como" e "por que" as coisas funcionam. INTPs não aceitam informações no valor de face - eles precisam dissecá-las, analisá-las e reconstruí-las em seus próprios termos.',
    },
    {
      position: 'auxiliary',
      name: 'Ne',
      fullName: 'Intuição Extrovertida',
      icon: '✨',
      description: 'A função auxiliar Ne explora possibilidades e conexões no mundo externo. Ela alimenta o Ti com novas ideias, perspectivas alternativas e padrões emergentes para analisar.',
      manifestation: 'Aparece como curiosidade insaciável, saltos criativos entre conceitos aparentemente não relacionados, e uma mente que constantemente faz perguntas "e se?". INTPs veem potencial e possibilidades em tudo.',
    },
    {
      position: 'tertiary',
      name: 'Si',
      fullName: 'Sensação Introvertida',
      icon: '📚',
      description: 'A função terciária Si armazena experiências passadas e cria pontos de referência internos. Em INTPs, está menos desenvolvida, mas fornece uma base de conhecimento acumulado.',
      manifestation: 'Pode aparecer como apego a certos métodos comprovados ou resistência a mudanças em áreas confortáveis. INTPs podem ter rotinas peculiares que seguem rigorosamente.',
    },
    {
      position: 'inferior',
      name: 'Fe',
      fullName: 'Sentimento Extrovertido',
      icon: '❤️',
      description: 'A função inferior Fe lida com harmonia social e conexão emocional com outros. Para INTPs, esta é a função mais desafiadora e menos desenvolvida.',
      manifestation: 'INTPs frequentemente se sentem desconfortáveis com expressões emocionais, podem parecer insensíveis quando estão apenas sendo objetivos, e lutam para ler as necessidades emocionais dos outros.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Pensamento Analítico Excepcional',
        description: 'Capacidade extraordinária de dissectar problemas complexos em seus componentes fundamentais e entender sistemas em profundidade.',
        icon: '🔬',
      },
      {
        title: 'Criatividade Teórica',
        description: 'Habilidade única de conectar ideias aparentemente não relacionadas e gerar insights e soluções completamente originais.',
        icon: '💡',
      },
      {
        title: 'Objetividade Imparcial',
        description: 'Capacidade de avaliar situações e ideias sem viés emocional, buscando sempre a verdade lógica acima de preferências pessoais.',
        icon: '⚖️',
      },
      {
        title: 'Curiosidade Intelectual Insaciável',
        description: 'Desejo genuíno e perpétuo de aprender, entender e explorar novos conceitos e áreas de conhecimento.',
        icon: '🎓',
      },
      {
        title: 'Flexibilidade Mental',
        description: 'Disposição para questionar suas próprias crenças e ajustar suas teorias quando apresentados com evidências melhores.',
        icon: '🔄',
      },
    ],
    gated: [
      {
        title: 'Independência Intelectual',
        description: 'Não precisam de validação externa para suas ideias; confiam em sua própria análise lógica para determinar o que é verdadeiro.',
        icon: '🦅',
      },
      {
        title: 'Solução de Problemas Inovadora',
        description: 'Abordam desafios de ângulos completamente novos, frequentemente encontrando soluções que ninguém mais considerou.',
        icon: '🧩',
      },
      {
        title: 'Habilidade de Síntese',
        description: 'Conseguem integrar informações de múltiplas fontes e disciplinas para criar compreensões holísticas e frameworks unificadores.',
        icon: '🌐',
      },
      {
        title: 'Honestidade Intelectual',
        description: 'Admitem quando não sabem algo e estão sempre dispostos a corrigir erros em seu raciocínio.',
        icon: '🎯',
      },
      {
        title: 'Paciência com Complexidade',
        description: 'Não se intimidam com problemas extremamente complexos; na verdade, se energizam com eles.',
        icon: '🏔️',
      },
      {
        title: 'Visão de Longo Prazo',
        description: 'Conseguem ver além do óbvio e antecipar consequências e implicações de segunda e terceira ordem.',
        icon: '🔭',
      },
      {
        title: 'Adaptabilidade Conceitual',
        description: 'Rapidamente integram novas informações em seus modelos mentais e ajustam seu entendimento conforme necessário.',
        icon: '🧬',
      },
      {
        title: 'Precisão Conceitual',
        description: 'Valorizam e alcançam precisão extraordinária em suas definições e distinções conceituais.',
        icon: '🎨',
      },
      {
        title: 'Ceticismo Saudável',
        description: 'Questionam afirmações e não aceitam nada sem evidência adequada, protegendo-se contra desinformação.',
        icon: '🔍',
      },
      {
        title: 'Economia de Esforço Mental',
        description: 'Buscam sempre a explicação mais simples e elegante (Navalha de Occam), evitando complexidade desnecessária.',
        icon: '✂️',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Procrastinação Crônica',
        description: 'Tendência a atrasar tarefas práticas enquanto se perdem em explorações teóricas intermináveis.',
        impact: 'Projetos importantes podem ficar incompletos, prazos perdidos, e responsabilidades negligenciadas.',
      },
      {
        title: 'Dificuldade com Implementação',
        description: 'Excelentes em gerar ideias brilhantes, mas lutam para traduzi-las em ação concreta e resultados tangíveis.',
        impact: 'Potencial desperdiçado, frustração com falta de progresso visível, e reputação de "só falar e não fazer".',
      },
      {
        title: 'Insensibilidade Não Intencional',
        description: 'Foco em lógica e verdade pode fazer com que pareçam frios ou desconsiderados com os sentimentos dos outros.',
        impact: 'Relacionamentos tensos, mal-entendidos frequentes, e isolamento social não desejado.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Desorganização e Caos Prático',
          description: 'Ambiente físico e vida administrativa frequentemente em desordem porque detalhes práticos parecem triviais comparados a ideias.',
          impact: 'Perda de objetos importantes, esquecimento de compromissos, ambientes de trabalho caóticos.',
          mitigation: 'Implementar sistemas simples e automatizados (alarmes, checklists digitais, "lugares fixos" para itens importantes). Aceitar ajuda de outros para organização.',
        },
        {
          title: 'Paralisia por Análise',
          description: 'Podem ficar presos em ciclos infinitos de análise, sempre precisando de "mais informações" antes de agir.',
          impact: 'Oportunidades perdidas, decisões que nunca são tomadas, projetos que nunca começam.',
          mitigation: 'Estabelecer deadlines artificiais, usar regra "80/20" (agir com 80% de certeza), praticar "pensar fazendo".',
        },
        {
          title: 'Negligência de Necessidades Básicas',
          description: 'Podem esquecer de comer, dormir ou cuidar da saúde quando absortos em problemas intelectuais.',
          impact: 'Saúde deteriorada, burnout, exaustão física que prejudica capacidade cognitiva.',
          mitigation: 'Alarmes para refeições e sono, rotinas não-negociáveis de autocuidado, usar tecnologia como lembretes externos.',
        },
        {
          title: 'Dificuldade em Expressar Emoções',
          description: 'Sentem emoções profundamente mas lutam para identificá-las, processá-las e comunicá-las adequadamente.',
          impact: 'Relacionamentos superficiais, acúmulo de stress emocional, explosões inesperadas quando reprimem muito.',
          mitigation: 'Journaling para processar sentimentos, terapia para desenvolver vocabulário emocional, praticar vulnerabilidade com pessoas seguras.',
        },
        {
          title: 'Perfeccionismo Teórico',
          description: 'Nunca satisfeitos com suas teorias ou explicações, sempre vendo falhas e buscando maior elegância.',
          impact: 'Trabalho nunca finalizado, autocrítica excessiva, relutância em compartilhar ideias "imperfeitas".',
          mitigation: 'Aceitar que "melhor é inimigo do bom", publicar versões "beta" de ideias, buscar feedback iterativo.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Cientista/Pesquisador',
        description: 'Física teórica, matemática, ciência da computação, neurociência - qualquer campo que requer análise profunda e descoberta de padrões.',
        icon: '🔬',
        fit: 'Ideal para Ti-Ne: investigação independente, problemas complexos, liberdade intelectual.',
      },
      {
        title: 'Desenvolvedor de Software/Arquiteto de Sistemas',
        description: 'Projetar sistemas elegantes e resolver problemas lógicos complexos através de código.',
        icon: '💻',
        fit: 'Combina pensamento abstrato com criação de soluções práticas; feedback imediato quando código funciona.',
      },
      {
        title: 'Filósofo/Acadêmico',
        description: 'Explorar questões fundamentais sobre existência, conhecimento, ética e lógica.',
        icon: '📚',
        fit: 'Puro trabalho conceitual, liberdade para questionar tudo, comunidade de outros pensadores.',
      },
      {
        title: 'Engenheiro/Inventor',
        description: 'Criar novas tecnologias, melhorar sistemas existentes, encontrar soluções inovadoras para problemas técnicos.',
        icon: '⚙️',
        fit: 'Combina teoria com aplicação prática, permite explorar múltiplas possibilidades.',
      },
      {
        title: 'Analista de Dados/Estatístico',
        description: 'Encontrar padrões em grandes conjuntos de dados, construir modelos preditivos, extrair insights.',
        icon: '📊',
        fit: 'Trabalho analítico profundo, descoberta de verdades ocultas nos dados, uso de lógica rigorosa.',
      },
    ],
    gated: [
      {
        title: 'Escritor Técnico/de Ciência',
        description: 'Traduzir conceitos complexos em linguagem acessível, escrever documentação técnica, artigos científicos ou livros de divulgação.',
        icon: '✍️',
        fit: 'Combina amor por conceitos complexos com clareza lógica na comunicação.',
        details: 'Permite trabalho independente, exploração profunda de tópicos, e satisfação de tornar conhecimento acessível.',
      },
      {
        title: 'Professor Universitário/Pesquisador',
        description: 'Ensinar em nível avançado, conduzir pesquisas originais, publicar descobertas.',
        icon: '🎓',
        fit: 'Vida intelectual rica, autonomia, interação com estudantes motivados.',
        details: 'Ideal se conseguir equilíbrio entre ensino e pesquisa; liberdade acadêmica permite seguir curiosidade.',
      },
      {
        title: 'Arquiteto (Software ou Físico)',
        description: 'Projetar sistemas complexos - seja edifícios ou sistemas de software - que são elegantes e funcionais.',
        icon: '🏗️',
        fit: 'Requer visão sistêmica, resolução criativa de problemas, balanceamento de múltiplas restrições.',
        details: 'Satisfação de ver conceitos abstratos tornarem-se realidade física ou digital.',
      },
      {
        title: 'Consultor Estratégico',
        description: 'Analisar problemas organizacionais complexos e desenvolver soluções inovadoras.',
        icon: '💼',
        fit: 'Variedade de problemas interessantes, trabalho analítico profundo, impacto através de ideias.',
        details: 'Desafio: requer alguma habilidade interpessoal e apresentação de ideias para clientes.',
      },
      {
        title: 'Game Designer/Desenvolvedor',
        description: 'Criar sistemas de jogo complexos, balancear mecânicas, projetar experiências interativas.',
        icon: '🎮',
        fit: 'Combinação de lógica, criatividade e construção de sistemas.',
        details: 'Permite exploração de possibilidades infinitas dentro de frameworks de regras.',
      },
    ],
  },

  famousPeople: [
    { name: 'Albert Einstein', role: 'Físico Teórico', avatar: 'https://ui-avatars.com/api/?name=Albert+Einstein&background=4C51BF&color=fff' },
    { name: 'Isaac Newton', role: 'Matemático e Físico', avatar: 'https://ui-avatars.com/api/?name=Isaac+Newton&background=4C51BF&color=fff' },
    { name: 'Charles Darwin', role: 'Naturalista', avatar: 'https://ui-avatars.com/api/?name=Charles+Darwin&background=4C51BF&color=fff' },
    { name: 'Bill Gates', role: 'Empreendedor e Filantropo', avatar: 'https://ui-avatars.com/api/?name=Bill+Gates&background=4C51BF&color=fff' },
    { name: 'Tina Fey', role: 'Comediante e Roteirista', avatar: 'https://ui-avatars.com/api/?name=Tina+Fey&background=4C51BF&color=fff' },
    { name: 'Larry Page', role: 'Co-fundador do Google', avatar: 'https://ui-avatars.com/api/?name=Larry+Page&background=4C51BF&color=fff' },
    { name: 'Kristen Stewart', role: 'Atriz', avatar: 'https://ui-avatars.com/api/?name=Kristen+Stewart&background=4C51BF&color=fff' },
    { name: 'Immanuel Kant', role: 'Filósofo', avatar: 'https://ui-avatars.com/api/?name=Immanuel+Kant&background=4C51BF&color=fff' },
    { name: 'René Descartes', role: 'Filósofo e Matemático', avatar: 'https://ui-avatars.com/api/?name=Rene+Descartes&background=4C51BF&color=fff' },
    { name: 'Marie Curie', role: 'Física e Química', avatar: 'https://ui-avatars.com/api/?name=Marie+Curie&background=4C51BF&color=fff' },
  ],

  relationships: {
    isGated: true,
    preview: 'INTPs trazem profundidade intelectual e lealdade silenciosa aos relacionamentos, mas precisam de parceiros que entendam sua necessidade de autonomia e espaço mental...',
    content: {
      romantic: {
        overview: 'INTPs em relacionamentos românticos são parceiros leais, honestos e profundamente dedicados - uma vez que decidem se comprometer. No entanto, chegar a esse ponto pode ser um desafio, pois INTPs tendem a sobre-analisar relacionamentos e podem ter dificuldade em expressar emoções.',
        strengths: [
          'Lealdade profunda e comprometimento de longo prazo',
          'Honestidade e autenticidade (não jogam jogos emocionais)',
          'Respeito genuíno pela independência do parceiro',
          'Conversas fascinantes sobre ideias e conceitos',
          'Disposição para crescer e melhorar baseado em feedback lógico',
        ],
        challenges: [
          'Dificuldade em expressar afeto de maneiras convencionais',
          'Podem parecer distantes ou desinteressados quando estão apenas pensando',
          'Negligenciar aspectos práticos do relacionamento',
          'Precisam de muito tempo sozinho, o que pode ser mal interpretado',
          'Podem criticar parceiros de forma muito direta',
        ],
        tips: [
          'Comunique sua necessidade de espaço claramente - não é sobre o parceiro',
          'Estabeleça "rituais de conexão" regulares mesmo que não sejam naturais',
          'Pratique expressar apreciação verbalmente, não apenas demonstrar através de ações',
          'Lembre-se de participar nas tarefas práticas do relacionamento',
          'Procure parceiros que valorizem profundidade intelectual e autonomia mútua',
        ],
      },
      friendship: {
        overview: 'INTPs formam amizades profundas baseadas em conexão intelectual e respeito mútuo. Eles preferem poucos amigos próximos a muitos conhecidos superficiais.',
        ideal: 'Outros NTs (especialmente ENTPs e INTJs) que compartilham amor por ideias abstratas e debates, ou NFs que trazem perspectiva emocional complementar.',
        asAFriend: 'Leal, confiável, oferece perspectivas únicas, excelente ouvinte (para problemas lógicos), respeitam espaço e autonomia dos amigos.',
      },
      compatibility: {
        highest: ['ENTJ', 'ENTP', 'INFJ', 'INTJ'],
        challenging: ['ESFJ', 'ESTJ', 'ISFJ', 'ESFP'],
        explanation: 'INTPs se conectam melhor com intuiti vos (N) que compartilham interesse em ideias abstratas. Pares NT oferecem estimulação intelectual, enquanto pares NF trazem equilíbrio emocional.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para INTPs envolve desenvolver sua função inferior Fe e aprender a equilibrar exploração intelectual com ação prática...',
    content: {
      developingInferiorFe: {
        title: 'Desenvolvendo Sentimento Extrovertido (Fe)',
        description: 'Fe inferior significa que INTPs lutam com consciência emocional social e expressão de sentimentos. Desenvolvê-la é crucial para relacionamentos saudáveis.',
        practices: [
          'Praticar identificação de emoções próprias usando "check-ins" regulares',
          'Observar ativamente as emoções dos outros e tentar nomeá-las',
          'Participar de atividades em grupo regularmente, mesmo que desconfortável',
          'Expressar gratidão e apreciação verbalmente, não apenas internamente',
          'Pedir feedback sobre como suas palavras/ações afetam outros emocionalmente',
        ],
        signs: 'Fe saudável aparece como maior facilidade em navegar situações sociais, relacionamentos mais profundos, e capacidade de expressar cuidado genuíno de maneiras que outros reconhecem.',
      },
      balancingFunctions: {
        title: 'Equilibrando Ti-Ne com Si-Fe',
        description: 'INTPs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        tiNeBalance: 'Use Ti-Ne para análise e geração de ideias, mas estabeleça limites de tempo para evitar paralisia por análise.',
        siFeDevelopment: 'Cultive Si através de rotinas consistentes e aprecie experiências sensoriais. Desenvolva Fe através de serviço aos outros e participação em comunidades.',
      },
      commonTraps: {
        tiNiLoop: {
          name: 'Loop Ti-Si',
          description: 'Ficar preso em análise interna sem input externo novo, levando a cinismo e isolamento.',
          escape: 'Forçar-se a explorar novas experiências (Ne), conversar com pessoas diferentes, sair da zona de conforto intelectual.',
        },
        neGrip: {
          name: 'Grip de Ne',
          description: 'Sob stress extremo, Ne pode ficar hiperativo: vendo possibilidades catastróficas por toda parte, paranoia sobre futuros terríveis.',
          escape: 'Retornar ao presente, engajar Si através de atividades sensoriais, usar Ti para avaliar racionalmente probabilidades reais.',
        },
      },
      dailyPractices: [
        'Dedique 30 minutos para ação concreta em projetos (não apenas planejamento)',
        'Pratique "mindfulness" ou meditação para desenvolver consciência do presente',
        'Tenha conversas reais com pessoas reais sobre suas ideias',
        'Mantenha um "diário de implementação" rastreando progresso tangível',
        'Estabeleça uma rotina de autocuidado não-negociável (sono, exercício, alimentação)',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'INTPs prosperam em ambientes que valorizam inovação, permitem autonomia, e recompensam competência técnica ao invés de política...',
    content: {
      asLeader: {
        style: 'Liderança por Competência',
        strengths: [
          'Líderes justos que avaliam ideias pelo mérito, não pela fonte',
          'Dão autonomia completa a membros da equipe competentes',
          'Excelentes em resolver problemas complexos que bloqueiam a equipe',
          'Criam ambientes onde questionar e debater é encorajado',
        ],
        challenges: [
          'Podem ser vistos como distantes ou frios',
          'Dificuldade em fornecer feedback emocional ou motivacional',
          'Impaciência com tarefas administrativas e políticas organizacionais',
          'Precisam desenvolver habilidades de comunicação mais direta e clara',
        ],
        tips: 'Delegue tarefas administrativas, foque em direção técnica. Comunique visão e raciocínio claramente. Reconheça que nem todos processam informações analiticamente.',
      },
      asTeamMember: {
        strengths: [
          'Resolvedores de problemas excepcionais',
          'Trazem perspectivas completamente novas',
          'Questionam pressupostos que todos aceitam',
          'Trabalham independentemente com mínima supervisão',
        ],
        challenges: [
          'Podem parecer não colaborativos (preferem trabalhar sozinhos)',
          'Dificuldade em seguir processos que parecem ilógicos',
          'Podem criticar ideias de forma muito direta',
          'Procrastinação em tarefas "chatas" mas necessárias',
        ],
        tips: 'Seja explícito sobre suas necessidades de autonomia. Ofereça críticas construtivamente. Force-se a participar em rituais de equipe ocasionalmente.',
      },
      idealEnvironment: {
        culture: 'Meritocracia intelectual onde ideias são julgadas pela lógica, não pela hierarquia',
        structure: 'Máxima autonomia, mínima burocracia, horários flexíveis',
        challenges: 'Problemas complexos e não estruturados que requerem soluções inovadoras',
        avoid: 'Microgerenciamento, políticas de escritório, tarefas repetitivas sem propósito claro',
      },
      conflictResolution: {
        approach: 'INTPs abordam conflitos analiticamente, buscando a solução "mais lógica"',
        tips: [
          'Lembre-se que conflitos frequentemente têm componente emocional, não apenas lógico',
          'Evite corrigir detalhes irrelevantes durante discussões tensas',
          'Reconheça sentimentos dos outros antes de oferecer soluções',
          'Não assuma má intenção - muitos conflitos são por mal-entendidos',
        ],
      },
    },
  },
};
