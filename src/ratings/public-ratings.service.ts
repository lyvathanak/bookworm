import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rating } from './entities/rating.entity';
import { CreateRatingDto } from './dto/create-rating.dto';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class PublicRatingsService {
  constructor(
    @InjectRepository(Rating)
    private ratingsRepository: Repository<Rating>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  // FIX: Update the method signature
  async create(userId: number, bookId: number, createRatingDto: CreateRatingDto): Promise<Rating> {
    const { star } = createRatingDto;

    const user = await this.usersRepository.findOneBy({ uid: userId });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const book = await this.booksRepository.findOneBy({ bid: bookId });
    if (!book) {
      throw new NotFoundException('Book not found');
    }

    const existingRating = await this.ratingsRepository.findOne({
      where: { user: { uid: userId }, book: { bid: bookId } },
    });

    if (existingRating) {
      throw new ConflictException('You have already rated this book.');
    }

    const rating = this.ratingsRepository.create({
      user,
      book,
      star,
    });

    return this.ratingsRepository.save(rating);
  }
}