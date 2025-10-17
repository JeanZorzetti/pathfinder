import { PersonalityType } from '../../types/personality';

export const ENFJ: PersonalityType = {
  code: 'ENFJ',
  nickname: 'O Protagonista',
  tagline: 'Líderes carismáticos e inspiradores que cativam seus ouvintes',
  tags: ['Carismático', 'Inspirador', 'Empático', 'Motivador'],
  population: '2-5% da população',
  group: 'diplomats',

  colorScheme: {
    primary: '#F59E0B',
    secondary: '#D97706',
    light: '#FEF3C7',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ENFJs são os maestros naturais da humanidade, orquestrando o potencial das pessoas ao seu redor com carisma magnético e visão inspiradora. Movidos por uma profunda empatia e um senso quase missionário de propósito, eles veem o melhor em cada pessoa e dedicam suas vidas a ajudar outros a alcançarem esse potencial. Enquanto outros gerenciam pessoas, ENFJs as transformam - iluminando caminhos que seus seguidores nem sabiam que existiam.

Sua presença é como um raio de sol que aquece qualquer ambiente: eles têm uma habilidade quase sobrenatural de ler emoções, antecipar necessidades, e dizer exatamente o que alguém precisa ouvir no momento certo. Para o ENFJ, cada interação humana é uma oportunidade de criar impacto positivo, e cada pessoa é um projeto de desenvolvimento esperando para florescer.

No entanto, essa dedicação apaixonada aos outros pode cobrar um preço pesado. ENFJs frequentemente se perdem tanto nas necessidades alheias que negligenciam as próprias, estabelecem padrões irrealisticamente altos, e levam críticas profundamente a sério. Eles podem se tornar manipulativos quando acreditam que sabem o que é melhor para os outros, e lutam para dizer "não" mesmo quando estão completamente esgotados.

O verdadeiro poder do ENFJ está em sua capacidade de enxergar o potencial que outros não veem em si mesmos, de unir pessoas díspares em torno de uma visão compartilhada, e de criar movimentos que mudam culturas inteiras. Eles são os catalisadores da transformação humana, os líderes que não apenas comandam, mas inspiram.`,

    quote: {
      text: 'Aprendi que as pessoas vão esquecer o que você disse, vão esquecer o que você fez, mas nunca esquecerão como você as fez sentir.',
      author: 'Maya Angelou',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Fe',
      fullName: 'Sentimento Extrovertido',
      icon: '❤️',
      description: 'A função dominante Fe busca criar harmonia e conexão emocional com os outros. ENFJs são altamente sintonizados com o clima emocional ao seu redor e trabalham incansavelmente para criar ambientes positivos e de apoio.',
      manifestation: 'Se manifesta como uma consciência aguda das emoções alheias, habilidade natural de liderar e motivar, e uma necessidade profunda de servir e elevar outros. ENFJs sentem as emoções do grupo como se fossem suas próprias.',
    },
    {
      position: 'auxiliary',
      name: 'Ni',
      fullName: 'Intuição Introvertida',
      icon: '🔮',
      description: 'A função auxiliar Ni fornece visão de longo prazo e insights profundos sobre pessoas e situações. Ela permite que ENFJs vejam o potencial oculto em indivíduos e antecipem como as pessoas evoluirão.',
      manifestation: 'Aparece como compreensão intuitiva profunda de motivações humanas, capacidade de ver onde uma pessoa pode chegar no futuro, e insights repentinos sobre padrões de comportamento e desenvolvimento pessoal.',
    },
    {
      position: 'tertiary',
      name: 'Se',
      fullName: 'Sensação Extrovertida',
      icon: '✨',
      description: 'A função terciária Se conecta ENFJs ao momento presente e ao ambiente físico. Quando desenvolvida, dá presença carismática e habilidade de adaptar sua comunicação ao contexto imediato.',
      manifestation: 'Pode aparecer como presença de palco magnética, atenção a detalhes estéticos, e capacidade de "ler a sala" e ajustar sua abordagem em tempo real. ENFJs desenvolvidos têm timing impecável.',
    },
    {
      position: 'inferior',
      name: 'Ti',
      fullName: 'Pensamento Introvertido',
      icon: '🧠',
      description: 'A função inferior Ti lida com análise lógica impessoal e consistência interna. Para ENFJs, esta é a função mais desafiadora e menos desenvolvida.',
      manifestation: 'ENFJs podem lutar com lógica impessoal, ficam defensivos quando suas ideias são questionadas logicamente, e às vezes tomam críticas construtivas como ataques pessoais. Podem evitar análise fria quando decisões humanas estão envolvidas.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Carisma Natural e Presença Magnética',
        description: 'Habilidade extraordinária de atrair, engajar e inspirar pessoas através de comunicação autêntica e energia contagiante.',
        icon: '⭐',
      },
      {
        title: 'Empatia Profunda e Compreensão Humana',
        description: 'Capacidade quase sobrenatural de sentir e compreender as emoções, necessidades e motivações dos outros.',
        icon: '💝',
      },
      {
        title: 'Liderança Inspiradora',
        description: 'Talento natural para motivar e guiar pessoas em direção a objetivos compartilhados através de visão e entusiasmo genuíno.',
        icon: '🎯',
      },
      {
        title: 'Habilidade de Comunicação Excepcional',
        description: 'Mestres em adaptar sua mensagem ao público, escolher palavras que tocam o coração, e articular visões de forma memorável.',
        icon: '🎤',
      },
      {
        title: 'Visão de Potencial Humano',
        description: 'Capacidade única de ver o que as pessoas podem se tornar e ajudá-las a alcançar esse potencial através de apoio e orientação.',
        icon: '🌟',
      },
    ],
    gated: [
      {
        title: 'Catalisadores de Transformação',
        description: 'Não apenas ajudam pessoas a melhorar, mas as transformam fundamentalmente ao despertar potencial que elas nem sabiam que tinham.',
        icon: '🦋',
      },
      {
        title: 'Criadores de Comunidade',
        description: 'Habilidade extraordinária de unir pessoas diversas, criar senso de pertencimento, e construir redes de apoio duradouras.',
        icon: '🤝',
      },
      {
        title: 'Inteligência Emocional Avançada',
        description: 'Navegam situações emocionais complexas com graça, mediam conflitos efetivamente, e criam segurança psicológica.',
        icon: '🧭',
      },
      {
        title: 'Visão Estratégica de Pessoas',
        description: 'Enxergam não apenas onde cada pessoa está, mas onde pode chegar, e traçam caminhos de desenvolvimento personalizados.',
        icon: '🗺️',
      },
      {
        title: 'Autenticidade Magnética',
        description: 'Quando verdadeiramente alinhados com seus valores, sua paixão e sinceridade são irresistivelmente inspiradoras.',
        icon: '🔥',
      },
      {
        title: 'Adaptabilidade Social',
        description: 'Transitam sem esforço entre diferentes grupos sociais, culturas e contextos, sempre encontrando terreno comum.',
        icon: '🌈',
      },
      {
        title: 'Otimismo Contagiante',
        description: 'Sua crença genuína no potencial humano eleva o moral e encoraja outros a sonharem maior.',
        icon: '☀️',
      },
      {
        title: 'Eloquência Persuasiva',
        description: 'Combinam lógica com apelo emocional de forma tão hábil que convencem sem que as pessoas se sintam manipuladas.',
        icon: '💬',
      },
      {
        title: 'Mentoria Natural',
        description: 'Instintivamente sabem quando encorajar, quando desafiar, e quando simplesmente estar presentes para seus mentorados.',
        icon: '🎓',
      },
      {
        title: 'Consciência Cultural e Social',
        description: 'Altamente sintonizados com dinâmicas sociais, normas culturais, e como navegar sistemas humanos complexos.',
        icon: '🌍',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Idealismo Excessivo Sobre Pessoas',
        description: 'Tendência a ver o melhor nas pessoas a ponto de ignorar sinais de alerta reais e investir em quem não está pronto para mudar.',
        impact: 'Decepções repetidas, relacionamentos tóxicos prolongados, e energia desperdiçada em pessoas que não reciprocam o investimento.',
      },
      {
        title: 'Dificuldade Extrema em Dizer Não',
        description: 'Lutam para estabelecer limites saudáveis, assumindo responsabilidades além de sua capacidade por medo de decepcionar.',
        impact: 'Esgotamento crônico, ressentimento acumulado, e qualidade comprometida em todos os compromissos por sobrecarga.',
      },
      {
        title: 'Sensibilidade Profunda a Críticas',
        description: 'Levam feedback negativo profundamente a sério, interpretando críticas ao seu trabalho como rejeição pessoal.',
        impact: 'Autocrítica excessiva, paralisia quando criticados, e tendência a evitar situações onde podem ser julgados.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Negligência das Próprias Necessidades',
          description: 'Tão focados em cuidar dos outros que sistematicamente ignoram seu próprio bem-estar físico, emocional e espiritual.',
          impact: 'Burnout severo, problemas de saúde ignorados até se tornarem graves, e perda de conexão com sua própria identidade.',
          mitigation: 'Agendar "tempo não-negociável" para autocuidado. Tratar suas necessidades com a mesma seriedade que tratam as dos outros. Terapia para desenvolver auto-compaixão.',
        },
        {
          title: 'Tendências Manipulativas',
          description: 'Quando estressados ou convencidos de que "sabem melhor", podem usar seu dom de persuasão para manipular ao invés de guiar.',
          impact: 'Perda de confiança quando descobertos, relacionamentos danificados, e culpa interna por violar seus próprios valores.',
          mitigation: 'Questionar motivações constantemente: "Estou fazendo isso para eles ou para minha visão do que deveriam ser?" Buscar consentimento genuíno, não apenas concordância.',
        },
        {
          title: 'Evitação de Conflitos Necessários',
          description: 'Priorizam harmonia a ponto de evitar confrontos difíceis mas necessários, deixando problemas apodrecerem.',
          impact: 'Problemas que explodem eventualmente, ressentimentos ocultos que corroem relacionamentos, e situações que pioram por falta de intervenção.',
          mitigation: 'Reframe conflito como "cuidado corajoso". Praticar conversas difíceis em contextos de baixo risco. Lembrar que paz verdadeira requer honestidade.',
        },
        {
          title: 'Padrões Irrealisticamente Altos',
          description: 'Estabelecem expectativas de perfeição para si mesmos em todos os papéis, levando a autocrítica brutal quando inevitavelmente falham.',
          impact: 'Síndrome do impostor crônica, perfeccionismo paralisante, e incapacidade de celebrar sucessos genuínos.',
          mitigation: 'Praticar auto-compaixão ativamente. Aceitar que "bom o suficiente" é frequentemente suficiente. Distinguir entre excelência e perfeição impossível.',
        },
        {
          title: 'Absorção de Emoções Alheias',
          description: 'Sentem as emoções dos outros tão intensamente que podem perder contato com seus próprios sentimentos autênticos.',
          impact: 'Exaustão emocional, confusão sobre suas próprias necessidades, e dificuldade em tomar decisões alinhadas com seus valores.',
          mitigation: 'Práticas diárias de grounding. Journaling para processar e separar emoções próprias das absorvidas. Criar espaço físico e temporal entre si e demandas emocionais.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Professor/Educador',
        description: 'Inspirar amor pelo aprendizado, desenvolver potencial de estudantes, e criar ambientes educacionais transformadores.',
        icon: '👨‍🏫',
        fit: 'Ideal para Fe-Ni: combina mentoria individual com impacto em larga escala, permite ver crescimento ao longo do tempo.',
      },
      {
        title: 'Diretor de Recursos Humanos/Desenvolvimento de Talentos',
        description: 'Recrutar, desenvolver e posicionar pessoas para maximizar seu potencial e satisfação profissional.',
        icon: '👥',
        fit: 'Permite foco em crescimento humano dentro de contexto organizacional, combina visão estratégica com impacto pessoal.',
      },
      {
        title: 'Conselheiro/Terapeuta',
        description: 'Guiar indivíduos através de desafios emocionais e ajudá-los a alcançar bem-estar e autorrealização.',
        icon: '🛋️',
        fit: 'Usa empatia natural e insights sobre motivações humanas para facilitar transformação profunda.',
      },
      {
        title: 'Palestrante Motivacional/Coach de Vida',
        description: 'Inspirar audiências através de histórias poderosas, frameworks de desenvolvimento pessoal, e energia carismática.',
        icon: '🎙️',
        fit: 'Maximiza dons de comunicação e capacidade de energizar e motivar grupos grandes.',
      },
      {
        title: 'Diretor de Organização Sem Fins Lucrativos',
        description: 'Liderar organizações focadas em causas sociais, mobilizando recursos e pessoas para criar mudança sistêmica.',
        icon: '🌱',
        fit: 'Alinha paixão por impacto social com habilidades de liderança e construção de comunidade.',
      },
    ],
    gated: [
      {
        title: 'Diretor de Vendas/Treinador de Vendas',
        description: 'Desenvolver equipes de vendas, criar culturas de alto desempenho, e inspirar resultados através de pessoas.',
        icon: '📈',
        fit: 'Combina habilidade de persuasão com desenvolvimento de talentos; foco em crescimento humano gera resultados.',
        details: 'Mais satisfatório quando produtos/serviços genuinamente ajudam clientes - ENFJs precisam acreditar no que vendem.',
      },
      {
        title: 'Líder Religioso/Espiritual',
        description: 'Guiar comunidades espirituais, oferecer orientação moral, e criar espaços de significado e conexão.',
        icon: '🕊️',
        fit: 'Permite expressar valores profundos, servir necessidades espirituais, e impactar vidas holisticamente.',
        details: 'Ideal quando alinhado com crenças autênticas; combina mentoria, liderança comunitária e comunicação inspiradora.',
      },
      {
        title: 'Diretor de Marketing/Comunicação Corporativa',
        description: 'Criar narrativas de marca que ressoam emocionalmente, construir conexões autênticas com audiências.',
        icon: '📢',
        fit: 'Usa compreensão de motivações humanas para criar mensagens que movem pessoas.',
        details: 'Mais satisfatório em organizações cujos valores e missão se alinham com os do ENFJ.',
      },
      {
        title: 'Político/Ativista Social',
        description: 'Mobilizar pessoas em torno de causas, criar mudança através de advocacy, e representar interesses de comunidades.',
        icon: '🗳️',
        fit: 'Permite combinar visão de futuro melhor com habilidade de unir e inspirar massas.',
        details: 'Desafio: necessidade de desenvolver "pele grossa" para críticas e ataques que vêm com exposição pública.',
      },
      {
        title: 'Produtor de Eventos/Diretor de Experiências',
        description: 'Criar experiências memoráveis que conectam pessoas, geram emoções positivas, e criam momentos transformadores.',
        icon: '🎭',
        fit: 'Combina criatividade, leitura de dinâmicas sociais, e satisfação de criar alegria para outros.',
        details: 'Permite uso de Se terciário para atenção a detalhes sensoriais e criação de atmosferas impactantes.',
      },
    ],
  },

  famousPeople: [
    { name: 'Barack Obama', description: 'Político e Autor', photo: 'https://ui-avatars.com/api/?name=Barack+Obama&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Oprah Winfrey', description: 'Apresentadora e Filantropa', photo: 'https://ui-avatars.com/api/?name=Oprah+Winfrey&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Martin Luther King Jr.', description: 'Líder de Direitos Civis', photo: 'https://ui-avatars.com/api/?name=Martin+Luther+King&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Maya Angelou', description: 'Poeta e Ativista', photo: 'https://ui-avatars.com/api/?name=Maya+Angelou&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Jennifer Lawrence', description: 'Atriz', photo: 'https://ui-avatars.com/api/?name=Jennifer+Lawrence&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Matthew McConaughey', description: 'Ator', photo: 'https://ui-avatars.com/api/?name=Matthew+McConaughey&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Ben Affleck', description: 'Ator e Diretor', photo: 'https://ui-avatars.com/api/?name=Ben+Affleck&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'John Cusack', description: 'Ator', photo: 'https://ui-avatars.com/api/?name=John+Cusack&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Morgan Freeman', description: 'Ator', photo: 'https://ui-avatars.com/api/?name=Morgan+Freeman&background=F59E0B&color=fff', category: 'contemporary' },
    { name: 'Michael Moore', description: 'Documentarista', photo: 'https://ui-avatars.com/api/?name=Michael+Moore&background=F59E0B&color=fff', category: 'contemporary' },
  ],

  relationships: {
    isGated: true,
    preview: 'ENFJs trazem calor, dedicação e visão inspiradora aos relacionamentos, mas precisam de parceiros que os lembrem de cuidar de si mesmos e aceitem sua necessidade de servir...',
    content: {
      romantic: {
        overview: 'ENFJs em relacionamentos românticos são parceiros calorosos, dedicados e profundamente comprometidos com o crescimento mútuo. Eles investem enormemente em seus parceiros, frequentemente vendo potencial que a outra pessoa nem reconhece. No entanto, precisam de parceiros que não apenas recebam esse cuidado, mas que também os cuidem de volta.',
        strengths: [
          'Dedicação profunda e compromisso inquebrantável',
          'Comunicação aberta e habilidade de expressar sentimentos',
          'Apoio ativo ao crescimento e sonhos do parceiro',
          'Criação de momentos significativos e experiências memoráveis',
          'Capacidade de resolver conflitos através de empatia e diálogo',
        ],
        challenges: [
          'Podem "projetar" quem querem que o parceiro seja ao invés de aceitar quem ele é',
          'Dificuldade extrema em dizer não ou estabelecer limites',
          'Levam críticas muito pessoalmente, mesmo quando construtivas',
          'Podem se tornar "pais" do parceiro ao invés de iguais',
          'Negligenciam próprias necessidades até atingir ponto de ruptura',
        ],
        tips: [
          'Pratique amor próprio tão ativamente quanto ama seu parceiro',
          'Aceite que mudança real vem de dentro - você pode apoiar, não forçar',
          'Comunique suas necessidades diretamente; parceiros não são leitores de mentes',
          'Valorize tempo sozinho para recarregar e reconectar com si mesmo',
          'Procure parceiros que celebrem sua natureza doadora mas também insistam em reciprocidade',
        ],
      },
      friendship: {
        overview: 'ENFJs são amigos leais, encorajadores e profundamente investidos no bem-estar de seus círculos sociais. Eles frequentemente se tornam o "coração" do grupo.',
        ideal: 'Outros NFs (especialmente INFPs e ENFPs) que compartilham valores profundos e foco em pessoas, ou NTs que oferecem perspectiva lógica complementar e os desafiam a pensar criticamente.',
        asAFriend: 'Sempre presentes em momentos difíceis, celebram sucessos genuinamente, conectam pessoas entre si, criam tradições e memórias de grupo, oferecem conselhos perspicazes.',
      },
      compatibility: {
        highest: ['INFP', 'ENFP', 'INTJ', 'INFJ'],
        challenging: ['ISTP', 'ESTP', 'ISTJ', 'ESTJ'],
        explanation: 'ENFJs se conectam melhor com tipos que valorizam profundidade emocional e crescimento pessoal. NFs compartilham valores; INTJs oferecem perspectiva estratégica complementar e admiram a visão do ENFJ.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ENFJs envolve desenvolver sua função inferior Ti e aprender a equilibrar cuidado dos outros com cuidado próprio...',
    content: {
      developingInferiorTi: {
        title: 'Desenvolvendo Pensamento Introvertido (Ti)',
        description: 'Ti inferior significa que ENFJs lutam com análise lógica impessoal e podem levar críticas como ataques pessoais. Desenvolvê-lo traz equilíbrio crucial.',
        practices: [
          'Praticar separar críticas ao seu trabalho/ideias de críticas a você como pessoa',
          'Dedicar tempo a hobbies que exigem lógica pura (quebra-cabeças, programação, xadrez)',
          'Questionar suas próprias suposições sobre pessoas e situações regularmente',
          'Pedir feedback específico e tangível, não apenas validação emocional',
          'Desenvolver sistemas e frameworks pessoais para tomada de decisões',
        ],
        signs: 'Ti saudável aparece como capacidade de receber crítica construtivamente, habilidade de analisar situações objetivamente mesmo quando emocionalmente envolvido, e confiança em raciocínio próprio independente de validação externa.',
      },
      balancingFunctions: {
        title: 'Equilibrando Fe-Ni com Se-Ti',
        description: 'ENFJs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        feNiBalance: 'Use Fe-Ni para inspirar e guiar outros, mas estabeleça limites claros para proteger sua própria energia e bem-estar.',
        seTiDevelopment: 'Cultive Se através de atenção ao presente e prazeres sensoriais. Desenvolva Ti através de pensamento crítico e análise lógica independente.',
      },
      commonTraps: {
        feNiLoop: {
          name: 'Loop Fe-Ni',
          description: 'Ficar obcecado com visão de como as pessoas "deveriam" ser, forçando crescimento em outros que não pediram ajuda.',
          escape: 'Engajar Se: focar no presente, aceitar pessoas como são agora. Usar Ti: questionar se sua "ajuda" é realmente desejada ou projeção.',
        },
        seGrip: {
          name: 'Grip de Se',
          description: 'Sob stress extremo, Se pode se tornar destrutivo: overindulgência sensorial, impulsividade, foco obsessivo em aparências físicas.',
          escape: 'Retornar a Fe saudável através de conexão genuína com outros. Usar Ni para reconectar com visão e propósito de longo prazo.',
        },
      },
      dailyPractices: [
        'Dedique pelo menos 30 minutos diários ao autocuidado não-negociável',
        'Pratique dizer "não" a pelo menos uma solicitação por semana',
        'Mantenha um diário para processar emoções próprias separadas das dos outros',
        'Estabeleça limites claros entre "tempo para outros" e "tempo para si"',
        'Busque feedback crítico objetivamente e resista ao impulso de defender-se imediatamente',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ENFJs prosperam em ambientes que valorizam pessoas, permitem liderança inspiradora, e focam em desenvolvimento e impacto positivo...',
    content: {
      asLeader: {
        style: 'Liderança Inspiradora e Transformacional',
        strengths: [
          'Líderes que genuinamente se importam com cada membro da equipe',
          'Criam visões inspiradoras que mobilizam pessoas em torno de objetivos comuns',
          'Excelentes em identificar e desenvolver talentos ocultos',
          'Constroem culturas de confiança, colaboração e crescimento mútuo',
        ],
        challenges: [
          'Podem ter dificuldade com decisões difíceis que machucam pessoas',
          'Tendência a evitar confrontos necessários para preservar harmonia',
          'Podem se esgotar tentando ser tudo para todos',
          'Dificuldade em separar desempenho de pessoa (criticar trabalho sem parecer rejeitar indivíduo)',
        ],
        tips: 'Delegue tarefas administrativas que drenam energia. Desenvolva "compaixão corajosa" - capacidade de ter conversas difíceis. Lembre-se que liderança efetiva às vezes requer desconforto temporário para bem maior.',
      },
      asTeamMember: {
        strengths: [
          'Animadores naturais que elevam moral do time',
          'Excelentes mediadores de conflitos interpessoais',
          'Criam conexões entre membros da equipe',
          'Voluntários entusiastas para projetos de desenvolvimento de equipe',
        ],
        challenges: [
          'Podem assumir responsabilidade emocional pelo bem-estar de toda equipe',
          'Dificuldade em separar feedback profissional de rejeição pessoal',
          'Podem se sentir frustrados com colegas que priorizam tarefas sobre pessoas',
          'Tendência a overcommit e assumir trabalho dos outros',
        ],
        tips: 'Estabeleça limites claros sobre seu papel vs. terapeuta da equipe. Pratique receber críticas como dados, não ataques. Deixe colegas enfrentarem consequências de suas escolhas.',
      },
      idealEnvironment: {
        culture: 'Cultura focada em pessoas, com valores claros, oportunidades de mentoria, e missão que contribui positivamente para sociedade',
        structure: 'Autonomia para liderar iniciativas, papéis que combinam estratégia com contato humano, reconhecimento de contribuições',
        challenges: 'Problemas que envolvem desenvolvimento humano, mudança cultural, construção de equipes de alto desempenho',
        avoid: 'Ambientes puramente transacionais, culturas tóxicas ou politicamente carregadas, papéis que exigem distanciamento emocional constante',
      },
      conflictResolution: {
        approach: 'ENFJs abordam conflitos buscando restaurar harmonia através de empatia mútua e encontrar soluções que honrem necessidades de todos',
        tips: [
          'Lembre-se que evitar conflito frequentemente piora a situação',
          'Não absorva emoções de todos os lados - mantenha sua própria perspectiva',
          'Use Ti para analisar situação objetivamente antes de intervir emocionalmente',
          'Às vezes a melhor resolução não agrada a todos - e tudo bem',
        ],
      },
    },
  },
};
