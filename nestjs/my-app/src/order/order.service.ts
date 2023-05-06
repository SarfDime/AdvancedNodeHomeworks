import { Injectable, BadRequestException } from '@nestjs/common'
import { OrderDto, uOrderDto } from '../dto/dtos'
import { InjectRepository } from '@nestjs/typeorm'
import { OrderEntity } from '../order/entities/order_entities'
import { Repository } from 'typeorm'

@Injectable()
export class OrderService {
    constructor(
        @InjectRepository(OrderEntity)
        private readonly orderRepo: Repository<OrderEntity>,
    ) {}

    async getOrders(ID: string) {
        if (!ID) return this.orderRepo.find({
            relations: ['products'],
        })

        const orderByID = await this.orderRepo.findOne({
            where: { id: ID },
            relations: ['products'],
        })

        if (!orderByID) throw new BadRequestException(`Order with ID ${ID} does not exist`,)
        return orderByID
    }

    async createOrder(orderDto: OrderDto) {
        const order = this.orderRepo.create(orderDto)

        await this.orderRepo.save(order);
        return `Order ${order.id} created successfully`
    }

    async updateOrder(orderDto: uOrderDto, ID: string) {
        const order = await this.orderRepo.preload({ id: ID, ...orderDto, });

        if (!order) throw new BadRequestException(`Order with ID ${ID} does not exist`,)
        await this.orderRepo.save(order)

        return `Order ${ID} updated successfully`
    }

    async deleteOrder(ID: string) {
        if (!(await this.orderRepo.findOne({
            where: { id: ID },
            relations: ['products'],
        }))) throw new BadRequestException(`Order with ID ${ID} does not exist`,)
        await this.orderRepo.delete(ID)
        return `Order ${ID} deleted successfully`
    }
}
