import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { OrderEntity } from '../order/entities/order_entities'
import { ProductEntity } from '../products/entities/product_entities'
import { ProductsController } from 'src/products/products.controller'
import { ProductsService } from 'src/products/products.service'

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, ProductEntity])],
  providers: [OrderService, ProductsService],
  controllers: [OrderController, ProductsController],
})
export class OrderModule { }
