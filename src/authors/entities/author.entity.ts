import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity';
import { Follow } from '../../follows/entities/follow.entity';

@Entity('author')
export class Author {
  @PrimaryGeneratedColumn()
  author_id: number;

  @Column()
  author_name: string;

  @Column({ type: 'text', nullable: true })
  bio: string;

  @Column({ type: 'date', nullable: true })
  dob: string; // Using string for simplicity and to avoid type issues

  @Column({ nullable: true })
  avatar: string;

  @OneToMany(() => Book, book => book.author)
  books: Book[];

  @OneToMany(() => Follow, follow => follow.author)
  followers: Follow[];
}