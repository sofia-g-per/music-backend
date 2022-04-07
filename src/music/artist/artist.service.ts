import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { GenreService } from '../genre/genre.service';
import { Artist } from './artist.entity';
import { ArtistsRepository } from './artist.repository';
import { CreateArtistDto } from './createArtist.dto';
import { GenresRepository } from '../genre/Genre.repository';

@Injectable()
export class ArtistService {
    constructor(
        @InjectRepository(ArtistsRepository) private artistsRepository: ArtistsRepository,
        @InjectRepository(GenresRepository) private genresRepository: GenresRepository,
        private genreService: GenreService
        ) {}

    async create(artistData: CreateArtistDto): Promise<Artist | undefined>{
        let artist = instanceToPlain(artistData);
        artist.genres = [];
        //сущестувующие жанры
        if(artistData.genreIds && artistData.genreIds.length > 0){
            let genres = await this.genresRepository.findMultipleByIds(artistData.genreIds);
            artist.genres = artist.genres.concat(genres);
        }

        // новые жанры
        if(artistData.genres && artistData.genres.length > 0){
            let genres = await this.genreService.createMultiple(artistData.genres);
            console.log('created genres artist service', genres)
            artist.genres = artist.genres.concat(genres);
        }
        console.log(artist.genres);

        // for(let genre of artist.genres){
        //     this.genreService.addArtist(genre, artist);
        // }
        return await this.artistsRepository.save(artist);
    }

}
