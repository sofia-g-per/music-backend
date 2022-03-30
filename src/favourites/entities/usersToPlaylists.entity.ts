import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Playlist } from "../../music/entities/playlist.entity";

@Entity()
export class UsersToPlaylists {
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

    @ManyToOne(() => Playlist, playlist => playlist.listeners)
    public playlist!: Playlist;

}