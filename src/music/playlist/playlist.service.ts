import { Injectable } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistsRepository } from './playlists.repository';
import { SongsToPlaylistsRepository } from './songsToPlaylists.repository';
import { GenreService } from '../genre/genre.service';
import { instanceToPlain } from 'class-transformer';
import { SongService } from '../song/song.service';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(PlaylistsRepository) private playlistsRepository: PlaylistsRepository,
        @InjectRepository(SongsToPlaylistsRepository) private songsToPlaylistsRepository: SongsToPlaylistsRepository,
        private  genreService: GenreService,
        private  songService: SongService,

    ) {}

    async create(user: User, playlistData: Playlist) {
        let playlist = instanceToPlain(playlistData);

        //прикрепление жанров
        if(!playlist.genres){
            playlist.genres = [];
        }
        playlist.genres = await this.genreService.addExistingGenres(playlistData, playlist);
        playlist.genres = await this.genreService.addExistingGenres(playlistData, playlist);

        //прикреление песен
        playlist.songs = [];
        let songs = await this.songService.addExistingSongs(playlistData, playlist);
        if(songs){
            playlist.songs = songs;
        }

        // добавление авторизированного пользователя как создателя
        songs.creator = user;

        // сохранение плейлист в БД
        const newPlaylist = await this.playlistsRepository.customSave(playlist);

        // сохранение связей песен и плейлистов 
        let songsToplaylists;
        if(newPlaylist){
            songsToplaylists = await this.songsToPlaylistsRepository.saveMultipleSongs(playlist.songs, newPlaylist);
        }

        return newPlaylist;
    }

    // async update(id: number , playlist: Playlist) {
    //     // add current user as creator
    //     this.playlists.find((playlist) => playlist.id === id);
    //     this.playlists.push(playlist);
    // }

    async findById(id: number): Promise<Playlist> {
        return this.playlistsRepository.findById(id);
    }
}
