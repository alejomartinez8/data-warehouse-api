import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Prisma, Company } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() data: Prisma.CompanyCreateInput): Promise<Company> {
    return this.companiesService.create(data);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async findAll(
    @Param()
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.CompanyWhereUniqueInput;
      where?: Prisma.CompanyWhereInput;
      orderBy?: Prisma.CompanyOrderByInput;
    },
  ): Promise<Company[]> {
    return this.companiesService.findAll(params);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.companiesService.findOne({ id: +id });
  }

  @Put(':id')
  async update(
    @Param('id') companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
    @Body() countryUpdateInput: Prisma.CompanyUpdateInput,
  ) {
    return this.companiesService.update({
      where: companyWhereUniqueInput,
      data: countryUpdateInput,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
  ) {
    return this.companiesService.remove(companyWhereUniqueInput);
  }
}
