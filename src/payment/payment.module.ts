import { Module } from '@nestjs/common';
import { PaymentController } from './payment.controller';
import { HttpModule } from '@nestjs/axios';
import { OrdersModule } from '../orders/orders.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [HttpModule, OrdersModule, EmailModule],
  controllers: [PaymentController],
})
export class PaymentModule {}