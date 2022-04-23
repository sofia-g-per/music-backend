import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { User } from 'src/users/entities/user.entity';
import { GenreService } from '../genre/genre.service';
import { CreateSongDto } from './createSong.dto';
import { SongsRepository } from './song.repository';
import { ArtistService } from '../artist/artist.service';
import { ArtistsToSongsRepository } from '../artist/artistsToSongs.repository';

@Injectable()
export class SongService {
    constructor(
        @InjectRepository(SongsRepository) private songsRepository: SongsRepository,
        @InjectRepository(ArtistsToSongsRepository) private artistsToSongsRepository: ArtistsToSongsRepository,
        private genreService: GenreService,
        private artistService: ArtistService
    ) {}
    
    async create(user: User, songData: CreateSongDto, files) {
        let song = instanceToPlain(songData);

        //прикреление аудиофайла
        song.filePath = files.audioFile[0]['filename'];

        //прикрепление обложки песни
        if(files.cover){
            song.coverImg = files.cover[0].filename;
        }

        //прикрепление жанров
        let genres;
        if(!song.genres){
            song.genres = [];
        }
        genres = await this.genreService.addExistingGenres(songData, song);
        if(genres){
            song.genres = song.genres.concat(genres);
        }
        genres = await this.genreService.createNewGenres(songData, song);
        if(genres){
            song.genres = song.genres.concat(genres);
        }        
        //прикреление артистов
        song.artists = []
        // let artists = await this.artistService.addExistingArtists(songData, song);
        // if(artists){
        //     song.artists = artists;
        // }
        song.artists.push({
            artist: user.artist,
            isFeatured: false
        })
        // сохранение песни в БД
        const newSong = await this.songsRepository.customSave(song);

        // сохранение связей артистами авторами песни 
        let artistsToSongs;
        if(!newSong){
            throw new HttpException('Произошла ошибка в создании песни', HttpStatus.BAD_REQUEST);
        }

        artistsToSongs = await this.artistsToSongsRepository.saveMultipleArtists(newSong.artists, newSong);
        return newSong.id;
    }

    async update(songData, files){
        console.log(songData, files)
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

