import { EntityRepository, Repository, getRepository } from "typeorm";
import { UsersToSongs } from "./usersToSongs.entity";

@EntityRepository(UsersToSongs)
export class UsersToSongsRepository extends Repository<UsersToSongs>{
    
    async findById(id: number): Promise<UsersToSongs>{
        return await getRepository(UsersToSongs).findOne({where: { id: id }});
    }

    async findByUser(id: number): Promise<UsersToSongs[]>{
        return await getRepository(UsersToSongs).find({
            where: { userId: id }
        });
    }
}