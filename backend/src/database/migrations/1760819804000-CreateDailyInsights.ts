import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDailyInsights1760819804000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create daily_insights table
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS daily_insights (
                id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                personality_type VARCHAR(4) NOT NULL,
                insight_text TEXT NOT NULL,
                category VARCHAR(50) NOT NULL,
                action_item TEXT,
                deep_dive_link VARCHAR(500),
                day_of_year INTEGER CHECK (day_of_year >= 1 AND day_of_year <= 365),
                created_at TIMESTAMP DEFAULT NOW(),
                updated_at TIMESTAMP DEFAULT NOW()
            );
        `);

        // Create indexes for better query performance
        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS idx_daily_insights_personality_type
            ON daily_insights(personality_type);
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS idx_daily_insights_day_of_year
            ON daily_insights(day_of_year);
        `);

        await queryRunner.query(`
            CREATE INDEX IF NOT EXISTS idx_daily_insights_category
            ON daily_insights(category);
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX IF EXISTS idx_daily_insights_category;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_daily_insights_day_of_year;`);
        await queryRunner.query(`DROP INDEX IF EXISTS idx_daily_insights_personality_type;`);

        // Drop table
        await queryRunner.query(`DROP TABLE IF EXISTS daily_insights;`);
    }

}
