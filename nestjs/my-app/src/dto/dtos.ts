import { IsNotEmpty } from 'class-validator';

export class OrderDto {
    @IsNotEmpty()
    products: []
    @IsNotEmpty()
    description: string
}

export class ProductDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    price: number
}