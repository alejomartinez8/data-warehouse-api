import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from './loca-auth-guard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return req.user;
  }
}
