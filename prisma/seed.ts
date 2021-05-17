import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import * as bcrypt from 'bcrypt';

async function main() {
  const admin = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example',
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
      password: await bcrypt.hash('87654321', 10),
    },
  });

  const basic = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      firstName: 'Basic',
      lastName: 'User',
      role: 'USER',
      password: await bcrypt.hash('12345678', 10),
    },
  });

  const region = await prisma.region.upsert({
    where: { name: 'South America' },
    update: {},
    create: {
      name: 'South America',
      countries: {
        create: [
          {
            name: 'Colombia',
            cities: {
              create: [
                { name: 'Medellin' },
                { name: 'Bogotá' },
                { name: 'Cali' },
              ],
            },
          },
          {
            name: 'Argentina',
            cities: { create: [{ name: 'Buenos Aires' }, { name: 'Cordoba' }] },
          },
          { name: 'Chile', cities: { create: [{ name: 'Santiago' }] } },
          {
            name: 'Brazil',
            cities: { create: [{ name: 'Sao Paulo' }, { name: 'Brazilia' }] },
          },
        ],
      },
    },
  });

  console.log({ admin, basic, region });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
