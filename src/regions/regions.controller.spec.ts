import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { RegionsController } from './regions.controller';
import { RegionsService } from './regions.service';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from '@prisma/client';

const createRegionDto: CreateRegionDto = {
  name: 'Region Name',
};

const region: Region = {
  id: 1,
  name: 'Region Name',
};

describe('RegionsController', () => {
  let regionsController: RegionsController;
  let regionsService: RegionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegionsController],
      providers: [RegionsService, PrismaService],
    }).compile();

    regionsService = module.get<RegionsService>(RegionsService);
    regionsController = module.get<RegionsController>(RegionsController);
  });

  it('should be defined', () => {
    expect(regionsService).toBeDefined();
    expect(regionsController).toBeDefined();
  });

  describe('create', () => {
    it('should return a region created', async () => {
      jest
        .spyOn(regionsService, 'create')
        .mockImplementation(async () => region);
      await expect(regionsController.create(createRegionDto)).resolves.toEqual(
        region,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of regions', async () => {
      jest
        .spyOn(regionsService, 'findAll')
        .mockImplementation(async () => [region]);

      await expect(regionsController.findAll({})).resolves.toEqual([region]);
    });
  });

  describe('findOne', () => {
    it('should return a region with an Id', async () => {
      jest
        .spyOn(regionsService, 'findOne')
        .mockImplementation(async () => region);
      await expect(regionsController.findOne(1)).resolves.toEqual(region);
    });
  });

  describe('update', () => {
    it('should update and return a region with an Id', async () => {
      jest
        .spyOn(regionsService, 'update')
        .mockImplementation(async () => region);
      await expect(
        regionsController.update(1, region as UpdateRegionDto),
      ).resolves.toEqual(region);
    });
  });

  describe('remove', () => {
    it('should delete and return a region with an Id', async () => {
      jest
        .spyOn(regionsService, 'remove')
        .mockImplementation(async () => region);
      await expect(regionsController.remove(1)).resolves.toEqual(region);
    });
  });
});
