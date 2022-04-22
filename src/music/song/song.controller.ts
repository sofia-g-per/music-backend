import { LoggedInGuard } from './../../users/guards/loggedIn.guard';
import { Controller, Get, Post, Body, UseGuards, Req, Request, UseInterceptors, ValidationPipe, UsePipes, UploadedFile, UploadedFiles } from '@nestjs/common';
import { SongService } from './song.service';
import { AuthGuard } from '@nestjs/passport';
import { CreateSongDto } from './createSong.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/shared/file-uploading.utils';
import { Roles } from 'src/users/guards/roles.decorator';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('/api')
export class SongController {
    constructor(private readonly songService: SongService) {}
    
    @Roles('artist')
    @UseGuards(RolesGuard)
    @Post('/upload-song')
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
        return await this.songService.create(req.user, songData, files);
    }

    @Get('/get-all-songs')
    async findAll(){
        return await this.songService.findAll();
    }

    @UseGuards(LoggedInGuard)
    @Get('/get-song-by-current-artist')
    async getSongsByCurrentArtist(@Request() req){
        return await this.songService.getSongsByArtist(req.user.artist.id);
    }

    @Roles('artist')
    @UseGuards(RolesGuard)
    @Post('/delete-song')
    async delete(@Body() songData, @Request() req){
        console.log(songData, songData.songId)
        return await this.songService.delete(songData.songId);
    }
}
