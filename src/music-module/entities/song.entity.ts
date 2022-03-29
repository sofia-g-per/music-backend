import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { PlaylistsSongs } from "./playlistsSongs.entity";

@Entity()
export class Song {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    file_path: string;

    @Column()
    lyrics: string;

    @Column()
    released_at: Date;

    @OneToMany(() => PlaylistsSongs, playlistsSongs => playlistsSongs.song)
    public songs!: PlaylistsSongs[];

}