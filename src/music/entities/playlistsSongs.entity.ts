import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Song } from "./song.entity";
import { Playlist } from "./playlist.entity";

@Entity()
export class PlaylistsSongs {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public playlistId!: number;

    @Column()
    public songId!: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Playlist, playlist => playlist.songs)
    public playlist!: Playlist;

    @ManyToOne(() => Song, song => song.playlists)
    public song!: Song;
}