import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  async findAll(): Promise<any[]> {
    const books = await this.booksRepository.createQueryBuilder('book')
      .leftJoinAndSelect('book.author', 'author')
      .getMany();
    return books.map((book) => ({
      bid: book.bid, title: book.title, price: book.price, stock: book.stock, status: book.status, image: book.image, genre: book.genre, booktype: book.booktype,
      author: book.author ? { author_name: book.author.author_name, author_id: book.author.author_id } : null,
    }));
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { author_id, ...restOfBookData } = createBookDto;
    const author = await this.authorsRepository.findOneBy({ author_id });
    if (!author) throw new NotFoundException(`Author with ID ${author_id} not found`);
    const book = this.booksRepository.create({ ...restOfBookData, author });
    return this.booksRepository.save(book);
  }

  // --- THIS IS THE CORRECTED UPDATE METHOD ---
  async update(bid: number, updateBookDto: UpdateBookDto): Promise<Book> {
    // Use preload to safely load the entity and merge all the new data from the DTO
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
  
  async updateImage(bookId: number, imagePath: string) {
    const book = await this.findOne(bookId);
    const normalizedPath = imagePath.replace(/\\/g, '/').replace('storage/', '');
    await this.booksRepository.update(bookId, { image: normalizedPath });
    return { message: 'Image updated successfully', path: normalizedPath };
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