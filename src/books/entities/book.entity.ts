import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Review } from '../../reviews/entities/review.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  category: string;

  @Column('decimal', { precision: 5, scale: 2 })
  price: number;

  @Column({ default: 'Physical' })
  type: string;

  @Column({ default: 0 })
  sales: number;

  @ManyToOne(() => Author, author => author.books)
  author: Author;
  
  @OneToMany(() => Review, review => review.book)
  reviews: Review[];
}