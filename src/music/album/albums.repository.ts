import { EntityRepository, Repository, getRepository } from "typeorm";
import { Album } from "./album.entity";

@EntityRepository(Album)
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

    async findByArtist(artistId:number){
        return await getRepository(Album).find({
            where: {
                artistId: artistId
            },
        });
    }

    public async customSave(entity) {
        return await getRepository(Album).save(entity);
      }
}