import { PersonalityType } from '../../types/personality';

export const ENTJ: PersonalityType = {
  code: 'ENTJ',
  nickname: 'O Comandante',
  tagline: 'Líderes ousados e determinados que sempre encontram ou criam soluções',
  tags: ['Decisivo', 'Estratégico', 'Líder', 'Eficiente'],
  population: '2-5% da população',
  group: 'analysts',

  colorScheme: {
    primary: '#DC2626',
    secondary: '#B91C1C',
    light: '#FEE2E2',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ENTJs são os comandantes natos do mundo, arquitetos de sistemas organizacionais e visionários implacáveis na busca de seus objetivos. Onde outros veem obstáculos, ENTJs veem desafios a serem conquistados. Onde outros hesitam, ENTJs decidem e agem. Eles não esperam que oportunidades apareçam - eles as criam através da pura força de vontade, planejamento estratégico e execução impecável.

Sua mente funciona como uma máquina de eficiência perpétua, constantemente otimizando processos, identificando ineficiências e construindo sistemas que transformam visão em realidade. Para o ENTJ, o mundo é um tabuleiro de xadrez onde cada movimento deve ser calculado, cada recurso alocado estrategicamente, e cada objetivo alcançado com máxima eficiência.

No entanto, essa ambição implacável e foco em resultados vem com seus desafios. ENTJs podem ser percebidos como dominadores, insensíveis ou excessivamente focados em trabalho. Sua baixa tolerância para incompetência e ineficiência pode criar tensões, e podem atropelar os sentimentos alheios em sua marcha em direção aos objetivos.

O verdadeiro poder do ENTJ está em sua capacidade de transformar visões ambiciosas em realidade tangível, de inspirar e mobilizar pessoas em torno de objetivos comuns, e de tomar decisões difíceis que outros evitam. Eles são os construtores de impérios, os reformadores de sistemas, e os líderes que não apenas preveem o futuro - mas o constroem com suas próprias mãos.`,

    quote: {
      text: 'A melhor maneira de prever o futuro é criá-lo.',
      author: 'Peter Drucker',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Te',
      fullName: 'Pensamento Extrovertido',
      icon: '⚡',
      description: 'A função dominante Te organiza o mundo externo através de lógica objetiva e eficiência. ENTJs estruturam sistemas, tomam decisões baseadas em dados, e impõem ordem no caos ao seu redor.',
      manifestation: 'Se manifesta como uma necessidade irresistível de organizar, otimizar e melhorar tudo que tocam. ENTJs não conseguem ver ineficiência sem querer corrigi-la imediatamente. Eles naturalente assumem controle de situações e direcionam pessoas e recursos para objetivos claros.',
    },
    {
      position: 'auxiliary',
      name: 'Ni',
      fullName: 'Intuição Introvertida',
      icon: '🎯',
      description: 'A função auxiliar Ni fornece visão estratégica de longo prazo e percepção de padrões subjacentes. Ela alimenta o Te com insights sobre onde focar esforços e como os eventos futuros provavelmente se desenvolverão.',
      manifestation: 'Aparece como capacidade notável de ver o "quadro geral", antecipar tendências futuras, e identificar a essência de situações complexas. ENTJs têm "pressentimentos" estratégicos surpreendentemente precisos sobre direções a seguir.',
    },
    {
      position: 'tertiary',
      name: 'Se',
      fullName: 'Sensação Extrovertida',
      icon: '🔥',
      description: 'A função terciária Se traz consciência do ambiente imediato e capacidade de agir decisivamente no momento presente. Em ENTJs saudáveis, adiciona adaptabilidade tática à estratégia de longo prazo.',
      manifestation: 'Pode aparecer como presença física marcante, apreço por experiências de alta qualidade, e capacidade de ler a "sala" rapidamente. ENTJs podem aproveitar oportunidades imediatas quando surgem.',
    },
    {
      position: 'inferior',
      name: 'Fi',
      fullName: 'Sentimento Introvertido',
      icon: '💔',
      description: 'A função inferior Fi lida com valores pessoais profundos e autenticidade emocional interna. Para ENTJs, esta é a função mais desafiadora e menos desenvolvida.',
      manifestation: 'ENTJs frequentemente desconsideram ou suprimem suas próprias necessidades emocionais, podem parecer insensíveis aos valores pessoais dos outros, e lutam para processar sentimentos complexos. Sob stress extremo, podem ter explosões emocionais intensas.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Liderança Natural e Carismática',
        description: 'Capacidade inata de inspirar confiança, assumir comando de situações e mobilizar pessoas em torno de objetivos comuns.',
        icon: '👑',
      },
      {
        title: 'Pensamento Estratégico de Longo Prazo',
        description: 'Habilidade excepcional de desenvolver visões de futuro claras e criar planos detalhados para alcançá-las.',
        icon: '♟️',
      },
      {
        title: 'Decisividade e Coragem',
        description: 'Capacidade de tomar decisões difíceis rapidamente, mesmo com informações incompletas, e assumir responsabilidade pelos resultados.',
        icon: '⚔️',
      },
      {
        title: 'Eficiência Implacável',
        description: 'Talento natural para identificar desperdícios, otimizar processos e maximizar produtividade em qualquer sistema.',
        icon: '📈',
      },
      {
        title: 'Confiança e Assertividade',
        description: 'Autoconfiança inabalável em suas capacidades e disposição para defender suas posições com vigor.',
        icon: '💪',
      },
    ],
    gated: [
      {
        title: 'Visão Sistêmica',
        description: 'Conseguem ver como partes individuais se encaixam em sistemas maiores e identificar pontos de alavancagem para mudança.',
        icon: '🌐',
      },
      {
        title: 'Execução Impecável',
        description: 'Não apenas planejam bem, mas também implementam com disciplina, transformando estratégias em resultados tangíveis.',
        icon: '🎯',
      },
      {
        title: 'Capacidade de Delegação Estratégica',
        description: 'Identificam pontos fortes das pessoas e alocam responsabilidades de forma que maximize output coletivo.',
        icon: '🤝',
      },
      {
        title: 'Resiliência e Determinação',
        description: 'Obstáculos os energizam ao invés de desanimá-los; veem fracassos como dados para otimização futura.',
        icon: '🛡️',
      },
      {
        title: 'Pensamento Crítico Afiado',
        description: 'Identificam rapidamente falhas lógicas, inconsistências em argumentos e fraquezas em planos.',
        icon: '🔍',
      },
      {
        title: 'Orientação para Objetivos',
        description: 'Mantêm foco laser em resultados finais, não se distraindo com detalhes irrelevantes ou obstáculos menores.',
        icon: '🎪',
      },
      {
        title: 'Habilidade de Reestruturação',
        description: 'Excelentes em identificar quando sistemas inteiros precisam ser redesenhados e ter coragem de fazer mudanças radicais.',
        icon: '🔧',
      },
      {
        title: 'Networking Estratégico',
        description: 'Constroem redes de contatos não por socialização, mas por entender o valor de relacionamentos estratégicos.',
        icon: '🌟',
      },
      {
        title: 'Aprendizado Rápido',
        description: 'Adquirem novas habilidades rapidamente quando veem relevância direta para seus objetivos.',
        icon: '📚',
      },
      {
        title: 'Negociação e Persuasão',
        description: 'Combinam lógica, presença e compreensão estratégica para alcançar acordos favoráveis.',
        icon: '💼',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Dominância e Controle Excessivo',
        description: 'Tendência a assumir comando mesmo quando não solicitado e dificuldade em ceder controle ou aceitar liderança de outros.',
        impact: 'Conflitos com colegas, ressentimento de subordinados, dificuldade em trabalhar sob supervisão de outros.',
      },
      {
        title: 'Impaciência com Incompetência',
        description: 'Baixíssima tolerância para ineficiência, erros repetidos ou pessoas que não atendem seus altos padrões.',
        impact: 'Podem ser vistos como arrogantes ou intimidadores, criar ambientes de trabalho tensos, alienar potenciais aliados.',
      },
      {
        title: 'Insensibilidade Emocional',
        description: 'Foco extremo em lógica e resultados pode fazer com que ignorem ou minimizem preocupações emocionais legítimas.',
        impact: 'Relacionamentos pessoais danificados, equipes desmotivadas, reputação de "frio" ou "sem coração".',
      },
    ],
    gated: {
      full: [
        {
          title: 'Workaholismo e Desequilíbrio Vida-Trabalho',
          description: 'Obsessão com conquistas e metas pode consumir toda energia e tempo, negligenciando saúde, relacionamentos e bem-estar.',
          impact: 'Burnout, problemas de saúde, relacionamentos destruídos, perda de perspectiva sobre o que realmente importa.',
          mitigation: 'Agendar tempo para relacionamentos e autocuidado como "compromissos não-negociáveis". Reconhecer que sustentabilidade de longo prazo requer equilíbrio. Desenvolver hobbies não relacionados a trabalho.',
        },
        {
          title: 'Teimosia e Dificuldade em Admitir Erros',
          description: 'Confiança pode se tornar arrogância; resistência em aceitar que estão errados ou que sua estratégia falhou.',
          impact: 'Persistência em estratégias falhas, perda de credibilidade, dificuldade em aprender com erros.',
          mitigation: 'Cultivar humildade intelectual. Criar sistemas de feedback anônimo. Lembrar que mudar de opinião com base em evidências é sinal de força, não fraqueza.',
        },
        {
          title: 'Negligência de Necessidades Emocionais Próprias',
          description: 'Suprimem ou ignoram suas próprias emoções, focando apenas em objetivos externos, até que explodem.',
          impact: 'Explosões emocionais inesperadas, decisões impulsivas em momentos de stress, deterioração de saúde mental.',
          mitigation: 'Desenvolver prática de check-ins emocionais regulares. Terapia ou coaching. Reconhecer emoções como dados válidos, não fraqueza.',
        },
        {
          title: 'Tendência a Atropelar Outros',
          description: 'Na pressa de executar sua visão, podem ignorar input valioso de outros ou não dar tempo para que equipe processe mudanças.',
          impact: 'Resistência de equipe, perda de insights valiosos, implementações falhas por falta de buy-in.',
          mitigation: 'Forçar-se a solicitar e realmente ouvir feedback. Dar tempo para que outros processem ideias. Reconhecer que velocidade sem alinhamento gera retrabalho.',
        },
        {
          title: 'Julgamento Severo de Si e Outros',
          description: 'Padrões extremamente altos podem tornar-se perfeccionismo paralisante ou crítica destrutiva de equipe.',
          impact: 'Autocrítica prejudicial, equipes com medo de errar, perda de talentos que se sentem constantemente inadequados.',
          mitigation: 'Distinguir entre excelência e perfeição. Celebrar progresso, não apenas resultados finais. Praticar feedback positivo conscientemente.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'CEO/Executivo Sênior',
        description: 'Liderar organizações, definir estratégia de alto nível, tomar decisões que impactam milhares de pessoas e grandes recursos.',
        icon: '🏢',
        fit: 'Ideal para Te-Ni: combina visão estratégica com poder de execução em escala massiva.',
      },
      {
        title: 'Empreendedor/Fundador de Startup',
        description: 'Construir empresas do zero, transformar visões em negócios lucrativos, escalar operações rapidamente.',
        icon: '🚀',
        fit: 'Total autonomia, capacidade de moldar cultura e sistemas, recompensa direta por eficiência e visão.',
      },
      {
        title: 'Consultor de Gestão',
        description: 'Analisar organizações, identificar ineficiências, redesenhar processos e estratégias para melhor desempenho.',
        icon: '💼',
        fit: 'Variedade de desafios complexos, impacto através de reestruturação, trabalho com liderança sênior.',
      },
      {
        title: 'Advogado (especialmente Corporativo ou Litigioso)',
        description: 'Argumentação estratégica, negociação de alto risco, proteção de interesses de clientes através de lógica e lei.',
        icon: '⚖️',
        fit: 'Combina pensamento estratégico com assertividade e persuasão; resultados claros (ganhar/perder).',
      },
      {
        title: 'Oficial Militar de Alto Escalão',
        description: 'Comando de tropas, planejamento estratégico de operações, tomada de decisões sob pressão.',
        icon: '🎖️',
        fit: 'Hierarquia clara, liderança direta, importância de eficiência e estratégia, consequências reais.',
      },
    ],
    gated: [
      {
        title: 'Banqueiro de Investimento/Investidor de Venture Capital',
        description: 'Analisar oportunidades de investimento, estruturar deals complexos, alocar capital estrategicamente.',
        icon: '💰',
        fit: 'Combina análise estratégica com resultados financeiros quantificáveis.',
        details: 'Alta pressão, ritmo rápido, recompensa financeira significativa por decisões corretas. Requer networking estratégico.',
      },
      {
        title: 'Diretor de Operações (COO)',
        description: 'Otimizar processos operacionais, implementar sistemas eficientes, transformar estratégia em execução diária.',
        icon: '⚙️',
        fit: 'Foco total em eficiência e resultados mensuráveis, poder de reestruturar sistemas.',
        details: 'Posição ideal para ENTJs que amam tanto estratégia quanto implementação prática.',
      },
      {
        title: 'Juiz',
        description: 'Aplicar lei objetivamente, tomar decisões que afetam vidas, manter ordem e justiça em sistema legal.',
        icon: '👨‍⚖️',
        fit: 'Autoridade clara, decisões baseadas em lógica e precedente, impacto significativo.',
        details: 'Requer desenvolvimento de Fi para equilibrar lei com compaixão apropriada.',
      },
      {
        title: 'Gestor de Projetos Sênior/Diretor de Programa',
        description: 'Coordenar projetos complexos com múltiplos stakeholders, garantir entrega no prazo e orçamento.',
        icon: '📊',
        fit: 'Combina planejamento estratégico, coordenação de pessoas e foco em resultados.',
        details: 'Satisfação de ver planos se tornarem realidade através de gestão eficaz.',
      },
      {
        title: 'Cientista Político/Estrategista de Campanha',
        description: 'Desenvolver estratégias políticas, analisar dinâmicas de poder, influenciar políticas públicas.',
        icon: '🗳️',
        fit: 'Pensamento estratégico aplicado a sistemas sociais complexos.',
        details: 'Para ENTJs interessados em moldar sociedade através de política ao invés de negócios.',
      },
    ],
  },

  famousPeople: [
    { name: 'Steve Jobs', role: 'Co-fundador da Apple', avatar: 'https://ui-avatars.com/api/?name=Steve+Jobs&background=DC2626&color=fff' },
    { name: 'Napoleon Bonaparte', role: 'Líder Militar e Imperador', avatar: 'https://ui-avatars.com/api/?name=Napoleon+Bonaparte&background=DC2626&color=fff' },
    { name: 'Margaret Thatcher', role: 'Primeira-Ministra do Reino Unido', avatar: 'https://ui-avatars.com/api/?name=Margaret+Thatcher&background=DC2626&color=fff' },
    { name: 'Franklin D. Roosevelt', role: 'Presidente dos EUA', avatar: 'https://ui-avatars.com/api/?name=Franklin+Roosevelt&background=DC2626&color=fff' },
    { name: 'Gordon Ramsay', role: 'Chef e Empresário', avatar: 'https://ui-avatars.com/api/?name=Gordon+Ramsay&background=DC2626&color=fff' },
    { name: 'Whoopi Goldberg', role: 'Atriz e Apresentadora', avatar: 'https://ui-avatars.com/api/?name=Whoopi+Goldberg&background=DC2626&color=fff' },
    { name: 'Harrison Ford', role: 'Ator', avatar: 'https://ui-avatars.com/api/?name=Harrison+Ford&background=DC2626&color=fff' },
    { name: 'Mindy Kaling', role: 'Atriz e Produtora', avatar: 'https://ui-avatars.com/api/?name=Mindy+Kaling&background=DC2626&color=fff' },
    { name: 'Malcolm X', role: 'Ativista de Direitos Civis', avatar: 'https://ui-avatars.com/api/?name=Malcolm+X&background=DC2626&color=fff' },
    { name: 'Bill Gates', role: 'Co-fundador da Microsoft', avatar: 'https://ui-avatars.com/api/?name=Bill+Gates&background=DC2626&color=fff' },
  ],

  relationships: {
    isGated: true,
    preview: 'ENTJs trazem lealdade inabalável, ambição compartilhada e proteção feroz aos relacionamentos, mas precisam aprender a equilibrar conquistas com conexão emocional...',
    content: {
      romantic: {
        overview: 'ENTJs em relacionamentos românticos são parceiros profundamente leais e protetores que tratam o relacionamento como um projeto importante a ser cultivado e desenvolvido. Eles trazem a mesma intensidade e comprometimento que aplicam em suas carreiras, mas precisam ter cuidado para não "gerenciar" seus parceiros ou negligenciar necessidades emocionais.',
        strengths: [
          'Lealdade inabalável e comprometimento de longo prazo uma vez decididos',
          'Provedores dedicados que trabalham incansavelmente para dar segurança',
          'Honestos e diretos - dizem o que pensam e esperam o mesmo',
          'Parceiros que incentivam e apoiam crescimento e ambições mútuas',
          'Capazes de tomar decisões difíceis pelo bem do relacionamento',
        ],
        challenges: [
          'Podem tentar "consertar" ou "melhorar" parceiros ao invés de aceitar',
          'Dificuldade em expressar vulnerabilidade ou pedir ajuda emocional',
          'Trabalho pode consumir tempo e energia que deveriam ir para relacionamento',
          'Podem ser excessivamente críticos ou ter expectativas irrealistas',
          'Lutar para desacelerar e estar presente no momento',
        ],
        tips: [
          'Agende "tempo de qualidade" como compromisso não-negociável na agenda',
          'Pratique ouvir ativamente sem tentar resolver problemas imediatamente',
          'Desenvolva Fi: reconheça e valide sentimentos do parceiro, mesmo que não sejam "lógicos"',
          'Permita-se ser vulnerável - força também é admitir quando precisa de apoio',
          'Procure parceiros que compartilhem ambições mas também valorizem conexão emocional',
        ],
      },
      friendship: {
        overview: 'ENTJs são amigos leais e protetores que investem profundamente em poucos relacionamentos próximos. Eles valorizam amigos que os desafiam intelectualmente, compartilham ambições e não se intimidam com sua intensidade.',
        ideal: 'Outros NTs (especialmente INTJs e ENTPs) que apreciam debates estratégicos, ou NFs desenvolvidos (especialmente ENFJs e INFJs) que oferecem perspectiva emocional complementar.',
        asAFriend: 'Incrivelmente leal, oferece conselhos práticos e diretos, mobiliza recursos para ajudar amigos em necessidade, desafia amigos a crescer, organiza e lidera atividades de grupo.',
      },
      compatibility: {
        highest: ['INTJ', 'INTP', 'ENFP', 'INFJ'],
        challenging: ['ISFP', 'ESFP', 'ISFJ', 'ESFJ'],
        explanation: 'ENTJs se conectam melhor com intuitivos (N) que compartilham interesse em ideias abstratas e crescimento. INTJs oferecem parceria estratégica igualitária, INTPs trazem análise profunda, enquanto ENFPs e INFJs fornecem equilíbrio emocional necessário.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ENTJs envolve desenvolver sua função inferior Fi e aprender a equilibrar conquistas externas com autenticidade interna...',
    content: {
      developingInferiorFi: {
        title: 'Desenvolvendo Sentimento Introvertido (Fi)',
        description: 'Fi inferior significa que ENTJs lutam com consciência de valores pessoais profundos e processamento de emoções complexas. Desenvolvê-la é crucial para bem-estar emocional e relacionamentos autênticos.',
        practices: [
          'Criar prática diária de "check-in emocional": perguntar-se "como estou me sentindo realmente?"',
          'Journaling sobre valores pessoais: o que importa para você além de conquistas?',
          'Praticar vulnerabilidade com pessoas seguras - compartilhar medos e inseguranças',
          'Pausar antes de criticar: pergunte-se "isso serve meus valores ou apenas meu ego?"',
          'Desenvolver empatia ouvindo histórias pessoais sem tentar resolver ou julgar',
        ],
        signs: 'Fi saudável aparece como maior autenticidade emocional, capacidade de reconhecer quando está quebrando próprios valores, relacionamentos mais profundos, e menos explosões emocionais sob stress.',
      },
      balancingFunctions: {
        title: 'Equilibrando Te-Ni com Se-Fi',
        description: 'ENTJs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        teNiBalance: 'Use Te-Ni para estratégia e liderança, mas estabeleça limites claros para evitar workaholismo. Lembre-se: eficiência sem direção baseada em valores é vazia.',
        seFiDevelopment: 'Cultive Se através de experiências sensoriais presentes (esportes, arte, natureza). Desenvolva Fi através de auto-reflexão profunda e respeito por valores pessoais - seus e dos outros.',
      },
      commonTraps: {
        teSeLoop: {
          name: 'Loop Te-Se',
          description: 'Focar obsessivamente em conquistas externas e gratificação imediata, ignorando visão de longo prazo e valores internos.',
          escape: 'Reconectar com Ni: revisar visão de longo prazo e se seus esforços atuais realmente servem esse futuro. Desenvolver Fi: questionar se conquistas alinham com valores verdadeiros.',
        },
        fiGrip: {
          name: 'Grip de Fi',
          description: 'Sob stress extremo, Fi inferior pode dominar: sensibilidade extrema a críticas, paranoia sobre lealdade de outros, explosões emocionais intensas.',
          escape: 'Retornar a Te: focar em dados objetivos e fatos, não interpretações emocionais. Usar Se: engajar em atividade física intensa para processar emoções.',
        },
      },
      dailyPractices: [
        'Reserve 15 minutos para reflexão sem agenda - não planejamento, apenas presença',
        'Pratique um ato de paciência diária - deixar alguém terminar sem interromper',
        'Faça check-in com pessoa próxima sobre como está realmente, não apenas o que está fazendo',
        'Identifique uma decisão baseada em valores, não apenas eficiência',
        'Celebre progresso de outros sem compará-lo a padrões próprios',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ENTJs prosperam em ambientes que recompensam competência, permitem liderança e impacto, e oferecem problemas complexos que requerem visão estratégica...',
    content: {
      asLeader: {
        style: 'Liderança Visionária e Diretiva',
        strengths: [
          'Estabelecem visão clara e inspiram equipe a alcançá-la',
          'Tomam decisões difíceis rapidamente e assumem responsabilidade',
          'Identificam e desenvolvem talentos, colocando pessoas certas em posições certas',
          'Criam sistemas e processos que permitem escala e eficiência',
          'Protegem e defendem suas equipes contra interferência externa',
        ],
        challenges: [
          'Podem ser excessivamente críticos ou ter padrões impossíveis',
          'Dificuldade em delegar verdadeiramente - tendência a microgerenciar',
          'Impaciência com processo democrático ou necessidade de consenso',
          'Podem intimidar membros de equipe menos assertivos',
          'Risco de burnout pessoal e de equipe por ritmo implacável',
        ],
        tips: 'Desenvolva Fi para liderar com empatia além de eficiência. Reconheça publicamente contribuições. Solicite ativamente feedback (e realmente ouça). Entenda que motivações das pessoas variam - nem todos são movidos por conquistas.',
      },
      asTeamMember: {
        strengths: [
          'Naturalmente assumem liderança em projetos sem líder claro',
          'Trazem clareza estratégica e foco em resultados',
          'Identificam e resolvem blockers rapidamente',
          'Elevam padrões de toda equipe através do exemplo',
        ],
        challenges: [
          'Dificuldade em seguir líderes que consideram incompetentes',
          'Podem dominar conversas e decisões de equipe',
          'Impaciência com processo colaborativo lento',
          'Conflitos com outros tipos dominantes ou com autoridade estabelecida',
        ],
        tips: 'Pratique ser contribuidor sem ser comandante. Reconheça expertise de outros mesmo em áreas que você poderia aprender. Ofereça sugestões, não ordens. Respeite processos estabelecidos ou proponha mudanças através de canais apropriados.',
      },
      idealEnvironment: {
        culture: 'Meritocracia que recompensa resultados, liderança forte, foco em impacto e crescimento',
        structure: 'Hierarquia clara com possibilidade de avanço rápido baseado em desempenho',
        challenges: 'Problemas complexos que requerem liderança estratégica e reestruturação',
        avoid: 'Ambientes burocráticos excessivos, organizações sem visão clara, culturas que evitam conflito ao invés de resolvê-lo',
      },
      conflictResolution: {
        approach: 'ENTJs abordam conflitos diretamente e esperam resolução rápida baseada em lógica',
        tips: [
          'Nem todo conflito precisa ser "vencido" - às vezes compreensão mútua é suficiente',
          'Reconheça que crítica direta pode ser percebida como ataque pessoal',
          'Dê às pessoas tempo para processar feedback antes de esperar mudança',
          'Foque em comportamentos específicos, não em julgamentos de caráter',
          'Lembre-se de destacar o que está funcionando bem, não apenas problemas',
        ],
      },
    },
  },
};
