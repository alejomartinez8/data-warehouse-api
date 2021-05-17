import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { RegionsModule } from './regions/regions.module';

@Module({
  imports: [UsersModule, PrismaModule, AuthModule, RegionsModule],
})
export class AppModule {}
