import { EntityRepository, Repository, getRepository } from "typeorm";
import { ArtistsToSongs } from "./artistsToSongs.entity";

@EntityRepository(ArtistsToSongs)
export class ArtistsToSongsRepository extends Repository<ArtistsToSongs>{
    
    async findById(id: number): Promise<ArtistsToSongs>{
        return await getRepository(ArtistsToSongs).findOne({where: { id: id }});
    }


    async saveMultipleArtists(artists, song): Promise<ArtistsToSongs[]>{
        let artistsToSongs: ArtistsToSongs[] = [];
        let newEntity;
        console.log('repo', artists);
        for (let artist of artists) {
            if(artist){
                artist.song = song;
                newEntity = await getRepository(ArtistsToSongs).save(artist);
                if(newEntity){
                    artistsToSongs.push(newEntity);
                }else{
                    return undefined;
                }
            }

        }
        return artistsToSongs;
    }

    async getByArtist(artistId: number){
        return await getRepository(ArtistsToSongs).find({where: { artistId: artistId }});
    }
}