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
        console.log(typeof ids, typeof ids === 'string')
        if(typeof ids === 'string'){
            ids.split(',');
        }
        for (let id of ids) {
            console.log('genre rep', id)
            const genre = await this.findById(id);
            console.log('genre id', genre)
            if(genre){
                genres.push(genre);
            }
        }
        return genres;
    }
}