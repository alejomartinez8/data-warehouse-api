import { Prisma } from '@prisma/client';
import { Role } from './create-user.dto';
import { IsEmail, IsString, MinLength, IsOptional } from 'class-validator';

export class UpdateUserDto implements Prisma.UserUpdateInput {
  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsString()
  @IsOptional()
  role?: Role;

  @IsString()
  @IsOptional()
  @MinLength(6)
  password?: string;
}
