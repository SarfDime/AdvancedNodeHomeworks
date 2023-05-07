import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common'
import { BooksService } from './books.service'
import { BookDto, uBookDto } from 'src/dtos/dtos'

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true}))
  async create(@Body() dto: BookDto) {
    return await this.booksService.create(dto)
  }

  @Get(':id?')
  async findBooks(@Param('id') id: string) {
    return await this.booksService.findBooks(id)
  }

  @Patch(':id?')
  async update(@Param('id') id: string, @Body() uDto: uBookDto) {
    return await this.booksService.update(id, uDto)
  }

  @Delete(':id?')
  async remove(@Param('id') id: string) {
    return await this.booksService.remove(id)
  }
}
