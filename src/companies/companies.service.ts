import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, Company } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FindAllCompaniesDto } from './dto/findAll-company.dto';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCompanyDto) {
    try {
      const company = await this.prisma.company.create({
        data: {
          name: data.name,
          email: data.email,
          address: data.address,
          phone: data.phone,
          city: { connect: { id: data.cityId } },
        },
        include: {
          city: true,
        },
      });
      if (company) return company;
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: FindAllCompaniesDto): Promise<Company[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.company.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          city: { include: { country: { include: { region: true } } } },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
  ): Promise<Company> {
    const company = await this.prisma.company.findUnique({
      where: companyWhereUniqueInput,
    });

    if (company) return company;

    throw new HttpException('Company does not exist', HttpStatus.NOT_FOUND);
  }

  async update(params: {
    where: Prisma.CompanyWhereUniqueInput;
    data: UpdateCompanyDto;
  }): Promise<Company> {
    const { where, data } = params;

    return this.prisma.company.update({
      data,
      where,
    });
  }

  remove(where: Prisma.CompanyWhereUniqueInput): Promise<Company> {
    return this.prisma.company.delete({
      where,
    });
  }
}
