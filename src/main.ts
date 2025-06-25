import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { SeederService } from './seeder/seeder.service';

async function bootstrap() {
  console.log('Starting application bootstrap...');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  console.log('NestExpressApplication created.');

  // --- Seeder ---
  try {
    console.log('Attempting to run seeder...');
    const seeder = app.get(SeederService);
    await seeder.seedAdmin();
    console.log('Seeder finished successfully.');
  } catch (error) {
    console.error('Seeder failed:', error);
    // Depending on your needs, you might want to exit if the seeder fails
    // process.exit(1);
  }

  // --- CORS Configuration ---
  const allowedOrigins = [
    'https://bookworm-shop.onrender.com',
    'https://bookworm-1-zjwe.onrender.com',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.warn(`CORS: Blocked origin - ${origin}`);
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  console.log('CORS configured.');

  app.useStaticAssets(join(__dirname, '..', 'storage'));
  console.log('Static assets configured.');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true
  }));
  console.log('Global pipes configured.');

  const PORT = process.env.PORT || 5000;
  await app.listen(PORT, '0.0.0.0');

  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap().catch(err => {
  console.error('Error during bootstrap:', err);
  process.exit(1);
});