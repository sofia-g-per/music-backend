import { EntityRepository, Repository } from "typeorm";
import { User } from "./entities/user.entity";

@EntityRepository(User)
export class UsersRepository extends Repository<User>{
    public async findByEmail(email: string): Promise<User|undefined>{
        return await this.findOne({where: {"email": email}});
    }
}