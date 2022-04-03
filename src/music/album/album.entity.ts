import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Genre } from "../genre/genre.entity";
import { Artist } from "../artist/artist.entity";
import { UsersToAlbums } from "../favourites/usersToAlbums.entity";
import { SongsToAlbums } from "./songsToAlbums.entity";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    cover_img: string;

    @Column()
    released_at: Date;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь с жанрами
    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    //Связь с артистами, (авторы альбома)
    @ManyToMany(() => Artist)
    artists: Artist[];

    //Пользователи, добавившие альбом в избранные
    @OneToMany(() => UsersToAlbums, usersToAlbums => usersToAlbums.user)
    public listeners!: UsersToAlbums[];

    //Песни в данном альбоме
    @OneToMany(() => SongsToAlbums, songsToAlbums => songsToAlbums.song)
    public songs!: SongsToAlbums[];
}