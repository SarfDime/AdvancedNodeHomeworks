import { Body, Controller, Get, Post, Req, Res } from '@nestjs/common'
import { AuthService } from './auth.service'
import { UserDto } from 'src/dto/dtos'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('logIn')
    async login(@Body() dto: UserDto, @Req() req: Request, @Res() res: Response) {
        await this.authService.login(dto, req, res)
    }

    @Post('logOut')
    async logOut(@Req() req: Request, @Res() res: Response) {
        await this.authService.logout(req, res)
    }

    @Post('refreshTokens')
    async refreshTokens(@Req() req: Request, @Res() res: Response) {
        await this.authService.refreshTokens(req, res)
    }
}
