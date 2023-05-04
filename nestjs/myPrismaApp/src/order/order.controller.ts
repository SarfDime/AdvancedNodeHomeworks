import { Controller, Get, Param, Post, Body, Delete, Put, UseGuards, Req, Res } from '@nestjs/common'
import { OrderService } from './order.service'
import { OrderDto, uOrderDto } from '../dto/dtos'
import { routeParamsID } from '../interfaces/interfaces'
import { JwtAuthGuard } from 'src/auth/jwt-guard'
import { Request, Response } from 'express'

@Controller('orders')

export class OrderController {
    constructor(private readonly orderService: OrderService) { }

    @Get(':id?')
    async getOrders(
        @Param() params: routeParamsID, @Req() req: Request, @Res() res: Response
    ) {
        await this.orderService.getOrders(params.id, req, res)
    }

    @Post(':id?')
    @UseGuards(JwtAuthGuard)
    async createOrder(
        @Body() body: OrderDto, @Param() params: routeParamsID
    ) {
        return await this.orderService.createOrder(body, params.id)
    }

    @Put(':id?')
    @UseGuards(JwtAuthGuard)
    async updateOrder(
        @Body() body: uOrderDto, @Param() params: routeParamsID, @Req() req: Request, @Res() res: Response
    ) {
        await this.orderService.updateOrder(body, params.id, req, res)
    }

    @Delete(':id?')
    @UseGuards(JwtAuthGuard)
    async deleteOrder(
        @Param() params: routeParamsID, @Req() req: Request, @Res() res: Response
    ) {
        await this.orderService.deleteOrder(params.id, req, res)
    }
}


