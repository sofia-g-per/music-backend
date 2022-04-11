import { Controller, Post, Body, Get, Param, Request, UseInterceptors, UsePipes, ValidationPipe, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/shared/file-uploading.utils';
import { CreatePlaylistDto } from './createPlaylist.dto';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';

@Controller('/api')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService) {}

    @Post('/create-playlist')
    @UseInterceptors(
        FileInterceptor('coverImg', {
            storage: diskStorage({
                destination: './uploaded/coverImg',
                filename: editFileName
            }),
            fileFilter: imageFileFilter,
        }),
    )
    @UsePipes(ValidationPipe)
    async create(@Request() req, @Body() playlist: CreatePlaylistDto, @UploadedFile() coverImg: Express.Multer.File) {
        console.log('controller initial', playlist);
        //Для тестировани с постманом
        if(playlist.songIds){
            playlist.songIds = JSON.parse(playlist.songIds);
        }
        console.log('controller parsed', playlist);

        return await this.playlistService.create(req.user, playlist, coverImg);
    } 

    @Get('/playlist/:id')
    async findById(@Param("id") id: number): Promise<Playlist> {
        return this.playlistService.findById(id);
    }
}
