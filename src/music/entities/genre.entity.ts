import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Song } from "./song.entity";
import { Album } from "./album.entity";
import { Artist } from "../../users/entities/artist.entity";

@Entity()
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @ManyToMany(() => Song)
    songs: Song[];

    @ManyToMany(() => Album)
    albums: Album[];

    @ManyToMany(() => Artist)
    artists: Artist[];
}