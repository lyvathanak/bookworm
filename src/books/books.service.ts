import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  create(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(book);
  }

  findAll(): Promise<Book[]> {
    return this.booksRepository.find({ relations: ['author'] });
  }

  async findOne(bid: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { bid }, relations: ['author', 'ratings'] });
    if (!book) {
      throw new NotFoundException(`Book with ID ${bid} not found`);
    }
    return book;
  }

  async update(bid: number, updateBookDto: UpdateBookDto): Promise<Book> {
    await this.booksRepository.update(bid, updateBookDto);
    const updatedBook = await this.findOne(bid);
    if (!updatedBook) {
        throw new NotFoundException(`Book with ID ${bid} not found`);
    }
    return updatedBook;
  }

  async remove(bid: number): Promise<void> {
    const result = await this.booksRepository.delete(bid);
    if (result.affected === 0) {
        throw new NotFoundException(`Book with ID ${bid} not found`);
    }
  }
}
