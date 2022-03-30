import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Genre } from "./genre.entity";
import { SongsToPlaylists } from "./songsToPlaylists.entity";
import { SongsToAlbums } from "./songsToAlbums.entity";
import { ArtistsToSongs } from "./artistsToSongs.entity";
import { UsersToSongs } from "../../favourites/entities/usersToSongs.entity";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    file_path: string;

    @Column()
    lyrics: string;

    @Column()
    released_at: Date;


    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Плейлисты с данной песней
    @OneToMany(() => SongsToPlaylists, SongsToPlaylists => SongsToPlaylists.song)
    public playlists!: SongsToPlaylists[];

    //Альбомы с данной песней
    @OneToMany(() => SongsToAlbums, songsToAlbums => songsToAlbums.song)
    public albums!: SongsToAlbums[];

    //Жанры песни
    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    //авторы песни (связь с артистами)
    @OneToMany(() => ArtistsToSongs, artistsToSongs => artistsToSongs.song)
    public artists!: ArtistsToSongs[];

    //Пользователи, добавившие песню в избранные
    @OneToMany(() => UsersToSongs, usersToSongs => usersToSongs.user)
    public listeners!: UsersToSongs[];
}