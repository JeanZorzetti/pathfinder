import { PersonalityType } from '../../types/personality';

export const INFP: PersonalityType = {
  // ============================================================================
  // Identificação
  // ============================================================================
  code: 'INFP',
  nickname: 'O Mediador',
  tagline: 'Idealistas poéticos em busca de significado',
  tags: ['Idealista', 'Autêntico', 'Empático', 'Criativo'],
  population: '4-5%',
  group: 'Diplomats',

  colorScheme: {
    primary: '#9F7AEA',
    secondary: '#805AD5',
    light: '#D6BCFA',
    contrast: '#FFFFFF',
  },

  // ============================================================================
  // Overview (Gratuito)
  // ============================================================================
  overview: {
    description: `INFPs são almas profundamente idealistas que veem o mundo não como ele é, mas como poderia ser. Com sua função dominante Fi (Sentimento Introvertido), vocês possuem uma bússola moral interna incrivelmente forte e vivem guiados por valores pessoais autênticos.

Vocês são os poetas, os sonhadores, os buscadores de significado. Sua função auxiliar Ne (Intuição Extrovertida) garante que você veja possibilidades infinitas em tudo - cada pessoa tem potencial, cada situação tem múltiplos ângulos, cada problema tem soluções criativas.

INFPs sentem profundamente. Sua vida emocional é rica e complexa como um oceano - calma na superfície, mas com correntes poderosas por baixo. Você não apenas sente suas próprias emoções; você sente as dos outros também. Essa empatia natural faz de você um amigo leal e um defensor apaixonado de causas que importam.

Representando 4-5% da população, INFPs frequentemente se sentem "diferentes" ou incompreendidos. Você valoriza autenticidade acima de popularidade e prefere ter poucos amigos verdadeiros a muitos superficiais. Seu mundo interno é tão rico que você poderia passar horas apenas pensando e imaginando.`,

    quote: {
      text: 'Ser você mesmo em um mundo que constantemente tenta fazer de você outra coisa é a maior conquista.',
      author: 'Ralph Waldo Emerson',
    },
  },

  // ============================================================================
  // Funções Cognitivas (Gratuito)
  // ============================================================================
  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Fi',
      fullName: 'Sentimento Introvertido',
      icon: '💎',
      description: 'Valores profundos e autenticidade pessoal',
      details:
        'Você possui uma bússola moral interna forte e vive de acordo com seus ideais. Fi cria um sistema de valores único e pessoal que guia todas as suas decisões. Você sabe o que é certo para VOCÊ, independente do que outros pensam. Essa autenticidade inabalável é seu superpoder.',
    },
    {
      position: 'auxiliary',
      name: 'Ne',
      fullName: 'Intuição Extrovertida',
      icon: '🌈',
      description: 'Possibilidades infinitas e conexões criativas',
      details:
        'Você vê potencial em tudo e explora ideias de forma divergente. Ne permite que você imagine múltiplos futuros, faça conexões inesperadas e veja o melhor nas pessoas. É como ter uma antena para possibilidades - você vê não o que é, mas o que poderia ser.',
    },
    {
      position: 'tertiary',
      name: 'Si',
      fullName: 'Sensação Introvertida',
      icon: '📖',
      description: 'Memórias emocionais e experiências pessoais',
      details:
        'Você guarda memórias emocionais vívidas que informam seus valores. Si armazena experiências pessoais ricas em detalhes sensoriais e emocionais. Uma música pode transportá-lo instantaneamente para um momento do passado, completo com todos os sentimentos.',
    },
    {
      position: 'inferior',
      name: 'Te',
      fullName: 'Pensamento Extrovertido',
      icon: '⚙️',
      description: 'Organização lógica e estrutura externa',
      details:
        'Sua área de desenvolvimento - pode lutar com estrutura, decisões práticas e organização externa. Te é sobre eficiência e sistemas objetivos. Quando sub-desenvolvido, você pode procrastinar tarefas administrativas, ter dificuldade com prazos ou evitar confrontos necessários.',
    },
  ],

  // ============================================================================
  // Forças (5 Gratuitas + 10 Gated)
  // ============================================================================
  strengths: {
    // Gratuitas - Top 5
    free: [
      {
        title: 'Empatia Profunda',
        description:
          'Você sente e compreende emoções alheias de forma natural e genuína. Sua capacidade de se colocar no lugar do outro é extraordinária.',
        example:
          'Quando alguém está sofrendo, você não apenas entende intelectualmente - você SENTE com eles, oferecendo conforto autêntico.',
        icon: '❤️',
      },
      {
        title: 'Criatividade Artística',
        description:
          'Você expressa ideias e emoções através de arte, escrita ou outras formas criativas. Sua sensibilidade se transforma em obras tocantes.',
        example:
          'Suas palavras escritas têm profundidade emocional que ressoa com outros. Você cria arte que faz as pessoas sentirem.',
        icon: '🎨',
      },
      {
        title: 'Autenticidade Inabalável',
        description:
          'Você se recusa a ser falso e valoriza ser verdadeiro consigo mesmo. Prefere solidão à falsidade.',
        icon: '✨',
      },
      {
        title: 'Idealismo Inspirador',
        description:
          'Sua visão de um mundo melhor motiva você e inspira outros. Você acredita genuinamente que o bem pode vencer.',
        icon: '🌟',
      },
      {
        title: 'Lealdade nas Relações',
        description:
          'Quando você se compromete com alguém, é profundamente e para sempre. Suas amizades são vínculos sagrados.',
        icon: '🤝',
      },
    ],

    // Gated - +10 forças secundárias
    gated: [
      {
        title: 'Sensibilidade às Nuances',
        description:
          'Você capta sutilezas emocionais e contextuais que outros perdem. Entende entrelinhas e significados ocultos.',
        icon: '🔍',
      },
      {
        title: 'Mente Aberta',
        description:
          'Você aceita diferenças genuinamente e não julga estilos de vida alternativos. Cada pessoa tem sua jornada válida.',
        icon: '🌍',
      },
      {
        title: 'Cura Emocional',
        description:
          'Sua presença acalma e conforta. Pessoas se sentem seguras para ser vulneráveis com você.',
        icon: '🕊️',
      },
      {
        title: 'Pensamento Holístico',
        description:
          'Você vê conexões entre áreas aparentemente não relacionadas, criando sínteses únicas.',
        icon: '🧩',
      },
      {
        title: 'Advocacia Apaixonada',
        description:
          'Quando você acredita em uma causa, luta por ela com determinação silenciosa mas poderosa.',
        icon: '⚔️',
      },
      {
        title: 'Flexibilidade Adaptativa',
        description:
          'Você se adapta a mudanças quando necessário, mantendo seus valores centrais intactos.',
        icon: '🌊',
      },
      {
        title: 'Visão Romântica',
        description:
          'Você vê beleza onde outros veem comum. Transforma o mundano em mágico através da perspectiva.',
        icon: '💫',
      },
      {
        title: 'Escuta Profunda',
        description:
          'Você realmente ouve - não apenas palavras, mas emoções, medos, sonhos. As pessoas sentem-se verdadeiramente compreendidas.',
        icon: '👂',
      },
      {
        title: 'Coragem Moral',
        description:
          'Você defende o que acredita mesmo quando não é popular. Seus princípios não são negociáveis.',
        icon: '🛡️',
      },
      {
        title: 'Potencial Visionário',
        description:
          'Você vê o melhor nas pessoas e situações, ajudando-as a alcançar esse potencial.',
        icon: '🌱',
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
        title: 'Idealismo Impraticável',
        description:
          'Você pode ter dificuldade em aceitar imperfeições da realidade. O mundo nunca está à altura dos seus ideais.',
        icon: '☁️',
      },
      {
        title: 'Evitação de Conflitos',
        description:
          'Você pode evitar confrontos necessários para manter a harmonia, acumulando ressentimentos não expressos.',
        icon: '🙈',
      },
      {
        title: 'Auto-crítica Excessiva',
        description:
          'Você se julga duramente por não atingir seus altos padrões. Sua crítica interna é implacável.',
        icon: '💔',
      },
    ],

    // Gated - Análise completa + estratégias
    gated: {
      full: [
        {
          title: 'Procrastinação Crônica',
          description:
            'Tarefas práticas e administrativas podem ser adiadas indefinidamente. Te inferior torna estrutura dolorosa.',
          mitigation:
            'Use a técnica Pomodoro: 25 min de foco, 5 min de pausa. Torne tarefas chatas em "missões" alinhadas com valores. Ex: "organizar finanças = liberdade criativa futura".',
          icon: '⏰',
        },
        {
          title: 'Sensibilidade Excessiva à Crítica',
          description:
            'Críticas, mesmo construtivas, podem ser devastadoras. Você leva tudo para o lado pessoal.',
          mitigation:
            'Pratique separar "eu" de "comportamento". Crítica ao comportamento ≠ crítica à essência. Lembre-se: feedback é dados, não ataque pessoal.',
          icon: '🥀',
        },
        {
          title: 'Dificuldade com Decisões Práticas',
          description:
            'Você pode ficar paralisado por opções, especialmente decisões "sem alma" como qual seguro contratar.',
          mitigation:
            'Estabeleça prazos artificiais. Para decisões práticas, use regra 80/20: 80% da informação é suficiente. Delegue decisões administrativas quando possível.',
          icon: '🤔',
        },
        {
          title: 'Negligência do Autocuidado',
          description:
            'Você cuida de todos, mas esquece de cuidar de si mesmo. Burnout emocional é comum.',
          mitigation:
            'Trate autocuidado como responsabilidade moral - você não pode ajudar outros se estiver exausto. Agende "tempo não negociável" para recarregar.',
          icon: '🔋',
        },
        {
          title: 'Martírio Silencioso',
          description:
            'Você sofre em silêncio, não comunicando necessidades até explodir ou se afastar.',
          mitigation:
            'Pratique assertividade compassiva: "Eu preciso X porque Y". Lembre-se: expressar necessidades não é egoísmo, é honestidade.',
          icon: '😔',
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
        title: 'Escritor / Poeta',
        fit: 95,
        description:
          'Expressão criativa, trabalho autônomo e exploração de ideias profundas são perfeitos para você.',
        whyItFits: [
          'Expressão autêntica',
          'Trabalho solitário',
          'Exploração de emoções',
        ],
        icon: '✍️',
      },
      {
        title: 'Psicólogo / Terapeuta',
        fit: 93,
        description:
          'Empatia profunda e desejo de ajudar outros a crescer fazem desta uma vocação natural.',
        whyItFits: [
          'Ajudar pessoas',
          'Trabalho significativo',
          'Profundidade emocional',
        ],
        icon: '🧠',
      },
      {
        title: 'Professor (Humanidades)',
        fit: 90,
        description:
          'Inspirar jovens mentes e compartilhar conhecimento sobre arte, literatura ou filosofia.',
        whyItFits: [
          'Fazer diferença',
          'Compartilhar valores',
          'Conexões profundas',
        ],
        icon: '👨‍🏫',
      },
      {
        title: 'Designer Gráfico / UX',
        fit: 88,
        description:
          'Criatividade visual, expressão artística e resolver problemas de forma bonita.',
        whyItFits: [
          'Criatividade diária',
          'Expressão visual',
          'Trabalho flexível',
        ],
        icon: '🎨',
      },
      {
        title: 'Ativista Social / ONG',
        fit: 85,
        description:
          'Defender causas, mudar o mundo e viver seus valores em ação concreta.',
        whyItFits: [
          'Propósito maior',
          'Viver valores',
          'Impacto social',
        ],
        icon: '✊',
      },
    ],

    // Gated - +20 carreiras detalhadas
    gated: [
      {
        title: 'Músico / Compositor',
        fit: 92,
        description:
          'Expressar emoções através de música, criando arte que toca almas.',
        whyItFits: ['Expressão emocional', 'Trabalho criativo', 'Conexão profunda com público'],
        environment: 'Estúdio próprio, colaborações selecionadas, performances íntimas',
        salary: 'Variável (R$ 2.000 - R$ 50.000+)',
        progression: 'Artista independente → Gravadora → Turnês/Streaming',
        icon: '🎵',
      },
      {
        title: 'Conselheiro de Carreira / Life Coach',
        fit: 90,
        description:
          'Ajudar pessoas a encontrar propósito e direção em suas vidas profissionais.',
        whyItFits: ['Empoderar outros', 'Conversas profundas', 'Flexibilidade'],
        environment: 'Consultório próprio ou remoto, horários flexíveis',
        salary: 'R$ 3.000 - R$ 15.000',
        progression: 'Coach júnior → Certificado → Consultoria própria',
        icon: '🧭',
      },
      {
        title: 'Bibliotecário / Arquivista',
        fit: 86,
        description:
          'Trabalho tranquilo com livros, ajudando pessoas a encontrar conhecimento.',
        whyItFits: ['Ambiente calmo', 'Amor por livros', 'Ajudar pesquisadores'],
        environment: 'Biblioteca universitária ou especializada',
        salary: 'R$ 3.500 - R$ 8.000',
        progression: 'Assistente → Bibliotecário → Chefe de acervo',
        icon: '📚',
      },
      {
        title: 'Fotógrafo Artístico',
        fit: 87,
        description:
          'Capturar emoções e momentos através de lentes, criando arte visual significativa.',
        whyItFits: ['Expressão criativa', 'Trabalho autônomo', 'Capturar beleza'],
        environment: 'Freelance, estúdio próprio, locações variadas',
        salary: 'R$ 2.500 - R$ 20.000+',
        progression: 'Assistente → Fotógrafo → Exposições/Livros',
        icon: '📷',
      },
      {
        title: 'Tradutor Literário',
        fit: 85,
        description:
          'Trabalhar com linguagem, literatura e cultura, preservando nuances emocionais.',
        whyItFits: ['Trabalho solitário', 'Amor pela linguagem', 'Flexibilidade'],
        environment: 'Remoto, horário flexível',
        salary: 'R$ 3.000 - R$ 12.000',
        progression: 'Tradutor júnior → Sênior → Obras publicadas',
        icon: '🌐',
      },
    ],
  },

  // ============================================================================
  // Pessoas Famosas (Gratuito)
  // ============================================================================
  famousPeople: [
    {
      name: 'William Shakespeare',
      description: 'Escritor profundo',
      photo: 'https://ui-avatars.com/api/?name=William+Shakespeare&size=200&background=9F7AEA&color=fff',
      category: 'historical',
    },
    {
      name: 'J.R.R. Tolkien',
      description: 'Criador de mundos',
      photo: 'https://ui-avatars.com/api/?name=JRR+Tolkien&size=200&background=9F7AEA&color=fff',
      category: 'historical',
    },
    {
      name: 'Johnny Depp',
      description: 'Artista versátil',
      photo: 'https://ui-avatars.com/api/?name=Johnny+Depp&size=200&background=9F7AEA&color=fff',
      category: 'contemporary',
    },
    {
      name: 'Audrey Hepburn',
      description: 'Ícone humanitário',
      photo: 'https://ui-avatars.com/api/?name=Audrey+Hepburn&size=200&background=9F7AEA&color=fff',
      category: 'historical',
    },
    {
      name: 'Vincent van Gogh',
      description: 'Pintor apaixonado',
      photo: 'https://ui-avatars.com/api/?name=Vincent+van+Gogh&size=200&background=9F7AEA&color=fff',
      category: 'historical',
    },
    {
      name: 'John Lennon',
      description: 'Músico idealista',
      photo: 'https://ui-avatars.com/api/?name=John+Lennon&size=200&background=9F7AEA&color=fff',
      category: 'historical',
    },
    {
      name: 'Alicia Keys',
      description: 'Artista autêntica',
      photo: 'https://ui-avatars.com/api/?name=Alicia+Keys&size=200&background=9F7AEA&color=fff',
      category: 'contemporary',
    },
    {
      name: 'Fred Rogers',
      description: 'Educador empático',
      photo: 'https://ui-avatars.com/api/?name=Fred+Rogers&size=200&background=9F7AEA&color=fff',
      category: 'historical',
    },
    {
      name: 'Frodo Baggins',
      description: 'Herói relutante',
      photo: 'https://ui-avatars.com/api/?name=Frodo+Baggins&size=200&background=9F7AEA&color=fff',
      category: 'fictional',
    },
    {
      name: 'Luna Lovegood',
      description: 'Autêntica e única',
      photo: 'https://ui-avatars.com/api/?name=Luna+Lovegood&size=200&background=9F7AEA&color=fff',
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
      'INFPs buscam conexões profundas e autênticas. Você ama intensamente e idealiza parceiros, às vezes criando expectativas impossíveis. Para você, amor é encontrar alguém que vê sua alma...',
    content: {
      lovingStyle:
        'INFPs amam com intensidade poética e profundidade emocional. Você idealiza seu parceiro, vendo o melhor neles mesmo quando outros não veem. Expressa amor através de gestos pensados, palavras escritas e presença genuína. Para você, amor verdadeiro significa ser completamente você mesmo com alguém - sem máscaras, sem pretensões. Você busca romance de alma gêmea, não relacionamento pragmático. Quando machucado, se retrai profundamente e precisa de tempo sozinho para processar.',
      friendshipStyle:
        'Você tem poucos amigos, mas as amizades que cultiva são intensas e duradouras. Não tolera superficialidade - prefere uma conversa profunda às 3h da manhã a 10 happy hours superficiais. Seus amigos sabem que podem confiar em você completamente - você guarda segredos como tesouros sagrados e oferece apoio incondicional. Porém, você precisa de muito tempo sozinho para recarregar. Amigos que não entendem isso podem achar que você está distante.',
      compatibility: {
        best: ['ENFJ', 'ENTJ', 'INFJ'],
        good: ['ENFP', 'INFP', 'INTP'],
        challenging: ['ESTJ', 'ISTJ', 'ESTP'],
      },
      compatibilityDetails: {
        ENFJ: {
          score: 93,
          why: 'ENFJ oferece estrutura emocional e validação que INFP precisa. Ambos valorizam autenticidade e conexões profundas. Fe do ENFJ complementa Fi do INFP.',
          challenges:
            'ENFJ pode ser muito social para INFP. INFP pode ser muito reservado para ENFJ. ENFJ quer resolver problemas, INFP só quer ser ouvido.',
          tips: 'ENFJ: dê espaço para solidão, não leve pessoalmente. INFP: comunique necessidades, ENFJ não é leitor de mentes.',
        },
        ENTJ: {
          score: 85,
          why: 'Opostos que se atraem. Te do ENTJ oferece estrutura que Te inferior do INFP precisa. Ni do ENTJ ressoa com Ne do INFP.',
          challenges:
            'ENTJ muito direto pode machucar sensibilidade do INFP. INFP muito indeciso pode frustrar ENTJ. Conflito de valores sobre eficiência vs. autenticidade.',
          tips: 'ENTJ: seja gentil, INFP é mais frágil que parece. INFP: ENTJ te ama, mesmo que não expresse poeticamente.',
        },
      },
      tips: [
        'Comunique expectativas - parceiros não são leitores de mentes',
        'Desça do pedestal - idealizações criam decepções',
        'Expresse necessidades diretamente, não através de dicas sutis',
        'Lembre-se: conflito saudável ≠ fim do amor',
        'Priorize autocuidado - você não pode doar do vazio',
      ],
    },
  },

  // Crescimento Pessoal
  growth: {
    isGated: true,
    preview:
      'Áreas de desenvolvimento: função inferior Te (pensamento extrovertido), evitar Fi-Si loops, desenvolver assertividade, balancear idealismo com realismo...',
    content: {
      inferiorFunction: {
        name: 'Te - Pensamento Extrovertido',
        challenges:
          'Dificuldade com organização externa, estrutura, decisões práticas e confrontos diretos. Pode resultar em procrastinação crônica, caos administrativo e evitação de conflitos necessários.',
        development: [
          'Crie sistemas simples: 1 pasta para documentos importantes, 1 calendário para tudo',
          'Use "body doubling": trabalhe perto de alguém organizado (mesmo virtualmente)',
          'Técnica do "faça só por 2 minutos" - geralmente continua depois',
          'Contrate ajuda para tarefas administrativas se possível',
          'Pratique assertividade: comece com pedidos pequenos e seguros',
        ],
      },
      loops: {
        FiSi: {
          name: 'Fi-Si Loop',
          description:
            'Ruminar sobre feridas emocionais passadas, revivendo memórias dolorosas repetidamente sem perspectiva externa (Ne desligado).',
          escape:
            'Ativar Ne: exponha-se a NOVAS experiências. Converse com amigo criativo. Brainstorm possibilidades futuras. Escreva ficção, não memórias.',
        },
      },
      balancingFunctions: [
        'Use Ne para adicionar perspectivas ao Fi - não há uma verdade única',
        'Desenvolva Te gradualmente - estrutura libera criatividade',
        'Honre Si, mas não fique preso no passado',
      ],
      dailyPractices: [
        'Morning pages: 3 páginas de fluxo de consciência ao acordar',
        'Caminhada na natureza: 20 min sem fones - apenas observar',
        'Expressão criativa: 15 min de arte, música ou escrita',
        'Tempo com amigos íntimos: 1x por semana mínimo',
        'Tarefa prática diária: 1 coisa da lista de "evitados"',
      ],
      commonPitfalls: [
        'Evitar conflitos até explodir ou se afastar',
        'Idealizar pessoas e situações (decepção inevitável)',
        'Negligenciar necessidades práticas por sonhar',
        'Martírio - cuidar de todos menos de si mesmo',
        'Procrastinação de tarefas administrativas',
      ],
    },
  },

  // No Trabalho
  workplace: {
    isGated: true,
    preview:
      'Você precisa de trabalho significativo alinhado com valores. Ambientes corporativos tradicionais podem ser sufocantes. Você brilha quando pode expressar criatividade e fazer diferença...',
    content: {
      leadershipStyle: {
        description:
          'Líder servil e empoderador. Você lidera através de inspiração e exemplo, não autoridade. Vê potencial em cada pessoa da equipe.',
        strengths: [
          'Empatia profunda com necessidades da equipe',
          'Inspiração através de valores compartilhados',
          'Ambiente psicologicamente seguro',
          'Desenvolvimento individual de cada membro',
        ],
        weaknesses: [
          'Dificuldade com decisões difíceis (demitir, cortar)',
          'Evita confrontos necessários',
          'Pode ser muito idealista sobre capacidade da equipe',
          'Falta de assertividade em negociações',
        ],
        tips: [
          'Aprenda a dizer não com compaixão',
          'Decisões difíceis são atos de amor - protegem a equipe',
          'Delegue tarefas administrativas',
          'Estabeleça limites claros',
        ],
      },
      teamwork: {
        description:
          'Colaborador empático e harmonizador. Trabalha melhor em equipes pequenas com propósito compartilhado.',
        strengths: [
          'Mediação de conflitos',
          'Perspectivas criativas únicas',
          'Apoio emocional aos colegas',
          'Atenção a nuances',
        ],
        challenges: [
          'Dificuldade com ambientes competitivos',
          'Pode absorver emoções da equipe (burnout)',
          'Evita política mas sofre com ela',
          'Precisa de muito tempo sozinho para recarregar',
        ],
        tips: [
          'Estabeleça limites energéticos claros',
          'Não leve críticas profissionais como ataques pessoais',
          'Comunique necessidade de trabalho individual',
          'Procure aliados com valores similares',
        ],
      },
      idealEnvironment: {
        physical:
          'Escritório tranquilo com privacidade, ou remoto. Espaço para personalização criativa. Luz natural e plantas.',
        culture:
          'Valores autênticos (não apenas no poster). Respeito por work-life balance. Missão significativa. Liberdade criativa. Reconhecimento de contribuições únicas.',
        avoid:
          'Cultura corporativa tóxica, competição agressiva, microgestão, falta de propósito, cinismo generalizado.',
      },
      conflictHandling: {
        approach:
          'Evitação inicial, depois explosão ou distanciamento. Precisa desenvolver confrontação saudável.',
        strengths: ['Empatia com todas as perspectivas', 'Busca por soluções ganha-ganha', 'Não guarda rancor genuíno'],
        development: [
          'Aprenda comunicação não-violenta (CNV)',
          'Pratique feedback direto mas gentil',
          'Entenda: conflito ≠ rejeição pessoal',
        ],
      },
    },
  },
};
