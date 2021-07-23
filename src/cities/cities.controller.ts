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
import { CitiesService } from './cities.service';
import { City } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { FindAllCitiesDto } from './dto/findAll-city.dto';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async create(@Body() createCityDto: CreateCityDto): Promise<City> {
    return this.citiesService.create(createCityDto);
  }

  @Roles(Role.ADMIN, Role.BASIC)
  @Get()
  async findAll(@Param() params: FindAllCitiesDto): Promise<City[]> {
    return this.citiesService.findAll(params);
  }

  @Roles(Role.ADMIN, Role.BASIC)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.citiesService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCityDto: UpdateCityDto) {
    return this.citiesService.update({
      where: { id },
      data: updateCityDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.citiesService.remove({ id });
  }
}
