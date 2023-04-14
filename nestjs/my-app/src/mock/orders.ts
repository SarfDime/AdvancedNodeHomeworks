import { Order, Product } from '../interfaces/interfaces';

const productOne: Product = { id: '4y12b12471uo24gb4679', name: 'Potato Salad', price: 650 }
const productTwo: Product = { id: 'gnifaww0u82091ujfn', name: 'Mashed Potatoes', price: 450 }
const productThree: Product = { id: '8duaw9y2h1', name: 'Boiled Potatoes', price: 150 }
const productFour: Product = { id: 'dwa67td8t78', name: 'French Fries', price: 550 }

export const orderOne: Order[] = [
    {
        id: '1',
        placedAt: new Date(),
        products: [productOne, productTwo]
    }
]

export const orderTwo: Order[] = [
    {
        id: '2',
        placedAt: new Date(),
        products: [productThree, productFour, productOne, productThree]
    }
]
