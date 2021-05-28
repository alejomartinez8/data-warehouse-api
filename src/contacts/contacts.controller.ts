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
import { ContactsService } from './contacts.service';
import { Prisma, Contact } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CreateContactDto } from './dto/create-contact.dto';
import { FindAllContactsDto } from './dto/findAll-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@Roles(Role.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  async create(@Body() data: CreateContactDto): Promise<Contact> {
    return this.contactsService.create(data);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get()
  async findAll(
    @Param()
    params: FindAllContactsDto,
  ): Promise<Contact[]> {
    return this.contactsService.findAll(params);
  }

  @Roles(Role.ADMIN, Role.USER)
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.contactsService.findOne({ id: +id });
  }

  @Put(':id')
  async update(
    @Param('id') companyWhereUniqueInput: Prisma.ContactWhereUniqueInput,
    @Body() countryUpdateInput: UpdateContactDto,
  ) {
    return this.contactsService.update({
      where: companyWhereUniqueInput,
      data: countryUpdateInput,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.contactsService.remove({ id: Number(id) });
  }
}
