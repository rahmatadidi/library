import { Injectable } from '@nestjs/common';
import { PrismaService } from '@src/infrastructure/prisma/prisma.service';

@Injectable()
export class MembersService {
  constructor(private prisma: PrismaService) {}

  async findAllMember() {
    return this.prisma.members.findMany({
      include: {
        borrowedBook: true,
      },
    });
  }

  async findOneMember(code: string) {
    return this.prisma.members.findUnique({
      where: { code },
      include: {
        borrowedBook: true,
      },
    });
  }
}
