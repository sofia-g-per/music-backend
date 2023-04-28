import { Controller, Get, Query } from '@nestjs/common';
import { Brackets, getRepository } from 'typeorm';
import { Song } from './song/song.entity';
@Controller('api')
export class MusicController {
    @Get('/global-search')
    async search(@Query('searchQuery') searchQuery: string): Promise<any | undefined> {

        if (searchQuery !== undefined && searchQuery.length > 1) {
            searchQuery = `%${searchQuery}%`;
            let query=  getRepository(Song)
            .createQueryBuilder("Song")
            .select()
            .leftJoinAndSelect('Song.artists', 'artistToSong')
            .leftJoinAndSelect('artistToSong.artist', 'artist')
            .where('"Song"."status_name" = :status', {status: 'released'})
            .andWhere(new Brackets(qb => {
                qb.where('"Song"."name" ILIKE :searchQuery', {searchQuery: searchQuery})
                .orWhere('"artist"."stagename" ILIKE :searchQuery', {searchQuery: searchQuery})
            }))
            .orderBy("artistToSong.isFeatured", "ASC")

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
            .leftJoinAndSelect('Song.artists', 'artistToSong')
            .leftJoinAndSelect('artistToSong.artist', 'artist')
            .innerJoinAndSelect('Song.genres', 'genres')
            .where('"Song"."status_name" = :status', {status: 'released'})
            .andWhere('genres_id IN (:...genres)', {genres: genreIds})
            .orderBy("artistToSong.isFeatured", "ASC")

            return await query.getMany();
        }
    }

}
