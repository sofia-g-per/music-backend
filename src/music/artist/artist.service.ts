import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { Artist } from './artist.entity';
import { ArtistsRepository } from './artist.repository';
import { CreateArtistDto } from './createArtist.dto';

@Injectable()
export class ArtistService {
    constructor(
        // @InjectRepository(GenresRepository) private genresRepository: GenresRepository,
        @InjectRepository(ArtistsRepository) private artistsRepository: ArtistsRepository,
        ) {}

    async create(artistData: CreateArtistDto): Promise<Artist | undefined>{
        const artist = instanceToPlain(artistData);
        return await this.artistsRepository.save(artist);
    }

}
