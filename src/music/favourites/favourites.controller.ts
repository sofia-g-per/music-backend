import { Controller, Post, Body, Get, UseGuards, Request } from '@nestjs/common';
import { LoggedInGuard } from 'src/users/guards/loggedIn.guard';
import { UsersService } from 'src/users/users.service';
import { AddSongstoFavouritesDto } from './addSongsToFavouritesDto.dto';
import { FavouritesService } from './favourites.service';
import { UsersToSongs } from './usersToSongs.entity';

@Controller('api')
export class FavouritesController {
    constructor(private readonly favouritesService: FavouritesService) {}

    // @Get('/:id')
    // async findById(@Param("id") id: number): Promise<Genre> {
    // }

    @UseGuards(LoggedInGuard)
    @Get('/liked-songs')
    async getLikedSongs(@Request() req): Promise<any[] | undefined> {
        return await this.favouritesService.getByUser(req.user);
    } 

    @UseGuards(LoggedInGuard)
    @Post('/like-song')
    async create(@Body() songData: AddSongstoFavouritesDto, @Request() req): Promise<UsersToSongs | undefined> {
        return await this.favouritesService.create(songData, req.user);
    } 

}
