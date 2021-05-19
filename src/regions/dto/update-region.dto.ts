import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional } from 'class-validator';
import { CreateRegionDto } from './create-region.dto';

export class UpdateRegionDto extends PartialType(CreateRegionDto) {
  @IsOptional()
  @IsString()
  name?: string;
}
