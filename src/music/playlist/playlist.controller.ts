import { Controller, Post, Body, Get, Param, Request, UseInterceptors, UsePipes, ValidationPipe, UploadedFile, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/shared/file-uploading.utils';
import { LoggedInGuard } from 'src/users/guards/loggedIn.guard';
import { Roles } from 'src/users/guards/roles.decorator';
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

    @Get('/playlist/:id')
    async findById(@Param("id") id: number): Promise<Playlist> {
        return this.playlistService.findById(id);
    }

    @UseGuards(LoggedInGuard)
    @Get('/users-playlists')
    async getUsersPlaylists(@Request() req){
        return await this.playlistService.getPlaylistsByCreator(req.user.id)
    }
}
