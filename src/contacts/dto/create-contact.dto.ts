import { Decimal } from '@prisma/client/runtime';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
} from 'class-validator';

export class CreateContactDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsEmail()
  email: string;

  @IsString()
  position: string;

  @IsString()
  address: string;

  @IsString()
  interest: Decimal;

  @IsString()
  cityId: string;

  @IsString()
  companyId: string;

  @IsArray()
  @IsOptional()
  channelIds?: string[];
}
