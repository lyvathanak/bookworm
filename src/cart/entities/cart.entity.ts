import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity('cart')
export class Cart {
    @PrimaryGeneratedColumn()
    cart_id: number;

    @Column()
    amount: number; // This is quantity

    @CreateDateColumn()
    added_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'uid' })
    user: User;

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'bid' })
    book: Book;
}
