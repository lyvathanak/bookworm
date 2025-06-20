import { IsString, IsEmail, IsOptional, Length, IsEnum } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  fname: string;

  @IsString()
  lname: string;

  @IsEmail()
  email: string;

  @Length(8, 100)
  password: string;
  
  // This allows the role to be specified during creation
  @IsEnum(UserRole)
  @IsOptional()
  role?: UserRole;

  @IsString() @IsOptional() phoneNum?: string;
  @IsString() @IsOptional() DOB?: string;
  @IsString() @IsOptional() address?: string;
  @IsString() @IsOptional() gender?: string;
}
