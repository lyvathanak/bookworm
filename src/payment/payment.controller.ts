import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
import { OrdersService } from '../orders/orders.service';
import { EmailService } from '../email/email.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly emailService: EmailService,
  ) {}


  @Get('succeed/:orderId')
  async simulateSuccessfulPayment(@Param('orderId') orderId: string) {
    console.log(`Simulating successful payment for order ${orderId}...`);

    // 1. Fetch the order details
    const order = await this.ordersService.findOne(+orderId);
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    // 2. Update the order status to 'Paid'
    await this.ordersService.updateStatus(+orderId, 'Paid');
    console.log(`Order ${orderId} status updated to "Paid".`);

    // 3. For each e-book in the order, send the confirmation email
    for (const item of order.items) {
      if (item.book.booktype === 'E-book' && item.book.ebook_pdf_path) {
        await this.emailService.sendPurchaseConfirmation(order.user, item.book);
      }
    }

    return {
      message: `Payment simulation successful for order ${orderId}. E-books have been sent.`,
    };
  }
}