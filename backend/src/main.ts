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

  // Security Headers - Helmet with enhanced configuration
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
      crossOriginEmbedderPolicy: false, // Allow embedding for Swagger
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
      },
    }),
  );

  // Permissions-Policy header (Feature-Policy replacement)
  app.use((req, res, next) => {
    res.setHeader(
      'Permissions-Policy',
      'geolocation=(), microphone=(), camera=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()',
    );
    next();
  });

  // Compression for responses
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
    exposedHeaders: ['X-RateLimit-Limit', 'X-RateLimit-Remaining', 'X-RateLimit-Reset'],
    maxAge: 3600, // Cache preflight requests for 1 hour
  });

  // Global prefix and versioning
  const apiPrefix = configService.get<string>('API_PREFIX', 'api/v1');
  app.setGlobalPrefix(apiPrefix);

  app.enableVersioning({
    type: VersioningType.URI,
  });

  // Global validation pipe with strict security
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: true, // Retornar erro se houver propriedades extras
      transform: true, // Transformar tipos automaticamente
      transformOptions: {
        enableImplicitConversion: true,
      },
      disableErrorMessages: configService.get('NODE_ENV') === 'production', // Ocultar mensagens detalhadas em produção
    }),
  );

  // Swagger API Documentation
  const config = new DocumentBuilder()
    .setTitle('Pathfinder API')
    .setDescription('Backend API for Pathfinder - Self-Discovery Platform with MBTI, Big Five, and Enneagram tests')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('auth', 'Authentication endpoints')
    .addTag('personality-tests', 'Personality test endpoints')
    .addTag('content', 'Content and SEO endpoints')
    .addTag('users', 'User management endpoints')
    .addTag('health', 'Health check and monitoring endpoints')
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
║   🛡️  Security: Helmet + Rate Limiting enabled       ║
║                                                       ║
║   📡 Server:  http://localhost:${port}                   ║
║   📚 Docs:    http://localhost:${port}/api/docs          ║
║   🌍 ENV:     ${configService.get('NODE_ENV')}                    ║
║                                                       ║
╚═══════════════════════════════════════════════════════╝
  `);
}

bootstrap();
