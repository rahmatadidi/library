import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async findAllMember() {
    return this.prisma.members.findMany();
  }

  async findOneMember(code: string) {
    return this.prisma.members.findUnique({ where: { code } });
  }

  async updatePenaltyStatus(code: string, penalized: boolean) {
    return this.prisma.members.update({
      where: { code },
      data: { penalized },
    });
  }

  async memberWithBook(code: string) {
    return this.prisma.members.findUnique({
      where: { code },
      include: {
        borrowedBook: true,
      },
    });
  }
}
