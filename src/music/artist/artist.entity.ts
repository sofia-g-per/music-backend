import { RouterModule } from "@nestjs/core";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToMany, JoinTable , OneToMany} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Genre } from "../genre/genre.entity";
import { Album } from "../album/album.entity";
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
    @Column()
    userId: number;
    
    @OneToOne(() => User, user => user.artist)
    @JoinColumn()
    user: User;

    // Связь с жанрами
    @ManyToMany(() => Genre, genre => genre.artists, {
        eager: true,
    })
    @JoinTable()
    genres: Genre[];

    // Связь с альбомами
    @ManyToMany(() => Album, {
        eager: true,
    })
    albums: Album[];

    // Связь с песнями
    @OneToMany(() => ArtistsToSongs, artistsToSongs => artistsToSongs.song, {
        eager: true,
    })
    public songs!: ArtistsToSongs[];
}