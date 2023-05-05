import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/roles/enums/role.enum';
import { Repository } from 'typeorm';
import { Users } from './entities/user-entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users) private usersRepository: Repository<Users>,
  ) {}

  async getUserByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async getUsersById(id: number): Promise<Users> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async updateUsersRole(userId: number, role: string) {
    if (!Object.values(Role).includes(role as Role)) {
      throw new BadRequestException('Invalid role value');
    }
    const user = await this.getUsersById(userId);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.role = role as Role;

    return await this.usersRepository.save(user);
  }
}
