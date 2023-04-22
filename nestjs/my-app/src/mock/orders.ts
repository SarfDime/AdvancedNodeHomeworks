import { Order } from '../interfaces/interfaces';
import { allProducts } from './products';

export const orderOne: Order = {
    id: '1',
    placedAt: new Date(),
    description: 'Order One description',
    products: [allProducts[0], allProducts[1]]
}

export const orderTwo: Order = {
    id: '2',
    placedAt: new Date(),
    description: 'Order Two description',
    products: [allProducts[2], allProducts[3], allProducts[0], allProducts[1]]
}


export const allOrders: Order[] = [orderOne, orderTwo]
