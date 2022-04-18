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
        //add eager loading for artist
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
}
