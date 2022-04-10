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
}