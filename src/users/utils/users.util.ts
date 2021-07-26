import { Prisma } from '@prisma/client';

export const sortUsersWithRelations = (
  orderBy: string,
  order: Prisma.SortOrder,
): Prisma.UserOrderByWithRelationInput => {
  switch (orderBy) {
    case '':
      return undefined;

    default:
      return { [orderBy]: order };
  }
};

export const queryUsersWithRelations = (
  searchQuery: string,
): Prisma.UserWhereInput => {
  if (!searchQuery) return undefined;

  return {
    OR: [
      { firstName: { contains: searchQuery, mode: 'insensitive' } },
      { lastName: { contains: searchQuery, mode: 'insensitive' } },
      { email: { contains: searchQuery, mode: 'insensitive' } },
    ],
  };
};
