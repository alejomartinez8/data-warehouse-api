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
import { Country } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { FindAllCountriesDto } from './dto/findAll-country.dto';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('countries')
export class CountriesController {
  constructor(private readonly countriesService: CountriesService) {}

  @Post()
  async create(@Body() createCountryDto: CreateCountryDto): Promise<Country> {
    return this.countriesService.create(createCountryDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async findAll(@Param() params: FindAllCountriesDto): Promise<Country[]> {
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
    @Body() updateCountryDto: UpdateCountryDto,
  ) {
    return this.countriesService.update({
      where: { id: Number(id) },
      data: updateCountryDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.countriesService.remove({ id: Number(id) });
  }
}
