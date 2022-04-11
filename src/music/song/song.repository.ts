import { EntityRepository, Repository, getRepository } from "typeorm";
import { Song } from "./song.entity";
import { AddExistingSongsToCollectionDto } from "../playlist/addExistingSongsToCollection.dto";

@EntityRepository(Song)
export class SongsRepository extends Repository<Song>{
    
    async findById(id: number): Promise<Song>{
        return getRepository(Song).findOne({where: { id: id }});
    }

    async findMultipleByIds(ids: number[]): Promise<Song[]>{
        let songs: Song[] = [];
          
        for (let id of ids) {
            const song = await this.findById(id);
            if(song instanceof Song){
                songs.push(song);
            }else{
                //return Song array
                return undefined
            }
        }
        return songs;
    }

    public async customSave(entity) {
        return await getRepository(Song).save(entity);
    }

    //добавление в плейлиств и альбомы
    async addMultipleByIds(addSongsData: AddExistingSongsToCollectionDto[]): Promise<Song[]>{
        let songs = [];

        for (let songData of addSongsData) {
            const song = await this.findById(songData.songId);
            
            if(song){

                songs.push({song: song, songIndex: songData.songIndex});
            }else{
                //return artist array
                return undefined
            }
        }
        return songs;
    }

}