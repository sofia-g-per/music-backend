import { RouterModule } from "@nestjs/core";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn, CreateDateColumn, JoinColumn, ManyToMany, JoinTable } from "typeorm";
import { User } from "./user.entity";
import { Genre } from "../../music-module/entities/genre.entity";
import { Album } from "../../music-module/entities/album.entity";

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

    @OneToOne(() => User, user => user.artist)
    @JoinColumn()
    user: User;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];

    @ManyToMany(() => Album)
    @JoinTable()
    albums: Album[];
}