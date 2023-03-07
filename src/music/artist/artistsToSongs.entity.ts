import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, Check } from "typeorm";
import { Artist } from "./artist.entity";
import { Song } from "../song/song.entity";
import { AutoMap } from "@automapper/classes";

@Entity()
@Check(`"id" > 0 AND "id" < 999999`)
export class ArtistsToSongs {
    @PrimaryGeneratedColumn()
    public id: number;

    @AutoMap()
    @Column()
    public artistId!: number;

    @AutoMap()
    @Column()
    public songId!: number;

    @AutoMap()
    @Column()
    public isFeatured!: boolean;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь с артистами
    @AutoMap()
    @ManyToOne(() => Artist, artist => artist.songs, {
        eager : true,
        onDelete: 'CASCADE',
    })
    public artist!: Artist;

    //Связь с песнями
    @ManyToOne(() => Song, song => song.artists, {
        onDelete: 'CASCADE',
    })
    public song!: Song;
}