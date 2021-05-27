import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { RegionsService } from './regions.service';
import mockPrismaService, { region } from 'src/utils/__mocks__/prisma.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';

describe('RegionsService', () => {
  let service: RegionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegionsService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<RegionsService>(RegionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a region', async () => {
    const mockedRegion: CreateRegionDto = {
      name: 'Region Name',
    };

    expect(service.create(mockedRegion)).resolves.toEqual(region);
  });

  it('should find all regions', async () => {
    expect(service.findAll({})).resolves.toEqual([region]);
  });

  it('should get an region by id', async () => {
    expect(service.findOne({ id: 1 })).resolves.toEqual(region);
  });

  it('should update a region by id', async () => {
    const mockedRegion: UpdateRegionDto = {
      name: 'Region Update',
    };

    const regionUpdated = await service.update({
      where: { id: 1 },
      data: mockedRegion,
    });

    expect(regionUpdated).toEqual(region);
  });

  it('should remove a region by id', async () => {
    const regionDeleted = await service.remove({ id: 1 });
    expect(regionDeleted).toEqual(region);
  });
});
