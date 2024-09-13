import { Test, TestingModule } from '@nestjs/testing';

import { BookService } from '../book.service';
import { BooksController } from '@src/application/books/controller/book.controller';

describe('BookService', () => {
  let service: BookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookService],
      controllers: [BooksController],
    }).compile();

    service = module.get<BookService>(BookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
