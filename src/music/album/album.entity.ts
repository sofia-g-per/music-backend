import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Genre } from "../genre/genre.entity";
import { Artist } from "../artist/artist.entity";
import { UsersToAlbums } from "../favourites/usersToAlbums.entity";
import { SongsToAlbums } from "./songsToAlbums.entity";
import { ArtistsToSongs } from "../artist/artistsToSongs.entity";
import { ArtistsToAlbums } from "./artistsToAlbums.entity";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ 
        nullable: true,
        default: null,
    })
    description: string;

    @Column()
    coverImg: string;

    @Column()
    released_at: Date;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь с жанрами
    @ManyToMany(() => Genre, {
        eager: true,
    })
    @JoinTable()
    genres: Genre[];

    //Связь с артистами, (авторы альбома)
    @OneToMany(() => ArtistsToAlbums, artistsToAlbums => artistsToAlbums.artists, {
        eager: true,
    })
    @JoinTable()
    artists: ArtistsToAlbums[];

    //Песни в данном альбоме
    @OneToMany(() => SongsToAlbums, songsToAlbums => songsToAlbums.song, {
        eager: true,
    })
    public songs!: SongsToAlbums[];

    //Пользователи, добавившие альбом в избранные
    @OneToMany(() => UsersToAlbums, usersToAlbums => usersToAlbums.user)
    public listeners!: UsersToAlbums[];


}