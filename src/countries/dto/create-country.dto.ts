import { IsString, IsNotEmpty } from 'class-validator';

export class CreateCountryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  regionId: string;
}
