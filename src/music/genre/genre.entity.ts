import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Song } from "../song/song.entity";
import { Album } from "../album/album.entity";
import { Artist } from "../artist/artist.entity";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ 
        nullable: true,
        default: null,
    })
    description: string;

    @ManyToMany(() => Song)
    songs: Song[];

    // @ManyToMany(() => Album)
    // albums: Album[];

    // @ManyToMany(() => Artist, artist => artist.genres)
    // artists: Artist[];
}