// Dados completos dos 16 tipos MBTI para uso em páginas de tipos individuais

export interface MBTITypeData {
  title: string;
  subtitle: string;
  description: string;
  strengths: string[];
  weaknesses: string[];
  careers: string[];
  relationships: string;
  growth: string;
}

export const mbtiTypesData: Record<string, MBTITypeData> = {
  intj: {
    title: "INTJ - O Arquiteto",
    subtitle: "Visionário Estratégico",
    description: "INTJs são pensadores estratégicos e visionários, conhecidos por sua originalidade, determinação e motivação interna. Possuem uma capacidade única de transformar ideias complexas em planos concretos e executáveis. São independentes, analíticos e valorizam a competência acima de tudo.",
    strengths: [
      "Pensamento estratégico e visão de longo prazo",
      "Alta capacidade analítica e lógica",
      "Independência e autoconfiança",
      "Determinação para alcançar objetivos",
      "Originalidade e inovação"
    ],
    weaknesses: [
      "Pode ser excessivamente crítico",
      "Dificuldade em expressar emoções",
      "Impaciência com ineficiência",
      "Tendência ao perfeccionismo",
      "Pode parecer arrogante ou distante"
    ],
    careers: [
      "Engenheiro de Software",
      "Arquiteto",
      "Cientista",
      "Consultor de Estratégia",
      "Analista de Sistemas",
      "Professor Universitário"
    ],
    relationships: "INTJs valorizam relacionamentos profundos e intelectuais. Podem ser reservados inicialmente, mas são extremamente leais quando comprometidos. Buscam parceiros que respeitem sua necessidade de independência e compartilhem seus valores.",
    growth: "Para crescer, INTJs devem trabalhar em expressar emoções de forma mais aberta, praticar empatia e paciência com aqueles que pensam diferente, e aprender a valorizar as contribuições emocionais tanto quanto as lógicas."
  },

  intp: {
    title: "INTP - O Lógico",
    subtitle: "Pensador Inovador",
    description: "INTPs são pensadores inovadores com sede insaciável de conhecimento. Amam explorar teorias complexas e encontrar padrões ocultos. São criativos, curiosos e questionadores natos, sempre buscando entender como as coisas realmente funcionam.",
    strengths: [
      "Capacidade analítica excepcional",
      "Pensamento criativo e original",
      "Objetividade e imparcialidade",
      "Flexibilidade mental",
      "Amor por aprendizado contínuo"
    ],
    weaknesses: [
      "Dificuldade em executar ideias",
      "Pode ser desorganizado",
      "Evita confronto emocional",
      "Procrastinação em tarefas práticas",
      "Dificuldade com detalhes mundanos"
    ],
    careers: [
      "Pesquisador",
      "Programador",
      "Matemático",
      "Filósofo",
      "Analista de Dados",
      "Cientista"
    ],
    relationships: "INTPs valorizam conexões intelectuais e precisam de parceiros que respeitem sua necessidade de tempo sozinho. São leais e profundos, mas podem ter dificuldade em expressar emoções verbalmente.",
    growth: "INTPs devem trabalhar em transformar ideias em ações, desenvolver habilidades sociais práticas e aprender a lidar com demandas emocionais de forma mais direta."
  },

  entj: {
    title: "ENTJ - O Comandante",
    subtitle: "Líder Ousado",
    description: "ENTJs são líderes naturais, ousados e imaginativos. Possuem forte determinação e sempre encontram ou criam soluções. São estratégicos, decisivos e orientados para resultados, prosperando em ambientes desafiadores.",
    strengths: [
      "Liderança natural e carisma",
      "Visão estratégica de longo prazo",
      "Confiança e decisividade",
      "Eficiência e orientação para resultados",
      "Excelente comunicador"
    ],
    weaknesses: [
      "Pode ser dominador",
      "Impaciência com ineficiência",
      "Dificuldade em lidar com emoções",
      "Pode parecer insensível",
      "Tendência a controlar demais"
    ],
    careers: [
      "CEO/Executivo",
      "Empreendedor",
      "Advogado",
      "Consultor",
      "Gerente de Projeto",
      "Político"
    ],
    relationships: "ENTJs são parceiros leais e comprometidos que valorizam eficiência e honestidade. Precisam de parceiros que sejam independentes e capazes de desafio intelectual.",
    growth: "ENTJs devem desenvolver empatia, aprender a valorizar o processo tanto quanto os resultados e praticar ouvir sem imediatamente resolver ou direcionar."
  },

  entp: {
    title: "ENTP - O Inovador",
    subtitle: "Pensador Curioso",
    description: "ENTPs são pensadores curiosos e inteligentes, incapazes de resistir a um desafio intelectual. Adoram debates, ideias inovadoras e questionar o status quo. São adaptáveis, energéticos e veem possibilidades em tudo.",
    strengths: [
      "Criatividade e inovação",
      "Pensamento rápido e adaptabilidade",
      "Entusiasmo contagiante",
      "Habilidade de debate",
      "Visão de múltiplas perspectivas"
    ],
    weaknesses: [
      "Dificuldade em finalizar projetos",
      "Pode ser argumentativo demais",
      "Evita rotina e detalhes",
      "Impaciência com métodos tradicionais",
      "Pode ferir sentimentos sem perceber"
    ],
    careers: [
      "Empreendedor",
      "Advogado",
      "Inventor",
      "Marketing Estratégico",
      "Consultor de Inovação",
      "Jornalista Investigativo"
    ],
    relationships: "ENTPs trazem energia e excitação aos relacionamentos. Precisam de parceiros que apreciem debates intelectuais e não levem desafios pessoalmente.",
    growth: "ENTPs devem aprender a completar o que iniciam, desenvolver sensibilidade emocional e encontrar valor em rotinas que sustentam seus grandes objetivos."
  },

  infj: {
    title: "INFJ - O Advogado",
    subtitle: "Idealista Visionário",
    description: "INFJs são idealistas profundos com forte senso de integridade e valores. Combinam intuição aguçada com empatia genuína, tornando-se conselheiros naturais. São raros (1-2% da população) e buscam significado e propósito em tudo.",
    strengths: [
      "Empatia profunda e compreensão dos outros",
      "Visão idealista e propósito claro",
      "Criatividade e originalidade",
      "Determinação silenciosa",
      "Capacidade de inspirar mudanças"
    ],
    weaknesses: [
      "Tendência ao esgotamento emocional",
      "Perfeccionismo excessivo",
      "Dificuldade em lidar com críticas",
      "Pode ser muito privado",
      "Idealismo pode levar à frustração"
    ],
    careers: [
      "Psicólogo/Terapeuta",
      "Escritor",
      "Conselheiro",
      "Designer",
      "Professor",
      "Profissional de RH"
    ],
    relationships: "INFJs buscam conexões profundas e autênticas. São parceiros dedicados e atenciosos, mas precisam de tempo sozinhos para recarregar. Valorizam comunicação honesta.",
    growth: "INFJs devem aprender a estabelecer limites saudáveis, aceitar imperfeições e não negligenciar suas próprias necessidades em favor das necessidades alheias."
  },

  infp: {
    title: "INFP - O Mediador",
    subtitle: "Idealista Poético",
    description: "INFPs são altruístas poéticos e gentis, sempre dispostos a ajudar uma boa causa. Guiados por valores profundos, buscam autenticidade e significado. São criativos, empáticos e dedicados ao que acreditam.",
    strengths: [
      "Empatia profunda",
      "Criatividade artística",
      "Idealismo e valores fortes",
      "Flexibilidade e mente aberta",
      "Dedicação a causas importantes"
    ],
    weaknesses: [
      "Pode ser muito sensível",
      "Dificuldade com críticas",
      "Tendência à procrastinação",
      "Idealismo pode causar frustração",
      "Dificuldade em lidar com conflitos"
    ],
    careers: [
      "Escritor",
      "Artista",
      "Terapeuta",
      "Psicólogo",
      "Professor",
      "Trabalho Social"
    ],
    relationships: "INFPs são parceiros leais, românticos e profundamente comprometidos. Buscam conexões autênticas e parceiros que compartilhem seus valores.",
    growth: "INFPs devem desenvolver habilidades práticas, aprender a lidar com conflitos de forma direta e equilibrar idealismo com realismo."
  },

  enfj: {
    title: "ENFJ - O Protagonista",
    subtitle: "Líder Carismático",
    description: "ENFJs são líderes carismáticos e inspiradores, capazes de fascinar seus ouvintes. Possuem forte empatia e visão, usando isso para motivar e elevar outros. São naturalmente organizados e orientados para o bem coletivo.",
    strengths: [
      "Carisma e habilidade de comunicação",
      "Empatia e compreensão profunda",
      "Habilidade de motivar e inspirar",
      "Organização e orientação para objetivos",
      "Lealdade e dedicação"
    ],
    weaknesses: [
      "Pode ser controlador com boas intenções",
      "Dificuldade em dizer não",
      "Hipersensível a conflitos",
      "Pode negligenciar próprias necessidades",
      "Idealismo pode causar decepção"
    ],
    careers: [
      "Professor",
      "Coach/Mentor",
      "Gerente de RH",
      "Conselheiro",
      "Político",
      "Organizador de Eventos"
    ],
    relationships: "ENFJs são parceiros atenciosos e dedicados que priorizam o crescimento do relacionamento. Precisam de parceiros que valorizem comunicação aberta.",
    growth: "ENFJs devem aprender a estabelecer limites, priorizar autocuidado e aceitar que nem sempre podem resolver problemas de todos."
  },

  enfp: {
    title: "ENFP - O Ativista",
    subtitle: "Espírito Livre Entusiasta",
    description: "ENFPs são pessoas criativas, sociáveis e entusiastas que veem a vida como cheia de possibilidades. Possuem energia contagiante e capacidade de inspirar outros. São curiosos, adaptáveis e sempre em busca de novas experiências.",
    strengths: [
      "Entusiasmo contagiante",
      "Criatividade e originalidade",
      "Excelentes habilidades sociais",
      "Flexibilidade e adaptabilidade",
      "Capacidade de ver potencial em tudo"
    ],
    weaknesses: [
      "Dificuldade em manter foco",
      "Pode evitar conflitos necessários",
      "Tendência a procrastinar tarefas rotineiras",
      "Hipersensibilidade a críticas",
      "Pode ser desorganizado"
    ],
    careers: [
      "Marketing e Comunicação",
      "Jornalismo",
      "Coaching",
      "Design",
      "Empreendedorismo",
      "Recursos Humanos"
    ],
    relationships: "ENFPs trazem energia, paixão e criatividade aos relacionamentos. Valorizam autenticidade e conexões emocionais profundas.",
    growth: "ENFPs devem desenvolver disciplina e foco, aprender a completar projetos e trabalhar em habilidades práticas de organização."
  },

  istj: {
    title: "ISTJ - O Logístico",
    subtitle: "Indivíduo Prático",
    description: "ISTJs são indivíduos práticos e factuais, com confiabilidade inquestionável. Valorizam tradição, ordem e lealdade. São organizados, responsáveis e comprometidos com seus deveres.",
    strengths: [
      "Confiabilidade extrema",
      "Organização e atenção aos detalhes",
      "Responsabilidade e ética forte",
      "Pensamento lógico e prático",
      "Persistência e dedicação"
    ],
    weaknesses: [
      "Resistência à mudança",
      "Dificuldade com improvisação",
      "Pode ser inflexível",
      "Dificuldade em expressar emoções",
      "Pode ser excessivamente crítico"
    ],
    careers: [
      "Contador",
      "Advogado",
      "Administrador",
      "Militar",
      "Engenheiro",
      "Auditor"
    ],
    relationships: "ISTJs são parceiros leais e confiáveis que levam compromissos muito a sério. Valorizam estabilidade e tradição.",
    growth: "ISTJs devem aprender a abraçar mudanças, desenvolver flexibilidade e expressar emoções de forma mais aberta."
  },

  isfj: {
    title: "ISFJ - O Defensor",
    subtitle: "Protetor Dedicado",
    description: "ISFJs são protetores dedicados e calorosos, sempre prontos para defender seus entes queridos. São práticos, responsáveis e extremamente leais. Valorizam harmonia e tradição.",
    strengths: [
      "Lealdade profunda",
      "Dedicação e confiabilidade",
      "Empatia e cuidado",
      "Atenção aos detalhes",
      "Memória excelente para pessoas"
    ],
    weaknesses: [
      "Dificuldade em dizer não",
      "Resistência à mudança",
      "Pode ser muito altruísta",
      "Dificuldade em expressar necessidades",
      "Evita conflitos"
    ],
    careers: [
      "Enfermeiro",
      "Professor",
      "Assistente Social",
      "Bibliotecário",
      "Administrador",
      "Contador"
    ],
    relationships: "ISFJs são parceiros devotados que expressam amor através de atos práticos de cuidado. Valorizam estabilidade e compromisso.",
    growth: "ISFJs devem aprender a estabelecer limites, comunicar necessidades próprias e abraçar mudanças necessárias."
  },

  estj: {
    title: "ESTJ - O Executivo",
    subtitle: "Administrador Excelente",
    description: "ESTJs são administradores excelentes, incomparáveis em gerenciar coisas e pessoas. São organizados, práticos e orientados para resultados. Valorizam tradição, ordem e eficiência.",
    strengths: [
      "Habilidades organizacionais excepcionais",
      "Liderança prática e direta",
      "Dedicação e trabalho duro",
      "Honestidade e integridade",
      "Orientação para resultados"
    ],
    weaknesses: [
      "Pode ser inflexível",
      "Dificuldade com emoções",
      "Pode ser muito crítico",
      "Resistência a mudanças",
      "Pode ser dominador"
    ],
    careers: [
      "Gerente",
      "Juiz",
      "Militar",
      "Executivo Corporativo",
      "Auditor",
      "Policial"
    ],
    relationships: "ESTJs são parceiros confiáveis e leais que valorizam compromisso e responsabilidade. Expressam amor através de ações práticas.",
    growth: "ESTJs devem desenvolver flexibilidade emocional, aprender a valorizar perspectivas diferentes e praticar empatia."
  },

  esfj: {
    title: "ESFJ - O Cônsul",
    subtitle: "Pessoa Atenciosa",
    description: "ESFJs são extraordinariamente atenciosos, sociáveis e populares. Sempre dispostos a ajudar, valorizam harmonia e tradição. São organizados, práticos e dedicados ao bem-estar dos outros.",
    strengths: [
      "Empatia e cuidado genuíno",
      "Habilidades sociais excelentes",
      "Organização e praticidade",
      "Lealdade forte",
      "Dedicação ao serviço"
    ],
    weaknesses: [
      "Necessidade de aprovação",
      "Dificuldade com críticas",
      "Pode ser controlador",
      "Resistência à mudança",
      "Pode negligenciar próprias necessidades"
    ],
    careers: [
      "Professor",
      "Enfermeiro",
      "Assistente Social",
      "Gerente de RH",
      "Organizador de Eventos",
      "Recepcionista"
    ],
    relationships: "ESFJs são parceiros devotados que priorizam harmonia e felicidade do parceiro. Expressam amor através de atos de serviço.",
    growth: "ESFJs devem aprender a aceitar críticas construtivas, desenvolver independência emocional e priorizar autocuidado."
  },

  istp: {
    title: "ISTP - O Virtuoso",
    subtitle: "Experimentador Ousado",
    description: "ISTPs são experimentadores ousados e práticos, mestres de todos os tipos de ferramentas. Adoram explorar como as coisas funcionam e resolver problemas de forma prática. São adaptáveis e observadores.",
    strengths: [
      "Habilidades práticas excepcionais",
      "Pensamento lógico e objetivo",
      "Adaptabilidade e flexibilidade",
      "Calma sob pressão",
      "Curiosidade sobre como tudo funciona"
    ],
    weaknesses: [
      "Dificuldade com compromissos longos",
      "Pode ser insensível",
      "Tendência ao tédio com rotina",
      "Dificuldade em expressar emoções",
      "Pode ser impulsivo"
    ],
    careers: [
      "Mecânico",
      "Engenheiro",
      "Piloto",
      "Técnico",
      "Carpinteiro",
      "Atleta Profissional"
    ],
    relationships: "ISTPs são parceiros leais mas independentes que valorizam liberdade pessoal. Expressam amor através de ações práticas.",
    growth: "ISTPs devem desenvolver habilidades de planejamento de longo prazo, aprender a expressar emoções e cultivar paciência."
  },

  isfp: {
    title: "ISFP - O Aventureiro",
    subtitle: "Artista Flexível",
    description: "ISFPs são artistas flexíveis e charmosos, sempre prontos para explorar e experimentar algo novo. São sensíveis, estéticos e vivem plenamente no momento presente. Valorizam autenticidade e beleza.",
    strengths: [
      "Sensibilidade artística",
      "Flexibilidade e adaptabilidade",
      "Empatia profunda",
      "Viver no presente",
      "Autenticidade e valores fortes"
    ],
    weaknesses: [
      "Dificuldade com planejamento",
      "Hipersensibilidade a críticas",
      "Evita conflitos",
      "Pode ser muito reservado",
      "Dificuldade com estrutura"
    ],
    careers: [
      "Artista",
      "Designer",
      "Músico",
      "Veterinário",
      "Chef",
      "Fotógrafo"
    ],
    relationships: "ISFPs são parceiros dedicados e sensíveis que expressam amor através de ações e gestos criativos. Valorizam autenticidade.",
    growth: "ISFPs devem desenvolver habilidades de assertividade, aprender a lidar com conflitos e cultivar planejamento de longo prazo."
  },

  estp: {
    title: "ESTP - O Empreendedor",
    subtitle: "Pessoa Esperta e Energética",
    description: "ESTPs são pessoas espertas, energéticas e muito perceptivas que realmente aproveitam viver no limite. Adoram ação, são adaptáveis e prosperam em ambientes dinâmicos. São pragmáticos e orientados para resultados.",
    strengths: [
      "Energia e entusiasmo",
      "Pensamento rápido e adaptabilidade",
      "Habilidades práticas",
      "Carisma e sociabilidade",
      "Coragem para assumir riscos"
    ],
    weaknesses: [
      "Impulsividade",
      "Dificuldade com planejamento longo prazo",
      "Pode ser insensível",
      "Tédio com rotina",
      "Pode ignorar regras"
    ],
    careers: [
      "Empreendedor",
      "Vendedor",
      "Atleta",
      "Paramédico",
      "Detetive",
      "Corretor"
    ],
    relationships: "ESTPs são parceiros divertidos e espontâneos que trazem excitação aos relacionamentos. Valorizam liberdade e ação.",
    growth: "ESTPs devem desenvolver paciência, aprender a considerar consequências de longo prazo e cultivar sensibilidade emocional."
  },

  esfp: {
    title: "ESFP - O Animador",
    subtitle: "Artista Espontâneo",
    description: "ESFPs são artistas espontâneos, energéticos e entusiastas que nunca deixam a vida ficar chata. Trazem alegria onde vão e vivem plenamente no momento. São sociáveis, generosos e adoram entreter.",
    strengths: [
      "Entusiasmo contagiante",
      "Habilidades sociais excepcionais",
      "Praticidade e senso comum",
      "Generosidade e empatia",
      "Capacidade de alegrar ambientes"
    ],
    weaknesses: [
      "Dificuldade com planejamento",
      "Hipersensibilidade a críticas",
      "Pode evitar conflitos",
      "Tendência a procrastinar",
      "Dificuldade com teoria abstrata"
    ],
    careers: [
      "Artista/Performer",
      "Personal Trainer",
      "Organizador de Eventos",
      "Vendedor",
      "Fotógrafo",
      "Profissional de Turismo"
    ],
    relationships: "ESFPs são parceiros divertidos, afetuosos e generosos que trazem alegria e espontaneidade aos relacionamentos.",
    growth: "ESFPs devem desenvolver habilidades de planejamento, aprender a processar emoções difíceis e cultivar pensamento de longo prazo."
  }
};
