import { BadRequestException, Injectable } from '@nestjs/common'
import { PublisherDto, uPublisherDto } from 'src/dtos/dtos'
import { PublisherEntity } from './entities/publisher.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

@Injectable()
export class PublisherService {
  constructor(
    @InjectRepository(PublisherEntity)
    private readonly publisherRepo: Repository<PublisherEntity>,
  ) { }

  async findPublishers(ID: string) {
    if (!ID) return this.publisherRepo.find({
      relations: ['books'],
    })

    const publisher = await this.publisherRepo.findOne({
      where: { id: ID },
      relations: ['books'],
    })

    if (!publisher) throw new BadRequestException(`Publisher with ID ${ID} does not exist`,)
    return publisher
  }

  async create(dto: PublisherDto) {
    const publisher = this.publisherRepo.create(dto)

    await this.publisherRepo.save(publisher)
    return `Publisher ${publisher.id} created successfully`
  }

  async update(ID: string, uDto: uPublisherDto) {
    const publisher = await this.publisherRepo.preload({ id: ID, ...uDto, });
    if (!publisher) throw new BadRequestException(`Author with ID ${ID} does not exist`,)

    await this.publisherRepo.save(publisher)

    return `Publisher ${ID} updated successfully`
  }

  async remove(ID: string) {
    if (!(await this.publisherRepo.findOne({ where: { id: ID }, relations: ['books'], }))) throw new BadRequestException(`Publisher with ID ${ID} does not exist`,)

    await this.publisherRepo.delete(ID)
    return `Publisher ${ID} deleted successfully`
  }
}
