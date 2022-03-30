import { RouterModule } from "@nestjs/core";
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Song } from "../../music/entities/song.entity";

@Entity()
export class UsersToSongs {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public userId!: number;

    @Column()
    public songId!: number;

    @Column()
    added_at!: boolean;

    @ManyToOne(() => User, user => user.songs)
    public user!: User;

    @ManyToOne(() => Song, song => song.users)
    public song!: Song;

}