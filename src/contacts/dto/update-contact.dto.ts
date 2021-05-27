import { Decimal } from '@prisma/client/runtime';
import { PartialType } from '@nestjs/mapped-types';
import { CreateContactDto } from './create-contact.dto';
import {
  IsEmail,
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
} from 'class-validator';

export class UpdateContactDto extends PartialType(CreateContactDto) {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  position?: string;

  @IsString()
  @IsOptional()
  address?: string;

  @IsNumber()
  @IsOptional()
  interest?: Decimal;

  @IsNumber()
  @IsOptional()
  cityId?: number;

  @IsNumber()
  @IsOptional()
  companyId?: number;

  @IsArray()
  @IsOptional()
  channelIds?: number[];
}
