import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { Role } from 'src/roles/enums/role.enum';
import { RolesGuard } from 'src/roles/roles.guard';
import { UsersService } from './user.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get('user')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.USER)
  userRoute() {
    // All users can access this route
    return 'Hello user!';
  }

  @Post('updateUser/:id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async updateRole(@Param('id') id: number, @Body('role') role: string) {
    return await this.usersService.updateUsersRole(id, role as Role);
  }
}
