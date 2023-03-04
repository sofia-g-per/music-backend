import { EntityRepository, Repository, getRepository } from "typeorm";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{

    public async findById(id: number): Promise<User|undefined>{
        return await getRepository(User).findOne({where: {"id": id}});
    }

    public async findByEmail(email: string): Promise<User|undefined>{
        return await getRepository(User).findOne({where: {"email": email}});
    }

    public async findByUsername(username: string): Promise<User|undefined>{
        return await getRepository(User).findOne({where: {"username": username}});
    }

    public async customSave(entity) {
        return await getRepository(User).save(entity);
    }

    async deleteById(userId:number){
        return await getRepository(User).delete(userId);
    }
}