import { Controller, Post, Body, Get, Param, Request, UseInterceptors, UsePipes, ValidationPipe, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { editFileName, imageFileFilter } from 'src/shared/file-uploading.utils';
import { CreateAlbumDto } from './createAlbum.dto';
import { Album } from './Album.entity';
import { AlbumService } from './album.service';

@Controller('/api')
export class AlbumController {
    constructor(private readonly albumService: AlbumService) {}

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
    async create(@Request() req, @Body() albumData: CreateAlbumDto, @UploadedFile() coverImg: Express.Multer.File) {
        console.log('controller initial', albumData);
        //Для тестировани с постманом
        if(albumData.songIds){
            albumData.songIds = JSON.parse(albumData.songIds);
        }
        console.log('controller parsed', albumData);

        return await this.albumService.create(req.user, albumData, coverImg);
    } 

    @Get('/Album/:id')
    async findById(@Param("id") id: number): Promise<Album> {
        return this.albumService.findById(id);
    }
}
