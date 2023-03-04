import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Check } from "typeorm";
import { Song } from "../song/song.entity";
import { Playlist } from "./playlist.entity";

@Entity()
@Check(`"id" > 0 AND "id" < 99999`)
export class SongsToPlaylists {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public playlistId!: number;

    @Column()
    public songId!: number;

    @Column()
    public songIndex!: number;

    @ManyToOne(() => Playlist, playlist => playlist.songs, {
        onDelete: 'CASCADE'
    })
    public playlist!: Playlist;

    @ManyToOne(() => Song, song => song.playlists, {
        eager: true,
        onDelete: 'CASCADE'
    })
    public song!: Song;
}