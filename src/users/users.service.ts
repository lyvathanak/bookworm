import { Injectable, NotFoundException, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Not } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto'; // Import for changing password
import { User, UserRole } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async clearAllUsers(): Promise<void> {
    await this.usersRepository.delete({ role: Not(UserRole.ADMIN) });
    console.log('All non-admin users have been cleared.');
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.usersRepository.findOne({ where: { email: createUserDto.email } });
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
  
  /**
   * Finds a user by email and ensures the password field is selected.
   * This is critical for authentication.
   * @param email The user's email.
   * @returns The user object with the password, or null if not found.
   */
  async findOneByEmail(email: string): Promise<User | null> {
    // FIX: Use the query builder to explicitly select the password field.
    // This guarantees that the password hash is available for comparison in the AuthService.
    return this.usersRepository
      .createQueryBuilder('user')
      .where('user.email = :email', { email })
      .addSelect('user.password')
      .getOne();
  }

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

  async updateAvatar(userId: number, avatarPath: string): Promise<User> {
    const webPath = avatarPath.replace(/\\/g, '/').replace('storage/', '');
    await this.usersRepository.update(userId, { avatar: webPath });
    return this.findOne(userId);
  }

  findAll(): Promise<User[]> {
    return this.usersRepository.find({ relations: ['orders'] });
  }

  async findOne(uid: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ uid });
    if (!user) { throw new NotFoundException('User not found'); }
    return user;
  }

  async update(uid: number, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
    await this.usersRepository.update(uid, updateUserDto);
    return this.findOne(uid);
  }

  async remove(uid: number): Promise<void> {
    const result = await this.usersRepository.delete(uid);
    if (result.affected === 0) {
      throw new NotFoundException('User not found');
    }
  }
}
