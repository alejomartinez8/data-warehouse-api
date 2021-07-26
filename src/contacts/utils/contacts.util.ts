import { Prisma } from '@prisma/client';

export const sortWithRelations = (orderBy: string, order: string) => {
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

export const queryWithRelations = (searchQuery: string) => {
  if (!searchQuery) return {};
  const where: Prisma.ContactWhereInput = {
    OR: [
      { firstName: { contains: searchQuery } },
      { lastName: { contains: searchQuery } },
      { position: { contains: searchQuery } },
      { email: { contains: searchQuery } },
      { company: { name: { contains: searchQuery } } },
      { city: { name: { contains: searchQuery } } },
      { city: { country: { name: { contains: searchQuery } } } },
      {
        city: { country: { region: { name: { contains: searchQuery } } } },
      },
    ],
  };

  return where;
};
