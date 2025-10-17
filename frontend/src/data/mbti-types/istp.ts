import { PersonalityType } from '../../types/personality';

export const ISTP: PersonalityType = {
  code: 'ISTP',
  nickname: 'O Virtuoso',
  tagline: 'Mestres práticos e ousados de todas as ferramentas',
  tags: ['Prático', 'Analítico', 'Independente', 'Adaptável'],
  population: '5-6% da população',
  group: 'explorers',

  colorScheme: {
    primary: '#0F766E',
    secondary: '#115E59',
    light: '#CCFBF1',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ISTPs são os artesãos práticos do mundo das personalidades, combinando uma mente analítica afiada com habilidades manuais excepcionais. Eles são os mestres de entender como as coisas funcionam - não apenas teoricamente, mas através da experimentação direta e manipulação física. Enquanto outros leem manuais, ISTPs desmontam, exploram e dominam ferramentas e sistemas através da experiência hands-on.

Movidos por uma curiosidade intensa pelo mundo físico, ISTPs vivem no momento presente com uma consciência aguçada de seu ambiente. Eles possuem uma habilidade quase sobrenatural de manter a calma sob pressão, tomando decisões rápidas e precisas em situações de crise onde outros entrariam em pânico. Essa combinação de pensamento lógico e ação decisiva os torna incrivelmente eficazes em emergências.

No entanto, sua natureza independente e pragmática pode criar desafios. ISTPs valorizam liberdade acima de quase tudo e podem se sentir sufocados por regras arbitrárias, rotinas rígidas ou expectativas emocionais. Eles preferem mostrar cuidado através de ações práticas ao invés de palavras, o que pode ser mal interpretado como frieza ou indiferença.

O verdadeiro poder do ISTP está em sua capacidade de permanecer absolutamente presente, analisar sistemas complexos rapidamente, e agir com precisão quando necessário. Eles são os solucionadores de problemas silenciosos, os técnicos que fazem o mundo funcionar, e os aventureiros que enfrentam desafios práticos com competência serena.`,

    quote: {
      text: 'Eu não temo o homem que praticou 10.000 chutes diferentes, mas temo o homem que praticou um chute 10.000 vezes.',
      author: 'Bruce Lee',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Ti',
      fullName: 'Pensamento Introvertido',
      icon: '🔧',
      description: 'A função dominante Ti busca compreender a lógica interna de como as coisas funcionam. ISTPs analisam sistemas, identificam princípios operacionais e criam modelos mentais precisos de mecânicas e processos.',
      manifestation: 'Se manifesta como uma necessidade de entender o "como" e "por que" de sistemas físicos e mecânicos. ISTPs não confiam em explicações - precisam desmontar, explorar e validar por si mesmos.',
    },
    {
      position: 'auxiliary',
      name: 'Se',
      fullName: 'Sensação Extrovertida',
      icon: '⚡',
      description: 'A função auxiliar Se mantém ISTPs firmemente ancorados no momento presente. Ela fornece consciência aguçada do ambiente físico, reflexos rápidos e habilidade de agir decisivamente.',
      manifestation: 'Aparece como presença física excepcional, coordenação mão-olho superior, e capacidade de responder instantaneamente a mudanças no ambiente. ISTPs vivem e prosperam no aqui e agora.',
    },
    {
      position: 'tertiary',
      name: 'Ni',
      fullName: 'Intuição Introvertida',
      icon: '🎯',
      description: 'A função terciária Ni fornece insights súbitos e compreensões profundas sobre como sistemas funcionam. Em ISTPs, está menos desenvolvida mas ocasionalmente oferece momentos de clareza.',
      manifestation: 'Pode aparecer como "palpites" sobre problemas mecânicos ou técnicos, ou compreensão intuitiva de como peças se encaixam sem análise consciente.',
    },
    {
      position: 'inferior',
      name: 'Fe',
      fullName: 'Sentimento Extrovertido',
      icon: '❤️',
      description: 'A função inferior Fe lida com harmonia social e expressão emocional. Para ISTPs, esta é a função mais desafiadora e frequentemente negligenciada.',
      manifestation: 'ISTPs podem se sentir desconfortáveis com displays emocionais, lutar para expressar sentimentos verbalmente, e preferir demonstrar cuidado através de ações práticas ao invés de palavras.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Habilidade Técnica Excepcional',
        description: 'Capacidade natural de entender e dominar ferramentas, máquinas e sistemas físicos através de experimentação prática.',
        icon: '🛠️',
      },
      {
        title: 'Calma sob Pressão',
        description: 'Mantêm a cabeça fria em crises, tomando decisões rápidas e precisas quando outros entram em pânico.',
        icon: '🧊',
      },
      {
        title: 'Solução Prática de Problemas',
        description: 'Abordagem pragmática e eficiente para resolver problemas do mundo real com recursos disponíveis.',
        icon: '🔨',
      },
      {
        title: 'Observação Aguçada',
        description: 'Notam detalhes que outros perdem, especialmente em ambientes físicos e sistemas mecânicos.',
        icon: '👁️',
      },
      {
        title: 'Independência e Autossuficiência',
        description: 'Confiam em suas próprias habilidades e preferem resolver problemas sem depender de outros.',
        icon: '🦾',
      },
    ],
    gated: [
      {
        title: 'Adaptabilidade Situacional',
        description: 'Ajustam-se rapidamente a mudanças e imprevistos, transformando obstáculos em oportunidades.',
        icon: '🌊',
      },
      {
        title: 'Eficiência Otimizada',
        description: 'Encontram o caminho mais direto e eficiente para resultados, eliminando desperdício e complexidade desnecessária.',
        icon: '⚙️',
      },
      {
        title: 'Coragem Física',
        description: 'Dispostos a assumir riscos calculados e enfrentar desafios físicos que outros evitariam.',
        icon: '🏔️',
      },
      {
        title: 'Pensamento Lógico Rápido',
        description: 'Processam informações rapidamente e chegam a conclusões lógicas mesmo sob pressão temporal.',
        icon: '⚡',
      },
      {
        title: 'Resiliência e Resistência',
        description: 'Recuperam-se rapidamente de contratempos e mantêm performance sob condições adversas.',
        icon: '💪',
      },
      {
        title: 'Versatilidade de Habilidades',
        description: 'Adquirem novas habilidades práticas rapidamente, tornando-se "faz-tudo" competentes.',
        icon: '🎯',
      },
      {
        title: 'Economia de Recursos',
        description: 'Maximizam resultados com recursos mínimos, encontrando soluções criativas com o que está disponível.',
        icon: '♻️',
      },
      {
        title: 'Consciência Espacial',
        description: 'Compreensão superior de relações espaciais e como objetos físicos interagem em três dimensões.',
        icon: '📐',
      },
      {
        title: 'Objetividade Imparcial',
        description: 'Avaliam situações baseados em fatos e lógica, sem deixar emoções nublarem julgamento.',
        icon: '⚖️',
      },
      {
        title: 'Timing Perfeito',
        description: 'Senso natural de quando agir e quando esperar, especialmente em atividades físicas ou técnicas.',
        icon: '⏱️',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Resistência a Compromissos de Longo Prazo',
        description: 'Valorizam liberdade intensamente e podem evitar situações que limitem sua autonomia ou flexibilidade.',
        impact: 'Dificuldade em manter relacionamentos ou carreiras que demandam comprometimento duradouro.',
      },
      {
        title: 'Dificuldade com Expressão Emocional',
        description: 'Lutam para identificar e comunicar seus próprios sentimentos ou responder adequadamente às emoções dos outros.',
        impact: 'Relacionamentos podem sofrer por falta de comunicação emocional; outros podem vê-los como frios ou indiferentes.',
      },
      {
        title: 'Impaciência com Abstração',
        description: 'Preferem o concreto ao teórico e podem perder interesse em discussões ou planejamentos muito abstratos.',
        impact: 'Podem subestimar a importância de planejamento de longo prazo ou considerações estratégicas.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Tédio Crônico com Rotina',
          description: 'Necessidade constante de estimulação e novidade; rotinas repetitivas são sufocantes e desmotivadoras.',
          impact: 'Abandonam projetos quando ficam "chatos", pulam de interesse em interesse, dificuldade em carreiras rotineiras.',
          mitigation: 'Buscar variedade dentro de estruturas necessárias, dividir tarefas longas em desafios menores, alternar entre projetos diferentes.',
        },
        {
          title: 'Tendência ao Risco Excessivo',
          description: 'Busca por adrenalina e novidade pode levar a assumir riscos físicos ou práticos desnecessários.',
          impact: 'Acidentes, problemas financeiros por decisões impulsivas, consequências não previstas de ações arriscadas.',
          mitigation: 'Canalizar necessidade de risco para atividades controladas (esportes radicais, hobbies desafiadores), usar Ti para avaliar riscos antes de agir.',
        },
        {
          title: 'Insensibilidade Não Intencional',
          description: 'Foco em lógica e eficiência pode fazer com que ignorem ou minimizem necessidades emocionais dos outros.',
          impact: 'Conflitos relacionais, reputação de "frio", dificuldade em formar conexões emocionais profundas.',
          mitigation: 'Reconhecer que emoções são dados válidos, praticar expressar apreciação verbalmente, pedir feedback sobre impacto emocional.',
        },
        {
          title: 'Dificuldade em Seguir Regras Arbitrárias',
          description: 'Questionam autoridade e regras que não fazem sentido lógico, podem ignorá-las completamente.',
          impact: 'Conflitos com autoridades, problemas em ambientes hierárquicos, reputação de "difícil" ou "rebelde".',
          mitigation: 'Escolher ambientes com autonomia, entender quando conformidade estratégica é necessária, focar em princípios ao invés de regras.',
        },
        {
          title: 'Isolamento Social',
          description: 'Preferência por independência e desconforto com emoções pode levar a evitar conexões sociais profundas.',
          impact: 'Solidão, falta de rede de suporte, dificuldade em pedir ajuda quando necessário.',
          mitigation: 'Cultivar amizades baseadas em atividades compartilhadas, praticar vulnerabilidade em pequenas doses, valorizar qualidade sobre quantidade.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Mecânico/Técnico',
        description: 'Trabalhar com máquinas, veículos ou equipamentos técnicos, diagnosticando problemas e fazendo reparos.',
        icon: '🔧',
        fit: 'Ideal para Ti-Se: trabalho hands-on, resolução de problemas práticos, autonomia técnica.',
      },
      {
        title: 'Engenheiro (Mecânico/Civil)',
        description: 'Projetar e construir sistemas físicos, pontes, máquinas ou estruturas.',
        icon: '👷',
        fit: 'Combina análise lógica com aplicação prática, resultados tangíveis e concretos.',
      },
      {
        title: 'Piloto/Operador de Equipamentos',
        description: 'Operar aeronaves, equipamentos pesados ou veículos especializados.',
        icon: '✈️',
        fit: 'Requer habilidade técnica, reflexos rápidos, tomada de decisão sob pressão.',
      },
      {
        title: 'Paramédico/Técnico de Emergência',
        description: 'Responder a emergências médicas, fornecendo cuidados práticos imediatos.',
        icon: '🚑',
        fit: 'Combina calma sob pressão com habilidades técnicas práticas e impacto direto.',
      },
      {
        title: 'Construtor/Carpinteiro',
        description: 'Criar estruturas e objetos físicos através de trabalho manual habilidoso.',
        icon: '🏗️',
        fit: 'Trabalho prático hands-on, ver resultados tangíveis, autonomia em execução.',
      },
    ],
    gated: [
      {
        title: 'Especialista em Segurança/Hacker Ético',
        description: 'Testar sistemas de segurança, identificar vulnerabilidades, resolver problemas de proteção de dados.',
        icon: '🔐',
        fit: 'Combina análise lógica com experimentação prática, desafios constantes.',
        details: 'Oferece variedade, resolução de quebra-cabeças técnicos, e satisfação de "quebrar" sistemas para melhorá-los.',
      },
      {
        title: 'Atleta Profissional/Instrutor de Esportes',
        description: 'Competir em esportes ou ensinar habilidades atléticas, especialmente esportes radicais ou técnicos.',
        icon: '🏆',
        fit: 'Maximiza Se: consciência física, reflexos rápidos, performance sob pressão.',
        details: 'Ideal para ISTPs que amam desafio físico e domínio de habilidades corporais.',
      },
      {
        title: 'Fotógrafo/Cinegrafista',
        description: 'Capturar imagens através de equipamento técnico, especialmente em situações dinâmicas ou desafiadoras.',
        icon: '📸',
        fit: 'Combina habilidade técnica com observação aguçada e presença no momento.',
        details: 'Permite trabalho independente, domínio de ferramentas, e captura do mundo físico.',
      },
      {
        title: 'Investigador Forense/Detetive',
        description: 'Analisar evidências físicas, reconstruir eventos, resolver casos através de dedução lógica.',
        icon: '🔍',
        fit: 'Usa Ti para análise e Se para observação de detalhes físicos críticos.',
        details: 'Variedade de casos, resolução de quebra-cabeças práticos, trabalho independente.',
      },
      {
        title: 'Chef/Cozinheiro Profissional',
        description: 'Criar pratos através de técnica culinária, experimentação e habilidade prática.',
        icon: '👨‍🍳',
        fit: 'Trabalho hands-on, domínio de técnicas, improvisação sob pressão.',
        details: 'Ambiente de ritmo rápido, habilidades práticas, feedback imediato através dos sentidos.',
      },
    ],
  },

  famousPeople: [
    { name: 'Bruce Lee', role: 'Artista Marcial e Ator', avatar: 'https://ui-avatars.com/api/?name=Bruce+Lee&background=0F766E&color=fff' },
    { name: 'Tom Cruise', role: 'Ator', avatar: 'https://ui-avatars.com/api/?name=Tom+Cruise&background=0F766E&color=fff' },
    { name: 'Clint Eastwood', role: 'Ator e Diretor', avatar: 'https://ui-avatars.com/api/?name=Clint+Eastwood&background=0F766E&color=fff' },
    { name: 'Bear Grylls', role: 'Aventureiro e Sobrevivencialista', avatar: 'https://ui-avatars.com/api/?name=Bear+Grylls&background=0F766E&color=fff' },
    { name: 'Amelia Earhart', role: 'Aviadora', avatar: 'https://ui-avatars.com/api/?name=Amelia+Earhart&background=0F766E&color=fff' },
    { name: 'Steve Jobs', role: 'Empreendedor', avatar: 'https://ui-avatars.com/api/?name=Steve+Jobs&background=0F766E&color=fff' },
    { name: 'Katherine Hepburn', role: 'Atriz', avatar: 'https://ui-avatars.com/api/?name=Katherine+Hepburn&background=0F766E&color=fff' },
    { name: 'Michael Jordan', role: 'Atleta', avatar: 'https://ui-avatars.com/api/?name=Michael+Jordan&background=0F766E&color=fff' },
    { name: 'Snoop Dogg', role: 'Músico', avatar: 'https://ui-avatars.com/api/?name=Snoop+Dogg&background=0F766E&color=fff' },
    { name: 'Scarlett Johansson', role: 'Atriz', avatar: 'https://ui-avatars.com/api/?name=Scarlett+Johansson&background=0F766E&color=fff' },
  ],

  relationships: {
    isGated: true,
    preview: 'ISTPs trazem lealdade silenciosa e suporte prático aos relacionamentos, mas precisam de parceiros que respeitem sua necessidade de espaço e independência...',
    content: {
      romantic: {
        overview: 'ISTPs em relacionamentos românticos são parceiros leais e práticos que demonstram amor através de ações ao invés de palavras. Eles valorizam liberdade e autonomia, e precisam de parceiros que não os sufoquem com demandas emocionais constantes. Uma vez comprometidos, são incrivelmente confiáveis.',
        strengths: [
          'Lealdade profunda e comprometimento quando decidem se envolver',
          'Demonstram amor através de ações práticas e suporte tangível',
          'Parceiros aventureiros dispostos a experimentar coisas novas',
          'Calmos durante crises - você pode contar com eles em emergências',
          'Respeito genuíno pela independência e espaço do parceiro',
        ],
        challenges: [
          'Dificuldade extrema em expressar sentimentos verbalmente',
          'Necessidade de muito espaço pessoal pode ser mal interpretada',
          'Podem parecer distantes ou não engajados emocionalmente',
          'Resistência a compromissos e planejamento de longo prazo',
          'Impulsividade pode criar instabilidade no relacionamento',
        ],
        tips: [
          'Comunique necessidade de espaço claramente - não é rejeição pessoal',
          'Mostre apreciação através de ações compartilhadas, não apenas palavras',
          'Seja direto sobre expectativas - ISTPs preferem clareza',
          'Não force conversas emocionais; crie espaço seguro para quando estiverem prontos',
          'Procure parceiros que valorizem independência e aventura compartilhada',
        ],
      },
      friendship: {
        overview: 'ISTPs formam amizades baseadas em atividades compartilhadas e respeito mútuo. Eles preferem fazer coisas com amigos ao invés de apenas conversar.',
        ideal: 'Outros SPs que compartilham amor por ação e aventura, ou TPs que apreciam lógica e competência técnica.',
        asAFriend: 'Leal, confiável em crises, parceiro de aventuras, oferece ajuda prática (não apenas emocional), respeita limites e privacidade.',
      },
      compatibility: {
        highest: ['ESTP', 'ESTJ', 'ESFP', 'ISFP'],
        challenging: ['ENFJ', 'INFJ', 'ENFP', 'INFP'],
        explanation: 'ISTPs se conectam melhor com tipos que apreciam ação e praticidade. Pares SP compartilham amor por experiências físicas, enquanto STJs oferecem estrutura complementar.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ISTPs envolve desenvolver sua função inferior Fe e aprender a equilibrar independência com conexão emocional genuína...',
    content: {
      developingInferiorFe: {
        title: 'Desenvolvendo Sentimento Extrovertido (Fe)',
        description: 'Fe inferior significa que ISTPs lutam com consciência emocional social e expressão de sentimentos. Desenvolvê-la é crucial para relacionamentos profundos e significativos.',
        practices: [
          'Praticar nomear e expressar emoções próprias regularmente',
          'Observar como ações práticas afetam emocionalmente os outros',
          'Participar de atividades em grupo onde conexão é necessária',
          'Expressar apreciação verbalmente, não apenas através de ações',
          'Pedir feedback direto sobre como suas palavras/ações impactam outros',
        ],
        signs: 'Fe saudável aparece como maior conforto com expressões emocionais, relacionamentos mais profundos, e capacidade de oferecer suporte emocional além do prático.',
      },
      balancingFunctions: {
        title: 'Equilibrando Ti-Se com Ni-Fe',
        description: 'ISTPs saudáveis aprendem a usar suas funções superiores sem negligenciar completamente as inferiores.',
        tiSeBalance: 'Use Ti-Se para análise prática e ação no momento, mas desenvolva visão de longo prazo através de Ni.',
        niFeDevelopment: 'Cultive Ni através de reflexão sobre padrões e consequências futuras. Desenvolva Fe através de conexões emocionais genuínas e consideração do impacto social.',
      },
      commonTraps: {
        tiNiLoop: {
          name: 'Loop Ti-Ni',
          description: 'Ficar preso em análise interna e visões negativas do futuro, desconectando-se do mundo físico presente.',
          escape: 'Forçar-se a agir (Se): atividade física, trabalho hands-on, engajamento sensorial com o mundo real.',
        },
        seGrip: {
          name: 'Grip de Se',
          description: 'Sob stress extremo, Se pode ficar destrutivo: busca por estimulação física excessiva, comportamento de risco perigoso.',
          escape: 'Retornar ao Ti: analisar racionalmente a situação, questionar impulsos, usar lógica para avaliar consequências.',
        },
      },
      dailyPractices: [
        'Dedique tempo para refletir sobre como suas ações afetam outros emocionalmente',
        'Pratique expressar gratidão ou apreciação verbalmente ao menos uma vez por dia',
        'Estabeleça uma rotina de check-in emocional consigo mesmo',
        'Equilibre busca por novidade com compromissos de longo prazo importantes',
        'Canalize necessidade de risco para atividades produtivas e seguras',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ISTPs prosperam em ambientes práticos que permitem autonomia, oferecem desafios técnicos variados, e recompensam competência ao invés de política...',
    content: {
      asLeader: {
        style: 'Liderança por Exemplo',
        strengths: [
          'Lideram através de competência demonstrada, não autoridade formal',
          'Calmos e decisivos durante crises ou situações de alta pressão',
          'Dão autonomia total a membros competentes da equipe',
          'Excelentes em resolver problemas técnicos que bloqueiam progresso',
        ],
        challenges: [
          'Podem ser vistos como distantes ou não engajados',
          'Dificuldade com aspectos "soft" da liderança (motivação, coaching emocional)',
          'Impaciência com processos burocráticos ou reuniões improdutivas',
          'Preferem fazer eles mesmos ao invés de delegar e ensinar',
        ],
        tips: 'Delegue tarefas administrativas, foque em direção técnica. Demonstre apreciação através de ações concretas. Reconheça que alguns precisam de mais orientação emocional.',
      },
      asTeamMember: {
        strengths: [
          'Solucionadores de problemas práticos excepcionais',
          'Mantêm calma quando todos estão em pânico',
          'Trabalham eficientemente com supervisão mínima',
          'Trazem perspectiva pragmática e realista',
        ],
        challenges: [
          'Podem parecer não colaborativos (preferem trabalhar sozinhos)',
          'Dificuldade em seguir processos que parecem ilógicos ou ineficientes',
          'Resistência a reuniões longas ou discussões abstratas',
          'Podem ignorar completamente hierarquia se não respeitam competência',
        ],
        tips: 'Seja explícito sobre suas necessidades de autonomia. Ofereça soluções práticas ao criticar. Participe minimamente em rituais sociais necessários.',
      },
      idealEnvironment: {
        culture: 'Meritocracia baseada em competência onde habilidade fala mais alto que hierarquia',
        structure: 'Máxima autonomia, mínima burocracia, flexibilidade para trabalhar do seu jeito',
        challenges: 'Problemas práticos e técnicos que requerem solução criativa hands-on',
        avoid: 'Microgerenciamento, excesso de reuniões, ambientes altamente políticos, trabalho repetitivo sem desafio',
      },
      conflictResolution: {
        approach: 'ISTPs abordam conflitos pragmaticamente, focando em soluções práticas ao invés de drama emocional',
        tips: [
          'Reconheça que nem todos processam conflito logicamente - alguns precisam de validação emocional',
          'Evite ser excessivamente direto ou brutal na comunicação',
          'Ofereça soluções concretas ao invés de apenas apontar problemas',
          'Não desapareça durante conflitos - engaje mesmo que desconfortável',
        ],
      },
    },
  },
};
