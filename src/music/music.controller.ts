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
            .leftJoinAndSelect('Song.artists', 'artistToSong')
            .leftJoinAndSelect('artistToSong.artist', 'artist')
            .where(`MATCH(song.name) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(artist.stagename) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
            .orderBy("artistToUser.isFeatured", "ASC")

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
            .innerJoinAndSelect('Song.genres', 'genres')
            .where('genres_id IN (:...genres)', {genres: genreIds})
            .orderBy("artistToUser.isFeatured", "ASC")

            return await query.getMany();
        }
    }

}
