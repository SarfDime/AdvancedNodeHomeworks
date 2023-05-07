import { Module } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CustomerController } from './customer.controller'
import { BooksEntity } from 'src/books/entities/book.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { CustomerEntity } from './entities/customer.entity'

@Module({
  imports: [TypeOrmModule.forFeature([CustomerEntity, BooksEntity])],
  controllers: [CustomerController],
  providers: [CustomerService]
})
export class CustomerModule {}
