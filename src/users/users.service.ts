import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return this.usersRepository.save(user);
  }

  // THIS IS THE CRITICAL FIX
  // We must tell TypeORM to include the 'orders' relation when fetching all users.
  findAll(): Promise<User[]> {
    return this.usersRepository.find({
      relations: ['orders'],
    });
  }

  async findOne(uid: number): Promise<User> {
    const user = await this.usersRepository.findOne({ where: { uid }, relations: ['orders', 'ratings'] });
    if (!user) { throw new NotFoundException(`User not found`); }
    return user;
  }
  
  async findOneByEmail(email: string): Promise<User | null> {
    const user = await this.usersRepository.findOne({ where: { email } });
    return user;
  }
  
  async update(uid: number, updateUserDto: UpdateUserDto): Promise<User> {
    await this.usersRepository.update(uid, updateUserDto);
    return this.findOne(uid);
  }

  async remove(uid: number): Promise<void> {
    await this.usersRepository.delete(uid);
  }
}
