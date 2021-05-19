import { Prisma } from '@prisma/client';

export class FindAllCompaniesDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.CompanyWhereUniqueInput;
  where?: Prisma.CompanyWhereInput;
  orderBy?: Prisma.CompanyOrderByInput;
}
