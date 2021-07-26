import { Prisma } from '@prisma/client';

export const sortWithRelations = (
  orderBy: string,
  order: string,
): Prisma.ContactOrderByInput => {
  switch (orderBy) {
    case 'city':
    case 'company':
      return { [orderBy]: { name: order } };

    case '':
      return undefined;

    default:
      return { [orderBy]: order };
  }
};

export const queryWithRelations = (
  searchQuery: string,
): Prisma.ContactWhereInput => {
  if (!searchQuery) return undefined;

  return {
    OR: [
      { firstName: { contains: searchQuery, mode: 'insensitive' } },
      { lastName: { contains: searchQuery, mode: 'insensitive' } },
      { position: { contains: searchQuery, mode: 'insensitive' } },
      { email: { contains: searchQuery, mode: 'insensitive' } },
      { company: { name: { contains: searchQuery, mode: 'insensitive' } } },
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
