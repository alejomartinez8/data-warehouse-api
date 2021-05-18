import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, Company } from '@prisma/client';

@Injectable()
export class CompaniesService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.CompanyCreateInput) {
    try {
      const company = await this.prisma.company.create({
        data: {
          ...data,
          city: { connect: { id: data.city as number } },
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

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyWhereUniqueInput;
    where?: Prisma.CompanyWhereInput;
    orderBy?: Prisma.CompanyOrderByInput;
  }): Promise<Company[]> {
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
    data: Prisma.CompanyUpdateInput;
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
