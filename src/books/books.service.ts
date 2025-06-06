import { Injectable } from '@nestjs/common';
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

  create(createBookDto: CreateBookDto) {
    const newBook = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(newBook);
  }

  findAll() {
    return this.booksRepository.find({ relations: ['author'] });
  }

  findOne(id: number) {
    return this.booksRepository.findOne({ where: { id }, relations: ['author'] });
  }

  async update(id: number, updateBookDto: UpdateBookDto) {
    await this.booksRepository.update(id, updateBookDto);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.booksRepository.delete(id);
  }
}