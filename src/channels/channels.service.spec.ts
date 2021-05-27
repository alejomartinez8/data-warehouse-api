import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { ChannelsService } from './channels.service';
import mockPrismaService, { channel } from 'src/utils/__mocks__/prisma.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';

describe('ChannelsService', () => {
  let service: ChannelsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ChannelsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<ChannelsService>(ChannelsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a channel', async () => {
    const mockedChannel: CreateChannelDto = {
      name: 'Channel Name',
    };

    expect(service.create(mockedChannel)).resolves.toEqual(channel);
  });

  it('should find all channels', async () => {
    expect(service.findAll({})).resolves.toEqual([channel]);
  });

  it('should get an channel by id', async () => {
    expect(service.findOne({ id: 1 })).resolves.toEqual(channel);
  });

  it('should update a channel by id', async () => {
    const mockedChannel: UpdateChannelDto = {
      name: 'Channel Update',
    };

    const channelUpdated = await service.update({
      where: { id: 1 },
      data: mockedChannel,
    });

    expect(channelUpdated).toEqual(channel);
  });

  it('should remove a channel by id', async () => {
    const channelDeleted = await service.remove({ id: 1 });
    expect(channelDeleted).toEqual(channel);
  });
});
