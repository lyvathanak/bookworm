// In lyvathanak/bookworm/bookworm-backend/src/app.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';
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
import { SeederModule } from './seeder/seeder.module';
import { PaymentModule } from './payment/payment.module';
import { EmailModule } from './email/email.module'; // 1. Make sure EmailModule is imported
import { FollowsModule } from './follows/follows.module';
import { User } from './users/entities/user.entity';
import { Book } from './books/entities/book.entity';
import { Author } from './authors/entities/author.entity';
import { Order } from './orders/entities/order.entity';
import { OrderItem } from './orders/entities/order-item.entity';
import { Rating } from './ratings/entities/rating.entity';
import { Cart } from './cart/entities/cart.entity';
import { Wishlist } from './wishlist/entities/wishlist.entity';
import { Follow } from './follows/entities/follow.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // --- THIS IS THE UPDATED SECTION ---
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = configService.get<string>('NODE_ENV') === 'production';
        return {
          type: 'postgres',
          url: configService.get<string>('DATABASE_URL'),
          // Use SSL only in production
          ssl: isProduction ? { rejectUnauthorized: false } : false,
          synchronize: true,
          entities: [User, Book, Author, Order, OrderItem, Rating, Cart, Wishlist, Follow],
        };
      },
    }),
    // ------------------------------------

    MailerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        transport: {
          host: configService.get('EMAIL_HOST'),
          port: Number(configService.get('EMAIL_PORT')),
          secure: false,
          auth: {
            user: configService.get('EMAIL_USER'),
            pass: configService.get('EMAIL_PASSWORD'),
          },
        },
        defaults: {
          from: '"Bookworm" <no-reply@bookworm.com>',
        },
      }),
      inject: [ConfigService],
    }),

    UsersModule, 
    AuthModule, 
    BooksModule, 
    AuthorsModule, 
    OrdersModule, 
    RatingsModule, 
    CartModule, 
    WishlistModule, 
    SeederModule, 
    PaymentModule, 
    EmailModule,
    FollowsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}