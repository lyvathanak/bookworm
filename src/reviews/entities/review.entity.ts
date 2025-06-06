import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  rating: number;
  
  @Column('text')
  comment: string;
  
  @Column({ default: 'pending' })
  status: string;
  
  @CreateDateColumn()
  timestamp: Date;
  
  @ManyToOne(() => User, user => user.reviews)
  user: User;
  
  @ManyToOne(() => Book, book => book.reviews)
  book: Book;
}