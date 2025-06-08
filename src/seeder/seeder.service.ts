import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, UserRole } from '../users/entities/user.entity';
import { Author } from '../authors/entities/author.entity';
import { Book } from '../books/entities/book.entity';
import { Order } from '../orders/entities/order.entity';
import { OrderItem } from '../orders/entities/order-item.entity';
import { usersData, authorsData, booksData } from './data';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Author) private readonly authorRepository: Repository<Author>,
    @InjectRepository(Book) private readonly bookRepository: Repository<Book>,
    @InjectRepository(Order) private readonly orderRepository: Repository<Order>,
    @InjectRepository(OrderItem) private readonly orderItemRepository: Repository<OrderItem>,
  ) {}

  async seed() {
    this.logger.log('Starting database seed...');

    const createdAuthors = await this.seedAuthors();
    const createdBooks = await this.seedBooks(createdAuthors);
    const createdUsers = await this.seedUsers();
    await this.seedOrders(createdUsers, createdBooks);

    this.logger.log('Database seeding complete!');
    return { message: 'Database seeded successfully!' };
  }

  private async seedAuthors(): Promise<Author[]> {
    return this.authorRepository.save(authorsData);
  }

  private async seedBooks(authors: Author[]): Promise<Book[]> {
    const booksToCreate = booksData.map(book => {
        const author = authors.find(a => a.author_id === book.author_id_ref);
        return this.bookRepository.create({ ...book, author });
    });
    return this.bookRepository.save(booksToCreate);
  }
  
  private async seedUsers(): Promise<User[]> {
      const usersToCreate = usersData.map(userData => {
          return this.userRepository.create({
              ...userData,
              role: userData.role === 'admin' ? UserRole.ADMIN : UserRole.USER,
          });
      });
      return this.userRepository.save(usersToCreate);
  }

  private async seedOrders(users: User[], books: Book[]) {
      const user1 = users.find(u => u.email === 'john.doe@email.com');
      const book1 = books.find(b => b.title === 'Atomic Habits');
      
      if (!user1 || !book1) return;

      const orderItem1 = this.orderItemRepository.create({ book: book1, quantity: 1, price: book1.price });
      const order1 = this.orderRepository.create({ user: user1, address: user1.address, total: book1.price, items: [orderItem1] });
      
      await this.orderRepository.save(order1);
  }
}
