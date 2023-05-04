import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../../prisma/prisma.service'
import { UserDto } from 'src/dto/dtos'
import { acTokenSecret, rfTokenSecret, acEat, rfEat } from '../utils/constants'
import { Request, Response } from 'express'
import { user } from '@prisma/client'
import * as argon2 from 'argon2'
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(private prism: PrismaService, private jwt: JwtService) { }

    async getDecryptedElement(arr: string[], id: string): Promise<number> {
        const decryptedElement = arr.find(async (e) => {
            return await argon2.verify(e, id)
        })

        if (!decryptedElement) throw new ForbiddenException('Please log in again')
        const index = arr.findIndex(async (e) => {
            const result = await argon2.verify(e, id)
            return result
        })

        return index
    }

    async generateAccessToken(user: user) {
        return await this.jwt.signAsync({ id: user.id, email: user.email }, {
            secret: acTokenSecret,
            expiresIn: acEat,
        })
    }

    async generateRefreshToken(user: user) {
        return this.jwt.sign({ id: user.id, email: user.email }, {
            secret: rfTokenSecret,
            expiresIn: rfEat,
        })
    }

    async login(dto: UserDto, req: Request, res: Response) {
        try {
            const cookieAccess = req.cookies['refreshToken']
            const payload = await this.jwt.verify(cookieAccess, { secret: rfTokenSecret, ignoreExpiration: false })
            if (payload) throw new BadRequestException(`Already logged in`)
        } catch (e) {
            if (e.message === 'Already logged in') return res.status(400).send(e.message)
        }

        const user = await this.prism.user.findFirst({ where: { email: dto.email } })
        if (!user) throw new BadRequestException(`Email doesn't exist`)
        if (await bcrypt.compare(dto.password, user.hashedPassword)) {
            const accessToken = await this.generateAccessToken(user)
            const refreshToken = await this.generateRefreshToken(user)
            const hashedRfToken = await argon2.hash(refreshToken)

            await this.prism.user.update({
                where: { id: user.id },
                data: {
                    rfTokens: {
                        push: hashedRfToken,
                    },
                },
            })

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            res.cookie('accessToken', accessToken, {
                httpOnly: true,
                sameSite: 'lax',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })

            return res.status(200).send('Logged in successfully')
        }
        throw new BadRequestException(`Password is incorrect`)
    }


    async logout(req: Request, res: Response) {
        const refreshToken = req.cookies['refreshToken']
        if (!refreshToken) throw new ForbiddenException(`User has no active sessions`)
        const payload = await this.jwt.verify(refreshToken, { secret: rfTokenSecret, ignoreExpiration: true })

        const user = await this.prism.user.findFirst({ where: { id: payload.id } })
        if (!user) throw new BadRequestException(`Email doesn't exist`)
        if (!user.rfTokens.length) throw new BadRequestException(`User has no active sessions`)

        let index: number = await this.getDecryptedElement(user.rfTokens, payload.id)

        user.rfTokens.splice(index, 1);

        await this.prism.user.update({
            where: {
                id: user.id
            },
            data: {
                rfTokens: {
                    set: user.rfTokens,
                },
            },
        })

        res.clearCookie('refreshToken')
        res.clearCookie('accessToken')
        return res.status(200).send('Logged out successfully')
    }

    async refreshTokens(req: Request, res: Response) {
        const refreshToken = req.cookies['refreshToken']
        const accessToken = req.cookies['accessToken']

        if (!accessToken || !refreshToken) throw new ForbiddenException('Session expired')

        const payload = await this.jwt.verify(accessToken, { secret: acTokenSecret, ignoreExpiration: true })
        const user = await this.prism.user.findFirst({ where: { id: payload.id } })

        try {
            const temp = await this.jwt.verify(accessToken, { secret: acTokenSecret, ignoreExpiration: false });
            if (temp) throw new BadRequestException(`Session is still valid`)
        } catch (e) {
            if (e.message === 'Session is still valid') return res.status(400).send(e.message)
        }

        let index: number = await this.getDecryptedElement(user.rfTokens, payload.id)

        const newAccessToken = await this.generateAccessToken(user)
        const newRefreshToken = await this.generateRefreshToken(user)

        const hashedRfToken = await argon2.hash(newRefreshToken)

        user.rfTokens.splice(index, 1);

        await this.prism.user.update({
            where: {
                id: user.id
            },
            data: {
                rfTokens: {
                    set: user.rfTokens,
                },
            },
        })

        await this.prism.user.update({
            where: { id: user.id },
            data: {
                rfTokens: {
                    push: hashedRfToken,
                },
            },
        })

        res.cookie('refreshToken', newRefreshToken, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.cookie('accessToken', newAccessToken, {
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).send('Session renewed successfully')
    }
}