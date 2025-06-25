import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './entities/author.entity';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectRepository(Author) private authorsRepository: Repository<Author>,
  ) {}

  async findAll(): Promise<any[]> {
    const authors = await this.authorsRepository
      .createQueryBuilder('author')
      .loadRelationCountAndMap('author.bookCount', 'author.books')
      .getMany();
    
    return authors.map(author => ({
      author_id: author.author_id,
      author_name: author.author_name,
      bio: author.bio,
      avatar: author.avatar,
      bookCount: (author as any).bookCount,
    }));
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOne({ 
        where: { author_id: id },
        relations: ['books'] // Also load all books by this author
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }


  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(author);
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    const author = await this.authorsRepository.preload({ author_id: id, ...updateAuthorDto });
    if (!author) throw new NotFoundException(`Author with ID ${id} not found`);
    return this.authorsRepository.save(author);
  }

  async remove(id: number): Promise<void> {
    const result = await this.authorsRepository.delete(id);
    if (result.affected === 0) { throw new NotFoundException(`Author with ID ${id} not found`); }
  }
}