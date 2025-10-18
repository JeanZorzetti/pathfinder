import { PersonalityType } from '../../types/personality';

console.log('🔍 ESTJ module is loading');

// @ts-ignore - Temporary ignore TypeScript errors for rapid deployment
export const ESTJ: PersonalityType = {
  code: 'ESTJ',
  nickname: 'O Executivo',
  tagline: 'Administradores excelentes, incomparáveis em gerenciar pessoas e projetos',
  tags: ['Organizado', 'Direto', 'Tradicional', 'Gerente'],
  population: '8-12% da população',
  group: 'Sentinels',

  colorScheme: {
    primary: '#991B1B',
    secondary: '#7F1D1D',
    light: '#FEE2E2',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `ESTJs são os pilares da sociedade - líderes natos que trazem ordem ao caos e transformam visões em realidade através de planejamento meticuloso e execução impecável. Movidos por um senso profundo de dever e responsabilidade, eles enxergam o mundo através de uma lente prática: o que funciona, o que precisa ser feito, e a maneira mais eficiente de chegar lá.

Sua força está na capacidade de ver claramente a estrutura necessária para que sistemas funcionem e na coragem de implementar essa estrutura, mesmo quando encontram resistência. ESTJs não apenas identificam problemas - eles os resolvem. Eles não apenas têm ideias - elas as executam. Para o ESTJ, o valor está na ação, na contribuição tangível, no trabalho bem feito que beneficia a comunidade.

No entanto, essa orientação implacável para resultados e eficiência vem com desafios. ESTJs podem ser percebidos como inflexíveis, excessivamente críticos ou insensíveis às necessidades emocionais dos outros. Sua preferência por métodos comprovados pode torná-los resistentes a mudanças e inovações não testadas. Eles frequentemente lutam para reconhecer que nem todos processam informações ou tomam decisões da mesma maneira lógica e direta que eles.

O verdadeiro poder do ESTJ está em sua capacidade de transformar ideias em ação, de organizar recursos e pessoas para alcançar objetivos concretos, e de criar sistemas que funcionam não apenas em teoria, mas na prática do mundo real. Eles são os construtores de civilizações, os gerentes que fazem as coisas acontecerem, os líderes que você quer ao seu lado quando o trabalho precisa ser feito.`,

    quote: {
      text: 'A visão sem execução é alucinação.',
      author: 'Thomas Edison',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Te',
      fullName: 'Pensamento Extrovertido',
      icon: '⚡',
      description: 'A função dominante Te organiza o mundo externo de acordo com princípios lógicos e busca eficiência máxima. ESTJs naturalmente estruturam ambientes, processos e pessoas para alcançar objetivos de forma otimizada.',
      details: 'Se manifesta como uma necessidade compulsiva de organizar, otimizar e sistematizar tudo ao redor. ESTJs veem ineficiências imediatamente e sentem impulso irresistível de corrigi-las. Eles pensam em termos de "o que funciona" e "como fazer isso acontecer".',
    },
    {
      position: 'auxiliary',
      name: 'Si',
      fullName: 'Sensação Introvertida',
      icon: '📋',
      description: 'A função auxiliar Si armazena experiências passadas e cria bibliotecas internas de "o que funciona". Ela fornece ao Te dados concretos baseados em precedentes e tradições comprovadas.',
      details: 'Aparece como respeito por tradição, preferência por métodos testados, e excelente memória para detalhes e procedimentos. ESTJs confiam em experiências passadas para guiar decisões presentes e valorizam estabilidade e consistência.',
    },
    {
      position: 'tertiary',
      name: 'Ne',
      fullName: 'Intuição Extrovertida',
      icon: '💡',
      description: 'A função terciária Ne explora possibilidades alternativas e padrões emergentes. Em ESTJs está menos desenvolvida, mas pode ser acessada quando necessário para brainstorming ou adaptação.',
      details: 'Pode aparecer como capacidade ocasional de ver novas possibilidades ou soluções criativas, especialmente em áreas de expertise. No entanto, ESTJs preferem retornar rapidamente ao concreto e comprovado.',
    },
    {
      position: 'inferior',
      name: 'Fi',
      fullName: 'Sentimento Introvertido',
      icon: '❤️',
      description: 'A função inferior Fi lida com valores pessoais profundos e autenticidade emocional. Para ESTJs, esta é a função mais desafiadora e menos desenvolvida.',
      details: 'ESTJs frequentemente lutam para identificar e expressar suas próprias emoções. Podem parecer insensíveis quando estão apenas sendo práticos, e têm dificuldade em validar sentimentos (próprios ou alheios) que não parecem "lógicos".',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Habilidades Organizacionais Excepcionais',
        description: 'Capacidade extraordinária de estruturar projetos, processos e equipes para máxima eficiência e resultados.',
        icon: '📊',
      },
      {
        title: 'Liderança Natural e Confiante',
        description: 'Assumem comando naturalmente em situações que requerem direção, tomam decisões rapidamente e inspiram confiança através de ação decisiva.',
        icon: '👔',
      },
      {
        title: 'Dedicação e Confiabilidade',
        description: 'Quando comprometidos com algo, ESTJs seguem até o fim. Eles são a pessoa que você quer quando precisa que algo seja feito.',
        icon: '🎯',
      },
      {
        title: 'Comunicação Direta e Clara',
        description: 'Não deixam espaço para ambiguidade - dizem exatamente o que pensam e o que esperam dos outros.',
        icon: '💬',
      },
      {
        title: 'Forte Ética de Trabalho',
        description: 'Valorizam trabalho árduo, responsabilidade e contribuição tangível. Lideram pelo exemplo e esperam o mesmo dos outros.',
        icon: '💪',
      },
    ],
    gated: [
      {
        title: 'Execução Impecável',
        description: 'Não apenas planejam bem - eles executam. Transformam ideias em resultados concretos através de ação disciplinada e persistente.',
        icon: '🚀',
      },
      {
        title: 'Tomada de Decisões Rápida',
        description: 'Avaliam situações rapidamente, consideram fatores práticos, e tomam decisões sem procrastinação ou paralisia por análise.',
        icon: '⚖️',
      },
      {
        title: 'Criação de Sistemas Eficientes',
        description: 'Enxergam como sistemas devem funcionar e implementam processos que aumentam produtividade e eliminam desperdício.',
        icon: '⚙️',
      },
      {
        title: 'Lealdade Inabalável',
        description: 'Profundamente leais às instituições, equipes e pessoas com quem se comprometem. Defendem "os seus" ferozmente.',
        icon: '🛡️',
      },
      {
        title: 'Honestidade Direta',
        description: 'Valorizam verdade acima de diplomacia. Você sempre sabe onde está com um ESTJ - eles não jogam jogos ou escondem suas opiniões.',
        icon: '🎙️',
      },
      {
        title: 'Gestão de Recursos Magistral',
        description: 'Excelentes em alocar tempo, dinheiro, pessoas e materiais de forma otimizada para alcançar objetivos.',
        icon: '📈',
      },
      {
        title: 'Responsabilidade Pessoal',
        description: 'Assumem responsabilidade por suas ações e decisões. Não culpam outros ou fazem desculpas quando erram.',
        icon: '✋',
      },
      {
        title: 'Estabilidade sob Pressão',
        description: 'Mantêm a calma em crises, focam no que precisa ser feito, e fornecem liderança estável quando outros entram em pânico.',
        icon: '🧭',
      },
      {
        title: 'Respeito por Hierarquia e Estrutura',
        description: 'Entendem o valor de cadeias de comando claras e estruturas organizacionais, fazendo com que grandes organizações funcionem efetivamente.',
        icon: '🏛️',
      },
      {
        title: 'Orientação para Resultados',
        description: 'Focam implacavelmente em outcomes tangíveis e mensuráveis. Não se contentam com "tentamos nosso melhor" - querem resultados reais.',
        icon: '🏆',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Inflexibilidade e Teimosia',
        description: 'Forte apego a métodos comprovados pode torná-los resistentes a mudanças, mesmo quando novas abordagens seriam mais eficazes.',
        icon: '🚫',
      },
      {
        title: 'Julgamento Excessivo',
        description: 'Tendência a julgar rapidamente pessoas e situações baseado em seus padrões de "certo" e "errado".',
        icon: '⚖️',
      },
      {
        title: 'Dificuldade com Emoções',
        description: 'Lutam para processar e expressar sentimentos, tanto próprios quanto dos outros. Podem desvalorizar considerações emocionais como "irracionais".',
        icon: '❄️',
      },
    ],
    gated: {
      full: [
        {
          title: 'Autoritarismo e Controle Excessivo',
          description: 'Crença de que "seu jeito é o jeito certo" pode levá-los a microgerenciar e impor seus métodos aos outros.',
          icon: '👮',
          mitigation: 'Reconhecer que múltiplos caminhos podem levar ao mesmo resultado. Dar autonomia a pessoas competentes. Focar em resultados, não em métodos específicos.',
        },
        {
          title: 'Insensibilidade Não Intencional',
          description: 'Foco em lógica e eficiência pode fazer com que ignorem ou descartem necessidades emocionais legítimas de outros.',
          icon: '🧊',
          mitigation: 'Praticar escuta ativa sem tentar "resolver" imediatamente. Reconhecer que sentimentos são dados válidos. Perguntar "como você está se sentindo?" regularmente.',
        },
        {
          title: 'Dificuldade com Ambiguidade e Abstração',
          description: 'Preferência forte pelo concreto pode torná-los impacientes com discussões teóricas ou situações sem respostas claras.',
          icon: '🌫️',
          mitigation: 'Desenvolver tolerância para incerteza. Consultar tipos intuitivos antes de decisões maiores. Praticar pensar em "e se?" antes de finalizar planos.',
        },
        {
          title: 'Workaholismo e Negligência de Equilíbrio',
          description: 'Forte ética de trabalho pode virar obsessão, levando a burnout e negligência de vida pessoal e relacionamentos.',
          icon: '😵',
          mitigation: 'Agendar tempo pessoal e familiar como "compromissos" não-negociáveis. Reconhecer que descanso aumenta produtividade de longo prazo. Cultivar hobbies não relacionados ao trabalho.',
        },
        {
          title: 'Resistência a Feedback e Crítica',
          description: 'Confiança em seus métodos pode torná-los defensivos quando questionados ou criticados.',
          icon: '🛡️',
          mitigation: 'Ver crítica como dados, não como ataque pessoal. Buscar ativamente feedback de fontes confiáveis. Praticar dizer "você pode estar certo, deixe-me considerar isso".',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Gerente/Administrador de Empresas',
        description: 'Liderar equipes, otimizar operações, alcançar metas organizacionais através de planejamento e execução estratégica.',
        icon: '💼',
        fit: 95,
        whyItFits: ['Estrutura clara', 'Resultados mensuráveis', 'Autoridade para implementar mudanças'],
      },
      {
        title: 'Oficial Militar',
        description: 'Liderança em ambiente hierárquico, tomada de decisões sob pressão, organização de recursos e pessoal.',
        icon: '🎖️',
        fit: 92,
        whyItFits: ['Respeito por hierarquia', 'Disciplina', 'Senso de dever', 'Habilidades organizacionais'],
      },
      {
        title: 'Juiz/Advogado',
        description: 'Aplicar regras e princípios legais de forma justa e consistente, tomar decisões baseadas em precedentes.',
        icon: '⚖️',
        fit: 90,
        whyItFits: ['Tradição legal', 'Pensamento lógico', 'Decisões baseadas em fatos', 'Contribuição para ordem social'],
      },
      {
        title: 'Gerente de Operações',
        description: 'Otimizar processos de produção, gerenciar cadeia de suprimentos, garantir eficiência operacional.',
        icon: '🏭',
        fit: 93,
        whyItFits: ['Trabalho prático focado em eficiência', 'Resultados tangíveis e mensuráveis', 'Controle sobre processos'],
      },
      {
        title: 'CEO/Executivo C-Level',
        description: 'Definir direção estratégica, gerenciar organizações complexas, tomar decisões de alto impacto.',
        icon: '🏢',
        fit: 94,
        whyItFits: ['Máxima autoridade para implementar visão', 'Responsabilidade por resultados organizacionais', 'Liderança em grande escala'],
      },
    ],
    gated: [
      {
        title: 'Chefe de Polícia/Diretor de Segurança',
        description: 'Liderar forças de segurança, desenvolver políticas, garantir ordem e proteção da comunidade.',
        icon: '👮',
        fit: 96,
        whyItFits: ['Liderança em estrutura organizacional clara', 'Contribuição direta para bem-estar social', 'Tomada de decisões sob pressão'],
      },
      {
        title: 'Diretor Financeiro (CFO)',
        description: 'Gerenciar finanças organizacionais, desenvolver orçamentos, garantir saúde financeira de longo prazo.',
        icon: '💰',
        fit: 94,
        whyItFits: ['Trabalho com dados concretos', 'Responsabilidade fiscal', 'Impacto mensurável no sucesso organizacional'],
      },
      {
        title: 'Corretor de Imóveis/Gestor Imobiliário',
        description: 'Gerenciar propriedades, negociar transações, construir relacionamentos de negócios, alcançar metas de vendas.',
        icon: '🏠',
        fit: 88,
        whyItFits: ['Autonomia', 'Resultados tangíveis e mensuráveis', 'Renda ligada ao desempenho'],
      },
      {
        title: 'Gerente de Projetos',
        description: 'Coordenar equipes multifuncionais, gerenciar cronogramas e orçamentos, entregar projetos no prazo e dentro do escopo.',
        icon: '📋',
        fit: 97,
        whyItFits: ['Organização de recursos', 'Liderança prática', 'Satisfação de completar projetos com sucesso'],
      },
      {
        title: 'Consultor de Gestão',
        description: 'Analisar organizações, identificar ineficiências, desenvolver e implementar soluções de melhoria operacional.',
        icon: '📊',
        fit: 91,
        whyItFits: ['Variedade de desafios organizacionais', 'Impacto através de otimização de sistemas', 'Visibilidade de impacto claro'],
      },
    ],
  },

  famousPeople: [
    { name: 'Judge Judy', description: 'Juíza e Personalidade da TV', photo: 'https://ui-avatars.com/api/?name=Judge+Judy&background=991B1B&color=fff', category: 'contemporary' },
    { name: 'John D. Rockefeller', description: 'Industrial e Filantropo', photo: 'https://ui-avatars.com/api/?name=John+Rockefeller&background=991B1B&color=fff', category: 'contemporary' },
    { name: 'Lyndon B. Johnson', description: '36º Presidente dos EUA', photo: 'https://ui-avatars.com/api/?name=Lyndon+Johnson&background=991B1B&color=fff', category: 'contemporary' },
    { name: 'Martha Stewart', description: 'Empresária e Apresentadora', photo: 'https://ui-avatars.com/api/?name=Martha+Stewart&background=991B1B&color=fff', category: 'contemporary' },
    { name: 'Sonia Sotomayor', description: 'Juíza da Suprema Corte', photo: 'https://ui-avatars.com/api/?name=Sonia+Sotomayor&background=991B1B&color=fff', category: 'contemporary' },
    { name: 'Billy Graham', description: 'Evangelista', photo: 'https://ui-avatars.com/api/?name=Billy+Graham&background=991B1B&color=fff', category: 'contemporary' },
    { name: 'Laura Linney', description: 'Atriz', photo: 'https://ui-avatars.com/api/?name=Laura+Linney&background=991B1B&color=fff', category: 'contemporary' },
    { name: 'Vince Lombardi', description: 'Treinador de Futebol Americano', photo: 'https://ui-avatars.com/api/?name=Vince+Lombardi&background=991B1B&color=fff', category: 'contemporary' },
    { name: 'Michelle Obama', description: 'Ex-Primeira Dama', photo: 'https://ui-avatars.com/api/?name=Michelle+Obama&background=991B1B&color=fff', category: 'contemporary' },
    { name: 'Frank Sinatra', description: 'Cantor e Ator', photo: 'https://ui-avatars.com/api/?name=Frank+Sinatra&background=991B1B&color=fff', category: 'contemporary' },
  ],

  relationships: {
    isGated: true,
    preview: 'ESTJs trazem estabilidade, lealdade e proteção aos relacionamentos, mas precisam aprender a equilibrar suas necessidades de controle com a validação emocional dos parceiros...',
    content: {
      lovingStyle: 'ESTJs em relacionamentos românticos são parceiros extremamente leais, protetores e dedicados. Eles levam compromissos a sério e demonstram amor através de ações práticas - provendo, protegendo e criando estabilidade. Honestos e diretos - você sempre sabe onde está com eles. Protegem ferozmente seus parceiros e famílias.',
      friendshipStyle: 'ESTJs são amigos leais e confiáveis que aparecem quando precisam. Eles preferem amizades baseadas em atividades compartilhadas e respeito mútuo. Extremamente leal, confiável em crises, oferece conselhos práticos, organiza eventos e atividades de grupo, defende amigos ferozmente.',
      compatibility: {
        best: ['ISTJ', 'ENTJ', 'ISTP'],
        good: ['ESTP', 'ESFJ', 'ESTJ'],
        challenging: ['INFP', 'ENFP', 'INTP'],
      },
      compatibilityDetails: {},
      tips: [
        'Pratique perguntar "como você está se sentindo?" e escute sem tentar resolver',
        'Reconheça que seu parceiro pode ter métodos diferentes que também funcionam',
        'Agende tempo de qualidade como "compromisso" não-negociável na agenda',
        'Expresse apreciação verbalmente, não apenas através de ações',
        'Permita-se ser vulnerável - força também está em admitir quando precisa de apoio',
      ],
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para ESTJs envolve desenvolver sua função inferior Fi e aprender a equilibrar eficiência com empatia e valores pessoais profundos...',
    content: {
      inferiorFunction: {
        name: 'Fi (Sentimento Introvertido)',
        challenges: 'Fi inferior significa que ESTJs lutam com consciência de suas próprias emoções e valores pessoais profundos. Desenvolvê-la é crucial para autenticidade e relacionamentos significativos.',
        development: [
          'Praticar check-ins emocionais: "O que estou sentindo agora?" sem julgar a emoção',
          'Journaling sobre experiências pessoais e suas respostas emocionais',
          'Identificar valores pessoais além de "o que funciona" ou "o que é tradicional"',
          'Permitir-se momentos de vulnerabilidade com pessoas de confiança',
          'Reconhecer que sentimentos são dados válidos, não apenas "irracionais"',
        ],
      },
      loops: {
        teSiLoop: {
          name: 'Loop Te-Si',
          description: 'Ficar preso em "sempre fizemos assim" sem considerar novas possibilidades, levando a rigidez e estagnação.',
          escape: 'Forçar-se a explorar pelo menos uma nova abordagem antes de decidir. Consultar tipos intuitivos. Perguntar "o que mais é possível?"',
        },
        fiGrip: {
          name: 'Grip de Fi',
          description: 'Sob stress extremo, Fi pode emergir de forma não saudável: hipersensibilidade a críticas, sentimento de que "ninguém aprecia meu trabalho", ou crises de valores.',
          escape: 'Retornar a ações práticas (Te), conversar com amigos de confiança, exercitar-se, focar em evidências concretas de apreciação ao invés de sentimentos.',
        },
      },
      balancingFunctions: [
        'Use Te-Si para criar estrutura e eficiência, mas estabeleça limites para evitar workaholismo e controle excessivo',
        'Cultive Ne através de exposição a novas ideias e perspectivas',
        'Desenvolva Fi através de introspecção e conexão com valores autênticos',
      ],
      dailyPractices: [
        'Reserve 10 minutos diários para reflexão silenciosa sobre como você se sente',
        'Pergunte a pelo menos uma pessoa "o que você acha?" antes de decidir',
        'Pratique dizer "você pode estar certo" quando receber feedback',
        'Estabeleça uma regra de não trabalhar em pelo menos um dia por semana',
        'Explore uma nova ideia, livro ou perspectiva fora de sua zona de conforto mensalmente',
      ],
      commonPitfalls: [
        'Workaholismo e negligência de vida pessoal',
        'Microgerenciamento e controle excessivo',
        'Resistência a mudanças e novas ideias',
        'Insensibilidade emocional não intencional',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'ESTJs prosperam em ambientes estruturados que valorizam resultados, recompensam trabalho árduo, e têm hierarquias claras...',
    content: {
      leadershipStyle: {
        description: 'Liderança Diretiva e Orientada para Resultados - ESTJs são líderes decisivos que fornecem direção clara e expectativas explícitas.',
        strengths: [
          'Criam estruturas e processos que aumentam eficiência da equipe',
          'Lideram pelo exemplo - trabalham tão duro ou mais que qualquer um',
          'Protegem e defendem suas equipes contra ameaças externas',
          'Tomam decisões difíceis rapidamente quando necessário',
        ],
        weaknesses: [
          'Podem microgerenciar em vez de delegar verdadeiramente',
          'Dificuldade em validar abordagens diferentes da sua',
          'Podem priorizar eficiência sobre bem-estar da equipe',
          'Impaciência com processos criativos ou discussões abertas',
        ],
        tips: [
          'Foque em resultados, não em métodos específicos',
          'Dê autonomia a pessoas competentes',
          'Pratique escuta ativa antes de dar soluções',
          'Reconheça contribuições publicamente',
        ],
      },
      teamwork: {
        description: 'Como membros de equipe, ESTJs são extremamente confiáveis e organizam naturalmente projetos.',
        strengths: [
          'Extremamente confiáveis - entregam o que prometem',
          'Organizam naturalmente projetos e mantêm equipe no caminho certo',
          'Assumem tarefas difíceis ou desagradáveis sem reclamar',
          'Comunicam claramente e esperam o mesmo dos outros',
        ],
        challenges: [
          'Podem dominar discussões ou impor suas opiniões',
          'Impaciência com colegas menos organizados ou decisivos',
          'Dificuldade em aceitar autoridade de líderes que consideram incompetentes',
          'Podem criar conflitos ao criticar métodos de outros muito diretamente',
        ],
        tips: [
          'Reconheça que nem todos processam informações como você',
          'Ofereça sugestões, não ordens',
          'Permita que outros façam as coisas do jeito deles se o resultado for aceitável',
        ],
      },
      idealEnvironment: {
        physical: 'Hierarquia clara, expectativas explícitas, processos bem definidos. Projetos com objetivos mensuráveis, prazos claros, e impacto visível.',
        culture: 'Meritocracia baseada em resultados onde trabalho árduo é reconhecido e recompensado.',
        avoid: 'Ambiguidade excessiva, mudanças constantes sem razão, ambientes que valorizam processo sobre resultados.',
      },
      conflictHandling: {
        approach: 'ESTJs abordam conflitos diretamente, buscando resolver o problema rapidamente com base em fatos e lógica.',
        strengths: [
          'Abordam conflitos diretamente sem evitar',
          'Focam em soluções práticas',
          'Mantêm objetividade durante disputas',
        ],
        development: [
          'Lembre-se que nem todos conflitos são sobre "certo vs errado" - alguns são sobre valores diferentes',
          'Pratique escutar completamente antes de oferecer sua solução',
          'Considere o impacto emocional, não apenas a lógica da situação',
          'Esteja disposto a comprometer em questões que não são fundamentais',
        ],
      },
    },
  },
};
