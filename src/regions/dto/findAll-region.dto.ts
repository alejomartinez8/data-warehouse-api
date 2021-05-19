import { Prisma } from '@prisma/client';

export class FindAllRegionDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.RegionWhereUniqueInput;
  where?: Prisma.RegionWhereInput;
  orderBy?: Prisma.RegionOrderByInput;
}
