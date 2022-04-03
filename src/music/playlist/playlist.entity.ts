import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { SongsToPlaylists } from "./songsToPlaylists.entity";
import { UsersToPlaylists } from "../favourites/usersToPlaylists.entity";

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    is_public: boolean;

    @CreateDateColumn()
    created_at: Date;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь для избранного пользователей
    @ManyToOne(() => User, user=> user.playlists)
    creator: User;

    //Песни в данном плейлисте
    @OneToMany(() => SongsToPlaylists, SongsToPlaylists => SongsToPlaylists.song)
    public songs: SongsToPlaylists[];

    //Пользователи, добавившие плейлист в избранное
    @OneToMany(() => UsersToPlaylists, usersToPlaylists => usersToPlaylists.user)
    public listeners: UsersToPlaylists[];
}