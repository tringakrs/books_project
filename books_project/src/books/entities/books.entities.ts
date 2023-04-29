import { IsOptional, IsString } from 'class-validator';
import { Authors } from 'src/authors/entities/authors.entites';
import { Genres } from 'src/genres/entities/genres.entity';
import { Publishers } from 'src/publishers/entities/publishers.entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Books {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  totalPages: number;

  @Column()
  rating: number;

  @Column()
  isbn: string;

  @Column()
  publishedDate: string;

  @ManyToOne(() => Publishers, (publishers) => publishers.books)
  publishers: Publishers;

  @ManyToMany(() => Authors)
  @JoinTable()
  authors: Authors[];

  @ManyToMany(() => Genres)
  @JoinTable()
  genres: Genres[];
}
