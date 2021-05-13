import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';
import { JwtAuthGuard } from './../auth/jwt-auth-guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userCreateInput: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.create(userCreateInput);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@Param() params): Promise<User[]> {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.usersService.findOne({ id: +id });
  }

  @Put(':id')
  async update(
    @Param('id') id: Prisma.UserWhereUniqueInput,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update({
      where: { id: +id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.usersService.remove({ id: +id });
  }
}
