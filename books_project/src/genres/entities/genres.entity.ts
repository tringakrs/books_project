import { Books } from 'src/books/entities/books.entities';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Genres {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  genre: string;

  @Column()
  subGenre: string;

  @ManyToMany(() => Books, (books) => books.genres)
  books: Books[];

  // @OneToMany(() => Genres, (genres) => genres.parent)
  // genres?: Genres[];

  // @ManyToOne(() => Genres, (genres) => genres.genres, {
  //   nullable: true,
  //   createForeignKeyConstraints: false,

  // })
  // parent?: Genres;
}
