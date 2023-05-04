import { IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator'

export class OrderDto {
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    name: string
}

export class uOrderDto {
    @IsOptional()
    description: string
    @IsOptional()
    name: string
}

export class ProductDto {
    @IsNotEmpty()
    name: string
    @IsNotEmpty()
    description: string
    @IsNotEmpty()
    price: number
}

export class uProductDto {
    @IsOptional()
    name: string
    @IsOptional()
    description: string
    @IsOptional()
    price: number
}

export class UserDto {
    @IsEmail()
    email: string
    @IsNotEmpty()
    @Length(8, 16, { message: 'Password must be at least 5 and at most 13 characters long' })
    password: string
}

export class uUserDto {
    @IsOptional()
    email: string
    @Length(8, 16, { message: 'Password must be at least 5 and at most 13 characters long' })
    @IsOptional()
    password: string
}