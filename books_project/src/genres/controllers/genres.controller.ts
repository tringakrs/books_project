import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateGenresDto } from '../dtos/create-genres.dto';
import { UpdateGenresDto } from '../dtos/update-genres.dto';
import { Genres } from '../entities/genres.entity';
import { GenresService } from '../genres.service';

@Controller('genres')
export class GenresController {
  constructor(private readonly genresService: GenresService) {}

  @Post()
  async createGenres(
    @Body() createGenresDto: CreateGenresDto,
  ): Promise<Genres> {
    return this.genresService.create(createGenresDto);
  }

  @Get()
  async findGenres(): Promise<Genres[]> {
    return this.genresService.findAll();
  }

  @Get(':id')
  async findGenre(@Param('id') id: number): Promise<Genres> {
    return await this.genresService.findOne(id);
  }

  @Put(':id')
  async updateGenre(
    @Param('id') id: number,
    @Body() updateGenresDto: UpdateGenresDto,
  ): Promise<Genres> {
    return this.genresService.update(id, updateGenresDto);
  }

  @Delete(':id')
  async removeGenre(@Param('id') id: string) {
    return this.genresService.remove(id);
  }
}
