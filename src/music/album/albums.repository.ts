import { EntityRepository, Repository, getRepository } from "typeorm";
import { Song } from "../song/song.entity";
import { Album } from "./Album.entity";

@EntityRepository(Song)
export class AlbumsRepository extends Repository<Album>{
    
    async findById(id: number): Promise<Album>{
        return getRepository(Album).findOne({where: { id: id }});
    }

    async findMultipleByIds(ids: number[]): Promise<Album[]>{
        let songs: Album[] = [];
          
        for (let id of ids) {
            const album = await this.findById(id);
            if(album instanceof Album){
                songs.push(album);
            }else{
                //return Song array
                return undefined
            }
        }
        return songs;
    }

    public async customSave(entity) {
        console.log('repo', entity);
        return await getRepository(Album).save(entity);
      }
}