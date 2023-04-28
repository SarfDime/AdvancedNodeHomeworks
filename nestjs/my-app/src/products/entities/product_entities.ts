import { Order } from 'src/interfaces/interfaces'
import { OrderEntity } from 'src/order/entities/order_entities'
import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm'


@Entity('product')
export class ProductEntity {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column({
        type: 'bigint',
    })
    price: number

    @ManyToOne(() => OrderEntity, (e) => e.products)
    order: OrderEntity
}
