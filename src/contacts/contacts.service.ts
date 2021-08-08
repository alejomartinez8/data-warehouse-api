import { queryWithRelations, sortWithRelations } from './utils/contacts.util';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.services';
import { Prisma, PreferedChanel } from '@prisma/client';
import { CreateContactDto } from './dto/create-contact.dto';
import { FindAllContactsDto } from './dto/findAll-contact.dto';

@Injectable()
export class ContactsService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateContactDto) {
    const channels: Prisma.ChannelsOnContactsCreateNestedManyWithoutContactInput = {
      create: data.channels.map((channel) => ({
        account: channel.account,
        preference: channel.preference
          ? (channel.preference as PreferedChanel)
          : PreferedChanel.NO_PREFERENCE,
        channel: { connect: { id: channel.channelId } },
      })),
    };

    return this.prisma.contact.create({
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        interest: data.interest,
        position: data.position,
        city: data.cityId ? { connect: { id: data.cityId } } : undefined,
        company: data.companyId
          ? { connect: { id: data.companyId } }
          : undefined,
        channels,
      },
      include: { city: true, channels: true, company: true },
    });
  }

  async findAll(query: FindAllContactsDto) {
    const orderBy = sortWithRelations(query.orderBy, query.order);
    const where = queryWithRelations(query.searchQuery);

    return this.prisma.contact.findMany({
      where,
      orderBy,
      include: {
        city: { include: { country: { include: { region: true } } } },
        channels: { include: { channel: true } },
        company: true,
      },
    });
  }

  async findOne(contactWhereUniqueInput: Prisma.ContactWhereUniqueInput) {
    const contact = await this.prisma.contact.findUnique({
      where: contactWhereUniqueInput,
    });

    if (contact) return contact;

    throw new HttpException('Contact does not exist', HttpStatus.NOT_FOUND);
  }

  async update(params: {
    where: Prisma.ContactWhereUniqueInput;
    data: UpdateContactDto;
  }) {
    const { where, data } = params;

    const {
      firstName,
      lastName,
      email,
      interest,
      position,
      cityId,
      companyId,
    } = data;

    const channels =
      data.channels?.length > 0
        ? data.channels.map((channel) => ({
            where: { id: channel.channelId },
            create: {
              account: channel.account,
              preference: channel.preference
                ? (channel.preference as PreferedChanel)
                : PreferedChanel.NO_PREFERENCE,
              channel: { connect: { id: channel.channelId } },
            },
          }))
        : undefined;

    const payload: Prisma.ContactUpdateInput = {
      firstName,
      lastName,
      email,
      interest,
      position,
      city: cityId ? { connect: { id: cityId } } : undefined,
      company: companyId ? { connect: { id: companyId } } : undefined,
      channels: { deleteMany: {}, connectOrCreate: channels },
    };

    return this.prisma.contact.update({
      where,
      data: payload,
      include: {
        city: { include: { country: { include: { region: true } } } },
        channels: { include: { channel: true } },
        company: true,
      },
    });
  }

  remove(where: Prisma.ContactWhereUniqueInput) {
    return this.prisma.contact.delete({
      where,
    });
  }
}
