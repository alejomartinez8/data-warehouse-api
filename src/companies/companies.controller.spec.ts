import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company, City } from '@prisma/client';

const createCompanyDto: CreateCompanyDto = {
  name: 'Company Name',
  address: 'Company Address',
  email: 'Company Email',
  phone: 'Company Phone',
  cityId: 1,
};

const company: Company & { city: City } = {
  id: 1,
  city: { id: 1, name: 'City', countryId: 1 },
  ...createCompanyDto,
};

describe('CompaniesController', () => {
  let companiesController: CompaniesController;
  let companiesService: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [CompaniesService, PrismaService],
    }).compile();

    companiesService = module.get<CompaniesService>(CompaniesService);
    companiesController = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(companiesService).toBeDefined();
    expect(companiesController).toBeDefined();
  });

  describe('create', () => {
    it('should return a company created', async () => {
      jest
        .spyOn(companiesService, 'create')
        .mockImplementation(async () => company);
      await expect(
        companiesController.create(createCompanyDto),
      ).resolves.toEqual(company);
    });
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      jest
        .spyOn(companiesService, 'findAll')
        .mockImplementation(async () => [company]);

      await expect(companiesController.findAll({})).resolves.toEqual([company]);
    });
  });

  describe('findOne', () => {
    it('should return a company with an Id', async () => {
      jest
        .spyOn(companiesService, 'findOne')
        .mockImplementation(async () => company);
      await expect(companiesController.findOne(1)).resolves.toEqual(company);
    });
  });

  describe('update', () => {
    it('should update and return a company with an Id', async () => {
      jest
        .spyOn(companiesService, 'update')
        .mockImplementation(async () => company);
      await expect(
        companiesController.update({ id: 1 }, company as UpdateCompanyDto),
      ).resolves.toEqual(company);
    });
  });

  describe('remove', () => {
    it('should delete and return a company with an Id', async () => {
      jest
        .spyOn(companiesService, 'remove')
        .mockImplementation(async () => company);
      await expect(companiesController.remove({ id: 1 })).resolves.toEqual(
        company,
      );
    });
  });
});
