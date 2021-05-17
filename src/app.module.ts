import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RegionsModule } from './regions/regions.module';
import { CountriesModule } from './countries/countries.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, RegionsModule, CountriesModule],
})
export class AppModule {}
