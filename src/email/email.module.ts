
import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailService } from './email.service';
import { AdminEmailController } from './admin-email.controller'; // 1. Import the new controller

@Module({
  imports: [MailerModule],
  controllers: [AdminEmailController], // 2. Add the controller here
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}