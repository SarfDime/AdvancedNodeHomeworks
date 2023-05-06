import { BooksEntity } from 'src/books/entities/book.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity('author')
export class AuthorEntity {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    birthDate: Date

    @OneToMany(() => BooksEntity, (e) => e.author)
    books: BooksEntity[]
}