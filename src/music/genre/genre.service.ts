import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from './createGenre.dto';
import { GenresRepository } from './genre.repository';
import { Genre } from './genre.entity';
import { instanceToPlain } from 'class-transformer';
import { ArtistsRepository } from '../artist/artist.repository';
import { Artist } from '../artist/artist.entity';


@Injectable()
export class GenreService {
    constructor(
        @InjectRepository(GenresRepository) private genresRepository: GenresRepository,
        @InjectRepository(ArtistsRepository) private artistsRepository: ArtistsRepository,
        ) {}

    async create(genreData: CreateGenreDto): Promise<Genre | undefined>{
        const genre = instanceToPlain(genreData);
        return await this.genresRepository.save(genre);
    }

    async createMultiple(genresData: CreateGenreDto[]): Promise<Genre[] | undefined>{
        let genres = [];
        let genre;
            for(let genreData of genresData){
                genre = await this.create(genreData);

                //изменить чтобы учитывался возврат не просто undefined, а конкретных ошибок
                if(genre){
                    genres.push(genre);
                }else{
                    //return all genres that did not fail and genres that did fail
                    return undefined;
                }
            }
        return genres;
    }

    async getAll():Promise<Genre[] | undefined>{
        return await this.genresRepository.getAll();
    }

    // СОЗДАНИЕ СВЯЗЕЙ (вызываются при создании других сущностей)
    // targetObject - объект который послужит для создания сущности  (ex. songData)
    // formData - объект с информацией от пользователя (ex. song)

    // создание новых жанров
    async createNewGenres(formData, targetObject){
        if(formData.genres && formData.genres.length > 0){
            let genres = await this.createMultiple(formData.genres);
            return targetObject.genres.concat(genres);
        }
    }

    //прикрепление существующих жанров
    async addExistingGenres(formData, targetObject){
        if(formData.genreIds && formData.genreIds.length > 0){
            let genres = await this.genresRepository.findMultipleByIds(formData.genreIds);
            return targetObject.genres.concat(genres);
        }
    }
    async addArtist(genre: Genre, artist: Artist) {
        if(!genre.artists){
            genre.artists = [];
        }
        genre.artists.push(artist);
        this.genresRepository.save(genre);
    }

    
}
