import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { OrderDto } from '../dto/dtos';
import { Order } from '../interfaces/interfaces'
import { allOrders } from 'src/mock/orders'
import { v4 as uuid } from 'uuid';

@Injectable()
export class OrderService {
    private orders: Order[] = allOrders

    getOrders(ID: string) {
        if (!ID) return this.orders
        let orderByID: Order[] = this.orders.filter(e => e.id === ID)
        if (!orderByID?.length) throw new HttpException(
            `Order with ID ${ID} does not exist`,
            HttpStatus.BAD_REQUEST,
        )
        return orderByID
    }

    createOrder(orderDto: OrderDto) {
        if (!Object.keys(orderDto).length) throw new HttpException(
            `Enter data properly`,
            HttpStatus.BAD_REQUEST,
        )

        const order: Order = {
            ...orderDto,
            id: uuid(),
            placedAt: new Date(),
        }

        this.orders.push(order)
        return `Order ${order.id} created successfully`
    }

    updateOrder(orderDto: OrderDto, ID: string) {
        let tempOrdersArray = this.orders
        for (let i = 0; i < tempOrdersArray.length; i++) {
            if (tempOrdersArray[i].id == ID) {
                tempOrdersArray[i].description = orderDto.description || tempOrdersArray[i].description
                tempOrdersArray[i].products = orderDto.products || tempOrdersArray[i].products
                this.orders = tempOrdersArray
                return `Order ${ID} updated successfully`
            }
        }
        throw new HttpException(
            `Order with ID ${ID} does not exist`,
            HttpStatus.BAD_REQUEST,
        )
    }

    deleteOrder(ID: string) {
        let tempOrdersArray = this.orders
        for (let i = 0; i < tempOrdersArray.length; i++) {
            if (tempOrdersArray[i].id == ID) {
                tempOrdersArray.splice(i, 1)
                this.orders = tempOrdersArray
                return `Order ${ID} deleted successfully`
            }
        }
        throw new HttpException(
            `Order with ID ${ID} does not exist`,
            HttpStatus.BAD_REQUEST,
        )
    }
}
