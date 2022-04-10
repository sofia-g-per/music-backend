import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { SongService } from './song.service';
import { Song } from './song.entity';
import { AuthGuard } from '@nestjs/passport';

@Controller('/api')
export class SongController {
    constructor(private readonly songService: SongService) {}
    
    // @UseGuards(AuthGuard('local'))
    @Post('/upload-song')
    async create(@Req() request: Request) {
        return request.user;
        // this.songService.create(song);
    }
}
