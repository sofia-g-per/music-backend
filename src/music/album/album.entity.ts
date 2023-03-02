import { AutoMap } from '@automapper/classes';
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from "typeorm";
import { Genre } from "../genre/genre.entity";
import { SongsToAlbums } from "./songsToAlbums.entity";
import { ArtistsToAlbums } from "./artistsToAlbums.entity";

@Entity()
export class Album {
    @AutoMap()
    @PrimaryGeneratedColumn()
    id: number;

    @AutoMap()
    @Column({length: 70})
    name: string;

    @AutoMap()
    @Column({ 
        nullable: true,
        default: null,
        length: 125
    })
    description: string;

    @AutoMap()
    @Column({ 
        nullable: true,
        default: null,
        length: 225
    })
    coverImg: string;

    @AutoMap()
    @Column({
        nullable: true, 
        type: "timestamp", 
        default: () => "CURRENT_TIMESTAMP"})
    releaseDate: Date;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь с жанрами
    @AutoMap()
    @ManyToMany(() => Genre, {
        eager: true,
    })
    @JoinTable()
    genres: Genre[];

    @AutoMap()
    //Связь с артистами, (авторы альбома)
    @OneToMany(() => ArtistsToAlbums, artistsToAlbums => artistsToAlbums.album, {
        eager: true,
    })
    artists: ArtistsToAlbums[];

    @AutoMap()
    //Песни в данном альбоме
    @OneToMany(() => SongsToAlbums, songsToAlbums => songsToAlbums.album, {
        eager: true,
        cascade: true,
        onDelete: 'CASCADE'
    })
    public songs!: SongsToAlbums[];

    //Пользователи, добавившие альбом в избранные
    // @OneToMany(() => UsersToAlbums, usersToAlbums => usersToAlbums.user)
    // public listeners!: UsersToAlbums[];
}