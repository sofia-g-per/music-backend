import { ArtistsToAlbums } from './artistsToAlbums.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AlbumsRepository } from './albums.repository';
import { SongsToAlbumsRepository } from './songsToAlbums.repository';
import { User } from 'src/users/entities/user.entity';
import { ArtistService } from '../artist/artist.service';
import { ArtistsToAlbumsRepository } from './artistsToAlbums.repository';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { Album } from './album.entity';
import { CreateAlbumDto } from './createAlbum.dto';

@Injectable()
export class AlbumService {
    constructor(
        @InjectMapper() private readonly mapper: Mapper,
        @InjectRepository(AlbumsRepository) private AlbumsRepository: AlbumsRepository,
        @InjectRepository(SongsToAlbumsRepository) private songsToAlbumsRepository: SongsToAlbumsRepository,
        @InjectRepository(ArtistsToAlbumsRepository) private artistToAlbumsRepository: ArtistsToAlbumsRepository,
        private  artistService: ArtistService,

    ) {}

    async create(user: User, albumData: CreateAlbumDto, coverImg:Express.Multer.File) {
        const songIds = albumData.songIds;
        const artistIds = albumData.artistIds;
        let album = this.mapper.map(albumData, CreateAlbumDto, Album);


        // прикрепление обложки альбома при наличии
        if(coverImg){
            album.coverImg = coverImg.filename;
        }
        // сохранение плейлиста в БД
        console.log(album)
        const newAlbum = await this.AlbumsRepository.customSave(album);
        // сохранение связей песен и альбома 
        let songsToAlbums;
        if(newAlbum){
            songsToAlbums = await this.songsToAlbumsRepository.saveMultipleSongs(songIds, newAlbum);
            // добавление авторизированного пользователя как создателя
            artistIds.push({'artistId':user.artist.id, 'isFeatured':false});

            // сохранение связей артистами авторами песни 
            let artistsToSongs;
            if(!newAlbum){
                throw new HttpException('Произошла ошибка при добавлении артистов', HttpStatus.BAD_REQUEST);
            }

        artistsToSongs = await this.artistToAlbumsRepository.saveMultipleArtists(artistIds, newAlbum);
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

    async update(albumData){
        if(albumData.songIds){
            await this.songsToAlbumsRepository.updateByPlaylist(albumData.songIds, albumData);
        }
        delete albumData.songIds
        if(albumData.genreIds){
            albumData.genres = []
            for(const genreId of albumData.genreIds){
                albumData.genres.push({id: genreId});
            }
        }
        return await this.AlbumsRepository.customSave(albumData);
    }

    async findById(id: number): Promise<Album> {
        return this.AlbumsRepository.findById(id);
    }

    async getAlbumsByArtist(artistId: number): Promise<Album[]>{
        return this.AlbumsRepository.findByArtist(artistId);
    }

    async deleteById(id:number){
        return await this.AlbumsRepository.deleteById(id);
     }

     async getAll(){
        return this.AlbumsRepository.getAll();
     }


             //прикрепление жанров
        // let genres;
        // if(!album.genres){
        //     album.genres = [];
        // }
        // genres = await this.genreService.addExistingGenres(albumData.genreIds, album);
        // if(genres){
        //     album.genres = album.genres.concat(genres);
        // }
        // genres = await this.genreService.createNewGenres(albumData.genres, album);
        // if(genres){
        //     album.genres = album.genres.concat(genres);
        // }

        //прикреление песен
        // album.songs = [];
        // let songs = await this.songService.addExistingSongs(albumData, album);
        // if(songs){
        //     album.songs = songs;
        // }
        //прикреление артистов
}
