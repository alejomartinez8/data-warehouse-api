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
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() body: CreateContactDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (body.channels) {
      body.channels = JSON.parse(body.channels as string);
    }

    if (file) {
      const result = await this.contactsService.uploadImageToCloudinary(file);
      body.avatar = result.secure_url;
      body.cloudinaryId = result.public_id;
    }

    return this.contactsService.create(body);
  }

  @Roles(Role.ADMIN, Role.BASIC)
  @Get()
  async findAll(@Query() query?) {
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
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const contact = await this.contactsService.findOne({ id });

    if (contact.cloudinaryId) {
      await this.contactsService.destroyImage(contact.cloudinaryId);
    }

    if (file) {
      const result = await this.contactsService.uploadImageToCloudinary(file);
      body.avatar = result.secure_url || contact.avatar;
      body.cloudinaryId = result.public_id || contact.cloudinaryId;
    }

    if (body.channels) {
      body.channels = JSON.parse(body.channels);
    }

    return this.contactsService.update({
      where: { id },
      data: body,
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const contact = await this.contactsService.findOne({ id });

    if (contact.cloudinaryId) {
      await this.contactsService.destroyImage(contact.cloudinaryId);
    }

    return this.contactsService.remove({ id });
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(@UploadedFile() file: Express.Multer.File) {
    return this.contactsService.uploadImageToCloudinary(file);
  }
}
