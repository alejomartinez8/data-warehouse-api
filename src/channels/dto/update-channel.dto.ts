import { PartialType } from '@nestjs/mapped-types';
import { IsString, IsOptional } from 'class-validator';
import { CreateChannelDto } from './create-channel.dto';

export class UpdateChannelDto extends PartialType(CreateChannelDto) {
  @IsOptional()
  @IsString()
  name?: string;
}
