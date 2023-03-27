import { instanceToPlain } from 'class-transformer';
import { PlaylistDto } from './../playlist/playlistDto.dto';
import { generatedPlaylist } from './../playlist/generatedPlaylist.entity';
import { ListenedSongsRepository } from './../favourites/listenedSongs.repository';
import { AddExistingArtistDto } from './../artist/addExistingArtistDto.dto';
import { Injectable, HttpException, HttpStatus, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { CreateSongDto } from './createSong.dto';
import { SongsRepository } from './song.repository';
import { ArtistsToSongsRepository } from '../artist/artistsToSongs.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Song } from './song.entity';
import { EntityManager, getRepository } from 'typeorm';
import { SongDto } from './songDto.dto';

@Injectable()
export class SongService {
    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        @InjectRepository(SongsRepository) private songsRepository: SongsRepository,
        @InjectRepository(ArtistsToSongsRepository) private artistsToSongsRepository: ArtistsToSongsRepository,
        @InjectRepository(ListenedSongsRepository) private listenedSongsRepository: ListenedSongsRepository,
        @Inject(EntityManager) private entityManager: EntityManager,
    ) {}
    
    async create(user: User, songData: CreateSongDto, files) {
        const userAsArtist = new AddExistingArtistDto();
        userAsArtist.artistId = user.artist.id;
        userAsArtist.isFeatured = false;
        if(!songData.artists){
            songData.artists = [];
        }
        songData.artists.push(userAsArtist);

        const song:Song = this.mapper.map(songData, CreateSongDto, Song);

        //прикреление аудиофайла
        song.filePath = files.audioFile[0]['filename'];

        //прикрепление обложки песни
        if(files.coverImg){
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
        console.log(song.genres);
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
        if(files.audioFile && files.audioFile[0]){
            songData.filePath = files.audioFile[0]['filename'];
        }

        //прикрепление обложки песни
        if(files.coverImg && files.coverImg[0]){
            songData.coverImg = files.coverImg[0].filename;
        }

        if(songData.genreIds){
            songData.genres = []
            for(const genreId of songData.genreIds){
                songData.genres.push({id: genreId});
            }
        }
        delete songData.genreIds
        console.log(songData)

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

    async addToListenedHistory(songId, user){
        return await this.listenedSongsRepository.customSave({userId: user.id, songId: songId});
    }

    // получение персонализированного плейлиста
    async getGeneratedPlaylist(user){
         // запрос к базе данных
        const result = await getRepository(generatedPlaylist)
        .createQueryBuilder("GeneratedPlaylist")
        .select("song_id", "songId")
        .where(`user_id = ${user.id}`)
        .execute();
        // обработка результата запросы
        if(result){
            const songIds: number[] = [];
            result.forEach(song => songIds.push(song.songId));
            const playlist = new PlaylistDto;
            // добавление инфорамции для каждой песни плейлиста
            playlist.songs = await this.songsRepository.findMultipleByIds(songIds, true);
            playlist.name = 'Плейлист специально для вас'; 
            
            return playlist;
        // обработка ошибки
        }else{
            throw HttpException.createBody({message: 'Не удалось найти плейлист для данного пользователя'})
        }
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

