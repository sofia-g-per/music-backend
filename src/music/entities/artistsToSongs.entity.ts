import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Artist } from "../../users/entities/artist.entity";
import { Song } from "./song.entity";

@Entity()
export class ArtistsToSongs {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public playlistId!: number;

    @Column()
    public songId!: number;

    @Column()
    public is_featured!: boolean;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь с артистами
    @ManyToOne(() => Artist, artist => artist.songs)
    public artist!: Artist;

    //Связь с песнями
    @ManyToOne(() => Song, song => song.artists)
    public song!: Song;
}