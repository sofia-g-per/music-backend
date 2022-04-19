import { Controller, Get, Query, Request } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Song } from './song/song.entity';
@Controller('api')
export class MusicController {
    @Get('/search-liked-songs')
    async search(@Query('searchQuery') searchQuery: string, @Request() req): Promise<any | undefined> {
        console.log('query', searchQuery)
        if (searchQuery !== undefined && searchQuery.length > 1) {
            return await getRepository(Song)
            .createQueryBuilder("Song")
            .select()
            .leftJoinAndSelect('Song.artists', 'artistToUser')
            .leftJoinAndSelect('artistToUser.artists', 'artist')
            .where(`MATCH(song.name) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(artist.stagename) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
            .getMany();
        }

    }


}
