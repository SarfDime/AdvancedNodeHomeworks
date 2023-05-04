import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common'
import { OrderDto, uOrderDto } from '../dto/dtos'
import { PrismaService } from 'prisma/prisma.service'
import { JwtService } from '@nestjs/jwt'
import { Request, Response } from 'express'
import { acTokenSecret } from 'src/utils/constants'
@Injectable()
export class OrderService {
    constructor(private prism: PrismaService, private jwt: JwtService) { }

    async getOrders(ID: string, req: Request, res: Response){
        if (!ID) return res.send(await this.prism.order.findMany({ include: { products: true } }))

        const orderByID = await this.prism.order.findFirst({ where: { id: ID }, include: { products: true } })
        if (!orderByID) throw new BadRequestException(`Order with ID ${ID} does not exist`)

        const accessToken = req.cookies['accessToken']
        const payload = await this.jwt.verify(accessToken, { secret: acTokenSecret, ignoreExpiration: true })
        if (payload.id !== orderByID.userId) throw new ForbiddenException('You are not allowed to update this order.')

        res.send(orderByID)
    }

    async createOrder(orderDto: OrderDto, ID: string) {
        const user = await this.prism.user.findFirst({ where: { id: ID } })
        if (!user) throw new BadRequestException(`User with id ${ID} doesn't exist`)

        const order = await this.prism.order.create({ data: { ...orderDto, user: { connect: { id: ID } } } })
        return `Order ${order.id} created successfully`
    }

    async updateOrder(orderDto: uOrderDto, ID: string, req: Request, res: Response) {
        const orderByID = await this.prism.order.findFirst({ where: { id: ID }, include: { products: true } })
        if (!orderByID) throw new BadRequestException(`Order with ID ${ID} does not exist`)

        const accessToken = req.cookies['accessToken']
        const payload = await this.jwt.verify(accessToken, { secret: acTokenSecret, ignoreExpiration: true })
        if (payload.id !== orderByID.userId) throw new ForbiddenException('You are not allowed to update this order.')

        const order = await this.prism.order.update({ where: { id: ID }, data: orderDto })
        if (!order) throw new BadRequestException(`Order with ID ${ID} does not exist`)
        res.send(`Order ${ID} updated successfully`)
    }

    async deleteOrder(ID: string, req: Request, res: Response) {
        const orderByID = await this.prism.order.findFirst({ where: { id: ID }, include: { products: true } })
        if (!orderByID) throw new BadRequestException(`Order with ID ${ID} does not exist`)

        const accessToken = req.cookies['accessToken']
        const payload = await this.jwt.verify(accessToken, { secret: acTokenSecret, ignoreExpiration: true })
        if (payload.id !== orderByID.userId) throw new ForbiddenException('You are not allowed to delete this order.')

        const count = await this.prism.order.delete({ where: { id: ID } })
        if (!count) throw new BadRequestException(`Order with ID ${ID} does not exist`)
        res.send(`Order ${ID} deleted successfully`)
    }
}
