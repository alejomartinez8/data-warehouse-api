import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mockPrismaService, { user } from 'src/utils/__mocks__/prisma.service';

describe('Users Service', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const mockedUser: CreateUserDto = {
      email: 'example@example.com',
      firstName: 'firstName',
      lastName: 'lastName',
      role: Role.BASIC,
      password: 'password',
    };

    expect(service.create(mockedUser)).resolves.toEqual(user);
  });

  it('should findAll users', async () => {
    expect(service.findAll({})).resolves.toEqual([user]);
  });

  describe('when getting an user by id', () => {
    it('should get an user by id', async () => {
      expect(service.findOne({ id: 1 })).resolves.toEqual(user);
    });
  });

  it('should update user by id', async () => {
    const mockedUser: UpdateUserDto = {
      email: 'example@example.com',
      firstName: 'firstName',
      lastName: 'lastName',
      role: Role.BASIC,
      password: 'password',
    };

    const userUpdated = await service.update({
      where: { id: 1 },
      data: mockedUser,
    });

    expect(userUpdated).toEqual(user);
  });

  it('should remove user by id', async () => {
    const userDeleted = await service.remove({ id: 1 });
    expect(userDeleted).toEqual(user);
  });
});
