import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksModule } from './books/books.module';
import { GenresModule } from './genres/genres.module';
import { PublisherModule } from './publishers/publisher.module';
import { AuthorsModule } from './authors/authors.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Books } from './books/entities/books.entities';
import { Publishers } from './publishers/entities/publishers.entities';
import { Authors } from './authors/entities/authors.entites';
import { Genres } from './genres/entities/genres.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      //which of the env files we want to use
      envFilePath: ['.env'],
      //envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',

          host: config.get<string>('DB_HOST'),

          port: config.get<number>('DB_PORT'),

          username: config.get<string>('DB_USERNAME'),

          password: config.get<string>('DB_PASSWORD'),

          database: config.get<string>('DB_NAME'),

          entities: [Books, Publishers, Authors, Genres],

          synchronize: true,
        };
      },
    }),
    BooksModule,
    GenresModule,
    PublisherModule,
    AuthorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
