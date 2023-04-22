import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Product } from '../interfaces/interfaces'
import { allProducts } from 'src/mock/products';


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
}