import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from '../book.controller';
import { BookService } from '@src/domain/books/services/book.service';

describe('BooksController', () => {
  let booksController: BooksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BookService],
    }).compile();

    booksController = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(booksController).toBeDefined();
  });
});
