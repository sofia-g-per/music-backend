import { EntityRepository, Repository, getRepository } from "typeorm";
import { Genre } from "./genre.entity";

@EntityRepository(Genre)
export class GenresRepository extends Repository<Genre>{
    
    async findById(id: number){
        return getRepository(Genre).findOne({where: { id: id }});
    }
}