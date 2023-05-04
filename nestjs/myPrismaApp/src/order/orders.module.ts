import { Module } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderController } from './order.controller'
import { JwtService } from '@nestjs/jwt'

@Module({
  providers: [OrderService, JwtService],
  controllers: [OrderController],
})
export class OrderModule { }
