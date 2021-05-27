import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { CountriesController } from './countries.controller';
import { CountriesService } from './countries.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';
import { Country, Region, City } from '@prisma/client';

const createCountryDto: CreateCountryDto = {
  name: 'Country Name',
  regionId: 1,
};

const country: Country & { region: Region; cities: City[] } = {
  id: 1,
  name: 'Country Name',
  regionId: 1,
  cities: [{ id: 1, name: 'City', countryId: 1 }],
  region: { id: 1, name: 'Region' },
};

describe('CountriesController', () => {
  let countriesController: CountriesController;
  let countriesService: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CountriesController],
      providers: [CountriesService, PrismaService],
    }).compile();

    countriesService = module.get<CountriesService>(CountriesService);
    countriesController = module.get<CountriesController>(CountriesController);
  });

  it('should be defined', () => {
    expect(countriesService).toBeDefined();
    expect(countriesController).toBeDefined();
  });

  describe('create', () => {
    it('should return a country created', () => {
      jest
        .spyOn(countriesService, 'create')
        .mockImplementation(async () => country);
      return expect(
        countriesController.create(createCountryDto),
      ).resolves.toEqual(country);
    });
  });

  describe('findAll', () => {
    it('should return an array of countries', () => {
      jest
        .spyOn(countriesService, 'findAll')
        .mockImplementation(async () => [country]);

      return expect(countriesController.findAll({})).resolves.toEqual([
        country,
      ]);
    });
  });

  describe('findOne', () => {
    it('should return a country with an Id', () => {
      jest
        .spyOn(countriesService, 'findOne')
        .mockImplementation(async () => country);
      return expect(countriesController.findOne(1)).resolves.toEqual(country);
    });
  });

  describe('update', () => {
    it('should update and return a country with an Id', () => {
      jest
        .spyOn(countriesService, 'update')
        .mockImplementation(async () => country);

      return expect(
        countriesController.update(1, country as UpdateCountryDto),
      ).resolves.toEqual(country);
    });
  });

  describe('remove', () => {
    it('should delete and return a country with an Id', () => {
      jest
        .spyOn(countriesService, 'remove')
        .mockImplementation(async () => country as Country);

      return expect(countriesController.remove(1)).resolves.toEqual(country);
    });
  });
});
