import { Injectable, BadRequestException, } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductDto, uProductDto } from 'src/dto/dtos'
import { OrderEntity } from '../order/entities/order_entities'
import { ProductEntity } from '../products/entities/product_entities'


@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(ProductEntity)
        private readonly prodRepo: Repository<ProductEntity>,

        @InjectRepository(OrderEntity)
        private readonly orderRepo: Repository<OrderEntity>,
    ) { }

    async getProducts(ID: string): Promise<ProductEntity | ProductEntity[]> {
        if (!ID) return await this.prodRepo.find({ relations: ['order'] })
        const product = await this.prodRepo.findOneBy({ id: ID })
        if (!product) throw new BadRequestException(`Product with ID ${ID} does not exist`,)
        return product
    }

    async createProduct(productDto: ProductDto, ID: string): Promise<string> {
        const order = await this.orderRepo.findOneBy({ id: ID })
        if (!Object.keys(productDto).length) throw new BadRequestException(`Enter data properly`)

        const product = this.prodRepo.create({
            ...productDto,
            order: order
        })
        await this.prodRepo.save(product)

        return `Product ${product.id} created successfully`
    }

    async updateProduct(productDto: uProductDto, ID: string): Promise<string> {
        const product = await this.prodRepo.preload({ id: ID, ...productDto, })

        if (!product) throw new BadRequestException(`Product with ID ${ID} does not exist`,)
        await this.prodRepo.save(product)

        return `Product ${ID} updated successfully`
    }

    async deleteProduct(ID: string) {
        if (!await this.prodRepo.findOne({
            where: { id: ID },
            relations: ['order'],
        })) throw new BadRequestException(`Product with ID ${ID} does not exist`,)
        await this.prodRepo.delete(ID)
        return `Product ${ID} deleted successfully`
    }
}