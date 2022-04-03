import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { SongService } from './song.service';
import { Song } from './song.entity';

@Controller('/api')
export class SongController {
    constructor(private readonly songService: SongService) {}
    
    @Post('/create-song')
    async create(@Body() song: Song) {
        this.songService.create(song);
    }
}
