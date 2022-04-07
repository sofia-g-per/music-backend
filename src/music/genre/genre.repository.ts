import { EntityRepository, Repository, getRepository } from "typeorm";
import { Genre } from "./genre.entity";

@EntityRepository(Genre)
export class GenresRepository extends Repository<Genre>{
    
    async findById(id: number): Promise<Genre>{
        return getRepository(Genre).findOne({where: { id: id }});
    }

    async findMultipleByIds(ids: number[]): Promise<Genre[]>{
        let genres: Genre[] = [];
    
          
        for (let id of ids) {
            const genre = await this.findById(id);
            if(genre instanceof Genre){
                genres.push(genre);
            }else{
                //return genre array
                return undefined
            }
        }
        return genres;
    }
}