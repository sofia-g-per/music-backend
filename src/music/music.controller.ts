import { Controller, Get, Query } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Song } from './song/song.entity';
@Controller('api')
export class MusicController {
    @Get('/global-search')
    async search(@Query('searchQuery') searchQuery: string, genres:[]|null): Promise<any | undefined> {
        if (searchQuery !== undefined && searchQuery.length > 1) {
            let query=  getRepository(Song)
            .createQueryBuilder("Song")
            .select()
            .leftJoinAndSelect('Song.artists', 'artistToUser')
            .leftJoinAndSelect('artistToUser.artist', 'artist')
            .where(`MATCH(song.name) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(artist.stagename) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
                console.log('music search',genres)
            if(genres){
                query.leftJoinAndSelect('Song.genres', 'SongsToGenres')
                .leftJoinAndSelect('SongsToGenres.genres', 'genres')
                .andWhere('genres.id IN (:genres)', {genres: genres})
            }
            
            return await query.getMany();
        }        
    }


}
