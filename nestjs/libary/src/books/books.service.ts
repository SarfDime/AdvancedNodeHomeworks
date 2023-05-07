import { BadRequestException, Injectable } from '@nestjs/common'
import { BookDto, uBookDto } from 'src/dtos/dtos'
import { BooksEntity } from './entities/book.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AuthorEntity } from 'src/author/entities/author.entity'
import { PublisherEntity } from 'src/publisher/entities/publisher.entity'

@Injectable()
export class BooksService {

  constructor(
    @InjectRepository(BooksEntity)
    private readonly bookRepo: Repository<BooksEntity>,
    private readonly publisherRepo: Repository<PublisherEntity>,
    private readonly authorRepo: Repository<AuthorEntity>,
  ) { }

  async findBooks(ID: string) {
    if (!ID) return this.bookRepo.find({
      relations: ['author', 'publisher'],
    })

    const book = await this.bookRepo.findOne({
      where: { id: ID },
      relations: ['author', 'publisher'],
    })

    if (!book) throw new BadRequestException(`Book with ID ${ID} does not exist`,)
    return book
  }

  async create(dto: BookDto) {
    const author = await this.authorRepo.findOneBy({ id: dto.author })

    const publisher = await this.publisherRepo.findOneBy({ id: dto.publisher })

    if(!author || !publisher) throw new BadRequestException(`Publisher or author invalid`)

    const book = this.bookRepo.create({
      ...dto,
      publisher: publisher,
      author: author,
    })

    await this.bookRepo.save(book)

    return `Book ${book.id} created successfully`
  }

  async update(ID: string, uDto: uBookDto) {
    const book = await this.bookRepo.preload({ id: ID, ...uDto, });
    if (!book) throw new BadRequestException(`Book with ID ${ID} does not exist`,)

    await this.bookRepo.save(book)

    return `Author ${ID} updated successfully`
  }

  async remove(ID: string) {
    if (!(await this.bookRepo.findOne({ where: { id: ID }, relations: ['books'], }))) throw new BadRequestException(`Book with ID ${ID} does not exist`,)

    await this.bookRepo.delete(ID)
    return `Book ${ID} deleted successfully`
  }
}
