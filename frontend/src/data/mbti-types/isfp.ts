import { PersonalityType } from '../../types/personality';

export const ISFP: PersonalityType = {
  code: 'ISFP',
  nickname: 'O Aventureiro',
  tagline: 'Artistas flexíveis e charmosos, sempre prontos para explorar algo novo',
  tags: ['Artístico', 'Sensível', 'Espontâneo', 'Adaptável'],
  population: '5-9% da população',
  group: 'explorers',

  colorScheme: {
    primary: '#7C3AED',
    secondary: '#6D28D9',
    light: '#EDE9FE',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ISFPs são os artistas da vida, vivendo cada momento com intensidade sensorial e autenticidade emocional. Eles experimentam o mundo através de cores mais vivas, sons mais ricos e emoções mais profundas do que a maioria das pessoas. Movidos por valores internos profundos e um senso aguçado de estética, ISFPs criam beleza onde quer que vão - seja através de arte tradicional, culinária, moda, ou simplesmente na forma como vivem suas vidas.

Enquanto outros planejam o futuro, ISFPs estão totalmente presentes no aqui e agora, absorvendo cada experiência sensorial e emocional com plenitude. Eles possuem uma sensibilidade única para detectar harmonia e discordância, tanto em ambientes físicos quanto em dinâmicas humanas. Esta percepção refinada os torna naturalmente talentosos em criar experiências que tocam os sentidos e o coração.

No entanto, essa abertura sensorial e emocional vem com vulnerabilidades. ISFPs podem ser facilmente sobrecarregados por ambientes caóticos ou conflitos interpessoais. Eles frequentemente lutam com planejamento de longo prazo e podem se sentir presos quando forçados a seguir estruturas rígidas. Sua profunda necessidade de autenticidade pode fazer com que resistam a conselhos bem-intencionados, preferindo aprender através da experiência direta.

O verdadeiro poder do ISFP está em sua capacidade de transformar o ordinário em extraordinário, de encontrar beleza onde outros veem apenas funcionalidade, e de viver com uma integridade inabalável aos seus valores pessoais. Eles são os criadores silenciosos que enriquecem o mundo com sua presença autêntica e expressão artística.`,

    quote: {
      text: 'A maior coisa que você pode fazer é ser você mesmo.',
      author: 'Bob Dylan',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Fi',
      fullName: 'Sentimento Introvertido',
      icon: '💜',
      description: 'A função dominante Fi cria um sistema de valores internos profundos e busca autenticidade acima de tudo. ISFPs têm uma bússola moral interna extraordinariamente sensível que guia todas as suas decisões.',
      manifestation: 'Se manifesta como profunda empatia, necessidade de autenticidade, e aversão instintiva a qualquer coisa que viole seus valores pessoais. ISFPs "sentem" quando algo está certo ou errado em um nível visceral.',
    },
    {
      position: 'auxiliary',
      name: 'Se',
      fullName: 'Sensação Extrovertida',
      icon: '🎨',
      description: 'A função auxiliar Se sintoniza com o ambiente físico imediato, absorvendo detalhes sensoriais e vivendo plenamente no momento presente. Ela alimenta o Fi com experiências ricas e concretas.',
      manifestation: 'Aparece como consciência aguçada de estética, habilidade para trabalhar com as mãos, apreciação de beleza física, e tendência a agir impulsivamente baseado no que o momento oferece.',
    },
    {
      position: 'tertiary',
      name: 'Ni',
      fullName: 'Intuição Introvertida',
      icon: '✨',
      description: 'A função terciária Ni ocasionalmente oferece insights profundos sobre significados ocultos e direções futuras. Em ISFPs, aparece como flashes de intuição sobre pessoas e situações.',
      manifestation: 'Pode aparecer como pressentimentos sobre o que está por vir, insights súbitos sobre o caráter de alguém, ou visões artísticas que "simplesmente aparecem" totalmente formadas.',
    },
    {
      position: 'inferior',
      name: 'Te',
      fullName: 'Pensamento Extrovertido',
      icon: '📋',
      description: 'A função inferior Te lida com organização, planejamento sistemático e eficiência. Para ISFPs, esta é a função mais desafiadora e menos desenvolvida.',
      manifestation: 'ISFPs frequentemente se sentem sobrecarregados por tarefas organizacionais, resistem a estruturas impostas externamente, e podem explodir com críticas severas quando extremamente estressados.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Sensibilidade Artística Natural',
        description: 'Capacidade inata de perceber e criar beleza em todas as suas formas - visual, musical, tátil e experiencial.',
        icon: '🎨',
      },
      {
        title: 'Empatia Profunda',
        description: 'Habilidade extraordinária de sentir e compreender as emoções dos outros sem julgamento, oferecendo presença compassiva.',
        icon: '💗',
      },
      {
        title: 'Viver no Presente',
        description: 'Capacidade rara de estar totalmente presente no momento, apreciando plenamente as experiências à medida que acontecem.',
        icon: '🌸',
      },
      {
        title: 'Adaptabilidade Graciosa',
        description: 'Flexibilidade natural para ajustar-se a mudanças e fluir com as circunstâncias sem resistência desnecessária.',
        icon: '🦋',
      },
      {
        title: 'Autenticidade Inabalável',
        description: 'Compromisso profundo com ser genuíno e verdadeiro consigo mesmo, recusando-se a usar máscaras sociais.',
        icon: '🌟',
      },
    ],
    gated: [
      {
        title: 'Consciência Estética Refinada',
        description: 'Percepção sofisticada de harmonia, proporção e beleza que os torna curadores naturais de ambientes e experiências.',
        icon: '🖼️',
      },
      {
        title: 'Habilidades Manuais Excepcionais',
        description: 'Coordenação física e consciência corporal que os tornam talentosos em artes práticas, esportes e ofícios.',
        icon: '🎯',
      },
      {
        title: 'Lealdade Silenciosa',
        description: 'Comprometimento profundo e duradouro com pessoas e causas que ressoam com seus valores, demonstrado através de ações.',
        icon: '🛡️',
      },
      {
        title: 'Observação Atenta',
        description: 'Capacidade de notar detalhes sutis no ambiente e nas pessoas que outros completamente ignoram.',
        icon: '👁️',
      },
      {
        title: 'Espontaneidade Encantadora',
        description: 'Disposição para abraçar o inesperado e criar momentos mágicos através de ações não planejadas.',
        icon: '🎭',
      },
      {
        title: 'Integridade Moral',
        description: 'Sistema de valores internos forte e consistente que guia decisões mesmo sob pressão social.',
        icon: '⚖️',
      },
      {
        title: 'Expressão Criativa Única',
        description: 'Estilo pessoal distintivo que reflete sua individualidade autêntica, seja em arte, moda ou estilo de vida.',
        icon: '🎪',
      },
      {
        title: 'Compostura sob Pressão',
        description: 'Capacidade de manter a calma em situações de crise, respondendo fluidamente ao que o momento exige.',
        icon: '🧘',
      },
      {
        title: 'Conexão com a Natureza',
        description: 'Afinidade profunda com o mundo natural e capacidade de encontrar paz e renovação em ambientes naturais.',
        icon: '🌿',
      },
      {
        title: 'Generosidade Gentil',
        description: 'Inclinação natural para ajudar outros de maneiras práticas e tangíveis, sem buscar reconhecimento.',
        icon: '🤲',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Aversão Extrema a Conflitos',
        description: 'Tendência a evitar confrontos necessários e suprimir necessidades próprias para manter a harmonia superficial.',
        impact: 'Ressentimentos acumulados, necessidades não atendidas, e explosões emocionais inesperadas quando a pressão se torna insuportável.',
      },
      {
        title: 'Dificuldade com Planejamento de Longo Prazo',
        description: 'Foco intenso no presente dificulta visualizar e planejar para o futuro, levando a improvisar constantemente.',
        impact: 'Oportunidades perdidas que requeriam preparação antecipada, instabilidade financeira, falta de direção de vida clara.',
      },
      {
        title: 'Sensibilidade Excessiva a Críticas',
        description: 'Levam feedback negativo muito pessoalmente, mesmo quando é construtivo ou não intencional.',
        impact: 'Autoestima frágil, evitar situações onde podem ser julgados, dificuldade em crescer profissionalmente.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Competitividade Oculta',
          description: 'Embora pareçam descontraídos, ISFPs podem ser surpreendentemente competitivos, especialmente em áreas relacionadas aos seus valores ou habilidades.',
          impact: 'Stress interno quando outros se destacam em "suas" áreas, dificuldade em celebrar sucessos alheios, comportamento passivo-agressivo.',
          mitigation: 'Reconhecer que sucesso não é um jogo de soma zero. Canalizar competitividade para auto-aperfeiçoamento. Praticar apreciação genuína das conquistas dos outros.',
        },
        {
          title: 'Independência Teimosa',
          description: 'Forte resistência a conselhos ou ajuda de outros, mesmo quando seria claramente benéfico, por necessidade de fazer as coisas à sua maneira.',
          impact: 'Aprender da maneira mais difícil repetidamente, alienar pessoas que querem ajudar, progresso mais lento do que necessário.',
          mitigation: 'Reconhecer que aceitar ajuda não compromete autenticidade. Escolher conscientemente quando ser independente vs. quando ser colaborativo.',
        },
        {
          title: 'Imprevisibilidade Frustrante',
          description: 'Mudanças súbitas de humor, planos ou prioridades baseadas em sentimentos do momento podem confundir e frustrar outros.',
          impact: 'Reputação de não serem confiáveis, dificuldade em manter compromissos, tensão em relacionamentos que precisam de previsibilidade.',
          mitigation: 'Comunicar mudanças de sentimento antes de mudar comportamento. Distinguir entre impulsos passageiros e necessidades reais. Honrar compromissos importantes.',
        },
        {
          title: 'Vulnerabilidade ao Stress',
          description: 'Ambientes caóticos, prazos apertados ou conflitos prolongados podem rapidamente sobrecarregá-los emocionalmente e fisicamente.',
          impact: 'Burnout frequente, problemas de saúde relacionados ao stress, fuga de responsabilidades quando sobrecarregados.',
          mitigation: 'Criar espaços seguros para recuperação regular. Estabelecer limites claros antes de chegar ao esgotamento. Desenvolver práticas de regulação emocional.',
        },
        {
          title: 'Procrastinação por Perfeccionismo',
          description: 'Adiam tarefas até "sentirem-se prontos" ou terem a inspiração perfeita, especialmente em projetos criativos importantes.',
          impact: 'Projetos nunca concluídos, potencial artístico não realizado, frustração crônica consigo mesmos.',
          mitigation: 'Aceitar que "feito é melhor que perfeito". Criar versões de "rascunho" sem expectativas. Estabelecer prazos externos com accountability.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Artista Visual/Designer',
        description: 'Pintura, escultura, design gráfico, fotografia, ilustração - qualquer campo que permita expressão criativa através de meios visuais.',
        icon: '🎨',
        fit: 'Ideal para Fi-Se: expressão de valores pessoais através de criação sensorial, liberdade artística.',
      },
      {
        title: 'Músico/Compositor',
        description: 'Criar, performar ou ensinar música, trabalhando com a conexão emocional profunda que a música proporciona.',
        icon: '🎵',
        fit: 'Combina sensibilidade emocional com expressão através do som; permite comunicar sentimentos sem palavras.',
      },
      {
        title: 'Chef/Confeiteiro',
        description: 'Criar experiências gastronômicas que deleitam os sentidos e nutrem corpo e alma.',
        icon: '👨‍🍳',
        fit: 'Trabalho tátil e sensorial, criação de beleza comestível, feedback imediato através das reações das pessoas.',
      },
      {
        title: 'Veterinário/Tratador de Animais',
        description: 'Cuidar do bem-estar de animais, oferecendo compaixão e habilidades práticas para criaturas vulneráveis.',
        icon: '🐾',
        fit: 'Alinha com valores de cuidado e proteção, trabalho prático e sensorial, conexão emocional sem complexidade social humana.',
      },
      {
        title: 'Fisioterapeuta/Massagista',
        description: 'Ajudar outros a se curarem através do toque terapêutico e consciência corporal.',
        icon: '💆',
        fit: 'Combina empatia com habilidades manuais, ajuda tangível, trabalho sensorial e presente.',
      },
    ],
    gated: [
      {
        title: 'Designer de Moda/Estilista',
        description: 'Criar roupas e acessórios que expressam individualidade e beleza, ou ajudar outros a encontrar seu estilo autêntico.',
        icon: '👗',
        fit: 'Expressão de estética pessoal, trabalho com texturas e cores, criação de beleza tangível.',
        details: 'Permite combinar consciência artística com impacto prático na autoexpressão das pessoas.',
      },
      {
        title: 'Florista/Paisagista',
        description: 'Criar arranjos florais ou projetar jardins que trazem beleza natural para a vida das pessoas.',
        icon: '🌺',
        fit: 'Trabalho com elementos naturais, criação de harmonia estética, processo contemplativo.',
        details: 'Ambiente calmo, trabalho com as mãos, conexão com ciclos naturais e crescimento orgânico.',
      },
      {
        title: 'Fotógrafo',
        description: 'Capturar momentos, emoções e beleza através da lente, preservando memórias e criando arte visual.',
        icon: '📷',
        fit: 'Consciência estética apurada, captura do momento presente, expressão de perspectiva única.',
        details: 'Flexibilidade para trabalhar independentemente, variedade de ambientes e sujeitos, expressão criativa técnica.',
      },
      {
        title: 'Terapeuta Ocupacional/de Arte',
        description: 'Ajudar pessoas a se curarem e desenvolverem através de atividades criativas e práticas.',
        icon: '🎭',
        fit: 'Combina empatia profunda com abordagens práticas e criativas para bem-estar.',
        details: 'Trabalho significativo alinhado com valores, ajuda tangível, uso de criatividade para cura.',
      },
      {
        title: 'Instrutor de Yoga/Dança',
        description: 'Ensinar consciência corporal, movimento e expressão através de práticas físicas contemplativas.',
        icon: '🧘‍♀️',
        fit: 'Conexão mente-corpo, trabalho sensorial, compartilhamento de bem-estar.',
        details: 'Ambiente geralmente calmo e harmonioso, ajuda outros a conectarem-se consigo mesmos, expressão através do movimento.',
      },
    ],
  },

  famousPeople: [
    { name: 'Marilyn Monroe', description: 'Atriz e Ícone Cultural', photo: 'https://ui-avatars.com/api/?name=Marilyn+Monroe&background=7C3AED&color=fff', category: 'contemporary' },
    { name: 'Bob Dylan', description: 'Músico e Poeta', photo: 'https://ui-avatars.com/api/?name=Bob+Dylan&background=7C3AED&color=fff', category: 'contemporary' },
    { name: 'Prince', description: 'Músico e Performer', photo: 'https://ui-avatars.com/api/?name=Prince&background=7C3AED&color=fff', category: 'contemporary' },
    { name: 'Rihanna', description: 'Cantora e Empresária', photo: 'https://ui-avatars.com/api/?name=Rihanna&background=7C3AED&color=fff', category: 'contemporary' },
    { name: 'Jimi Hendrix', description: 'Guitarrista Lendário', photo: 'https://ui-avatars.com/api/?name=Jimi+Hendrix&background=7C3AED&color=fff', category: 'contemporary' },
    { name: 'Frida Kahlo', description: 'Pintora', photo: 'https://ui-avatars.com/api/?name=Frida+Kahlo&background=7C3AED&color=fff', category: 'contemporary' },
    { name: 'Britney Spears', description: 'Cantora e Performer', photo: 'https://ui-avatars.com/api/?name=Britney+Spears&background=7C3AED&color=fff', category: 'contemporary' },
    { name: 'Kevin Costner', description: 'Ator e Diretor', photo: 'https://ui-avatars.com/api/?name=Kevin+Costner&background=7C3AED&color=fff', category: 'contemporary' },
    { name: 'Lana Del Rey', description: 'Cantora e Compositora', photo: 'https://ui-avatars.com/api/?name=Lana+Del+Rey&background=7C3AED&color=fff', category: 'contemporary' },
    { name: 'Michael Jackson', description: 'Rei do Pop', photo: 'https://ui-avatars.com/api/?name=Michael+Jackson&background=7C3AED&color=fff', category: 'contemporary' },
  ],

  relationships: {
    isGated: true,
    preview: 'ISFPs trazem calor, autenticidade e expressão criativa aos relacionamentos, mas precisam de parceiros que respeitem sua necessidade de liberdade e espaço emocional...',
    content: {
      romantic: {
        overview: 'ISFPs em relacionamentos românticos são parceiros profundamente leais, carinhosos e atenciosos que expressam amor através de ações tangíveis e gestos criativos. Eles buscam conexões autênticas onde possam ser completamente eles mesmos, sem pretensões ou máscaras sociais. No entanto, sua necessidade de liberdade e aversão a conflitos pode criar desafios em relacionamentos de longo prazo.',
        strengths: [
          'Demonstração de amor através de ações práticas e gestos atenciosos',
          'Presença calorosa e reconfortante que faz parceiros se sentirem aceitos',
          'Espontaneidade que mantém o relacionamento fresco e excitante',
          'Profunda lealdade uma vez que se comprometem autenticamente',
          'Sensibilidade às necessidades emocionais e físicas do parceiro',
        ],
        challenges: [
          'Evitar conversas difíceis necessárias, deixando problemas sem resolução',
          'Necessidade de espaço pessoal pode ser interpretada como distanciamento',
          'Dificuldade em expressar necessidades verbalmente, esperando que parceiro "perceba"',
          'Podem sair de relacionamentos abruptamente quando se sentem presos',
          'Levam críticas muito pessoalmente, mesmo quando construtivas',
        ],
        tips: [
          'Pratique comunicar necessidades e limites verbalmente, não apenas através de ações',
          'Aborde conflitos pequenos antes que se tornem grandes - evitar não resolve',
          'Comunique sua necessidade de tempo sozinho proativamente',
          'Lembre-se que compromisso não significa perder sua individualidade',
          'Busque parceiros que valorizem autenticidade e respeitem sua natureza independente',
        ],
      },
      friendship: {
        overview: 'ISFPs são amigos leais, divertidos e profundamente solidários que preferem demonstrar afeto através de ações ao invés de palavras. Eles criam amizades baseadas em experiências compartilhadas e aceitação mútua.',
        ideal: 'Outros SPs que compartilham amor por experiências sensoriais e espontaneidade, ou NFs que apreciam sua profundidade emocional e autenticidade.',
        asAFriend: 'Presente e atencioso, leal através das tempestades, cria memórias através de aventuras espontâneas, oferece apoio prático em momentos difíceis, aceita amigos sem julgamento.',
      },
      compatibility: {
        highest: ['ENFJ', 'ESFJ', 'INFJ', 'ESTJ'],
        challenging: ['ENTJ', 'INTJ', 'ENTP', 'INTP'],
        explanation: 'ISFPs se conectam melhor com tipos que apreciam sua sensibilidade e oferecem estrutura complementar. Pares com Fe forte entendem suas necessidades emocionais, enquanto tipos muito orientados ao pensamento podem parecer insensíveis.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ISFPs envolve desenvolver sua função inferior Te e aprender a equilibrar espontaneidade com planejamento estratégico...',
    content: {
      developingInferiorTe: {
        title: 'Desenvolvendo Pensamento Extrovertido (Te)',
        description: 'Te inferior significa que ISFPs lutam com organização, planejamento sistemático e estruturas externas. Desenvolvê-la é crucial para alcançar objetivos de longo prazo.',
        practices: [
          'Começar com sistemas organizacionais simples e visuais (quadros, cores, símbolos)',
          'Estabelecer uma rotina mínima não-negociável (sem ser rígido demais)',
          'Praticar estabelecer metas pequenas e concretas com prazos específicos',
          'Usar ferramentas externas para compensar resistência ao planejamento (apps, alarmes)',
          'Pedir ajuda de tipos orientados ao pensamento para feedback objetivo',
        ],
        signs: 'Te saudável aparece como maior capacidade de completar projetos, menos stress com prazos, e habilidade de criar estrutura que suporta (ao invés de sufocar) criatividade.',
      },
      balancingFunctions: {
        title: 'Equilibrando Fi-Se com Ni-Te',
        description: 'ISFPs saudáveis aprendem a honrar seus valores e viver no presente sem negligenciar direção futura e praticidade.',
        fiSeBalance: 'Use Fi-Se para autenticidade e apreciação do momento, mas crie "ilhas de estrutura" para garantir que necessidades práticas sejam atendidas.',
        niTeDevelopment: 'Cultive Ni reservando tempo para reflexão quieta sobre padrões e direção de vida. Desenvolva Te através de pequenos projetos com início, meio e fim claros.',
      },
      commonTraps: {
        fiNiLoop: {
          name: 'Loop Fi-Ni',
          description: 'Ficar preso em mundo interno de sentimentos e presságios, desconectando-se de experiências concretas e ação prática.',
          escape: 'Retornar ao corpo e sentidos (Se): exercício físico, arte prática, natureza. Engajar com mundo real através de experiências sensoriais.',
        },
        seGrip: {
          name: 'Grip de Te',
          description: 'Sob stress extremo, Te emerge de forma destrutiva: críticas severas, julgamentos duros, tentativas caóticas de controlar tudo.',
          escape: 'Retornar aos valores (Fi) e presente (Se). Lembrar que não precisa ter tudo resolvido. Buscar beleza e experiências que reconectam com autenticidade.',
        },
      },
      dailyPractices: [
        'Reserve 15 minutos para planejamento simples do dia seguinte',
        'Mantenha um diário criativo para processar emoções (desenho, colagem, escrita)',
        'Pratique dizer "não" a pedidos que violam suas necessidades',
        'Crie ritual matinal que honra necessidades sensoriais (música, café, alongamento)',
        'Estabeleça um projeto criativo pessoal com marco de conclusão definido',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ISFPs prosperam em ambientes que valorizam criatividade, permitem autonomia, e oferecem trabalho prático e tangível ao invés de teoria abstrata...',
    content: {
      asLeader: {
        style: 'Liderança por Exemplo',
        strengths: [
          'Lideram através de demonstração prática, não apenas instrução verbal',
          'Criam ambientes de trabalho harmoniosos onde pessoas se sentem valorizadas',
          'Sensíveis às necessidades individuais de cada membro da equipe',
          'Flexíveis e adaptáveis a mudanças de circunstâncias',
        ],
        challenges: [
          'Evitar confrontar problemas de desempenho diretamente',
          'Dificuldade com planejamento estratégico de longo prazo',
          'Podem ser vistos como muito permissivos ou falta de autoridade',
          'Desconforto com aspectos administrativos e burocráticos da liderança',
        ],
        tips: 'Delegue tarefas administrativas para quem se destaca nelas. Desenvolva scripts para conversas difíceis. Foque em criar cultura positiva enquanto parceiro de alguém forte em estratégia.',
      },
      asTeamMember: {
        strengths: [
          'Colaboradores harmoniosos que mantêm moral da equipe alta',
          'Habilidades práticas excepcionais para execução hands-on',
          'Sensíveis à dinâmica de equipe e tensões interpessoais',
          'Trazem perspectiva estética e criativa única',
        ],
        challenges: [
          'Podem concordar superficialmente mas ressentir-se internamente',
          'Dificuldade com ambientes altamente estruturados ou microgerenciados',
          'Resistência a feedback crítico, mesmo quando construtivo',
          'Podem desaparecer ou desengajar quando se sentem não valorizados',
        ],
        tips: 'Comunique preferências e limites honestamente. Busque projetos onde pode trabalhar com autonomia. Desenvolva pele mais grossa para críticas profissionais.',
      },
      idealEnvironment: {
        culture: 'Ambiente criativo e colaborativo que valoriza expressão individual e bem-estar dos funcionários',
        structure: 'Flexibilidade e autonomia, com estrutura mínima necessária; reconhecimento através de ações, não apenas palavras',
        challenges: 'Projetos práticos com resultados tangíveis e imediatos; trabalho que permite criatividade e expressão pessoal',
        avoid: 'Ambientes altamente políticos, burocracia excessiva, microgerenciamento, foco exclusivo em métricas sem considerar pessoas',
      },
      conflictResolution: {
        approach: 'ISFPs evitam conflito sempre que possível, mas quando forçados a lidar, abordam através de valores e impacto emocional',
        tips: [
          'Lembre-se que abordar conflito cedo previne explosões maiores depois',
          'Use "declarações eu" para expressar como situação afeta você pessoalmente',
          'Foque em resolver problema, não em quem está "certo" ou "errado"',
          'Busque mediador neutro se confrontação direta parecer impossível',
        ],
      },
    },
  },
};
