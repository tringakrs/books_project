import { Injectable, NotFoundException } from '@nestjs/common';
import { Authors } from './entities/authors.entites';
import { In, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateAuthorsDto, CreateAuthorsDto } from './dtos/task-dto';

@Injectable()
export class AuthorsService {
  constructor(@InjectRepository(Authors) private repo: Repository<Authors>) {}

  async findByUsername(firstName: string): Promise<Authors> {
    return await this.repo.findOne({ where: { firstName } });
  }

  async create(createAuthorsDto: CreateAuthorsDto): Promise<Authors> {
    const data = { ...createAuthorsDto };
    return await this.repo.save(this.repo.create(data));
  }

  async findAll(): Promise<Authors[]> {
    return await this.repo.find();
  }

  findOne(id: number) {
    return this.repo.findOneBy({ id });
  }

  async update(
    authorId: number,
    updateAuthorsDto: UpdateAuthorsDto,
  ): Promise<Authors> {
    const author = await this.repo.findOneBy({ id: authorId });
    await this.repo.update((await author).id, updateAuthorsDto);
    return await this.repo.findOneBy({ id: authorId });
  }

  async remove(id: string) {
    const authors = await this.repo.findOneBy({ id: parseInt(id) });

    if (!authors) {
      throw new NotFoundException('Author not found');
    }

    return await this.repo.remove(authors);
  }

  async findByIds(authorIds: number[]) {
    const authors = this.repo.find({ where: { id: In(authorIds) } });
    return authors;
  }
}
