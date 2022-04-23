import { Controller, Post, Body, Get, Param, Query, Request, UseInterceptors, UsePipes, ValidationPipe, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/shared/file-uploading.utils';
import { LoggedInGuard } from 'src/users/guards/loggedIn.guard';
import { CreatePlaylistDto } from './createPlaylistDto.dto';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';

@Controller('/api')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService) {}

    @UseGuards(LoggedInGuard)
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
        return await this.playlistService.create(req.user, playlist, coverImg);
    } 

    @Get('/get-playlist')
    async findById(@Query('playlistId') playlistId: number): Promise<Playlist> {
        return this.playlistService.findById(playlistId);
    }

    @UseGuards(LoggedInGuard)
    @Get('/users-playlists')
    async getUsersPlaylists(@Request() req){
        return await this.playlistService.getPlaylistsByCreator(req.user.id)
    }

    @Post('/edit-playlist')
    async update(@Body() playlistData){
        playlistData.id = parseInt(playlistData.id)
        playlistData.songIds = JSON.parse(playlistData.songIds)
        console.log(playlistData.songIds, typeof playlistData.songIds, playlistData.songIds[0])
        return await this.playlistService.update(playlistData);
    }

    @UseGuards(LoggedInGuard)
    @Get('/delete-playlist')
    async delete(@Query('playlistId') playlistId:number, @Request() req){
        console.log(playlistId)
        return await this.playlistService.deleteById(playlistId);
    }
}
