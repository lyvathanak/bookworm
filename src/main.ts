import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express'; // Import this
import { join } from 'path'; // Import join from path

async function bootstrap() {
  // Specify NestExpressApplication for access to express-specific methods
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors();

  // This line tells NestJS to serve static files from the 'storage' directory
  // For example, a file at 'storage/avatars/user1.jpg' will be accessible at '/avatars/user1.jpg'
  app.useStaticAssets(join(__dirname, '..', 'storage'), {
    prefix: '/', // You can set a prefix like /static/ if you want
  });

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  await app.listen(5000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();