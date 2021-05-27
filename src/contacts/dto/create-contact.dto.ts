import { Decimal } from '@prisma/client/runtime';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsNumber,
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

  @IsNumber()
  interest: Decimal;

  @IsNumber()
  cityId: number;

  @IsNumber()
  companyId: number;

  @IsArray()
  @IsOptional()
  channelIds?: number[];
}
