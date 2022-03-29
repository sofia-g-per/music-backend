import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from "typeorm";
import { Genre } from "./genre.entity";
import { PlaylistsSongs } from "./playlistsSongs.entity";
import { ArtistsToSongs } from "../../users-module/entities/artistsToSongs.entity";

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
    @OneToMany(() => PlaylistsSongs, playlistsSongs => playlistsSongs.song)
    public playlists!: PlaylistsSongs[];

    //Связь жанров
    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    //Связь артистов
    @OneToMany(() => ArtistsToSongs, artistsToSongs => artistsToSongs.song)
    public artists!: ArtistsToSongs[];
}