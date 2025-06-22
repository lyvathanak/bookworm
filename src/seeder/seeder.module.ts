// In: src/seeder/seeder.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeederService } from './seeder.service';
import { SeederController } from './seeder.controller';
import { UsersModule } from '../users/users.module';

// Import all entities used by the seeder
import { User } from '../users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';
import { Book } from '../books/entities/book.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Rating } from '../ratings/entities/rating.entity';
import { Cart } from '../cart/entities/cart.entity';
import { Wishlist } from '../wishlist/entities/wishlist.entity';
import { Follow } from '../follows/entities/follow.entity';

@Module({
  imports: [
    // THIS IS THE FIX: Ensure all entities, including Follow, are here.
    TypeOrmModule.forFeature([
      User, Author, Book, Order, OrderItem, Rating, Cart, Wishlist, Follow
    ]),
    UsersModule,
  ],
  providers: [SeederService],
  controllers: [SeederController],
})
export class SeederModule {}