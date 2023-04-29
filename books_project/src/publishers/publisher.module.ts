import { Module } from '@nestjs/common';
import { PublishersController } from './controllers/publishers.controller';
import { PublishersService } from './publishers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Publishers } from './entities/publishers.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Publishers])],
  controllers: [PublishersController],
  providers: [PublishersService],
})
export class PublisherModule {}
