import { IsInt } from 'class-validator';

export class AddToWishlistDto {
  @IsInt()
  bookId: number;
}
