import { PrismaModule } from './../prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UsersService } from './../users/users.service';
import * as bcrypt from 'bcrypt';
import { User, Role } from '@prisma/client';

jest.mock('bcrypt');

const mockedUser: User = {
  id: '1',
  email: 'example@example.com',
  firstName: 'firstName',
  lastName: 'lastName',
  role: Role.BASIC,
  password: undefined,
};

describe('AuthService', () => {
  let authService: AuthService;
  let usersServices: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        PrismaModule,
        JwtModule.register({
          secret: 'Secret Key',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [
        UsersService,
        AuthService,
        LocalStrategy,
        JwtStrategy,
        {
          provide: JwtService,
          useValue: { sign: () => 'token' },
        },
      ],
    }).compile();

    usersServices = module.get<UsersService>(UsersService);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(usersServices).toBeDefined();
    expect(authService).toBeDefined();
  });

  it('Validating user should return an user with valid password', () => {
    jest
      .spyOn(usersServices, 'findOne')
      .mockImplementation(async ({}) => mockedUser);

    // mock valid password
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

    return expect(
      authService.validateUser('example@example.com', 'password'),
    ).resolves.toEqual(mockedUser);
  });

  it('Validation user should throw an Error with invalid password', () => {
    jest
      .spyOn(usersServices, 'findOne')
      .mockImplementation(async ({}) => mockedUser);

    // mock valid password
    jest.spyOn(bcrypt, 'compare').mockImplementation(async () => false);

    return expect(
      authService.validateUser('example@example.com', 'password'),
    ).rejects.toThrow();
  });

  it('should return Cookie With Jwt Token', async () => {
    const cookie = await authService.getCookieWithJwtToken(1);
    expect(cookie).toEqual("user=token; HttpOnly; Path=/; Max-Age='1d'");
  });

  it('should return Cookie void', async () => {
    const cookie = await authService.getCookieForLogout();
    expect(cookie).toEqual('user=; HttpOnly; Path=/; Max-Age=0');
  });

  it('should return a token', async () => {
    const token = await authService.getJwtToken(mockedUser);
    expect(token).toEqual({ token: 'token' });
  });
});
