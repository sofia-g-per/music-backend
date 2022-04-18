import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, Index } from "typeorm";
import { Genre } from "../genre/genre.entity";
import { SongsToPlaylists } from "../playlist/songsToPlaylists.entity";
import { SongsToAlbums } from "../album/songsToAlbums.entity";
import { ArtistsToSongs } from "../artist/artistsToSongs.entity";
import { UsersToSongs } from "../favourites/usersToSongs.entity";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ fulltext: true })
    @Column()
    name: string;

    @Column({ 
        nullable: true,
        default: null,
    })
    description: string;

    @Column()
    filePath: string;

    @Column({ 
        nullable: true,
        default: null,
    })
    coverImg: string;

    @Column({ 
        nullable: true,
        default: null,
    })
    lyrics: string;

    @Column({nullable: true, type: "timestamp", default: () => "CURRENT_TIMESTAMP"})
    released_at: Date;


    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Плейлисты с данной песней
    @OneToMany(() => SongsToPlaylists, SongsToPlaylists => SongsToPlaylists.song)
    public playlists: SongsToPlaylists[];

    //Альбомы с данной песней
    @OneToMany(() => SongsToAlbums, songsToAlbums => songsToAlbums.song)
    public albums: SongsToAlbums[];

    //Жанры песни
    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    //авторы песни (связь с артистами)
    @OneToMany(() => ArtistsToSongs, artistsToSongs => artistsToSongs.song, {eager: true})
    public artists: ArtistsToSongs[];

    //Пользователи, добавившие песню в избранные
    @OneToMany(() => UsersToSongs, usersToSongs => usersToSongs.user)
    public listeners: UsersToSongs[];
}