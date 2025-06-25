import { IsString, IsNumber, IsOptional, IsInt, IsEnum, Min, IsUrl } from 'class-validator'; // <-- FIX: Added IsUrl here

enum BookType {
    PHYSICAL = 'Physical',
    EBOOK = 'E-book',
}
enum BookStatus {
    ACTIVE = 'Active',
    DRAFT = 'Draft',
}

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;
  
  @IsString()
  @IsOptional()
  genre?: string;

  @IsInt()
  @IsOptional()
  published_year?: number;
  
  @IsInt()
  @Min(0)
  stock: number;
  
  @IsUrl()
  @IsOptional()
  image?: string;
  
  @IsEnum(BookType)
  booktype: BookType;
  
  @IsEnum(BookStatus)
  @IsOptional()
  status: BookStatus;
  
  @IsInt()
  author_id: number;

  @IsString()
  @IsOptional()
  isbn?: string;
}