import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Rating } from '../../ratings/entities/rating.entity';

@Entity('book')
export class Book {
    @PrimaryGeneratedColumn()
    bid: number;

    @Column()
    title: string;

    @Column({ type: 'text', nullable: true })
    description: string;

    @Column('float')
    price: number;

    @Column({ nullable: true })
    genre: string;

    @Column({ nullable: true })
    published_year: number;

    @Column()
    stock: number;

    @Column({ nullable: true })
    image: string;

    @Column({ default: 'Physical' })
    booktype: string;
    
    @Column({ type: 'varchar', nullable: true })
    ebook_pdf_path: string;
    
    @Column({ default: 'Active' })
    status: string;

    @Column({ nullable: true })
    isbn: string;

    @ManyToOne(() => Author)
    @JoinColumn({ name: 'author_id' })
    author: Author;
    
    @OneToMany(() => Rating, rating => rating.book)
    ratings: Rating[];
}