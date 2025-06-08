import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller() // No prefix, so we can define the full route path
export class PublicUsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body(new ValidationPipe()) createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    // Return a sanitized version of the user, without the password
    const { password, ...result } = user;
    return result;
  }
}
