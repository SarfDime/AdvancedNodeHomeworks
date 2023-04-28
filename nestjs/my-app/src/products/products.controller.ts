import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    UsePipes,
    ValidationPipe,
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

    @Post(':id')
    @UsePipes(new ValidationPipe({ transform: true}))
    createProduct(
        @Param() params: routeParamsID,
        @Body() body: ProductDto
    ) {
        return this.productService.createProduct(body, params.id);
    }

    @Put(':id')
    updateProduct(
        @Body() body: uProductDto, @Param() params: routeParamsID,
    ) {
        return this.productService.updateProduct(body, params.id);
    }

    @Delete(':id')
    deleteProduct(
        @Param() params: routeParamsID,
    ) {
        return this.productService.deleteProduct(params.id);
    }
}