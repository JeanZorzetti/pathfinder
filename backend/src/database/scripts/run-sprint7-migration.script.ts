import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../../../.env') });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'pathfinder',
  synchronize: false,
});

async function runSprint7Migration() {
  try {
    console.log('🔄 Conectando ao banco de dados...');
    await AppDataSource.initialize();
    console.log('✅ Conectado ao banco de dados\n');

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();

    console.log('📊 Executando migration do Sprint 7: Challenges & Journal\n');

    // 1. Criar tabela challenge_templates
    console.log('1️⃣ Criando tabela challenge_templates...');
    await queryRunner.query(`
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
    console.log('   ✅ Tabela challenge_templates criada');

    // Criar índices
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_challenge_templates_mbti ON challenge_templates(mbti_type);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_challenge_templates_challenge_id ON challenge_templates(challenge_id);`);
    console.log('   ✅ Índices criados\n');

    // 2. Criar tabela user_challenges
    console.log('2️⃣ Criando tabela user_challenges...');
    await queryRunner.query(`
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
    console.log('   ✅ Tabela user_challenges criada');

    // Criar índices
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_user_challenges_user ON user_challenges(user_id);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_user_challenges_week ON user_challenges(week_start_date);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_user_challenges_completed ON user_challenges(completed);`);
    console.log('   ✅ Índices criados\n');

    // 3. Criar tabela journal_prompts
    console.log('3️⃣ Criando tabela journal_prompts...');
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS journal_prompts (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        mbti_type VARCHAR(4),
        prompt TEXT NOT NULL,
        category VARCHAR(50) NOT NULL,
        day_of_year INTEGER,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('   ✅ Tabela journal_prompts criada');

    // Criar índices
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_journal_prompts_mbti ON journal_prompts(mbti_type);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_journal_prompts_category ON journal_prompts(category);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_journal_prompts_day ON journal_prompts(day_of_year);`);
    console.log('   ✅ Índices criados\n');

    // 4. Atualizar tabela journal_entries (adicionar campos novos)
    console.log('4️⃣ Atualizando tabela journal_entries...');

    // Verificar se a coluna prompt_used já existe
    const promptUsedExists = await queryRunner.query(`
      SELECT column_name
      FROM information_schema.columns
      WHERE table_name='journal_entries' AND column_name='prompt_used';
    `);

    if (promptUsedExists.length === 0) {
      await queryRunner.query(`
        ALTER TABLE journal_entries
        ADD COLUMN IF NOT EXISTS prompt_used VARCHAR(500);
      `);
      console.log('   ✅ Coluna prompt_used adicionada');
    } else {
      console.log('   ⏭️  Coluna prompt_used já existe');
    }

    // Verificar se tags precisa ser convertido para JSONB
    const tagsColumn = await queryRunner.query(`
      SELECT data_type
      FROM information_schema.columns
      WHERE table_name='journal_entries' AND column_name='tags';
    `);

    if (tagsColumn.length > 0 && tagsColumn[0].data_type !== 'jsonb') {
      console.log('   🔄 Convertendo coluna tags para JSONB...');
      await queryRunner.query(`
        ALTER TABLE journal_entries
        ALTER COLUMN tags TYPE JSONB USING
        CASE
          WHEN tags IS NULL THEN '[]'::jsonb
          ELSE to_jsonb(string_to_array(tags, ','))
        END;
      `);
      console.log('   ✅ Coluna tags convertida para JSONB');
    } else if (tagsColumn.length === 0) {
      await queryRunner.query(`
        ALTER TABLE journal_entries
        ADD COLUMN IF NOT EXISTS tags JSONB DEFAULT '[]'::jsonb;
      `);
      console.log('   ✅ Coluna tags criada como JSONB');
    } else {
      console.log('   ⏭️  Coluna tags já é JSONB');
    }

    console.log('   ✅ Tabela journal_entries atualizada\n');

    await queryRunner.release();

    console.log('✅ Migration do Sprint 7 concluída com sucesso!\n');
    console.log('📋 Resumo:');
    console.log('   - challenge_templates: ✅ Criada');
    console.log('   - user_challenges: ✅ Criada');
    console.log('   - journal_prompts: ✅ Criada');
    console.log('   - journal_entries: ✅ Atualizada\n');
    console.log('🎯 Próximo passo: Rodar os seeds!');
    console.log('   1. npm run seed:challenges');
    console.log('   2. npm run seed:prompts\n');

    await AppDataSource.destroy();
  } catch (error) {
    console.error('❌ Erro ao executar migration:', error);
    process.exit(1);
  }
}

runSprint7Migration();
