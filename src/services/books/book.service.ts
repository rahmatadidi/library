import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllBooks() {
    return await this.prisma.books.findMany();
  }

  async findOneBook(code: string) {
    return await this.prisma.books.findUnique({ where: { code } });
  }
}
