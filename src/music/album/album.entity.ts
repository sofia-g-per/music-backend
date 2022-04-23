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

    @Column({ 
        nullable: true,
        default: null,
    })
    coverImg: string;

    @Column({nullable: true, type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
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
    @OneToMany(() => ArtistsToAlbums, artistsToAlbums => artistsToAlbums.artist, {
        eager: true,
    })
    @JoinTable()
    artists: ArtistsToAlbums[];

    //Песни в данном альбоме
    @OneToMany(() => SongsToAlbums, songsToAlbums => songsToAlbums.song, {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    public songs!: SongsToAlbums[];

    //Пользователи, добавившие альбом в избранные
    @OneToMany(() => UsersToAlbums, usersToAlbums => usersToAlbums.user)
    public listeners!: UsersToAlbums[];


}