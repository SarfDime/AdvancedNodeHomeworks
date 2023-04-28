import { Order } from 'src/interfaces/interfaces'
import { ProductEntity } from 'src/products/entities/product_entities'
import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm'

@Entity('order')
export class OrderEntity implements Order {
    @PrimaryColumn()
    id: string

    @Column({
        type: 'bigint',
    })
    placedAt: number

    @Column()
    description: string

    @OneToMany(() => ProductEntity, (e) => e.order, { onDelete: 'CASCADE' })
    products: ProductEntity[]
}