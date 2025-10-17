import { PersonalityType } from '../../types/personality';

export const INFJ: PersonalityType = {
  code: 'INFJ',
  nickname: 'O Advogado',
  tagline: 'Idealistas silenciosos mas inspiradores, sempre em busca de propósito',
  tags: ['Visionário', 'Empático', 'Idealista', 'Profundo'],
  population: '1-2% da população (mais raro)',
  group: 'diplomats',

  colorScheme: {
    primary: '#059669',
    secondary: '#047857',
    light: '#D1FAE5',
    contrast: '#FFFFFF',
  },

  overview: {
    description: `INFJs são os visionários compassivos do mundo, guiados por uma visão profunda de como as coisas poderiam ser e um compromisso inabalável de fazer a diferença. Eles possuem uma habilidade quase mística de perceber o núcleo mais profundo das pessoas e situações, vendo além das superfícies para compreender significados ocultos e potenciais não realizados. Enquanto outros vivem no presente, INFJs habitam simultaneamente o agora e o que poderia ser - sempre visualizando um futuro melhor.

Sua mente opera como um radar emocional altamente sensível, captando nuances sutis nos sentimentos e motivações dos outros que passam despercebidos pela maioria. Combinam essa intuição profunda com uma empatia genuína e um sistema de valores fortemente arraigado, criando uma personalidade que não apenas entende as pessoas, mas se importa profundamente com seu bem-estar e crescimento.

No entanto, essa sensibilidade extraordinária vem com um custo. INFJs frequentemente carregam o peso emocional do mundo em seus ombros, absorvendo a dor dos outros como se fosse sua. Eles lutam com limites saudáveis, dando tanto de si mesmos que chegam ao esgotamento. Seu idealismo pode deixá-los desiludidos quando a realidade não corresponde à sua visão, e sua natureza reservada significa que poucos realmente entendem a profundidade de seu mundo interno.

O verdadeiro poder do INFJ está em sua capacidade de inspirar mudança genuína nas pessoas e sistemas. Eles são os conselheiros silenciosos, os visionários que moldam o futuro não através de força, mas através de compreensão profunda, compaixão autêntica e uma crença inabalável na possibilidade de transformação.`,

    quote: {
      text: 'A vida mais persistente e urgente pergunta é: o que você está fazendo pelos outros?',
      author: 'Martin Luther King Jr.',
    },
  },

  cognitiveFunctions: [
    {
      position: 'dominant',
      name: 'Ni',
      fullName: 'Intuição Introvertida',
      icon: '🔮',
      description: 'A função dominante Ni busca padrões profundos e visões de futuro. INFJs processam informações inconscientemente, chegando a insights e "sabendo" coisas sem necessariamente entender como sabem.',
      manifestation: 'Se manifesta como uma clareza súbita sobre situações complexas, visões de como eventos se desenrolarão, e uma capacidade de ver o "quadro maior" que outros não percebem. INFJs frequentemente têm pressentimentos precisos e enxergam através de máscaras sociais.',
    },
    {
      position: 'auxiliary',
      name: 'Fe',
      fullName: 'Sentimento Extrovertido',
      icon: '❤️',
      description: 'A função auxiliar Fe cria harmonia e conexão emocional com os outros. Ela sintoniza os INFJs com as emoções e necessidades das pessoas ao seu redor, impulsionando seu desejo de ajudar.',
      manifestation: 'Aparece como capacidade natural de ler o clima emocional de uma sala, forte desejo de manter harmonia, habilidade de fazer outros se sentirem compreendidos e valorizados. INFJs frequentemente colocam as necessidades dos outros antes das suas.',
    },
    {
      position: 'tertiary',
      name: 'Ti',
      fullName: 'Pensamento Introvertido',
      icon: '🧠',
      description: 'A função terciária Ti busca coerência lógica interna e compreensão profunda de sistemas. Em INFJs, fornece uma estrutura analítica que equilibra sua empatia.',
      manifestation: 'Pode aparecer como perfeccionismo, necessidade de que suas ideias e ações sejam internamente consistentes, e períodos de análise profunda. INFJs podem se tornar críticos quando suas intuições e valores não se alinham logicamente.',
    },
    {
      position: 'inferior',
      name: 'Se',
      fullName: 'Sensação Extrovertida',
      icon: '🌟',
      description: 'A função inferior Se lida com experiência sensorial imediata e presença no momento atual. Para INFJs, esta é a função mais desafiadora e menos desenvolvida.',
      manifestation: 'INFJs frequentemente se sentem desconectados do mundo físico, negligenciam necessidades corporais, e lutam para permanecer presentes. Sob estresse, podem se perder em indulgências sensoriais ou se tornar hiperatentos a detalhes físicos.',
    },
  ],

  strengths: {
    free: [
      {
        title: 'Empatia Profunda e Genuína',
        description: 'Capacidade extraordinária de sentir e compreender as emoções dos outros em um nível profundo, oferecendo conforto e compreensão autênticos.',
        icon: '💚',
      },
      {
        title: 'Visão Intuitiva Penetrante',
        description: 'Habilidade de ver além das aparências e compreender o núcleo verdadeiro de pessoas, situações e problemas complexos.',
        icon: '👁️',
      },
      {
        title: 'Integridade e Princípios Fortes',
        description: 'Sistema de valores profundamente arraigado que guia todas as decisões; agem de acordo com seus princípios mesmo sob pressão.',
        icon: '⚖️',
      },
      {
        title: 'Criatividade Visionária',
        description: 'Imaginação rica que vê possibilidades e soluções que outros não consideram, especialmente em ajudar pessoas e causar impacto social.',
        icon: '🎨',
      },
      {
        title: 'Habilidade de Inspirar Crescimento',
        description: 'Talento natural para ver o potencial nas pessoas e ajudá-las a crescer, transformar e alcançar suas melhores versões.',
        icon: '🌱',
      },
    ],
    gated: [
      {
        title: 'Compreensão Holística de Sistemas',
        description: 'Conseguem ver como partes individuais se conectam em sistemas maiores, especialmente em contextos humanos e organizacionais.',
        icon: '🌐',
      },
      {
        title: 'Comunicação Persuasiva',
        description: 'Habilidade de articular visões complexas de maneiras que inspiram e mobilizam outros para ação significativa.',
        icon: '📣',
      },
      {
        title: 'Dedicação Apaixonada a Causas',
        description: 'Quando encontram propósito alinhado com valores, demonstram comprometimento e energia extraordinários.',
        icon: '🔥',
      },
      {
        title: 'Sabedoria Além da Idade',
        description: 'Frequentemente demonstram compreensão profunda da natureza humana e dinâmicas complexas desde jovens.',
        icon: '🦉',
      },
      {
        title: 'Habilidade de Síntese Criativa',
        description: 'Integram ideias de múltiplas fontes para criar abordagens únicas e inovadoras para problemas humanos.',
        icon: '✨',
      },
      {
        title: 'Presença Calorosa e Acolhedora',
        description: 'Criam espaços emocionalmente seguros onde pessoas se sentem vistas, ouvidas e aceitas sem julgamento.',
        icon: '🏠',
      },
      {
        title: 'Perseverança Silenciosa',
        description: 'Comprometimento de longo prazo com objetivos significativos, trabalhando nos bastidores sem necessidade de reconhecimento.',
        icon: '🗿',
      },
      {
        title: 'Conselheiro Natural',
        description: 'Combinam escuta profunda, insight intuitivo e sabedoria para oferecer orientação transformadora.',
        icon: '🧭',
      },
      {
        title: 'Idealismo Prático',
        description: 'Não apenas sonham com um mundo melhor, mas desenvolvem planos concretos para realizá-lo.',
        icon: '🌈',
      },
      {
        title: 'Autenticidade Profunda',
        description: 'Valorizam e expressam autenticidade genuína, inspirando outros a fazer o mesmo.',
        icon: '💎',
      },
    ],
  },

  weaknesses: {
    free: [
      {
        title: 'Perfeccionismo Paralisante',
        description: 'Padrões extremamente altos para si mesmos e seus projetos, nunca sentindo que algo está "bom o suficiente" para compartilhar.',
        impact: 'Projetos abandonados, autocrítica constante, esgotamento por tentar alcançar ideais impossíveis.',
      },
      {
        title: 'Esgotamento por Excesso de Doação',
        description: 'Tendência a dar tanto de si mesmos ajudando outros que negligenciam suas próprias necessidades até o colapso.',
        impact: 'Burnout físico e emocional, ressentimento não expresso, deterioração da saúde.',
      },
      {
        title: 'Sensibilidade Extrema a Críticas',
        description: 'Levam críticas muito a sério, ruminando sobre feedback negativo e questionando todo seu valor.',
        impact: 'Autoestima frágil, evitação de situações onde podem ser julgados, retraimento social.',
      },
    ],
    gated: {
      full: [
        {
          title: 'O Famoso "Door Slam" (Batida de Porta)',
          description: 'Quando repetidamente feridos ou desrespeitados, INFJs podem cortar pessoas completamente de suas vidas sem aviso.',
          impact: 'Relacionamentos terminados abruptamente, arrependimento posterior, padrão de tudo-ou-nada nos relacionamentos.',
          mitigation: 'Comunicar limites claramente antes de chegar ao ponto de ruptura. Praticar confronto saudável. Reconhecer que door slam é proteção extrema, não solução.',
        },
        {
          title: 'Dificuldade com Limites Saudáveis',
          description: 'Absorvem emoções dos outros como esponjas, lutando para separar sentimentos próprios dos alheios.',
          impact: 'Sobrecarga emocional, responsabilidade excessiva por problemas dos outros, perda de senso de si mesmo.',
          mitigation: 'Praticar "check-ins" regulares: "isso é meu sentimento ou de outra pessoa?". Estabelecer tempo sozinho não-negociável. Aprender a dizer não sem culpa.',
        },
        {
          title: 'Idealismo que Leva à Desilusão',
          description: 'Visão de como as coisas "deveriam ser" tão forte que a realidade constantemente decepciona.',
          impact: 'Cinismo crescente, depressão quando realidade não corresponde à visão, relacionamentos idealizados que desmoronam.',
          mitigation: 'Praticar aceitação radical do que é, enquanto trabalha pelo que poderia ser. Celebrar progresso incremental. Buscar equilíbrio entre idealismo e pragmatismo.',
        },
        {
          title: 'Tendência a Internalizar Conflitos',
          description: 'Evitam confronto direto para manter harmonia, acumulando frustrações até explodir ou se afastar.',
          impact: 'Ressentimentos não resolvidos, explosões emocionais inesperadas, relacionamentos superficiais por medo de conflito.',
          mitigation: 'Reconhecer que conflito saudável fortalece relacionamentos. Praticar assertividade compassiva. Expressar desconforto quando pequeno, não quando insuportável.',
        },
        {
          title: 'Perfeccionismo em Sistemas Morais',
          description: 'Padrões morais extremamente elevados podem torná-los críticos ou julgadores de outros (e especialmente de si mesmos).',
          impact: 'Julgamento excessivo, dificuldade em aceitar imperfeições humanas, autocrítica brutal.',
          mitigation: 'Cultivar compaixão por imperfeição humana (incluindo a própria). Reconhecer que crescimento é processo. Praticar perdão ativo.',
        },
      ],
    },
  },

  careers: {
    free: [
      {
        title: 'Terapeuta/Conselheiro/Psicólogo',
        description: 'Trabalhar profundamente com indivíduos para facilitar cura, crescimento e transformação pessoal.',
        icon: '🛋️',
        fit: 'Perfeito para Ni-Fe: compreensão profunda de padrões psicológicos, empatia genuína, desejo de ajudar.',
      },
      {
        title: 'Escritor/Autor',
        description: 'Explorar temas profundos sobre condição humana, criar mundos ficcionais ricos, ou escrever não-ficção inspiradora.',
        icon: '✍️',
        fit: 'Permite expressão de visões complexas, trabalho introspectivo, impacto duradouro através de palavras.',
      },
      {
        title: 'Professor/Educador',
        description: 'Inspirar e orientar estudantes, criar ambientes de aprendizado transformadores, ensinar com propósito.',
        icon: '👨‍🏫',
        fit: 'Combina paixão por crescimento humano com oportunidade de fazer diferença duradoura na vida dos jovens.',
      },
      {
        title: 'Assistente Social/Trabalhador Humanitário',
        description: 'Trabalhar diretamente com populações vulneráveis, defender por justiça social, criar mudança sistêmica.',
        icon: '🤝',
        fit: 'Alinhado com valores de justiça e compaixão, impacto tangível em vidas, trabalho significativo.',
      },
      {
        title: 'Recursos Humanos (Desenvolvimento)',
        description: 'Focar em desenvolvimento de talentos, cultura organizacional, mediação e bem-estar de funcionários.',
        icon: '👥',
        fit: 'Usa habilidades de compreensão de pessoas e visão sistêmica para criar ambientes de trabalho melhores.',
      },
    ],
    gated: [
      {
        title: 'Coach de Vida/Executivo',
        description: 'Trabalhar um-a-um ou com grupos pequenos para facilitar transformação pessoal e profissional.',
        icon: '🎯',
        fit: 'Combina insight intuitivo com habilidade de inspirar mudança, autonomia para criar própria prática.',
        details: 'Permite trabalho profundo e significativo com clientes, flexibilidade para alinhar trabalho com valores.',
      },
      {
        title: 'Líder de Organização Sem Fins Lucrativos',
        description: 'Dirigir missão de organização dedicada a causar impacto social positivo.',
        icon: '🌍',
        fit: 'Trabalho totalmente alinhado com valores, oportunidade de visão estratégica com impacto humano.',
        details: 'Satisfação de dedicar carreira inteira a causa significativa; desafio de balancear idealismo com sustentabilidade.',
      },
      {
        title: 'Designer de Experiência do Usuário (UX)',
        description: 'Criar experiências digitais intuitivas e centradas no humano, defendendo necessidades dos usuários.',
        icon: '📱',
        fit: 'Usa empatia para entender usuários, criatividade para soluções, impacto através de design thoughtful.',
        details: 'Combina aspectos técnicos com compreensão profunda de comportamento e necessidades humanas.',
      },
      {
        title: 'Psiquiatra/Médico Holístico',
        description: 'Tratar não apenas sintomas, mas pessoa completa; integrar dimensões física, emocional e espiritual da saúde.',
        icon: '⚕️',
        fit: 'Abordagem holística alinha com visão sistêmica de INFJs; trabalho profundamente significativo.',
        details: 'Requer educação extensiva, mas oferece oportunidade de combinar ciência com compaixão profunda.',
      },
      {
        title: 'Diretor Criativo/Artista com Mensagem',
        description: 'Criar arte, filmes, ou campanhas que comunicam mensagens profundas e inspiram mudança social.',
        icon: '🎬',
        fit: 'Expressão criativa alinhada com propósito, capacidade de tocar emoções e inspirar reflexão.',
        details: 'Permite usar talentos artísticos como veículo para visão e valores; impacto cultural duradouro.',
      },
    ],
  },

  famousPeople: [
    { name: 'Martin Luther King Jr.', description: 'Líder dos Direitos Civis', photo: 'https://ui-avatars.com/api/?name=Martin+Luther+King&background=059669&color=fff', category: 'historical' },
    { name: 'Nelson Mandela', description: 'Ativista e Ex-Presidente', photo: 'https://ui-avatars.com/api/?name=Nelson+Mandela&background=059669&color=fff', category: 'historical' },
    { name: 'Mother Teresa', description: 'Missionária e Santa', photo: 'https://ui-avatars.com/api/?name=Mother+Teresa&background=059669&color=fff', category: 'historical' },
    { name: 'Oprah Winfrey', description: 'Apresentadora e Filantropa', photo: 'https://ui-avatars.com/api/?name=Oprah+Winfrey&background=059669&color=fff', category: 'contemporary' },
    { name: 'Carl Jung', description: 'Psicólogo e Psiquiatra', photo: 'https://ui-avatars.com/api/?name=Carl+Jung&background=059669&color=fff', category: 'historical' },
    { name: 'Fyodor Dostoevsky', description: 'Escritor e Filósofo', photo: 'https://ui-avatars.com/api/?name=Fyodor+Dostoevsky&background=059669&color=fff', category: 'historical' },
    { name: 'Lady Gaga', description: 'Cantora e Ativista', photo: 'https://ui-avatars.com/api/?name=Lady+Gaga&background=059669&color=fff', category: 'contemporary' },
    { name: 'Nicole Kidman', description: 'Atriz', photo: 'https://ui-avatars.com/api/?name=Nicole+Kidman&background=059669&color=fff', category: 'contemporary' },
    { name: 'Mahatma Gandhi', description: 'Líder Pacifista', photo: 'https://ui-avatars.com/api/?name=Mahatma+Gandhi&background=059669&color=fff', category: 'historical' },
    { name: 'Eleanor Roosevelt', description: 'Diplomata e Ativista', photo: 'https://ui-avatars.com/api/?name=Eleanor+Roosevelt&background=059669&color=fff', category: 'historical' },
  ],

  relationships: {
    isGated: true,
    preview: 'INFJs trazem profundidade emocional e comprometimento total aos relacionamentos, mas precisam de parceiros que respeitem sua complexidade e necessidade de autenticidade...',
    content: {
      romantic: {
        overview: 'INFJs em relacionamentos românticos são parceiros intensamente dedicados, emocionalmente intuitivos e profundamente leais. Eles buscam não apenas romance, mas uma conexão de almas - um parceiro com quem possam compartilhar seu mundo interno rico e trabalhar juntos por objetivos significativos. No entanto, sua tendência a idealizar relacionamentos pode criar desafios quando a realidade não corresponde à visão.',
        strengths: [
          'Comprometimento profundo e lealdade inabalável ao parceiro',
          'Intuição extraordinária sobre necessidades e sentimentos do parceiro',
          'Criação de intimidade emocional profunda e conexão autêntica',
          'Disposição para crescer e trabalhar ativamente no relacionamento',
          'Expressão criativa de amor e afeto de maneiras personalizadas',
        ],
        challenges: [
          'Tendência a idealizar parceiros, criando expectativas impossíveis',
          'Dificuldade em expressar necessidades próprias (sempre focam no outro)',
          'Podem se perder na identidade do parceiro',
          'Evitam conflito até que acumulam ressentimentos',
          'Door slam quando sentem que foram repetidamente desrespeitados',
        ],
        tips: [
          'Pratique vulnerabilidade: compartilhe suas próprias necessidades, não apenas atenda às do parceiro',
          'Lembre-se de que seu parceiro é humano, não o ideal que você visualiza',
          'Aborde pequenos desconfortos cedo, antes que se tornem grandes problemas',
          'Mantenha identidade própria, hobbies e amizades fora do relacionamento',
          'Procure parceiros que valorizem profundidade emocional e crescimento mútuo',
        ],
      },
      friendship: {
        overview: 'INFJs formam amizades profundas e significativas, mas seletivas. Preferem poucos amigos próximos com quem possam ser completamente autênticos a muitos conhecidos superficiais.',
        ideal: 'Outros NFs (especialmente ENFPs e INFPs) que compartilham valores e profundidade emocional, ou NTs que complementam com perspectiva lógica e estimulam intelectualmente.',
        asAFriend: 'Extremamente leal, conselheiro sábio, ouvinte empático excepcional, lembra detalhes significativos, oferece suporte incondicional em tempos difíceis.',
      },
      compatibility: {
        highest: ['ENFP', 'ENTP', 'INFP', 'INTJ'],
        challenging: ['ESTP', 'ESFP', 'ISTP', 'ESTJ'],
        explanation: 'INFJs se conectam melhor com intuitivos (N) que compartilham interesse em significados profundos e possibilidades. ENFPs oferecem leveza e espontaneidade; INTJs oferecem profundidade e visão estratégica.',
      },
    },
  },

  growth: {
    isGated: true,
    preview: 'O crescimento para INFJs envolve desenvolver sua função inferior Se e aprender a equilibrar idealismo com presença no momento atual...',
    content: {
      developingInferiorSe: {
        title: 'Desenvolvendo Sensação Extrovertida (Se)',
        description: 'Se inferior significa que INFJs frequentemente se sentem desconectados do mundo físico e do presente. Desenvolvê-la traz equilíbrio e bem-estar.',
        practices: [
          'Praticar mindfulness e meditação focada em sensações corporais',
          'Engajar regularmente em atividades físicas prazerosas (yoga, dança, caminhadas)',
          'Criar rituais sensoriais (apreciar refeições, banhos relaxantes, aromaterapia)',
          'Forçar-se a notar detalhes do ambiente físico durante o dia',
          'Permitir espontaneidade ocasional ao invés de sempre planejar',
        ],
        signs: 'Se saudável aparece como maior conforto no corpo, capacidade de aproveitar experiências sensoriais, menos desconexão do presente, e maior energia física.',
      },
      balancingFunctions: {
        title: 'Equilibrando Ni-Fe com Ti-Se',
        description: 'INFJs saudáveis aprendem a usar suas funções superiores sem negligenciar as inferiores.',
        niFeBalance: 'Use Ni-Fe para insights e conexão, mas não a ponto de se perder nas necessidades dos outros ou viver apenas no futuro.',
        tiSeDevelopment: 'Cultive Ti questionando suas próprias crenças e analisando logicamente. Desenvolva Se permanecendo presente e cuidando do corpo.',
      },
      commonTraps: {
        niFeTrap: {
          name: 'Loop Ni-Ti',
          description: 'Ficar preso em análise interna de insights, levando a isolamento e paralisia. Visões sem ação.',
          escape: 'Ativar Fe: conectar com pessoas reais, expressar ideias externamente, buscar feedback. Engajar Se: fazer algo físico e presente.',
        },
        feGrip: {
          name: 'Grip de Se',
          description: 'Sob estresse extremo, Se inferior emerge destrutivamente: overindulgência sensorial (comida, compras, álcool) ou hipercontrole de detalhes físicos.',
          escape: 'Retornar a Ni: meditar sobre o quadro maior, reconectar com propósito. Usar Fe saudável: buscar suporte de pessoas confiáveis.',
        },
      },
      dailyPractices: [
        'Reserve 20 minutos diários para Si Mesmo (não para outros) - journaling, meditação, hobby',
        'Pratique dizer "não" a pelo menos uma solicitação por semana',
        'Estabeleça check-in corporal três vezes ao dia: "O que meu corpo precisa agora?"',
        'Compartilhe suas intuições e visões com pelo menos uma pessoa de confiança',
        'Celebre pequenas vitórias ao invés de focar apenas em quanto falta para o ideal',
      ],
    },
  },

  workplace: {
    isGated: true,
    preview: 'INFJs prosperam em ambientes que valorizam propósito, permitem autonomia criativa, e oferecem oportunidade de impacto humano significativo...',
    content: {
      asLeader: {
        style: 'Liderança Visionária e Inspiradora',
        strengths: [
          'Criam visão inspiradora que mobiliza equipes em torno de propósito compartilhado',
          'Entendem profundamente as forças e necessidades de cada membro da equipe',
          'Lideram pelo exemplo, demonstrando integridade e comprometimento',
          'Excelentes em desenvolver potencial e crescimento de pessoas',
        ],
        challenges: [
          'Podem ter dificuldade em tomar decisões difíceis que afetam pessoas',
          'Tendência a assumir muito, querendo proteger equipe de sobrecarga',
          'Frustração quando outros não compartilham sua visão ou valores',
          'Perfeccionismo pode atrasar entregas ou desmotivar equipe',
        ],
        tips: 'Comunique sua visão claramente e frequentemente. Aprenda a delegar e confiar. Pratique decisões difíceis como ato de cuidado (às vezes necessário para bem maior). Celebre progresso incremental.',
      },
      asTeamMember: {
        strengths: [
          'Trazem perspectivas únicas e insights profundos',
          'Criam harmonia e colaboração na equipe',
          'Trabalham com dedicação extraordinária em projetos significativos',
          'Oferecem suporte emocional aos colegas',
        ],
        challenges: [
          'Podem assumir carga emocional da equipe inteira',
          'Dificuldade em trabalhar em projetos que parecem sem propósito',
          'Evitam confrontar colegas problemáticos diretamente',
          'Podem se sentir drenados em ambientes tóxicos ou superficiais',
        ],
        tips: 'Estabeleça limites claros sobre disponibilidade emocional. Comunique quando algo não alinha com valores. Encontre significado mesmo em tarefas menores (como contribuem para missão maior).',
      },
      idealEnvironment: {
        culture: 'Valores claros, missão significativa, respeito por pessoas, encorajamento de autenticidade',
        structure: 'Autonomia para trabalhar criativamente, flexibilidade, oportunidades de desenvolvimento',
        challenges: 'Trabalho que faz diferença tangível na vida de pessoas ou no mundo',
        avoid: 'Ambientes tóxicos, política excessiva, trabalho sem significado, desrespeito por pessoas',
      },
      conflictResolution: {
        approach: 'INFJs abordam conflitos buscando compreensão mútua e soluções que honrem necessidades de todos',
        tips: [
          'Não evite conflito saudável - aborde problemas quando ainda pequenos',
          'Expresse suas próprias necessidades claramente, não apenas valide dos outros',
          'Lembre-se que discordar não significa rejeitar a pessoa',
          'Use empatia para entender, mas Ti para avaliar objetivamente a situação',
        ],
      },
    },
  },
};
