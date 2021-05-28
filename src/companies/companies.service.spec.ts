import { PrismaService } from './../prisma/prisma.services';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import mockPrismaService, { company } from 'src/utils/__mocks__/prisma.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a company', async () => {
    const mockedCompany: CreateCompanyDto = {
      name: 'Company Name',
      address: 'Company Address',
      email: 'Company Email',
      phone: 'Company Phone',
      cityId: 1,
    };

    expect(service.create(mockedCompany)).resolves.toEqual(company);
  });

  it('should find all companies', async () => {
    expect(service.findAll({})).resolves.toEqual([company]);
  });

  it('should get an company by id', async () => {
    expect(service.findOne({ id: 1 })).resolves.toEqual(company);
  });

  it('should update a company by id', async () => {
    const mockedCompany: UpdateCompanyDto = {
      name: 'Company Name',
      address: 'Company Address',
      email: 'Company Email',
      phone: 'Company Phone',
      cityId: 1,
    };

    const companyUpdated = await service.update({
      where: { id: 1 },
      data: mockedCompany,
    });

    expect(companyUpdated).toEqual(company);
  });

  it('should remove a company by id', async () => {
    const companyDeleted = await service.remove({ id: 1 });
    expect(companyDeleted).toEqual(company);
  });
});
