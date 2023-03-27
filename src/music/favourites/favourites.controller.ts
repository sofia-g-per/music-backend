import { Controller, Post, Body, Get, UseGuards, Request, Query } from '@nestjs/common';
import { LoggedInGuard } from 'src/users/guards/loggedIn.guard';
import { AddSongstoFavouritesDto } from './addSongsToFavouritesDto.dto';
import { FavoriteSong } from './favoriteSong.entity';
import { FavouritesService } from './favourites.service';

@Controller('api')
export class FavouritesController {
    constructor(private readonly favouritesService: FavouritesService) {}

    @UseGuards(LoggedInGuard)
    @Get('/liked-songs')
    async getLikedSongs(@Request() req): Promise<any[] | undefined> {
        return await this.favouritesService.getByUser(req.user);
    } 

    @UseGuards(LoggedInGuard)
    @Post('/like-song')
    async create(@Body() songData: AddSongstoFavouritesDto, @Request() req): Promise<FavoriteSong | undefined> {
        return await this.favouritesService.create(songData, req.user);
    } 

    @UseGuards(LoggedInGuard)
    @Get('/search-liked-songs')
    async search(@Query('searchQuery') searchQuery: string, @Request() req): Promise<any | undefined> {
        console.log('query', searchQuery)
        if (searchQuery !== undefined && searchQuery.length > 1) {
            return await this.favouritesService.findByQuery(req.user, searchQuery);
        }

    }

    @Post('/delete-like')
    async delete(@Body() songData: AddSongstoFavouritesDto, @Request() req){
        return await this.favouritesService.delete(songData, req.user);
    }
}
