import { Controller, Get, Param, Post, Body, Delete, Put, ValidationPipe, UsePipes, } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderDto, uOrderDto } from '../dto/dtos'
import { routeParamsID } from 'src/interfaces/interfaces'

@Controller('orders')

export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get(':id?')
    getOrders(
        @Param() params: routeParamsID,
    ) {
        return this.orderService.getOrders(params.id)
    }

    @Post()
    @UsePipes(new ValidationPipe({ transform: true}))
    createOrder(
        @Body() body: OrderDto
    ) {
        return this.orderService.createOrder(body);
    }

    @Put(':id')
    updateOrder(
        @Body() body: uOrderDto, @Param() params: routeParamsID,
    ) {
        return this.orderService.updateOrder(body, params.id);
    }

    @Delete(':id')
    deleteOrder(
        @Param() params: routeParamsID,
    ) {
        return this.orderService.deleteOrder(params.id);
    }
}


