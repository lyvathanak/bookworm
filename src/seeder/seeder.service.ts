import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';
import { Book } from '../books/entities/book.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { usersData, authorsData, booksData } from './data';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,
    private readonly usersService: UsersService,
  ) {}

  async seed() {
    this.logger.log('--- STARTING SEED ---');
    
    const createdUsers = await this.seedUsers();
    const createdAuthors = await this.seedAuthors();
    const createdBooks = await this.seedBooks(createdAuthors);
    
    // This will ensure our test book is always correctly configured
    await this.setupTestEbook(createdBooks); 
    
    await this.seedOrders(createdUsers, createdBooks);
    
    this.logger.log('--- SEEDING COMPLETE ---');
    return { message: 'Database seeded successfully!' };
  }
  
  /**
   * This function specifically updates 'Atomic Habits' to be an e-book.
   */
  private async setupTestEbook(books: Book[]): Promise<void> {
    const bookToUpdate = books.find(b => b.title === 'Atomic Habits');
    if (bookToUpdate) {
      this.logger.log('Configuring "Atomic Habits" as an e-book for testing...');
      bookToUpdate.booktype = 'E-book';
      bookToUpdate.ebook_pdf_path = 'storage/ebooks/my-test-ebook.pdf';
      await this.bookRepository.save(bookToUpdate);
    }
  }

  private async seedUsers(): Promise<User[]> {
    const createdUsers: User[] = [];
    for (const userData of usersData) {
      const user = await this.usersService.create(userData);
      createdUsers.push(user);
    }
    this.logger.log(`${createdUsers.length} users seeded.`);
    return createdUsers;
  }

  private async seedAuthors(): Promise<Author[]> {
    const authors = await this.authorRepository.save(authorsData);
    this.logger.log(`${authors.length} authors seeded.`);
    return authors;
  }
  
  private async seedBooks(authors: Author[]): Promise<Book[]> {
    const booksToCreate = booksData.map(bookData => {
      const { author_id_ref, ...restOfBookData } = bookData;
      const author = authors.find(a => a.author_id === author_id_ref);
      if (!author) return null;
      return this.bookRepository.create({ ...restOfBookData, author });
    }).filter(book => book !== null);

    await this.bookRepository.save(booksToCreate);
    this.logger.log(`${booksToCreate.length} books seeded.`);
    return booksToCreate;
  }

  private async seedOrders(users: User[], books: Book[]) {
      const user1 = users.find(u => u.email === 'john.doe@email.com');
      const book1 = books.find(b => b.title === 'Atomic Habits');
      if (!user1 || !book1) return;

      const orderItem = this.orderItemRepository.create({ book: book1, quantity: 1, price: book1.price });
      const order = this.orderRepository.create({ user: user1, address: user1.address, total: book1.price, items: [orderItem] });
      await this.orderRepository.save(order);
      this.logger.log('Sample order seeded.');
  }
}
