import { IsString } from 'class-validator';

export class UpdateGenresDto {
  @IsString()
  genre?: string;

  @IsString()
  subGenre: string;

  // @IsNumber()
  // parentId?: number;
}
