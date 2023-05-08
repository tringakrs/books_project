import { Injectable } from '@nestjs/common';
import { Publishers } from './entities/publishers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePublishersDto } from './dtos/create-publishers.dto';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publishers)
    private readonly repo: Repository<Publishers>,
  ) {}

  async create(createPublishersDto: CreatePublishersDto): Promise<Publishers> {
    const publishers = await this.repo.create(createPublishersDto);
    return this.repo.save(publishers);
  }

  async findAll() {}

  async findOne() {}

  async update() {}
}
