import { LoggedInGuard } from './guards/loggedIn.guard';
import { Body, Controller, Post, UsePipes, ValidationPipe, UseGuards, Get, Query, Request, UploadedFile } from '@nestjs/common';
import { UsersService } from './services/users.service';
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

    // @Get('/get-user')
    // async getCurrentUser(@Request() req){
    //     return req.user ;
    // }

    // @UseGuards(LocalAuthGuard)
    @Post('/edit-user')
    async editUser(@Body() userData, @Request() req){
        console.log('controller', userData, req.user)
        let updatedUser = await this.usersService.updateUser(userData, req.user);
        req.login(updatedUser, async(error) => {
            if (error) {
              let res = {
                err: 'простите, во время обновления информации произошла ошибка.'
              };
              return;
            }
        });
        req.session.save(function(err) {console.log(err)});

        return updatedUser;
    }

    @UseGuards(LoggedInGuard)
    @Get('/delete-user')
    async deleteCurrentUser(@Request() req){
        return await this.usersService.delete(req.user.id);

    }

    @Get('/get-user')
    async getUserById(@Query('userId') userId:number){
        return await this.usersService.findById(userId);
    }

}
