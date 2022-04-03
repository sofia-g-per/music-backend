import { Injectable } from '@nestjs/common';
import { Playlist } from './playlist.entity';

@Injectable()
export class PlaylistService {
    playlists: Playlist[] = [];

    create(playlist: Playlist) {
        // add current user as creator
        this.playlists.push(playlist);
    }

    // update(id: number , playlist: Playlist) {
    //     // add current user as creator
    //     this.playlists.find((playlist) => playlist.id === id);
    //     this.playlists.push(playlist);
    // }

    findById(id: number): Playlist {
        return this.playlists.find((playlist) => playlist.id === id);
    }
}
