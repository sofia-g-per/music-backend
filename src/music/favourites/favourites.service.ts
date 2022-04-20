import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { instanceToPlain } from 'class-transformer';
import { UsersToSongs } from './usersToSongs.entity';
import { AddSongstoFavouritesDto } from './addSongsToFavouritesDto.dto';
import { UsersToSongsRepository } from './usersToSongs.repository';
import { User } from 'src/users/entities/user.entity';
import { SongsRepository } from '../song/song.repository';
import { createReadStream } from 'fs';
import { join } from 'path';

@Injectable()
export class FavouritesService {
    constructor(
        @InjectRepository(UsersToSongsRepository) private usersToSongsRepository: UsersToSongsRepository,
        @InjectRepository(SongsRepository) private songsRepository: SongsRepository,
    ) {}

    async create(songData: AddSongstoFavouritesDto, user: User): Promise<UsersToSongs | undefined>{
        let like = new UsersToSongs;
        let song = await this.songsRepository.findById(songData.songId, false);
        if(song){
            like.song = song
        }else{
            return undefined;
        }

        like.user = user;
        
        return await this.usersToSongsRepository.save(like);
    }

    async getByUser(user: User): Promise<any[]>{
        let songs = await this.usersToSongsRepository.findByUser(user.id);

        return songs;
    }

    async findByQuery(user: User, searchQuery: string): Promise<any>{
        return await this.usersToSongsRepository.findByQuery(user.id, searchQuery);
    }

    
}
