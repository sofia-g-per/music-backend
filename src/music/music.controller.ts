import { Controller, Get, Query, Request } from '@nestjs/common';
import { getRepository } from 'typeorm';
import { Song } from './song/song.entity';
@Controller('api')
export class MusicController {
    @Get('/global-search')
    async search(@Query('searchQuery') searchQuery: string, @Request() req): Promise<any | undefined> {
        if (searchQuery !== undefined && searchQuery.length > 1) {
            return await getRepository(Song)
            .createQueryBuilder("Song")
            .select()
            .leftJoinAndSelect('Song.artists', 'artistToUser')
            .leftJoinAndSelect('artistToUser.artist', 'artist')
            .where(`MATCH(song.name) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
            .orWhere(`MATCH(artist.stagename) AGAINST ('${searchQuery}' IN BOOLEAN MODE)`)
            .getMany();
        }

    }


}
