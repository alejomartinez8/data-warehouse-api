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
import { ChannelsService } from './channels.service';
import { Prisma, Channel } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('channels')
export class ChannelsController {
  constructor(private readonly channelsService: ChannelsService) {}

  @Post()
  async create(@Body() data: Prisma.ChannelCreateInput): Promise<Channel> {
    return this.channelsService.create(data);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async findAll(
    @Param()
    params: {
      skip?: number;
      take?: number;
      cursor?: Prisma.ChannelWhereUniqueInput;
      where?: Prisma.ChannelWhereInput;
      orderBy?: Prisma.ChannelOrderByInput;
    },
  ): Promise<Channel[]> {
    return this.channelsService.findAll(params);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.channelsService.findOne({ id: +id });
  }

  @Put(':id')
  async update(
    @Param('id') companyWhereUniqueInput: Prisma.ChannelWhereUniqueInput,
    @Body() countryUpdateInput: Prisma.ChannelUpdateInput,
  ) {
    return this.channelsService.update({
      where: companyWhereUniqueInput,
      data: countryUpdateInput,
    });
  }

  @Delete(':id')
  async remove(
    @Param('id') companyWhereUniqueInput: Prisma.ChannelWhereUniqueInput,
  ) {
    return this.channelsService.remove(companyWhereUniqueInput);
  }
}
