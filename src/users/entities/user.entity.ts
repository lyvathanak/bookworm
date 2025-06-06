import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { OrdersModule } from './orders/orders.module';
import { ReviewsModule } from './reviews/reviews.module';
import { User } from './users/entities/user.entity';
import { Book } from './books/entities/book.entity';
import { Author } from './authors/entities/author.entity';
import { Order } from './orders/entities/order.entity';
import { Review } from './reviews/entities/review.entity';
import { OrderItem } from './orders/entities/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'bookworm.db', // This will create a database file in your root folder
      entities: [User, Book, Author, Order, Review, OrderItem],
      synchronize: true, // Auto-creates DB schema. Set to false in production!
    }),
    UsersModule,
    BooksModule,
    AuthorsModule,
    OrdersModule,
    ReviewsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}