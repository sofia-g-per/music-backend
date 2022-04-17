import { EntityRepository, Repository, getRepository } from "typeorm";
import { UserRole } from "./entities/userRole.entity";

@EntityRepository(UserRole)
export class UserRolesRepository extends Repository<UserRole>{
    
    async findById(id: number){
        return getRepository(UserRole).findOne({ id: id });
    }

    async findByName(name: string){
        return getRepository(UserRole).findOne({ name: name });
    }
}