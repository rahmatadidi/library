import { Controller, Post, Param, Body, Get } from '@nestjs/common';
import { BookService } from '@src/domain/books/services/book.service';

@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  findAll() {
    return this.bookService.findAllBooks();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.bookService.findOneBook(code);
  }

  @Post('borrow/:memberId/:bookId')
  async borrowBook(
    @Param('memberId') memberId: string,
    @Param('bookId') bookId: string,
  ) {
    await this.bookService.borrowBook(memberId, bookId);
    return { message: 'Book borrowed successfully' };
  }

  @Post('return/:memberId/:bookId')
  async returnBook(
    @Param('memberId') memberId: string,
    @Param('bookId') bookId: string,
  ) {
    await this.bookService.returnBook(memberId, bookId);
    return { message: 'Book returned successfully' };
  }
}
