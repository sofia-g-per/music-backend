import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserRolesRepository } from './userRoles.repository';
import { UserRole } from './entities/userRole.entity';

@Injectable()
export class UserRolesService {
    constructor(@InjectRepository(UserRolesRepository) private userRolesRepository: UserRolesRepository){}
    
    async findById(id: number): Promise<UserRole | undefined> {
        return await this.userRolesRepository.findOne(id);
    }
}
