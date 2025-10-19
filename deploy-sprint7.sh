#!/bin/bash

# 🚀 Script de Deployment do Sprint 7: Challenges & Journal
# Execute este script no terminal do seu backend no Easypanel

set -e  # Para em caso de erro

echo "🚀 Iniciando deployment do Sprint 7..."
echo ""

# Cores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# ============================================
# PASSO 1: Criar Migration Script
# ============================================
echo -e "${BLUE}📝 Criando script de migration...${NC}"

cat > /tmp/run-sprint7-migration.js << 'ENDOFFILE'
const { Client } = require('pg');

async function runMigration() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'pathfinder',
  });

  try {
    console.log('🔄 Conectando ao banco de dados...');
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    console.log('📊 Executando migration do Sprint 7: Challenges & Journal\n');

    // 1. Criar tabela challenge_templates
    console.log('1️⃣  Criando tabela challenge_templates...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS challenge_templates (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        challenge_id VARCHAR(100) UNIQUE NOT NULL,
        mbti_type VARCHAR(4) NOT NULL,
        title VARCHAR(200) NOT NULL,
        description TEXT NOT NULL,
        how_to TEXT NOT NULL,
        why TEXT NOT NULL,
        xp_reward INTEGER DEFAULT 50,
        badge_reward VARCHAR(100),
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_challenge_templates_mbti ON challenge_templates(mbti_type);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_challenge_templates_challenge_id ON challenge_templates(challenge_id);`);
    console.log('   ✅ Tabela challenge_templates criada\n');

    // 2. Criar tabela user_challenges
    console.log('2️⃣  Criando tabela user_challenges...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS user_challenges (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        challenge_id VARCHAR(100) NOT NULL REFERENCES challenge_templates(challenge_id),
        week_start_date DATE NOT NULL,
        days_completed JSONB DEFAULT '[]'::jsonb,
        completed BOOLEAN DEFAULT false,
        completed_at TIMESTAMP,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_user_challenges_user ON user_challenges(user_id);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_user_challenges_week ON user_challenges(week_start_date);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_user_challenges_completed ON user_challenges(completed);`);
    console.log('   ✅ Tabela user_challenges criada\n');

    // 3. Criar tabela journal_prompts
    console.log('3️⃣  Criando tabela journal_prompts...');
    await client.query(`
      CREATE TABLE IF NOT EXISTS journal_prompts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        mbti_type VARCHAR(4),
        prompt TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        day_of_year INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_journal_prompts_mbti ON journal_prompts(mbti_type);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_journal_prompts_category ON journal_prompts(category);`);
    await client.query(`CREATE INDEX IF NOT EXISTS idx_journal_prompts_day ON journal_prompts(day_of_year);`);
    console.log('   ✅ Tabela journal_prompts criada\n');

    // 4. Atualizar journal_entries
    console.log('4️⃣  Atualizando tabela journal_entries...');

    const promptUsedExists = await client.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name='journal_entries' AND column_name='prompt_used';
    `);

    if (promptUsedExists.rows.length === 0) {
      await client.query(`ALTER TABLE journal_entries ADD COLUMN IF NOT EXISTS prompt_used VARCHAR(500);`);
      console.log('   ✅ Coluna prompt_used adicionada');
    } else {
      console.log('   ⏭️  Coluna prompt_used já existe');
    }

    const tagsColumn = await client.query(`
      SELECT data_type
      FROM information_schema.columns
      WHERE table_name='journal_entries' AND column_name='tags';
    `);

    if (tagsColumn.rows.length > 0 && tagsColumn.rows[0].data_type !== 'jsonb') {
      console.log('   🔄 Convertendo coluna tags para JSONB...');
      await client.query(`
        ALTER TABLE journal_entries
        ALTER COLUMN tags TYPE JSONB USING
        CASE
          WHEN tags IS NULL THEN '[]'::jsonb
          ELSE to_jsonb(string_to_array(tags, ','))
        END;
      `);
      console.log('   ✅ Coluna tags convertida para JSONB');
    } else if (tagsColumn.rows.length === 0) {
      await client.query(`ALTER TABLE journal_entries ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb;`);
      console.log('   ✅ Coluna tags criada como JSONB');
    } else {
      console.log('   ⏭️  Coluna tags já é JSONB');
    }

    console.log('\n✅ Migration do Sprint 7 concluída com sucesso!\n');

    await client.end();
  } catch (error) {
    console.error('❌ Erro ao executar migration:', error);
    process.exit(1);
  }
}

runMigration();
ENDOFFILE

echo -e "${GREEN}✅ Script de migration criado em /tmp/run-sprint7-migration.js${NC}"
echo ""

# ============================================
# PASSO 2: Executar Migration
# ============================================
echo -e "${BLUE}🔧 Executando migration...${NC}"
node /tmp/run-sprint7-migration.js

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Migration executada com sucesso!${NC}"
    echo ""
else
    echo -e "${RED}❌ Erro ao executar migration${NC}"
    exit 1
fi

# ============================================
# PASSO 3: Seed Challenge Templates
# ============================================
echo -e "${BLUE}📊 Populando challenge templates...${NC}"

cat > /tmp/seed-challenges.js << 'ENDOFFILE'
const { Client } = require('pg');

const CHALLENGE_TEMPLATES_SEED = [
  // ESTJ
  { challengeId: 'estj_delegate_tasks', mbtiType: 'ESTJ', title: 'Semana da Delegação', description: 'Pratique delegar tarefas que você normalmente faria sozinho.', howTo: 'Cada dia, delegue pelo menos uma tarefa importante para alguém da equipe.', why: 'ESTJs tendem a assumir tudo. Empoderar outros é essencial para crescer como líder.', xpReward: 50 },
  { challengeId: 'estj_listen_before_act', mbtiType: 'ESTJ', title: 'Pausa Estratégica', description: 'Antes de tomar decisões, ouça ativamente todas as perspectivas.', howTo: 'Em cada reunião ou conversa importante, pause 30 segundos antes de responder.', why: 'ESTJs são decididos, mas ouvir primeiro pode revelar soluções melhores.', xpReward: 50 },
  { challengeId: 'estj_flexibility_practice', mbtiType: 'ESTJ', title: 'Flexibilidade Planejada', description: 'Permita que imprevistos aconteçam sem resistência.', howTo: 'Quando algo sair do plano, respire fundo e adapte-se sem frustração.', why: 'A rigidez pode limitar oportunidades. Flexibilidade é força.', xpReward: 50 },

  // ENTJ
  { challengeId: 'entj_acknowledge_feelings', mbtiType: 'ENTJ', title: 'Semana da Empatia', description: 'Reconheça e valide os sentimentos dos outros antes de partir para soluções.', howTo: 'Quando alguém compartilhar um problema, pergunte "Como você está se sentindo?" antes de resolver.', why: 'ENTJs focam em eficiência, mas conexões humanas fortalecem liderança.', xpReward: 50 },
  { challengeId: 'entj_celebrate_progress', mbtiType: 'ENTJ', title: 'Celebrar Pequenas Vitórias', description: 'Pause para comemorar conquistas intermediárias, não só o resultado final.', howTo: 'Todo dia, identifique e celebre um progresso, mesmo que pequeno.', why: 'ENTJs são orientados a metas, mas celebrar o caminho mantém a motivação.', xpReward: 50 },
  { challengeId: 'entj_rest_without_guilt', mbtiType: 'ENTJ', title: 'Descanso Estratégico', description: 'Pratique descansar sem culpa, reconhecendo que é parte da performance.', howTo: 'Reserve 1h por dia para algo relaxante, sem pensar em trabalho.', why: 'Produtividade sustentável requer pausas. Descanso é estratégia, não fraqueza.', xpReward: 50 },

  // ESFJ
  { challengeId: 'esfj_say_no', mbtiType: 'ESFJ', title: 'Semana do Não', description: 'Pratique dizer "não" sem culpa quando necessário.', howTo: 'Identifique 1 pedido por dia que você normalmente aceitaria, mas precisa recusar.', why: 'ESFJs tendem a agradar todos, mas limites protegem sua energia.', xpReward: 50 },
  { challengeId: 'esfj_self_care_first', mbtiType: 'ESFJ', title: 'Eu Primeiro', description: 'Priorize suas necessidades antes de ajudar os outros.', howTo: 'Todo dia, faça algo só para você antes de atender demandas alheias.', why: 'Você não pode servir de um copo vazio. Autocuidado não é egoísmo.', xpReward: 50 },
  { challengeId: 'esfj_accept_imperfection', mbtiType: 'ESFJ', title: 'Abraçar o Imperfeito', description: 'Permita que coisas sejam "bom o suficiente" ao invés de perfeitas.', howTo: 'Identifique uma tarefa e aceite 80% de perfeição ao invés de 100%.', why: 'Perfeccionismo drena energia. "Bom o suficiente" libera você.', xpReward: 50 },

  // ENFJ
  { challengeId: 'enfj_boundaries', mbtiType: 'ENFJ', title: 'Semana dos Limites', description: 'Estabeleça e mantenha limites saudáveis com os outros.', howTo: 'Quando alguém pedir algo, pause e avalie se você TEM energia para isso.', why: 'ENFJs dão muito de si. Limites protegem sua essência.', xpReward: 50 },
  { challengeId: 'enfj_receive_help', mbtiType: 'ENFJ', title: 'Aceitar Ajuda', description: 'Pratique pedir e receber ajuda dos outros.', howTo: 'Todo dia, peça ajuda para uma coisa, mesmo que pequena.', why: 'ENFJs ajudam todos, mas também merecem apoio. Vulnerabilidade é coragem.', xpReward: 50 },
  { challengeId: 'enfj_pause_rescuing', mbtiType: 'ENFJ', title: 'Não Salvar', description: 'Resista ao impulso de "salvar" alguém que precisa aprender sozinho.', howTo: 'Quando alguém pedir ajuda, pergunte: "Essa pessoa PRECISA ou QUER que eu resolva?"', why: 'Ajudar demais impede crescimento alheio. Confie na capacidade dos outros.', xpReward: 50 },

  // ISTJ
  { challengeId: 'istj_try_new_approach', mbtiType: 'ISTJ', title: 'Semana da Experimentação', description: 'Tente uma abordagem nova para uma tarefa que você sempre faz igual.', howTo: 'Escolha uma rotina e mude o método, mesmo que seja desconfortável.', why: 'ISTJs valorizam tradição, mas inovação pode trazer eficiência.', xpReward: 50 },
  { challengeId: 'istj_express_appreciation', mbtiType: 'ISTJ', title: 'Expressar Gratidão', description: 'Verbalize apreciação por pessoas ao seu redor.', howTo: 'Todo dia, diga a alguém algo específico que você valoriza nele.', why: 'ISTJs demonstram amor por ações, mas palavras também fortalecem vínculos.', xpReward: 50 },
  { challengeId: 'istj_spontaneous_moment', mbtiType: 'ISTJ', title: 'Momento Espontâneo', description: 'Permita um momento espontâneo por dia, sem planejamento.', howTo: 'Aceite um convite de última hora ou faça algo não programado.', why: 'Planejamento é ótimo, mas espontaneidade traz leveza.', xpReward: 50 },

  // INTJ
  { challengeId: 'intj_share_process', mbtiType: 'INTJ', title: 'Compartilhar o Processo', description: 'Explique seu raciocínio e processo de pensamento para os outros.', howTo: 'Quando tomar uma decisão, compartilhe o "porquê" e "como" chegou nela.', why: 'INTJs processam internamente, mas transparência cria confiança.', xpReward: 50 },
  { challengeId: 'intj_validate_emotions', mbtiType: 'INTJ', title: 'Validar Emoções', description: 'Reconheça emoções (suas e dos outros) como informações válidas.', howTo: 'Quando alguém expressar um sentimento, responda: "Entendo que você se sente assim."', why: 'Lógica é importante, mas emoções também contêm dados valiosos.', xpReward: 50 },
  { challengeId: 'intj_small_talk', mbtiType: 'INTJ', title: 'Conexão Social', description: 'Pratique small talk sem julgar como perda de tempo.', howTo: 'Inicie 1 conversa casual por dia sobre algo não estratégico.', why: 'Nem toda interação precisa ser profunda. Conexões leves também têm valor.', xpReward: 50 },

  // ISFJ
  { challengeId: 'isfj_voice_opinion', mbtiType: 'ISFJ', title: 'Semana da Voz', description: 'Expresse sua opinião mesmo quando não for solicitada.', howTo: 'Em reuniões ou conversas, compartilhe sua perspectiva sem esperar ser chamado.', why: 'ISFJs são discretos, mas suas visões têm muito valor.', xpReward: 50 },
  { challengeId: 'isfj_delegate_control', mbtiType: 'ISFJ', title: 'Soltar o Controle', description: 'Delegue uma tarefa que você normalmente faria "para garantir que fique certa".', howTo: 'Escolha algo importante e confie em outra pessoa para executar.', why: 'Perfeccionismo é cansativo. Confiar nos outros libera você.', xpReward: 50 },
  { challengeId: 'isfj_try_new_thing', mbtiType: 'ISFJ', title: 'Explorar o Novo', description: 'Experimente algo novo que você tem evitado por preferir o familiar.', howTo: 'Identifique algo que te intriga mas te dá medo, e dê um pequeno passo.', why: 'Conforto é bom, mas crescimento está no desconhecido.', xpReward: 50 },

  // INFJ
  { challengeId: 'infj_set_boundaries', mbtiType: 'INFJ', title: 'Semana dos Limites', description: 'Estabeleça limites claros com pessoas que drenam sua energia.', howTo: 'Identifique 1 pessoa ou situação e comunique um limite específico.', why: 'INFJs absorvem emoções alheias. Limites protegem sua paz interior.', xpReward: 50 },
  { challengeId: 'infj_speak_up', mbtiType: 'INFJ', title: 'Falar Alto', description: 'Expresse desconforto ou discordância quando sentir, ao invés de guardar.', howTo: 'Quando algo te incomodar, diga na hora: "Não estou confortável com isso."', why: 'INFJs evitam conflito, mas silenciar gera ressentimento.', xpReward: 50 },
  { challengeId: 'infj_present_moment', mbtiType: 'INFJ', title: 'Presente Total', description: 'Pratique estar totalmente presente ao invés de perdido em pensamentos.', howTo: 'Use os 5 sentidos para ancorar no agora: o que vê, ouve, sente, cheira?', why: 'INFJs vivem no mundo das ideias. Presença traz equilíbrio.', xpReward: 50 },

  // ESTP
  { challengeId: 'estp_plan_ahead', mbtiType: 'ESTP', title: 'Semana do Planejamento', description: 'Planeje suas ações com antecedência ao invés de improvisar.', howTo: 'Todo dia, reserve 10min de manhã para planejar as próximas 24h.', why: 'ESTPs são espontâneos, mas planejamento reduz estresse.', xpReward: 50 },
  { challengeId: 'estp_listen_feelings', mbtiType: 'ESTP', title: 'Ouvir Emoções', description: 'Pratique ouvir sentimentos dos outros sem partir para soluções.', howTo: 'Quando alguém compartilhar emoções, apenas ouça. Não conserte.', why: 'ESTPs são práticos, mas às vezes pessoas só querem ser ouvidas.', xpReward: 50 },
  { challengeId: 'estp_reflect_before_act', mbtiType: 'ESTP', title: 'Pausa Reflexiva', description: 'Antes de agir por impulso, pause 60 segundos para refletir.', howTo: 'Quando sentir vontade de agir rápido, respire 10x antes de decidir.', why: 'Ação rápida é boa, mas reflexão evita arrependimentos.', xpReward: 50 },

  // ENTP
  { challengeId: 'entp_finish_projects', mbtiType: 'ENTP', title: 'Semana da Finalização', description: 'Termine projetos que começou ao invés de iniciar novos.', howTo: 'Escolha 1 projeto inacabado e dedique-se a completá-lo esta semana.', why: 'ENTPs adoram novas ideias, mas conclusão traz realização.', xpReward: 50 },
  { challengeId: 'entp_follow_through', mbtiType: 'ENTP', title: 'Comprometimento Real', description: 'Cumpra compromissos assumidos, mesmo que perca o interesse.', howTo: 'Quando assumir algo, crie um sistema para garantir que vai seguir até o fim.', why: 'Confiabilidade vem de consistência. Seu potencial merece estrutura.', xpReward: 50 },
  { challengeId: 'entp_validate_others', mbtiType: 'ENTP', title: 'Validar sem Debater', description: 'Valide opiniões dos outros sem contra-argumentar imediatamente.', howTo: 'Quando alguém falar, diga: "Faz sentido" ao invés de "Mas...".', why: 'Debate é estimulante, mas validação fortalece conexões.', xpReward: 50 },

  // ESFP
  { challengeId: 'esfp_plan_future', mbtiType: 'ESFP', title: 'Semana do Futuro', description: 'Dedique tempo para planejar objetivos de longo prazo.', howTo: 'Reserve 30min por dia para pensar e anotar metas para 6 meses à frente.', why: 'ESFPs vivem o agora, mas planejamento cria segurança futura.', xpReward: 50 },
  { challengeId: 'esfp_alone_time', mbtiType: 'ESFP', title: 'Tempo Sozinho', description: 'Pratique ficar sozinho sem se sentir entediado ou solitário.', howTo: 'Reserve 1h por dia para atividade solo reflexiva (ex: journaling, caminhada).', why: 'ESFPs são energizados por pessoas, mas solidão traz autoconhecimento.', xpReward: 50 },
  { challengeId: 'esfp_save_money', mbtiType: 'ESFP', title: 'Economia Consciente', description: 'Resista a compras por impulso e poupe conscientemente.', howTo: 'Antes de comprar algo, espere 24h. Se ainda quiser, considere.', why: 'Viver o momento é ótimo, mas segurança financeira traz liberdade.', xpReward: 50 },

  // ENFP
  { challengeId: 'enfp_complete_tasks', mbtiType: 'ENFP', title: 'Semana da Execução', description: 'Foque em completar tarefas ao invés de iniciar novas ideias.', howTo: 'Liste 3 coisas inacabadas e termine-as antes de começar algo novo.', why: 'ENFPs têm mil ideias, mas realização vem de conclusão.', xpReward: 50 },
  { challengeId: 'enfp_routine_discipline', mbtiType: 'ENFP', title: 'Rotina Libertadora', description: 'Crie e siga uma rotina básica por 5 dias consecutivos.', howTo: 'Defina 3 hábitos simples (ex: acordar, exercício, dormir) e cumpra.', why: 'ENFPs evitam rotina, mas estrutura básica potencializa criatividade.', xpReward: 50 },
  { challengeId: 'enfp_realistic_commitments', mbtiType: 'ENFP', title: 'Compromissos Realistas', description: 'Assuma apenas o que você realmente pode cumprir.', howTo: 'Antes de dizer "sim", pergunte: "Tenho TEMPO e ENERGIA para isso?"', why: 'Entusiasmo é lindo, mas supercompromisso gera frustração.', xpReward: 50 },

  // ISTP
  { challengeId: 'istp_express_feelings', mbtiType: 'ISTP', title: 'Semana da Expressão', description: 'Verbalize seus sentimentos ao invés de apenas processá-los internamente.', howTo: 'Todo dia, diga a alguém como você está se sentindo de verdade.', why: 'ISTPs são reservados, mas compartilhar fortalece conexões.', xpReward: 50 },
  { challengeId: 'istp_commit_plans', mbtiType: 'ISTP', title: 'Comprometimento Social', description: 'Faça e mantenha planos sociais sem cancelar de última hora.', howTo: 'Quando fizer um plano, honre-o mesmo se surgir algo "melhor".', why: 'Flexibilidade é boa, mas confiabilidade constrói relacionamentos sólidos.', xpReward: 50 },
  { challengeId: 'istp_ask_for_help', mbtiType: 'ISTP', title: 'Pedir Ajuda', description: 'Peça ajuda quando precisar ao invés de resolver tudo sozinho.', howTo: 'Identifique 1 coisa que você está travado e peça apoio de alguém.', why: 'Independência é força, mas colaboração é sabedoria.', xpReward: 50 },

  // INTP
  { challengeId: 'intp_social_engagement', mbtiType: 'INTP', title: 'Semana Social', description: 'Inicie conversas e interações sociais proativamente.', howTo: 'Todo dia, inicie 1 conversa com alguém (online ou presencial).', why: 'INTPs são introspectivos, mas conexões humanas enriquecem a vida.', xpReward: 50 },
  { challengeId: 'intp_action_over_analysis', mbtiType: 'INTP', title: 'Ação Imperfeita', description: 'Aja mesmo sem ter todas as informações ou análise completa.', howTo: 'Escolha algo que você está "estudando" há meses e FAÇA hoje.', why: 'Análise é valiosa, mas ação imperfeita supera inação perfeita.', xpReward: 50 },
  { challengeId: 'intp_follow_through', mbtiType: 'INTP', title: 'Conclusão de Projetos', description: 'Termine um projeto que você abandonou por "perder interesse".', howTo: 'Liste projetos 80% completos e finalize 1 deles esta semana.', why: 'INTPs adoram explorar, mas finalizar gera satisfação real.', xpReward: 50 },

  // ISFP
  { challengeId: 'isfp_share_creations', mbtiType: 'ISFP', title: 'Semana da Visibilidade', description: 'Compartilhe suas criações e ideias ao invés de guardá-las.', howTo: 'Todo dia, mostre algo que você criou (arte, ideia, projeto) para alguém.', why: 'ISFPs criam beleza, mas o mundo merece ver. Compartilhar é generosidade.', xpReward: 50 },
  { challengeId: 'isfp_speak_up', mbtiType: 'ISFP', title: 'Expressar Opinião', description: 'Verbalize suas opiniões e necessidades claramente.', howTo: 'Quando discordar ou precisar de algo, diga diretamente ao invés de esperar.', why: 'ISFPs evitam conflito, mas sua voz importa. Assertividade é respeito próprio.', xpReward: 50 },
  { challengeId: 'isfp_plan_future', mbtiType: 'ISFP', title: 'Planejamento Criativo', description: 'Dedique tempo para planejar o futuro ao invés de só fluir.', howTo: 'Reserve 20min por dia para definir metas e passos para alcançá-las.', why: 'Viver o presente é lindo, mas planejamento cria liberdade futura.', xpReward: 50 },

  // INFP
  { challengeId: 'infp_share_work', mbtiType: 'INFP', title: 'Semana da Coragem', description: 'Compartilhe seu trabalho criativo mesmo sem estar "perfeito".', howTo: 'Escolha algo que você criou e compartilhe, mesmo com imperfeições.', why: 'INFPs são perfeccionistas criativos, mas compartilhar é crescimento.', xpReward: 50 },
  { challengeId: 'infp_set_boundaries', mbtiType: 'INFP', title: 'Limites Saudáveis', description: 'Estabeleça e comunique limites claros com os outros.', howTo: 'Identifique 1 situação que drena você e comunique um limite específico.', why: 'INFPs são empáticos, mas limites protegem sua essência.', xpReward: 50 },
  { challengeId: 'infp_practical_action', mbtiType: 'INFP', title: 'Ação Prática', description: 'Execute tarefas práticas necessárias mesmo sem inspiração.', howTo: 'Liste 3 tarefas "chatas" que você adia e complete-as esta semana.', why: 'Idealismo é lindo, mas realização também exige praticidade.', xpReward: 50 },
];

async function seedChallenges() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'pathfinder',
  });

  try {
    console.log('🔄 Conectando ao banco de dados...');
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    console.log(`📊 Processando ${CHALLENGE_TEMPLATES_SEED.length} challenge templates...\n`);

    let created = 0;
    let updated = 0;

    for (const template of CHALLENGE_TEMPLATES_SEED) {
      const existing = await client.query(
        'SELECT id FROM challenge_templates WHERE challenge_id = $1',
        [template.challengeId]
      );

      if (existing.rows.length > 0) {
        await client.query(
          `UPDATE challenge_templates SET
           mbti_type = $1, title = $2, description = $3, how_to = $4, why = $5, xp_reward = $6
           WHERE challenge_id = $7`,
          [template.mbtiType, template.title, template.description, template.howTo, template.why, template.xpReward, template.challengeId]
        );
        updated++;
      } else {
        await client.query(
          `INSERT INTO challenge_templates (challenge_id, mbti_type, title, description, how_to, why, xp_reward)
           VALUES ($1, $2, $3, $4, $5, $6, $7)`,
          [template.challengeId, template.mbtiType, template.title, template.description, template.howTo, template.why, template.xpReward]
        );
        created++;
      }
    }

    console.log('✅ Challenge templates seeding completado!');
    console.log(`   - Criados: ${created}`);
    console.log(`   - Atualizados: ${updated}`);
    console.log(`   - Total: ${created + updated}\n`);

    await client.end();
  } catch (error) {
    console.error('❌ Erro ao popular challenges:', error);
    process.exit(1);
  }
}

seedChallenges();
ENDOFFILE

node /tmp/seed-challenges.js

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Challenges populados com sucesso!${NC}"
    echo ""
else
    echo -e "${RED}❌ Erro ao popular challenges${NC}"
    exit 1
fi

# ============================================
# PASSO 4: Seed Journal Prompts
# ============================================
echo -e "${BLUE}📝 Populando journal prompts...${NC}"

cat > /tmp/seed-prompts.js << 'ENDOFFILE'
const { Client } = require('pg');

const JOURNAL_PROMPTS_SEED = [
  // Prompts universais
  { mbtiType: null, prompt: 'O que você aprendeu sobre si mesmo hoje?', category: 'reflection' },
  { mbtiType: null, prompt: 'Pelo que você é grato neste momento?', category: 'gratitude' },
  { mbtiType: null, prompt: 'Que desafio você enfrentou hoje? Como lidou com ele?', category: 'growth' },
  { mbtiType: null, prompt: 'Descreva um momento em que você se sentiu verdadeiramente presente.', category: 'mindfulness' },
  { mbtiType: null, prompt: 'O que você precisa deixar ir para seguir em frente?', category: 'release' },

  // ESTJ
  { mbtiType: 'ESTJ', prompt: 'Hoje você permitiu que algo saísse do plano? Como se sentiu?', category: 'flexibility' },
  { mbtiType: 'ESTJ', prompt: 'Você ouviu alguém sem interromper? O que descobriu?', category: 'listening' },
  { mbtiType: 'ESTJ', prompt: 'Que tarefa você delegou hoje ao invés de fazer sozinho?', category: 'delegation' },
  { mbtiType: 'ESTJ', prompt: 'Como você equilibrou eficiência com empatia hoje?', category: 'balance' },

  // ENTJ
  { mbtiType: 'ENTJ', prompt: 'Você validou os sentimentos de alguém antes de oferecer uma solução?', category: 'empathy' },
  { mbtiType: 'ENTJ', prompt: 'Que pequena vitória você celebrou hoje?', category: 'celebration' },
  { mbtiType: 'ENTJ', prompt: 'Você descansou sem culpa? Como foi?', category: 'rest' },
  { mbtiType: 'ENTJ', prompt: 'Como você demonstrou liderança através de vulnerabilidade hoje?', category: 'leadership' },

  // ESFJ
  { mbtiType: 'ESFJ', prompt: 'Você disse "não" a algo hoje? Como se sentiu?', category: 'boundaries' },
  { mbtiType: 'ESFJ', prompt: 'O que você fez só para você hoje?', category: 'self-care' },
  { mbtiType: 'ESFJ', prompt: 'Você aceitou "bom o suficiente" ao invés de perfeito? Onde?', category: 'perfectionism' },
  { mbtiType: 'ESFJ', prompt: 'Como você cuidou de si antes de cuidar dos outros?', category: 'self-first' },

  // ENFJ
  { mbtiType: 'ENFJ', prompt: 'Que limite você estabeleceu hoje?', category: 'boundaries' },
  { mbtiType: 'ENFJ', prompt: 'Você pediu ajuda a alguém? Como foi?', category: 'receiving' },
  { mbtiType: 'ENFJ', prompt: 'Você resistiu ao impulso de "salvar" alguém? Conte sobre isso.', category: 'allowing' },
  { mbtiType: 'ENFJ', prompt: 'Como você priorizou sua energia hoje?', category: 'energy' },

  // ISTJ
  { mbtiType: 'ISTJ', prompt: 'Que nova abordagem você tentou hoje?', category: 'experimentation' },
  { mbtiType: 'ISTJ', prompt: 'Você expressou gratidão verbalmente? Para quem?', category: 'appreciation' },
  { mbtiType: 'ISTJ', prompt: 'Descreva um momento espontâneo que você permitiu acontecer.', category: 'spontaneity' },
  { mbtiType: 'ISTJ', prompt: 'Como você equilibrou tradição com inovação hoje?', category: 'balance' },

  // INTJ
  { mbtiType: 'INTJ', prompt: 'Você compartilhou seu processo de pensamento com alguém?', category: 'transparency' },
  { mbtiType: 'INTJ', prompt: 'Que emoção você reconheceu como informação válida hoje?', category: 'emotions' },
  { mbtiType: 'INTJ', prompt: 'Você teve uma conversa casual sem julgar? Sobre o quê?', category: 'connection' },
  { mbtiType: 'INTJ', prompt: 'Como você usou lógica E empatia para resolver algo hoje?', category: 'integration' },

  // ISFJ
  { mbtiType: 'ISFJ', prompt: 'Você expressou sua opinião sem ser solicitado? Onde?', category: 'voice' },
  { mbtiType: 'ISFJ', prompt: 'Que controle você soltou hoje ao delegar algo?', category: 'trust' },
  { mbtiType: 'ISFJ', prompt: 'Você tentou algo novo fora da sua zona de conforto?', category: 'exploration' },
  { mbtiType: 'ISFJ', prompt: 'Como você honrou suas próprias necessidades hoje?', category: 'self-honor' },

  // INFJ
  { mbtiType: 'INFJ', prompt: 'Que limite você comunicou claramente hoje?', category: 'boundaries' },
  { mbtiType: 'INFJ', prompt: 'Você expressou desconforto ao invés de guardar? Como?', category: 'honesty' },
  { mbtiType: 'INFJ', prompt: 'Descreva um momento em que você esteve totalmente presente.', category: 'presence' },
  { mbtiType: 'INFJ', prompt: 'Como você protegeu sua paz interior hoje?', category: 'protection' },

  // ESTP
  { mbtiType: 'ESTP', prompt: 'Você planejou suas ações com antecedência? Como foi?', category: 'planning' },
  { mbtiType: 'ESTP', prompt: 'Você ouviu emoções de alguém sem tentar resolver? Conte.', category: 'listening' },
  { mbtiType: 'ESTP', prompt: 'Descreva uma vez que você pausou antes de agir.', category: 'reflection' },
  { mbtiType: 'ESTP', prompt: 'Como você equilibrou ação com reflexão hoje?', category: 'balance' },

  // ENTP
  { mbtiType: 'ENTP', prompt: 'Você finalizou algo ao invés de começar algo novo?', category: 'completion' },
  { mbtiType: 'ENTP', prompt: 'Que compromisso você honrou mesmo sem interesse? Por quê?', category: 'follow-through' },
  { mbtiType: 'ENTP', prompt: 'Você validou a opinião de alguém sem debater? Como foi?', category: 'validation' },
  { mbtiType: 'ENTP', prompt: 'Como você transformou uma ideia em ação concreta hoje?', category: 'execution' },

  // ESFP
  { mbtiType: 'ESFP', prompt: 'Você planejou algo para o futuro? O quê?', category: 'planning' },
  { mbtiType: 'ESFP', prompt: 'Como foi passar tempo sozinho hoje?', category: 'solitude' },
  { mbtiType: 'ESFP', prompt: 'Você resistiu a uma compra por impulso? Conte.', category: 'discipline' },
  { mbtiType: 'ESFP', prompt: 'Como você equilibrou diversão com responsabilidade hoje?', category: 'balance' },

  // ENFP
  { mbtiType: 'ENFP', prompt: 'Você completou algo antes de começar algo novo?', category: 'completion' },
  { mbtiType: 'ENFP', prompt: 'Como foi seguir uma rotina hoje?', category: 'discipline' },
  { mbtiType: 'ENFP', prompt: 'Você fez apenas compromissos realistas? Quais?', category: 'realistic' },
  { mbtiType: 'ENFP', prompt: 'Como você focou sua energia criativa hoje?', category: 'focus' },

  // ISTP
  { mbtiType: 'ISTP', prompt: 'Você verbalizou seus sentimentos para alguém?', category: 'expression' },
  { mbtiType: 'ISTP', prompt: 'Você manteve um plano social sem cancelar? Como foi?', category: 'commitment' },
  { mbtiType: 'ISTP', prompt: 'Você pediu ajuda ao invés de resolver sozinho? Conte.', category: 'collaboration' },
  { mbtiType: 'ISTP', prompt: 'Como você equilibrou independência com conexão hoje?', category: 'balance' },

  // INTP
  { mbtiType: 'INTP', prompt: 'Você iniciou uma conversa social? Como foi?', category: 'social' },
  { mbtiType: 'INTP', prompt: 'Você agiu sem ter todas as informações? Conte.', category: 'action' },
  { mbtiType: 'INTP', prompt: 'Que projeto você finalizou ao invés de abandonar?', category: 'completion' },
  { mbtiType: 'INTP', prompt: 'Como você transformou análise em ação hoje?', category: 'execution' },

  // ISFP
  { mbtiType: 'ISFP', prompt: 'Você compartilhou algo que criou? Como foi?', category: 'sharing' },
  { mbtiType: 'ISFP', prompt: 'Você expressou uma opinião claramente? Onde?', category: 'voice' },
  { mbtiType: 'ISFP', prompt: 'Como foi planejar o futuro hoje?', category: 'planning' },
  { mbtiType: 'ISFP', prompt: 'Como você honrou sua autenticidade hoje?', category: 'authenticity' },

  // INFP
  { mbtiType: 'INFP', prompt: 'Você compartilhou algo imperfeito? Como se sentiu?', category: 'courage' },
  { mbtiType: 'INFP', prompt: 'Que limite você estabeleceu hoje?', category: 'boundaries' },
  { mbtiType: 'INFP', prompt: 'Você completou uma tarefa prática sem inspiração? Qual?', category: 'practicality' },
  { mbtiType: 'INFP', prompt: 'Como você equilibrou idealismo com ação prática hoje?', category: 'balance' },
];

async function seedPrompts() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'pathfinder',
  });

  try {
    console.log('🔄 Conectando ao banco de dados...');
    await client.connect();
    console.log('✅ Conectado ao banco de dados\n');

    console.log(`📊 Processando ${JOURNAL_PROMPTS_SEED.length} journal prompts...\n`);

    console.log('🗑️  Limpando prompts existentes...');
    await client.query('DELETE FROM journal_prompts');

    let created = 0;
    for (const prompt of JOURNAL_PROMPTS_SEED) {
      await client.query(
        `INSERT INTO journal_prompts (mbti_type, prompt, category)
         VALUES ($1, $2, $3)`,
        [prompt.mbtiType, prompt.prompt, prompt.category]
      );
      created++;
    }

    console.log('✅ Journal prompts seeding completado!');
    console.log(`   - Criados: ${created}`);
    console.log(`   - Total: ${created}\n`);

    await client.end();
  } catch (error) {
    console.error('❌ Erro ao popular prompts:', error);
    process.exit(1);
  }
}

seedPrompts();
ENDOFFILE

node /tmp/seed-prompts.js

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Prompts populados com sucesso!${NC}"
    echo ""
else
    echo -e "${RED}❌ Erro ao popular prompts${NC}"
    exit 1
fi

# ============================================
# VERIFICAÇÃO FINAL
# ============================================
echo -e "${BLUE}🔍 Verificando instalação...${NC}"

cat > /tmp/verify.js << 'ENDOFFILE'
const { Client } = require('pg');

async function verify() {
  const client = new Client({
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    user: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'pathfinder',
  });

  try {
    await client.connect();

    const challenges = await client.query('SELECT COUNT(*) FROM challenge_templates');
    const prompts = await client.query('SELECT COUNT(*) FROM journal_prompts');

    console.log('\n📊 Verificação Final:');
    console.log(`   - Challenge Templates: ${challenges.rows[0].count}`);
    console.log(`   - Journal Prompts: ${prompts.rows[0].count}`);
    console.log('');

    await client.end();
  } catch (error) {
    console.error('❌ Erro na verificação:', error);
  }
}

verify();
ENDOFFILE

node /tmp/verify.js

# Limpar arquivos temporários
rm -f /tmp/run-sprint7-migration.js /tmp/seed-challenges.js /tmp/seed-prompts.js /tmp/verify.js

echo -e "${GREEN}✅✅✅ DEPLOYMENT DO SPRINT 7 CONCLUÍDO COM SUCESSO! ✅✅✅${NC}"
echo ""
echo -e "${BLUE}🎯 Próximos passos:${NC}"
echo "   1. Testar os endpoints de challenges"
echo "   2. Testar os endpoints de journal"
echo "   3. Verificar integração com gamificação (XP)"
echo ""
