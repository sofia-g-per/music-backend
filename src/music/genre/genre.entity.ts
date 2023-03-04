import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, Check } from "typeorm";
import { Song } from "../song/song.entity";

@Entity("genres")
@Check(`"id" > 0 AND "id" < 999`)
export class Genre {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 70})
    name: string;

    @Column({ 
        nullable: true,
        default: null,
        length: 125
    })
    description: string;

    @ManyToMany(() => Song)
    songs: Song[];

    // @ManyToMany(() => Album)
    // albums: Album[];

    // @ManyToMany(() => Artist, artist => artist.genres)
    // artists: Artist[];
}