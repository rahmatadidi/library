import { Test, TestingModule } from '@nestjs/testing';
import { MembersService } from '../member.service';
import { MembersController } from '@src/application/members/controller/member.controller';

describe('MembersService', () => {
  let service: MembersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MembersService],
      controllers: [MembersController],
    }).compile();

    service = module.get<MembersService>(MembersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
