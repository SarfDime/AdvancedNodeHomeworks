import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common'
import { AuthorService } from './author.service'
import { AuthorDto, uAuthorDto } from 'src/dtos/dtos'

@Controller('author')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true}))
  async create(@Body() createAuthorDto: AuthorDto) {
    return await this.authorService.create(createAuthorDto)
  }

  @Get(':id?')
  async findAuthors(@Param('id') id: string) {
    return await this.authorService.findAuthors(id)
  }

  @Patch(':id?')
  async update(@Param('id') id: string, @Body() uDto: uAuthorDto) {
    return await this.authorService.update(id, uDto)
  }

  @Delete(':id?')
  async remove(@Param('id') id: string) {
    return await this.authorService.remove(id)
  }
}
