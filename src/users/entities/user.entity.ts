import { FavoriteSong } from '../../music/favourites/favoriteSong.entity';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToOne, OneToMany, Unique, Check } from "typeorm";
import { UserRole } from "./userRole.entity";
import { Artist } from "../../music/artist/artist.entity";
import { Playlist } from "../../music/playlist/playlist.entity";
import { AutoMap } from "@automapper/classes";
import { ListenedSong } from "src/music/favourites/listenedSong.entity";

@Entity("users")
@Unique(["username"])
@Unique(["email"])
@Check(`"id" > 0 AND "id" < 5000`)
export class User {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;


    @AutoMap()
    @Column({length: 35})
    username: string;

    @AutoMap()
    @Column({length: 35})
    name: string;

    @AutoMap()
    @Column({ 
        nullable: true,
        default: null,
        length: 255
    })
    avatar: string;

    @AutoMap()
    @Column({length: 125})
    email: string;

    @AutoMap()
    @Column({length: 255})
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
        eager: true,
        nullable: false
    })
    role: UserRole;
    
    //Связь с артистом 
    // (если пользователь является артистом)
    @AutoMap(() => Artist)
    @OneToOne(() => Artist, artist => artist.user, {
        eager: true,
        cascade: ['insert', 'update']
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

    //Прослушанные песни
    @OneToMany(() => ListenedSong, listenedSong => listenedSong.user)
    public listenedSongs: ListenedSong[];

    // //Избранные альбомы
    // @OneToMany(() => UsersToAlbums, usersToAlbums => usersToAlbums.user)
    // public favoriteAlbums: UsersToAlbums[];

    // //Избранные плейлисты
    // @OneToMany(() => UsersToPlaylists, usersToPlaylists => usersToPlaylists.user)
    // public favoritePlaylists: UsersToPlaylists[];
}