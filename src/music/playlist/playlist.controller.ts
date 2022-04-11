import { Controller, Post, Body, Get, Param, Request } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { PlaylistService } from './playlist.service';

@Controller('/api')
export class PlaylistController {
    constructor(private readonly playlistService: PlaylistService) {}

    @Post('/create-playlist')
    async create(@Request() req, @Body() playlist: Playlist) {
        this.playlistService.create(req.user, playlist);
    } 

    @Get('/playlist/:id')
    async findById(@Param("id") id: number): Promise<Playlist> {
        return this.playlistService.findById(id);
    }
}
