import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { UserRole } from "./userRole.entity";
import { Artist } from "../../music/artist/artist.entity";
import { Playlist } from "../../music/playlist/playlist.entity";
import { UsersToSongs } from "../../music/favourites/usersToSongs.entity";
import { UsersToAlbums } from "../../music/favourites/usersToAlbums.entity";
import { UsersToPlaylists } from "../../music/favourites/usersToPlaylists.entity";

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

    @Column({ 
        nullable: true,
        default: null,
    })
    avatar: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at?: Date;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь с ролью
    @ManyToOne(() => UserRole, userRole => userRole.users)
    role: UserRole;
    
    //Связь с артистом 
    // (если пользователь является артистом)
    @OneToOne(() => Artist, artist => artist.user, {
        eager: true
    })
    artist: Artist;

    //Связь с созданными данным пользователям плейлистами 
    @OneToMany(() => Playlist, playlist=> playlist.creator)
    playlists: Playlist[];

    //Избранные песни
    @OneToMany(() => UsersToSongs, usersToSongs => usersToSongs.song)
    public favoriteSongs: UsersToSongs[];

    //Избранные альбомы
    @OneToMany(() => UsersToAlbums, usersToAlbums => usersToAlbums.album)
    public favoriteAlbums: UsersToAlbums[];

    //Избранные плейлисты
    @OneToMany(() => UsersToPlaylists, usersToPlaylists => usersToPlaylists.playlist)
    public favoritePlaylists: UsersToPlaylists[];
}