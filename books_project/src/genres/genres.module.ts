import { Module } from '@nestjs/common';
import { GenresController } from './controllers/genres.controller';
import { GenresService } from './genres.service';
import { Genres } from './entities/genres.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Genres])],
  controllers: [GenresController],
  providers: [GenresService],
})
export class GenresModule {}
