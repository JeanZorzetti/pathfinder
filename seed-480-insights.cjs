const { Client } = require('pg');

const MBTI_TYPES = [
  'ESTJ', 'ISTJ', 'ESFJ', 'ISFJ',
  'ESTP', 'ISTP', 'ESFP', 'ISFP',
  'ENTJ', 'INTJ', 'ENTP', 'INTP',
  'ENFJ', 'INFJ', 'ENFP', 'INFP'
];

const CATEGORIES = [
  'leadership', 'relationships', 'career', 'personal-growth',
  'mindfulness', 'communication', 'flexibility', 'assertiveness',
  'conflict', 'planning', 'expression', 'boundaries',
  'acceptance', 'action', 'social', 'focus',
  'structure', 'empathy', 'patience', 'creativity'
];

// Templates de insights por categoria
const INSIGHT_TEMPLATES = {
  leadership: [
    'Hoje, pratique delegar uma tarefa que você normalmente faria sozinho. {TYPE}s tendem a assumir tudo - mas empoderar outros é a marca de um verdadeiro líder.',
    'Líderes inspiram, gerentes organizam. Hoje, tente inspirar alguém compartilhando sua visão ao invés de apenas dar ordens.',
    'Grandes líderes celebram vitórias. Hoje, reconheça publicamente o trabalho de alguém da sua equipe.',
    'Liderar é servir. Hoje, pergunte a alguém: "Como posso facilitar seu trabalho?"',
    'Um líder eficaz ouve mais do que fala. Hoje, pratique escuta ativa em uma reunião.',
  ],
  relationships: [
    'Vulnerabilidade não é fraqueza. Hoje, compartilhe uma dificuldade pessoal com alguém de confiança.',
    'Antes de dar feedback crítico hoje, pergunte-se: "Estou focando no problema ou na pessoa?"',
    '{TYPE}s valorizam conexões genuínas. Hoje, demonstre isso através de ações, não apenas palavras.',
    'Relacionamentos requerem manutenção. Hoje, faça contato com alguém que você não fala há tempos.',
    'A qualidade supera a quantidade. Hoje, tenha uma conversa profunda com alguém importante.',
  ],
  career: [
    'Eficiência é importante, mas inovação requer experimentação. Hoje, permita-se testar uma abordagem não-tradicional.',
    'Sua carreira é uma maratona, não um sprint. Hoje, defina uma meta de longo prazo.',
    'Networking não é sobre quantidade. Hoje, fortaleça uma conexão profissional existente.',
    'Aprendizado contínuo é a chave. Hoje, dedique 30 minutos para aprender algo novo na sua área.',
    'Sucesso é definido por você. Hoje, reflita: você está perseguindo seus objetivos ou os de outros?',
  ],
  'personal-growth': [
    'Como você lidou com imprevistos esta semana? Desenvolver flexibilidade é um superpoder.',
    '{TYPE}s têm tendências naturais. Hoje, identifique um padrão de comportamento que você quer melhorar.',
    'Crescimento acontece fora da zona de conforto. Hoje, faça algo que te deixa levemente desconfortável.',
    'Autoconhecimento é o primeiro passo. Hoje, reflita sobre uma reação sua que você não entende completamente.',
    'Você está evoluindo. Hoje, compare-se apenas com quem você era há um ano.',
  ],
  mindfulness: [
    'Pare por 5 minutos hoje e apenas observe. Pausar para refletir previne decisões precipitadas.',
    'Produtividade não é fazer mais - é fazer o que importa. Hoje, elimine uma tarefa desnecessária.',
    'Sua mente precisa de descanso. Hoje, pratique 10 minutos de respiração consciente.',
    'Esteja presente. Hoje, durante uma refeição, coma sem distrações.',
    'Gratidão transforma perspectiva. Hoje, liste 3 coisas pelas quais você é grato.',
  ],
  communication: [
    'Hoje, pratique escuta ativa. Antes de responder, pergunte "Entendi corretamente que você quer dizer X?"',
    'Sua franqueza é valiosa, mas nem sempre bem recebida. Hoje, suavize uma verdade difícil com reconhecimento genuíno.',
    'Comunicação clara evita conflitos. Hoje, confirme o entendimento após uma conversa importante.',
    'Palavras têm peso. Hoje, escolha suas palavras com cuidado em uma discussão difícil.',
    'Silêncio também comunica. Hoje, pratique pausas antes de responder.',
  ],
  flexibility: [
    'Experimente dizer "Vamos tentar do seu jeito" em vez de "Acho que devemos fazer assim".',
    'Planos mudam. Hoje, quando algo não sair como esperado, pratique dizer "Ok, vamos ajustar".',
    'Rigidez limita possibilidades. Hoje, aceite uma sugestão diferente da sua.',
    'Adaptabilidade é força. Hoje, mude de direção sem resistência.',
    'Flexibilidade mental abre portas. Hoje, considere uma perspectiva oposta à sua.',
  ],
  assertiveness: [
    'Dizer não é respeitar seus limites. Hoje, recuse algo que não alinha com suas prioridades.',
    '{TYPE}s podem ter dificuldade com confronto. Hoje, expresse uma opinião impopular com respeito.',
    'Assertividade não é agressividade. Hoje, defenda sua posição sem atacar.',
    'Seus limites são válidos. Hoje, comunique claramente o que você aceita e o que não aceita.',
    'Fale por você. Hoje, use "eu sinto" ao invés de "você fez".',
  ],
  conflict: [
    'Conflito bem gerenciado fortalece relacionamentos. Hoje, aborde uma tensão não resolvida.',
    'Nem todo conflito precisa ser vencido. Hoje, busque entender antes de ser entendido.',
    'Emoções intensas obscurecem razão. Hoje, respire antes de responder em um conflito.',
    'Compromisso não é perda. Hoje, encontre um meio-termo em uma divergência.',
    'Conflitos evitados se acumulam. Hoje, tenha uma conversa difícil que você tem adiado.',
  ],
  planning: [
    'Planejamento previne problemas. Hoje, dedique 15 minutos para organizar sua semana.',
    '{TYPE}s se beneficiam de estrutura. Hoje, crie um plano de ação para um objetivo importante.',
    'Planos são guias, não prisões. Hoje, revise e ajuste um plano existente.',
    'Sem metas claras, qualquer caminho serve. Hoje, defina 3 prioridades para a semana.',
    'Visualização facilita execução. Hoje, imagine em detalhes como será alcançar um objetivo.',
  ],
  expression: [
    'Suas ideias merecem ser ouvidas. Hoje, compartilhe uma opinião em uma reunião.',
    'Criatividade precisa de vazão. Hoje, expresse-se através de arte, escrita ou música.',
    '{TYPE}s têm perspectivas únicas. Hoje, não se censure - compartilhe seu pensamento.',
    'Autenticidade atrai autenticidade. Hoje, seja genuíno em uma interação.',
    'Sua voz importa. Hoje, contribua ativamente em uma discussão.',
  ],
  boundaries: [
    'Limites saudáveis protegem sua energia. Hoje, identifique onde você precisa de mais fronteiras.',
    'Você não precisa estar disponível 24/7. Hoje, desative notificações por 2 horas.',
    '{TYPE}s às vezes cedem demais. Hoje, priorize uma necessidade sua.',
    'Respeitar seus limites ensina outros a respeitá-los. Hoje, seja firme em um "não".',
    'Balanço é essencial. Hoje, proteja tempo para você mesmo.',
  ],
  acceptance: [
    'Aceitar não é desistir. Hoje, faça paz com algo que você não pode mudar.',
    'Perfeccionismo paralisa. Hoje, aceite "bom o suficiente" em algo.',
    '{TYPE}s podem ser duros consigo mesmos. Hoje, pratique autocompaixão.',
    'Você não precisa entender tudo. Hoje, aceite uma incerteza.',
    'Cada pessoa tem seu ritmo. Hoje, aceite alguém como ela é.',
  ],
  action: [
    'Pensar demais impede fazer. Hoje, tome uma ação pequena em direção a um objetivo.',
    'Movimento gera momentum. Hoje, dê o primeiro passo em algo que você tem adiado.',
    '{TYPE}s se beneficiam de ação. Hoje, pare de planejar e comece a executar.',
    'Ação imperfeita supera inação perfeita. Hoje, faça algo mesmo sem ter todas as informações.',
    'Pequenos passos levam longe. Hoje, faça uma micro-ação em direção a um sonho.',
  ],
  social: [
    'Conexão humana é fundamental. Hoje, tenha uma conversa cara a cara (não digital).',
    '{TYPE}s têm preferências sociais únicas. Hoje, honre sua necessidade de interação ou solitude.',
    'Qualidade sobre quantidade. Hoje, invista energia em relacionamentos significativos.',
    'Networking autêntico constrói pontes. Hoje, reconecte com alguém genuinamente.',
    'Comunidade importa. Hoje, contribua para um grupo do qual você faz parte.',
  ],
  focus: [
    'Distrações roubam produtividade. Hoje, trabalhe em blocos de 25 minutos de foco total.',
    'Multitarefa é um mito. Hoje, faça uma coisa de cada vez com atenção plena.',
    '{TYPE}s se beneficiam de concentração. Hoje, elimine notificações durante trabalho profundo.',
    'Priorização é poder. Hoje, identifique a única coisa mais importante.',
    'Foco é treinável. Hoje, pratique retornar sua atenção quando ela se desviar.',
  ],
  structure: [
    'Rotinas liberam energia mental. Hoje, crie uma pequena rotina matinal.',
    '{TYPE}s prosperam com organização. Hoje, estruture seu ambiente de trabalho.',
    'Sistemas previnem caos. Hoje, crie um processo para algo que você faz repetidamente.',
    'Estrutura não é rigidez. Hoje, crie um framework flexível para uma área da sua vida.',
    'Ordem externa reflete ordem interna. Hoje, organize um espaço físico.',
  ],
  empathy: [
    'Entender não é concordar. Hoje, tente ver uma situação pela perspectiva de outra pessoa.',
    '{TYPE}s podem desenvolver mais empatia. Hoje, pergunte "Como você se sente sobre isso?"',
    'Empatia fortalece conexões. Hoje, valide os sentimentos de alguém sem tentar resolver.',
    'Escuta empática cura. Hoje, ouça sem julgar ou aconselhar.',
    'Compassão começa com você. Hoje, seja gentil consigo mesmo.',
  ],
  patience: [
    'Paciência é força, não passividade. Hoje, respire antes de reagir a algo frustrante.',
    'Nem tudo tem seu timing. Hoje, confie no processo de algo que está desenvolvendo.',
    '{TYPE}s podem se beneficiar de mais paciência. Hoje, permita que algo se desenrole naturalmente.',
    'Pressa gera erros. Hoje, vá mais devagar em uma tarefa importante.',
    'Paciência com outros é paciência consigo. Hoje, dê a alguém o tempo que ela precisa.',
  ],
  creativity: [
    'Criatividade requer espaço. Hoje, permita-se 20 minutos de pensamento livre.',
    '{TYPE}s têm criatividade única. Hoje, aborde um problema de um ângulo completamente diferente.',
    'Restrições estimulam criatividade. Hoje, encontre uma solução com recursos limitados.',
    'Criatividade não é só arte. Hoje, seja criativo na solução de um problema cotidiano.',
    'Brincar alimenta inovação. Hoje, faça algo lúdico sem objetivo produtivo.',
  ],
};

const ACTION_ITEMS = {
  leadership: [
    'Delegue uma decisão para alguém da equipe hoje',
    'Explique o "porquê" antes do "como" em uma tarefa',
    'Envie uma mensagem de reconhecimento para um colega',
    'Pergunte a alguém: "Como posso ajudar você a ter sucesso?"',
    'Lidere pelo exemplo em algo que você pede aos outros',
  ],
  relationships: [
    'Peça ajuda ou conselho sobre algo que te desafia',
    'Dê um feedback começando com algo positivo',
    'Faça algo concreto para ajudar alguém próximo',
    'Ligue para alguém ao invés de mandar mensagem',
    'Compartilhe algo pessoal com alguém de confiança',
  ],
  career: [
    'Tente um método novo para resolver um problema recorrente',
    'Escreva uma meta de carreira para os próximos 6 meses',
    'Envie uma mensagem significativa para um contato profissional',
    'Assista a um vídeo ou leia um artigo sobre sua área',
    'Liste 3 conquistas profissionais recentes',
  ],
  'personal-growth': [
    'Identifique uma situação onde você precisou se adaptar',
    'Revise suas prioridades da semana',
    'Faça algo novo que te desafia',
    'Escreva sobre uma lição que você aprendeu recentemente',
    'Compare suas habilidades atuais com as de 6 meses atrás',
  ],
  mindfulness: [
    'Reserve 5 minutos para não fazer absolutamente nada',
    'Identifique e cancele uma atividade desnecessária',
    'Pratique respiração profunda por 10 minutos',
    'Faça uma refeição sem celular ou TV',
    'Escreva 3 coisas pelas quais você é grato hoje',
  ],
  communication: [
    'Faça uma pergunta de clarificação antes de dar sua opinião',
    'Antes de criticar, reconheça algo que a pessoa fez bem',
    'Resuma o que alguém disse antes de responder',
    'Escolha suas palavras cuidadosamente em uma conversa importante',
    'Pause por 3 segundos antes de responder quando estiver irritado',
  ],
  flexibility: [
    'Permita que outra pessoa tome uma decisão importante hoje',
    'Adapte-se a uma mudança sem reclamar',
    'Aceite uma sugestão diferente da sua ideia original',
    'Mude um plano sem resistência',
    'Considere seriamente uma perspectiva oposta à sua',
  ],
  assertiveness: [
    'Diga não a algo que não alinha com suas prioridades',
    'Expresse uma opinião impopular com respeito',
    'Defenda sua posição calmamente em uma discussão',
    'Comunique um limite claramente',
    'Use "eu sinto que..." ao invés de "você sempre..."',
  ],
  conflict: [
    'Inicie uma conversa sobre uma tensão não resolvida',
    'Em um conflito, pergunte: "Ajude-me a entender sua perspectiva"',
    'Conte até 10 antes de responder em uma situação tensa',
    'Proponha um compromisso em uma divergência',
    'Tenha a conversa difícil que você tem adiado',
  ],
  planning: [
    'Dedique 15 minutos para planejar sua semana',
    'Crie um plano de ação com 3 passos para um objetivo',
    'Revise e ajuste um plano que não está funcionando',
    'Defina suas 3 principais prioridades para amanhã',
    'Visualize detalhadamente o sucesso de um projeto',
  ],
  expression: [
    'Compartilhe uma ideia em uma reunião',
    'Dedique 20 minutos a uma atividade criativa',
    'Publique algo que você criou (post, foto, ideia)',
    'Seja autêntico ao invés de dizer o que esperam ouvir',
    'Contribua ativamente em uma discussão',
  ],
  boundaries: [
    'Identifique uma área onde você precisa de limites mais claros',
    'Desative notificações de trabalho após o expediente',
    'Diga não a um pedido que sobrecarregaria você',
    'Proteja 1 hora hoje só para você',
    'Comunique claramente quando você está e não está disponível',
  ],
  acceptance: [
    'Identifique algo que você não pode mudar e faça paz com isso',
    'Entregue algo "bom o suficiente" ao invés de perfeito',
    'Seja gentil consigo mesmo sobre um erro',
    'Aceite uma incerteza sem tentar controlá-la',
    'Pratique aceitação radical de alguém como ela é',
  ],
  action: [
    'Dê um pequeno passo em algo que você tem adiado',
    'Faça o primeiro movimento em direção a um objetivo',
    'Execute algo hoje ao invés de apenas planejar',
    'Tome uma decisão com 80% da informação',
    'Faça uma micro-ação (5 min) em direção a um sonho',
  ],
  social: [
    'Tenha uma conversa presencial com alguém',
    'Passe tempo de qualidade com pessoas importantes',
    'Respeite sua necessidade de tempo sozinho ou com outros',
    'Mande uma mensagem significativa para um amigo',
    'Participe ativamente de uma atividade em grupo',
  ],
  focus: [
    'Trabalhe por 25 minutos sem interrupções',
    'Faça apenas uma tarefa de cada vez por 1 hora',
    'Silencie todas as notificações durante trabalho profundo',
    'Identifique a tarefa mais importante e faça ela primeiro',
    'Pratique retornar o foco quando se distrair',
  ],
  structure: [
    'Crie uma rotina matinal simples (3 passos)',
    'Organize seu espaço de trabalho',
    'Crie um checklist para algo que você faz sempre',
    'Estabeleça um horário fixo para uma atividade',
    'Arrume uma gaveta, prateleira ou pasta digital',
  ],
  empathy: [
    'Pergunte a alguém: "Como você está se sentindo de verdade?"',
    'Tente ver uma situação pela perspectiva de outra pessoa',
    'Valide sentimentos sem tentar resolver o problema',
    'Ouça alguém sem julgar ou dar conselhos',
    'Pratique autocompaixão quando cometer um erro',
  ],
  patience: [
    'Respire fundo 3 vezes antes de reagir a algo frustrante',
    'Confie no timing de algo que está desenvolvendo',
    'Permita que um processo se desenrole sem forçar',
    'Faça algo importante mais devagar e com atenção',
    'Dê a alguém o tempo extra que ela precisa',
  ],
  creativity: [
    'Reserve 20 minutos para pensar livremente',
    'Aborde um problema de um ângulo completamente diferente',
    'Encontre uma solução criativa com recursos limitados',
    'Seja criativo na solução de um problema cotidiano',
    'Faça algo lúdico sem objetivo específico',
  ],
};

function generateInsights() {
  const insights = [];
  let insightId = 1;

  for (const type of MBTI_TYPES) {
    console.log(`Generating 30 insights for ${type}...`);

    // 30 insights por tipo, distribuídos pelas categorias
    for (let i = 0; i < 30; i++) {
      const category = CATEGORIES[i % CATEGORIES.length];
      const templates = INSIGHT_TEMPLATES[category];
      const actions = ACTION_ITEMS[category];

      // Escolhe template e action baseado no índice para variação
      const templateIndex = Math.floor(i / CATEGORIES.length) % templates.length;
      const actionIndex = Math.floor(i / CATEGORIES.length) % actions.length;

      const insightText = templates[templateIndex].replace('{TYPE}', type);
      const actionItem = actions[actionIndex];

      insights.push({
        personalityType: type,
        category: category,
        insightText: insightText,
        actionItem: actionItem,
      });

      insightId++;
    }
  }

  return insights;
}

async function seedDatabase() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL || 'postgres://PathPost:PAzo18**@31.97.23.166:5432/PathPost?sslmode=disable'
  });

  try {
    await client.connect();
    console.log('✅ Connected to database\n');

    const insights = generateInsights();
    console.log(`📦 Generated ${insights.length} insights\n`);

    let inserted = 0;
    let skipped = 0;

    for (const insight of insights) {
      try {
        // Check if insight already exists
        const checkResult = await client.query(
          'SELECT id FROM daily_insights WHERE personality_type = $1 AND insight_text = $2',
          [insight.personalityType, insight.insightText]
        );

        if (checkResult.rows.length === 0) {
          await client.query(
            `INSERT INTO daily_insights (personality_type, insight_text, category, action_item)
             VALUES ($1, $2, $3, $4)`,
            [insight.personalityType, insight.insightText, insight.category, insight.actionItem]
          );
          inserted++;

          if (inserted % 50 === 0) {
            console.log(`  ✓ Inserted ${inserted} insights...`);
          }
        } else {
          skipped++;
        }
      } catch (error) {
        console.error(`  ✗ Error inserting insight for ${insight.personalityType}:`, error.message);
      }
    }

    console.log(`\n✅ Seeding completed!`);
    console.log(`   - Inserted: ${inserted}`);
    console.log(`   - Skipped (already existing): ${skipped}`);
    console.log(`   - Total: ${insights.length}`);

    // Verify final count
    const countResult = await client.query('SELECT COUNT(*) FROM daily_insights');
    console.log(`\n✅ Total insights in database: ${countResult.rows[0].count}`);

    // Show count by type
    const byTypeResult = await client.query(
      'SELECT personality_type, COUNT(*) as count FROM daily_insights GROUP BY personality_type ORDER BY personality_type'
    );
    console.log('\n📊 Insights by type:');
    byTypeResult.rows.forEach(row => {
      console.log(`   ${row.personality_type}: ${row.count}`);
    });

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seedDatabase();
