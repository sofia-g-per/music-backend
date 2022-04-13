import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, CreateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Playlist } from "../playlist/playlist.entity";

@Entity()
export class UsersToPlaylists {
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

    @ManyToOne(() => Playlist, playlist => playlist.listeners, {
        eager: true,
    })
    public playlist!: Playlist;

}