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

  // The findAll and findOne methods are now much simpler.
  // They don't need to construct URLs because the full URL is already in the database.
  async findAll(): Promise<any[]> {
    return this.authorsRepository
      .createQueryBuilder('author')
      .loadRelationCountAndMap('author.bookCount', 'author.books')
      .getMany();
  }

  async findOne(id: number): Promise<Author> {
    const author = await this.authorsRepository.findOne({ 
        where: { author_id: id },
        relations: ['books']
    });
    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  // create, update, and remove methods remain the same.
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