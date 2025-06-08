import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

// Allows updating a subset of a user's properties
export class UpdateUserDto extends PartialType(CreateUserDto) {}
