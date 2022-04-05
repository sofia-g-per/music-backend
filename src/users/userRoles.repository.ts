import { EntityRepository, Repository } from "typeorm";
import { UserRole } from "./entities/userRole.entity";

@EntityRepository(UserRole)
export class UserRolesRepository extends Repository<UserRole>{

}