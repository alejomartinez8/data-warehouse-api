import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, Country } from '@prisma/client';
import { FindAllCountriesDto } from './dto/findAll-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { CreateCountryDto } from './dto/create-country.dto';

@Injectable()
export class CountriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCountryDto) {
    const { name, regionId } = data;

    try {
      const country = await this.prisma.country.create({
        data: { name, region: { connect: { id: regionId } } },
        include: { region: true },
      });

      if (country) return country;
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: FindAllCountriesDto): Promise<Country[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.country.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: { region: true, cities: true },
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
    data: UpdateCountryDto;
  }): Promise<Country> {
    const { where, data } = params;

    return this.prisma.country.update({ data, where });
  }

  remove(where: Prisma.CountryWhereUniqueInput): Promise<Country> {
    return this.prisma.country.delete({
      where,
    });
  }
}
