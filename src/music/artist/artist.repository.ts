import { EntityRepository, Repository, getRepository } from "typeorm";
import { Artist } from "./artist.entity";

@EntityRepository(Artist)
export class ArtistsRepository extends Repository<Artist>{
    
    async findById(id: number){
        return this.findOne({ id: id });
    }

    async findMultipleByIds(ids: number[]): Promise<Artist[]>{
        let genres: Artist[] = [];
          
        for (let id of ids) {
            const genre = await this.findById(id);
            
            if(genre instanceof Artist){
                genres.push(genre);
            }else{
                //return genre array
                return undefined
            }
        }
        return genres;
    }
}