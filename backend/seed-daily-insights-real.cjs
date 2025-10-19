/**
 * Seed Daily Insights with Real Data for all 16 MBTI Types
 *
 * This script populates the daily_insights table with proper insights
 * for each MBTI type with proper title, content, category, and icon.
 */

const { Client } = require('pg');

// Database connection (from environment variable or default)
const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://pathfinder:jzorzetti123@localhost:5432/pathfinder';

// Daily Insights by MBTI Type (5 insights per type for MVP)
const DAILY_INSIGHTS = {
  INTJ: [
    {
      title: 'Comunique sua Visão',
      content: 'Hoje, compartilhe uma de suas ideias estratégicas com alguém. INTJs tendem a guardar insights para si - mas comunicar é essencial para transformar visão em ação.',
      category: 'Comunicação',
      icon: 'message-circle',
    },
    {
      title: 'Valorize o Processo',
      content: 'Nem tudo precisa ser perfeito desde o início. Pratique valorizar o progresso incremental hoje, mesmo que não esteja no seu padrão de excelência.',
      category: 'Crescimento Pessoal',
      icon: 'target',
    },
    {
      title: 'Conexão Emocional',
      content: 'INTJs processam o mundo pela lógica, mas relacionamentos precisam de calor humano. Hoje, pergunte a alguém como está se sentindo - e escute genuinamente.',
      category: 'Relacionamentos',
      icon: 'heart',
    },
    {
      title: 'Delegue com Confiança',
      content: 'Você não precisa fazer tudo sozinho. Identifique uma tarefa que pode ser delegada hoje e confie no processo de outras pessoas.',
      category: 'Liderança',
      icon: 'users',
    },
    {
      title: 'Celebre Conquistas',
      content: 'INTJs focam no próximo objetivo sem celebrar o atual. Hoje, pare e reconheça uma vitória recente - por menor que seja.',
      category: 'Mindfulness',
      icon: 'award',
    },
  ],
  INTP: [
    {
      title: 'Transforme Teoria em Ação',
      content: 'Você tem ideias brilhantes - mas hoje é dia de colocar uma delas em prática. Escolha um conceito e dê o primeiro passo concreto.',
      category: 'Carreira',
      icon: 'zap',
    },
    {
      title: 'Simplifique sua Comunicação',
      content: 'INTPs adoram precisão, mas nem sempre outros acompanham. Hoje, explique uma ideia complexa de forma simples para alguém.',
      category: 'Comunicação',
      icon: 'message-circle',
    },
    {
      title: 'Estabeleça uma Rotina',
      content: 'Estrutura não é prisão - é liberdade. Crie uma pequena rotina hoje que libere sua mente para o que realmente importa.',
      category: 'Crescimento Pessoal',
      icon: 'calendar',
    },
    {
      title: 'Conecte-se Emocionalmente',
      content: 'Lógica é sua força, mas emoções também têm lógica. Hoje, valide o sentimento de alguém sem tentar "consertar" o problema.',
      category: 'Relacionamentos',
      icon: 'heart',
    },
    {
      title: 'Finalize um Projeto',
      content: 'INTPs iniciam muitos projetos mas finalizam poucos. Hoje, escolha algo 80% pronto e conclua - não precisa ser perfeito.',
      category: 'Carreira',
      icon: 'check-circle',
    },
  ],
  ENTJ: [
    {
      title: 'Escute Antes de Decidir',
      content: 'ENTJs são decisores rápidos - mas hoje, pause. Antes de tomar uma decisão importante, pergunte: "O que estou perdendo?"',
      category: 'Liderança',
      icon: 'users',
    },
    {
      title: 'Empatia é Estratégia',
      content: 'Eficiência sem empatia gera resistência. Hoje, pergunte a alguém da equipe como pode apoiar além das entregas.',
      category: 'Relacionamentos',
      icon: 'heart',
    },
    {
      title: 'Celebre Pequenas Vitórias',
      content: 'Você foca no próximo marco sem celebrar o atual. Hoje, reconheça publicamente uma conquista da equipe - por menor que seja.',
      category: 'Liderança',
      icon: 'award',
    },
    {
      title: 'Vulnerabilidade é Força',
      content: 'Admitir incerteza não é fraqueza. Hoje, compartilhe uma dúvida ou preocupação com alguém de confiança.',
      category: 'Crescimento Pessoal',
      icon: 'shield',
    },
    {
      title: 'Processos Importam',
      content: 'Resultado é rei, mas processos sustentam vitórias. Hoje, melhore um sistema em vez de apenas buscar o próximo objetivo.',
      category: 'Carreira',
      icon: 'settings',
    },
  ],
  ENTP: [
    {
      title: 'Finalize o que Iniciou',
      content: 'ENTPs são ótimos em começar - mas hoje é dia de terminar. Escolha um projeto 70% pronto e conclua, mesmo que imperfeito.',
      category: 'Carreira',
      icon: 'check-circle',
    },
    {
      title: 'Escolha uma Direção',
      content: 'Possibilidades são infinitas, mas foco cria resultados. Hoje, comprometa-se com UMA ideia e ignore as outras por 24h.',
      category: 'Crescimento Pessoal',
      icon: 'target',
    },
    {
      title: 'Ouça sem Debater',
      content: 'Nem toda conversa é um debate. Hoje, ouça a perspectiva de alguém sem contra-argumentar - apenas valide.',
      category: 'Relacionamentos',
      icon: 'ear',
    },
    {
      title: 'Estrutura Libera Criatividade',
      content: 'Rotina não mata criatividade - protege. Crie um sistema simples hoje que libere energia mental para inovação.',
      category: 'Carreira',
      icon: 'calendar',
    },
    {
      title: 'Profundidade sobre Amplitude',
      content: 'ENTPs exploram amplamente - mas hoje, vá fundo. Escolha um tema e estude por 1h ininterrupta.',
      category: 'Crescimento Pessoal',
      icon: 'book-open',
    },
  ],
  INFJ: [
    {
      title: 'Estabeleça um Limite',
      content: 'INFJs absorvem emoções alheias - mas hoje, proteja sua energia. Diga "não" educadamente a algo que esgota você.',
      category: 'Crescimento Pessoal',
      icon: 'shield',
    },
    {
      title: 'Compartilhe sua Visão',
      content: 'Você enxerga conexões profundas - mas hoje, verbalize. Compartilhe uma intuição com alguém, mesmo que difícil de explicar.',
      category: 'Comunicação',
      icon: 'message-circle',
    },
    {
      title: 'Ação sobre Perfeição',
      content: 'Nem tudo precisa estar perfeito para começar. Hoje, dê o primeiro passo em algo que você vem adiando.',
      category: 'Carreira',
      icon: 'zap',
    },
    {
      title: 'Receba sem Culpa',
      content: 'INFJs dão constantemente - mas hoje, permita-se receber. Aceite ajuda, elogio ou cuidado de alguém.',
      category: 'Relacionamentos',
      icon: 'gift',
    },
    {
      title: 'Cuide de Si Mesmo',
      content: 'Você cuida de todos, mas esquece de si. Hoje, reserve 30 minutos só para você - sem culpa, sem produtividade.',
      category: 'Mindfulness',
      icon: 'heart',
    },
  ],
  INFP: [
    {
      title: 'Estabeleça um Limite',
      content: 'INFPs evitam conflito, mas limites protegem valores. Hoje, diga "não" a algo que não se alinha com quem você é.',
      category: 'Crescimento Pessoal',
      icon: 'shield',
    },
    {
      title: 'Transforme Ideal em Real',
      content: 'Você tem visões lindas - mas hoje, materialize. Escolha um sonho e dê um passo prático, por menor que seja.',
      category: 'Carreira',
      icon: 'target',
    },
    {
      title: 'Compartilhe sua Arte',
      content: 'Sua criatividade merece ser vista. Hoje, compartilhe algo que você criou - mesmo que imperfeito.',
      category: 'Crescimento Pessoal',
      icon: 'palette',
    },
    {
      title: 'Fale suas Necessidades',
      content: 'INFPs esperam que outros adivinhem - mas hoje, verbalize. Peça o que você precisa claramente para alguém.',
      category: 'Relacionamentos',
      icon: 'message-circle',
    },
    {
      title: 'Finalize o Projeto',
      content: 'Perfeccionismo interno paralisa - mas feito é melhor que perfeito. Hoje, termine algo que está 80% pronto.',
      category: 'Carreira',
      icon: 'check-circle',
    },
  ],
  ENFJ: [
    {
      title: 'Cuide de Si Primeiro',
      content: 'ENFJs dão até esgotarem - mas hoje, priorize você. Reserve tempo para recarregar antes de ajudar outros.',
      category: 'Mindfulness',
      icon: 'heart',
    },
    {
      title: 'Estabeleça um Limite',
      content: 'Dizer "não" não é egoísmo. Hoje, recuse educadamente algo que drena sua energia.',
      category: 'Crescimento Pessoal',
      icon: 'shield',
    },
    {
      title: 'Aceite Imperfeição',
      content: 'Nem todos vão gostar de você - e está tudo bem. Hoje, pratique aceitar discordância sem tentar "consertar" a relação.',
      category: 'Relacionamentos',
      icon: 'smile',
    },
    {
      title: 'Escute sua Intuição',
      content: 'Você foca tanto nos outros que ignora sinais internos. Hoje, pergunte: "O que EU preciso agora?"',
      category: 'Crescimento Pessoal',
      icon: 'compass',
    },
    {
      title: 'Lidere com Limites',
      content: 'Liderança inspiradora precisa de sustentabilidade. Hoje, delegue algo que você sempre faz sozinho.',
      category: 'Liderança',
      icon: 'users',
    },
  ],
  ENFP: [
    {
      title: 'Finalize uma Tarefa',
      content: 'ENFPs iniciam com entusiasmo - mas hoje, termine. Escolha uma tarefa incompleta e conclua, mesmo sem paixão.',
      category: 'Carreira',
      icon: 'check-circle',
    },
    {
      title: 'Foco sobre Possibilidades',
      content: 'Você vê mil caminhos - mas hoje, escolha UM. Comprometa-se por 24h e ignore outras opções.',
      category: 'Crescimento Pessoal',
      icon: 'target',
    },
    {
      title: 'Rotina Libera Criatividade',
      content: 'Estrutura não mata espontaneidade - protege energia. Crie uma pequena rotina hoje que sustente suas paixões.',
      category: 'Carreira',
      icon: 'calendar',
    },
    {
      title: 'Profundidade sobre Amplitude',
      content: 'ENFPs exploram amplamente - mas relacionamentos precisam de profundidade. Hoje, tenha uma conversa real com alguém.',
      category: 'Relacionamentos',
      icon: 'users',
    },
    {
      title: 'Aceite o Tédio Produtivo',
      content: 'Nem tudo é empolgante - e está tudo bem. Hoje, faça uma tarefa "chata" sem procrastinar.',
      category: 'Crescimento Pessoal',
      icon: 'clock',
    },
  ],
  ISTJ: [
    {
      title: 'Experimente uma Nova Abordagem',
      content: 'ISTJs confiam em métodos testados - mas hoje, tente algo diferente. Pequenas mudanças trazem grandes insights.',
      category: 'Crescimento Pessoal',
      icon: 'refresh-cw',
    },
    {
      title: 'Verbalize Apreciação',
      content: 'Você mostra cuidado com ações - mas hoje, use palavras. Diga "obrigado" ou "bom trabalho" a alguém.',
      category: 'Relacionamentos',
      icon: 'heart',
    },
    {
      title: 'Delegue com Confiança',
      content: 'Você prefere fazer sozinho para garantir qualidade - mas hoje, confie. Delegue uma tarefa e observe.',
      category: 'Liderança',
      icon: 'users',
    },
    {
      title: 'Abra-se para o Imprevisível',
      content: 'Nem tudo pode ser planejado. Hoje, reserve 1h sem agenda fixa e veja o que surge.',
      category: 'Mindfulness',
      icon: 'wind',
    },
    {
      title: 'Celebre o Progresso',
      content: 'ISTJs focam no que falta - mas hoje, reconheça o que já foi feito. Liste 3 conquistas recentes.',
      category: 'Crescimento Pessoal',
      icon: 'award',
    },
  ],
  ISFJ: [
    {
      title: 'Priorize suas Necessidades',
      content: 'ISFJs cuidam de todos - mas hoje, cuide de você primeiro. Faça algo que VOCÊ quer, sem considerar outros.',
      category: 'Mindfulness',
      icon: 'heart',
    },
    {
      title: 'Estabeleça um Limite',
      content: 'Dizer "não" não é abandono. Hoje, recuse educadamente algo que esgota sua energia.',
      category: 'Crescimento Pessoal',
      icon: 'shield',
    },
    {
      title: 'Aceite Mudanças',
      content: 'Nem toda mudança é ameaça. Hoje, identifique uma mudança recente e encontre um aspecto positivo.',
      category: 'Crescimento Pessoal',
      icon: 'trending-up',
    },
    {
      title: 'Verbalize suas Necessidades',
      content: 'Você espera que outros percebam - mas hoje, peça. Comunique claramente algo que você precisa.',
      category: 'Relacionamentos',
      icon: 'message-circle',
    },
    {
      title: 'Receba sem Culpa',
      content: 'ISFJs dão constantemente - mas hoje, permita-se receber. Aceite ajuda ou elogio sem minimizar.',
      category: 'Relacionamentos',
      icon: 'gift',
    },
  ],
  ESTJ: [
    {
      title: 'Pratique Flexibilidade',
      content: 'Nem tudo sai conforme o plano. Hoje, quando algo mudar, pergunte: "Como posso me adaptar?" em vez de resistir.',
      category: 'Crescimento Pessoal',
      icon: 'refresh-cw',
    },
    {
      title: 'Escute Antes de Decidir',
      content: 'ESTJs decidem rápido - mas hoje, pause. Pergunte "O que você acha?" antes de dar a solução.',
      category: 'Liderança',
      icon: 'ear',
    },
    {
      title: 'Empatia é Eficiência',
      content: 'Relacionamentos não são tarefas - mas hoje, reserve 10min para perguntar a alguém como está se sentindo.',
      category: 'Relacionamentos',
      icon: 'heart',
    },
    {
      title: 'Delegue para Empoderar',
      content: 'Você faz bem feito - mas liderança é formar outros. Hoje, delegue algo importante e confie no processo.',
      category: 'Liderança',
      icon: 'users',
    },
    {
      title: 'Valorize o Processo',
      content: 'Resultado importa - mas como você chega lá também. Hoje, reconheça o esforço de alguém, não só a entrega.',
      category: 'Liderança',
      icon: 'award',
    },
  ],
  ESFJ: [
    {
      title: 'Cuide de Si Mesmo',
      content: 'ESFJs cuidam de todos - mas hoje, você é prioridade. Reserve 30min só para você, sem culpa.',
      category: 'Mindfulness',
      icon: 'heart',
    },
    {
      title: 'Estabeleça um Limite',
      content: 'Harmonia não significa ausência de limites. Hoje, diga "não" a algo que drena sua energia.',
      category: 'Crescimento Pessoal',
      icon: 'shield',
    },
    {
      title: 'Aceite Discordância',
      content: 'Nem todos vão concordar com você - e está tudo bem. Hoje, ouça uma crítica sem tentar defender-se.',
      category: 'Relacionamentos',
      icon: 'message-circle',
    },
    {
      title: 'Delegue com Confiança',
      content: 'Você quer que tudo seja perfeito - mas hoje, confie. Peça ajuda e aceite o jeito de outros.',
      category: 'Liderança',
      icon: 'users',
    },
    {
      title: 'Valorize suas Conquistas',
      content: 'ESFJs focam em agradar - mas hoje, reconheça o que VOCÊ conquistou. Liste 3 vitórias recentes.',
      category: 'Crescimento Pessoal',
      icon: 'award',
    },
  ],
  ISTP: [
    {
      title: 'Planeje o Longo Prazo',
      content: 'ISTPs vivem o momento - mas hoje, pense adiante. Escreva uma meta para daqui 6 meses.',
      category: 'Carreira',
      icon: 'target',
    },
    {
      title: 'Verbalize seus Sentimentos',
      content: 'Você processa internamente - mas hoje, compartilhe. Diga a alguém como você está se sentindo.',
      category: 'Relacionamentos',
      icon: 'message-circle',
    },
    {
      title: 'Comprometa-se com uma Rotina',
      content: 'Liberdade é importante - mas estrutura sustenta. Crie uma pequena rotina hoje que proteja sua energia.',
      category: 'Crescimento Pessoal',
      icon: 'calendar',
    },
    {
      title: 'Conecte-se Emocionalmente',
      content: 'Lógica resolve problemas - mas relacionamentos precisam de presença. Hoje, ouça alguém sem tentar "consertar".',
      category: 'Relacionamentos',
      icon: 'heart',
    },
    {
      title: 'Finalize um Projeto',
      content: 'ISTPs exploram sem concluir - mas hoje, termine. Escolha algo 80% pronto e finalize.',
      category: 'Carreira',
      icon: 'check-circle',
    },
  ],
  ISFP: [
    {
      title: 'Compartilhe sua Arte',
      content: 'Sua criatividade merece ser vista. Hoje, mostre algo que você criou para alguém - mesmo que vulnerável.',
      category: 'Crescimento Pessoal',
      icon: 'palette',
    },
    {
      title: 'Estabeleça um Limite',
      content: 'ISFPs evitam confronto - mas limites protegem paz. Hoje, diga "não" a algo que não se alinha com você.',
      category: 'Crescimento Pessoal',
      icon: 'shield',
    },
    {
      title: 'Planeje o Futuro',
      content: 'Você vive o presente - mas hoje, pense adiante. Escreva um objetivo para os próximos 3 meses.',
      category: 'Carreira',
      icon: 'compass',
    },
    {
      title: 'Verbalize suas Necessidades',
      content: 'Você espera que outros percebam - mas hoje, peça. Comunique claramente algo que você precisa.',
      category: 'Relacionamentos',
      icon: 'message-circle',
    },
    {
      title: 'Finalize um Projeto',
      content: 'ISFPs criam livremente - mas hoje, conclua. Termine algo que está esperando perfeição.',
      category: 'Carreira',
      icon: 'check-circle',
    },
  ],
  ESTP: [
    {
      title: 'Pense Antes de Agir',
      content: 'ESTPs agem rápido - mas hoje, pause. Antes de uma decisão importante, pergunte: "Qual o impacto a longo prazo?"',
      category: 'Crescimento Pessoal',
      icon: 'clock',
    },
    {
      title: 'Planeje o Futuro',
      content: 'Você domina o agora - mas hoje, pense adiante. Reserve 30min para planejar algo importante.',
      category: 'Carreira',
      icon: 'target',
    },
    {
      title: 'Ouça sem Interromper',
      content: 'Você resolve rápido - mas hoje, apenas escute. Deixe alguém terminar sem oferecer solução.',
      category: 'Relacionamentos',
      icon: 'ear',
    },
    {
      title: 'Comprometa-se com uma Rotina',
      content: 'Liberdade é importante - mas consistência traz resultados. Crie uma pequena rotina produtiva hoje.',
      category: 'Carreira',
      icon: 'calendar',
    },
    {
      title: 'Profundidade sobre Ação',
      content: 'ESTPs agem - mas hoje, reflita. Reserve 15min para analisar por que você faz o que faz.',
      category: 'Crescimento Pessoal',
      icon: 'book-open',
    },
  ],
  ESFP: [
    {
      title: 'Planeje o Amanhã',
      content: 'ESFPs vivem o presente - mas hoje, olhe adiante. Reserve 20min para planejar a próxima semana.',
      category: 'Carreira',
      icon: 'calendar',
    },
    {
      title: 'Finalize uma Tarefa',
      content: 'Você inicia com energia - mas hoje, termine. Escolha algo incompleto e conclua, mesmo sem empolgação.',
      category: 'Carreira',
      icon: 'check-circle',
    },
    {
      title: 'Profundidade sobre Diversão',
      content: 'Nem tudo precisa ser leve - mas relacionamentos precisam de profundidade. Hoje, tenha uma conversa séria com alguém.',
      category: 'Relacionamentos',
      icon: 'users',
    },
    {
      title: 'Aceite o Tédio Produtivo',
      content: 'Nem sempre é empolgante - e está tudo bem. Hoje, faça uma tarefa "chata" sem procrastinar.',
      category: 'Crescimento Pessoal',
      icon: 'clock',
    },
    {
      title: 'Economize para o Futuro',
      content: 'ESFPs gastam no momento - mas hoje, pense adiante. Reserve uma pequena quantia para algo futuro.',
      category: 'Carreira',
      icon: 'piggy-bank',
    },
  ],
};

async function seedDailyInsights() {
  const client = new Client({
    connectionString: DATABASE_URL,
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected!');

    // Clear existing insights
    console.log('🗑️  Clearing existing daily insights...');
    await client.query('DELETE FROM daily_insights');
    console.log('✅ Cleared!');

    // Insert insights for all types
    console.log('📝 Inserting daily insights...');
    let totalInserted = 0;

    for (const [mbtiType, insights] of Object.entries(DAILY_INSIGHTS)) {
      console.log(`\n   Processing ${mbtiType}...`);

      for (let i = 0; i < insights.length; i++) {
        const insight = insights[i];
        const dayOfYear = (i + 1) * 73; // Distribute across year

        await client.query(
          `INSERT INTO daily_insights (mbti_type, day_of_year, title, content, category, icon)
           VALUES ($1, $2, $3, $4, $5, $6)`,
          [mbtiType, dayOfYear % 365 || 365, insight.title, insight.content, insight.category, insight.icon]
        );

        totalInserted++;
      }

      console.log(`   ✅ ${insights.length} insights inserted for ${mbtiType}`);
    }

    console.log(`\n🎉 Success! Total insights inserted: ${totalInserted}`);
    console.log(`📊 Coverage: ${Object.keys(DAILY_INSIGHTS).length} MBTI types`);

    // Verify
    const result = await client.query('SELECT mbti_type, COUNT(*) FROM daily_insights GROUP BY mbti_type ORDER BY mbti_type');
    console.log('\n📋 Verification:');
    result.rows.forEach(row => {
      console.log(`   ${row.mbti_type}: ${row.count} insights`);
    });

  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  } finally {
    await client.end();
    console.log('\n👋 Database connection closed');
  }
}

// Run the seed
seedDailyInsights()
  .then(() => {
    console.log('\n✅ Seed completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Seed failed:', error);
    process.exit(1);
  });
