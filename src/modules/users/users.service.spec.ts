import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;
  let fakeUserRepository: Partial<Repository<User>>;
  beforeEach(async () => {
    fakeUserRepository = {
      find: () => Promise.resolve([]),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: getRepositoryToken(User), useValue: fakeUserRepository },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
