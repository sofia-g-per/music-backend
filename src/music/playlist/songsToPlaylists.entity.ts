import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Song } from "../song/song.entity";
import { Playlist } from "./playlist.entity";

@Entity()
export class SongsToPlaylists {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public playlistId!: number;

    @Column()
    public songId!: number;

    @Column()
    public songIndex!: number;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Playlist, playlist => playlist.songs)
    public playlist!: Playlist;

    @ManyToOne(() => Song, song => song.playlists)
    public song!: Song;
}