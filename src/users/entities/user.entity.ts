/* eslint-disable prettier/prettier */
import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { UserRole } from "./userRole.entity";
import { Artist } from "../../music/artist/artist.entity";
import { Playlist } from "../../music/playlist/playlist.entity";
import { UsersToSongs } from "../../music/favourites/usersToSongs.entity";
import { UsersToAlbums } from "../../music/favourites/usersToAlbums.entity";
import { UsersToPlaylists } from "../../music/favourites/usersToPlaylists.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
export class User {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column()
    username: string;

    @AutoMap()
    @Column()
    name: string;

    @AutoMap()
    @Column()
    surname: string;

    @AutoMap()
    @Column({ 
        nullable: true,
        default: null,
    })
    avatar: string;

    @AutoMap()
    @Column()
    email: string;

    @AutoMap()
    @Column()
    password: string;

    @AutoMap()
    @CreateDateColumn()
    created_at?: Date;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь с ролью
    @AutoMap(() => UserRole)
    @ManyToOne(() => UserRole, userRole => userRole.users, {
        eager: true
    })
    role: UserRole;
    
    //Связь с артистом 
    // (если пользователь является артистом)
    @AutoMap(() => Artist)
    @OneToOne(() => Artist, artist => artist.user, {
        eager: true
    })
    artist: Artist;

    //Связь с созданными данным пользователям плейлистами 
    @OneToMany(() => Playlist, playlist=> playlist.creator)
    playlists: Playlist[];

    //Избранные песни
    @OneToMany(() => UsersToSongs, usersToSongs => usersToSongs.user,{
        eager: true
    })
    public favoriteSongs: UsersToSongs[];

    //Избранные альбомы
    @OneToMany(() => UsersToAlbums, usersToAlbums => usersToAlbums.user)
    public favoriteAlbums: UsersToAlbums[];

    //Избранные плейлисты
    @OneToMany(() => UsersToPlaylists, usersToPlaylists => usersToPlaylists.user)
    public favoritePlaylists: UsersToPlaylists[];
}