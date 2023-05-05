import { IsEmail, IsString } from 'class-validator';
import { Role } from 'src/roles/enums/role.enum';

export class UsersDto {
  @IsEmail()
  email: string;
  @IsString()
  password: string;

  role: Role = Role.USER;
}
