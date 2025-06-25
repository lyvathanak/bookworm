import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';
import { Book } from '../books/entities/book.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
//import { Rating, RatingStatus } from '../ratings/entities/rating.entity';
import { usersData, authorsData, booksData } from './data';
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
    //@InjectRepository(Rating) private readonly ratingRepository: Repository<Rating>,
    private readonly usersService: UsersService,
  ) {}

  async seed() {
    this.logger.log('--- STARTING SEED ---');
    
    // First, ensure the admin account exists.
    await this.seedAdmin();

    // THIS IS THE FIX: Use a raw TRUNCATE...CASCADE query for robustness.
    // This command clears all data and handles all relationships automatically.
    // Note: This will not delete the admin user created above if run multiple times.
    await this.dataSource.query(
      'TRUNCATE TABLE "author", "book", "order", "order_item", "cart", "wishlist", "follow" RESTART IDENTITY CASCADE;',
    );
    this.logger.log('All non-user tables truncated successfully.');


    // Seeding logic for other data
    const createdUsers = await this.seedUsers();
    const createdAuthors = await this.seedAuthors();
    const createdBooks = await this.seedBooks(createdAuthors);
    await this.seedOrders(createdUsers, createdBooks);
    
    this.logger.log('--- SEEDING COMPLETE ---');
    return { message: 'Database seeded successfully!' };
  }
  
  /**
   * Creates the default admin user if it doesn't exist.
   */
  async seedAdmin() {
    const adminEmail = 'admin@bookworm.com';
    const existingAdmin = await this.usersService.findOneByEmail(adminEmail);

    if (!existingAdmin) {
      this.logger.log('Admin user not found, creating one...');
      const adminData = {
        fname: 'Admin',
        lname: 'User',
        email: adminEmail,
        password: 'password123', // You should use a more secure password or environment variable
        role: UserRole.ADMIN,
      };
      await this.usersService.create(adminData);
      this.logger.log('Admin user created successfully.');
    } else {
      this.logger.log('Admin user already exists.');
    }
  }

  private async seedUsers(): Promise<User[]> {
    const createdUsers: User[] = [];
    for (const userData of usersData) {
       // We skip creating the admin here because seedAdmin() already handled it.
      if (userData.email !== 'admin@bookworm.com') {
        const user = await this.usersService.create(userData);
        createdUsers.push(user);
      }
    }
    this.logger.log(`${createdUsers.length} non-admin users seeded.`);
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
}
