import { Decimal } from '@prisma/client/runtime';
import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsController } from './contacts.controller';
import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Contact } from '@prisma/client';

const createContactDto: CreateContactDto = {
  firstName: 'Contact firstName',
  lastName: 'Contact lastName',
  address: 'Contact address',
  email: 'example@example.com',
  interest: new Decimal('0.5'),
  position: 'Contact position',
  cityId: 0.8,
  companyId: 1,
  channelIds: [1, 2, 3],
};

const contact: Contact = {
  id: 1,
  ...createContactDto,
};

describe('ContactsController', () => {
  let contactsController: ContactsController;
  let contactsService: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ContactsController],
      providers: [ContactsService, PrismaService],
    }).compile();

    contactsService = module.get<ContactsService>(ContactsService);
    contactsController = module.get<ContactsController>(ContactsController);
  });

  it('should be defined', () => {
    expect(contactsService).toBeDefined();
    expect(contactsController).toBeDefined();
  });

  describe('create', () => {
    it('should return a contact created', async () => {
      jest
        .spyOn(contactsService, 'create')
        .mockImplementation(async () => contact);
      await expect(
        contactsController.create(createContactDto),
      ).resolves.toEqual(contact);
    });
  });

  describe('findAll', () => {
    it('should return an array of contacts', async () => {
      jest
        .spyOn(contactsService, 'findAll')
        .mockImplementation(async () => [contact]);

      await expect(contactsController.findAll({})).resolves.toEqual([contact]);
    });
  });

  describe('findOne', () => {
    it('should return a contact with an Id', async () => {
      jest
        .spyOn(contactsService, 'findOne')
        .mockImplementation(async () => contact);
      await expect(contactsController.findOne(1)).resolves.toEqual(contact);
    });
  });

  describe('update', () => {
    it('should update and return a contact with an Id', async () => {
      jest
        .spyOn(contactsService, 'update')
        .mockImplementation(async () => contact);
      await expect(
        contactsController.update({ id: 1 }, contact as UpdateContactDto),
      ).resolves.toEqual(contact);
    });
  });

  describe('remove', () => {
    it('should delete and return a contact with an Id', async () => {
      jest
        .spyOn(contactsService, 'remove')
        .mockImplementation(async () => contact as Contact);
      await expect(contactsController.remove(1)).resolves.toEqual(contact);
    });
  });
});
