export interface Product {
    id: string,
    name: string,
    price: number
}

export interface Order {
    id: string,
    placedAt: Date,
    description: string
    products: Product[]
}

export interface routeParamsID {
    id: string;
}