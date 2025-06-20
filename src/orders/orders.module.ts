import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';
import { OrdersController } from './orders.controller';
import { PublicOrdersController } from './public-orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [TypeOrmModule.forFeature([Order, OrderItem, Book, User])],
  controllers: [OrdersController, PublicOrdersController],
  providers: [OrdersService],
  // --- ADD THIS LINE ---
  exports: [OrdersService],
  // ---------------------
})
export class OrdersModule {}