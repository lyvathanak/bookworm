// In lyvathanak/bookworm/bookworm-backend/src/books/books.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets, Not } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  /**
   * Creates a new book and associates it with an author.
   */
  async create(createBookDto: CreateBookDto): Promise<Book> {
    // FIX: Changed 'authorId' to 'author_id' to match the DTO
    const { author_id, ...restOfBookData } = createBookDto;

    // Find the author by the provided ID
    const author = await this.authorsRepository.findOneBy({ author_id: author_id });
    if (!author) {
      throw new NotFoundException(`Author with ID ${author_id} not found`);
    }
    
    // Create the book instance with the author object relationship
    const book = this.booksRepository.create({
      ...restOfBookData,
      author: author,
    });

    return this.booksRepository.save(book);
  }

  async findAll(query: { search?: string, genre?: string }): Promise<Book[]> {
    const qb = this.booksRepository.createQueryBuilder('book');
    qb.leftJoinAndSelect('book.author', 'author');
    if (query.genre) {
      qb.where('book.genre = :genre', { genre: query.genre });
    }
    if (query.search) {
      qb.andWhere(new Brackets(sqb => {
        sqb.where('book.title ILIKE :search', { search: `%${query.search}%` })
           .orWhere('author.author_name ILIKE :search', { search: `%${query.search}%` });
      }));
    }
    return qb.getMany();
  }

  async findOne(bid: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { bid }, relations: ['author', 'ratings'] });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bid} not found`);
    }
    if (book.ratings && book.ratings.length > 0) {
      const sum = book.ratings.reduce((acc, rating) => acc + rating.star, 0);
      (book as any).averageRating = parseFloat((sum / book.ratings.length).toFixed(1));
    } else {
      (book as any).averageRating = 0;
    }
    return book;
  }
  
  async findRelated(bid: number, genre: string): Promise<Book[]> {
    return this.booksRepository.find({
      where: { genre: genre, bid: Not(bid) },
      relations: ['author'],
      take: 5,
    });
  }

  /**
   * Updates a book's details, including its author if an author_id is provided.
   */
  async update(bid: number, updateBookDto: UpdateBookDto): Promise<Book> {
    // FIX: Changed 'authorId' to 'author_id' to match the DTO
    const { author_id, ...restOfUpdateData } = updateBookDto;
    
    const bookToUpdate = await this.booksRepository.preload({
        bid: bid,
        ...restOfUpdateData,
    });

    if (!bookToUpdate) {
        throw new NotFoundException(`Book with ID ${bid} not found`);
    }

    // If a new author_id was provided, find and update the author relationship
    if (author_id) {
        const author = await this.authorsRepository.findOneBy({ author_id: author_id });
        if (!author) {
            throw new NotFoundException(`Author with ID ${author_id} not found`);
        }
        bookToUpdate.author = author;
    }
    
    return this.booksRepository.save(bookToUpdate);
  }

  async remove(bid: number): Promise<void> {
    const result = await this.booksRepository.delete(bid);
    if (result.affected === 0) {
        throw new NotFoundException(`Book with ID ${bid} not found`);
    }
  }
}