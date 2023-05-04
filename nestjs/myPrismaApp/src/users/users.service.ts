import { Injectable, BadRequestException, ForbiddenException } from '@nestjs/common'
import { UserDto, uUserDto } from '../dto/dtos'
import { PrismaService } from 'prisma/prisma.service'
import { Request, Response } from 'express'
import * as bcrypt from 'bcrypt'
import { acTokenSecret } from 'src/utils/constants'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class UsersService {
    constructor(private prism: PrismaService, private jwt: JwtService) { }

    async getUsers(ID: string) {
        if (!ID) return await this.prism.user.findMany({ include: { orders: true } })
        const userByID = await this.prism.user.findFirst({ where: { id: ID }, include: { orders: true } })
        if (!userByID) throw new BadRequestException(`User with ID ${ID} does not exist`)
        return userByID
    }

    async createUser(dto: UserDto) {
        const userExists = await this.prism.user.findFirst({ where: { email: dto.email } })

        if (userExists) throw new BadRequestException(`Email is taken`)
        await this.prism.user.create({ data: { email: dto.email, hashedPassword: await bcrypt.hash(dto.password, 10) } })

        return { message: 'User created succefully' }
    }

    async updateUser(userDto: uUserDto, ID: string, req: Request, res: Response) {
        const accessToken = req.cookies['accessToken']
        const payload = await this.jwt.verify(accessToken, { secret: acTokenSecret, ignoreExpiration: true })
        console.log(payload.id, ID, payload)

        if (payload.id !== ID) throw new ForbiddenException('You are not allowed to update this user.')

        const user = await this.prism.user.update({ where: { id: ID }, data: { email: userDto.email, hashedPassword: await bcrypt.hash(userDto.password, 10) } })
        if (!user) throw new BadRequestException(`User with ID ${ID} does not exist`)
        res.send(`User ${ID} updated successfully`)
    }

    async deleteUser(ID: string, req: Request, res: Response) {
        const accessToken = req.cookies['accessToken']
        const payload = await this.jwt.verify(accessToken, { secret: acTokenSecret, ignoreExpiration: true })
        if (payload.id !== ID) throw new ForbiddenException('You are not allowed to delete this user.')

        await this.prism.user.delete({ where: { id: ID } })
        res.send(`User ${ID} deleted successfully`)
    }
}
