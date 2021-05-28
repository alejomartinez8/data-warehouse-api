import { UpdateContactDto } from './dto/update-contact.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, Contact } from '@prisma/client';
import { CreateContactDto } from './dto/create-contact.dto';
import { FindAllContactsDto } from './dto/findAll-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDto): Promise<Contact> {
    const channels = data.channelIds?.map((channelId) => ({ channelId }));

    try {
      const contact = await this.prisma.contact.create({
        data: {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          interest: data.interest,
          address: data.address,
          position: data.position,
          city: { connect: { id: data.cityId } },
          company: { connect: { id: data.companyId } },
          channels: { create: channels },
        },
        include: { city: true, channels: true, company: true },
      });

      if (contact) return contact;
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: FindAllContactsDto): Promise<Contact[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.contact.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: {
          city: true,
          channels: { include: { channel: true } },
          company: true,
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(
    contactWhereUniqueInput: Prisma.ContactWhereUniqueInput,
  ): Promise<Contact> {
    const contact = await this.prisma.contact.findUnique({
      where: contactWhereUniqueInput,
    });

    if (contact) return contact;

    throw new HttpException('Contact does not exist', HttpStatus.NOT_FOUND);
  }

  async update(params: {
    where: Prisma.ContactWhereUniqueInput;
    data: UpdateContactDto;
  }): Promise<Contact> {
    const { where, data } = params;

    return this.prisma.contact.update({
      data,
      where,
    });
  }

  remove(where: Prisma.ContactWhereUniqueInput): Promise<Contact> {
    return this.prisma.contact.delete({
      where,
    });
  }
}
