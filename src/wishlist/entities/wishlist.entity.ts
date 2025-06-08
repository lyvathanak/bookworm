import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity('wishlist')
export class Wishlist {
    @PrimaryGeneratedColumn()
    wishid: number;

    @CreateDateColumn()
    added_at: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'uid' })
    user: User;

    @ManyToOne(() => Book)
    @JoinColumn({ name: 'bid' })
    book: Book;
}
