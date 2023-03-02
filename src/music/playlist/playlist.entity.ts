import { AutoMap } from '@automapper/classes';
import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { SongsToPlaylists } from "./songsToPlaylists.entity";

@Entity()
export class Playlist {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column({length: 70})
    name: string;

    @AutoMap()
    @Column({ 
        nullable: true,
        default: null,
        length: 125
    })
    description: string;

    @AutoMap()
    @Column({ 
        nullable: true,
        default: null,
        length:  225
    })
    coverImg: string;

    @AutoMap()
    @CreateDateColumn({type:"timestamp"})
    creationDate: Date;

    // @AutoMap()
    // @Column()
    // isPublic: boolean;    // @AutoMap()
    // @Column()
    // isPublic: boolean;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь для создателя плейлиста
    @AutoMap()
    @ManyToOne(() => User, user=> user.playlists, {
        eager: true,
        nullable: false
    })
    creator: User;

    //Песни в данном плейлисте
    @AutoMap()
    @OneToMany(() => SongsToPlaylists, SongsToPlaylists => SongsToPlaylists.playlist, {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    public songs: SongsToPlaylists[];

    //Пользователи, добавившие плейлист в избранное
    // @OneToMany(() => UsersToPlaylists, usersToPlaylists => usersToPlaylists.playlist)
    // public listeners: UsersToPlaylists[];
}