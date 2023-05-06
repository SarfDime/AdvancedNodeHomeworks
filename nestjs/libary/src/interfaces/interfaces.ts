export interface Book {
    title: string
    description: string
    genre: string
    stock: number
    author: Author
    publisher: Publisher
    renter: Customer[]
}

export interface Publisher {
    name: string
    address: string
    phoneNumber: number
    books: Book[]
}

export interface Author {
    name: string
    email: string
    birthDate: Date
    books: Book[]
}

export interface Customer {
    name: string
    email: string
    phoneNumber: number
    rentedBooks: Book[]
    boughtBooks: Book[]
}

export interface routeParamsID {
    id: string;
}