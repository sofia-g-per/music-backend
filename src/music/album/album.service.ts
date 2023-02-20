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
import { ArtistsToAlbumsRepository } from './artistsToAlbums.repository';
@Injectable()
export class AlbumService {
    constructor(
        @InjectRepository(AlbumsRepository) private AlbumsRepository: AlbumsRepository,
        @InjectRepository(SongsToAlbumsRepository) private songsToAlbumsRepository: SongsToAlbumsRepository,
        @InjectRepository(ArtistsToAlbumsRepository) private artistToAlbumsRepository: ArtistsToAlbumsRepository,
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
        genres = await this.genreService.addExistingGenres(albumData.genreIds, album);
        if(genres){
            album.genres = album.genres.concat(genres);
        }
        genres = await this.genreService.createNewGenres(albumData.genres, album);
        if(genres){
            album.genres = album.genres.concat(genres);
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
        let artist = {
            artist: user.artist,
            isFeatured: false
        }
        album.artists.push(artist)
        // прикрепление обложки альбома при наличии
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

        // сохранение связей артистами авторами песни 
        let artistsToSongs;
        if(!newAlbum){
            throw new HttpException('Произошла ошибка в создании песни', HttpStatus.BAD_REQUEST);
        }

        artistsToSongs = await this.artistToAlbumsRepository.saveMultipleArtists(newAlbum.artists, newAlbum);
        return newAlbum.id;

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
}
