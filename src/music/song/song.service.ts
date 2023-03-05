import { AddExistingArtistDto } from './../artist/addExistingArtistDto.dto';
import { CreateArtistToSongDto } from './../artist/createArtistToSong.dto';
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { GenreService } from '../genre/genre.service';
import { CreateSongDto } from './createSong.dto';
import { SongsRepository } from './song.repository';
import { ArtistService } from '../artist/artist.service';
import { ArtistsToSongsRepository } from '../artist/artistsToSongs.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Song } from './song.entity';

@Injectable()
export class SongService {
    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        @InjectRepository(SongsRepository) private songsRepository: SongsRepository,
        @InjectRepository(ArtistsToSongsRepository) private artistsToSongsRepository: ArtistsToSongsRepository,
    ) {}
    
    async create(user: User, songData: CreateSongDto, files) {
        const userAsArtist = new AddExistingArtistDto();
        userAsArtist.artistId = user.artist.id;
        userAsArtist.isFeatured = false;
        if(!songData.artists){
            songData.artists = [];
        }
        songData.artists.push(userAsArtist);
        // const genreIds: number[] = songData.genreIds ?? [];
        // const artistIds: songsT = songData.artistIds ?? [];
        const song:Song = this.mapper.map(songData, CreateSongDto, Song);

        //прикреление аудиофайла
        song.filePath = files.audioFile[0]['filename'];

        //прикрепление обложки песни
        if(files.cover){
            song.coverImg = files.coverImg[0].filename;
        }

        if(files.lyrics){
            song.lyrics = files.lyrics[0].filename;
        }

        //прикреление артистов
        // let artists = song.artists;
        // artists = await this.artistService.addExistingArtists(songData, song);
        // await this.artistService.addExistingArtists(songData, song);
        // if(artists){
        //     song.artists = artists;
        // }

        // сохранение песни в БД
        const newSong = await this.songsRepository.customSave(song);

        // сохранение связей артистами авторами песни 
        if(!newSong){
            throw new HttpException('Произошла ошибка в создании песни', HttpStatus.BAD_REQUEST);
        }
        const artistsToSongs = await this.artistsToSongsRepository.saveMultipleArtists(songData.artists, newSong);

        return newSong.id;
    }

    async update(songData, files){
        //прикреление аудиофайла
        if(songData.filePath){
            songData.filePath = files.audioFile[0]['filename'];
        }

        //прикрепление обложки песни
        if(files.cover){
            songData.coverImg = files.cover[0].filename;
        }

        if(songData.genreIds){
            songData.genres = []
            for(const genreId of songData.genreIds){
                songData.genres.push({id: genreId});
            }
        }

        return await this.songsRepository.customSave(songData);
    }

    async findAll(){
        return await this.songsRepository.findAll()
    }

    async getById(songId:number){
        return await this.songsRepository.findById(songId, false);
    }

    async getSongsByArtist(artistId:number){
        return await this.songsRepository.getAllByArtist(artistId);
    }

    async delete(songId:number){
        return await this.songsRepository.deleteById(songId);
    }

    // СОЗДАНИЕ СВЯЗЕЙ (вызываются при создании других сущностей)
    // targetObject - объект который послужит для создания сущности  (ex. songData)
    // formData - объект с информацией от пользователя (ex. song)

    //прикрепление существующих песен и создание новых
    async addExistingSongs(formData, targetObject){
        if(formData.songIds && formData.songIds.length > 0){
            let songs = await this.songsRepository.addMultipleByIds(formData.songIds, false);
            return targetObject.songs.concat(songs);
        }
    }
}

