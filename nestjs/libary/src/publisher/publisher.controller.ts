import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common'
import { PublisherService } from './publisher.service'
import { PublisherDto, uPublisherDto } from 'src/dtos/dtos'

@Controller('publisher')
export class PublisherController {
  constructor(private readonly publisherService: PublisherService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true}))
  async create(@Body() dto: PublisherDto) {
    return await this.publisherService.create(dto)
  }

  @Get(':id?')
  async findPublishers(@Param('id') id: string) {
    return await this.publisherService.findPublishers(id)
  }

  @Patch(':id?')
  async update(@Param('id') id: string, @Body() uDto: uPublisherDto) {
    return await this.publisherService.update(id, uDto)
  }

  @Delete(':id?')
  async remove(@Param('id') id: string) {
    return await this.publisherService.remove(id)
  }
}
