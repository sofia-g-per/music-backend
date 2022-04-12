import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { ArtistsRepository } from '../artist/artist.repository';
import { Artist } from '../artist/artist.entity';
import { UsersToSongs } from './usersToSongs.entity';
import { AddSongstoFavouritesDto } from './addSongsToFavouritesDto.dto';
import { UsersToSongsRepository } from './usersToSongs.repository';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FavouritesService {
    constructor(
        @InjectRepository(UsersToSongsRepository) private usersToSongsRepository: UsersToSongsRepository,
        ) {}

    async create(songData: AddSongstoFavouritesDto, user: User): Promise<UsersToSongs | undefined>{
        const song = instanceToPlain(songData);
        song.user = user;
        
        return await this.usersToSongsRepository.save(song);
    }

    
}
