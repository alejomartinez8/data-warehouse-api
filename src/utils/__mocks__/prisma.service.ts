import { User, Role } from '@prisma/client';
import * as bcrypt from 'bcrypt';

export const user: User = {
  id: 1,
  email: 'example@example.com',
  firstName: 'firstName',
  lastName: 'lastName',
  role: Role.USER,
  password: bcrypt.hashSync('password', 10),
};

const mockPrismaService = {
  user: {
    create: jest.fn().mockResolvedValue(user),
    findMany: jest.fn().mockResolvedValue([user]),
    findUnique: jest.fn().mockResolvedValue(user),
    update: jest.fn().mockResolvedValue(user),
    delete: jest.fn().mockResolvedValue(user),
  },
};

export default mockPrismaService;
