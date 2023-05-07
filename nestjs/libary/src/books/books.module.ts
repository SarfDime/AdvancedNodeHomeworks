import { Module } from '@nestjs/common'
import { BooksService } from './books.service'
import { BooksController } from './books.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { PublisherEntity } from 'src/publisher/entities/publisher.entity'
import { AuthorEntity } from 'src/author/entities/author.entity'
import { BooksEntity } from './entities/book.entity'

@Module({
  imports: [TypeOrmModule.forFeature([BooksEntity, PublisherEntity, AuthorEntity])],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}
