import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CustomerDto, customerPurchase, uCustomerDto } from 'src/dtos/dtos'
import { Repository } from 'typeorm'
import { CustomerEntity } from './entities/customer.entity'
import { BooksEntity } from 'src/books/entities/book.entity'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private readonly bookRepo: Repository<BooksEntity>,
    private readonly customerRepo: Repository<CustomerEntity>,
  ) { }

  async findCustomers(ID: string) {
    if (!ID) return this.customerRepo.find({
      relations: ['boughtBooks', 'rentedBooks'],
    })

    const customer = await this.customerRepo.findOne({
      where: { id: ID },
      relations: ['boughtBooks', 'rentedBooks'],
    })

    if (!customer) throw new BadRequestException(`Customer with ID ${ID} does not exist`,)
    return customer
  }

  async create(dto: CustomerDto) {
    const customer = this.customerRepo.create(dto)

    await this.customerRepo.save(customer)
    return `Customer ${customer.id} created successfully`
  }

  async update(ID: string, uDto: uCustomerDto) {
    const customer = await this.customerRepo.preload({ id: ID, ...uDto, })
    if (!customer) throw new BadRequestException(`Customer with ID ${ID} does not exist`,)

    await this.customerRepo.save(customer)

    return `Customer ${ID} updated successfully`
  }

  async remove(ID: string) {
    if (!(await this.customerRepo.findOne({ where: { id: ID }, relations: ['books'], }))) throw new BadRequestException(`Customer with ID ${ID} does not exist`,)

    await this.customerRepo.delete(ID)
    return `Customer ${ID} deleted successfully`
  }

  async buybooks(ID: string, dto: customerPurchase) {
    const book = await this.bookRepo.findOne({ where: { id: dto.book } })

    if (!book) throw new BadRequestException(`Book with ID ${ID} does not exist`)

    if (book.stock === 0) throw new BadRequestException(`Book with ID ${ID} is out of stock`)
    book.stock--
    await this.bookRepo.save(book)
  }

  async rentBooks(ID: string, dto: customerPurchase) {

  }
}
