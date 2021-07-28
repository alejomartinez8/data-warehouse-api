import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ContactsService } from './contacts.service';
import { Contact } from '@prisma/client';
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

  @Roles(Role.ADMIN, Role.BASIC)
  @Get()
  async findAll(
    @Query()
    query: FindAllContactsDto,
  ): Promise<Contact[]> {
    return this.contactsService.findAll(query);
  }

  @Roles(Role.ADMIN, Role.BASIC)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contactsService.findOne({ id });
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() contactUpdateInput: UpdateContactDto,
  ) {
    return this.contactsService.update({
      where: { id },
      data: contactUpdateInput,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contactsService.remove({ id });
  }
}
