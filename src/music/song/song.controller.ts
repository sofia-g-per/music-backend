import { Controller, Get, Post, Body, UseGuards, Req, Request } from '@nestjs/common';
import { SongService } from './song.service';
import { Song } from './song.entity';
import { AuthGuard } from '@nestjs/passport';
import { CreateSongDto } from './createSong.dto';

@Controller('/api')
export class SongController {
    constructor(private readonly songService: SongService) {}
    
    // @UseGuards(AuthGuard('local'))
    @Post('/upload-song')
    async create(@Request() req, @Body() songData: CreateSongDto) {
        return await this.songService.create(req.user, songData);
    }
}
