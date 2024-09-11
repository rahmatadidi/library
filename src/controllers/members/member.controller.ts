import { Controller, Get, Param } from '@nestjs/common';
import { MembersService } from 'src/services/members/member.service';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  @Get()
  findAll() {
    return this.membersService.findAllMember();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.membersService.findOneMember(code);
  }
}
