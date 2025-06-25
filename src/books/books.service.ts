import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Brackets } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private readonly booksRepository: Repository<Book>,
    @InjectRepository(Author) private readonly authorsRepository: Repository<Author>,
  ) {}

  // This service is now much simpler as it just passes data through.
  async findAll(options: { genre?: string, search?: string } = {}): Promise<any[]> {
    const { genre, search } = options;
    const query = this.booksRepository.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author');

    if (genre) {
      query.where('book.genre = :genre', { genre });
    }

    if (search) {
      const searchCondition = new Brackets(qb => {
        qb.where('book.title ILIKE :search', { search: `%${search}%` })
          .orWhere('author.author_name ILIKE :search', { search: `%${search}%` });
      });
      query.andWhere(searchCondition);
    }
      
    return query.getMany();
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { author_id, ...restOfBookData } = createBookDto;
    const author = await this.authorsRepository.findOneBy({ author_id });
    if (!author) throw new NotFoundException(`Author with ID ${author_id} not found`);
    const book = this.booksRepository.create({ ...restOfBookData, author });
    return this.booksRepository.save(book);
  }

  async update(bid: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const bookToUpdate = await this.booksRepository.preload({
      bid: bid,
      ...updateBookDto
    });
    if (!bookToUpdate) {
      throw new NotFoundException(`Book with ID ${bid} not found`);
    }

    if (updateBookDto.author_id) {
      const author = await this.authorsRepository.findOneBy({ author_id: updateBookDto.author_id });
      if (!author) throw new NotFoundException(`Author with ID ${updateBookDto.author_id} not found`);
      bookToUpdate.author = author;
    }
    
    return this.booksRepository.save(bookToUpdate);
  }
  
  async findOne(bid: number): Promise<Book> {
    const book = await this.booksRepository.findOne({ where: { bid }, relations: ['author'] });
    if (!book) { throw new NotFoundException(`Book with ID ${bid} not found`);}
    return book;
  }
  
  async remove(bid: number): Promise<void> {
    const result = await this.booksRepository.delete(bid);
    if (result.affected === 0) { throw new NotFoundException(`Book with ID ${bid} not found`);}
  }
}