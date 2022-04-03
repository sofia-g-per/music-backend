import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PlaylistService } from './playlist/playlist.service';
import { Playlist } from './playlist/playlist.entity';

@Controller('api')
export class MusicController {


    // @Get('/search')
    // async find(@Query() query): Promise<Song[]> {
    //     this.songService.find(query);
    // }

}
