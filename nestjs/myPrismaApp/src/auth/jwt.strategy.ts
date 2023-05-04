import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { AuthService } from './auth.service'
import { Request, Response } from 'express'
import { PrismaService } from '../../prisma/prisma.service'
import { acTokenSecret } from '../utils/constants'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly authService: AuthService,
        private readonly prism: PrismaService,
        private jwt: JwtService) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => request?.cookies?.accessToken,
            ]),
            ignoreExpiration: false,
            secretOrKey: acTokenSecret, passReqToCallback: true
        })
    }

    async validate(req: Request, res: Response) {
        try {
            const accessToken = req.cookies['accessToken']
            const payload = await this.jwt.verify(accessToken, { secret: acTokenSecret, ignoreExpiration: false })
            return payload
        } catch (error) { //Probav da napravam avtomatski da ja aktivira refreshTokens ako frli tryot error ama ne se catchnuva
            console.log("dime")  
            this.authService.refreshTokens(req, res)
        }
    }
}