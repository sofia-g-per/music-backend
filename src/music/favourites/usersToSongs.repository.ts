import { EntityRepository, Repository, getRepository } from "typeorm";
import { UsersToSongs } from "./usersToSongs.entity";

@EntityRepository(UsersToSongs)
export class UsersToSongsRepository extends Repository<UsersToSongs>{
    
    async findById(id: number): Promise<UsersToSongs>{
        return getRepository(UsersToSongs).findOne({where: { id: id }});
    }

    // async findMultipleByIds(ids: number[]): Promise<UsersToSongs[]>{
    //     let genres: UsersToSongs[] = [];
          
    //     for (let id of ids) {
    //         const genre = await this.findById(id);
    //         if(genre instanceof UsersToSongs){
    //             genres.push(genre);
    //         }else{
    //             //return genre array
    //             return undefined
    //         }
    //     }
    //     return genres;
    // }
}