import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards, Get, Req, Request, UploadedFile } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from 'src/shared/file-uploading.utils';
import { diskStorage } from 'multer';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('api')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post('/sign-up')
    @UseInterceptors(
        FileInterceptor('avatar', {
            storage: diskStorage({
                destination: './uploaded/avatars',
                filename: editFileName
            }),
            fileFilter: imageFileFilter,
        }),
    )
    @UsePipes(ValidationPipe)
    async create(@Body() userData: CreateUserDto, @UploadedFile() avatar: Express.Multer.File) {
        return await this.usersService.create(userData, avatar);
    }

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
