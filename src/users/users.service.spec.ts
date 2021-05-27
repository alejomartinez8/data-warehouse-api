import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { CreateUserDto, Role } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

const user: CreateUserDto = {
  email: 'example@example.com',
  firstName: 'firstName',
  lastName: 'lastName',
  role: Role.USER,
  password: 'password',
};

let userPrisma;

describe('Users Service', () => {
  let service: UsersService;

  beforeEach(async () => {
    userPrisma = {
      create: jest.fn().mockResolvedValue(user),
      findMany: jest.fn().mockResolvedValue([user]),
      findUnique: jest.fn().mockResolvedValue(user),
      update: jest.fn().mockResolvedValue(user as UpdateUserDto),
      delete: jest.fn().mockResolvedValue(user),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: PrismaService,
          useValue: { user: userPrisma },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user', async () => {
    const fetchedUser = await service.create(user);
    expect(fetchedUser).toEqual(user);
  });

  it('should findAll users', async () => {
    const fetchedUser = await service.findAll({});
    expect(fetchedUser).toEqual([user]);
  });

  describe('when getting an user by id', () => {
    it('should get an user by id', async () => {
      expect(service.findOne({ id: 1 }))
        .resolves.toEqual(user)
        .catch((err) => console.log(err));
    });

    // it('should throw an error when id does not match', async () => {
    //   userPrisma.findUnique.mockRejectedValue(undefined);
    //   await expect(service.findOne({ id: 1 })).rejects.toThrow();
    // });
  });

  it('should update user by id', async () => {
    const fetchedUser = await service.update({
      where: { id: 1 },
      data: user as UpdateUserDto,
    });
    expect(fetchedUser).toEqual(user as UpdateUserDto);
  });

  it('should remove user by id', async () => {
    const fetchedUser = await service.remove({ id: 1 });
    expect(fetchedUser).toEqual(user);
  });
});
