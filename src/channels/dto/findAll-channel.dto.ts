import { Prisma } from '@prisma/client';

export class FindAllChannelsDto {
  skip?: number;
  take?: number;
  cursor?: Prisma.ChannelWhereUniqueInput;
  where?: Prisma.ChannelWhereInput;
  orderBy?: Prisma.ChannelOrderByInput;
}
