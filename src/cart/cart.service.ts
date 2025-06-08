import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async addToCart(userId: number, addToCartDto: AddToCartDto): Promise<Cart> {
    const { bookId, quantity } = addToCartDto;

    const user = await this.usersRepository.findOneBy({ uid: userId });
    const book = await this.booksRepository.findOneBy({ bid: bookId });

    if (!user || !book) {
      throw new NotFoundException('User or Book not found');
    }

    // Check if the item is already in the cart
    let cartItem = await this.cartRepository.findOne({ where: { user: { uid: userId }, book: { bid: bookId } } });

    if (cartItem) {
      // Update quantity if item exists
      cartItem.amount += quantity;
    } else {
      // Create new cart item if it doesn't exist
      cartItem = this.cartRepository.create({
        user,
        book,
        amount: quantity,
      });
    }

    return this.cartRepository.save(cartItem);
  }

  async getCartForUser(userId: number): Promise<Cart[]> {
    return this.cartRepository.find({
      where: { user: { uid: userId } },
      relations: ['book'], // Also load the book details for each cart item
    });
  }

  async removeItemFromCart(userId: number, cartItemId: number): Promise<void> {
    // Ensure the item belongs to the user before deleting
    const result = await this.cartRepository.delete({ cart_id: cartItemId, user: { uid: userId } });
    if (result.affected === 0) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found for this user`);
    }
  }
}
