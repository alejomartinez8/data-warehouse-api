import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, Company } from '@prisma/client';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FindAllCompaniesDto } from './dto/findAll-company.dto';
import { queryWithRelations, sortWithRelations } from './utils/companies.util';

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

  async findAll(query: FindAllCompaniesDto): Promise<Company[]> {
    try {
      const orderBy = sortWithRelations(
        query.orderBy,
        query.order as Prisma.SortOrder,
      );
      const where = queryWithRelations(query.searchQuery);

      return this.prisma.company.findMany({
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
      where,
      data,
    });
  }

  remove(where: Prisma.CompanyWhereUniqueInput): Promise<Company> {
    return this.prisma.company.delete({
      where,
    });
  }
}
