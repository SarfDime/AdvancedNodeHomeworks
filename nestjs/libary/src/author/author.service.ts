import { BadRequestException, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { AuthorDto, uAuthorDto } from 'src/dtos/dtos'
import { AuthorEntity } from './entities/author.entity'
import { Repository } from 'typeorm'

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(AuthorEntity)
    private readonly authorRepo: Repository<AuthorEntity>,
  ) { }

  async findAuthors(ID: string) {
    if (!ID) return this.authorRepo.find({
      relations: ['books'],
    })

    const author = await this.authorRepo.findOne({
      where: { id: ID },
      relations: ['books'],
    })

    if (!author) throw new BadRequestException(`Author with ID ${ID} does not exist`,)
    return author
  }

  async create(dto: AuthorDto) {
    const author = this.authorRepo.create(dto)

    await this.authorRepo.save(author)
    return `Author ${author.id} created successfully`
  }

  async update(ID: string, uDto: uAuthorDto) {
    const author = await this.authorRepo.preload({ id: ID, ...uDto, });
    if (!author) throw new BadRequestException(`Author with ID ${ID} does not exist`,)

    await this.authorRepo.save(author)

    return `Author ${ID} updated successfully`
  }

  async remove(ID: string) {
    if (!(await this.authorRepo.findOne({ where: { id: ID }, relations: ['books'], }))) throw new BadRequestException(`Author with ID ${ID} does not exist`,)

    await this.authorRepo.delete(ID)
    return `Author ${ID} deleted successfully`
  }
}
