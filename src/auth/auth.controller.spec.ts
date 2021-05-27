import { UsersService } from './../users/users.service';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import * as request from 'supertest';
import * as bcrypt from 'bcrypt';
import * as cookieParser from 'cookie-parser';
import { Role, User } from '@prisma/client';

describe('AuthController', () => {
  let app: INestApplication;
  let user: User;
  let cookie = [''];

  beforeEach(async () => {
    user = {
      id: 1,
      email: 'example@example.com',
      firstName: 'firstName',
      lastName: 'lastName',
      role: Role.USER,
      password: bcrypt.hashSync('password', 10),
    };

    const module: TestingModule = await Test.createTestingModule({
      imports: [
        PassportModule,
        JwtModule.register({
          secret: process.env.JWT_SECRET,
          signOptions: { expiresIn: '1d' },
        }),
      ],
      controllers: [AuthController],
      providers: [
        LocalStrategy,
        JwtStrategy,
        AuthService,
        {
          provide: UsersService,
          useValue: { findOne: jest.fn().mockResolvedValue(user) },
        },
      ],
    }).compile();

    app = module.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    app.use(cookieParser());
    await app.init();
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  it('should return cookie with token when login', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'user@example.com', password: 'password' });

    delete user.password;

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body).toEqual(user);
    cookie = response.headers['set-cookie'];
  });

  it('should return profile with cookie', () => {
    return request(app.getHttpServer())
      .get('/auth/profile')
      .set('Cookie', cookie)
      .expect(HttpStatus.OK);
  });

  it('should detect that we are not logged in', () => {
    return request(app.getHttpServer())
      .get('/auth/profile')
      .expect(HttpStatus.UNAUTHORIZED);
  });

  it('should return cookie without token when logout', () => {
    return request(app.getHttpServer())
      .post('/auth/logout')
      .set('Cookie', cookie)
      .expect(200);
  });
});
