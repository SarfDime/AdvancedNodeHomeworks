import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { CustomerDto, customerPurchase, uCustomerDto } from 'src/dtos/dtos'
import { Repository } from 'typeorm'
import { CustomerEntity } from './entities/customer.entity'
import { BooksEntity } from 'src/books/entities/book.entity'

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(BooksEntity)
    private readonly bookRepo: Repository<BooksEntity>,
    @InjectRepository(CustomerEntity)
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
    const customer = await this.customerRepo.findOne({ where: { id: ID } })
    const book = await this.bookRepo.findOne({ where: { id: dto.book } })

    if (!customer) throw new BadRequestException(`Customer with ID ${ID} does not exist`)
    if (!book) throw new BadRequestException(`Book with ID ${ID} does not exist`)

    if (book.stock === 0) throw new BadRequestException(`Book with ID ${ID} is out of stock`)

    book.buyers.push(customer)
    book.stock--
    await this.bookRepo.save(book)

    customer.boughtBooks.push(book)
    await this.customerRepo.save(customer)

    return `Customer with id ${customer.id}, succesfully bought book with id ${book.id}`
  }

  async rentBook(ID: string, dto: customerPurchase) {
    const customer = await this.customerRepo.findOne({ where: { id: ID } })
    const book = await this.bookRepo.findOne({ where: { id: dto.book } })

    if (!customer) throw new BadRequestException(`Customer with ID ${ID} does not exist`)
    if (!book) throw new BadRequestException(`Book with ID ${ID} does not exist`)

    if (book.stock === 0) throw new BadRequestException(`Book with ID ${ID} is out of stock`)

    book.renters.push(customer)
    book.stock--
    await this.bookRepo.save(book)

    customer.rentedBooks.push(book)
    await this.customerRepo.save(customer)

    return `Customer with id ${customer.id}, succesfully bought book with id ${book.id}`
  }

  async returnBook(ID: string, dto: customerPurchase) {
    const customer = await this.customerRepo.findOne({ where: { id: ID } })
    const book = await this.bookRepo.findOne({ where: { id: dto.book } })

    if (!customer) throw new BadRequestException(`Customer with ID ${ID} does not exist`)
    if (!book) throw new BadRequestException(`Book with ID ${ID} does not exist`)

    const customerIndex = this.getIndex(book.renters, customer.id)
    const bookIndex = this.getIndex(customer.rentedBooks, book.id)
    if (customerIndex === -1 || bookIndex === -1) throw new BadRequestException(`Book with id ${book.id} isn't being rented by ${customer.id}`)

    book.renters.splice(customerIndex, 1)
    book.stock++
    await this.bookRepo.save(book)

    customer.rentedBooks.splice(bookIndex, 1)
    await this.customerRepo.save(customer)

    return `Customer with id ${customer.id}, succesfully returned book with id ${book.id}`
  }

  getIndex(arr: BooksEntity[] | CustomerEntity[], ID: string): number {
    return arr.findIndex((e: { id: string }) => e.id === ID)
  }
}
