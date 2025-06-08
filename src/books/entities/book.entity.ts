import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Author } from '../../authors/entities/author.entity';
import { Rating } from '../../ratings/entities/rating.entity';

@Entity('book')
export class Book {
    @PrimaryGeneratedColumn() bid: number;
    @Column() title: string;
    @Column('float') price: number;
    @Column({ nullable: true }) genre: string;
    @Column({ nullable: true }) published_year: number;
    @Column() stock: number;
    @Column({ nullable: true }) image: string;
    @Column({ default: 'Physical' }) booktype: string;
    @Column({ default: 'Active' }) status: string;
    @Column({ nullable: true }) isbn: string;
    @Column({ nullable: true }) edition_language: string;
    @Column({ nullable: true }) pages: number;
    @Column({ nullable: true }) publisher: string;
    @Column() author_id: number;
    @ManyToOne(() => Author, author => author.books) @JoinColumn({ name: 'author_id' }) author: Author;
    @OneToMany(() => Rating, rating => rating.book) ratings: Rating[];
}