import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Book } from '../../books/entities/book.entity';

export enum RatingStatus {
    PENDING = 'Pending',
    APPROVED = 'Approved',
    REJECTED = 'Rejected',
}

@Entity('rating')
export class Rating {
  @PrimaryGeneratedColumn()
  rating_id: number;

  @Column()
  star: number;

  @CreateDateColumn()
  created_at: Date;

  @ManyToOne(() => User, user => user.ratings)
  @JoinColumn({ name: 'uid' })
  user: User;

  @ManyToOne(() => Book, book => book.ratings)
  @JoinColumn({ name: 'bid' })
  book: Book;

  @Column({
  type: 'enum',
  enum: RatingStatus,
  default: RatingStatus.PENDING,
  })
  status: RatingStatus;
}
