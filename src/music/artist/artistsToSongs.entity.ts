import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany } from "typeorm";
import { Artist } from "./artist.entity";
import { Song } from "../song/song.entity";

@Entity()
export class ArtistsToSongs {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public artistId!: number;

    @Column()
    public songId!: number;

    @Column()
    public isFeatured!: boolean;

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