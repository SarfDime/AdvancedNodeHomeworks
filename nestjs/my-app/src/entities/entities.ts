// import { Order } from 'src/interfaces/interfaces'
// import { OrderEntity } from 'src/order/entities/order_entities'
// import { Entity, Column, PrimaryColumn, OneToMany, ManyToOne } from 'typeorm'

// @Entity('product')
// export class ProductEntity {
//     @PrimaryColumn()
//     id: string

//     @Column()
//     name: string

//     @Column({
//         type: 'bigint',
//     })
//     price: number

//     @ManyToOne(() => OrderEntity, (e) => e.products)
//     order: OrderEntity
// }

// @Entity('order')
// export class OrderEntity implements Order {
//     @PrimaryColumn()
//     id: string

//     @Column({
//         type: 'bigint',
//     })
//     placedAt: number

//     @Column()
//     description: string

//     @OneToMany(() => ProductEntity, (e) => e.order)
//     products: ProductEntity[]
// }