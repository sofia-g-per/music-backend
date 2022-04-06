import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserRolesRepository } from './userRoles.repository';
import { ArtistsRepository } from 'src/music/artist/userRoles.repository';
import { LoginDto } from './dtos/login.dto';
import { Artist } from 'src/music/artist/artist.entity';
import { classToPlain, instanceToInstance, instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
        @InjectRepository(UserRolesRepository) private userRolesRepository: UserRolesRepository,
        @InjectRepository(ArtistsRepository) private artistsRepository: ArtistsRepository,

    ){}

    async findById(id: number): Promise<User | undefined> {
        console.log(id);
        return await this.usersRepository.findOne(id);
    }

    async findByEmail(email: string): Promise<User | undefined> {
        return this.usersRepository.findByEmail(email);
    }

    async create(userData: CreateUserDto): Promise <User | Artist | undefined> {
        const salt = 10;
        const password = await bcrypt.hash(userData.password, salt);
        userData.password = password;

        const userRole = await this.userRolesRepository.findById(userData.roleId);
        let newUser = instanceToPlain(userData);
        newUser.role = userRole;
        let user =  await this.usersRepository.save(newUser);

        if( userRole && userRole.name === "artists"){
            let artistData = instanceToPlain(userData.artist);
            artistData.user = user;
            const artist = await this.artistsRepository.save(artistData);
            if(!artist){
                return undefined;
            }else{
                return artist;
            }
        }
        return user;
    }

    async validateUser(userData: LoginDto): Promise<any> {
        //add eager loading for artist
        const user = await this.usersRepository.findByEmail(userData.email);
        if (user) {
            const passwordsMatch = await bcrypt.compare(userData.password, user.password);
            
            if(passwordsMatch){
                const { password, ...result } = user;
                return result;
            }
            console.log('passwords');
            return false;
        }
        console.log('user', user);
        return 'No user with email' + userData.email;
    }
}
