import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import * as cookie from 'cookie';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    try {
      const user = await this.usersService.findOne({ email });
      await this.verifyPassword(password, user.password);
      user.password = undefined;
      return user;
    } catch (error) {
      throw new HttpException(
        'Email or password are incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  private async verifyPassword(password: string, hashedPassword: string) {
    if (!(await bcrypt.compare(password, hashedPassword))) {
      throw new HttpException(
        'Email or password are incorrect',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  public getCookieWithJwtToken(id: string) {
    const payload = { sub: id };
    const token = this.jwtService.sign(payload);

    const dev = process.env.NODE_ENV !== 'production';

    const _cookie = String(
      cookie.serialize('user', token, {
        // httpOnly: true,
        sameSite: 'lax',
        // secure: !dev,
        maxAge: 3600,
        path: '/',
      }),
    );

    return _cookie;
  }

  public getCookieForLogout() {
    return `user=; HttpOnly; Path=/; Max-Age=0`;
  }

  public async getJwtToken(user: User) {
    const payload = { sub: user.id };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
