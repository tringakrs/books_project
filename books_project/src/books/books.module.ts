import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthorsModule } from 'src/authors/authors.module';
import { BooksService } from './books.service';
import { BooksController } from './controllers/books.controller';
import { Books } from './entities/books.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Books]), AuthorsModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
