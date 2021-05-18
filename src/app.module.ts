import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RegionsModule } from './regions/regions.module';
import { CountriesModule } from './countries/countries.module';
import { CitiesModule } from './cities/cities.module';
import { CompaniesModule } from './companies/companies.module';
import { ChannelsModule } from './channels/channels.module';

@Module({
  imports: [
    UsersModule,
    PrismaModule,
    AuthModule,
    RegionsModule,
    CountriesModule,
    CitiesModule,
    CompaniesModule,
    ChannelsModule,
  ],
})
export class AppModule {}
