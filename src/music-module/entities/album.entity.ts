import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import { Genre } from "./Genre.entity";

@Entity()
export class Album {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    cover_img: string;

    @Column()
    released_at: Date;

    @ManyToMany(() => Genre)
    @JoinTable()
    genres: Genre[];
}