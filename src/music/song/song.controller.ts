import { Controller, Get, Post, Body, UseGuards, Req, Request, UseInterceptors, ValidationPipe, UsePipes, UploadedFile, UploadedFiles } from '@nestjs/common';
import { SongService } from './song.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSongDto } from './createSong.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/shared/file-uploading.utils';
import { Roles } from 'src/users/guards/roles.decorator';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { LoggedInGuard } from 'src/users/guards/loggedIn.guard';


@Controller('/api')
export class SongController {
    constructor(private readonly songService: SongService) {}
    
    @Roles('artist')
    @UseGuards(RolesGuard)
    @Post('/upload-song')
    //добавить валидацию форматов для файлов
    @UseInterceptors(
        FileFieldsInterceptor(
            [
                {name:'audioFile', maxCount: 1}, 
                {name:'cover', maxCount: 1}, 
            ],
            {
                storage: diskStorage({
                    destination: './uploaded/songs',
                    filename: editFileName
                }),
                
            }),
        )
    @UsePipes(ValidationPipe)
    async create(@Request() req, @Body() songData: CreateSongDto,
         @UploadedFiles() files: { audioFile: Express.Multer.File[], cover?: Express.Multer.File[] }) 
    {
        //Для тестировани с постманом
        if(songData.artistIds){
            songData.artistIds = JSON.parse(songData.artistIds[0]);
        }

        return await this.songService.create(req.user, songData, files);
    }
}
