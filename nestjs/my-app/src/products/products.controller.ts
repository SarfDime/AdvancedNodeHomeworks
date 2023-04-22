import {
    Controller,
    Get,
    Param,
} from '@nestjs/common';

import { ProductService } from './products.service';
import { routeParamsID } from 'src/interfaces/interfaces';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductService) { }

    @Get(':id?')
    getProducts(
        @Param() params: routeParamsID,
    ) {
        return this.productService.getProducts(params.id)
    }
}