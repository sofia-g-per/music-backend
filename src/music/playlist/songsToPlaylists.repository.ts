import { EntityRepository, Repository, getRepository } from "typeorm";
import { SongsToPlaylists } from "./songsToPlaylists.entity";

@EntityRepository(SongsToPlaylists)
export class SongsToPlaylistsRepository extends Repository<SongsToPlaylists>{
    
    async findById(id: number): Promise<SongsToPlaylists>{
        return getRepository(SongsToPlaylists).findOne({where: { id: id }});
    }

    // добавление песен к одному плейлисту
    // songs - [{song: Song, songIndex: number}]
    async saveMultipleSongs(songs, playlist): Promise<any>{
        let songsToPlaylists: SongsToPlaylists[] = [];
        let newEntity;
        for (let song of songs) {
            if(song){
                delete playlist.songs
                song.playlist = playlist;
                newEntity = await getRepository(SongsToPlaylists).save(song);
                if(newEntity){
                    songsToPlaylists.push(newEntity);
                }else{
                    return undefined;
                }
            }

        }
        return 'success';
    }
}