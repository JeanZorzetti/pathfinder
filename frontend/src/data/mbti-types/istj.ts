import { PersonalityType } from '../../types/personality';

export const ISTJ: PersonalityType = {
  code: 'ISTJ',
  nickname: 'O Logístico',
  tagline: 'Práticos e confiáveis, os pilares da sociedade',
  tags: ['Confiável', 'Prático', 'Organizado', 'Responsável'],
  population: '11-14% da população',
  group: 'Sentinels',

  colorScheme: {
    primary: '#1E40AF',
    secondary: '#1E3A8A',
    light: '#DBEAFE',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ISTJs são os pilares da sociedade - indivíduos práticos, responsáveis e incrivelmente confiáveis que mantêm o mundo funcionando através de dedicação inabalável ao dever e à tradição. Onde outros veem possibilidades abstratas, ISTJs veem fatos concretos e passos claros que precisam ser dados. Eles são os guardiões da ordem, os administradores meticulosos que garantem que sistemas funcionem como deveriam.

Sua mente funciona como um arquivo meticulosamente organizado, onde cada experiência passada é catalogada e armazenada para referência futura. Para o ISTJ, a história não é apenas algo que aconteceu - é um repositório de lições valiosas que informam cada decisão presente. Eles não reinventam a roda; aperfeiçoam métodos comprovados e aplicam princípios testados pelo tempo com eficiência incomparável.

No entanto, essa dependência de experiência concreta e processos estabelecidos pode criar desafios. ISTJs podem resistir a mudanças mesmo quando necessárias, valorizar tradição acima de inovação, e ter dificuldade em expressar ou processar emoções. Sua rigidez pode ser vista como inflexibilidade, e seu foco em fatos pode parecer insensibilidade.

O verdadeiro poder do ISTJ está em sua capacidade de transformar caos em ordem, de assumir responsabilidade quando outros fogem, e de perseverar através de qualquer obstáculo com determinação silenciosa mas inabalável. Eles são a fundação sobre a qual tudo mais é construído - e essa fundação nunca falha.`,

    quote: {
      text: 'Minha honra é lealdade. Eu faço meu dever, não importa o custo.',
      author: 'George Washington',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Si',
      fullName: 'Sensação Introvertida',
      icon: '📋',
      description: 'A função dominante Si armazena experiências passadas em detalhes vívidos e cria um senso interno de "como as coisas devem ser". ISTJs confiam em precedentes, tradições e métodos comprovados.',
      details: 'Se manifesta como memória excepcional para detalhes, valorização de consistência e rotina, e uma abordagem "se não está quebrado, não conserte". ISTJs têm um catálogo mental de experiências que consultam constantemente.',
    },
    {
      position: 'auxiliary',
      name: 'Te',
      fullName: 'Pensamento Extrovertido',
      icon: '⚙️',
      description: 'A função auxiliar Te organiza o mundo externo de forma lógica e eficiente. Ela busca resultados, estabelece sistemas e aplica regras de forma imparcial e consistente.',
      details: 'Aparece como forte ética de trabalho, habilidade de gerenciamento de projetos, e valorização de competência e eficiência. ISTJs implementam sistemas práticos que funcionam e eliminam desperdício.',
    },
    {
      position: 'tertiary',
      name: 'Fi',
      fullName: 'Sentimento Introvertido',
      icon: '🛡️',
      description: 'A função terciária Fi mantém um código de valores internos profundos. Em ISTJs, manifesta-se como forte senso de certo e errado, lealdade e integridade pessoal.',
      details: 'Pode aparecer como princípios morais rígidos, lealdade feroz a pessoas e instituições que respeitam, e desconforto quando valores são violados, mesmo que não expressem isso abertamente.',
    },
    {
      position: 'inferior',
      name: 'Ne',
      fullName: 'Intuição Extrovertida',
      icon: '🌈',
      description: 'A função inferior Ne lida com possibilidades, inovação e mudança. Para ISTJs, esta é a função mais desafiadora e menos desenvolvida.',
      details: 'ISTJs frequentemente se sentem desconfortáveis com mudanças súbitas, resistem a novas abordagens não testadas, e podem ter dificuldade em brainstorming ou ver múltiplas possibilidades. Sob stress, podem catastrofizar.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Confiabilidade Excepcional',
        description: 'Quando um ISTJ assume uma responsabilidade, pode-se ter absoluta certeza de que será cumprida, no prazo e com qualidade.',
        icon: '🎯',
      },
      {
        title: 'Organização e Planejamento',
        description: 'Habilidade natural de criar sistemas, processos e estruturas que funcionam de forma eficiente e consistente.',
        icon: '📊',
      },
      {
        title: 'Ética de Trabalho Incomparável',
        description: 'Dedicação inabalável ao trabalho duro, perseverança através de dificuldades, e compromisso com excelência em tudo que fazem.',
        icon: '💪',
      },
      {
        title: 'Atenção Meticulosa aos Detalhes',
        description: 'Capacidade de notar, lembrar e aplicar detalhes específicos que outros facilmente ignoram ou esquecem.',
        icon: '🔍',
      },
      {
        title: 'Integridade e Honestidade',
        description: 'Compromisso profundo com honestidade, cumprimento de promessas e comportamento ético consistente.',
        icon: '⚖️',
      },
    ],
    gated: [
      {
        title: 'Gestão de Recursos Magistral',
        description: 'Habilidade excepcional de gerenciar tempo, dinheiro, recursos e pessoas de forma eficiente, minimizando desperdício.',
        icon: '💼',
      },
      {
        title: 'Memória Factual Extraordinária',
        description: 'Capacidade de reter e recordar informações factuais, datas, procedimentos e detalhes com precisão impressionante.',
        icon: '🧠',
      },
      {
        title: 'Estabilidade Emocional',
        description: 'Presença calma e estável, especialmente em crises, quando outros estão perdendo o controle.',
        icon: '🗿',
      },
      {
        title: 'Responsabilidade Total',
        description: 'Assumem completa responsabilidade por suas ações e obrigações, nunca culpando outros ou fazendo desculpas.',
        icon: '🛡️',
      },
      {
        title: 'Respeito por Hierarquia e Protocolo',
        description: 'Compreensão clara de estruturas de autoridade e procedimentos adequados, facilitando funcionamento em organizações.',
        icon: '📋',
      },
      {
        title: 'Praticidade e Realismo',
        description: 'Foco em soluções práticas e implementáveis ao invés de teorias abstratas; veem o mundo como ele é, não como gostariam que fosse.',
        icon: '🔧',
      },
      {
        title: 'Consistência e Previsibilidade',
        description: 'Comportamento e desempenho consistentes que permitem que outros saibam exatamente o que esperar.',
        icon: '📈',
      },
      {
        title: 'Habilidade de Implementação',
        description: 'Excelência em pegar planos e transformá-los em realidade através de execução metódica e disciplinada.',
        icon: '✅',
      },
      {
        title: 'Lealdade Institucional',
        description: 'Dedicação profunda a organizações, tradições e sistemas que consideram valiosos e legítimos.',
        icon: '🏛️',
      },
      {
        title: 'Pensamento Sequencial Lógico',
        description: 'Capacidade de seguir processos passo a passo de forma metódica, garantindo que nada seja esquecido ou negligenciado.',
        icon: '🔢',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Inflexibilidade e Resistência à Mudança',
        description: 'Forte preferência por métodos estabelecidos pode tornar difícil adaptar-se quando circunstâncias requerem novas abordagens.',
      },
      {
        title: 'Dificuldade em Expressar Emoções',
        description: 'Desconforto com vulnerabilidade emocional e tendência a suprimir ou ignorar sentimentos próprios e alheios.',
      },
      {
        title: 'Julgamento Excessivo',
        description: 'Tendência a julgar comportamentos que não seguem regras ou tradições, podendo parecer críticos ou moralistas.',
      },
    ],
    gated: {
      full: [
        {
          title: 'Excesso de Autocrítica e Perfeccionismo',
          description: 'Padrões extremamente altos para si mesmos e dificuldade em aceitar desempenho que seja "apenas bom o suficiente".',
          mitigation: 'Praticar autocompaixão, reconhecer quando "ótimo é inimigo do bom", estabelecer padrões realistas, celebrar sucessos ao invés de focar apenas no que falta.',
        },
        {
          title: 'Resistência a Ideias Não Testadas',
          description: 'Ceticismo automático em relação a inovações, novas tecnologias ou abordagens sem histórico comprovado.',
          mitigation: 'Forçar-se a experimentar pequenas mudanças, buscar evidências de sucesso de novas abordagens, equilibrar "risco de mudar" com "risco de não mudar".',
        },
        {
          title: 'Dificuldade em Lidar com Ambiguidade',
          description: 'Desconforto em situações sem regras claras, estrutura definida ou precedentes a seguir.',
          mitigation: 'Praticar tolerância à ambiguidade em doses pequenas, criar estrutura própria onde não existe, consultar com tipos Ne sobre navegação de incerteza.',
        },
        {
          title: 'Workaholismo e Negligência de Vida Pessoal',
          description: 'Tendência a priorizar dever e trabalho acima de relacionamentos, hobbies e autocuidado.',
          mitigation: 'Agendar tempo pessoal como compromisso não-negociável, reconhecer que relacionamentos também são responsabilidades importantes, estabelecer limites claros.',
        },
        {
          title: 'Dificuldade em Pedir Ajuda',
          description: 'Crença de que devem resolver tudo sozinhos e que pedir ajuda é sinal de fraqueza ou incompetência.',
          mitigation: 'Reconhecer que eficiência às vezes significa delegar, ver colaboração como força não fraqueza, estabelecer sistemas de suporte antes de precisar deles.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Contador/Auditor',
        description: 'Gerenciar registros financeiros, garantir conformidade com regulamentos, conduzir auditorias detalhadas.',
        icon: '💰',
        fit: 'Perfeito para Si-Te: atenção a detalhes, trabalho com fatos e números, aplicação de regras consistentes.',
      },
      {
        title: 'Oficial Militar',
        description: 'Servir em posições de liderança nas forças armadas, implementar disciplina e protocolos.',
        icon: '🎖️',
        fit: 'Hierarquia clara, respeito por tradição, dever e honra, estrutura e ordem.',
      },
      {
        title: 'Policial/Detetive',
        description: 'Fazer cumprir leis, investigar crimes, manter ordem pública e segurança.',
        icon: '👮',
        fit: 'Aplicação imparcial de regras, atenção a detalhes em investigações, senso de dever cívico.',
      },
      {
        title: 'Juiz/Advogado',
        description: 'Interpretar e aplicar leis, representar clientes dentro de sistemas legais estabelecidos.',
        icon: '⚖️',
        fit: 'Respeito por tradição legal, pensamento lógico, atenção meticulosa a precedentes e detalhes.',
      },
      {
        title: 'Administrador de Empresas',
        description: 'Gerenciar operações organizacionais, implementar processos, garantir eficiência.',
        icon: '📊',
        fit: 'Habilidades organizacionais, gestão de recursos, implementação de sistemas e procedimentos.',
      },
    ],
    gated: [
      {
        title: 'Gerente de Projetos',
        description: 'Planejar, executar e entregar projetos dentro do prazo e orçamento, coordenando múltiplas partes interessadas.',
        icon: '📋',
        fit: 'Combina organização excepcional com habilidade de implementação metódica.',
        details: 'Permite usar pontos fortes em planejamento, atenção a detalhes e gestão de recursos para entregar resultados tangíveis.',
      },
      {
        title: 'Médico/Dentista',
        description: 'Praticar medicina ou odontologia, fornecendo cuidados baseados em evidências e procedimentos estabelecidos.',
        icon: '⚕️',
        fit: 'Atenção meticulosa a detalhes, aplicação de conhecimento factual, responsabilidade séria.',
        details: 'Especialidades mais estruturadas (cirurgia, radiologia) podem ser especialmente atraentes; permite ajudar outros através de competência técnica.',
      },
      {
        title: 'Engenheiro Civil/Estrutural',
        description: 'Projetar e supervisionar construção de infraestrutura, garantindo segurança e conformidade com códigos.',
        icon: '🏗️',
        fit: 'Trabalho com fatos concretos, aplicação de princípios estabelecidos, responsabilidade por segurança.',
        details: 'Satisfação de criar estruturas duráveis que servem a sociedade por gerações.',
      },
      {
        title: 'Analista de Sistemas/DBA',
        description: 'Gerenciar bancos de dados, garantir integridade de dados, otimizar sistemas para confiabilidade.',
        icon: '💾',
        fit: 'Organização de informações, atenção a detalhes, criação de sistemas confiáveis.',
        details: 'Preferência por backend/infraestrutura ao invés de frontend; valorizam estabilidade sobre inovação constante.',
      },
      {
        title: 'Inspetor de Qualidade/Compliance',
        description: 'Garantir que produtos, serviços ou processos atendam padrões estabelecidos e regulamentos.',
        icon: '✔️',
        fit: 'Atenção meticulosa a detalhes, aplicação consistente de padrões, responsabilidade.',
        details: 'Papel crucial em indústrias reguladas (farmacêutica, aeroespacial, alimentícia).',
      },
    ],
  },

  famousPeople: [
    { name: 'George Washington', description: 'Primeiro Presidente dos EUA', photo: 'https://ui-avatars.com/api/?name=George+Washington&background=1E40AF&color=fff', category: 'contemporary' },
    { name: 'Warren Buffett', description: 'Investidor e Filantropo', photo: 'https://ui-avatars.com/api/?name=Warren+Buffett&background=1E40AF&color=fff', category: 'contemporary' },
    { name: 'Angela Merkel', description: 'Ex-Chanceler da Alemanha', photo: 'https://ui-avatars.com/api/?name=Angela+Merkel&background=1E40AF&color=fff', category: 'contemporary' },
    { name: 'Denzel Washington', description: 'Ator', photo: 'https://ui-avatars.com/api/?name=Denzel+Washington&background=1E40AF&color=fff', category: 'contemporary' },
    { name: 'Natalie Portman', description: 'Atriz', photo: 'https://ui-avatars.com/api/?name=Natalie+Portman&background=1E40AF&color=fff', category: 'contemporary' },
    { name: 'Queen Elizabeth II', description: 'Rainha do Reino Unido', photo: 'https://ui-avatars.com/api/?name=Queen+Elizabeth&background=1E40AF&color=fff', category: 'contemporary' },
    { name: 'Jeff Bezos', description: 'Fundador da Amazon', photo: 'https://ui-avatars.com/api/?name=Jeff+Bezos&background=1E40AF&color=fff', category: 'contemporary' },
    { name: 'Condoleezza Rice', description: 'Ex-Secretária de Estado', photo: 'https://ui-avatars.com/api/?name=Condoleezza+Rice&background=1E40AF&color=fff', category: 'contemporary' },
    { name: 'Anthony Hopkins', description: 'Ator', photo: 'https://ui-avatars.com/api/?name=Anthony+Hopkins&background=1E40AF&color=fff', category: 'contemporary' },
    { name: 'Evander Holyfield', description: 'Boxeador', photo: 'https://ui-avatars.com/api/?name=Evander+Holyfield&background=1E40AF&color=fff', category: 'contemporary' },
  ],

  relationships: {
    isGated: true,
    preview: 'ISTJs trazem lealdade inabalável, estabilidade e dedicação prática aos relacionamentos, mas precisam aprender a expressar emoções e ser flexíveis...',
    content: {
      romantic: {
        overview: 'ISTJs em relacionamentos românticos são parceiros extremamente leais, confiáveis e dedicados. Eles levam compromissos a sério e trabalharão incansavelmente para fazer relacionamentos funcionarem. No entanto, podem ter dificuldade com romance espontâneo e expressão emocional aberta.',
        strengths: [
          'Lealdade absoluta e compromisso de longo prazo',
          'Confiabilidade completa - fazem o que prometem',
          'Demonstram amor através de atos práticos de serviço',
          'Criam estabilidade financeira e doméstica',
          'Honestidade direta e comunicação clara',
        ],
        challenges: [
          'Dificuldade em expressar afeto verbalmente ou fisicamente',
          'Podem ser excessivamente rígidos sobre rotinas e tradições',
          'Resistência a mudanças no relacionamento ou dinâmica familiar',
          'Podem priorizar trabalho e dever acima do tempo de qualidade',
          'Desconforto com vulnerabilidade emocional e conversas profundas',
        ],
        tips: [
          'Reconheça que demonstração prática de amor é válida, mas aprenda também expressão verbal',
          'Agende tempo de qualidade com parceiro como compromisso não-negociável',
          'Pratique compartilhar sentimentos mesmo quando desconfortável',
          'Esteja aberto a experimentar novas experiências que parceiro sugere',
          'Procure parceiros que valorizem estabilidade mas também encorajem crescimento emocional',
        ],
      },
      friendship: {
        overview: 'ISTJs são amigos leais e confiáveis que estarão presentes nos momentos difíceis. Preferem amizades de longa data baseadas em histórico compartilhado e confiança mútua.',
        ideal: 'Outros SJs (especialmente ESFJs e ISFJs) que compartilham valores de lealdade e tradição, ou SPs que trazem espontaneidade equilibrada.',
        asAFriend: 'Extremamente confiável, leal através de décadas, oferece ajuda prática em problemas, honesto (às vezes brutalmente), respeita compromissos e tradições.',
      },
      compatibility: {
        highest: ['ESTJ', 'ESFJ', 'ISFJ', 'ESTP'],
        challenging: ['ENFP', 'ENTP', 'INFP', 'INTP'],
        explanation: 'ISTJs se conectam melhor com sensores (S) que compartilham foco em realidade concreta e praticidade. Pares SJ oferecem valores compartilhados, enquanto pares SP trazem espontaneidade equilibrada.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ISTJs envolve desenvolver sua função inferior Ne e aprender a equilibrar tradição com abertura a novas possibilidades...',
    content: {
      developingInferiorNe: {
        title: 'Desenvolvendo Intuição Extrovertida (Ne)',
        description: 'Ne inferior significa que ISTJs lutam com mudança, inovação e ver múltiplas possibilidades. Desenvolvê-la é crucial para adaptação em mundo em mudança.',
        practices: [
          'Deliberadamente experimentar uma nova abordagem para tarefa familiar mensalmente',
          'Praticar brainstorming sem julgar ideias imediatamente',
          'Buscar perspectivas de pessoas com backgrounds diferentes',
          'Ler sobre inovações em sua área e considerar méritos com mente aberta',
          'Questionar "sempre fizemos assim" e perguntar "e se tentássemos de outra forma?"',
        ],
        signs: 'Ne saudável aparece como maior flexibilidade, abertura a novas ideias, capacidade de ver múltiplas soluções, e menos stress quando planos mudam inesperadamente.',
      },
      balancingFunctions: {
        title: 'Equilibrando Si-Te com Fi-Ne',
        description: 'ISTJs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        siTeBalance: 'Use Si-Te para criar estrutura e eficiência, mas estabeleça momentos para questionar se métodos antigos ainda servem melhor.',
        fiNeDevelopment: 'Cultive Fi através de reflexão sobre valores pessoais profundos. Desenvolva Ne através de exposição a novas ideias e experiências.',
      },
      commonTraps: {
        siTeLoop: {
          name: 'Loop Si-Te',
          description: 'Ficar preso em rotinas rígidas e procedimentos sem questionar eficácia, levando a rigidez extrema.',
          escape: 'Forçar-se a considerar alternativas (Ne), conectar com valores pessoais (Fi) para lembrar "por que" além de "como".',
        },
        neGrip: {
          name: 'Grip de Ne',
          description: 'Sob stress extremo, Ne pode ficar hiperativo: catastrofização, ver possibilidades terríveis por toda parte, paranoia sobre mudanças.',
          escape: 'Retornar a rotinas confortáveis (Si), usar lógica para avaliar probabilidades reais (Te), focar em fatos presentes não possibilidades futuras.',
        },
      },
      dailyPractices: [
        'Deliberadamente faça uma coisa de forma diferente a cada dia (pequena mudança)',
        'Pratique identificar e nomear suas emoções diariamente',
        'Reserve tempo para relacionamentos, não apenas tarefas',
        'Questione uma suposição ou procedimento que sempre aceitou',
        'Pratique dizer "não" a obrigações que não alinham com valores profundos',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ISTJs prosperam em ambientes estruturados, com hierarquias claras, expectativas definidas e recompensa por competência e confiabilidade...',
    content: {
      asLeader: {
        style: 'Liderança por Exemplo',
        strengths: [
          'Líderes que nunca pedem o que não fariam eles mesmos',
          'Criam estrutura clara e expectativas bem definidas',
          'Aplicam regras de forma consistente e justa',
          'Gerenciam recursos com eficiência excepcional',
        ],
        challenges: [
          'Podem ser vistos como inflexíveis ou resistentes a mudanças',
          'Dificuldade em inspirar emocionalmente ou criar visão entusiasmante',
          'Podem microgerenciar se não confiam que outros farão "corretamente"',
          'Relutância em delegar tarefas importantes',
        ],
        tips: 'Comunique expectativas claramente. Reconheça que existem múltiplas formas corretas. Delegue e confie em competentes. Explique o "porquê" por trás de regras.',
      },
      asTeamMember: {
        strengths: [
          'O membro mais confiável da equipe',
          'Completa trabalho com qualidade consistente',
          'Segue processos e prazos rigorosamente',
          'Identifica e resolve problemas práticos',
        ],
        challenges: [
          'Podem resistir a novas abordagens sugeridas pela equipe',
          'Frustração com membros menos organizados ou pontuais',
          'Dificuldade em colaboração fluida e não estruturada',
          'Podem ser vistos como críticos ou negativos',
        ],
        tips: 'Dê oportunidade a novas ideias antes de julgar. Ofereça críticas construtivamente. Reconheça que nem todos trabalham da mesma forma. Valorize diferentes contribuições.',
      },
      idealEnvironment: {
        culture: 'Profissionalismo, respeito por hierarquia, recompensa por competência e cumprimento de prazos',
        structure: 'Regras claras, expectativas definidas, processos estabelecidos, estabilidade organizacional',
        challenges: 'Problemas práticos e concretos que requerem atenção meticulosa e implementação disciplinada',
        avoid: 'Caos constante, mudanças frequentes sem razão clara, ambiguidade de expectativas, falta de estrutura',
      },
      conflictResolution: {
        approach: 'ISTJs abordam conflitos de forma direta e factual, focando em o que aconteceu e como prevenir no futuro',
        tips: [
          'Lembre-se que nem todos processam conflitos de forma tão direta',
          'Reconheça componentes emocionais antes de focar apenas em fatos',
          'Evite usar "sempre" e "nunca" em discussões',
          'Esteja aberto a que sua forma pode não ser a única forma correta',
        ],
      },
    },
  },

  learning: {
    isGated: true,
    preview: 'ISTJs aprendem melhor através de instrução estruturada, aplicação prática e repetição metódica...',
    content: {
      style: {
        overview: 'ISTJs são aprendizes práticos e metódicos que valorizam informação factual, aplicação concreta e métodos testados pelo tempo.',
        preferences: [
          'Instrução passo a passo com sequência clara',
          'Exemplos concretos e aplicações práticas do mundo real',
          'Tempo adequado para praticar até dominar',
          'Materiais bem organizados com estrutura lógica',
          'Evidências de que método é comprovado e eficaz',
        ],
        challenges: [
          'Aulas puramente teóricas sem aplicação prática',
          'Ambientes de aprendizagem caóticos ou não estruturados',
          'Professores que mudam frequentemente de método ou abordagem',
          'Aprendizagem através de tentativa e erro sem orientação',
          'Conceitos abstratos sem conexão com realidade',
        ],
      },
      strategies: {
        maximizeStrengths: [
          'Use memorização factual como base para compreensão mais profunda',
          'Crie checklists e guias passo a passo para novos procedimentos',
          'Pratique repetidamente até procedimento tornar-se automático',
          'Relacione novo conhecimento a experiências e aprendizados passados',
          'Organize notas de forma meticulosa e sistemática',
        ],
        overcomeWeaknesses: [
          'Para conceitos abstratos, busque ativamente analogias concretas',
          'Quando enfrentar ambiguidade, crie estrutura própria',
          'Pratique pensamento criativo em ambiente seguro e de baixo risco',
          'Dê a si mesmo permissão para cometer erros ao aprender algo novo',
          'Busque equilíbrio entre domínio completo e progresso adequado',
        ],
      },
      idealEnvironments: [
        'Programas de treinamento corporativo estruturados',
        'Cursos técnicos e vocacionais com componente prático forte',
        'Aprendizagem através de mentoria com expert experiente',
        'Certificações profissionais com critérios claros',
        'Ambientes educacionais tradicionais com expectativas definidas',
      ],
    },
  },

  stress: {
    isGated: true,
    preview: 'ISTJs sob stress podem tornar-se rígidos, obsessivos com detalhes e catastroficamente pessimistas sobre possibilidades futuras...',
    content: {
      triggers: {
        primary: [
          'Mudanças súbitas e frequentes sem explicação ou planejamento',
          'Incompetência ou irresponsabilidade de outros afetando seu trabalho',
          'Ambiguidade prolongada e falta de direção clara',
          'Violação de princípios éticos ou regras importantes',
          'Sobrecarga de trabalho sem possibilidade de cumprir padrões próprios',
        ],
        secondary: [
          'Falta de controle sobre ambiente ou cronograma',
          'Pessoas não cumprindo compromissos ou prazos',
          'Pressão para tomar decisões sem informação adequada',
          'Caos ou desorganização no ambiente de trabalho ou doméstico',
          'Conflito interpessoal ou confronto emocional',
        ],
      },
      manifestations: {
        early: [
          'Intensificação de comportamentos organizacionais (limpar, arrumar)',
          'Irritabilidade aumentada com desvios de procedimentos',
          'Trabalhar horas mais longas para manter controle',
          'Retirada de interações sociais para focar em tarefas',
        ],
        advanced: [
          'Rigidez extrema, recusa total a considerar alternativas',
          'Obsessão com detalhes insignificantes',
          'Catastrofização sobre futuro (Ne grip)',
          'Crítica severa de si mesmo e outros',
          'Exaustão física por ignorar necessidades básicas',
        ],
      },
      recovery: {
        immediate: [
          'Retornar a rotinas e ambientes familiares e confortáveis',
          'Engajar em atividades físicas práticas (organizar, construir, limpar)',
          'Tempo sozinho em ambiente calmo e ordenado',
          'Listar fatos objetivos vs. preocupações imaginadas',
        ],
        longTerm: [
          'Desenvolver tolerância à ambiguidade através de exposição gradual',
          'Praticar técnicas de flexibilidade cognitiva',
          'Estabelecer limites claros entre trabalho e vida pessoal',
          'Cultivar hobbies e relacionamentos fora do trabalho',
          'Buscar terapia ou coaching para desenvolver resiliência emocional',
        ],
      },
    },
  },

  communication: {
    isGated: true,
    preview: 'ISTJs comunicam de forma direta, factual e eficiente, valorizando clareza e precisão acima de tato diplomático...',
    content: {
      style: {
        characteristics: [
          'Direto e ao ponto, sem elaboração desnecessária',
          'Focado em fatos, dados e detalhes específicos',
          'Preferência por comunicação escrita e documentada',
          'Tom formal e profissional na maioria dos contextos',
          'Expectativa de que outros sejam igualmente diretos',
        ],
        strengths: [
          'Clareza excepcional - dificilmente há mal-entendidos sobre o que querem dizer',
          'Comunicação eficiente que respeita tempo de todos',
          'Consistência entre palavras e ações',
          'Honestidade direta sem jogos ou manipulação',
        ],
        challenges: [
          'Pode parecer abrasivo ou insensível para tipos mais sensíveis',
          'Dificuldade em ler ou responder a subtextos emocionais',
          'Podem ofender sem intenção ao serem "apenas honestos"',
          'Relutância em compartilhar pensamentos até estarem completamente formados',
        ],
      },
      withDifferentTypes: {
        analysts: 'Compartilham lógica e diretividade. Foco: fundamente conclusões em dados, não apenas teoria.',
        diplomats: 'Maior desafio. Foco: reconheça necessidades emocionais, suavize críticas diretas.',
        sentinels: 'Comunicação mais natural. Foco: respeite hierarquia, seja claro sobre expectativas.',
        explorers: 'Tensão entre estrutura e espontaneidade. Foco: seja flexível, permita alguma improvisação.',
      },
      tips: {
        toImprove: [
          'Antes de crítica direta, considere impacto emocional e suavize entrega',
          'Pratique expressar apreciação verbalmente, não apenas através de ações',
          'Faça perguntas para entender perspectiva antes de corrigir',
          'Reconheça que nem todas conversas precisam ser eficientes - algumas são para conexão',
          'Aprenda a ler linguagem corporal e sinais emocionais não-verbais',
        ],
        forOthers: [
          'Seja direto e claro sobre o que precisa de ISTJ',
          'Forneça fatos e detalhes específicos, não apenas impressões',
          'Respeite tempo deles - seja eficiente em comunicação',
          'Não leve honestidade direta como ataque pessoal',
          'Dê tempo para processar antes de esperar resposta emocional',
        ],
      },
    },
  },

  values: {
    isGated: true,
    preview: 'ISTJs valorizam profundamente responsabilidade, tradição, ordem, integridade e competência...',
    content: {
      core: [
        {
          value: 'Responsabilidade',
          description: 'Cumprir obrigações e compromissos é sagrado; sua palavra é seu vínculo.',
          details: 'Assumem responsabilidade total por ações e resultados; nunca fazem desculpas ou culpam outros.',
        },
        {
          value: 'Tradição e Continuidade',
          description: 'Respeito por instituições, práticas e valores testados pelo tempo.',
          details: 'Valorizam história familiar, tradições organizacionais, e métodos comprovados; relutam em mudar o que funciona.',
        },
        {
          value: 'Ordem e Estrutura',
          description: 'Sociedade funciona melhor com regras claras, hierarquias definidas e processos estabelecidos.',
          details: 'Criam e mantêm sistemas organizacionais; desconforto com caos e ambiguidade.',
        },
        {
          value: 'Integridade',
          description: 'Comportamento ético consistente baseado em princípios claros de certo e errado.',
          details: 'Fazem o que é certo mesmo quando difícil; não comprometem valores por conveniência.',
        },
        {
          value: 'Competência',
          description: 'Domínio de habilidades e conhecimento em área de responsabilidade.',
          details: 'Trabalham incansavelmente para melhorar expertise; respeitam e recompensam competência em outros.',
        },
      ],
      conflicts: {
        traditionVsProgress: 'Tensão entre valorizar tradição e necessidade de adaptação em mundo em mudança.',
        dutyVsDesire: 'Conflito entre obrigações e desejos pessoais; frequentemente escolhem dever.',
        efficiencyVsEmpathy: 'Balanceamento entre fazer o que é logicamente correto e considerar impacto emocional em pessoas.',
      },
      decision: {
        framework: 'ISTJs tomam decisões baseadas em: 1) Precedentes e experiência passada, 2) Regras e procedimentos estabelecidos, 3) Lógica e eficiência prática, 4) Valores éticos pessoais.',
        process: 'Coletam todos os fatos relevantes, consultam experiências similares passadas, aplicam lógica metódica, consideram se alinha com valores, decidem e comprometem completamente.',
      },
    },
  },

  development: {
    byAge: {
      youth: {
        range: '0-20 anos',
        focus: 'Desenvolvimento de Si dominante',
        characteristics: [
          'Crianças excepcionalmente responsáveis e obedientes',
          'Preferência por rotinas e estrutura clara',
          'Desconforto com mudanças ou novidades',
          'Memória excelente para fatos e detalhes',
          'Podem parecer "velhos demais" para idade',
        ],
        guidance: 'Forneça estrutura mas também exponha a novas experiências gradualmente. Encoraje expressão emocional. Valorize responsabilidade mas não sobrecarregue com expectativas.',
      },
      youngAdult: {
        range: '20-35 anos',
        focus: 'Desenvolvimento de Te auxiliar',
        characteristics: [
          'Estabelecimento de carreira e reputação de confiabilidade',
          'Foco em construir competência profissional',
          'Podem trabalhar demais e negligenciar vida pessoal',
          'Formação de relacionamentos sérios baseados em valores compartilhados',
          'Estabelecimento de rotinas de vida que seguirão por décadas',
        ],
        guidance: 'Busque equilíbrio entre trabalho e vida. Não sacrifique relacionamentos por carreira. Esteja aberto a métodos novos ocasionalmente.',
      },
      midlife: {
        range: '35-50 anos',
        focus: 'Integração de Fi terciário',
        characteristics: [
          'Questionamento de se obrigações realmente alinham com valores profundos',
          'Possível crise de meia-idade se sentirem presos por responsabilidades',
          'Desenvolvimento de interesses pessoais além do trabalho',
          'Maior consciência de necessidades emocionais próprias e alheias',
          'Sabedoria crescente sobre quando flexibilidade é apropriada',
        ],
        guidance: 'Permita-se questionar obrigações que não servem mais. Conecte com valores profundos. Desenvolva vida emocional mais rica.',
      },
      mature: {
        range: '50+ anos',
        focus: 'Desenvolvimento de Ne inferior',
        characteristics: [
          'Maior abertura a novas possibilidades e perspectivas',
          'Sabedoria sobre quando tradição serve e quando não serve mais',
          'Equilíbrio entre estrutura e flexibilidade',
          'Mentores valiosos que combinam experiência com abertura',
          'Possível interesse em legado além de tarefas imediatas',
        ],
        guidance: 'Use experiência vasta para orientar próxima geração. Permita-se explorar interesses não práticos. Celebre realizações de vida de serviço.',
      },
    },
  },
};
