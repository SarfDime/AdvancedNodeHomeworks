import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from '../interfaces/interfaces'
import { allProducts } from 'src/mock/products';
import { ProductDto } from 'src/dto/dtos';
import { v4 as uuid } from 'uuid';

@Injectable()
export class ProductService {
    private products: Product[] = allProducts

    getProducts(ID: string) {
        if (!ID) return this.products
        let productById: Product[] = this.products.filter(e => e.id === ID)
        if (!productById?.length) throw new HttpException(
            `Product with ID ${ID} does not exist`,
            HttpStatus.BAD_REQUEST,
        )
        return productById
    }

    createProduct(productDto: ProductDto) {
        if (!Object.keys(productDto).length) throw new HttpException(
            `Enter data properly`,
            HttpStatus.BAD_REQUEST,
        )

        const product: Product = {
            ...productDto,
            id: uuid(),
        }

        this.products.push(product)
        return `Product ${product.id} created successfully`
    }

    updateProduct(productDto: ProductDto, ID: string) {
        let tempProductsArray = this.products
        for (let i = 0; i < tempProductsArray.length; i++) {
            if (tempProductsArray[i].id == ID) {
                tempProductsArray[i].name = productDto.name || tempProductsArray[i].name
                tempProductsArray[i].price = productDto.price || tempProductsArray[i].price
                this.products = tempProductsArray
                return `Product ${ID} updated successfully`
            }
        }
        throw new HttpException(
            `Product with ID ${ID} does not exist`,
            HttpStatus.BAD_REQUEST,
        )
    }

    deleteProduct(ID: string) {
        let tempProductsArray = this.products
        for (let i = 0; i < tempProductsArray.length; i++) {
            if (tempProductsArray[i].id == ID) {
                tempProductsArray.splice(i, 1)
                this.products = tempProductsArray
                return `Product ${ID} deleted successfully`
            }
        }
        throw new HttpException(
            `Product with ID ${ID} does not exist`,
            HttpStatus.BAD_REQUEST,
        )
    }
}