import { NestFactory } from '@nestjs/core';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  // Security
  app.use(helmet());
  app.use(compression());

  // CORS Configuration - Allow Vercel frontend
  const frontendUrl = configService.get<string>('FRONTEND_URL');
  const vercelUrl = configService.get<string>('VERCEL_FRONTEND_URL');

  const allowedOrigins = [frontendUrl, vercelUrl].filter((url): url is string => Boolean(url));

  app.enableCors({
    origin: allowedOrigins.length > 0 ? allowedOrigins : '*',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

  // Global prefix and versioning
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');
  app.setGlobalPrefix(apiPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Pathfinder API')
    .setDescription('Backend API for Pathfinder - Self-Discovery Platform')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('personality-tests', 'Personality test endpoints')
    .addTag('content', 'Content and SEO endpoints')
    .addTag('users', 'User management endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Start server
  const port = configService.get<number>('PORT', 3001);
  await app.listen(port);

  console.log(`
╔═══════════════════════════════════════════════════════╗
║                                                       ║
║   🚀 Pathfinder Backend API is running!              ║
║                                                       ║
║   📡 Server:  http://localhost:${port}                   ║
║   📚 Docs:    http://localhost:${port}/api/docs          ║
║   🌍 ENV:     ${configService.get('NODE_ENV')}                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
}

bootstrap();
