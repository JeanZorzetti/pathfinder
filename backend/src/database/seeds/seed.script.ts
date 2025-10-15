import { NestFactory } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SeedModule } from './seed.module';
import { SeedService } from './seed.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USER'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
        synchronize: true,
        logging: false,
      }),
    }),
    SeedModule,
  ],
})
class SeedApplicationModule {}

async function bootstrap() {
  const app = await NestFactory.create(SeedApplicationModule);
  const seedService = app.get(SeedService);

  try {
    await seedService.seedAll();
    console.log('\n🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ Seeding failed:', error);
    process.exit(1);
  }
}

bootstrap();
