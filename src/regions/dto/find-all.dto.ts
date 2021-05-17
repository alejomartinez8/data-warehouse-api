import { Prisma } from '@prisma/client';

export class FindAllDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.RegionWhereUniqueInput;
  where?: Prisma.RegionWhereInput;
  orderBy?: Prisma.RegionOrderByInput;
}
