import { Controller, Get, Query } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Song } from './song/song.entity';
@Controller('api')
export class MusicController {
    @Get('/global-search')
    async search(@Query('searchQuery') searchQuery: string): Promise<any | undefined> {

        if (searchQuery !== undefined && searchQuery.length > 1) {
            let query=  getRepository(Song)
            .createQueryBuilder("Song")
            .select()
            .leftJoinAndSelect('Song.artists', 'artistToUser')
            .leftJoinAndSelect('artistToUser.artist', 'artist')
            .where(`MATCH(song.name) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(artist.stagename) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)

            return await query.getMany();
        }        
    }

    @Get('/global-filter')
    async filter(@Query('genreIds') genreIds){
        genreIds = JSON.parse(genreIds);

        if(genreIds){
            let query =  getRepository(Song)
            .createQueryBuilder("Song")
            .select()
            .leftJoinAndSelect('Song.artists', 'artistToUser')
            .leftJoinAndSelect('artistToUser.artist', 'artist')
            .leftJoinAndSelect('Song.genres', 'SongsToGenres')
            .where('genreId IN (:genres)', {genres: genreIds})
            return await query.getMany();
        }
    }

}
