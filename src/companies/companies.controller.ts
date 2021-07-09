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
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { FindAllCompaniesDto } from './dto/findAll-company.dto';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  async create(@Body() data: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(data);
  }

  @Roles(Role.ADMIN, Role.BASIC)
  @Get()
  async findAll(
    @Param()
    params: FindAllCompaniesDto,
  ): Promise<Company[]> {
    return this.companiesService.findAll(params);
  }

  @Roles(Role.ADMIN, Role.BASIC)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.companiesService.findOne({ id: +id });
  }

  @Put(':id')
  async update(
    @Param('id') companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update({
      where: companyWhereUniqueInput,
      data: updateCompanyDto,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') companyWhereUniqueInput: Prisma.CompanyWhereUniqueInput,
  ) {
    return this.companiesService.remove(companyWhereUniqueInput);
  }
}
