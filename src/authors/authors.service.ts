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

  create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const author = this.authorsRepository.create(createAuthorDto);
    return this.authorsRepository.save(author);
  }

  findAll(): Promise<Author[]> {
    return this.authorsRepository.find({ relations: ['books'] });
  }

  async findOne(id: number): Promise<Author> {
    // Add the 'relations' option here to fetch the author's books
    const author = await this.authorsRepository.findOne({
      where: { author_id: id },
      relations: ['books'], 
    });

    if (!author) {
      throw new NotFoundException(`Author with ID ${id} not found`);
    }
    return author;
  }

  async update(id: number, updateAuthorDto: UpdateAuthorDto): Promise<Author> {
    await this.authorsRepository.update(id, updateAuthorDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.authorsRepository.delete(id);
    if (result.affected === 0) { throw new NotFoundException(`Author with ID ${id} not found`);}
  }
}