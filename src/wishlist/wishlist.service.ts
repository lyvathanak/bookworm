import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wishlist } from './entities/wishlist.entity';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class WishlistService {
  constructor(
    @InjectRepository(Wishlist)
    private wishlistRepository: Repository<Wishlist>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async addToWishlist(userId: number, bookId: number): Promise<Wishlist> {
    const user = await this.usersRepository.findOneBy({ uid: userId });
    const book = await this.booksRepository.findOneBy({ bid: bookId });

    if (!user || !book) {
      throw new NotFoundException('User or Book not found');
    }

    const existingItem = await this.wishlistRepository.findOne({ where: { user: { uid: userId }, book: { bid: bookId } } });
    if (existingItem) {
        throw new ConflictException('This book is already in the wishlist');
    }

    const wishlistItem = this.wishlistRepository.create({ user, book });
    return this.wishlistRepository.save(wishlistItem);
  }

getWishlistForUser(userId: number): Promise<Wishlist[]> {
  return this.wishlistRepository.find({
    where: { user: { uid: userId } },
    // CORRECTED LINE:
    relations: ['book', 'book.author'], // Now it will also load each book's author
  });
}

  async removeFromWishlist(userId: number, bookId: number): Promise<void> {
    const result = await this.wishlistRepository.delete({ user: { uid: userId }, book: { bid: bookId } });
    if (result.affected === 0) {
      throw new NotFoundException('Wishlist item not found');
    }
  }
}
