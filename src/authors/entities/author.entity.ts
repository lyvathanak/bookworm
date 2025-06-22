// In: src/authors/entities/author.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Book } from '../../books/entities/book.entity'; // THIS LINE WAS MISSING
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
  dob: string;

  @Column({ nullable: true })
  avatar: string;

  // This relationship is required for the service to count books.
  @OneToMany(() => Book, book => book.author)
  books: Book[];

  @OneToMany(() => Follow, follow => follow.author)
  followers: Follow[];
}