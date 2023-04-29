import { Controller, Get, Post, Put } from '@nestjs/common';
import { PublishersService } from '../publishers.service';

@Controller('publishers')
export class PublishersController {
  constructor(private readonly genresService: PublishersService) {}

  @Post()
  async createPublishers() {}

  @Get()
  async findPublishers() {}

  @Get(':id')
  async findPublisher() {}

  @Put(':id')
  async updatePublisher() {}
}
