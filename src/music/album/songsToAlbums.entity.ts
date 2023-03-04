import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn, Check } from "typeorm";
import { Song } from "../song/song.entity";
import { Album } from "./album.entity";

@Entity()
@Check(`"id" > 0 AND "id" < 99999`)
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