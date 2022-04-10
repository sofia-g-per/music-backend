import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { GenreService } from '../genre/genre.service';
import { Artist } from './artist.entity';
import { ArtistsRepository } from './artist.repository';
import { CreateArtistDto } from './createArtist.dto';
import { GenresRepository } from '../genre/genre.repository';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(ArtistsRepository) private artistsRepository: ArtistsRepository,
        @InjectRepository(GenresRepository) private genresRepository: GenresRepository,
        private genreService: GenreService
        ) {}

    async create(artistData: CreateArtistDto): Promise<Artist | undefined>{
        let artist = instanceToPlain(artistData);
        if(!artist.genres){
            artist.genres = [];
        }

        // поменять на методы из сервиса жанров !!!!
        //сущестувующие жанры
        if(artistData.genreIds && artistData.genreIds.length > 0){
            let genres = await this.genresRepository.findMultipleByIds(artistData.genreIds);
            artist.genres = artist.genres.concat(genres);
        }

        // новые жанры
        if(artistData.genres && artistData.genres.length > 0){
            let genres = await this.genreService.createMultiple(artistData.genres);
            artist.genres = artist.genres.concat(genres);
        }

        return await this.artistsRepository.save(artist);
    }

    // СОЗДАНИЕ СВЯЗЕЙ (вызываются при создании других сущностей)
    // targetObject - объект который послужит для создания сущности  (ex. songData)
    // formData - объект с информацией от пользователя (ex. song)

    //прикрепление существующих артистов
    async addExistingArtists(formData, targetObject){
        if(formData.artistIds && formData.artistIds.length > 0){
            let artists = await this.artistsRepository.findMultipleByIds(formData.artistIds);
            return targetObject.artists.concat(artists);
        }
    }

}
