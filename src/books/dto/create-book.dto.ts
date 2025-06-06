import { Author } from "src/authors/entities/author.entity";

export class CreateBookDto {
    title: string;
    category: string;
    price: number;
    type: string;
    author: Author;
}