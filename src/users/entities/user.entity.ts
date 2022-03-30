import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { UserRole } from "./userRole.entity";
import { Artist } from "./artist.entity";
import { Playlist } from "../../music/entities/playlist.entity";
import { UsersToSongs } from "../../favourites/entities/usersToSongs.entity";
import { UsersToAlbums } from "../../favourites/entities/usersToAlbums.entity";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    username: string;

    @Column()
    name: string;

    @Column()
    surname: string;

    @Column()
    avatar: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь с ролью
    @ManyToOne(() => UserRole, userRole => userRole.users)
    role: UserRole;

    //Связь с артистом 
    // (если пользователь является артистом)
    @OneToOne(() => Artist, artist => artist.user)
    artist: Artist;

    //Связь с созданными данным пользователям плейлистами 
    @OneToMany(() => Playlist, playlist=> playlist.creator)
    playlists: Playlist[];

    //Избранные песни
    @OneToMany(() => UsersToSongs, usersToSongs => usersToSongs.song)
    public songs!: UsersToSongs[];

    //Избранные песни
    @OneToMany(() => UsersToAlbums, usersToAlbums => usersToAlbums.albums)
    public favoriteAlbums!: UsersToAlbums[];
}