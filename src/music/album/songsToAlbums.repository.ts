import { EntityRepository, Repository, getRepository } from "typeorm";
import { SongsToAlbums } from "./songsToAlbums.entity";

@EntityRepository(SongsToAlbums)
export class SongsToAlbumsRepository extends Repository<SongsToAlbums>{
    
    async findById(id: number): Promise<SongsToAlbums>{
        return getRepository(SongsToAlbums).findOne({where: { id: id }});
    }

    // добавление песен к одному плейлисту
    // songs - [{song: Song, songIndex: number}]
    async saveMultipleSongs(songs, album): Promise<SongsToAlbums[]>{
        let songsToAlbums: SongsToAlbums[] = [];
        let newEntity;
        for (let song of songs) {
            if(song){
                song.album = album;
                newEntity = await getRepository(SongsToAlbums).save(song);
                if(newEntity){
                    songsToAlbums.push(newEntity);
                }else{
                    return undefined;
                }
            }

        }
        return songsToAlbums;
    }
}