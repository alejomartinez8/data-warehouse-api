import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { CitiesService } from './cities.service';
import mockPrismaService, { city } from 'src/utils/__mocks__/prisma.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';

describe('CitiesService', () => {
  let service: CitiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CitiesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CitiesService>(CitiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a city', async () => {
    const mockedCity: CreateCityDto = {
      name: 'City Name',
      countryId: 1,
    };

    expect(service.create(mockedCity)).resolves.toEqual(city);
  });

  it('should find all cities', async () => {
    expect(service.findAll({})).resolves.toEqual([city]);
  });

  it('should get an city by id', async () => {
    expect(service.findOne({ id: 1 })).resolves.toEqual(city);
  });

  it('should update a city by id', async () => {
    const mockedCity: UpdateCityDto = {
      name: 'City Update',
    };

    const cityUpdated = await service.update({
      where: { id: 1 },
      data: mockedCity,
    });

    expect(cityUpdated).toEqual(city);
  });

  it('should remove a city by id', async () => {
    const cityDeleted = await service.remove({ id: 1 });
    expect(cityDeleted).toEqual(city);
  });
});
