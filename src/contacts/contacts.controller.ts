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
  Res,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ContactsService } from './contacts.service';
import { Contact } from '@prisma/client';
import { RolesGuard } from 'src/auth/guards/role.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Role, Roles } from 'src/auth/decorators/roles.decorator';
import { CreateContactDto } from './dto/create-contact.dto';
import { FindAllContactsDto } from './dto/findAll-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Parser } from 'json2csv';
import { Response } from 'express';

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
  @Get('/csv')
  async findAllCVS(
    @Res() res: Response,
    @Query()
    query: FindAllContactsDto,
  ): Promise<any> {
    try {
      const contacts = await this.contactsService.findAll(query);

      const csvFields = [
        'firstName',
        'lastName',
        'email',
        'position',
        'intereset',
        'company',
        'region',
        'country',
        'city',
      ];

      const data = contacts.map((item) => ({
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        position: item.position,
        interest: item.interest,
        company: item.company.name,
        region: item.city?.country?.region?.name,
        country: item.city?.country?.name,
        city: item.city?.name,
      }));

      const json2csv = new Parser({ csvFields });
      const csv = json2csv.parse(data);

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=contacts.csv');

      return res.status(200).send(csv);
    } catch (error) {
      throw error;
    }
  }

  @Roles(Role.ADMIN, Role.BASIC)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.contactsService.findOne({ id });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() body: UpdateContactDto) {
    console.log(id, body);
    return this.contactsService.update({
      where: { id },
      data: body,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.contactsService.remove({ id });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.contactsService.uploadImageToCloudinary(file);
  }
}
