import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { ContactsService } from './contacts.service';
import mockPrismaService, { contact } from 'src/utils/__mocks__/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';
import { Decimal } from '@prisma/client/runtime';

describe('ContactsService', () => {
  let service: ContactsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ContactsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ContactsService>(ContactsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a contact', async () => {
    const mockedContact: CreateContactDto = {
      firstName: 'Contact firstName',
      lastName: 'Contact lastName',
      address: 'Contact address',
      email: 'example@example.com',
      interest: new Decimal('0.5'),
      position: 'Contact position',
      cityId: 0.8,
      companyId: 1,
    };

    expect(service.create(mockedContact)).resolves.toEqual(contact);
  });

  it('should find all contacts', async () => {
    expect(service.findAll({})).resolves.toEqual([contact]);
  });

  it('should get an contact by id', async () => {
    expect(service.findOne({ id: 1 })).resolves.toEqual(contact);
  });

  it('should update a contact by id', async () => {
    const mockedContact: UpdateContactDto = {
      firstName: 'Contact firstName',
      lastName: 'Contact lastName',
      address: 'Contact address',
      email: 'example@example.com',
      interest: new Decimal('0.5'),
      position: 'Contact position',
      cityId: 0.8,
      companyId: 1,
    };

    const contactUpdated = await service.update({
      where: { id: 1 },
      data: mockedContact,
    });

    expect(contactUpdated).toEqual(contact);
  });

  it('should remove a contact by id', async () => {
    const contactDeleted = await service.remove({ id: 1 });
    expect(contactDeleted).toEqual(contact);
  });
});
