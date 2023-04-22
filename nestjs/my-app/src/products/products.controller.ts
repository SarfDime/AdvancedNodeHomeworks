import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { routeParamsID } from 'src/interfaces/interfaces';
import { ProductDto, uProductDto } from 'src/dto/dtos';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Get(':id?')
    getProducts(
        @Param() params: routeParamsID,
    ) {
        return this.productService.getProducts(params.id)
    }

    @Post()
    createProduct(
        @Body() body: ProductDto
    ) {
        return this.productService.createProduct(body);
    }

    @Put(':id?')
    updateProduct(
        @Body() body: uProductDto, @Param() params: routeParamsID,
    ) {
        return this.productService.updateProduct(body, params.id);
    }

    @Delete(':id?')
    deleteProduct(
        @Param() params: routeParamsID,
    ) {
        return this.productService.deleteProduct(params.id);
    }
}