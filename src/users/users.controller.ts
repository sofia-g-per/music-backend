import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('api')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/sign-up')
    @UsePipes(ValidationPipe)
    async create(@Body() userData: CreateUserDto) {
        this.usersService.create(userData);
    }

    @Post('/log-in')
    @UsePipes(ValidationPipe)
    async login(@Body() userData: LoginDto){
        this.usersService.validateUser(userData);
    }

}
