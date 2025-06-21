import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import * as path from 'path';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  // Generic email sending method (with HTML support)
  async send(to: string, subject: string, html: string): Promise<void> {
    await this.mailerService.sendMail({
      to,
      subject,
      html, // Rich HTML content
    });
    console.log(`Custom email sent to ${to}`);
  }

  // Specific purchase confirmation email with PDF attachment
  async sendPurchaseConfirmation(user: User, book: Book): Promise<void> {
    if (!book.ebook_pdf_path) {
      console.error(`E-book path not found for book ID: ${book.bid}`);
      return;
    }

    const subject = `Your Bookworm Purchase: ${book.title}`;
    const pdfPath = path.join(process.cwd(), book.ebook_pdf_path);

    await this.mailerService.sendMail({
      to: user.email,
      subject,
      text: `Hi ${user.fname},\n\nThank you for your purchase. Your e-book, "${book.title}", is attached.\n\nHappy reading!\n- The Bookworm Team`,
      attachments: [
        {
          filename: `${book.title.replace(/\s/g, '_')}.pdf`,
          path: pdfPath,
          contentType: 'application/pdf',
        },
      ],
    });

    console.log(`E-book sent for "${book.title}" to ${user.email}`);
  }
}
