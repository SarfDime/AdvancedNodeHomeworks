import { Order } from '../interfaces/interfaces';

export const orderOne: Order = {
    id: '1',
    placedAt: new Date().getTime(),
    description: 'Order One description',
}

export const orderTwo: Order = {
    id: '2',
    placedAt: new Date().getTime(),
    description: 'Order Two description',
}