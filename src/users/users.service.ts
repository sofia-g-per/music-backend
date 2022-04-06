import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserRolesService } from './userRoles.service';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class UsersService {
    constructor(@InjectRepository(UsersRepository) private usersRepository: UsersRepository){}

    async findById(id: number): Promise<User | undefined> {
        console.log(id);
        return await this.usersRepository.findOne(id);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findByEmail(email);
    }

    async create(userData: CreateUserDto): Promise <User | undefined> {
        const salt = 10;
        const password = await bcrypt.hash(userData.password, salt);
        userData.password = password;
        return await this.usersRepository.save(userData);
    }

    async validateUser(userData: LoginDto): Promise<any> {
        //add eager loading for artist
        const user = await this.findByEmail(userData.email);
        
        if (user) {
            const passwordsMatch = await bcrypt.compare(userData.password, user.password);
            
            if(passwordsMatch){
                const { password, ...result } = user;
                return result;
            }
            return null;
        }
        return null;
    }
}
