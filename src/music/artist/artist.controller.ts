import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './createArtist.dto';
import { Artist } from './artist.entity';

@Controller('/api')
export class ArtistController {
    constructor(private readonly artistService: ArtistService) {}

    @Post('/create-artist')
    async create(@Body() artistData: CreateArtistDto): Promise<Artist | undefined> {
        return await this.artistService.create(artistData);
    } 

}
