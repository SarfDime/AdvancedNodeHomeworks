import { BooksEntity } from 'src/books/entities/book.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity('author')
export class PublisherEntity {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    description: string

    @Column()
    address: string

    @Column()
    phoneNumber: number

    @OneToMany(() => BooksEntity, (e) => e.author)
    books: BooksEntity[]
}