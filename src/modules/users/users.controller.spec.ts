import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { User } from './user.entity';

describe('UserController', () => {
  let fakeUserService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;
  let controller: UsersController;

  beforeEach(async () => {
    (fakeUserService = {
      findByEmail: (email: string) =>
        Promise.resolve([{ email, id: '1', name: 'test' }] as User[]),

      findOne: (id: number) =>
        Promise.resolve({
          id: id.toString(),
          email: 'test@test.com',
          password: 'test',
          name: 'test',
        } as User),
    }),
      (fakeAuthService = {
        login: ({ email, password }: { email: string; password: string }) =>
          Promise.resolve({ id: '1', email, password } as User),
        register: ({
          email,
          password,
          name,
        }: {
          email: string;
          password: string;
          name: string;
        }) => Promise.resolve({ id: '1', email, password, name } as User),
      });

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUserService,
        },
        {
          provide: AuthService,
          useValue: fakeAuthService,
        },
      ],
    }).compile();
    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
  describe('auth', () => {
    it('register update session and return user', async () => {
      const session = { userId: -1 };
      const user = await controller.createUser(
        { email: 'test@test.com', password: 'test', name: 'test' },
        session,
      );
      expect(user.id).toEqual('1');
      expect(session.userId).toEqual('1');
    });
    it('login update session and return user', async () => {
      const session = { userId: -1 };
      const user = await controller.loginUser(
        { email: 'test@test.com', password: 'test' },
        session,
      );
      expect(user.id).toEqual('1');
      expect(session.userId).toEqual('1');
    });
  });
});
