import { PersonalityType } from '../../types/personality';

export const ESFJ: PersonalityType = {
  code: 'ESFJ',
  nickname: 'O Cônsul',
  tagline: 'Pessoas atenciosas e populares, sempre dispostas a ajudar',
  tags: ['Atencioso', 'Sociável', 'Organizado', 'Leal'],
  population: '9-13% da população',
  group: 'sentinels',

  colorScheme: {
    primary: '#BE185D',
    secondary: '#9F1239',
    light: '#FCE7F3',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ESFJs são os pilares da comunidade, os organizadores naturais de eventos sociais, e os cuidadores incansáveis que garantem que todos ao seu redor estejam bem. Movidos por um desejo genuíno de servir e criar harmonia, eles constroem pontes entre pessoas e transformam grupos em famílias. Enquanto outros podem ver interações sociais como dreno de energia, ESFJs as veem como a própria essência da vida - oportunidades de fazer diferença e criar conexões significativas.

Sua mente funciona como um radar social sofisticado, constantemente sintonizado nas necessidades, sentimentos e dinâmicas das pessoas ao seu redor. Para o ESFJ, não existe gesto pequeno demais ou pessoa sem importância; cada indivíduo merece ser visto, valorizado e cuidado. Eles são mestres em criar ambientes acolhedores onde todos se sentem incluídos e importantes.

No entanto, essa dedicação aos outros vem com seus desafios. ESFJs podem se perder tanto em atender às necessidades alheias que negligenciam as próprias. Eles frequentemente lutam com críticas, mesmo construtivas, levando-as profundamente ao coração. Podem também resistir a mudanças que perturbem a harmonia ou tradições estabelecidas, preferindo o conforto do conhecido.

O verdadeiro poder do ESFJ está em sua capacidade de nutrir talentos nos outros, de criar comunidades coesas a partir de indivíduos isolados, e de manter o tecido social que mantém grupos unidos. Eles são os organizadores invisíveis que fazem tudo funcionar perfeitamente, os anfitriões que garantem que ninguém se sinta excluído, e os cuidadores que lembram que no centro de toda grande conquista estão pessoas que precisam ser valorizadas.`,

    quote: {
      text: 'Você não mudou o mundo até que tenha mudado a vida de uma pessoa.',
      author: 'Provérbio',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Fe',
      fullName: 'Sentimento Extrovertido',
      icon: '❤️',
      description: 'A função dominante Fe cria harmonia e conexão emocional com outros. ESFJs leem naturalmente as atmosferas sociais e ajustam seu comportamento para promover bem-estar coletivo e unidade.',
      manifestation: 'Se manifesta como consciência aguçada das emoções alheias, necessidade de aprovação social, e habilidade natural de fazer outros se sentirem valorizados e confortáveis. ESFJs sabem instintivamente o que dizer para elevar o ânimo.',
    },
    {
      position: 'auxiliary',
      name: 'Si',
      fullName: 'Sensação Introvertida',
      icon: '📚',
      description: 'A função auxiliar Si armazena experiências passadas e valoriza tradições comprovadas. Ela fornece ao Fe um framework estável de "como as coisas devem ser feitas" baseado no que funcionou antes.',
      manifestation: 'Aparece como respeito por tradições, apreciação por rituais familiares, atenção aos detalhes práticos, e preferência por métodos testados. ESFJs criam estabilidade através de rotinas e costumes.',
    },
    {
      position: 'tertiary',
      name: 'Ne',
      fullName: 'Intuição Extrovertida',
      icon: '✨',
      description: 'A função terciária Ne permite ver possibilidades e conexões alternativas. Em ESFJs, está menos desenvolvida, mas pode fornecer criatividade ocasional e flexibilidade.',
      manifestation: 'Pode aparecer como brainstorming de ideias para eventos, consideração de perspectivas diferentes, ou capacidade de adaptar planos quando necessário. ESFJs maduros usam Ne para evitar rigidez excessiva.',
    },
    {
      position: 'inferior',
      name: 'Ti',
      fullName: 'Pensamento Introvertido',
      icon: '🧠',
      description: 'A função inferior Ti lida com lógica impessoal e análise objetiva. Para ESFJs, esta é a função mais desafiadora e menos desenvolvida.',
      manifestation: 'ESFJs podem sentir-se inseguros em discussões puramente lógicas, preferem decisões baseadas em valores humanos sobre análise fria, e podem levar críticas lógicas como ataques pessoais.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Habilidades Sociais Excepcionais',
        description: 'Capacidade extraordinária de ler pessoas, criar conexões genuínas, e fazer todos se sentirem bem-vindos e valorizados.',
        icon: '🤝',
      },
      {
        title: 'Organização e Responsabilidade',
        description: 'Excelentes em gerenciar detalhes práticos, manter estruturas funcionando, e garantir que nada importante seja esquecido.',
        icon: '📋',
      },
      {
        title: 'Lealdade Profunda',
        description: 'Comprometimento inabalável com pessoas e causas importantes, disposição de fazer sacrifícios pessoais pelo bem dos outros.',
        icon: '🛡️',
      },
      {
        title: 'Empatia e Compaixão',
        description: 'Sensibilidade genuína às necessidades emocionais dos outros e desejo autêntico de aliviar sofrimento e promover felicidade.',
        icon: '💝',
      },
      {
        title: 'Confiabilidade Consistente',
        description: 'Sempre aparecem, sempre cumprem promessas, sempre podem ser contados quando necessário.',
        icon: '⭐',
      },
    ],
    gated: [
      {
        title: 'Construção de Comunidade',
        description: 'Talento natural para unir pessoas diferentes, criar senso de pertencimento, e transformar grupos em famílias coesas.',
        icon: '🏘️',
      },
      {
        title: 'Gestão de Relacionamentos',
        description: 'Lembram detalhes importantes sobre cada pessoa, nutrem conexões ao longo do tempo, e mantêm redes sociais vibrantes.',
        icon: '🌐',
      },
      {
        title: 'Criação de Ambientes Acolhedores',
        description: 'Habilidade de transformar qualquer espaço em lugar aconchegante onde pessoas se sentem seguras e confortáveis.',
        icon: '🏡',
      },
      {
        title: 'Facilitação de Harmonia',
        description: 'Expertises em mediar conflitos, encontrar terreno comum, e restaurar paz em situações tensas.',
        icon: '☮️',
      },
      {
        title: 'Atenção aos Detalhes Pessoais',
        description: 'Notam e lembram pequenos detalhes sobre preferências, gostos e necessidades individuais de cada pessoa.',
        icon: '🎁',
      },
      {
        title: 'Planejamento de Eventos',
        description: 'Mestres em organizar celebrações, reuniões e eventos que criam memórias duradouras e fortalecem vínculos.',
        icon: '🎉',
      },
      {
        title: 'Nutrição de Talentos',
        description: 'Veem o potencial nos outros e ativamente encorajam, apoiam e celebram o crescimento alheio.',
        icon: '🌱',
      },
      {
        title: 'Estabilidade Emocional',
        description: 'Fornecem ancoragem emocional para outros, mantendo calma e positividade mesmo em tempos difíceis.',
        icon: '⚓',
      },
      {
        title: 'Tradição e Continuidade',
        description: 'Preservam rituais significativos, passam valores importantes, e criam senso de história compartilhada.',
        icon: '📖',
      },
      {
        title: 'Serviço Prático',
        description: 'Não apenas se importam em teoria - tomam ações concretas para ajudar, desde refeições caseiras até ajuda com tarefas.',
        icon: '🍲',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Necessidade Excessiva de Aprovação',
        description: 'Dependência da validação externa para autoestima, dificuldade em tomar decisões que podem desagradar outros.',
        impact: 'Sacrifício das próprias necessidades, exaustão emocional, ressentimento acumulado por não poder dizer não.',
      },
      {
        title: 'Sensibilidade Extrema a Críticas',
        description: 'Levam feedback negativo profundamente ao coração, mesmo quando é construtivo e bem-intencionado.',
        impact: 'Defensividade, evitar situações onde podem ser criticados, dificuldade em crescer através de feedback.',
      },
      {
        title: 'Resistência a Mudanças',
        description: 'Preferência forte por tradições e métodos estabelecidos, desconforto com inovações que perturbem a ordem.',
        impact: 'Perda de oportunidades, dificuldade em adaptar-se a novos ambientes, conflitos com tipos mais inovadores.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Negligência das Próprias Necessidades',
          description: 'Tão focados em cuidar dos outros que ignoram sua própria saúde física, emocional e mental.',
          impact: 'Burnout, ressentimento não expresso, deterioração da saúde, relacionamentos desequilibrados.',
          mitigation: 'Agendar "tempo para si" como compromisso não-negociável, praticar dizer "não", desenvolver hobbies pessoais que não envolvam cuidar de outros.',
        },
        {
          title: 'Dificuldade com Análise Impessoal',
          description: 'Lutam para separar questões lógicas de sentimentos pessoais, tornando decisões objetivas desafiadoras.',
          impact: 'Decisões subótimas baseadas em quem pode ser magoado, dificuldade em ambientes corporativos frios.',
          mitigation: 'Desenvolver Ti consultando fontes objetivas, praticar análise de prós/contras sem considerar pessoas, buscar mentores que pensam analiticamente.',
        },
        {
          title: 'Tendência ao Controle',
          description: 'Quando ansiosos, podem tentar controlar ambientes e pessoas para manter harmonia e ordem.',
          impact: 'Relacionamentos sufocados, conflitos sobre autonomia, reputação de "mandões" ou "controladores".',
          mitigation: 'Reconhecer ansiedade subjacente, confiar que outros podem cuidar de si mesmos, praticar soltar controle em áreas não-críticas.',
        },
        {
          title: 'Julgamento Rápido de Comportamento Social',
          description: 'Podem ser críticos de pessoas que violam normas sociais ou não seguem tradições valorizadas.',
          impact: 'Conflitos com tipos mais não-convencionais, rigidez social, dificuldade em aceitar diferenças.',
          mitigation: 'Desenvolver Ne explorando perspectivas diferentes, questionar de onde vêm suas normas, praticar aceitação de diferentes estilos de vida.',
        },
        {
          title: 'Preocupação Excessiva com Status Social',
          description: 'Podem valorizar demais aparências, reputação e o que outros pensam, levando a decisões baseadas em imagem.',
          impact: 'Autenticidade comprometida, stress sobre manter aparências, dificuldade em expressar opiniões impopulares.',
          mitigation: 'Cultivar círculo íntimo que aceita autenticidade, questionar "por que isso importa?", definir valores pessoais além de expectativas sociais.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Professor/Educador',
        description: 'Ensinar crianças ou adultos, criar ambientes de aprendizagem positivos, nutrir desenvolvimento de estudantes.',
        icon: '👩‍🏫',
        fit: 'Combina amor por ajudar outros crescer com estrutura organizada e interação social diária.',
      },
      {
        title: 'Enfermeiro/Profissional de Saúde',
        description: 'Cuidar diretamente de pacientes, fornecer suporte emocional além de cuidados médicos.',
        icon: '⚕️',
        fit: 'Atende necessidade de servir outros de maneira tangível e fazer diferença na vida das pessoas.',
      },
      {
        title: 'Organizador de Eventos',
        description: 'Planejar casamentos, conferências, celebrações - criar experiências memoráveis para outros.',
        icon: '🎊',
        fit: 'Usa habilidades organizacionais e sociais, resulta em alegria visível das pessoas.',
      },
      {
        title: 'Assistente Social',
        description: 'Ajudar indivíduos e famílias a navegar desafios, conectar pessoas a recursos necessários.',
        icon: '🤲',
        fit: 'Missão clara de ajudar vulneráveis, trabalho orientado a pessoas, impacto comunitário direto.',
      },
      {
        title: 'Gerente de Escritório',
        description: 'Manter operações funcionando suavemente, coordenar equipes, garantir que todos tenham o que precisam.',
        icon: '💼',
        fit: 'Combina organização, habilidades interpessoais, e gosto por estrutura e ordem.',
      },
    ],
    gated: [
      {
        title: 'Recursos Humanos/Gerente de Pessoas',
        description: 'Recrutar, treinar e apoiar funcionários, resolver conflitos, criar cultura organizacional positiva.',
        icon: '👥',
        fit: 'Foco em bem-estar das pessoas, construção de comunidade no trabalho, mediação.',
        details: 'Permite usar Fe-Si para criar ambientes onde pessoas prosperam e se sentem valorizadas.',
      },
      {
        title: 'Conselheiro/Terapeuta',
        description: 'Fornecer suporte emocional e prático para clientes enfrentando desafios de vida.',
        icon: '🧘',
        fit: 'Profunda conexão empática, ajuda tangível, relacionamentos de longo prazo.',
        details: 'Requer desenvolvimento de Ti para manter limites profissionais e análise objetiva.',
      },
      {
        title: 'Gerente de Relacionamento com Cliente',
        description: 'Manter relacionamentos positivos com clientes, garantir satisfação, resolver problemas.',
        icon: '🌟',
        fit: 'Construção de relacionamentos, resolução de problemas pessoais, lealdade mútua.',
        details: 'Habilidade de lembrar detalhes sobre cada cliente cria experiências personalizadas.',
      },
      {
        title: 'Coordenador de Voluntários',
        description: 'Organizar programas de voluntariado, motivar equipes, gerenciar projetos comunitários.',
        icon: '🙌',
        fit: 'Serviço à comunidade, liderança de grupos, organização de pessoas e recursos.',
        details: 'Combina paixão por ajudar com habilidades organizacionais e gestão de pessoas.',
      },
      {
        title: 'Gerente de Restaurante/Hospitalidade',
        description: 'Criar experiências excepcionais para clientes, liderar equipes, manter padrões de qualidade.',
        icon: '🍽️',
        fit: 'Ambiente social dinâmico, foco em fazer pessoas felizes, atenção aos detalhes.',
        details: 'Satisfação imediata de ver clientes satisfeitos e equipe trabalhando harmoniosamente.',
      },
    ],
  },

  famousPeople: [
    { name: 'Taylor Swift', role: 'Cantora e Compositora', avatar: 'https://ui-avatars.com/api/?name=Taylor+Swift&background=BE185D&color=fff' },
    { name: 'Jennifer Garner', role: 'Atriz', avatar: 'https://ui-avatars.com/api/?name=Jennifer+Garner&background=BE185D&color=fff' },
    { name: 'Sally Field', role: 'Atriz', avatar: 'https://ui-avatars.com/api/?name=Sally+Field&background=BE185D&color=fff' },
    { name: 'Tyra Banks', role: 'Modelo e Empresária', avatar: 'https://ui-avatars.com/api/?name=Tyra+Banks&background=BE185D&color=fff' },
    { name: 'Whitney Houston', role: 'Cantora', avatar: 'https://ui-avatars.com/api/?name=Whitney+Houston&background=BE185D&color=fff' },
    { name: 'Steve Harvey', role: 'Apresentador e Comediante', avatar: 'https://ui-avatars.com/api/?name=Steve+Harvey&background=BE185D&color=fff' },
    { name: 'Danny Glover', role: 'Ator', avatar: 'https://ui-avatars.com/api/?name=Danny+Glover&background=BE185D&color=fff' },
    { name: 'Sarah Jessica Parker', role: 'Atriz', avatar: 'https://ui-avatars.com/api/?name=Sarah+Jessica+Parker&background=BE185D&color=fff' },
    { name: 'William McKinley', role: 'Presidente dos EUA', avatar: 'https://ui-avatars.com/api/?name=William+McKinley&background=BE185D&color=fff' },
    { name: 'Martha Stewart', role: 'Empresária', avatar: 'https://ui-avatars.com/api/?name=Martha+Stewart&background=BE185D&color=fff' },
  ],

  relationships: {
    isGated: true,
    preview: 'ESFJs trazem calor, dedicação e estabilidade aos relacionamentos, criando lares acolhedores e conexões profundas baseadas em cuidado mútuo...',
    content: {
      romantic: {
        overview: 'ESFJs em relacionamentos românticos são parceiros atenciosos, dedicados e profundamente comprometidos com o bem-estar e felicidade de seus entes queridos. Eles investem enormemente em criar relacionamentos harmoniosos e estáveis, frequentemente colocando as necessidades do parceiro acima das próprias.',
        strengths: [
          'Extremamente atenciosos e carinhosos, sempre pensando em maneiras de fazer o parceiro feliz',
          'Criam ambientes domésticos acolhedores e estáveis',
          'Excelentes em lembrar datas importantes e tradições significativas',
          'Comunicação aberta sobre sentimentos e expectativas',
          'Lealdade inabalável e comprometimento de longo prazo',
        ],
        challenges: [
          'Podem se tornar dependentes demais da aprovação do parceiro',
          'Dificuldade em expressar necessidades próprias por medo de causar conflito',
          'Levam críticas muito ao coração, mesmo quando construtivas',
          'Podem ser controladores quando ansiosos sobre o relacionamento',
          'Resistência a mudanças na dinâmica estabelecida do relacionamento',
        ],
        tips: [
          'Pratique comunicar suas próprias necessidades diretamente - relacionamentos saudáveis são bidirecionais',
          'Lembre-se que conflito ocasional é normal e pode fortalecer relacionamentos',
          'Não interprete toda crítica como rejeição - seu parceiro ainda ama você',
          'Permita que seu parceiro tenha autonomia e espaço quando precisar',
          'Procure parceiros que valorizem estabilidade, família e expressem apreciação',
        ],
      },
      friendship: {
        overview: 'ESFJs são amigos leais, generosos e sempre presentes. Eles investem profundamente em suas amizades, lembrando detalhes importantes e fazendo questão de manter contato regular.',
        ideal: 'Outros tipos de Sentimento (F) que compartilham valores de conexão emocional, ou tipos de Sensação (S) que apreciam tradições e atividades práticas juntos.',
        asAFriend: 'Extremamente confiável, sempre disponível em crises, organiza reuniões regulares, lembra aniversários e eventos importantes, faz amigos se sentirem valorizados e incluídos.',
      },
      compatibility: {
        highest: ['ISFP', 'ISTJ', 'ESFP', 'ENFJ'],
        challenging: ['INTP', 'INTJ', 'ENTP', 'ISTP'],
        explanation: 'ESFJs conectam-se melhor com tipos que valorizam harmonia relacional e expressão emocional. Parceiros SF compartilham valores práticos e foco em pessoas, enquanto parceiros NF trazem profundidade emocional.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ESFJs envolve desenvolver sua função inferior Ti e aprender a equilibrar cuidado com outros com autocuidado saudável...',
    content: {
      developingInferiorTi: {
        title: 'Desenvolvendo Pensamento Introvertido (Ti)',
        description: 'Ti inferior significa que ESFJs lutam com análise lógica impessoal e podem levar críticas racionais como ataques pessoais. Desenvolvê-la traz equilíbrio e resiliência.',
        practices: [
          'Praticar análise objetiva separando fatos de sentimentos em situações não-emocionais',
          'Estudar lógica formal ou filosofia para fortalecer raciocínio analítico',
          'Questionar suas próprias assunções e crenças periodicamente',
          'Buscar feedback construtivo e praticar recebê-lo sem defensividade',
          'Tomar decisões ocasionalmente baseadas puramente em lógica, não em como outros se sentirão',
        ],
        signs: 'Ti saudável aparece como maior objetividade, menos sensibilidade a críticas, capacidade de debater ideias sem levá-las pessoalmente, e decisões mais equilibradas.',
      },
      balancingFunctions: {
        title: 'Equilibrando Fe-Si com Ne-Ti',
        description: 'ESFJs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        feSiBalance: 'Use Fe-Si para criar harmonia e estabilidade, mas não ao custo de sua própria autenticidade e bem-estar.',
        neTiDevelopment: 'Cultive Ne explorando novas possibilidades e perspectivas. Desenvolva Ti através de pensamento crítico e estabelecimento de limites lógicos.',
      },
      commonTraps: {
        feSiLoop: {
          name: 'Loop Fe-Si',
          description: 'Ficar preso em fazer o que sempre fizeram para agradar outros, sem questionar se ainda serve a você.',
          escape: 'Ative Ne explorando novas abordagens e perspectivas. Questione tradições com Ti: "Isso realmente faz sentido ou é apenas costume?"',
        },
        neGrip: {
          name: 'Grip de Ne',
          description: 'Sob stress extremo, Ne pode ficar destrutivo: vendo possibilidades negativas por toda parte, paranoia sobre relacionamentos.',
          escape: 'Retornar a Fe-Si através de atividades de cuidado familiares, conversar com amigos confiáveis, usar Ti para avaliar evidências reais.',
        },
      },
      dailyPractices: [
        'Reserve 30 minutos diários apenas para você - leia, relaxe, persiga hobby pessoal',
        'Pratique dizer "não" a um pedido por semana para desenvolver limites',
        'Faça check-in com suas próprias necessidades antes de assumir cuidado de outros',
        'Desafie uma assunção ou tradição por mês - questione por que você acredita nisso',
        'Participe em discussão intelectual ou debate sobre tópico não-pessoal',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ESFJs prosperam em ambientes que valorizam trabalho em equipe, permitem servir outros, e recompensam confiabilidade e dedicação...',
    content: {
      asLeader: {
        style: 'Liderança por Suporte',
        strengths: [
          'Líderes que genuinamente se importam com bem-estar de cada membro da equipe',
          'Criam culturas de equipe coesas onde todos se sentem valorizados',
          'Excelentes em reconhecer e celebrar contribuições individuais',
          'Mantêm estruturas organizacionais claras e processos consistentes',
        ],
        challenges: [
          'Podem ter dificuldade em tomar decisões impopulares necessárias',
          'Evitar confrontos necessários para manter harmonia',
          'Levar feedback ou resistência da equipe muito pessoalmente',
          'Resistência a mudanças organizacionais que perturbem tradições',
        ],
        tips: 'Desenvolva Ti para tomar decisões difíceis objetivamente. Lembre-se que conflito saudável pode ser produtivo. Busque feedback sobre impacto, não apenas aprovação.',
      },
      asTeamMember: {
        strengths: [
          'Extremamente confiáveis e consistentes',
          'Fortalecem moral da equipe e criam atmosfera positiva',
          'Lembram aniversários, celebram vitórias, apoiam em dificuldades',
          'Excelentes em coordenar esforços e garantir que nada seja esquecido',
        ],
        challenges: [
          'Podem se sobrecarregar assumindo responsabilidades de outros',
          'Dificuldade em falar quando discordam de abordagem da equipe',
          'Resistência a mudanças de processos estabelecidos',
          'Podem ser vistos como resistentes a inovação',
        ],
        tips: 'Estabeleça limites claros sobre quanto pode assumir. Pratique expressar opiniões divergentes construtivamente. Esteja aberto a experimentar novos métodos.',
      },
      idealEnvironment: {
        culture: 'Colaborativa e orientada a pessoas, onde contribuições são reconhecidas e relacionamentos valorizados',
        structure: 'Hierarquias claras, expectativas definidas, processos consistentes',
        challenges: 'Oportunidades de ajudar outros, construir comunidade, fazer diferença tangível',
        avoid: 'Ambientes altamente competitivos ou políticos, críticas duras e frequentes, isolamento prolongado',
      },
      conflictResolution: {
        approach: 'ESFJs abordam conflitos buscando restaurar harmonia e entender necessidades emocionais de todos',
        tips: [
          'Nem todo conflito é catástrofe - divergências podem levar a melhores soluções',
          'Pratique separar crítica de ideias de crítica pessoal',
          'Não evite confrontos necessários - resolução honesta é mais saudável que paz falsa',
          'Use Ti para avaliar objetivamente quando suas emoções estão nublando julgamento',
        ],
      },
    },
  },
};
