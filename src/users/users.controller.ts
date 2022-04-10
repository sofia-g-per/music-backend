import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards, Get, Req, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('api')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/sign-up')
    @UsePipes(ValidationPipe)
    async create(@Body() userData: CreateUserDto) {
        return await this.usersService.create(userData);
    }

    // LocalAuthenticationGuard
    @UseGuards(LocalAuthGuard)
    @Post('/log-in')
    @UsePipes(ValidationPipe)
    async login(@Body() userData: LoginDto){
        return await this.usersService.validateUser(userData);
    }

    @Get('/get-user')
    async getCurrentUser(@Request() req){
        return req.user ;
    }

}
