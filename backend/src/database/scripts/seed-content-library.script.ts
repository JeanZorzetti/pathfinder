import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { ContentLibrary } from '../../modules/content-library/entities/content-library.entity';
import { CONTENT_LIBRARY_SEED } from '../seeds/content-library.seed';

async function seed() {
  const configService = new ConfigService();

  const dataSource = new DataSource({
    type: 'postgres',
    host: configService.get('DATABASE_HOST') || 'localhost',
    port: parseInt(configService.get('DATABASE_PORT') || '5432'),
    username: configService.get('DATABASE_USER') || 'postgres',
    password: configService.get('DATABASE_PASSWORD') || 'postgres',
    database: configService.get('DATABASE_NAME') || 'pathfinder',
    entities: [ContentLibrary],
    synchronize: false,
    ssl: configService.get('DATABASE_SSL') === 'true'
      ? { rejectUnauthorized: false }
      : false,
  });

  await dataSource.initialize();
  console.log('✅ Conexão com banco estabelecida');

  const contentRepository = dataSource.getRepository(ContentLibrary);

  try {
    // Check if content already exists
    const existingCount = await contentRepository.count();
    if (existingCount > 0) {
      console.log(`⚠️  ${existingCount} conteúdos já existem. Pulando seed...`);
      await dataSource.destroy();
      return;
    }

    // Insert content library items
    for (const item of CONTENT_LIBRARY_SEED) {
      await contentRepository.save(item);
    }

    console.log(`✅ ${CONTENT_LIBRARY_SEED.length} itens de conteúdo inseridos com sucesso!`);
  } catch (error) {
    console.error('❌ Erro ao popular content_library:', error);
    throw error;
  } finally {
    await dataSource.destroy();
  }
}

seed()
  .then(() => {
    console.log('✅ Seed de content library concluído');
    process.exit(0);
  })
  .catch((error) => {
    console.error('❌ Erro no seed:', error);
    process.exit(1);
  });
