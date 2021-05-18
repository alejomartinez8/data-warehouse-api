import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, Contact } from '@prisma/client';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.ContactCreateInput): Promise<Contact> {
    console.log(data);
    try {
      const contact = await this.prisma.contact.create({
        data,
      });

      if (contact) return contact;
    } catch (error) {
      throw error;
    }
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ContactWhereUniqueInput;
    where?: Prisma.ContactWhereInput;
    orderBy?: Prisma.ContactOrderByInput;
  }): Promise<Contact[]> {
    try {
      const { skip, take, cursor, where, orderBy } = params;
      return this.prisma.contact.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
        include: { city: true, channels: true },
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
    data: Prisma.ContactUpdateInput;
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
