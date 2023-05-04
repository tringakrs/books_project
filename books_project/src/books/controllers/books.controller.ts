import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from '../books.service';
import { CreateBooksDto } from '../dtos/create-books.dto';
import { UpdateBooksDto } from '../dtos/update-books.dto copy';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async createBooks(
    @Body() createBooksDto: CreateBooksDto,
    @Body('authorIds') authorIds: number[],
  ) {
    return await this.booksService.createBooks(createBooksDto, authorIds);
  }

  @Get()
  findBooks() {
    return this.booksService.findAll();
  }

  @Get('/:id')
  findBook(@Param('id') id: string) {
    return this.booksService.findOne(id);
  }

  @Put('/:id')
  async updateBook(
    @Param('id') id: string,
    @Body() updateBooksDto: UpdateBooksDto,
  ) {
    return await this.booksService.update(id, updateBooksDto);
  }

  @Delete('/:id')
  async removeBook(@Param('id') id: string) {
    return await this.booksService.remove(id);
  }
}
