import { Controller, Get, Param } from '@nestjs/common';
import { BookService } from 'src/services/books/book.service';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BookService) {}

  @Get()
  findAll() {
    return this.booksService.findAllBooks();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.booksService.findOneBook(code);
  }
}
