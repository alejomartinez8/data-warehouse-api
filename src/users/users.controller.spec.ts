import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { Role, CreateUserDto } from './dto/create-user.dto';
import { User } from '.prisma/client';

const createUserDto: CreateUserDto = {
  email: 'example@example.com',
  firstName: 'firstName',
  lastName: 'lastName',
  role: Role.USER,
  password: 'password',
};

const user: User = {
  id: 1,
  email: 'example@example.com',
  firstName: 'firstName',
  lastName: 'lastName',
  role: Role.USER,
  password: 'password',
};

describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService, PrismaService],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    usersController = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should return an user created', () => {
      jest.spyOn(usersService, 'create').mockImplementation(async () => user);
      return expect(usersController.create(createUserDto)).resolves.toEqual(
        user,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of users', () => {
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => [user]);

      return expect(usersController.findAll({})).resolves.toEqual([user]);
    });
  });

  describe('findOne', () => {
    it('should return an user with an Id', () => {
      jest.spyOn(usersService, 'findOne').mockImplementation(async () => user);

      return expect(usersController.findOne(1)).resolves.toEqual(user);
    });
  });

  describe('findOne', () => {
    it('should update and return an user with an Id', () => {
      jest.spyOn(usersService, 'update').mockImplementation(async () => user);

      return expect(
        usersController.update(1, user as UpdateUserDto),
      ).resolves.toEqual(user);
    });
  });

  describe('remove', () => {
    it('should delete and return an user with an Id', () => {
      jest.spyOn(usersService, 'remove').mockImplementation(async () => user);

      return expect(usersController.remove(1)).resolves.toEqual(user);
    });
  });
});
