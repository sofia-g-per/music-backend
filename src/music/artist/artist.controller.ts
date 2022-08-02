import { Controller, Post, Body, Get, Request, UseGuards } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './createArtist.dto';
import { Artist } from './artist.entity';
import { RolesGuard } from 'src/users/guards/roles.guard';
import { Roles } from 'src/users/guards/roles.decorator';

@Controller('/api')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Post('/create-artist')
    async create(@Body() artistData: CreateArtistDto): Promise<Artist | undefined> {
        return await this.artistService.create(artistData);
    } 

    @Roles('artist')
    @UseGuards(RolesGuard)
    @Get('/artists')
    async findAllExceptCurrent(@Request() req): Promise<Artist[] | undefined>{

        return await this.artistService.findAllExceptCurrent(req.user.artist.id)
    }

    // @Roles('artist')
    // @UseGuards(RolesGuard)
    @Get('/artist-songs')
    async getSongsByArtist(@Request() req) 
    {
        return await this.artistService.getSongs(req.user.artist.id);
    }

}
