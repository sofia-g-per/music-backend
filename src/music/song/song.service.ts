import { Injectable, Query } from '@nestjs/common';
import { Song } from './song.entity';

@Injectable()
export class SongService {
    songs: Song[] = [];

    create(song: Song) {
        // add the artist associated with the current user as song artist
        // this.songs.push(song);

        // return 
    }
}

