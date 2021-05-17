import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, Country } from '@prisma/client';
import { FindAllDto } from '../common/dto/find-all.dto';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: { name: string; region: number }) {
    const { name, region } = data;

    try {
      const country = await this.prisma.country.create({
        data: {
          name,
          region: {
            connect: { id: region },
          },
        },
        include: {
          region: true,
        },
      });
      if (country) return country;
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: FindAllDto): Promise<Country[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.country.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: { region: true, city: true },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    countryWhereUniqueInput: Prisma.CountryWhereUniqueInput,
  ): Promise<Country> {
    const country = await this.prisma.country.findUnique({
      where: countryWhereUniqueInput,
    });

    if (country) return country;

    throw new HttpException('Country does not exist', HttpStatus.NOT_FOUND);
  }

  async update(params: {
    where: Prisma.CountryWhereUniqueInput;
    data: Prisma.CountryUpdateInput;
  }): Promise<Country> {
    const { where, data } = params;

    return this.prisma.country.update({
      data,
      where,
    });
  }

  remove(where: Prisma.CountryWhereUniqueInput): Promise<Country> {
    return this.prisma.country.delete({
      where,
    });
  }
}
