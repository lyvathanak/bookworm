import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity'; // Import the Author entity

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
    // Inject the Author repository to find authors
    @InjectRepository(Author)
    private authorsRepository: Repository<Author>,
  ) {}

  /**
   * Creates a new book and associates it with an author.
   */
  async create(createBookDto: CreateBookDto): Promise<Book> {
    const { authorId, ...restOfBookData } = createBookDto;

    // Find the author by the provided ID
    const author = await this.authorsRepository.findOneBy({ author_id: authorId });
    if (!author) {
      throw new NotFoundException(`Author with ID ${authorId} not found`);
    }
    
    // Create the book instance with the author object relationship
    const book = this.booksRepository.create({
      ...restOfBookData,
      author: author,
    });

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

  /**
   * Updates a book's details, including its author if an authorId is provided.
   */
  async update(bid: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const { authorId, ...restOfUpdateData } = updateBookDto;
    
    // Preload finds the entity and applies the new data
    const bookToUpdate = await this.booksRepository.preload({
        bid: bid,
        ...restOfUpdateData,
    });

    if (!bookToUpdate) {
        throw new NotFoundException(`Book with ID ${bid} not found`);
    }

    // If a new authorId was provided, find and update the author relationship
    if (authorId) {
        const author = await this.authorsRepository.findOneBy({ author_id: authorId });
        if (!author) {
            throw new NotFoundException(`Author with ID ${authorId} not found`);
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
