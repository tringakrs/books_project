import { IsString } from 'class-validator';

export class CreatePublishersDto {
  @IsString()
  name: string;
}
