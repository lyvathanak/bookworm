import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cart } from './entities/cart.entity';
import { AddToCartDto } from './dto/add-to-cart.dto';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { UpdateCartDto } from './dto/update-cart.dto';

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

    let cartItem = await this.cartRepository.findOne({ where: { user: { uid: userId }, book: { bid: bookId } } });

    if (cartItem) {
      cartItem.amount += quantity;
    } else {
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
      relations: ['book'],
    });
  }
  
  async updateItemQuantity(userId: number, cartItemId: number, updateCartDto: UpdateCartDto): Promise<Cart> {
    const cartItem = await this.cartRepository.findOne({ 
      where: { cart_id: cartItemId, user: { uid: userId } }
    });

    if (!cartItem) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found for this user`);
    }

    cartItem.amount = updateCartDto.quantity;
    return this.cartRepository.save(cartItem);
  }

  async removeItemFromCart(userId: number, cartItemId: number): Promise<void> {
    const result = await this.cartRepository.delete({ cart_id: cartItemId, user: { uid: userId } });
    if (result.affected === 0) {
      throw new NotFoundException(`Cart item with ID ${cartItemId} not found for this user`);
    }
  }

  async clearCart(userId: number): Promise<void> {
    await this.cartRepository.delete({ user: { uid: userId } });
  }
}