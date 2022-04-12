import { Injectable } from '@nestjs/common';
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
        album.artists = []
        let artists = await this.artistService.addExistingArtists(albumData, album);
        // сейчас можно добавлять артистов только без isfeatured, а метод addExistingArtists возврщает с isfeatured (структура AddexistingArtistDto)
        // поэтому заносится только авторизированный пользователь (мы зансим его именно как массив Artist, а не структуру типо 
        // AddexistingArtistDto)
        console.log('album service artist result', artists)
        if(artists){
            album.artists = artists;
        }

        // добавление авторизированного пользователя как создателя
        album.artists.push(user.artist);

        // прикрепление обложки плейлиста при наличии
        if(coverImg){
            album.coverImg = coverImg.filename;
        }

        // сохранение плейлиста в БД
        console.log('service album', album);
        const newAlbum = await this.AlbumsRepository.customSave(album);

        // сохранение связей песен и альбома 
        let songsToAlbums;
        if(newAlbum){
            songsToAlbums = await this.songsToAlbumsRepository.saveMultipleSongs(album.songs, newAlbum);
        }else{
            return undefined
        }

        //поменять return на dto
        return newAlbum.songs;
    }

    // async update(id: number , Album: Album) {
    //     // add current user as creator
    //     this.Albums.find((Album) => album.id === id);
    //     this.Albums.push(Album);
    // }

    async findById(id: number): Promise<Album> {
        return this.AlbumsRepository.findById(id);
    }
}
