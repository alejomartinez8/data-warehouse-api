import {
  Controller,
  Post,
  UseGuards,
  Request,
  HttpCode,
  Res,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth-guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res() res) {
    const cookie = this.authService.getCookieWithJwtToken(req.user);
    res.setHeader('Set-Cookie', cookie);
    return res.send(req.user);
  }
}
