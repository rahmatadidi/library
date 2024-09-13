import { Test, TestingModule } from '@nestjs/testing';

import { MembersController } from '../member.controller';
import { MembersService } from '@src/domain/members/services/member.service';

describe('BooksController', () => {
  let controller: MembersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MembersController],
      providers: [MembersService],
    }).compile();

    controller = module.get<MembersController>(MembersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
