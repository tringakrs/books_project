import { IsOptional } from 'class-validator';

export class UpdateAuthorsDto {
  @IsOptional()
  firstName: string;

  @IsOptional()
  middleName: string;

  @IsOptional()
  lastName: string;
}
