import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { EmailService } from './email.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('admin/email')
export class AdminEmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() body: { to: string; subject: string; html: string }) {
    await this.emailService.send(body.to, body.subject, body.html);
    return { message: 'Email sent successfully.' };
  }
}