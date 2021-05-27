import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { CountriesService } from './countries.service';
import mockPrismaService, { country } from 'src/utils/__mocks__/prisma.service';
import { CreateCountryDto } from './dto/create-country.dto';
import { UpdateCountryDto } from './dto/update-country.dto';

describe('CountriesService', () => {
  let service: CountriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountriesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CountriesService>(CountriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a country', async () => {
    const mockedCountry: CreateCountryDto = {
      name: 'Country Name',
      regionId: 1,
    };

    expect(service.create(mockedCountry)).resolves.toEqual(country);
  });

  it('should find all countries', async () => {
    expect(service.findAll({})).resolves.toEqual([country]);
  });

  it('should get an country by id', async () => {
    expect(service.findOne({ id: 1 })).resolves.toEqual(country);
  });

  it('should update a country by id', async () => {
    const mockedCountry: UpdateCountryDto = {
      name: 'Country Update',
      regionId: 1,
    };

    const countryUpdated = await service.update({
      where: { id: 1 },
      data: mockedCountry,
    });

    expect(countryUpdated).toEqual(country);
  });

  it('should remove a country by id', async () => {
    const countryDeleted = await service.remove({ id: 1 });
    expect(countryDeleted).toEqual(country);
  });
});
