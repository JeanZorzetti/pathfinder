import { DataSource } from 'typeorm';
import { EnneagramType } from '../../modules/personality-tests/entities/enneagram-type.entity';

export async function seedEnneagramTypes(dataSource: DataSource): Promise<void> {
  const repository = dataSource.getRepository(EnneagramType);

  const types: Partial<EnneagramType>[] = [
    {
      id: 'type1',
      number: 1,
      name: 'O Perfeccionista',
      nameEn: 'The Reformer',
      nickname: 'O Reformador',
      coreFear: 'Ser corrupto, mau, defeituoso ou imperfeito',
      coreDesire: 'Ser bom, íntegro, equilibrado e ter integridade',
      keyMotivation: 'Estar certo, esforçar-se para melhorar tudo, ser consistente com seus ideais, justificar-se, estar além de críticas para não ser condenado por outros',
      atBest: 'Sábio, discernente, realista e nobre. Moralmente heroico.',
      atWorst: 'Crítico, perfeccionista, impaciente, controlador e inflexível.',
      basicProposition: 'Você é bom ou okay se você faz o que é certo',
      triad: 'gut',
      wingOptions: ['1w9', '1w2'],
      growthDirection: 7,
      stressDirection: 4,
      strengths: [
        'Forte senso ético e moral',
        'Organizado e detalhista',
        'Comprometido com a excelência',
        'Responsável e confiável',
        'Capacidade de ver o que precisa ser melhorado'
      ],
      weaknesses: [
        'Autocrítico e crítico com outros',
        'Dificuldade em relaxar',
        'Perfeccionismo paralisante',
        'Ressentimento reprimido',
        'Rigidez de pensamento'
      ],
      workplaceBehavior: 'No ambiente de trabalho, o Tipo 1 é extremamente responsável, organizado e comprometido com a qualidade. Estabelece altos padrões para si mesmo e para os outros. Excelente em identificar problemas e propor melhorias. Pode ser visto como muito crítico ou inflexível. Trabalha melhor em ambientes estruturados com regras claras.',
      relationships: 'Em relacionamentos, o Tipo 1 é leal, confiável e comprometido. Busca parceiros que compartilhem seus valores. Pode ser crítico e ter dificuldade em aceitar imperfeições. Tende a reprimir raiva e expressar através de críticas. Cresce quando aprende a aceitar imperfeições e relaxar padrões impossíveis.',
      famousExamples: [
        'Mahatma Gandhi',
        'Nelson Mandela',
        'Michelle Obama',
        'Hermione Granger (Harry Potter)',
        'Steve Jobs'
      ],
      growthPath: {
        integration: 'Move-se para o Tipo 7 em crescimento: torna-se mais espontâneo, alegre e aceita imperfeições',
        disintegration: 'Move-se para o Tipo 4 em estresse: torna-se melancólico, crítico de si mesmo e dos outros',
        practices: [
          'Praticar autocompaixão e aceitar imperfeições',
          'Permitir-se relaxar e se divertir sem culpa',
          'Reconhecer e expressar raiva de forma saudável',
          'Celebrar o progresso ao invés de focar apenas no que falta'
        ]
      }
    },
    {
      id: 'type2',
      number: 2,
      name: 'O Ajudante',
      nameEn: 'The Helper',
      nickname: 'O Cuidador',
      coreFear: 'Ser indesejado, não amado, não valorizado',
      coreDesire: 'Ser amado, necessário e apreciado',
      keyMotivation: 'Ser amado, expressar sentimentos por outros, ser necessário, ser apreciado, fazer os outros responderem a eles, validar suas afirmações sobre si mesmos',
      atBest: 'Generoso, altruísta, empático e sinceramente amoroso.',
      atWorst: 'Possessivo, manipulador, mártir e com necessidade excessiva de aprovação.',
      basicProposition: 'Você é bom ou okay se você é amado pelos outros e é próximo deles',
      triad: 'heart',
      wingOptions: ['2w1', '2w3'],
      growthDirection: 4,
      stressDirection: 8,
      strengths: [
        'Empático e sensível às necessidades dos outros',
        'Generoso com tempo e recursos',
        'Caloroso e acolhedor',
        'Excelente em criar conexões',
        'Motivado a ajudar genuinamente'
      ],
      weaknesses: [
        'Dificuldade em reconhecer próprias necessidades',
        'Pode ser manipulador para obter amor',
        'Orgulho disfarçado de humildade',
        'Martírio e ressentimento quando não reconhecido',
        'Dependência da aprovação externa'
      ],
      workplaceBehavior: 'No trabalho, o Tipo 2 é colaborativo, prestativo e cria um ambiente acolhedor. Excelente em trabalho em equipe e em papéis de suporte. Pode ter dificuldade em estabelecer limites e dizer não. Motivado por reconhecimento e apreciação. Trabalha melhor quando sente que está fazendo diferença na vida dos outros.',
      relationships: 'Em relacionamentos, o Tipo 2 é afetuoso, atencioso e dedicado. Busca intimidade e conexão profunda. Pode se tornar possessivo ou manipulador quando inseguro. Tende a colocar necessidades dos outros acima das próprias. Cresce quando aprende a cuidar de si mesmo e reconhecer próprio valor independente dos outros.',
      famousExamples: [
        'Madre Teresa',
        'Princesa Diana',
        'Dolly Parton',
        'Samwise Gamgee (O Senhor dos Anéis)',
        'Monica Geller (Friends)'
      ],
      growthPath: {
        integration: 'Move-se para o Tipo 4 em crescimento: torna-se mais consciente de suas próprias necessidades e emoções',
        disintegration: 'Move-se para o Tipo 8 em estresse: torna-se agressivo, controlador e exigente',
        practices: [
          'Reconhecer e atender às próprias necessidades',
          'Estabelecer limites saudáveis',
          'Dar sem expectativa de retorno',
          'Desenvolver autoestima independente da aprovação externa'
        ]
      }
    },
    {
      id: 'type3',
      number: 3,
      name: 'O Realizador',
      nameEn: 'The Achiever',
      nickname: 'O Performer',
      coreFear: 'Ser inútil, sem valor ou incompetente',
      coreDesire: 'Ser valioso, aceito e desejável',
      keyMotivation: 'Ser afirmado, distinguir-se dos outros, ter atenção, ser admirado e impressionar os outros',
      atBest: 'Autêntico, autoaceito, modelo de referência, inspirador.',
      atWorst: 'Excessivamente preocupado com imagem, workaholic, competitivo e enganoso.',
      basicProposition: 'Você é bom ou okay se você é bem-sucedido e os outros pensam bem de você',
      triad: 'heart',
      wingOptions: ['3w2', '3w4'],
      growthDirection: 6,
      stressDirection: 9,
      strengths: [
        'Altamente motivado e produtivo',
        'Adaptável e versátil',
        'Confiante e carismático',
        'Orientado para objetivos',
        'Excelente em apresentações e networking'
      ],
      weaknesses: [
        'Workaholic compulsivo',
        'Confunde valor pessoal com conquistas',
        'Pode sacrificar autenticidade pela imagem',
        'Dificuldade em lidar com fracasso',
        'Competitivo em excesso'
      ],
      workplaceBehavior: 'No ambiente de trabalho, o Tipo 3 é altamente eficiente, orientado para resultados e ambicioso. Excelente em atingir metas e motivar equipes. Pode se tornar workaholic e sacrificar saúde ou relacionamentos pelo sucesso. Prospera em ambientes competitivos e com métricas claras de sucesso.',
      relationships: 'Em relacionamentos, o Tipo 3 é charmoso, energético e de apoio às ambições do parceiro. Pode ter dificuldade em mostrar vulnerabilidade e autenticidade. Tende a confundir ser amado com ser admirado. Cresce quando aprende a valorizar-se por quem é, não pelo que conquista.',
      famousExamples: [
        'Oprah Winfrey',
        'Tom Cruise',
        'Taylor Swift',
        'Tony Stark (Marvel)',
        'Barney Stinson (How I Met Your Mother)'
      ],
      growthPath: {
        integration: 'Move-se para o Tipo 6 em crescimento: torna-se mais cooperativo, leal e autêntico',
        disintegration: 'Move-se para o Tipo 9 em estresse: torna-se apático, desengajado e procrastinador',
        practices: [
          'Valorizar ser ao invés de fazer',
          'Praticar vulnerabilidade e autenticidade',
          'Desacelerar e estar presente',
          'Reconhecer valor intrínseco independente de conquistas'
        ]
      }
    },
    {
      id: 'type4',
      number: 4,
      name: 'O Individualista',
      nameEn: 'The Individualist',
      nickname: 'O Romântico',
      coreFear: 'Não ter identidade ou significado pessoal, ser defeituoso',
      coreDesire: 'Encontrar a si mesmo e seu significado, criar uma identidade única',
      keyMotivation: 'Expressar-se e sua individualidade, criar e cercar-se de beleza, manter certos humores e sentimentos, afastar-se do ordinário',
      atBest: 'Inspirado, criativo, autêntico e emocionalmente honesto.',
      atWorst: 'Melancólico, autodestrutivo, envergonhado e emocionalmente turbulento.',
      basicProposition: 'Você é bom ou okay se você é fiel a si mesmo',
      triad: 'heart',
      wingOptions: ['4w3', '4w5'],
      growthDirection: 1,
      stressDirection: 2,
      strengths: [
        'Profundamente criativo e original',
        'Emocionalmente profundo e empático',
        'Autêntico e genuíno',
        'Sensível à beleza e estética',
        'Capaz de transformar sofrimento em arte'
      ],
      weaknesses: [
        'Tendência à melancolia e depressão',
        'Inveja do que os outros têm',
        'Autodramatização excessiva',
        'Pode se sentir incompreendido',
        'Foco excessivo em si mesmo'
      ],
      workplaceBehavior: 'No trabalho, o Tipo 4 traz criatividade, originalidade e profundidade emocional. Excelente em áreas criativas, artísticas ou terapêuticas. Pode ter dificuldade com tarefas rotineiras ou mundanas. Busca trabalho com significado pessoal. Trabalha melhor quando pode expressar sua individualidade.',
      relationships: 'Em relacionamentos, o Tipo 4 é intenso, romântico e busca conexão profunda. Pode idealizar parceiros e depois se decepcionar. Tende a sentir que algo está faltando. Valoriza autenticidade e vulnerabilidade emocional. Cresce quando aprende a aceitar a si mesmo e encontrar o extraordinário no ordinário.',
      famousExamples: [
        'Frida Kahlo',
        'Johnny Depp',
        'Virginia Woolf',
        'Prince',
        'Amélie Poulain (O Fabuloso Destino de Amélie Poulain)'
      ],
      growthPath: {
        integration: 'Move-se para o Tipo 1 em crescimento: torna-se mais disciplinado, objetivo e prático',
        disintegration: 'Move-se para o Tipo 2 em estresse: torna-se carente, grudento e dependente de outros',
        practices: [
          'Praticar gratidão pelo que tem',
          'Engajar-se em atividades práticas e rotineiras',
          'Equilibrar introspecção com ação',
          'Reconhecer que todos são especiais e ordinários'
        ]
      }
    },
    {
      id: 'type5',
      number: 5,
      name: 'O Investigador',
      nameEn: 'The Investigator',
      nickname: 'O Observador',
      coreFear: 'Ser inútil, incompetente ou incapaz',
      coreDesire: 'Ser capaz e competente, entender o mundo',
      keyMotivation: 'Ser capaz e competente, possuir conhecimento, entender o ambiente, ter tudo descoberto como uma forma de defender-se de ameaças do ambiente',
      atBest: 'Visionário, perceptivo, inovador e pioneiro.',
      atWorst: 'Isolado, desconectado, niilista e excessivamente cerebral.',
      basicProposition: 'Você é bom ou okay se você domina algo',
      triad: 'head',
      wingOptions: ['5w4', '5w6'],
      growthDirection: 8,
      stressDirection: 7,
      strengths: [
        'Analítico e objetivo',
        'Independente e autossuficiente',
        'Observador aguçado',
        'Conhecimento profundo em áreas de interesse',
        'Pensador inovador'
      ],
      weaknesses: [
        'Tendência ao isolamento',
        'Desconectado de emoções e corpo',
        'Acumula recursos (tempo, energia, conhecimento)',
        'Pode ser excessivamente reservado',
        'Dificuldade em tomar ação'
      ],
      workplaceBehavior: 'No ambiente de trabalho, o Tipo 5 é analítico, competente e inovador. Excelente em pesquisa, análise e resolução de problemas complexos. Precisa de tempo sozinho para recarregar. Pode ter dificuldade em trabalho em equipe ou comunicação emocional. Trabalha melhor quando tem autonomia e privacidade.',
      relationships: 'Em relacionamentos, o Tipo 5 é leal, confiável e intelectualmente estimulante. Pode ter dificuldade com intimidade emocional e expressão de sentimentos. Tende a se retirar quando se sente sobrecarregado. Cresce quando aprende a se conectar emocionalmente e compartilhar recursos (tempo, energia, conhecimento).',
      famousExamples: [
        'Albert Einstein',
        'Bill Gates',
        'Stephen Hawking',
        'Sherlock Holmes',
        'Dr. House'
      ],
      growthPath: {
        integration: 'Move-se para o Tipo 8 em crescimento: torna-se mais confiante, assertivo e conectado ao corpo',
        disintegration: 'Move-se para o Tipo 7 em estresse: torna-se disperso, hiperativo e escapista',
        practices: [
          'Engajar-se fisicamente com o mundo',
          'Praticar expressão emocional',
          'Compartilhar conhecimento e recursos',
          'Agir ao invés de apenas observar'
        ]
      }
    },
    {
      id: 'type6',
      number: 6,
      name: 'O Leal',
      nameEn: 'The Loyalist',
      nickname: 'O Cético',
      coreFear: 'Ficar sem apoio ou orientação, ser incapaz de sobreviver sozinho',
      coreDesire: 'Ter segurança, apoio e orientação',
      keyMotivation: 'Ter segurança, sentir-se apoiado por outros, ter certeza e segurança, testar as atitudes dos outros em relação a eles, lutar contra ansiedade e insegurança',
      atBest: 'Corajoso, comprometido, confiável e lutador.',
      atWorst: 'Ansioso, paranoico, defensivo e dependente.',
      basicProposition: 'Você é bom ou okay se você faz o que é esperado de você',
      triad: 'head',
      wingOptions: ['6w5', '6w7'],
      growthDirection: 9,
      stressDirection: 3,
      strengths: [
        'Leal e comprometido',
        'Responsável e confiável',
        'Preparado para o pior',
        'Excelente em identificar riscos',
        'Lutador pela justiça'
      ],
      weaknesses: [
        'Ansiedade crônica e preocupação',
        'Dificuldade em confiar',
        'Procrastinação por medo',
        'Busca excessiva por segurança',
        'Pode ser excessivamente cético'
      ],
      workplaceBehavior: 'No trabalho, o Tipo 6 é leal, responsável e excelente em identificar problemas potenciais. Valoriza segurança e estabilidade. Pode questionar autoridade ou ser excessivamente obediente (contrafóbico vs fóbico). Trabalha melhor em ambientes estruturados com expectativas claras.',
      relationships: 'Em relacionamentos, o Tipo 6 é leal, comprometido e protetor. Busca parceiros confiáveis e estáveis. Pode ser inseguro e precisar de constante reasseguramento. Testa a lealdade dos outros. Cresce quando aprende a confiar em si mesmo e nos outros, gerenciando ansiedade internamente.',
      famousExamples: [
        'George H.W. Bush',
        'Jennifer Aniston',
        'Woody Allen',
        'Frodo Baggins (O Senhor dos Anéis)',
        'Ron Weasley (Harry Potter)'
      ],
      growthPath: {
        integration: 'Move-se para o Tipo 9 em crescimento: torna-se mais calmo, confiante e relaxado',
        disintegration: 'Move-se para o Tipo 3 em estresse: torna-se workaholic, competitivo e busca validação por status',
        practices: [
          'Desenvolver confiança interior',
          'Praticar mindfulness para ansiedade',
          'Tomar decisões baseadas em intuição, não apenas medo',
          'Reconhecer força interior'
        ]
      }
    },
    {
      id: 'type7',
      number: 7,
      name: 'O Entusiasta',
      nameEn: 'The Enthusiast',
      nickname: 'O Aventureiro',
      coreFear: 'Ser privado, preso em dor ou limitação',
      coreDesire: 'Ser feliz, satisfeito e ter necessidades atendidas',
      keyMotivation: 'Manter liberdade e felicidade, evitar perder experiências valiosas, manter-se excitado e ocupado, afastar-se da dor',
      atBest: 'Alegre, espontâneo, versátil e grato.',
      atWorst: 'Disperso, impulsivo, escapista e excessivamente ocupado.',
      basicProposition: 'Você é bom ou okay se você obtém o que você precisa',
      triad: 'head',
      wingOptions: ['7w6', '7w8'],
      growthDirection: 5,
      stressDirection: 1,
      strengths: [
        'Otimista e positivo',
        'Entusiasta e energético',
        'Versátil e adaptável',
        'Criativo e inovador',
        'Excelente em ver possibilidades'
      ],
      weaknesses: [
        'Dificuldade em comprometer-se',
        'Evita dor e emoções negativas',
        'Pode ser superficial',
        'Impulsivo e disperso',
        'Busca constante por estímulos'
      ],
      workplaceBehavior: 'No trabalho, o Tipo 7 é criativo, entusiasta e excelente em brainstorming. Traz energia positiva e inovação. Pode ter dificuldade com tarefas rotineiras ou projetos de longo prazo. Trabalha melhor em ambientes dinâmicos com variedade e liberdade.',
      relationships: 'Em relacionamentos, o Tipo 7 é divertido, aventureiro e espontâneo. Pode ter dificuldade com compromisso ou profundidade emocional. Tende a evitar conflitos e emoções difíceis. Cresce quando aprende a estar presente com emoções dolorosas e encontrar satisfação no momento presente.',
      famousExamples: [
        'Robin Williams',
        'Jim Carrey',
        'Miley Cyrus',
        'Peter Pan',
        'Chandler Bing (Friends)'
      ],
      growthPath: {
        integration: 'Move-se para o Tipo 5 em crescimento: torna-se mais focado, profundo e contemplativo',
        disintegration: 'Move-se para o Tipo 1 em estresse: torna-se crítico, perfeccionista e julgador',
        practices: [
          'Praticar estar presente com desconforto',
          'Completar projetos antes de iniciar novos',
          'Desenvolver profundidade ao invés de amplitude',
          'Reconhecer que satisfação vem de dentro'
        ]
      }
    },
    {
      id: 'type8',
      number: 8,
      name: 'O Desafiador',
      nameEn: 'The Challenger',
      nickname: 'O Líder',
      coreFear: 'Ser controlado, violado ou ferido por outros',
      coreDesire: 'Proteger a si mesmo, ser forte e controlar seu próprio destino',
      keyMotivation: 'Ser autoconfiante, provar sua força e resistir fraqueza, ser importante em seu mundo, dominar o ambiente e permanecer no controle de sua situação',
      atBest: 'Autoconfiante, forte, assertivo e protetor.',
      atWorst: 'Dominador, confrontador, insensível e vingativo.',
      basicProposition: 'Você é bom ou okay se você é forte e está no controle',
      triad: 'gut',
      wingOptions: ['8w7', '8w9'],
      growthDirection: 2,
      stressDirection: 5,
      strengths: [
        'Confiante e assertivo',
        'Protetor dos vulneráveis',
        'Decisivo e de ação rápida',
        'Honesto e direto',
        'Líder natural'
      ],
      weaknesses: [
        'Pode ser dominador e controlador',
        'Dificuldade em mostrar vulnerabilidade',
        'Confrontador em excesso',
        'Pode ser insensível',
        'Intensidade pode intimidar outros'
      ],
      workplaceBehavior: 'No trabalho, o Tipo 8 é decisivo, assertivo e líder nato. Excelente em tomar decisões difíceis e enfrentar desafios. Pode ser confrontador e intimidador. Prospera em posições de liderança e autoridade. Trabalha melhor quando tem autonomia e controle.',
      relationships: 'Em relacionamentos, o Tipo 8 é leal, protetor e intenso. Valoriza honestidade e força no parceiro. Pode ter dificuldade em mostrar vulnerabilidade ou ternura. Testa limites e respeito. Cresce quando aprende a ser vulnerável e permitir que outros cuidem dele.',
      famousExamples: [
        'Martin Luther King Jr.',
        'Serena Williams',
        'Donald Trump',
        'Tony Soprano',
        'Daenerys Targaryen (Game of Thrones)'
      ],
      growthPath: {
        integration: 'Move-se para o Tipo 2 em crescimento: torna-se mais cuidadoso, empático e vulnerável',
        disintegration: 'Move-se para o Tipo 5 em estresse: torna-se isolado, secreto e desconfiado',
        practices: [
          'Praticar vulnerabilidade e ternura',
          'Reconhecer o poder da receptividade',
          'Escutar antes de agir',
          'Usar força para proteger, não dominar'
        ]
      }
    },
    {
      id: 'type9',
      number: 9,
      name: 'O Pacificador',
      nameEn: 'The Peacemaker',
      nickname: 'O Mediador',
      coreFear: 'Perda, separação, fragmentação',
      coreDesire: 'Ter paz interior e exterior, harmonia',
      keyMotivation: 'Criar harmonia em seu ambiente, evitar conflitos e tensão, preservar as coisas como estão, resistir a qualquer coisa que possa perturbar ou agravar',
      atBest: 'Receptivo, tranquilo, estável e criador de harmonia.',
      atWorst: 'Complacente, passivo-agressivo, teimoso e esquecido de si mesmo.',
      basicProposition: 'Você é bom ou okay se aqueles ao seu redor estão bem',
      triad: 'gut',
      wingOptions: ['9w8', '9w1'],
      growthDirection: 3,
      stressDirection: 6,
      strengths: [
        'Pacificador e mediador natural',
        'Aceita e não julga',
        'Vê todos os pontos de vista',
        'Calmo e estável',
        'Cria ambientes harmoniosos'
      ],
      weaknesses: [
        'Procrastinação e inércia',
        'Evita conflitos necessários',
        'Esquece de si mesmo',
        'Passivo-agressivo quando não assertivo',
        'Dificuldade em identificar prioridades'
      ],
      workplaceBehavior: 'No trabalho, o Tipo 9 é colaborativo, diplomático e cria harmonia na equipe. Excelente em mediar conflitos e ver múltiplas perspectivas. Pode ter dificuldade em estabelecer prioridades ou ser assertivo. Trabalha melhor em ambientes pacíficos e cooperativos.',
      relationships: 'Em relacionamentos, o Tipo 9 é acomodativo, estável e de fácil convivência. Pode perder-se nas necessidades e opiniões do parceiro. Evita conflitos, mesmo quando necessários. Tende a fusão (merge) com outros. Cresce quando aprende a ser assertivo e reconhecer suas próprias necessidades e opiniões.',
      famousExamples: [
        'Barack Obama',
        'Keanu Reeves',
        'Morgan Freeman',
        'Frodo Baggins (O Senhor dos Anéis)',
        'Phoebe Buffay (Friends)'
      ],
      growthPath: {
        integration: 'Move-se para o Tipo 3 em crescimento: torna-se mais assertivo, focado e produtivo',
        disintegration: 'Move-se para o Tipo 6 em estresse: torna-se ansioso, preocupado e inseguro',
        practices: [
          'Identificar e expressar suas próprias necessidades',
          'Praticar assertividade saudável',
          'Estabelecer e manter prioridades',
          'Reconhecer que conflito pode levar a crescimento'
        ]
      }
    }
  ];

  for (const typeData of types) {
    await repository.save(typeData);
  }

  console.log('✅ Seeded 9 Enneagram types successfully');
}
