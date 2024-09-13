import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '@src/infrastructure/prisma/prisma.service';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async findAllBooks() {
    return this.prisma.books.findMany({
      include: {
        borrowedBy: true,
      },
    });
  }

  async findOneBook(code: string) {
    return this.prisma.books.findUnique({
      where: { code },
      include: {
        borrowedBy: true,
      },
    });
  }

  async borrowBook(memberId: string, bookId: string) {
    await this.prisma.$transaction(async (prisma) => {
      const member = await prisma.members.findUnique({
        where: { code: memberId },
      });
      if (!member) throw new NotFoundException('Member not found');

      if (member.penalized && new Date() < new Date(member.penaltyEnd)) {
        throw new BadRequestException('Member is currently penalized');
      }

      const borrowedBooksCount = await prisma.books.count({
        where: { borrowedById: memberId },
      });
      if (borrowedBooksCount >= 1) {
        throw new BadRequestException('Cannot borrow more than 1 books');
      }

      const book = await prisma.books.findUnique({ where: { code: bookId } });
      if (!book) throw new NotFoundException('Book not found');
      if (book.stock <= 0)
        throw new BadRequestException('Book is not available');

      await prisma.books.update({
        where: { code: bookId },
        data: { stock: book.stock - 1, borrowedById: memberId },
      });

      await prisma.members.update({
        where: { code: memberId },
        data: { borrowedBook: { connect: { code: bookId } } },
      });
    });
  }

  async returnBook(memberId: string, bookId: string) {
    await this.prisma.$transaction(async (prisma) => {
      const member = await prisma.members.findUnique({
        where: { code: memberId },
      });
      if (!member) throw new NotFoundException('Member not found');

      const book = await prisma.books.findUnique({
        where: { code: bookId },
        include: { borrowedBy: true },
      });
      if (!book) throw new NotFoundException('Book not found');
      if (book.borrowedById !== memberId) {
        throw new BadRequestException(
          'This book was not borrowed by this member',
        );
      }

      await prisma.books.update({
        where: { code: bookId },
        data: { stock: book.stock + 1, borrowedById: null },
      });

      await prisma.members.update({
        where: { code: memberId },
        data: { borrowedBook: { disconnect: { code: bookId } } },
      });

      const borrowDate = new Date();
      const daysLate = Math.floor(
        (new Date().getTime() - borrowDate.getTime()) / (1000 * 60 * 60 * 24),
      );
      if (daysLate > 7) {
        const penaltyEnd = new Date();
        penaltyEnd.setDate(penaltyEnd.getDate() + 3); // 3 days penalty
        await prisma.members.update({
          where: { code: memberId },
          data: { penalized: true, penaltyEnd },
        });
      }
    });
  }
}
