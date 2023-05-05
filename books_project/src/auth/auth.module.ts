import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailerService } from 'src/mailer/mailer.service';
import { Users } from 'src/user/entities/user-entity';

@Module({
  imports: [TypeOrmModule.forFeature([Users]), PassportModule],
  providers: [AuthService, MailerService],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
