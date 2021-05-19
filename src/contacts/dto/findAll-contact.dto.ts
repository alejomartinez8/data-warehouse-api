import { Prisma } from '@prisma/client';

export class FindAllContactsDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.ContactWhereUniqueInput;
  where?: Prisma.ContactWhereInput;
  orderBy?: Prisma.ContactOrderByInput;
}
