import {
  queryUsersWithRelations,
  sortUsersWithRelations,
} from './utils/users.util';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.services';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    data.password = await bcrypt.hash(data.password, 10);

    return this.prisma.user.create({ data });
  }

  async findAll(query?): Promise<User[]> {
    const where = queryUsersWithRelations(query.searchQuery);
    const orderBy = sortUsersWithRelations(query.orderBy, query.order);

    return this.prisma.user.findMany({ where, orderBy });
  }

  async findOne(
    userWhereUniqueInput: Prisma.UserWhereUniqueInput,
  ): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: userWhereUniqueInput,
    });

    if (user) return user;
    throw new HttpException('User does not exist', HttpStatus.NOT_FOUND);
  }

  async update(params: {
    where: Prisma.UserWhereUniqueInput;
    data: UpdateUserDto;
  }): Promise<User> {
    const { where, data } = params;

    if (data.password)
      data.password = await bcrypt.hash(String(data.password), 10);
    return this.prisma.user.update({
      data,
      where,
    });
  }

  remove(where: Prisma.UserWhereUniqueInput): Promise<User> {
    return this.prisma.user.delete({
      where,
    });
  }
}
