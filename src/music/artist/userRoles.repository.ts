import { EntityRepository, Repository, getRepository } from "typeorm";
import { Artist } from "./artist.entity";

@EntityRepository(Artist)
export class ArtistsRepository extends Repository<Artist>{
    
    async findById(id: number){
        return getRepository(Artist).findOne({ id: id });
    }
}