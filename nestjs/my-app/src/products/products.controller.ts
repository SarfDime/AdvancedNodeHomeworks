import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Put,
} from '@nestjs/common';

import { ProductService } from './products.service';
import { routeParamsID } from 'src/interfaces/interfaces';
import { ProductDto } from 'src/dto/dtos';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductService) { }

    @Get(':id?')
    getProducts(
        @Param() params: routeParamsID,
    ) {
        return this.productService.getProducts(params.id)
    }

    createProduct(
        @Body() body: ProductDto
    ) {
        return this.productService.createProduct(body);
    }

    @Put()
    updateProduct(
        @Body() body: ProductDto, @Param() params: routeParamsID,
    ) {
        return this.productService.updateProduct(body, params.id);
    }

    @Delete()
    deleteProduct(
        @Param() params: routeParamsID,
    ) {
        return this.productService.deleteProduct(params.id);
    }
}