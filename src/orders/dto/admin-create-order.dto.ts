// Create this new file
import { IsArray, IsInt, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateOrderDto } from './create-order.dto';

// Inherit items and address from the public DTO
export class AdminCreateOrderDto extends CreateOrderDto {
  @IsInt()
  userId: number;
}