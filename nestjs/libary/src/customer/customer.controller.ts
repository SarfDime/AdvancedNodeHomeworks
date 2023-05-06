import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { CustomerService } from './customer.service'
import { CustomerDto, uCustomerDto } from 'src/dtos/dtos'

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post()
  async create(@Body() createCusotmerDto: CustomerDto) {
    return await this.customerService.create(createCusotmerDto)
  }

  @Get(':id')
  async findCustomers(@Param('id') id: string) {
    return await this.customerService.findCustomers(id)
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCusotmerDto: uCustomerDto) {
    return await this.customerService.update(id, updateCusotmerDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.customerService.remove(id)
  }
}
