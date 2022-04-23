import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { Artist } from "../artist/artist.entity";
import { Album } from "./album.entity";

@Entity()
export class ArtistsToAlbums {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public albumId!: number;

    @Column()
    public artistId!: number;

    @Column()
    isFeatured: boolean;

    @ManyToOne(() => Album, album => album.artists, {
        onDelete: 'CASCADE'
    })
    public album!: Album;

    @ManyToOne(() => Artist, artist => artist.albums,{
        onDelete:'CASCADE'
    })
    public artist!: Artist;
}