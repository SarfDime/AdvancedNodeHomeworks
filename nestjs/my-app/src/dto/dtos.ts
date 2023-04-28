import { IsNotEmpty, IsOptional } from 'class-validator'
import { v4 as uuid } from 'uuid'

export class OrderDto {
    @IsOptional()
    id: string = uuid()
    @IsNotEmpty()
    description: string
    @IsOptional()
    placedAt: number = new Date().getTime()
}

export class uOrderDto {
    @IsNotEmpty()
    description: string
}

export class ProductDto {
    @IsOptional()
    id: string = uuid()
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    price: number
}

export class uProductDto {
    @IsOptional()
    name: string
    @IsOptional()
    price: number
}