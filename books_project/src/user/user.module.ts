import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from './entities/user-entity';
import { UsersController } from './user.controller';
import { UsersService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), UsersModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
