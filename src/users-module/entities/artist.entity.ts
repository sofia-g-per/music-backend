import { RouterModule } from "@nestjs/core";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToMany, JoinTable , OneToMany} from "typeorm";
import { User } from "./user.entity";
import { Genre } from "../../music-module/entities/genre.entity";
import { Album } from "../../music-module/entities/album.entity";
import { ArtistsToSongs } from "./artistsToSongs.entity";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stagename: string;

    @Column()
    description: string;

    @CreateDateColumn()
    created_at: Date;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    // Связь с аккаунтом самого артиста на платформе 
    // (если он на ней зарегистрирован)
    @OneToOne(() => User, user => user.artist)
    @JoinColumn()
    user: User;

    // Связь с жанрами
    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    // Связь с альбомами
    @ManyToMany(() => Album)
    @JoinTable()
    albums: Album[];

    // Связь с песнями
    @OneToMany(() => ArtistsToSongs, artistsToSongs => artistsToSongs.song)
    public songs!: ArtistsToSongs[];
}