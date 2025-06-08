import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { OrdersModule } from './orders/orders.module';
import { RatingsModule } from './ratings/ratings.module';
import { CartModule } from './cart/cart.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { User } from './users/entities/user.entity';
import { Book } from './books/entities/book.entity';
import { Author } from './authors/entities/author.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { Rating } from './ratings/entities/rating.entity';
import { Cart } from './cart/entities/cart.entity';
import { Wishlist } from './wishlist/entities/wishlist.entity';
import { SeederModule } from './seeder/seeder.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432', 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Book, Author, Order, OrderItem, Rating, Cart, Wishlist],
      synchronize: true,
    }),
    UsersModule, AuthModule, BooksModule, AuthorsModule, OrdersModule, RatingsModule, CartModule, WishlistModule, SeederModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}