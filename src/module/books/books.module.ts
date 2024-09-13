import { Module } from '@nestjs/common';
import { BookService } from 'src/domain/books/services/book.service';
import { BooksController } from 'src/application/books/controller/book.controller';
import { PrismaService } from '@src/infrastructure/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [BooksController],
  providers: [BookService, PrismaService],
})
export class BooksModule {}
