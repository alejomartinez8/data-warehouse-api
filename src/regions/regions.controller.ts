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
import { RegionsService } from './regions.service';
import { Region } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { UpdateRegionDto } from './dto/update-region.dto';
import { CreateRegionDto } from './dto/create-region.dto';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  async create(@Body() createRegionDto: CreateRegionDto): Promise<Region> {
    return this.regionsService.create(createRegionDto);
  }

  @Roles(Role.ADMIN, Role.BASIC)
  @Get()
  async findAll(): Promise<Region[]> {
    return this.regionsService.findAll();
  }

  @Roles(Role.ADMIN, Role.BASIC)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.regionsService.findOne({ id });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRegionDto: UpdateRegionDto,
  ) {
    return this.regionsService.update({
      where: { id },
      data: updateRegionDto,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.regionsService.remove({ id });
  }
}
