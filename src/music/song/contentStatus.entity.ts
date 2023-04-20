import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Song } from "./song.entity";
import { Album } from "../album/album.entity";

@Entity("content_statuses")
export class ContentStatus{

    @PrimaryColumn()
    name: string;

    @OneToMany(()=> Song, song => song.status, {

    })
    songs: Song[];

    @OneToMany(() => Album, album => album.status)
    albums: Album[];
}