import { Controller, Post, Body, Get, Query, Request, UseInterceptors, UsePipes, ValidationPipe, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/shared/file-uploading.utils';
import { CreateAlbumDto } from './createAlbum.dto';
import { Album } from './album.entity';
import { AlbumService } from './album.service';
import { Roles } from 'src/users/guards/roles.decorator';
import { RolesGuard } from 'src/users/guards/roles.guard';

@Controller('/api')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

    @Roles('artist')
    @UseGuards(RolesGuard)
    @Post('/create-album')
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
    async create(@Request() req, @Body() albumData, @UploadedFile() coverImg: Express.Multer.File) {
        console.log('controller initial', albumData, coverImg);
        //Для тестировани с постманом
        if(albumData.songIds){
            albumData.songIds = JSON.parse(albumData.songIds);
            albumData.artistIds = JSON.parse(albumData.artistIds);
        }

        return await this.albumService.create(req.user, albumData, coverImg);
    } 

    @Get('/albums')
    async getAll(@Query('albumId') albumId: number): Promise<Album> {
        return this.albumService.findById(albumId);
    }

    @Get('/get-album')
    async findById(@Query('albumId') albumId: number): Promise<Album> {
        return this.albumService.findById(albumId);
    }

    @Roles('artist')
    @UseGuards(RolesGuard)
    @Get('/albums-by-current-artist')
    async getUsersAlbums(@Request() req){
        return await this.albumService.getAlbumsByArtist(req.user.artist.id)
    }

    @Roles('artist')
    @UseGuards(RolesGuard)
    @Get('/delete-album')
    async delete(@Query('albumId') albumId:number, @Request() req){
        console.log(albumId)
        return await this.albumService.deleteById(albumId);
    }

    @Roles('artist')
    @UseGuards(RolesGuard)
    @Post('/edit-album')
    async update(@Body() albumData){
        albumData.id = parseInt(albumData.id)
        albumData.songIds = JSON.parse(albumData.songIds)
        albumData.genreIds = JSON.parse(albumData.genreIds)
        return await this.albumService.update(albumData);
    }
}
