import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { CitiesController } from './cities.controller';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { City, Country } from '@prisma/client';

const createCityDto: CreateCityDto = {
  name: 'City Name',
  countryId: 1,
};

const city: City & {
  country: Country;
} = {
  id: 1,
  country: { id: 1, name: 'Country', regionId: 1 },
  ...createCityDto,
};

describe('CitiesController', () => {
  let citiesController: CitiesController;
  let citiesService: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CitiesController],
      providers: [CitiesService, PrismaService],
    }).compile();

    citiesService = module.get<CitiesService>(CitiesService);
    citiesController = module.get<CitiesController>(CitiesController);
  });

  it('should be defined', () => {
    expect(citiesService).toBeDefined();
    expect(citiesController).toBeDefined();
  });

  describe('create', () => {
    it('should return a city created', async () => {
      jest.spyOn(citiesService, 'create').mockImplementation(async () => city);
      await expect(citiesController.create(createCityDto)).resolves.toEqual(
        city,
      );
    });
  });

  describe('findAll', () => {
    it('should return an array of cities', async () => {
      jest
        .spyOn(citiesService, 'findAll')
        .mockImplementation(async () => [city]);

      await expect(citiesController.findAll({})).resolves.toEqual([city]);
    });
  });

  describe('findOne', () => {
    it('should return a city with an Id', async () => {
      jest.spyOn(citiesService, 'findOne').mockImplementation(async () => city);
      await expect(citiesController.findOne(1)).resolves.toEqual(city);
    });
  });

  describe('update', () => {
    it('should update and return a city with an Id', async () => {
      jest.spyOn(citiesService, 'update').mockImplementation(async () => city);
      await expect(
        citiesController.update(1, city as UpdateCityDto),
      ).resolves.toEqual(city);
    });
  });

  describe('remove', () => {
    it('should delete and return a city with an Id', async () => {
      jest.spyOn(citiesService, 'remove').mockImplementation(async () => city);
      await expect(citiesController.remove(1)).resolves.toEqual(city);
    });
  });
});
