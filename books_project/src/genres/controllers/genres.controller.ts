import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CreateGenresDto } from '../dtos/create-genres.dto';
import { UpdateGenresDto } from '../dtos/update-genres.dto';
import { Genres } from '../entities/genres.entity';
import { GenresService } from '../genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  async createGenres() {}

  @Get()
  async findGenres() {}

  @Get(':id')
  async findGenre() {}

  @Put(':id')
  async updateGenre() {}
}
