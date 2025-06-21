import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { Book } from '../books/entities/book.entity';
import { User } from '../users/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(OrderItem) private orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Book) private booksRepository: Repository<Book>,
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.ordersRepository.find({ relations: ['user', 'items', 'items.book'] });
  }

  // --- Add the new findOne method here ---
  async findOne(orderId: number): Promise<Order> {
    const order = await this.ordersRepository.findOne({
      where: { order_id: orderId },
      // Important: Include all the relations you need in other services
      relations: ['user', 'items', 'items.book'], 
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    return order;
  }

    async findForUser(userId: number): Promise<Order[]> {
    return this.ordersRepository.find({
      where: { user: { uid: userId } },
      relations: ['items', 'items.book'],
      order: { created_at: 'DESC' } // Show newest orders first
    });
  }
  // -----------------------------------------

  async updateStatus(id: number, status: string): Promise<Order> {
    const order = await this.ordersRepository.findOneBy({ order_id: id });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    order.status = status;
    return this.ordersRepository.save(order);
  }

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.usersRepository.findOneBy({ uid: userId });
    if (!user) { throw new NotFoundException('User not found'); }

    let total = 0;
    const orderItems: OrderItem[] = [];

    for (const itemDto of createOrderDto.items) {
      const book = await this.booksRepository.findOneBy({ bid: itemDto.bookId });
      if (!book) { throw new NotFoundException(`Book with ID ${itemDto.bookId} not found`); }
      total += book.price * itemDto.quantity;
      const orderItem = this.orderItemsRepository.create({ book, quantity: itemDto.quantity, price: book.price });
      orderItems.push(orderItem);
    }
    const newOrder = this.ordersRepository.create({ user, items: orderItems, total, address: createOrderDto.address });
    return this.ordersRepository.save(newOrder);
  }
}