import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
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

  // THIS IS THE DEFINITIVE, WORKING CREATE METHOD
  async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if user with this email already exists
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    // 1. Hash the plain-text password from the DTO
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    // 2. Create a new user entity object with the HASHED password
    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    
    // 3. Save the new user to the database
    return this.usersRepository.save(user);
  }
  
  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // All other methods remain the same...
  findAll(): Promise<User[]> { return this.usersRepository.find({relations: ['orders']}); }
  async findOne(uid: number): Promise<User> { const user = await this.usersRepository.findOneBy({ uid }); if (!user) { throw new NotFoundException(`User not found`); } return user; }
  async update(uid: number, updateUserDto: UpdateUserDto): Promise<User> { await this.usersRepository.update(uid, updateUserDto); return this.findOne(uid); }
  async remove(uid: number): Promise<void> { await this.usersRepository.delete(uid); }
}
