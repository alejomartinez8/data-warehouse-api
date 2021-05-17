import { FindAllDto } from '../common/dto/find-all.dto';
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
import { CountriesService } from './countries.service';
import { Prisma, Country } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  async create(
    @Body() data: { name: string; region: number },
  ): Promise<Country> {
    return this.countriesService.create(data);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async findAll(@Param() params: FindAllDto): Promise<Country[]> {
    return this.countriesService.findAll(params);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.countriesService.findOne({ id: +id });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() countryUpdateInput: Prisma.CountryUpdateInput,
  ) {
    return this.countriesService.update({
      where: { id: +id },
      data: countryUpdateInput,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.countriesService.remove({ id: +id });
  }
}
