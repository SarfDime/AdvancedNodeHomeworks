import { BooksEntity } from 'src/books/entities/book.entity'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity('customer')
export class CustomerEntity{
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    phoneNumber: number

    @OneToMany(() => BooksEntity, (e) => e.author)
    rentedBooks: BooksEntity[]

    @OneToMany(() => BooksEntity, (e) => e.author)
    boughtBooks: BooksEntity[]
}