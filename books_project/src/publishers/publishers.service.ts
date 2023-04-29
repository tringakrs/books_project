import { Injectable } from '@nestjs/common';
import { Publishers } from './entities/publishers.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PublishersService {
  constructor(
    @InjectRepository(Publishers)
    private readonly repo: Repository<Publishers>,
  ) {}

  async create() {}

  async findAll() {}

  async findOne() {}

  async update() {}
}
