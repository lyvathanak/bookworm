import { IsInt } from 'class-validator';
import { CreateOrderDto } from './create-order.dto';

// This new DTO extends the existing one and adds the userId field.
export class AdminCreateOrderDto extends CreateOrderDto {
  @IsInt()
  userId: number;
}