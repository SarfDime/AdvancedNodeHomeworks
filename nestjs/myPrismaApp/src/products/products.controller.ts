import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'
import { ProductsService } from './products.service'
import { routeParamsID } from '../interfaces/interfaces'
import { ProductDto, uProductDto } from 'src/dto/dtos'
import { JwtAuthGuard } from 'src/auth/jwt-guard'

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Get(':id?')
    getProducts(
        @Param() params: routeParamsID,
    ) {
        return this.productService.getProducts(params.id)
    }

    @Post(':id?')
    @UseGuards(JwtAuthGuard)
    createProduct(
        @Param() params: routeParamsID,
        @Body() body: ProductDto
    ) {
        return this.productService.createProduct(body, params.id)
    }

    @Put(':id?')
    @UseGuards(JwtAuthGuard)
    updateProduct(
        @Body() body: uProductDto, @Param() params: routeParamsID,
    ) {
        return this.productService.updateProduct(body, params.id)
    }

    @Delete(':id?')
    @UseGuards(JwtAuthGuard)
    deleteProduct(
        @Param() params: routeParamsID,
    ) {
        return this.productService.deleteProduct(params.id)
    }
}