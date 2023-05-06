import { Module } from '@nestjs/common'
import { AuthorModule } from './author/author.module'
import { BooksModule } from './books/books.module'
import { PublisherModule } from './publisher/publisher.module'
import { CustomerModule } from './customer/customer.module'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [AuthorModule, BooksModule, PublisherModule, CustomerModule, TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'dimedime123',
    database: 'Orders',
    autoLoadEntities: true,
    synchronize: true,
  })]
})

export class AppModule { }