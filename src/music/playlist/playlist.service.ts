import { Injectable, ParseBoolPipe } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistsRepository } from './playlists.repository';
import { SongsToPlaylistsRepository } from './songsToPlaylists.repository';
import { GenreService } from '../genre/genre.service';
import { instanceToPlain } from 'class-transformer';
import { SongService } from '../song/song.service';
import { User } from 'src/users/entities/user.entity';
import { CreatePlaylistDto } from './createPlaylist.dto';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectRepository(PlaylistsRepository) private playlistsRepository: PlaylistsRepository,
        @InjectRepository(SongsToPlaylistsRepository) private songsToPlaylistsRepository: SongsToPlaylistsRepository,
        private  genreService: GenreService,
        private  songService: SongService,

    ) {}

    async create(user: User, playlistData: CreatePlaylistDto, coverImg:Express.Multer.File) {
        let playlist = instanceToPlain(playlistData);

        playlist.isPublic = Boolean(playlist.isPublic);

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

        // прикарепление обложки плейлиста при наличии
        if(coverImg){
            playlist.coverImg = coverImg.filename;
        }

        // добавление авторизированного пользователя как создателя
        playlist.creator = user;

        // сохранение плейлист в БД
        console.log('service', playlist);
        const newPlaylist = await this.playlistsRepository.customSave(playlist);

        // сохранение связей песен и плейлистов 
        let songsToPlaylists;
        if(newPlaylist){
            songsToPlaylists = await this.songsToPlaylistsRepository.saveMultipleSongs(playlist.songs, newPlaylist);
        }else{
            return undefined
        }

        //поменять return на dto
        return newPlaylist.songs;
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
