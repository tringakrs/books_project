import { IsString } from 'class-validator';

export class UpdatePublishersDto {
  @IsString()
  name: string;
}
