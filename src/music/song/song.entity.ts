import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, Index } from "typeorm";
import { Genre } from "../genre/genre.entity";
import { SongsToPlaylists } from "../playlist/songsToPlaylists.entity";
import { SongsToAlbums } from "../album/songsToAlbums.entity";
import { ArtistsToSongs } from "../artist/artistsToSongs.entity";
import { UsersToSongs } from "../favourites/usersToSongs.entity";
import { AutoMap } from "@automapper/classes";
import { Artist } from "../artist/artist.entity";

@Entity()
export class Song {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Index({ fulltext: true })
    @Column()
    name: string;

    @AutoMap()
    @Column({ 
        nullable: true,
        default: null,
    })
    description: string;

    @AutoMap()
    @Column()
    filePath: string;

    @AutoMap()
    @Column({ 
        nullable: true,
        default: null,
    })
    coverImg: string;

    @AutoMap()
    @Column({ 
        nullable: true,
        default: null,
    })
    lyrics: string;

    @AutoMap()
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
    @AutoMap(()=>[Genre])
    @ManyToMany(() => Genre, {onDelete: 'CASCADE', cascade: true, eager:true})
    @JoinTable()
    genres: Genre[];

    //авторы песни (связь с артистами)
    @OneToMany(() => ArtistsToSongs, artistsToSongs => artistsToSongs.song, {eager:true})
    public artists: ArtistsToSongs[];

    //Пользователи, добавившие песню в избранные
    @OneToMany(() => UsersToSongs, usersToSongs => usersToSongs.user)
    public listeners: UsersToSongs[];
}