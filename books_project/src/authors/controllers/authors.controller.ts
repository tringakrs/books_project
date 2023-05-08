import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { AuthorsService } from '../authors.service';
import { Authors } from '../entities/authors.entity';
import { UpdateAuthorsDto, CreateAuthorsDto } from '../dtos/task-dto';

@Controller('authors')
export class AuthorsController {
  constructor(private authorsService: AuthorsService) {}

  @Post()
  async createAuthors(@Body() createAuthorsDto: CreateAuthorsDto) {
    return await this.authorsService.create(createAuthorsDto);
  }

  @Get()
  async findAuthors(): Promise<Authors[]> {
    return await this.authorsService.findAll();
  }

  @Get('/:id')
  findAuthor(@Param('id') id: string) {
    return this.authorsService.findOne(parseInt(id));
  }

  @Put('/:id')
  updateAuthor(@Param('id') id: number, @Body() body: UpdateAuthorsDto) {
    return this.authorsService.update(id, body);
  }

  @Delete('/:id')
  async removeAuthor(@Param('id') id: string) {
    return await this.authorsService.remove(id);
  }
}
