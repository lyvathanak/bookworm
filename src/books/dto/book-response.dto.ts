// In: src/books/dto/book-response.dto.ts

class BookAuthorResponseDto {
  author_id: number;
  author_name: string;
}

export class BookResponseDto {
  bid: number;
  title: string;
  price: number;
  stock: number;
  status: string;
  image: string;
  genre: string;
  
  // THIS IS THE FIX: We add "| null" to allow the author to be null
  author: BookAuthorResponseDto | null;
}