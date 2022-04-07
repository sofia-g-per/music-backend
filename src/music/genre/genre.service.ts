import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateGenreDto } from './createGenre.dto';
import { GenresRepository } from './Genre.repository';
import { Genre } from './genre.entity';
import { instanceToPlain } from 'class-transformer';
import { ArtistsRepository } from '../artist/artist.repository';


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

}
