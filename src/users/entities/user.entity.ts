import { FavoriteSong } from '../../music/favourites/favoriteSong.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany } from "typeorm";
import { UserRole } from "./userRole.entity";
import { Artist } from "../../music/artist/artist.entity";
import { Playlist } from "../../music/playlist/playlist.entity";
import { AutoMap } from "@automapper/classes";
import { ListenedSong } from "src/music/favourites/listenedSong.entity";

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

    // @AutoMap()
    // @CreateDateColumn()
    // created_at?: Date;

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
    @OneToMany(() => FavoriteSong, favoriteSongs => favoriteSongs.user,{
        eager: true
    })
    public favoriteSongs: FavoriteSong[];

    //Избранные песни
    @OneToMany(() => ListenedSong, listenedSong => listenedSong.user,{
        eager: true
    })
    public listenedSongs: ListenedSong[];

    // //Избранные альбомы
    // @OneToMany(() => UsersToAlbums, usersToAlbums => usersToAlbums.user)
    // public favoriteAlbums: UsersToAlbums[];

    // //Избранные плейлисты
    // @OneToMany(() => UsersToPlaylists, usersToPlaylists => usersToPlaylists.user)
    // public favoritePlaylists: UsersToPlaylists[];
}