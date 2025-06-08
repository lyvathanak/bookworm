import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Order } from './order.entity';
import { Book } from '../../books/entities/book.entity';

@Entity('order_item')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Order, order => order.items)
    order: Order;

    @ManyToOne(() => Book)
    book: Book;

    @Column()
    quantity: number;

    @Column('float')
    price: number; // Price at the time of purchase
}