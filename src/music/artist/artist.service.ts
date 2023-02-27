import { ArtistsToSongsRepository } from './artistsToSongs.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { GenreService } from '../genre/genre.service';
import { Artist } from './artist.entity';
import { ArtistsRepository } from './artist.repository';
import { CreateArtistDto } from './createArtist.dto';
import { GenresRepository } from '../genre/genre.repository';
import { AddExistingArtistDto } from './addExistingArtistDto.dto';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(ArtistsRepository) private artistsRepository: ArtistsRepository,
        @InjectRepository(GenresRepository) private genresRepository: GenresRepository,
        @InjectRepository(ArtistsToSongsRepository) private artistsToSongsRepository: ArtistsToSongsRepository,
        private genreService: GenreService
        ) {}

    async create(artistData: CreateArtistDto): Promise<Artist | undefined>{
        let artist = instanceToPlain(artistData);
        if(!artist.genres){
            artist.genres = [];
        }

        if(artistData.genreIds && artistData.genreIds.length > 0){
            let genres = await this.genresRepository.findMultipleByIds(artistData.genreIds);
            artist.genres = artist.genres.concat(genres);
        }

        // новые жанры
        if(artistData.genres && artistData.genres.length > 0){
            let genres = await this.genreService.createMultiple(artistData.genres);
            artist.genres = artist.genres.concat(genres);
        }
        console.log('artist service', artist)
        return await this.artistsRepository.customSave(artist);
    }

    async findAllExceptCurrent(currentArtistId: number): Promise<Artist[] | undefined>{
        return await this.artistsRepository.findAllExceptOne(currentArtistId);
    }

    async delete(artistId: number){
        return await this.artistsRepository.deleteById(artistId);
    }

    // СОЗДАНИЕ СВЯЗЕЙ (вызываются при создании других сущностей)
    // targetObject - объект который послужит для создания сущности  (ex. songData)
    // formData - объект с информацией от пользователя (ex. song)

    //прикрепление существующих артистов
    // async addExistingArtists(artistIds: AddExistingArtistDto[], targetObject){
    //     if(artistIds && artistIds.length > 0){
    //         let artists = await this.artistsRepository.addMultipleByIds(artistIds);
    //         return artistIds.concat(artistIds);
    //     }else{
    //         return artistIds;
    //     }
    // }

    async getSongs(artistId:number){
        return await this.artistsToSongsRepository.getByArtist(artistId);
    }

}
