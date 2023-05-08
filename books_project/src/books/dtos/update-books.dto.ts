import { IsOptional, IsString } from 'class-validator';

export class UpdateBooksDto {
  title: string;

  totalPages: number;

  rating: number;

  isbn: string;

  publishedDate: string;

  authorIds?: number[];
}
