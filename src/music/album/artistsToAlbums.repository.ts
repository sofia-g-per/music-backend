import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository, getRepository } from "typeorm";
import { ArtistsToAlbums } from "./artistsToAlbums.entity";

@EntityRepository(ArtistsToAlbums)
export class ArtistsToAlbumsRepository extends Repository<ArtistsToAlbums>{
    
    async findById(id: number): Promise<ArtistsToAlbums>{
        return getRepository(ArtistsToAlbums).findOne({where: { id: id }});
    }

    // добавление песен к одному плейлисту
    // artists - [{artist: artist, isFeatured: boolean}]
    async saveMultipleArtists(artists, album): Promise<ArtistsToAlbums[]>{
        let artistsToAlbums: ArtistsToAlbums[] = [];
        let newEntity;
        for (let artist of artists) {
            if(artist){
                artist.albumId = album;
                newEntity = await getRepository(ArtistsToAlbums).save(artist);
                if(newEntity){
                    artistsToAlbums.push(newEntity);
                }else{
                    throw new HttpException(
                        {
                            message:'Произошла ошибка при добавлении артистов'
                        }, 
                        HttpStatus.BAD_REQUEST
                    );
                }
            }

        }
        return artistsToAlbums;
    }
}