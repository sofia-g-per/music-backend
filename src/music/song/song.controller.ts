import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { SongService } from './song.service';
import { Song } from './song.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api')
export class SongController {
    constructor(private readonly songService: SongService) {}
    
    @UseGuards(AuthGuard('local'))
    @Post('/create-song')
    async create(@Body() song: Song) {
        this.songService.create(song);
    }
}
