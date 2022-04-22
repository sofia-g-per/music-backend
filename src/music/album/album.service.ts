import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Album } from './album.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsRepository } from './albums.repository';
import { SongsToAlbumsRepository } from './songsToAlbums.repository';
import { GenreService } from '../genre/genre.service';
import { instanceToPlain } from 'class-transformer';
import { SongService } from '../song/song.service';
import { User } from 'src/users/entities/user.entity';
import { CreateAlbumDto } from './createalbum.dto';
import { ArtistService } from '../artist/artist.service';
import { getRepository } from 'typeorm';
import { ArtistsToAlbums } from './artistsToAlbums.entity';

@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumsRepository) private AlbumsRepository: AlbumsRepository,
        @InjectRepository(SongsToAlbumsRepository) private songsToAlbumsRepository: SongsToAlbumsRepository,
        private  genreService: GenreService,
        private  songService: SongService,
        private  artistService: ArtistService,

    ) {}

    async create(user: User, albumData: CreateAlbumDto, coverImg:Express.Multer.File) {
        let album = instanceToPlain(albumData);
        //прикрепление жанров
        let genres;
        if(!album.genres){
            album.genres = [];
        }
        genres = await this.genreService.addExistingGenres(albumData, album);
        if(genres){
            album.genres.push(genres);
        }
        genres = await this.genreService.createNewGenres(albumData, album);
        if(genres){
            album.genres.push(genres);
        }
        //прикреление песен
        album.songs = [];
        let songs = await this.songService.addExistingSongs(albumData, album);
        if(songs){
            album.songs = songs;
        }
        //прикреление артистов
        album.artists = [];
        let artists = await this.artistService.addExistingArtists(albumData, album);
        if(artists){
            album.artists = artists;
        }
        // добавление авторизированного пользователя как создателя
        album.artists.push({
            artist: user.artist,
            isFeatured: false
        })
        // прикрепление обложки плейлиста при наличии
        if(coverImg){
            album.coverImg = coverImg.filename;
        }
        // сохранение плейлиста в БД
        const newAlbum = await this.AlbumsRepository.customSave(album);
        // сохранение связей песен и альбома 
        let songsToAlbums;
        if(newAlbum){
            songsToAlbums = await this.songsToAlbumsRepository.saveMultipleSongs(album.songs, newAlbum);
        }else{
            throw new HttpException(
                {
                    message:'Произошла ошибка при добавлении альбома'
                }, 
                HttpStatus.BAD_REQUEST
            );
        }
        return newAlbum;
    }

    async findById(id: number): Promise<Album> {
        return this.AlbumsRepository.findById(id);
    }
}
