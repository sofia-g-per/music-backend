import { HttpException, HttpStatus, Injectable, ParseBoolPipe } from '@nestjs/common';
import { Playlist } from './playlist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PlaylistsRepository } from './playlists.repository';
import { SongsToPlaylistsRepository } from './songsToPlaylists.repository';
import { GenreService } from '../genre/genre.service';
import { SongService } from '../song/song.service';
import { User } from 'src/users/entities/user.entity';
import { CreatePlaylistDto } from './createPlaylistDto.dto';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';

@Injectable()
export class PlaylistService {
    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        @InjectRepository(PlaylistsRepository) private playlistsRepository: PlaylistsRepository,
        @InjectRepository(SongsToPlaylistsRepository) private songsToPlaylistsRepository: SongsToPlaylistsRepository,
        private  genreService: GenreService,
        private  songService: SongService,

    ) {}

    async create(user: User, playlistData: CreatePlaylistDto, coverImg:Express.Multer.File) {
        const songIds = playlistData.songIds;
        let playlist = this.mapper.map(playlistData, CreatePlaylistDto, Playlist);

        // прикрепление обложки плейлиста при наличии
        if(coverImg){
            playlist.coverImg = coverImg.filename;
        }

        // добавление авторизированного пользователя как создателя
        playlist.creator = user;

        // сохранение плейлиста в БД
        const newPlaylist = await this.playlistsRepository.customSave(playlist);

        // сохранение связей песен и плейлистов 
        let songsToPlaylists;
        if(newPlaylist){
            songsToPlaylists = await this.songsToPlaylistsRepository.saveMultipleSongs(songIds, newPlaylist);
        }else{
            throw new HttpException(
                {
                    message:'Произошла ошибка при добавлении альбома'
                }, 
                HttpStatus.BAD_REQUEST
            );
        }

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
