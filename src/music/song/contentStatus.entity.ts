import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "./song.entity";
import { Album } from "../album/album.entity";

@Entity("content_statuses")
export class ContentStatus{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(()=> Song, song => song.status, {

    })
    songs: Song[];

    @OneToMany(() => Album, album => album.status)
    albums: Album[];
}