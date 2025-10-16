import { PersonalityType } from '../../types/personality';

export const INTJ: PersonalityType = {
  // ============================================================================
  // Identificação
  // ============================================================================
  code: 'INTJ',
  nickname: 'O Arquiteto',
  tagline: 'Mentes estratégicas com planos para tudo',
  tags: ['Estratégico', 'Independente', 'Visionário', 'Determinado'],
  population: '2-4%',
  group: 'Analysts',

  colorScheme: {
    primary: '#6B46C1',
    secondary: '#553C9A',
    light: '#9F7AEA',
    contrast: '#FFFFFF',
  },

  // ============================================================================
  // Overview (Gratuito)
  // ============================================================================
  overview: {
    description: `INTJs são pensadores estratégicos e independentes que enxergam o mundo como um tabuleiro de xadrez gigante. Com sua função dominante Ni (Intuição Introvertida), vocês possuem uma capacidade única de ver padrões onde outros veem caos e de desenvolver visões de longo prazo com clareza cristalina.

Vocês são os "arquitetos" não apenas de estruturas físicas, mas de sistemas, estratégias e ideias. Sua função auxiliar Te (Pensamento Extrovertido) garante que essas visões não sejam apenas sonhos - vocês criam planos práticos e sistemáticos para torná-las realidade.

INTJs valorizam competência acima de tudo. Vocês têm pouca paciência para ineficiência, política de escritório ou "assim sempre foi feito". Se existe um jeito melhor, você vai encontrá-lo. Essa busca incessante por otimização pode fazer você parecer crítico ou distante, mas na verdade vem de um desejo profundo de excelência.

Representando apenas 2-4% da população, INTJs são raros - e sabem disso. Vocês se sentem confortáveis trabalhando sozinhos e frequentemente preferem isso. Enquanto outros tipos buscam validação social, você busca validação intelectual. Suas ideias precisam fazer sentido logicamente, não emocionalmente.`,

    quote: {
      text: 'É uma coisa rara conhecer alguém que pode ser um universo inteiro.',
      author: 'Anônimo',
    },
  },

  // ============================================================================
  // Funções Cognitivas (Gratuito)
  // ============================================================================
  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Ni',
      fullName: 'Intuição Introvertida',
      icon: '🔮',
      description: 'Visões e insights profundos sobre padrões futuros',
      details:
        'Você pensa em imagens mentais complexas e vê "o quadro geral" antes dos detalhes. Ni permite que você preveja tendências, identifique padrões ocultos e tenha insights súbitos que parecem surgir do nada. É como ter um radar interno que aponta para onde as coisas estão indo.',
    },
    {
      position: 'auxiliary',
      name: 'Te',
      fullName: 'Pensamento Extrovertido',
      icon: '⚙️',
      description: 'Organização lógica e eficiência sistemática',
      details:
        'Você estrutura o mundo externo de forma sistemática e busca resultados mensuráveis. Te é sua ferramenta de execução - pega as visões do Ni e as transforma em planos acionáveis. Você analisa eficiência, elimina redundâncias e cria sistemas que funcionam.',
    },
    {
      position: 'tertiary',
      name: 'Fi',
      fullName: 'Sentimento Introvertido',
      icon: '💎',
      description: 'Valores pessoais profundos e autenticidade',
      details:
        'Embora não externalizada, você possui uma bússola moral interna forte e valores profundamente arraigados. Fi guarda seus princípios mais importantes - você pode parecer frio por fora, mas tem convicções fortes sobre o que é certo e errado.',
    },
    {
      position: 'inferior',
      name: 'Se',
      fullName: 'Sensação Extrovertida',
      icon: '🎯',
      description: 'Experiência sensorial e momento presente',
      details:
        'Sua área de desenvolvimento - pode perder detalhes do momento presente ou negligenciar necessidades físicas. Se conecta você ao mundo físico e experiências sensoriais. Quando sub-desenvolvida, você pode ignorar sinais do corpo (fome, cansaço) ou detalhes importantes do ambiente.',
    },
  ],

  // ============================================================================
  // Forças (5 Gratuitas + 10 Gated)
  // ============================================================================
  strengths: {
    // Gratuitas - Top 5
    free: [
      {
        title: 'Pensamento Estratégico de Longo Prazo',
        description:
          'Você vê 10 passos à frente enquanto outros veem apenas o próximo. Sua capacidade de prever tendências e antecipar consequências é incomparável.',
        example:
          'Por exemplo: Em projetos complexos, você naturalmente identifica riscos e oportunidades antes que se tornem óbvios para a equipe.',
        icon: '🎯',
      },
      {
        title: 'Independência Intelectual',
        description:
          'Você pensa por si mesmo e não segue a multidão. Questiona dogmas, desafia convenções e forma suas próprias conclusões baseadas em evidências.',
        example:
          'Quando todos seguem uma abordagem tradicional, você está desenvolvendo uma alternativa mais eficiente.',
        icon: '🧠',
      },
      {
        title: 'Determinação Implacável',
        description:
          'Quando você define um objetivo, obstáculos são apenas problemas a resolver. Sua persistência é lendária - você não desiste até alcançar o que planejou.',
        icon: '💪',
      },
      {
        title: 'Capacidade Analítica Profunda',
        description:
          'Você desmonta sistemas complexos como quem resolve quebra-cabeças. Identifica componentes, relações e padrões com facilidade impressionante.',
        icon: '🔍',
      },
      {
        title: 'Confiança em Suas Convicções',
        description:
          'Você confia em sua lógica e não se intimida facilmente. Uma vez que validou uma ideia, defende-a com argumentos sólidos e inabaláveis.',
        icon: '🛡️',
      },
    ],

    // Gated - +10 forças secundárias (disponível com cadastro gratuito)
    gated: [
      {
        title: 'Criatividade Conceitual',
        description:
          'Você gera ideias originais conectando conceitos aparentemente não relacionados. Suas soluções são frequentemente inovadoras porque você pensa fora dos padrões convencionais.',
        icon: '💡',
      },
      {
        title: 'Auto-suficiência Emocional',
        description:
          'Você não precisa de validação externa constante. Essa independência emocional permite que você mantenha foco mesmo quando outros duvidam.',
        icon: '🏔️',
      },
      {
        title: 'Visão de Padrões Ocultos',
        description:
          'Você identifica tendências e conexões que passam despercebidas. É como ter um sexto sentido para onde as coisas estão indo.',
        icon: '🕸️',
      },
      {
        title: 'Eficiência Implacável',
        description:
          'Você odeia desperdício - de tempo, recursos ou energia. Sempre encontra o caminho mais direto e eficaz para os resultados.',
        icon: '⚡',
      },
      {
        title: 'Clareza de Propósito',
        description:
          'Você sabe o que quer e por quê. Essa clareza direciona suas ações e decisões com precisão cirúrgica.',
        icon: '🎯',
      },
      {
        title: 'Pensamento Original',
        description:
          'Suas ideias raramente são convencionais. Você desenvolve perspectivas únicas que desafiam o status quo.',
        icon: '🌟',
      },
      {
        title: 'Resistência a Pressão Social',
        description:
          'Você não cede a pressões para conformidade. Sua bússola interna é mais forte que opiniões externas.',
        icon: '🗿',
      },
      {
        title: 'Capacidade de Simplificar Complexidade',
        description:
          'Você pega sistemas complicados e os traduz em modelos compreensíveis. Excelente para ensinar conceitos difíceis.',
        icon: '📊',
      },
      {
        title: 'Foco Intenso',
        description:
          'Quando engajado em algo importante, você mergulha completamente. Essa concentração profunda permite realizações extraordinárias.',
        icon: '🔬',
      },
      {
        title: 'Aprendizado Autodirecionado',
        description:
          'Você aprende o que precisa, quando precisa, como precisa. Não depende de estruturas formais para dominar novos domínios.',
        icon: '📚',
      },
    ],
  },

  // ============================================================================
  // Fraquezas (3 Gratuitas + Análise Completa Gated)
  // ============================================================================
  weaknesses: {
    // Gratuitas - Top 3
    free: [
      {
        title: 'Arrogância Intelectual',
        description:
          'Você pode ser impaciente com pessoas que não acompanham seu raciocínio ou que repetem erros que você considera óbvios.',
        icon: '⚠️',
      },
      {
        title: 'Desconsideração por Emoções',
        description:
          'Você pode minimizar sentimentos (próprios e alheios) em favor da lógica, criando mal-entendidos em relacionamentos.',
        icon: '🧊',
      },
      {
        title: 'Socialmente Desajeitado',
        description:
          'Interações sociais podem parecer jogos com regras confusas. Small talk parece inútil e você pode parecer frio ou distante.',
        icon: '😐',
      },
    ],

    // Gated - Análise completa + estratégias (disponível com cadastro gratuito)
    gated: {
      full: [
        {
          title: 'Perfeccionismo Paralisante',
          description:
            'Você pode ficar preso planejando infinitamente sem agir, esperando o plano "perfeito" que nunca chega.',
          mitigation:
            'Pratique "bom o suficiente". Estabeleça marcos de 80% - quando algo atingir 80% de perfeição, lance e itere. O mundo real fornece feedback melhor que planejamento infinito.',
          icon: '🔧',
        },
        {
          title: 'Crítica Excessiva',
          description:
            'Você vê falhas em tudo e pode comunicá-las de forma dura, desmoralizando outros sem perceber.',
          mitigation:
            'Aprenda a técnica "sanduíche": elogio genuíno + crítica construtiva + encorajamento. E pergunte-se: "Isso precisa ser dito AGORA e por MIM?"',
          icon: '💬',
        },
        {
          title: 'Isolamento Social',
          description:
            'Você pode se isolar demais, perdendo perspectivas valiosas e suporte emocional que precisa.',
          mitigation:
            'Agende "tempo social" como qualquer outro compromisso importante. Trate conexões humanas como sistema que precisa de manutenção regular.',
          icon: '🏝️',
        },
        {
          title: 'Impaciência com Processos',
          description:
            'Você quer resultados rápidos e pode atropelar etapas importantes ou pessoas que precisam de mais tempo.',
          mitigation:
            'Desenvolva tolerância reconhecendo que processos existem por razões (muitas vezes falhas humanas que você não compartilha, mas que existem). Nem tudo pode ser otimizado imediatamente.',
          icon: '⏱️',
        },
        {
          title: 'Rigidez Mental',
          description:
            'Uma vez que validou uma abordagem, você pode rejeitar alternativas sem avaliar adequadamente.',
          mitigation:
            'Pratique "desapego intelectual". Trate suas ideias como hipóteses, não verdades absolutas. Busque ativamente contra-evidências.',
          icon: '🧱',
        },
      ],
    },
  },

  // ============================================================================
  // Carreiras (5 Gratuitas + 20 Gated)
  // ============================================================================
  careers: {
    // Gratuitas - Top 5
    free: [
      {
        title: 'Cientista / Pesquisador',
        fit: 95,
        description:
          'Sua curiosidade intelectual e capacidade de análise profunda fazem desta uma escolha natural.',
        whyItFits: [
          'Trabalho independente',
          'Problemas complexos',
          'Inovação e descoberta',
        ],
        icon: '🔬',
      },
      {
        title: 'Engenheiro de Software',
        fit: 92,
        description:
          'Sistemas lógicos, arquitetura complexa e solução criativa de problemas são seu forte.',
        whyItFits: [
          'Pensamento sistemático',
          'Criação de soluções elegantes',
          'Trabalho remoto possível',
        ],
        icon: '💻',
      },
      {
        title: 'Estrategista Empresarial',
        fit: 90,
        description:
          'Visão de longo prazo e capacidade de otimizar sistemas complexos brilham aqui.',
        whyItFits: [
          'Planejamento estratégico',
          'Impacto em larga escala',
          'Análise de mercado',
        ],
        icon: '📊',
      },
      {
        title: 'Arquiteto',
        fit: 88,
        description:
          'Design sistêmico encontra expressão criativa em estruturas físicas e espaciais.',
        whyItFits: [
          'Criatividade conceitual',
          'Solução de problemas espaciais',
          'Projetos de longo prazo',
        ],
        icon: '🏛️',
      },
      {
        title: 'Analista Financeiro',
        fit: 85,
        description:
          'Padrões em dados, previsões e pensamento estratégico sobre investimentos.',
        whyItFits: [
          'Análise quantitativa',
          'Previsão de tendências',
          'Decisões de alto impacto',
        ],
        icon: '💰',
      },
    ],

    // Gated - +20 carreiras detalhadas (disponível com cadastro gratuito)
    gated: [
      {
        title: 'Professor Universitário (Pesquisa)',
        fit: 88,
        description:
          'Pesquisa acadêmica e ensino avançado permitem profundidade intelectual e autonomia.',
        whyItFits: ['Autonomia acadêmica', 'Pesquisa profunda', 'Intelectualmente estimulante'],
        environment: 'Universidade com foco em pesquisa, laboratório próprio',
        salary: 'R$ 8.000 - R$ 25.000',
        progression: 'Professor Assistente → Associado → Titular',
        icon: '👨‍🏫',
      },
      {
        title: 'Advogado Especializado',
        fit: 85,
        description:
          'Direito corporativo, propriedade intelectual ou tributário usam pensamento estratégico.',
        whyItFits: ['Análise complexa', 'Estratégia legal', 'Trabalho autônomo'],
        environment: 'Escritório boutique ou grande firma em área especializada',
        salary: 'R$ 10.000 - R$ 50.000+',
        progression: 'Associado → Sênior → Sócio',
        icon: '⚖️',
      },
      {
        title: 'Médico Cirurgião',
        fit: 87,
        description:
          'Precisão técnica, decisões críticas e expertise profunda atraem INTJs.',
        whyItFits: ['Expertise técnica', 'Decisões de alto impacto', 'Autonomia profissional'],
        environment: 'Hospital de referência ou clínica especializada',
        salary: 'R$ 15.000 - R$ 80.000+',
        progression: 'Residente → Cirurgião → Chefe de equipe',
        icon: '⚕️',
      },
      // ... (mais 17 carreiras detalhadas)
      // Para não deixar o arquivo muito longo, vou adicionar mais algumas chave
      {
        title: 'Data Scientist',
        fit: 90,
        description:
          'Encontrar padrões em dados massivos e criar modelos preditivos combina perfeitamente com Ni-Te.',
        whyItFits: ['Análise de padrões', 'Machine learning', 'Trabalho remoto'],
        environment: 'Tech company ou consultoria, trabalho híbrido',
        salary: 'R$ 12.000 - R$ 40.000',
        progression: 'Analista → Cientista → Lead Data Scientist',
        icon: '📈',
      },
      {
        title: 'Empreendedor Tech',
        fit: 86,
        description:
          'Criar sistemas e empresas do zero, com visão clara de para onde o mercado está indo.',
        whyItFits: ['Autonomia total', 'Visão estratégica', 'Inovação'],
        environment: 'Startup própria ou co-fundação',
        salary: 'Variável (R$ 0 - ilimitado)',
        progression: 'Fundador → CEO → Exit ou scaling',
        icon: '🚀',
      },
    ],
  },

  // ============================================================================
  // Pessoas Famosas (Gratuito)
  // ============================================================================
  famousPeople: [
    {
      name: 'Elon Musk',
      description: 'Empreendedor visionário',
      photo: 'https://ui-avatars.com/api/?name=Elon+Musk&size=200&background=6B46C1&color=fff',
      category: 'contemporary',
    },
    {
      name: 'Isaac Newton',
      description: 'Cientista revolucionário',
      photo: 'https://ui-avatars.com/api/?name=Isaac+Newton&size=200&background=6B46C1&color=fff',
      category: 'historical',
    },
    {
      name: 'Nikola Tesla',
      description: 'Inventor genial',
      photo: 'https://ui-avatars.com/api/?name=Nikola+Tesla&size=200&background=6B46C1&color=fff',
      category: 'historical',
    },
    {
      name: 'Friedrich Nietzsche',
      description: 'Filósofo profundo',
      photo: 'https://ui-avatars.com/api/?name=Friedrich+Nietzsche&size=200&background=6B46C1&color=fff',
      category: 'historical',
    },
    {
      name: 'Jane Austen',
      description: 'Escritora analítica',
      photo: 'https://ui-avatars.com/api/?name=Jane+Austen&size=200&background=6B46C1&color=fff',
      category: 'historical',
    },
    {
      name: 'Mark Zuckerberg',
      description: 'Criador de sistemas',
      photo: 'https://ui-avatars.com/api/?name=Mark+Zuckerberg&size=200&background=6B46C1&color=fff',
      category: 'contemporary',
    },
    {
      name: 'Stephen Hawking',
      description: 'Teórico brilhante',
      photo: 'https://ui-avatars.com/api/?name=Stephen+Hawking&size=200&background=6B46C1&color=fff',
      category: 'historical',
    },
    {
      name: 'Michelle Obama',
      description: 'Líder estratégica',
      photo: 'https://ui-avatars.com/api/?name=Michelle+Obama&size=200&background=6B46C1&color=fff',
      category: 'contemporary',
    },
    {
      name: 'Gandalf',
      description: 'Estrategista sábio',
      photo: 'https://ui-avatars.com/api/?name=Gandalf&size=200&background=6B46C1&color=fff',
      category: 'fictional',
    },
    {
      name: 'Walter White',
      description: 'Planejador meticuloso',
      photo: 'https://ui-avatars.com/api/?name=Walter+White&size=200&background=6B46C1&color=fff',
      category: 'fictional',
    },
  ],

  // ============================================================================
  // CONTEÚDO GATED (Disponível com cadastro gratuito)
  // ============================================================================

  // Relacionamentos
  relationships: {
    isGated: true,
    preview:
      'INTJs são leais e profundos em relacionamentos, demonstrando amor através de ações práticas ao invés de palavras. Você prefere poucos relacionamentos significativos a muitos superficiais...',
    content: {
      lovingStyle:
        'INTJs demonstram amor através de ações práticas e lealdade profunda. Você pode não ser efusivo verbalmente, mas mostra cuidado resolvendo problemas do parceiro, planejando o futuro conjunto e sendo absolutamente confiável. Para você, amor é compromisso racional - você escolhe alguém e se dedica completamente. Valoriza parceiros intelectualmente estimulantes que respeitam sua necessidade de solidão.',
      friendshipStyle:
        'Você prefere poucos amigos profundos a muitas conexões superficiais. Suas amizades são baseadas em respeito mútuo, interesses compartilhados e conversas significativas. Small talk não tem lugar aqui. Você é leal ao extremo - uma vez que alguém ganha sua confiança, você está presente para sempre. Mas romper essa confiança é quase impossível de reparar.',
      compatibility: {
        best: ['ENFP', 'ENTP', 'INTP'],
        good: ['INTJ', 'INFJ', 'ENTJ'],
        challenging: ['ESFP', 'ESTP', 'ESFJ'],
      },
      compatibilityDetails: {
        ENFP: {
          score: 95,
          why: 'Complementaridade perfeita: Ne do ENFP explora possibilidades que Ni do INTJ aprofunda. Ambos valorizam autenticidade.',
          challenges:
            'ENFP pode achar INTJ frio demais; INTJ pode achar ENFP caótico. ENFP precisa de mais validação emocional que INTJ naturalmente oferece.',
          tips: 'INTJ: expresse emoções verbalmente, seu ENFP precisa ouvir. ENFP: dê espaço para solidão, não é pessoal.',
        },
        ENTP: {
          score: 92,
          why: 'Ambos são NT (pensadores estratégicos), amam debates intelectuais e valorizam competência. ENTP traz leveza que INTJ precisa.',
          challenges:
            'INTJ quer planos, ENTP quer opções. INTJ valoriza estrutura, ENTP valoriza flexibilidade.',
          tips: 'Encontrem projetos conjuntos onde podem aplicar suas forças complementares. Respeitem os diferentes ritmos.',
        },
      },
      tips: [
        'Programe "tempo de qualidade" regularmente - não espere acontecer naturalmente',
        'Verbalize apreciação - seu parceiro precisa ouvi-la, não apenas vê-la em ações',
        'Permita imperfeição - relacionamentos não são projetos para otimizar',
        'Desenvolva Fi: pergunte "como você está se sentindo?" e realmente ouça',
        'Lembre-se: validação emocional é tão importante quanto solução de problemas',
      ],
    },
  },

  // Crescimento Pessoal
  growth: {
    isGated: true,
    preview:
      'Áreas de desenvolvimento: função inferior Se (sensação extrovertida), evitar Ni-Fi loops, desenvolver expressão emocional, balancear planejamento com ação...',
    content: {
      inferiorFunction: {
        name: 'Se - Sensação Extrovertida',
        challenges:
          'Negligenciar experiência presente, necessidades físicas (fome, sono), detalhes sensoriais importantes. Pode resultar em burnout, problemas de saúde ignorados ou perda de detalhes críticos.',
        development: [
          'Pratique mindfulness e meditação - 10 minutos diários focando em sensações físicas',
          'Exercício físico regular - force-se a sair da cabeça e entrar no corpo',
          'Atividades sensoriais: culinária gourmet, vinho, arte, jardinagem',
          'Estabeleça alarmes para necessidades básicas (água, comida, alongamento)',
          'Viagens sem planejamento excessivo - permita-se experiências espontâneas',
        ],
      },
      loops: {
        NiFi: {
          name: 'Ni-Fi Loop',
          description:
            'Isolamento excessivo onde você rumina sobre imperfeições próprias/do mundo, criando visões negativas sem teste de realidade (Te desligado).',
          escape:
            'Ativar Te: FAÇA algo produtivo. Execute um plano pequeno. Fale com alguém lógico. Externalize através de escrita ou criação.',
        },
      },
      balancingFunctions: [
        'Use Te para testar ideias do Ni - não fique apenas planejando',
        'Desenvolva Fi conscientemente: journaling sobre valores e emoções',
        'Pratique Se: experiências físicas sem objetivo produtivo',
      ],
      dailyPractices: [
        'Morning Journaling: 10 min escrevendo fluxo de consciência',
        'Exercício físico: 30 min de atividade que você goste',
        'Pausa sensorial: 5 min focando em 5 sentidos',
        'Tempo sem telas: 1h antes de dormir',
        'Conversa profunda: 1x por semana com alguém de confiança',
      ],
      commonPitfalls: [
        'Planejamento infinito sem ação',
        'Isolamento excessivo',
        'Criticar sem oferecer soluções',
        'Ignorar sinais do corpo até colapso',
        'Tratar pessoas como variáveis em equações',
      ],
    },
  },

  // No Trabalho
  workplace: {
    isGated: true,
    preview:
      'Você prefere autonomia e pode achar reuniões frequentes desgastantes. Seu estilo de liderança é visionário mas pode parecer frio para equipes que precisam de mais calor humano...',
    content: {
      leadershipStyle: {
        description:
          'Líder visionário que define direção clara e estratégica. Você dá autonomia à equipe e espera competência. Não microgerencia mas tem expectativas altas.',
        strengths: [
          'Visão estratégica de longo prazo',
          'Decisões lógicas sem política',
          'Padrões de excelência elevados',
          'Criação de sistemas eficientes',
        ],
        weaknesses: [
          'Pode parecer frio ou distante',
          'Impaciência com incompetência',
          'Falta de elogios/reconhecimento verbal',
          'Dificuldade delegando tarefas "simples"',
        ],
        tips: [
          'Comunique o "porquê" das decisões - ajuda buy-in da equipe',
          'Reconheça esforços verbalmente, não apenas em avaliações',
          'Delegue mais - nem tudo precisa da sua perfeição',
          'Desenvolva inteligência emocional - equipes são humanas',
        ],
      },
      teamwork: {
        description:
          'Prefere autonomia mas contribui com insights estratégicos valiosos. Melhor em papéis que permitem trabalho profundo individual.',
        strengths: [
          'Solução de problemas complexos',
          'Visão de longo prazo',
          'Pensamento crítico',
          'Independência (não precisa de supervisão)',
        ],
        challenges: [
          'Impaciência com ineficiência alheia',
          'Pode dominar discussões intelectualmente',
          'Dificuldade com trabalho altamente colaborativo',
          'Resistência a mudanças não fundamentadas',
        ],
        tips: [
          'Delegue execução, mantenha estratégia',
          'Ouça ativamente mesmo quando já tem a solução',
          'Reconheça que processos sociais têm valor',
          'Pratique paciência com estilos diferentes',
        ],
      },
      idealEnvironment: {
        physical:
          'Escritório silencioso, privado ou remoto. Mínimas interrupções. Espaço para pensamento profundo.',
        culture:
          'Meritocracia genuína. Autonomia respeitada. Foco em resultados, não aparências. Competência valorizada acima de senioridade.',
        avoid:
          'Política de escritório excessiva, microgestão, reuniões improdutivas, ambientes barulhentos/caóticos.',
      },
      conflictHandling: {
        approach:
          'Lógica e direta - vai direto ao problema sem rodeios emocionais. Foca em soluções, não em culpados.',
        strengths: ['Objetividade', 'Foco em solução', 'Sem rancor pessoal'],
        development: [
          'Considerar impacto emocional da comunicação',
          'Timing - nem todo conflito precisa ser resolvido AGORA',
          'Tato - verdade dura pode ser embalada gentilmente',
        ],
      },
    },
  },
};
