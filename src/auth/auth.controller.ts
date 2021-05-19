import {
  Controller,
  Get,
  Post,
  UseGuards,
  HttpCode,
  Res,
  Req,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { User } from '@prisma/client';
import { RequestWithUser } from './interfaces/requestWithUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: RequestWithUser, @Res() res: Response) {
    const cookie = this.authService.getCookieWithJwtToken(req.user);
    res.setHeader('Set-Cookie', cookie);
    return res.send(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Req() req, @Res() res: Response) {
    res.setHeader('Set-Cookie', this.authService.getCookieForLogout());
    return res.sendStatus(200);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  auth(@Req() req) {
    const user: User = req.user;
    user.password = undefined;
    return user;
  }
}
