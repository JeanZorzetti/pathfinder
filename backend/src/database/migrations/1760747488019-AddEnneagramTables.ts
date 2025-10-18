import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEnneagramTables1760747488019 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Adicionar framework do Eneagrama
        await queryRunner.query(`
            INSERT INTO test_frameworks (id, name, description, question_count, is_active)
            VALUES (
                'enneagram',
                'Eneagrama',
                'Sistema de 9 tipos de personalidade baseado em motivações centrais, medos e desejos',
                50,
                true
            )
            ON CONFLICT (id) DO NOTHING;
        `);

        // 2. Criar tabela de tipos do Eneagrama
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS enneagram_types (
                id VARCHAR(10) PRIMARY KEY,
                number INTEGER NOT NULL UNIQUE CHECK (number >= 1 AND number <= 9),
                name VARCHAR(100) NOT NULL,
                name_en VARCHAR(100),
                nickname VARCHAR(100),
                core_fear TEXT NOT NULL,
                core_desire TEXT NOT NULL,
                key_motivation TEXT NOT NULL,
                at_best TEXT,
                at_worst TEXT,
                basic_proposition TEXT,
                triad VARCHAR(20),
                wing_options JSON,
                growth_direction INTEGER,
                stress_direction INTEGER,
                strengths JSON,
                weaknesses JSON,
                workplace_behavior TEXT,
                relationships TEXT,
                famous_examples JSON,
                growth_path JSON,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS idx_enneagram_types_number ON enneagram_types(number);
        `);

        // 3. Criar tabela de questões do Eneagrama
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS enneagram_questions (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                question_number INTEGER NOT NULL,
                question_text TEXT NOT NULL,
                scoring_type VARCHAR(20) NOT NULL,
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // 4. Criar tabela de mapeamento questão → tipos
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS enneagram_question_type_mapping (
                id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
                question_id UUID REFERENCES enneagram_questions(id) ON DELETE CASCADE,
                enneagram_type_id VARCHAR(10) REFERENCES enneagram_types(id),
                score_weight INTEGER DEFAULT 1 CHECK (score_weight >= -3 AND score_weight <= 3),
                created_at TIMESTAMP DEFAULT NOW()
            );
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS idx_enneagram_mapping_question ON enneagram_question_type_mapping(question_id);
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS idx_enneagram_mapping_type ON enneagram_question_type_mapping(enneagram_type_id);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE IF EXISTS enneagram_question_type_mapping;`);
        await queryRunner.query(`DROP TABLE IF EXISTS enneagram_questions;`);
        await queryRunner.query(`DROP TABLE IF EXISTS enneagram_types;`);
        await queryRunner.query(`DELETE FROM test_frameworks WHERE id = 'enneagram';`);
    }

}
