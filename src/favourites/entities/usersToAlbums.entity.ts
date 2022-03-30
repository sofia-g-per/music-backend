import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Album } from "../../music/entities/album.entity";

@Entity()
export class UsersToAlbums {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public userId!: number;

    @Column()
    public songId!: number;

    @Column()
    added_at!: boolean;

    @ManyToOne(() => User, user => user.favoriteAlbums)
    public user!: User;

    @ManyToOne(() => Album, album => album.listeners)
    public album!: Album;

}