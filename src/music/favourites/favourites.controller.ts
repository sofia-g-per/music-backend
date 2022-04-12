import { Controller, Post, Body, Get, Param, Request } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AddSongstoFavouritesDto } from './addSongsToFavouritesDto.dto';
import { FavouritesService } from './favourites.service';
import { UsersToSongs } from './usersToSongs.entity';

@Controller('/api')
export class FavouritesController {
    constructor(private readonly favouritesService: FavouritesService) {}

    // @Get('/:id')
    // async findById(@Param("id") id: number): Promise<Genre> {
    // }

    @Post('/like-song')
    async create(@Body() songData: AddSongstoFavouritesDto, @Request() req): Promise<UsersToSongs | undefined> {
        return await this.favouritesService.create(songData, req.user);
    } 

}
