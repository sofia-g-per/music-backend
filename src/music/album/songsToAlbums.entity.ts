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

    @Column()
    public songIndex!: number;

    @ManyToOne(() => Album, album => album.songs, {onDelete: 'CASCADE'})
    public album!: Album;

    @ManyToOne(() => Song, song => song.albums, {
        eager: true,
        onDelete: 'CASCADE'
    })
    public song!: Song;
}