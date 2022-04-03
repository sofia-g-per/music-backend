import { Injectable, Query } from '@nestjs/common';
import { Song } from './song.entity';

@Injectable()
export class SongService {
    songs: Song[] = [];

    create(song: Song) {
        this.songs.push(song);
    }

    // find(): Song[]{
    //     return this.songs;
    // }
}

