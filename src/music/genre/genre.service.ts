import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from './createGenre.dto';
import { GenresRepository } from './Genre.repository';
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
        console.log('genre to be created', genre);
        return await this.genresRepository.save(genre);
    }

    async createMultiple(genresData: CreateGenreDto[]): Promise<Genre[] | undefined>{
        let genres = [];
        let genre;
        console.info(genresData);
            for(let genreData of genresData){
                console.log('genreData of for loop', genreData);
                genre = await this.create(genreData);
                console.log('created genre', genre, genre instanceof Genre, typeof genre);

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

    async addArtist(genre: Genre, artist: Artist) {
        if(!genre.artists){
            genre.artists = [];
        }
        genre.artists.push(artist);
        this.genresRepository.save(genre);
    }

    //             

}
