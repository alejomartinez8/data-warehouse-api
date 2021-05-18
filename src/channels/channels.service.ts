import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, Channel } from '@prisma/client';

@Injectable()
export class ChannelsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ChannelCreateInput) {
    try {
      const channel = await this.prisma.channel.create({
        data,
      });
      if (channel) return channel;
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ChannelWhereUniqueInput;
    where?: Prisma.ChannelWhereInput;
    orderBy?: Prisma.ChannelOrderByInput;
  }): Promise<Channel[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.channel.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    channelWhereUniqueInput: Prisma.ChannelWhereUniqueInput,
  ): Promise<Channel> {
    const channel = await this.prisma.channel.findUnique({
      where: channelWhereUniqueInput,
    });

    if (channel) return channel;

    throw new HttpException('Channel does not exist', HttpStatus.NOT_FOUND);
  }

  async update(params: {
    where: Prisma.ChannelWhereUniqueInput;
    data: Prisma.ChannelUpdateInput;
  }): Promise<Channel> {
    const { where, data } = params;

    return this.prisma.channel.update({
      data,
      where,
    });
  }

  remove(where: Prisma.ChannelWhereUniqueInput): Promise<Channel> {
    return this.prisma.channel.delete({
      where,
    });
  }
}
