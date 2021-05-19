import { Prisma } from '@prisma/client';

export class FindAllCountriesDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.CountryWhereUniqueInput;
  where?: Prisma.CountryWhereInput;
  orderBy?: Prisma.CountryOrderByInput;
}
