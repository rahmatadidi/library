import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { MembersService } from '../members/member.service';
import { BookService } from '../books/book.service';

type NewType = BookService;

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private membersService: MembersService,
    private booksService: NewType,
  ) {}

  async borrowBook(memberCode: string, bookCode: string) {
    const member = await this.membersService.findOneMember(memberCode);
    const book = await this.booksService.findOneBook(bookCode);

    if (!member || member.penalized)
      throw new BadRequestException('Member is penalized or not found');
    if (book.stock <= 0) throw new BadRequestException('Book is not available');

    await this.prisma.members.update({
      where: { code: memberCode },
      data: { borrowedBook: { connect: { code: bookCode } } },
    });

    await this.booksService.updateStock(bookCode, -1);

    return 'Book borrowed successfully';
  }

  async returnBook(memberCode: string, bookCode: string, daysLate: number) {
    const member = await this.membersService.findOneMember(memberCode);
    const book = await this.booksService.findOneBook(bookCode);

    if (!member || !book)
      throw new BadRequestException('Member or book not found');

    await this.prisma.members.update({
      where: { code: memberCode },
      data: { borrowedBook: { disconnect: { code: bookCode } } },
    });

    await this.booksService.updateStock(bookCode, 1);

    if (daysLate > 7) {
      await this.membersService.updatePenaltyStatus(memberCode, true);
    }

    return 'Book returned successfully';
  }
}
