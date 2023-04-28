import { Injectable } from '@nestjs/common';
import { Song } from 'src/music/song/song.entity';
import { SongCollabRequest } from '../entities/songCollabRequest.entity';
import { getRepository } from 'typeorm';
import { User } from '../entities/user.entity';
import { Artist } from 'src/music/artist/artist.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ArtistsRepository } from 'src/music/artist/artist.repository';

@Injectable()
export class CollabRequestsService {
    constructor(@InjectRepository(ArtistsRepository) private artistsRepository: ArtistsRepository){}

    public async createSongRequestsForMany(sender: User, artistIds: number[], song: Song){
        for(let artist of artistIds){
            await this.createSongRequest(sender, artist, song);
        }
    }

    public async createSongRequest(sender: User, recipientArtistId: number, song: Song){
        const request = new SongCollabRequest();
        request.sender = sender;
        const recipientArtist = await this.artistsRepository.getWithUserByArtistId(recipientArtistId);
        if(recipientArtist){
            request.recipient = recipientArtist.user;
            request.content = song;
            request.status = {name: "delivered"};

            await getRepository(SongCollabRequest).save(request);
        }
        
    }

}
