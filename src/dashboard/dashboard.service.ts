// In: src/dashboard/dashboard.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../orders/entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Book } from '../books/entities/book.entity';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  
  async getSalesOverTime() {
    return this.orderRepository.createQueryBuilder('order')
      .select("DATE_TRUNC('day', order.created_at)", "date") // Group by day
      .addSelect("SUM(order.total)", "sales") // Sum the total for that day
      .where("order.status = 'Paid' OR order.status = 'Delivered'")
      .groupBy("date")
      .orderBy("date", "ASC") // Order by date chronologically
      .getRawMany(); // Use getRawMany to get the aggregated data
  }

  async getStats() {
    // Using Promise.all to fetch all stats concurrently
    const [totalRevenueResult, totalOrders, totalUsers, totalProducts] = await Promise.all([
      this.orderRepository.sum('total', { status: 'Paid' }),
      this.orderRepository.count(),
      this.userRepository.count(),
      this.bookRepository.count(),
    ]);

    // The .sum method can return null if there are no orders, so default to 0
    const totalRevenue = totalRevenueResult || 0;

    return { totalRevenue, totalOrders, totalUsers, totalProducts };
  }
}