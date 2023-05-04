import { Injectable, BadRequestException, } from '@nestjs/common'
import { ProductDto, uProductDto } from 'src/dto/dtos'
import { PrismaService } from 'prisma/prisma.service'

@Injectable()
export class ProductsService {
    constructor(private prism: PrismaService) { }

    async getProducts(ID: string) {
        if (!ID) return await this.prism.product.findMany({ include: { order: true } })
        const product = await this.prism.product.findFirst({ where: { id: ID }, include: { order: true } })
        if (!product) throw new BadRequestException(`Product with ID ${ID} does not exist`)
        return product
    }

    async createProduct(productDto: ProductDto, ID: string) {
        const order = await this.prism.order.findFirst({ where: { id: ID } })
        if (!order) throw new BadRequestException(`Order with id ${ID} doesn't exist`)
        const product = await this.prism.product.create({ data: { ...productDto, order: { connect: { id: ID } } } })
        return `Product ${product.id} created successfully`
    }

    async updateProduct(productDto: uProductDto, ID: string) {
        const product = await this.prism.product.update({ where: { id: ID }, data: productDto })
        if (!product) throw new BadRequestException(`Product with ID ${ID} does not exist`)
        return `Product ${ID} updated successfully`
    }

    async deleteProduct(ID: string) {
        const count = await this.prism.product.delete({ where: { id: ID } })
        if (!count) throw new BadRequestException(`Product with ID ${ID} does not exist`)
        return `Product ${ID} deleted successfully`
    }
}
