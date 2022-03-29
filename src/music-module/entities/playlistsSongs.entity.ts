import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { Song } from "./song.entity";
import { Playlist } from "./playlist.entity";

@Entity()
export class PlaylistsSongs {

    @PrimaryGeneratedColumn()
    public postToCategoryId!: number;

    @Column()
    public playlistId!: number;

    @Column()
    public songId!: number;

    @Column()
    public song_index!: number;

    @ManyToOne(() => Playlist, playlist => playlist.songs)
    public playlist!: Playlist;

    @ManyToOne(() => Song, song => song.users)
    public song!: Song;
}