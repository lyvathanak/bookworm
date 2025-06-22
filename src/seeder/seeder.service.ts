import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';
import { Book } from '../books/entities/book.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { Rating, RatingStatus } from '../ratings/entities/rating.entity';
import { usersData, authorsData, booksData, ratingsData } from './data';
import { UsersService } from '../users/users.service';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    private readonly dataSource: DataSource, // Inject DataSource to run raw queries
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,
    @InjectRepository(Rating) private readonly ratingRepository: Repository<Rating>,
    private readonly usersService: UsersService,
  ) {}

  async seed() {
    this.logger.log('--- STARTING SEED ---');
    
    // THIS IS THE FIX: Use a raw TRUNCATE...CASCADE query for robustness.
    // This command clears all data and handles all relationships automatically.
    await this.dataSource.query(
      'TRUNCATE TABLE "user", "author", "book", "order", "order_item", "rating", "cart", "wishlist", "follow" RESTART IDENTITY CASCADE;',
    );
    this.logger.log('All tables truncated successfully.');

    // Seeding logic
    const createdUsers = await this.seedUsers();
    const createdAuthors = await this.seedAuthors();
    const createdBooks = await this.seedBooks(createdAuthors);
    await this.seedOrders(createdUsers, createdBooks);
    await this.seedRatings(createdUsers, createdBooks);
    
    this.logger.log('--- SEEDING COMPLETE ---');
    return { message: 'Database seeded successfully!' };
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

    const savedBooks = await this.bookRepository.save(booksToCreate);
    this.logger.log(`${savedBooks.length} books seeded.`);
    return savedBooks;
  }

  private async seedOrders(users: User[], books: Book[]) {
      const user1 = users.find(u => u.email === 'john.doe@email.com');
      const book1 = books.find(b => b.title === 'Atomic Habits');

      if (!user1 || !book1 ) return;

      const orderItem1 = this.orderItemRepository.create({ book: book1, quantity: 2, price: book1.price });
      const order1 = this.orderRepository.create({ user: user1, address: user1.address, total: book1.price * 2, items: [orderItem1], status: 'Delivered' });
      await this.orderRepository.save(order1);

      this.logger.log('Sample orders seeded.');
  }

  private async seedRatings(users: User[], books: Book[]): Promise<void> {
    const ratingsToCreate = ratingsData.map(ratingData => {
        const user = users.find(u => u.email === ratingData.user_email_ref);
        const book = books.find(b => b.title === ratingData.book_title_ref);
        if (!user || !book) return null;
        return this.ratingRepository.create({ user, book, star: ratingData.star, status: ratingData.status });
    }).filter(rating => rating !== null);

    if (ratingsToCreate.length > 0) {
      await this.ratingRepository.save(ratingsToCreate);
      this.logger.log(`${ratingsToCreate.length} ratings seeded.`);
    }
  }
}