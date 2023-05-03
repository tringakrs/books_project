import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOneOptions, In, Repository } from 'typeorm';
import { CreateGenresDto } from './dtos/create-genres.dto';
import { UpdateGenresDto } from './dtos/update-genres.dto';
import { Genres } from './entities/genres.entity';

@Injectable()
export class GenresService {
  constructor(
    @InjectRepository(Genres)
    private readonly repo: Repository<Genres>,
  ) {}

  // async create(createGenresDto: CreateGenresDto): Promise<Genres> {
  //   const { parentId, ...data } = createGenresDto;
  //   if (parentId) {
  //     data.parent = await this.repo.findOne({
  //       where: { id: parentId },
  //     });
  //   }
  //   console.log(data.parent);
  //   console.log(data);
  //   return await this.repo.save(this.repo.create(data));
  // }

  // async findAll(): Promise<Genres[]> {
  //   return await this.repo.find({
  //     relations: ['parent'],
  //   });
  // }

  // async findOne(id: number) {
  //   return this.repo.findOne({ where: { id }, relations: ['parent'] });
  // }

  async create(createGenresDto: CreateGenresDto): Promise<Genres> {
    const data = { ...createGenresDto };
    return await this.repo.save(this.repo.create(data));
  }

  findAll(): Promise<Genres[]> {
    return this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOne({ where: { id } });
  }

  async update(
    genreId: number,
    updateGenresDto: UpdateGenresDto,
  ): Promise<Genres> {
    const genres = await this.repo.findOneBy({ id: genreId });
    await this.repo.update((await genres).id, updateGenresDto);
    return await this.repo.findOneBy({ id: genreId });
  }

  async remove(id: string) {
    const genres = await this.repo.findOneBy({ id: parseInt(id) });
    if (!genres) {
      throw new NotFoundException('Genre not found');
    }
    return await this.repo.remove(genres);
  }
}
