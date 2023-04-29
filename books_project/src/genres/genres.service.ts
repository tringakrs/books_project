import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateGenresDto } from './dtos/create-genres.dto';
import { UpdateGenresDto } from './dtos/update-genres.dto';
import { Genres } from './entities/genres.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genres)
    private readonly repo: Repository<Genres>,
  ) {}

  async create() {}

  async findAll() {}

  async findOne() {}

  async update() {}
}
