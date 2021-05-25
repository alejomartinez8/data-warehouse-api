import { mockedJwtService } from './../utils/mocks/jwt.service';
import { PrismaModule } from './../prisma/prisma.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from './../users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        PassportModule,
        PrismaModule,
        JwtModule.register({
          secret: 'Secret Key',
          signOptions: { expiresIn: '1d' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        { provide: JwtService, useValue: mockedJwtService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Create a cookie', () => {
    it('should return a string', () => {
      const userId = 1;
      expect(typeof service.getCookieWithJwtToken(userId)).toEqual('string');
    });
  });
});
