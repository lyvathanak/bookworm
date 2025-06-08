import { IsString, IsNumber, IsOptional, IsInt, Length, IsEnum, Min } from 'class-validator';

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
  @Length(1, 255)
  title: string;

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
  
  @IsString()
  @IsOptional()
  image?: string;
  
  @IsEnum(BookType)
  booktype: BookType;
  
  @IsEnum(BookStatus)
  status: BookStatus;
  
  @IsInt()
  author_id: number;

  @IsString()
  @IsOptional()
  isbn?: string;

  @IsString()
  @IsOptional()
  edition_language?: string;

  @IsInt()
  @IsOptional()
  pages?: number;

  @IsString()
  @IsOptional()
  publisher?: string;
}
