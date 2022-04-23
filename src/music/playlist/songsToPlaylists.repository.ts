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
        console.log('repo', songs)
        delete playlist.songs
        let newEntity;
        for (let song of songs) {
            if(song){
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

    async updateByPlaylist(songs, playlist){
        await getRepository(SongsToPlaylists).delete({
            playlistId: playlist.id
        })
        this.saveMultipleSongs(songs, playlist)
    }
}