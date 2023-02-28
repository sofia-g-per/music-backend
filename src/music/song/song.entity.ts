import { ListenedSong } from './../favourites/listenedSong.entity';
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable, Index, Check } from "typeorm";
import { Genre } from "../genre/genre.entity";
import { SongsToPlaylists } from "../playlist/songsToPlaylists.entity";
import { SongsToAlbums } from "../album/songsToAlbums.entity";
import { AutoMap } from "@automapper/classes";
import { ArtistsToSongs } from '../artist/artistsToSongs.entity';
import { FavoriteSong } from '../favourites/favoriteSong.entity';

@Entity()
@Check(`"releaseDate" < CURRENT_TIMESTAMP AND "releaseDate" > make_date(1900, 1, 1)`)
export class Song {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;
    @AutoMap()
    @Index({ fulltext: true })
    @Column({length: 70})
    name: string;
    @AutoMap()
    @Column({ nullable: true, default: null, length: 225})
    description: string;
    @AutoMap()
    @Column({length: 225})
    filePath: string;
    @AutoMap()
    @Column({ nullable: true, default: null, length: 225})
    coverImg: string;
    @AutoMap()
    @Column({ nullable: true, default: null, length: 225})
    lyrics: string;
    @AutoMap()
    @Column({type: "date"})
    releaseDate: Date;


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
    @OneToMany(() => FavoriteSong, favoriteSongs => favoriteSongs.user)
    public likedBy: FavoriteSong[];

    //Пользователи, прослушавшие песню в избранные
    @OneToMany(() => ListenedSong, listenedSong => listenedSong.user)
    public listeners: ListenedSong[];

}