// In: src/books/books.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './entities/book.entity';
import { Author } from '../authors/entities/author.entity'; // Ensure Author is imported

@Module({
  // THIS IS THE FIX: We must import the Author entity here as well,
  // so the BooksService can use its repository to join the tables.
  imports: [TypeOrmModule.forFeature([Book, Author])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}