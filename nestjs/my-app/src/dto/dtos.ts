import { IsNotEmpty } from 'class-validator'
import { v4 as uuid } from 'uuid'

export class OrderDto {
    @IsNotEmpty()
    products: ProductDto[] // probav da go stavam tuka ama nekje pak
    @IsNotEmpty()
    description: string
}

export class uOrderDto {
    products: ProductDto[]
    description: string
}

export class ProductDto {
    id: string = uuid() // Kako da go napravam ova da se defaultne na uuid()
    name: string
    @IsNotEmpty()
    price: number
}

export class uProductDto {
    name: string
    price: number
}