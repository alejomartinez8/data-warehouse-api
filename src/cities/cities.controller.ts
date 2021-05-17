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
import { CitiesService } from './cities.service';
import { Prisma, City } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  async create(@Body() data: { name: string; country: number }): Promise<City> {
    return this.citiesService.create(data);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async findAll(@Param() params: FindAllDto): Promise<City[]> {
    return this.citiesService.findAll(params);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.citiesService.findOne({ id: +id });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() countryUpdateInput: Prisma.CityUpdateInput,
  ) {
    return this.citiesService.update({
      where: { id: +id },
      data: countryUpdateInput,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.citiesService.remove({ id: +id });
  }
}
