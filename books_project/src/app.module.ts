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
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { UserController } from './user/user.controller';
import { Users } from 'src/user/entities/user-entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
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
          entities: [Books, Publishers, Authors, Genres, Users],
          synchronize: true,
        };
      },
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1h' },
    }),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    BooksModule,
    GenresModule,
    PublisherModule,
    AuthorsModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
