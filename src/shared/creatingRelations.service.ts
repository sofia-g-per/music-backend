import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { GenresRepository } from 'src/music/genre/genre.repository';

@Injectable()
export class CreatingRelationsService {
    // constructor(@InjectRepository(GenresRepository) private songsRepository: GenresRepository) {}
    
    // async addNewGenres(formData) {
    //     let song = instanceToPlain(songData);
    //     song.artists.push(user);
    //     if(songData.artist_ids.length > 0){

    //     }
    //     //make into a separate shared helper function
    //     //сущестувующие жанры
    //     if(songData.genreIds && songData.genreIds.length > 0){
    //         let genres = await this.genresRepository.findMultipleByIds(artistData.genreIds);
    //         artist.genres = artist.genres.concat(genres);
    //     }

    //     // новые жанры
    //     if(artistData.genres && artistData.genres.length > 0){
    //         let genres = await this.genreService.createMultiple(artistData.genres);
    //         artist.genres = artist.genres.concat(genres);
    //     }
    // }

    // async 
}

