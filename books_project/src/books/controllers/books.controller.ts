import {
  Body,
  Controller,
  Delete,
  FileTypeValidator,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BooksService } from '../books.service';
import { CreateBooksDto } from '../dtos/create-books.dto';
import { UpdateBooksDto } from '../dtos/update-books.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
      }),
    }),
  )
  uploadFileAndPassValidation(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }

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
