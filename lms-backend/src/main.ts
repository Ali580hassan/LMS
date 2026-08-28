import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import compression = require('compression');
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(compression());
  app.setGlobalPrefix('api');
  app.setGlobalPrefix('api', {
    exclude: ['uploads/(.*)'], // uploads folder ko prefix se bahar rakho
  });
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.enableCors({
    origin: [
      'http://localhost:5173', // local development
      ...(process.env.ORIGIN ? [process.env.ORIGIN] : []),
    ],
    // frontend ka exact origin
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
