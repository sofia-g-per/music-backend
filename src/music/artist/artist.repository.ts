import { EntityRepository, Repository, getRepository } from "typeorm";
import { AddExistingArtistDto } from "./addExistingArtistDto.dto";
import { Artist } from "./artist.entity";

@EntityRepository(Artist)
export class ArtistsRepository extends Repository<Artist>{
    
    async findById(id: number){
        return getRepository(Artist).findOne({ id: id });
    }

    async findMultipleByIds(ids: number[]): Promise<Artist[]>{
        let artists: Artist[] = [];
          
        for (let id of ids) {
            const artist = await this.findById(id);
            
            if(artist instanceof Artist){
                artists.push(artist);
            }else{
                //return artist array
                return undefined
            }
        }
        return artists;
    }

    async addMultipleByIds(addArtistsData: AddExistingArtistDto[]): Promise<Artist[]>{
        let artists = [];
        for (let artistData of addArtistsData) {
            const artist = await this.findById(artistData.artistId);
            
            if(artist){

                artists.push({artist: artist, isFeatured: artistData.isFeatured});
            }else{
                //return artist array
                return undefined
            }
        }
        console.log('artist repo', artists)
        
        return artists;
    }
}