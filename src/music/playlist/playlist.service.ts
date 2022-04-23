import { HttpException, HttpStatus, Injectable, ParseBoolPipe } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistsRepository } from './playlists.repository';
import { SongsToPlaylistsRepository } from './songsToPlaylists.repository';
import { GenreService } from '../genre/genre.service';
import { instanceToPlain } from 'class-transformer';
import { SongService } from '../song/song.service';
import { User } from 'src/users/entities/user.entity';
import { CreatePlaylistDto } from './createPlaylistDto.dto';

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
        let genres;
        if(!playlist.genres){
            playlist.genres = [];
        }
        
        genres = await this.genreService.addExistingGenres(playlistData, playlist);
        if(genres){
            playlist.genres.push(genres);
        }
        genres = await this.genreService.createNewGenres(playlistData, playlist);
        if(genres){
            playlist.genres.push(genres);
        }

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
        const newPlaylist = await this.playlistsRepository.customSave(playlist);

        // сохранение связей песен и плейлистов 
        // let songsToPlaylists;
        // if(newPlaylist){
        //     songsToPlaylists = await this.songsToPlaylistsRepository.saveMultipleSongs(playlist.songs, newPlaylist);
        // }else{
        //     throw new HttpException(
        //         {
        //             message:'Произошла ошибка при добавлении альбома'
        //         }, 
        //         HttpStatus.BAD_REQUEST
        //     );
        // }

        return newPlaylist;
    }

    async update(playlistData){
        if(playlistData.songIds){
            await this.songsToPlaylistsRepository.updateByPlaylist(playlistData.songIds, playlistData);
        }
        delete playlistData.songIds

        return await this.playlistsRepository.customSave(playlistData);
    }

    async getPlaylistsByCreator(userId:number){
        return await this.playlistsRepository.getPlaylistsByCreator(userId);
    }

    async findById(id: number): Promise<Playlist> {
        return this.playlistsRepository.findById(id);
    }

    async deleteById(id:number){
       return await this.playlistsRepository.deleteById(id);
    }
}
