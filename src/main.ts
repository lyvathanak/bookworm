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
  await seeder.seedAdmin(); // This ensures the admin account is created if it doesn't exist
  // You can also run the full seed here if you want to reset all data on every start.
  // Be careful with this in production.
  // await seeder.seed(); 
  // ----------------------------------------

  app.enableCors();

  // This serves files from the 'storage' folder in your project root
  app.useStaticAssets(join(__dirname, '..', 'storage'));

  // This enables automatic validation and data type transformation
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    transform: true 
  }));

  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
