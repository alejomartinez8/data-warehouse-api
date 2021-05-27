import { User, Role, Channel, City, Country } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const user: User = {
  id: 1,
  email: 'example@example.com',
  firstName: 'firstName',
  lastName: 'lastName',
  role: Role.USER,
  password: bcrypt.hashSync('password', 10),
};

export const country: Country = {
  id: 1,
  name: 'City Name',
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

const mockPrismaService = {
  channel: {
    create: jest.fn().mockResolvedValue(channel),
    findMany: jest.fn().mockResolvedValue([channel]),
    findUnique: jest.fn().mockResolvedValue(channel),
    update: jest.fn().mockResolvedValue(channel),
    delete: jest.fn().mockResolvedValue(channel),
  },
  country: {
    create: jest.fn().mockResolvedValue(country),
    findMany: jest.fn().mockResolvedValue([country]),
    findUnique: jest.fn().mockResolvedValue(country),
    update: jest.fn().mockResolvedValue(country),
    delete: jest.fn().mockResolvedValue(country),
  },
  city: {
    create: jest.fn().mockResolvedValue(city),
    findMany: jest.fn().mockResolvedValue([city]),
    findUnique: jest.fn().mockResolvedValue(city),
    update: jest.fn().mockResolvedValue(city),
    delete: jest.fn().mockResolvedValue(city),
  },
  user: {
    create: jest.fn().mockResolvedValue(user),
    findMany: jest.fn().mockResolvedValue([user]),
    findUnique: jest.fn().mockResolvedValue(user),
    update: jest.fn().mockResolvedValue(user),
    delete: jest.fn().mockResolvedValue(user),
  },
};

export default mockPrismaService;
