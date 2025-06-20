import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // THIS IS THE CRITICAL FIX
  // By enabling CORS without specific options, we tell the backend
  // to be more permissive during development, which will allow
  // requests from your Vue.js development server.
  app.enableCors();

  // Use global pipes for input validation
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
