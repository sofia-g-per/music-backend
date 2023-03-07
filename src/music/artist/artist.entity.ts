import { AutoMap } from '@automapper/classes';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, Index, JoinColumn, OneToMany, Check} from "typeorm";
import { User } from "../../users/entities/user.entity";
import { ArtistsToSongs } from "./artistsToSongs.entity";
import { ArtistsToAlbums } from "../album/artistsToAlbums.entity";

@Entity("artists")
@Check(`"id" > 0 AND "id" < 10000`)
export class Artist {
    @PrimaryGeneratedColumn()
    @AutoMap()
    id: number;


    @Index({ fulltext: true })
    @Column({length: 70})
    @AutoMap()
    stagename: string;

    @Column({
        nullable: true,
        default: null,
        length: 125
    })
    @AutoMap()
    description: string;

    // @CreateDateColumn()
    // created_at: Date;

    //------------------ 
    //      СВЯЗИ
    //------------------ 

    // Связь с аккаунтом самого артиста на платформе 
    // (если он на ней зарегистрирован)    
    @OneToOne(() => User, user => user.artist)
    @JoinColumn()
    user: User;

    // Связь с альбомами
    @OneToMany(() => ArtistsToAlbums, artistsToAlbums=> artistsToAlbums.album)
    albums: ArtistsToAlbums[];

    // Связь с песнями
    @OneToMany(() => ArtistsToSongs, artistsToSongs => artistsToSongs.song)
    public songs: ArtistsToSongs[];

    // Связь с жанрами
    // @ManyToMany(() => Genre, genre => genre.artists, {
    //     eager: true,
    // })
    // @JoinTable()
    // genres: Genre[];
}