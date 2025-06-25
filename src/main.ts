import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // --- ADDED: Run the seeder on startup ---
  const seeder = app.get(SeederService);
  await seeder.seedAdmin();
  // ----------------------------------------

  // --- CORS Configuration ---
  const allowedOrigins = [
    'https://bookworm-shop.onrender.com',   // User frontend
    'https://bookworm-1-zjwe.onrender.com', // Admin frontend
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  // ---------------------------------------------------------

  app.useStaticAssets(join(__dirname, '..', 'storage'));

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));

  // This is the correct way to listen on all interfaces for Render
  await app.listen(5000, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();