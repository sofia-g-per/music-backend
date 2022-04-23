import { RouterModule } from "@nestjs/core";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Index, CreateDateColumn, JoinColumn, ManyToMany, JoinTable , OneToMany} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Genre } from "../genre/genre.entity";
import { Album } from "../album/album.entity";
import { ArtistsToSongs } from "./artistsToSongs.entity";
import { ArtistsToAlbums } from "../album/artistsToAlbums.entity";

@Entity()
export class Artist {
    @PrimaryGeneratedColumn()
    id: number;

    @Index({ fulltext: true })
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
    @OneToMany(() => ArtistsToAlbums, artistsToAlbums=> artistsToAlbums.album, {
        eager: true,
    })
    albums: ArtistsToAlbums[];

    // Связь с песнями
    @OneToMany(() => ArtistsToSongs, artistsToSongs => artistsToSongs.song)
    public songs!: ArtistsToSongs[];
}