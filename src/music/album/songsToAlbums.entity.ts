import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Song } from "../song/song.entity";
import { Album } from "./album.entity";

@Entity()
export class SongsToAlbums {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public albumId!: number;

    @Column()
    public songId!: number;

    @CreateDateColumn()
    created_at: Date;

    @ManyToOne(() => Album, album => album.songs, {onDelete: 'CASCADE'})
    public album!: Album;

    @ManyToOne(() => Song, song => song.albums, {onDelete: 'CASCADE'})
    public song!: Song;
}