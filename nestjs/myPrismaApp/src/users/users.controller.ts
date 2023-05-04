import { Controller, Get, Param, Post, Body, Delete, Put, UseGuards, Req, Res } from '@nestjs/common'
import { UsersService } from './users.service'
import { UserDto, uUserDto } from '../dto/dtos'
import { routeParamsID } from '../interfaces/interfaces'
import { JwtAuthGuard } from 'src/auth/jwt-guard'
import { Request, Response } from 'express'

@Controller('users')

export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @Get(':id?')
    async getUsers(
        @Param() params: routeParamsID,
    ) {
        return await this.userService.getUsers(params.id)
    }

    @Post()
    async createUser(
        @Body() body: UserDto
    ) {
        return await this.userService.createUser(body)
    }

    @Put(':id?')
    @UseGuards(JwtAuthGuard)
    async updateUser(
        @Body() body: uUserDto, @Req() req: Request, @Res() res: Response, @Param() params: routeParamsID,
    ) {
        await this.userService.updateUser(body, params.id, req, res)
    }

    @Delete(':id?')
    @UseGuards(JwtAuthGuard)
    async deleteUser(
        @Param() params: routeParamsID, @Req() req: Request, @Res() res: Response
    ) {
        await this.userService.deleteUser(params.id, req, res)
    }
}


