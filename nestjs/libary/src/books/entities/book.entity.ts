import { AuthorEntity } from 'src/author/entities/author.entity'
import { CustomerEntity } from 'src/customer/entities/customer.entity'
import { PublisherEntity } from 'src/publisher/entities/publisher.entity'
import { Entity, Column, PrimaryColumn, OneToMany, OneToOne } from 'typeorm'

@Entity('books')
export class BooksEntity {
    @PrimaryColumn()
    id: string

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    genre: string

    @Column()
    stock: number

    @OneToOne(() => AuthorEntity, (e) => e.books)
    author: AuthorEntity

    @OneToOne(() => PublisherEntity, (e) => e.books)
    publisher: PublisherEntity

    @OneToMany(() => CustomerEntity, (e) => e.rentedBooks)
    renters: PublisherEntity[]
}