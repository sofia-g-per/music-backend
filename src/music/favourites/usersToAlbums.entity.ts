import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Album } from "../album/album.entity";

@Entity()
export class UsersToAlbums {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public userId!: number;

    @Column()
    public songId!: number;

    @CreateDateColumn()
    added_at!: Date;

    @ManyToOne(() => User, user => user.favoriteAlbums)
    public user!: User;

    @ManyToOne(() => Album, album => album.listeners)
    public album!: Album;

}