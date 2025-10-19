import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateContentAndComparison1760825000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Criar ENUM para content type
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE content_type_enum AS ENUM ('article', 'video', 'book', 'exercise', 'podcast');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // 2. Criar ENUM para difficulty
    await queryRunner.query(`
      DO $$ BEGIN
        CREATE TYPE difficulty_enum AS ENUM ('beginner', 'intermediate', 'advanced');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);

    // 3. Criar tabela content_library
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS content_library (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        content_id VARCHAR(100) UNIQUE NOT NULL,
        title VARCHAR(200) NOT NULL,
        type content_type_enum NOT NULL DEFAULT 'article',
        url VARCHAR(500) NOT NULL,
        description TEXT NOT NULL,
        duration_minutes INTEGER,
        xp_reward INTEGER DEFAULT 5,
        mbti_types JSONB DEFAULT '[]'::jsonb,
        categories JSONB DEFAULT '[]'::jsonb,
        difficulty difficulty_enum DEFAULT 'beginner',
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Criar índices para content_library
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_content_library_content_id ON content_library(content_id);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_content_library_type ON content_library(type);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_content_library_difficulty ON content_library(difficulty);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_content_library_mbti_types ON content_library USING GIN(mbti_types);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_content_library_categories ON content_library USING GIN(categories);`);

    // 4. Criar tabela comparison_codes
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS comparison_codes (
        user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        code VARCHAR(20) UNIQUE NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Criar índice para comparison_codes
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_comparison_codes_code ON comparison_codes(code);`);

    // 5. Criar tabela comparison_history
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS comparison_history (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        compared_with_user_id UUID REFERENCES users(id) ON DELETE SET NULL,
        compatibility_score INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );
    `);

    // Criar índices para comparison_history
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_comparison_history_user ON comparison_history(user_id);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_comparison_history_compared_with ON comparison_history(compared_with_user_id);`);
    await queryRunner.query(`CREATE INDEX IF NOT EXISTS idx_comparison_history_created_at ON comparison_history(created_at DESC);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover tabelas
    await queryRunner.query(`DROP TABLE IF EXISTS comparison_history;`);
    await queryRunner.query(`DROP TABLE IF EXISTS comparison_codes;`);
    await queryRunner.query(`DROP TABLE IF EXISTS content_library;`);

    // Remover ENUMs
    await queryRunner.query(`DROP TYPE IF EXISTS difficulty_enum;`);
    await queryRunner.query(`DROP TYPE IF EXISTS content_type_enum;`);
  }
}
