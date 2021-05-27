import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsController } from './channels.controller';
import { ChannelsService } from './channels.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from '.prisma/client';

const createChannelDto: CreateChannelDto = {
  name: 'Channel Name',
};

const channel: Channel = {
  id: 1,
  name: 'Channel Name',
};

describe('ChannelsController', () => {
  let usersController: ChannelsController;
  let usersService: ChannelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ChannelsController],
      providers: [ChannelsService, PrismaService],
    }).compile();

    usersService = module.get<ChannelsService>(ChannelsService);
    usersController = module.get<ChannelsController>(ChannelsController);
  });

  it('should be defined', () => {
    expect(usersService).toBeDefined();
    expect(usersController).toBeDefined();
  });

  describe('create', () => {
    it('should return a channel created', async () => {
      jest
        .spyOn(usersService, 'create')
        .mockImplementation(async () => channel);
      await expect(usersController.create(createChannelDto)).resolves.toEqual(
        channel,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of channels', async () => {
      jest
        .spyOn(usersService, 'findAll')
        .mockImplementation(async () => [channel]);

      await expect(usersController.findAll({})).resolves.toEqual([channel]);
    });
  });

  describe('findOne', () => {
    it('should return a channel with an Id', async () => {
      jest
        .spyOn(usersService, 'findOne')
        .mockImplementation(async () => channel);
      await expect(usersController.findOne(1)).resolves.toEqual(channel);
    });
  });

  describe('findOne', () => {
    it('should update and return a channel with an Id', async () => {
      jest
        .spyOn(usersService, 'update')
        .mockImplementation(async () => channel);
      await expect(
        usersController.update(1, channel as UpdateChannelDto),
      ).resolves.toEqual(channel);
    });
  });

  describe('remove', () => {
    it('should delete and return a channel with an Id', async () => {
      jest
        .spyOn(usersService, 'remove')
        .mockImplementation(async () => channel);
      await expect(usersController.remove(1)).resolves.toEqual(channel);
    });
  });
});
