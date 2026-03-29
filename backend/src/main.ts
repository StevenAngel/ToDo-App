import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Zur Daten validierung (eingestellt in den dtos)
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors({
    origin: 'http://localhost:8080'
  });
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
