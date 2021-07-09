import {
  User,
  Role,
  Channel,
  City,
  Country,
  Region,
  Contact,
  Company,
} from '@prisma/client';
import { Decimal } from '@prisma/client/runtime';
import * as bcrypt from 'bcrypt';

export const user: User = {
  id: 1,
  email: 'example@example.com',
  firstName: 'firstName',
  lastName: 'lastName',
  role: Role.BASIC,
  password: bcrypt.hashSync('password', 10),
};

export const contact: Contact = {
  id: 1,
  firstName: 'Contact firstName',
  lastName: 'Contact lastName',
  address: 'Contact address',
  email: 'example@example.com',
  interest: new Decimal('0.5'),
  position: 'Contact position',
  cityId: 0.8,
  companyId: 1,
};

export const company: Company = {
  id: 1,
  name: 'Company Name',
  address: 'Company Address',
  email: 'Company Email',
  phone: 'Company Phone',
  cityId: 1,
};

export const region: Region = {
  id: 1,
  name: 'Region Name',
};

export const country: Country = {
  id: 1,
  name: 'Country Name',
  regionId: 1,
};

export const city: City = {
  id: 1,
  name: 'City Name',
  countryId: 1,
};

export const channel: Channel = {
  id: 1,
  name: 'Channel Name',
};

const mockCRUD = (entity: any) => ({
  create: jest.fn().mockResolvedValue(entity),
  findMany: jest.fn().mockResolvedValue([entity]),
  findUnique: jest.fn().mockResolvedValue(entity),
  update: jest.fn().mockResolvedValue(entity),
  delete: jest.fn().mockResolvedValue(entity),
});

const mockPrismaService = {
  region: mockCRUD(region),
  country: mockCRUD(country),
  city: mockCRUD(city),
  user: mockCRUD(user),
  contact: mockCRUD(contact),
  channel: mockCRUD(channel),
  company: mockCRUD(company),
};

export default mockPrismaService;
