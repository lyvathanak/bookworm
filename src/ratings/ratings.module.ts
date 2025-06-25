import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rating } from './entities/rating.entity';
import { RatingsController } from './ratings.controller';
import { RatingsService } from './ratings.service';
import { PublicRatingsController } from './public-ratings.controller';
import { PublicRatingsService } from './public-ratings.service';
import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Rating, Book, User])],
  controllers: [RatingsController, PublicRatingsController],
  providers: [RatingsService, PublicRatingsService],
})
export class RatingsModule {}