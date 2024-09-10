import { Module } from '@nestjs/common';
import { BooksController } from 'src/controllers/books/books.controller';
import { BookService } from 'src/services/books/book.service';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BookService, PrismaService],
})
export class BooksModule {}
