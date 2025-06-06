import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, { eager: true }) // eager loads the book details
  book: Book;

  @Column()
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number; // Price at the time of purchase

  @ManyToOne(() => Order, order => order.items)
  order: Order;
}