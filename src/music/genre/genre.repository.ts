import { HttpException, HttpStatus } from "@nestjs/common";
import { EntityRepository, Repository, getRepository } from "typeorm";
import { Genre } from "./genre.entity";

@EntityRepository(Genre)
export class GenresRepository extends Repository<Genre>{
    
    async getAll(): Promise<Genre[]>{
        return getRepository(Genre).find();
    }

    async findById(id: number): Promise<Genre>{
        return getRepository(Genre).findOne({where: { id: id }});
    }

    async findMultipleByIds(ids: any): Promise<Genre[]>{
        let genres: Genre[] = [];
        if(typeof ids === 'string'){
            ids.split(',');
        }
        for (let id of ids) {
            const genre = await this.findById(id);
            if(genre){
                genres.push(genre);
            }
        }
        return genres;
    }
}