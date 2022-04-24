import { Inject, Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { User } from './entities/user.entity';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { UserRolesRepository } from './userRoles.repository';
import { ArtistService } from 'src/music/artist/artist.service';
import { LoginDto } from './dtos/login.dto';
import { Artist } from 'src/music/artist/artist.entity';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
        @InjectRepository(UserRolesRepository) private userRolesRepository: UserRolesRepository,
        private artistService: ArtistService

    ){}

    async create(userData: CreateUserDto, avatar): Promise <User | Artist | undefined> {

        let newUser = instanceToPlain(userData);

        //шифрование пароля
        const salt = 10;
        const password = await bcrypt.hash(userData.password, salt);
        userData.password = password;

        //добавление роли пользователя
        let userRole;
        if(userData.roleId){
            userRole = await this.userRolesRepository.findByName(userData.roleId);
        }else{
            userRole = await this.userRolesRepository.findByName('listener');
        }
        newUser.role = userRole;

        //добавления аватара (изображения) при наличии
        if(avatar){
            newUser.avatar = avatar.filename;
        }

        //Сохранение пользователя в БД
        let user = await this.usersRepository.customSave(newUser);
        //Создание записи артиста при выборе соответствующей роли
        if( userRole && userRole.name === "artist"){
            userData.artist.user = user;
            const artist = await this.artistService.create(userData.artist);            
            if(artist !instanceof Artist){
                throw new HttpException('Произошла ошибка в создании артиста', HttpStatus.BAD_REQUEST);

            }else{
                return artist;
            }
        }

        return user;
    }

    async validateUser(userData: LoginDto): Promise<any> {
        const user = await this.usersRepository.findByEmail(userData.email);
        if (user) {
            const passwordsMatch = await bcrypt.compare(userData.password, user.password);
            
            if(passwordsMatch){
                const { password, ...result } = user;
                return result;
            }
            throw new HttpException('Проверьте корректность данных', HttpStatus.BAD_REQUEST);
        }
        throw new HttpException('Проверьте корректность данных', HttpStatus.BAD_REQUEST);
    }

    async updateUser(userData, initialUser){
        if(userData.password ){
            const passwordsMatch = await bcrypt.compare(userData.password, initialUser.password);
            if(!passwordsMatch){
                const salt = 10;
                const password = await bcrypt.hash(userData.password, salt);
                userData.password = password;
            }
        }

        let user;
        console.log(initialUser, userData)
        if(userData.roleId !== initialUser.role.name){
            //добавление роли пользователя
            userData.role = await this.userRolesRepository.findByName(userData.roleId);
            //Сохранение пользователя в БД
            user = await this.usersRepository.customSave(userData);

            //если пользователь сменил роль с артиста на слушателя 
            console.log(userData.roleId == "artist", 'add new artist')
            if(userData.roleId !== "artist"){
                // удаление артиста
                await this.artistService.delete(initialUser.artist.id); 
                delete user.artist;
                return user;           
            }else{
                //Создание записи артиста при выборе соответствующей роли
                let artistToAdd = userData.artist;
                artistToAdd.user = {id: user.id}
                const artist = await this.artistService.create(artistToAdd);            
                if(artist !instanceof Artist){
                    throw new HttpException('Произошла ошибка в создании артиста', HttpStatus.BAD_REQUEST);
                }else{
                    console.log('artist created', artist)
                    userData.artist = artist;
                    return userData;
                }
            }
        }

        delete userData.roleId
        //Сохранение пользователя в БД
        user = await this.usersRepository.customSave(userData);
        return user
        
    }

    async delete(userId:number){
        return await this.usersRepository.deleteById(userId)
    }   

    async findById(userId:number){
        let result = await this.usersRepository.findById(userId);
        delete result.password;
        return result;
    }

}
