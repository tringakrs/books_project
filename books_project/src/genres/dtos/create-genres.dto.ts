import { IsString } from 'class-validator';

export class CreateGenresDto {
  @IsString()
  genre: string;

  @IsString()
  subGenre: string;

  // @IsNumber()
  // parentId?: number;

  // parent?: Genres;
}
