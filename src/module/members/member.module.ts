import { Module } from '@nestjs/common';
import { MembersController } from '@src/application/members/controller/member.controller';
import { MembersService } from '@src/domain/members/services/member.service';
import { PrismaService } from '@src/infrastructure/prisma/prisma.service';

@Module({
  imports: [],
  controllers: [MembersController],
  providers: [MembersService, PrismaService],
})
export class MemberModule {}
