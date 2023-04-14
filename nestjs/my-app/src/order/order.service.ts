import { Injectable } from '@nestjs/common'
import { Order } from '../interfaces/interfaces'
import { orderOne, orderTwo } from 'src/mock/orders'

@Injectable()
export class OrderService {
    private orders: Order[] = [...orderOne, ...orderTwo]

    getOrders() {
        return this.orders
    }
}