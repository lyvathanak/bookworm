import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';
import { Repository } from 'typeorm';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
  ) {}

  async getStats() {
    const totalRevenue = (await this.orderRepo.sum('total', { status: 'Paid' })) || 0;
    const totalOrders = await this.orderRepo.count();
    const totalUsers = await this.userRepo.count();
    const totalProducts = await this.bookRepo.count();
    return { totalRevenue, totalOrders, totalUsers, totalProducts };
  }
}