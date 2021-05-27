import { User, Role, Channel } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const channel: Channel = {
  id: 1,
  name: 'Channel Name',
};

export const user: User = {
  id: 1,
  email: 'example@example.com',
  firstName: 'firstName',
  lastName: 'lastName',
  role: Role.USER,
  password: bcrypt.hashSync('password', 10),
};

const mockPrismaService = {
  channel: {
    create: jest.fn().mockResolvedValue(channel),
    findMany: jest.fn().mockResolvedValue([channel]),
    findUnique: jest.fn().mockResolvedValue(channel),
    update: jest.fn().mockResolvedValue(channel),
    delete: jest.fn().mockResolvedValue(channel),
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
