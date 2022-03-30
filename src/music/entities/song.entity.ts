import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Genre } from "./genre.entity";
import { SongsToPlaylists } from "./SongsToPlaylists.entity";
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

    //Связь плейлистов
    @OneToMany(() => SongsToPlaylists, SongsToPlaylists => SongsToPlaylists.song)
    public playlists!: SongsToPlaylists[];

    //Связь жанров
    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    //Связь артистов
    @OneToMany(() => ArtistsToSongs, artistsToSongs => artistsToSongs.song)
    public artists!: ArtistsToSongs[];

    //Пользователи, добавившие песню в избранные
    @OneToMany(() => UsersToSongs, usersToSongs => usersToSongs.user)
    public listeners!: UsersToSongs[];
}