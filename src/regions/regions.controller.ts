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
import { RegionsService } from './regions.service';
import { Prisma, Region } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('regions')
export class RegionsController {
  constructor(private readonly regionsService: RegionsService) {}

  @Post()
  async create(
    @Body() regionCreateInput: Prisma.RegionCreateInput,
  ): Promise<Region> {
    return this.regionsService.create(regionCreateInput);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async findAll(@Param() params: FindAllDto): Promise<Region[]> {
    return this.regionsService.findAll(params);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.regionsService.findOne({ id: +id });
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() regionUpdateInput: Prisma.RegionUpdateInput,
  ) {
    return this.regionsService.update({
      where: { id: +id },
      data: regionUpdateInput,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.regionsService.remove({ id: +id });
  }
}