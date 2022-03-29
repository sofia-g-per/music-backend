import { RouterModule } from "@nestjs/core";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Genre } from "../../music-module/entities/genre.entity";
import { Album } from "../../music-module/entities/album.entity";

@Entity()
export class ArtistsToSongs {
    // @PrimaryGeneratedColumn()
    // public postToCategoryId!: number;

    // @Column()
    // public playlistId!: number;

    // @Column()
    // public songId!: number;

    // @Column()
    // public song_index!: number;

    // @ManyToOne(() => Playlist, playlist => playlist.songs)
    // public playlist!: Playlist;

    // @ManyToOne(() => Song, song => song.users)
    // public song!: Song;
}