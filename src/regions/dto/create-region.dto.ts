import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRegionDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
