import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException } from '../common/exceptions/bad-request.exception';

describe('AuthService', () => {
  let service: AuthService;
  let fakeUserService: Partial<UsersService>;
  beforeEach(async () => {
    const users: User[] = [];

    fakeUserService = {
      findByEmail: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: ({
        name,
        email,
        password,
      }: {
        name: string;
        email: string;
        password: string;
      }) => {
        const newUser = {
          id: Math.random().toString(),
          email,
          name,
          password,
        } as User;
        users.push(newUser);
        return Promise.resolve(newUser);
      },
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('can create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });
  describe('register', () => {
    it('create user with salted and hashed password', async () => {
      const user = await service.register({
        name: 'test',
        email: 'test@test.com',
        password: 'test',
      });
      expect(user.password).not.toEqual('test');
    });

    it('throws an error if user exist', async () => {
      //   fakeUserService.findByEmail = () =>
      //     Promise.resolve([{ id: '1', email: 'test@test.com' } as User]);
      await service.register({
        name: 'test',
        email: 'test@test.com',
        password: 'test',
      });
      await expect(
        service.register({
          name: 'test',
          email: 'test@test.com',
          password: 'test',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
  describe('login', () => {
    it('login successfully if credentials are valid', async () => {
      await service.register({
        name: 'test',
        email: 'test@test.com',
        password: 'test',
      });
      const user = await service.login({
        email: 'test@test.com',
        password: 'test',
      });
      expect(user).toBeDefined();
    });

    it('throws an error if user does not exist', async () => {
      await expect(
        service.login({
          email: 'new@test.com',
          password: 'test',
        }),
      ).rejects.toThrow(BadRequestException);
    });

    it('throws an error if credentials are invalid', async () => {
      await service.register({
        name: 'test',
        email: 'test@test.com',
        password: 'password',
      });
      await expect(
        service.login({
          email: 'test@test.com',
          password: 'test',
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });
});
