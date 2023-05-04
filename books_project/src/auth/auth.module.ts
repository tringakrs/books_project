import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/user/entities/user-entity';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), PassportModule],
  controllers: [AuthController],
  providers: [AuthService, MailerService],
})
export class AuthModule {}
