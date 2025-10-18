import { PersonalityType } from '../../types/personality';

export const ISFJ: PersonalityType = {
  code: 'ISFJ',
  nickname: 'O Defensor',
  tagline: 'Protetores dedicados e calorosos, sempre prontos a defender seus entes queridos',
  tags: ['Protetor', 'Dedicado', 'Caloroso', 'Leal'],
  population: '9-14% da população (um dos mais comuns)',
  group: 'Sentinels',

  colorScheme: {
    primary: '#0891B2',
    secondary: '#0E7490',
    light: '#CFFAFE',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ISFJs são os guardiões silenciosos da sociedade, os pilares de força e confiabilidade que mantêm as estruturas sociais funcionando harmoniosamente. Movidos por um senso profundo de responsabilidade e um desejo genuíno de cuidar dos outros, eles trabalham incansavelmente nos bastidores para garantir que todos ao seu redor estejam seguros, confortáveis e cuidados. Enquanto outros buscam os holofotes, ISFJs encontram satisfação em saber que fizeram diferença tangível na vida das pessoas que amam.

Sua memória excepcional para detalhes sobre as pessoas - aniversários, preferências, histórias pessoais, necessidades não expressas - permite que eles ofereçam um tipo de cuidado profundamente personalizado e atencioso. Para o ISFJ, nenhum ato de serviço é pequeno demais se puder trazer conforto ou alegria a alguém. Eles são os que lembram como você gosta do café, que notam quando você está tendo um dia difícil antes mesmo de você mencionar, e que aparecem com exatamente o que você precisa no momento certo.

No entanto, essa dedicação abnegada aos outros vem com seus desafios. ISFJs frequentemente negligenciam suas próprias necessidades em favor das necessidades dos outros, têm dificuldade em dizer não, e podem se sobrecarregar com responsabilidades. Sua aversão a conflitos e mudanças pode fazer com que permaneçam em situações prejudiciais por muito tempo, e seu perfeccionismo silencioso pode levar ao esgotamento quando sentem que não estão fazendo o suficiente.

O verdadeiro poder do ISFJ está em sua capacidade de criar estabilidade e harmonia duradouras, de preservar o que é valioso do passado enquanto nutrem o presente, e de demonstrar que a verdadeira força está em servir aos outros com amor, consistência e integridade inabalável.`,

    quote: {
      text: 'Não é o quanto fazemos, mas quanto amor colocamos no que fazemos que realmente importa.',
      author: 'Madre Teresa de Calcutá',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Si',
      fullName: 'Sensação Introvertida',
      icon: '📚',
      description: 'A função dominante Si armazena experiências vividas com detalhes ricos, criando um vasto banco de dados interno de memórias, sensações e conhecimento prático. ISFJs confiam no que foi testado e comprovado.',
      details: 'Se manifesta como memória excepcional para detalhes, preferência por métodos estabelecidos, apreciação por tradições, e habilidade de notar mudanças sutis no ambiente ou nas pessoas. ISFJs aprendem profundamente com a experiência passada.',
    },
    {
      position: 'auxiliary',
      name: 'Fe',
      fullName: 'Sentimento Extrovertido',
      icon: '❤️',
      description: 'A função auxiliar Fe sintoniza ISFJs às necessidades emocionais dos outros e ao clima social do ambiente. Ela os motiva a criar harmonia e cuidar do bem-estar coletivo.',
      details: 'Aparece como empatia natural, habilidade de ler as emoções dos outros, desejo de manter a paz, e necessidade de ser útil e de contribuir positivamente para a vida das pessoas. ISFJs sentem-se realizados quando outros estão felizes.',
    },
    {
      position: 'tertiary',
      name: 'Ti',
      fullName: 'Pensamento Introvertido',
      icon: '🧠',
      description: 'A função terciária Ti fornece análise lógica interna e busca por consistência. Em ISFJs, está menos desenvolvida mas pode emergir em decisões pessoais importantes.',
      details: 'Pode aparecer como necessidade ocasional de entender "por que" algo funciona, desenvolvimento de sistemas pessoais organizados, ou questionamento interno de regras que parecem ilógicas.',
    },
    {
      position: 'inferior',
      name: 'Ne',
      fullName: 'Intuição Extrovertida',
      icon: '✨',
      description: 'A função inferior Ne lida com possibilidades futuras e mudanças. Para ISFJs, esta é a função mais desafiadora e menos desenvolvida, causando ansiedade sobre o desconhecido.',
      details: 'ISFJs frequentemente se sentem desconfortáveis com mudanças súbitas, podem ficar ansiosos sobre possibilidades futuras negativas, e preferem o conhecido e familiar ao novo e incerto.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Confiabilidade Excepcional',
        description: 'Quando um ISFJ assume um compromisso, você pode ter certeza absoluta de que será cumprido. Eles são a definição de "rocha" em quem todos podem contar.',
        icon: '🛡️',
      },
      {
        title: 'Memória Extraordinária para Detalhes Pessoais',
        description: 'Capacidade notável de lembrar detalhes sobre as pessoas - suas preferências, histórias, datas importantes - e usar essas informações para cuidar delas.',
        icon: '🧠',
      },
      {
        title: 'Empatia e Sensibilidade Profundas',
        description: 'Capacidade natural de perceber como os outros estão se sentindo e responder com compaixão genuína e suporte prático.',
        icon: '💝',
      },
      {
        title: 'Dedicação ao Serviço',
        description: 'Encontram satisfação genuína em ajudar os outros e melhorar suas vidas através de ações práticas e concretas.',
        icon: '🤝',
      },
      {
        title: 'Organização e Atenção aos Detalhes',
        description: 'Habilidade excepcional de manter sistemas organizados, gerenciar múltiplos detalhes simultaneamente, e garantir que nada seja esquecido.',
        icon: '📋',
      },
    ],
    gated: [
      {
        title: 'Lealdade Inabalável',
        description: 'Uma vez que estabelecem um relacionamento, ISFJs são incrivelmente leais e estarão ao seu lado em tempos bons e difíceis.',
        icon: '🦁',
      },
      {
        title: 'Trabalho Árduo e Ética Profissional',
        description: 'Disposição excepcional para fazer o que for necessário, trabalhar longas horas, e ir além do esperado para cumprir responsabilidades.',
        icon: '💪',
      },
      {
        title: 'Habilidade de Criar Ambientes Acolhedores',
        description: 'Talento natural para transformar espaços em lugares calorosos, confortáveis e harmoniosos onde as pessoas se sentem seguras.',
        icon: '🏡',
      },
      {
        title: 'Paciência Extraordinária',
        description: 'Capacidade de permanecer calmos, consistentes e suportivos mesmo em situações prolongadamente difíceis ou estressantes.',
        icon: '⏳',
      },
      {
        title: 'Observação Atenta',
        description: 'Notam mudanças sutis no comportamento, humor ou ambiente que outros perdem, permitindo resposta proativa às necessidades.',
        icon: '👁️',
      },
      {
        title: 'Preservação de Tradições Valiosas',
        description: 'Mantêm vivas práticas, rituais e conhecimentos importantes, conectando passado e presente de forma significativa.',
        icon: '📿',
      },
      {
        title: 'Humildade Genuína',
        description: 'Não buscam reconhecimento ou crédito pelo que fazem; a satisfação vem de ver o impacto positivo de suas ações.',
        icon: '🕊️',
      },
      {
        title: 'Habilidades Práticas Diversas',
        description: 'Acumulam amplo conhecimento prático em múltiplas áreas através da experiência, tornando-se verdadeiros "faz-tudo".',
        icon: '🔧',
      },
      {
        title: 'Estabilidade Emocional',
        description: 'Fornecem presença calma e estabilizadora em meio ao caos, ajudando outros a se sentirem ancorados e seguros.',
        icon: '⚓',
      },
      {
        title: 'Discrição e Confidencialidade',
        description: 'Extremamente confiáveis com informações sensíveis; as pessoas sabem que podem confiar seus segredos a um ISFJ.',
        icon: '🤐',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Negligência das Próprias Necessidades',
        description: 'Tendência crônica a priorizar o bem-estar dos outros sobre o próprio, levando ao esgotamento e ressentimento acumulado.',
      },
      {
        title: 'Dificuldade Extrema em Dizer Não',
        description: 'Sentem-se obrigados a ajudar sempre que solicitados, mesmo quando já sobrecarregados ou quando o pedido é injusto.',
      },
      {
        title: 'Resistência a Mudanças',
        description: 'Forte preferência pelo familiar e testado pode fazer com que resistam a mudanças necessárias ou oportunidades de crescimento.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Internalização de Críticas',
          description: 'Levam críticas muito a sério e pessoalmente, ruminando sobre elas e questionando seu próprio valor.',
          mitigation: 'Praticar auto-compaixão, separar ações de identidade, buscar feedback equilibrado de pessoas confiáveis, lembrar que perfeição é impossível.',
        },
        {
          title: 'Relutância em Compartilhar Opiniões',
          description: 'Hesitam em expressar suas próprias necessidades, opiniões ou desacordos por medo de criar conflito ou desagradar.',
          mitigation: 'Começar compartilhando opiniões sobre tópicos de baixo risco, lembrar que desacordo saudável fortalece relacionamentos, praticar assertividade gradualmente.',
        },
        {
          title: 'Sobrecarga com Responsabilidades',
          description: 'Assumem mais e mais até estarem completamente sobrecarregados, incapazes de pedir ajuda ou delegar.',
          mitigation: 'Estabelecer limites claros, praticar delegar, reconhecer que pedir ajuda não é fraqueza, avaliar capacidade honestamente antes de assumir mais.',
        },
        {
          title: 'Perfeccionismo Silencioso',
          description: 'Padrões internos extremamente altos para si mesmos, nunca sentindo que fazem o suficiente ou são suficientemente bons.',
          mitigation: 'Definir padrões realistas, reconhecer que "bom o suficiente" é frequentemente suficiente, celebrar pequenas vitórias, aceitar imperfeições.',
        },
        {
          title: 'Retenção de Relacionamentos Tóxicos',
          description: 'Lealdade excessiva pode fazer com que permaneçam em relacionamentos prejudiciais muito além do saudável.',
          mitigation: 'Reconhecer que lealdade não significa aceitar maus-tratos, buscar perspectivas externas, priorizar segurança e bem-estar próprios, estabelecer limites firmes.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Enfermeiro/Profissional de Saúde',
        description: 'Cuidar diretamente de pacientes, combinar conhecimento médico prático com compaixão genuína, fazer diferença tangível na recuperação das pessoas.',
        icon: '⚕️',
        fit: 'Ideal para Si-Fe: cuidado detalhado, rotinas estabelecidas, impacto humano direto, uso de habilidades práticas.',
      },
      {
        title: 'Professor (Fundamental ou Especial)',
        description: 'Educar e nutrir crianças, criar ambientes de aprendizado seguros e estruturados, acompanhar desenvolvimento individual.',
        icon: '👨‍🏫',
        fit: 'Combina paciência natural, atenção aos detalhes de cada aluno, e satisfação de ajudar outros a crescerem.',
      },
      {
        title: 'Assistente Social',
        description: 'Apoiar indivíduos e famílias vulneráveis, conectá-los com recursos, defender seus direitos e bem-estar.',
        icon: '🤲',
        fit: 'Permite usar empatia e habilidades práticas para fazer diferença real em vidas que precisam de ajuda.',
      },
      {
        title: 'Bibliotecário',
        description: 'Organizar e preservar conhecimento, ajudar pessoas a encontrar informações, criar espaços calmos e organizados.',
        icon: '📚',
        fit: 'Combina amor por organização, atenção aos detalhes, ambiente estruturado e serviço à comunidade.',
      },
      {
        title: 'Designer de Interiores',
        description: 'Criar espaços funcionais e acolhedores que atendam às necessidades específicas dos clientes.',
        icon: '🎨',
        fit: 'Usa atenção aos detalhes, memória para preferências dos clientes, e talento para criar ambientes harmoniosos.',
      },
    ],
    gated: [
      {
        title: 'Gerente de Escritório/Administrador',
        description: 'Manter operações organizadas, gerenciar múltiplos detalhes, garantir que processos funcionem suavemente.',
        icon: '💼',
        fit: 'Excelente uso de habilidades organizacionais, confiabilidade e atenção aos detalhes.',
        details: 'ISFJs criam sistemas eficientes e mantêm ambientes de trabalho harmoniosos onde todos sabem o que esperar.',
      },
      {
        title: 'Conselheiro/Terapeuta',
        description: 'Oferecer suporte emocional, ouvir com empatia, ajudar clientes através de processos estruturados de cura.',
        icon: '🗣️',
        fit: 'Profunda empatia, paciência, e habilidade de criar espaço seguro para vulnerabilidade.',
        details: 'Particularmente eficazes em abordagens terapêuticas estruturadas e práticas, oferecendo consistência reconfortante.',
      },
      {
        title: 'Nutricionista/Dietista',
        description: 'Ajudar pessoas a melhorar saúde através de nutrição, criar planos personalizados, educar sobre hábitos saudáveis.',
        icon: '🥗',
        fit: 'Combina conhecimento prático, atenção a detalhes individuais, e desejo de melhorar bem-estar.',
        details: 'ISFJs lembram preferências e restrições de cada cliente, ajustando planos com cuidado personalizado.',
      },
      {
        title: 'Veterinário/Técnico Veterinário',
        description: 'Cuidar de animais, tranquilizar donos preocupados, combinar habilidades técnicas com compaixão.',
        icon: '🐾',
        fit: 'Paciência, cuidado atencioso, capacidade de trabalhar com protocolos estabelecidos.',
        details: 'Excelente memória para históricos de pacientes animais e habilidade de acalmar animais nervosos.',
      },
      {
        title: 'Recursos Humanos',
        description: 'Cuidar do bem-estar dos funcionários, resolver conflitos, manter políticas organizacionais justas.',
        icon: '👥',
        fit: 'Empatia, discrição, atenção às necessidades individuais dentro de estruturas organizacionais.',
        details: 'ISFJs criam ambientes onde funcionários se sentem ouvidos e cuidados, mantendo processos justos.',
      },
    ],
  },

  famousPeople: [
    { name: 'Madre Teresa', description: 'Missionária e Santa', photo: 'https://ui-avatars.com/api/?name=Madre+Teresa&background=0891B2&color=fff', category: 'contemporary' },
    { name: 'Rainha Elizabeth II', description: 'Monarca Britânica', photo: 'https://ui-avatars.com/api/?name=Elizabeth+II&background=0891B2&color=fff', category: 'contemporary' },
    { name: 'Beyoncé', description: 'Cantora e Empresária', photo: 'https://ui-avatars.com/api/?name=Beyonce&background=0891B2&color=fff', category: 'contemporary' },
    { name: 'Kate Middleton', description: 'Princesa de Gales', photo: 'https://ui-avatars.com/api/?name=Kate+Middleton&background=0891B2&color=fff', category: 'contemporary' },
    { name: 'Jimmy Carter', description: 'Ex-Presidente e Humanitário', photo: 'https://ui-avatars.com/api/?name=Jimmy+Carter&background=0891B2&color=fff', category: 'contemporary' },
    { name: 'Rosa Parks', description: 'Ativista dos Direitos Civis', photo: 'https://ui-avatars.com/api/?name=Rosa+Parks&background=0891B2&color=fff', category: 'contemporary' },
    { name: 'Selena Gomez', description: 'Atriz e Cantora', photo: 'https://ui-avatars.com/api/?name=Selena+Gomez&background=0891B2&color=fff', category: 'contemporary' },
    { name: 'Tiger Woods', description: 'Golfista Profissional', photo: 'https://ui-avatars.com/api/?name=Tiger+Woods&background=0891B2&color=fff', category: 'contemporary' },
    { name: 'Anne Hathaway', description: 'Atriz', photo: 'https://ui-avatars.com/api/?name=Anne+Hathaway&background=0891B2&color=fff', category: 'contemporary' },
    { name: 'Vin Diesel', description: 'Ator e Produtor', photo: 'https://ui-avatars.com/api/?name=Vin+Diesel&background=0891B2&color=fff', category: 'contemporary' },
  ],

  relationships: {
    isGated: true,
    preview: 'ISFJs trazem lealdade profunda, cuidado atencioso e estabilidade inabalável aos relacionamentos, mas precisam de parceiros que valorizem sua dedicação e os encorajem a cuidar de si mesmos...',
    content: {
      romantic: {
        overview: 'ISFJs em relacionamentos românticos são parceiros incrivelmente dedicados, atentos e leais que demonstram amor através de ações práticas e cuidado consistente. Eles lembram de todos os pequenos detalhes que importam para seu parceiro e trabalham incansavelmente para criar um lar harmonioso e acolhedor. No entanto, sua tendência a negligenciar suas próprias necessidades e dificuldade em expressar insatisfação pode criar desequilíbrios.',
        strengths: [
          'Lealdade e comprometimento profundos e duradouros',
          'Atenção excepcional às necessidades e preferências do parceiro',
          'Criação de ambiente doméstico estável, confortável e harmonioso',
          'Demonstração de amor através de ações práticas e cuidado diário',
          'Paciência extraordinária e disposição para trabalhar através de dificuldades',
        ],
        challenges: [
          'Dificuldade em expressar suas próprias necessidades e insatisfações',
          'Tendência a fazer tudo pelo parceiro, criando desequilíbrio',
          'Podem levar críticas muito a sério e ruminar sobre conflitos',
          'Resistência a mudanças necessárias no relacionamento',
          'Pode permanecer em relacionamentos não saudáveis por lealdade excessiva',
        ],
        tips: [
          'Pratique comunicar suas necessidades claramente - parceiros não podem ler mentes',
          'Estabeleça limites saudáveis e mantenha alguma independência',
          'Lembre-se que conflito saudável fortalece relacionamentos',
          'Permita que o parceiro cuide de você também - relacionamentos são via dupla',
          'Escolha parceiros que demonstrem apreço genuíno e reciproquem seu cuidado',
        ],
      },
      friendship: {
        overview: 'ISFJs formam amizades profundas e duradouras baseadas em lealdade, confiança mútua e histórias compartilhadas. Eles são os amigos que aparecem quando você precisa, que lembram de detalhes importantes da sua vida, e que oferecem suporte prático e emocional consistente.',
        ideal: 'Outros SJs (especialmente ESFJs e ISTJs) que compartilham valores de lealdade e tradição, ou NFs que apreciem profundamente a dedicação do ISFJ.',
        asAFriend: 'Incrivelmente confiável, leal até o fim, lembra de datas e detalhes importantes, oferece ajuda prática sem ser pedida, ouvinte empático e suportivo.',
      },
      compatibility: {
        highest: ['ESFP', 'ESTP', 'ISFP', 'ENFJ'],
        challenging: ['ENTP', 'INTP', 'ENTJ', 'INTJ'],
        explanation: 'ISFJs se conectam melhor com tipos que apreciam seu cuidado e reciprocam com apreço tangível. Pares SF oferecem valores compartilhados, enquanto ENFJs trazem visão complementar sem desconsiderar tradições.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ISFJs envolve desenvolver sua função inferior Ne e aprender a equilibrar serviço aos outros com autocuidado saudável...',
    content: {
      developingInferiorNe: {
        title: 'Desenvolvendo Intuição Extrovertida (Ne)',
        description: 'Ne inferior significa que ISFJs podem ficar ansiosos sobre mudanças e possibilidades futuras. Desenvolvê-la permite maior flexibilidade e abertura ao novo.',
        practices: [
          'Experimentar pequenas mudanças regularmente para construir tolerância ao novo',
          'Praticar brainstorming sem julgamento - explorar possibilidades sem comprometer-se',
          'Desafiar pensamentos catastróficos sobre o futuro com probabilidades realistas',
          'Buscar ativamente uma nova experiência por mês (restaurante, rota, hobby)',
          'Conversar com pessoas com perspectivas diferentes para expandir possibilidades',
        ],
        signs: 'Ne saudável aparece como maior conforto com mudanças, capacidade de ver múltiplas possibilidades positivas, e menos ansiedade sobre o desconhecido.',
      },
      balancingFunctions: {
        title: 'Equilibrando Si-Fe com Ti-Ne',
        description: 'ISFJs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        siFeBalance: 'Use Si-Fe para cuidar dos outros e manter tradições valiosas, mas estabeleça limites para evitar esgotamento e martírio.',
        tiNeDevelopment: 'Cultive Ti questionando ocasionalmente se regras ou métodos ainda fazem sentido. Desenvolva Ne através de abertura gradual a novas experiências.',
      },
      commonTraps: {
        siFeLoop: {
          name: 'Loop Si-Fe',
          description: 'Ficar preso em ciclo de cuidar excessivamente dos outros baseado em "como as coisas sempre foram", ignorando suas próprias necessidades completamente.',
          escape: 'Engajar Ti perguntando "isso realmente faz sentido para MIM?", e Ne explorando novas formas de ajudar que não sacrifiquem seu bem-estar.',
        },
        neGrip: {
          name: 'Grip de Ne',
          description: 'Sob stress extremo, Ne pode emergir de forma negativa: vendo apenas possibilidades catastróficas, paranoia sobre mudanças futuras, visão de que tudo dará errado.',
          escape: 'Retornar a Si - reconectar com experiências passadas onde você superou desafios, engajar sentidos com atividades confortáveis e familiares.',
        },
      },
      dailyPractices: [
        'Reserve 30 minutos diários não-negociáveis para autocuidado sem culpa',
        'Pratique dizer não a pelo menos uma solicitação pequena por semana',
        'Mantenha um diário reconhecendo suas próprias conquistas e necessidades',
        'Experimente uma pequena mudança em sua rotina semanalmente',
        'Compartilhe uma opinião ou necessidade pessoal com alguém de confiança',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ISFJs prosperam em ambientes estruturados que valorizam confiabilidade, permitem ajudar outros, e oferecem reconhecimento por trabalho consistente...',
    content: {
      asLeader: {
        style: 'Liderança Servidora',
        strengths: [
          'Líderes que realmente se importam com o bem-estar de cada membro da equipe',
          'Criam ambientes estáveis e harmoniosos onde as pessoas se sentem seguras',
          'Lideram pelo exemplo através de trabalho árduo e dedicação consistente',
          'Lembram detalhes pessoais sobre cada funcionário e demonstram cuidado genuíno',
        ],
        challenges: [
          'Podem evitar conflitos necessários para manter harmonia superficial',
          'Dificuldade em dar feedback negativo mesmo quando necessário',
          'Tendência a assumir muito trabalho ao invés de delegar efetivamente',
          'Podem resistir a mudanças organizacionais necessárias',
        ],
        tips: 'Desenvolva habilidades de feedback construtivo. Lembre-se que abordar problemas cedo previne crises maiores. Delegue confiando na competência da equipe. Balance tradição com adaptação necessária.',
      },
      asTeamMember: {
        strengths: [
          'Extremamente confiáveis e consistentes - o "pilar" da equipe',
          'Atenção excepcional aos detalhes e garantia de qualidade',
          'Dispostos a fazer o que for necessário para o sucesso do time',
          'Mantêm harmonia e apoiam colegas em dificuldades',
        ],
        challenges: [
          'Podem assumir trabalho demais e não pedir ajuda',
          'Dificuldade em se adaptar quando processos estabelecidos mudam',
          'Podem não compartilhar ideias valiosas por medo de desafiar status quo',
          'Levam críticas muito a sério, mesmo quando construtivas',
        ],
        tips: 'Comunique quando estiver sobrecarregado. Veja mudanças como oportunidades, não ameaças. Suas ideias são valiosas - compartilhe-as. Separe crítica ao trabalho de crítica pessoal.',
      },
      idealEnvironment: {
        culture: 'Ambiente de respeito mútuo onde contribuições são reconhecidas e trabalho árduo é valorizado',
        structure: 'Processos claros e estabelecidos, expectativas definidas, hierarquia respeitosa',
        challenges: 'Trabalho significativo que ajuda pessoas diretamente ou contribui visivelmente para bem maior',
        avoid: 'Mudanças constantes e caóticas, falta de reconhecimento, ambientes altamente competitivos ou conflituosos',
      },
      conflictResolution: {
        approach: 'ISFJs tendem a evitar conflitos, mas quando forçados, buscam soluções que restaurem harmonia',
        tips: [
          'Lembre-se que conflito abordado cedo é mais fácil de resolver que conflito acumulado',
          'Pratique expressar desconforto antes que se torne ressentimento',
          'Use "eu sinto" ao invés de acusações para comunicar problemas',
          'Reconheça que discordância não significa que o relacionamento está em perigo',
        ],
      },
    },
  },
};
