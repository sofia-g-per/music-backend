import { SongsToPlaylists } from './songsToPlaylists.entity';
import { EntityRepository, Repository, getRepository } from "typeorm";
import { Song } from "../song/song.entity";
import { Playlist } from "./playlist.entity";

@EntityRepository(Song)
export class PlaylistsRepository extends Repository<Playlist>{
    
    async findById(id: number): Promise<Playlist>{
        return getRepository(Playlist).findOne({where: { id: id }, relations: ['songs']});
    }

    async findMultipleByIds(ids: number[]): Promise<Playlist[]>{
        let songs: Playlist[] = [];
          
        for (let id of ids) {
            const playlist = await this.findById(id);
            if(playlist instanceof Playlist){
                songs.push(playlist);
            }else{
                //return Song array
                return undefined
            }
        }
        return songs;
    }

    public async customSave(entity) {
        return await getRepository(Playlist).save(entity);
      }

    async getPlaylistsByCreator(userId:number){

        let playlists =  await getRepository(Playlist).find({
            where: {creator : 
                {id: userId},
            }, 
            relations: ['songs', 'songs.song']

        });

        return playlists

    }

    async deleteById(playlistId:number){
       return await getRepository(Playlist).delete(playlistId);
    }


}