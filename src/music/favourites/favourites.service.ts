import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AddSongstoFavouritesDto } from './addSongsToFavouritesDto.dto';
import { User } from 'src/users/entities/user.entity';
import { SongsRepository } from '../song/song.repository';
import { FavoriteSong } from './favoriteSong.entity';
import { FavoriteSongsRepository } from './favoriteSongs.repository';
import { getRepository } from 'typeorm';
@Injectable()
export class FavouritesService {
    constructor(
        @InjectRepository(FavoriteSong) private FavoriteSongsRepository: FavoriteSongsRepository,
        @InjectRepository(SongsRepository) private songsRepository: SongsRepository,
    ) {}

    async create(songData: AddSongstoFavouritesDto, user: User): Promise<FavoriteSong | undefined>{
        let like = new FavoriteSong;
        let song = await this.songsRepository.findById(songData.songId, false);
        if(song){
            like.song = song
        }else{
            throw new HttpException('Произошла ошибка', HttpStatus.BAD_REQUEST);
        }
        like.user = user;
        
        return await this.FavoriteSongsRepository.save(like);
    }

    async delete(songData: AddSongstoFavouritesDto, user: User){        
        return await this.FavoriteSongsRepository.delete({songId: songData.songId, userId: user.id });
    }

    async getByUser(user: User): Promise<any[]>{
        // let songs = await this.FavoriteSongsRepository.findByUser(user.id);

        return await getRepository(FavoriteSong).find({
            where: { userId: user.id },
            relations: ['song', 'song.artists']
        });;
    }

    async findByQuery(user: User, searchQuery: string): Promise<any>{
        return await this.FavoriteSongsRepository.findByQuery(user.id, searchQuery);
    }

    
}
