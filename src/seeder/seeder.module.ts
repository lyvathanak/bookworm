import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { User } from '../users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';
import { Book } from '../books/entities/book.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Author, Book, Order, OrderItem]),
  ],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}
