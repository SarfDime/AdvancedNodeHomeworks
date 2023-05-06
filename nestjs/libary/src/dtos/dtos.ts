import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, ValidateNested } from 'class-validator'
import { v4 as uuid } from 'uuid'

export class AuthorDto {
    @IsOptional()
    id: string = uuid()
    @IsNotEmpty()
    name: string
    @IsEmail()
    email: string
    @IsNotEmpty()
    birthDate: string
}

export class uAuthorDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    email: string
    @IsNotEmpty()
    birthDate: string
}

export class BookDto {
    @IsOptional()
    id: string = uuid()
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    genre: string
    @IsNotEmpty()
    stock: number
    @ValidateNested()
    @IsObject()
    links: {
        author: string
        publisher: string
    }
}

export class uBookDto {
    @IsOptional()
    title: string
    @IsOptional()
    stock: number
    @IsOptional()
    description: string
    @IsOptional()
    genre: string
}

export class PublisherDto {
    @IsOptional()
    id: string = uuid()
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    address: string
    @IsNotEmpty()
    phoneNumber: number
}

export class uPublisherDto {
    @IsOptional()
    name: string
    @IsOptional()
    address: string
    @IsOptional()
    phoneNumber: number
}

export class CustomerDto {
    @IsOptional()
    id: string = uuid()
    @IsNotEmpty()
    name: string
    @IsEmail()
    email: string
    @IsNotEmpty()
    phoneNumber: number
}

export class uCustomerDto {
    @IsNotEmpty()
    name: string
    @IsEmail()
    email: string
    @IsNotEmpty()
    phoneNumber: number
}

export class customerPurchase{
    book: string
}