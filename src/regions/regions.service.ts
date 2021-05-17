import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, Region } from '@prisma/client';
import { FindAllDto } from './dto/find-all.dto';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  async create(regionCreateInput: Prisma.RegionCreateInput) {
    try {
      const region = await this.prisma.region.create({
        data: regionCreateInput,
      });
      if (region) return region;
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(params: FindAllDto): Promise<Region[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.region.findMany({
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
    regionWhereUniqueInput: Prisma.RegionWhereUniqueInput,
  ): Promise<Region | null> {
    const region = await this.prisma.region.findUnique({
      where: regionWhereUniqueInput,
    });

    if (region) return region;

    throw new HttpException('Region does not exist', HttpStatus.NOT_FOUND);
  }

  async update(params: {
    where: Prisma.RegionWhereUniqueInput;
    data: Prisma.RegionUpdateInput;
  }): Promise<Region> {
    const { where, data } = params;

    return this.prisma.region.update({
      data,
      where,
    });
  }

  remove(where: Prisma.RegionWhereUniqueInput): Promise<Region> {
    return this.prisma.region.delete({
      where,
    });
  }
}
