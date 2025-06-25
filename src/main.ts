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

  // --- THIS IS THE FIX: Allow both of your frontend URLs ---
  const allowedOrigins = [
    'https://bookworm-shop.onrender.com',   //user frontend
    'https://bookworm-1-zjwe.onrender.com', //Admin frontend
  ];

  app.enableCors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
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

  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
