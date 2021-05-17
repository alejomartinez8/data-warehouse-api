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
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() userCreateInput: Prisma.UserCreateInput): Promise<User> {
    return this.usersService.create(userCreateInput);
  }

  @Get()
  async findAll(@Param() params): Promise<User[]> {
    return this.usersService.findAll(params);
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.usersService.findOne({ id: +id });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: Prisma.UserUpdateInput,
  ) {
    return this.usersService.update({
      where: { id: +id },
      data: updateUserDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.usersService.remove({ id: +id });
  }
}
