import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userCreateInput: Prisma.UserCreateInput) {
    return this.usersService.create(userCreateInput);
  }

  @Get()
  findAll(@Param() params) {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  findOne(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.usersService.findOne({ id: +id });
  }

  @Put(':id')
  update(
    @Param('id') id: Prisma.UserWhereUniqueInput,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update({
      where: { id: +id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  remove(@Param('id') id: Prisma.UserWhereUniqueInput) {
    return this.usersService.remove({ id: +id });
  }
}
