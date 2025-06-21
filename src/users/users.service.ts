import {
  Injectable,
  NotFoundException,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // ✅ Create a new user with hashed password
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({
      where: { email: createUserDto.email },
    });

    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

    const user = this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.usersRepository.save(user);
  }

  // 🔍 Find user by email
  async findOneByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  // 🔒 Change user password securely
  async changePassword(userId: number, changePasswordDto: ChangePasswordDto): Promise<void> {
    const user = await this.usersRepository.findOneBy({ uid: userId });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const isPasswordMatching = await bcrypt.compare(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordMatching) {
      throw new UnauthorizedException('Wrong current password');
    }

    const hashedNewPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
    await this.usersRepository.update(userId, { password: hashedNewPassword });
  }

  // 🖼️ Update user's avatar path
  async updateAvatar(userId: number, avatarPath: string): Promise<User> {
    const webPath = avatarPath.replace('storage/', '');
    await this.usersRepository.update(userId, { avatar: webPath });
    return this.findOne(userId);
  }

  // 📜 Get all users with their orders
  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['orders'] });
  }

  // 🔍 Find user by UID
  async findOne(uid: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ uid });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  // 🛠️ Update user info and hash new password if provided
  async update(uid: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    await this.usersRepository.update(uid, updateUserDto);
    return this.findOne(uid);
  }

  // ❌ Delete a user
  async remove(uid: number): Promise<void> {
    await this.usersRepository.delete(uid);
  }
}
