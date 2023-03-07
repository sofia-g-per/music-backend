import { Controller, Get, Post, Body, UseGuards, Query, Request, UseInterceptors, ValidationPipe, UsePipes, UploadedFile, UploadedFiles, Param } from '@nestjs/common';
import { SongService } from './song.service';
import { CreateSongDto } from './createSong.dto';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/shared/file-uploading.utils';
import { Roles } from 'src/users/guards/roles.decorator';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { LoggedInGuard } from 'src/users/guards/loggedIn.guard';

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
                {name:'coverImg', maxCount: 1}, 
                {name:'lyrics', maxCount: 1}, 
            ],
            {
                storage: diskStorage({
                    destination: './uploaded/songs',
                    filename: editFileName
                }),
            }),
        )
    @UsePipes(new ValidationPipe({transform:true}))
    async create(@Request() req, @Body() songData: CreateSongDto,
        @UploadedFiles() files: { audioFile: Express.Multer.File[], coverImg?: Express.Multer.File[], lyrics?:  Express.Multer.File[]}) 
    {
        // songData.artists = JSON.parse(songData.artists)
        // songData.genreIds = JSON.parse(songData.genres)
        return await this.songService.create(req.user, songData, files);
    }

    @Get('/get-all-songs')
    async findAll(){
        return await this.songService.findAll();
    }

    @Roles('artist')
    @UseGuards(RolesGuard)
    @Get('/get-song-by-current-artist')
    async getSongsByCurrentArtist(@Request() req){
        return await this.songService.getSongsByArtist(req.user.artist.id);
    }

    @Roles('artist')
    @UseGuards(RolesGuard)
    @Post('/delete-song')
    async delete(@Body() songData, @Request() req){
        return await this.songService.delete(songData.songId);
    }

    @Roles('artist')
    @UseGuards(RolesGuard)
    @Get('/get-song')
    async getById(@Query('songId') songId: number, @Request() req){
        return await this.songService.getById(songId);
    }

    @Roles('artist')
    @UseGuards(RolesGuard)
    @Post('/edit-song')
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
    async update(@Body() songData, @UploadedFiles() files: { audioFile: Express.Multer.File[], cover?: Express.Multer.File[] }){
        songData.id = parseInt(songData.id)
        songData.genreIds = JSON.parse(songData.genreIds)
        return await this.songService.update(songData, files);
    }

    @UseGuards(LoggedInGuard)
    @Post('/listened')
    async addToListenedHistory(@Request() req, @Body() songData){
        return await this.songService.addToListenedHistory(songData.songId, req.user);
    }

    @UseGuards(LoggedInGuard)
    @Get('/generated/playlist')
    async getGeneratedPlaylist(@Request() req){
        return await this.songService.getGeneratedPlaylist(req.user);
    }
}
