import { IsArray, IsNumber, IsString } from 'class-validator';

export class CreateBooksDto {
  @IsString()
  title: string;

  @IsNumber()
  totalPages: number;

  @IsNumber()
  rating: number;

  @IsString()
  isbn: string;

  @IsString()
  publishedDate: string;

  @IsArray()
  @IsNumber({}, { each: true })
  authorIds?: number[];
}
