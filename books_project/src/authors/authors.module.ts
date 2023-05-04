import { Module } from '@nestjs/common';
import { AuthorsController } from './controllers/authors.controller';
import { AuthorsService } from './authors.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Authors } from './entities/authors.entites';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Authors]), PassportModule],
  controllers: [AuthorsController],
  providers: [AuthorsService],
  exports: [AuthorsService],
})
export class AuthorsModule {}
