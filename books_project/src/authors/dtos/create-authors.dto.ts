import { IsString } from 'class-validator';

export class CreateAuthorsDto {
  @IsString()
  firstName: string;

  @IsString()
  middleName: string;

  @IsString()
  lastName: string;
}
