import {
    Controller,
    Get,
    Param,
    Post,
    Body,
    Delete,
    Put,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderDto } from '../dto/dtos';
import { routeParamsID } from 'src/interfaces/interfaces';

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
    createOrder(
        @Body() body: OrderDto
    ) {
        return this.orderService.createOrder(body);
    }

    @Put()
    updateOrder(
        @Body() body: OrderDto, @Param() params: routeParamsID,
    ) {
        return this.orderService.updateOrder(body, params.id);
    }

    @Delete()
    deleteOrder(
        @Param() params: routeParamsID,
    ) {
        return this.orderService.deleteOrder(params.id);
    }
}


