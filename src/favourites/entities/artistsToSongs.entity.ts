import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Artist } from "./artist.entity";
import { Song } from "../../music/entities/song.entity";

@Entity()
export class ArtistsToSongs {
    @PrimaryGeneratedColumn()
    public postToCategoryId!: number;

    @Column()
    public playlistId!: number;

    @Column()
    public songId!: number;

    @Column()
    public is_featured!: boolean;

    @ManyToOne(() => Artist, artist => artist.songs)
    public artist!: Artist;

    @ManyToOne(() => Song, song => song.artists)
    public song!: Song;

}