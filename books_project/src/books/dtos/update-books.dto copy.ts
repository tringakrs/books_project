import { IsOptional, IsString } from 'class-validator';

export class UpdateBooksDto {
  @IsOptional()
  title: string;

  @IsOptional()
  totalPages: number;

  @IsOptional()
  rating: number;

  @IsOptional()
  isbn: string;

  @IsOptional()
  publishedDate: string;

  @IsString()
  @IsOptional()
  published_date: string;
  authorIds?: number[];
}
