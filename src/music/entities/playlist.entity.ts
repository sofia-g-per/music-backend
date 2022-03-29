import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { PlaylistsSongs } from "./playlistsSongs.entity";

@Entity()
export class Playlist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    is_public: boolean;

    @CreateDateColumn()
    created_at: Date;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    //Связь для избранного пользователей
    @ManyToOne(() => User, user=> user.playlists)
    creator: User;

    //Связь с песнями, внутри плейлиста
    @OneToMany(() => PlaylistsSongs, playlistsSongs => playlistsSongs.song)
    public songs!: PlaylistsSongs[];
}