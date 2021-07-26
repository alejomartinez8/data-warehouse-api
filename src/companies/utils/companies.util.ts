import { Prisma } from '@prisma/client';

export const sortWithRelations = (
  orderBy: string,
  order: Prisma.SortOrder,
): Prisma.CompanyOrderByWithRelationInput => {
  switch (orderBy) {
    case 'city':
      return { [orderBy]: { name: order } };

    case '':
      return undefined;

    default:
      return { [orderBy]: order };
  }
};

export const queryWithRelations = (
  searchQuery: string,
): Prisma.CompanyWhereInput => {
  if (!searchQuery) return undefined;

  return {
    OR: [
      { name: { contains: searchQuery, mode: 'insensitive' } },
      { email: { contains: searchQuery, mode: 'insensitive' } },
      { address: { contains: searchQuery, mode: 'insensitive' } },
      { phone: { contains: searchQuery, mode: 'insensitive' } },
      { city: { name: { contains: searchQuery, mode: 'insensitive' } } },
      {
        city: {
          country: { name: { contains: searchQuery, mode: 'insensitive' } },
        },
      },
      {
        city: {
          country: {
            region: { name: { contains: searchQuery, mode: 'insensitive' } },
          },
        },
      },
    ],
  };
};
