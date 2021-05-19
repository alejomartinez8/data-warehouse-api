import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, City } from '@prisma/client';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { FindAllCitiesDto } from './dto/findAll-city.dto';

@Injectable()
export class CitiesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCityDto) {
    const { name, countryId } = data;

    try {
      const city = await this.prisma.city.create({
        data: {
          name,
          country: {
            connect: { id: countryId },
          },
        },
        include: {
          country: true,
        },
      });
      if (city) return city;
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: FindAllCitiesDto): Promise<City[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.city.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: { country: { include: { region: true } } },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    cityWhereUniqueInput: Prisma.CityWhereUniqueInput,
  ): Promise<City> {
    const city = await this.prisma.city.findUnique({
      where: cityWhereUniqueInput,
    });

    if (city) return city;

    throw new HttpException('City does not exist', HttpStatus.NOT_FOUND);
  }

  async update(params: {
    where: Prisma.CityWhereUniqueInput;
    data: UpdateCityDto;
  }): Promise<City> {
    const { where, data } = params;

    return this.prisma.city.update({
      data,
      where,
    });
  }

  remove(where: Prisma.CityWhereUniqueInput): Promise<City> {
    return this.prisma.city.delete({
      where,
    });
  }
}
