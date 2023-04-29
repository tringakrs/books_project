import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Books } from './entities/books.entities';
import { NotFoundError } from 'rxjs';
import { UpdateBooksDto } from './dtos/update-books.dto copy';
import { CreateBooksDto } from './dtos/create-books.dto';
import { AuthorsService } from '../authors/authors.service';
@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Books) private repo: Repository<Books>,
    private authorsService: AuthorsService,
  ) {}

  async createBooks(createBooksDto: CreateBooksDto, authorIds: number[]) {
    const authors = await this.authorsService.findByIds(authorIds);
    const book = this.repo.create(createBooksDto);
    book.authors = authors;
    return await this.repo.save(book);
  }

  async findAll(): Promise<Books[]> {
    return await this.repo.find();
  }

  findOne(id: string) {
    const book = this.repo.findOne({
      where: { id: parseInt(id) },
      relations: ['authors'],
    });

    if (!book) {
      throw new NotFoundException('book not found');
    }

    return book;
  }

  async update(id: string, updateBooksDto: UpdateBooksDto) {
    const book = await this.repo.findOne({
      where: { id: parseInt(id) },

      relations: ['authors'],
    });

    if (!book) {
      throw new NotFoundException('not found');
    }

    if (updateBooksDto.authorIds) {
      const authors = await this.authorsService.findByIds(
        updateBooksDto.authorIds,
      );

      if (!authors || authors.length === 0) {
        throw new BadRequestException('Authors IDs cannot be empty');
      }

      book.authors = authors;
    }

    return await this.repo.save(book);
  }

  async remove(id: string) {
    const books = await this.repo.findOneBy({ id: parseInt(id) });
    return await this.repo.remove(books);
  }
}
